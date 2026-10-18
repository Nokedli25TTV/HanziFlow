/* ====================================================
   HANZIFLOW — sync.js (V17 — Firestore profil + statisztika sync)
   ----------------------------------------------------
   A tanulási adatokat (profilok, settings, session-log, SRS,
   flashcard-state) szinkronizálja Firestore-ba, ha a user be van
   jelentkezve. A HanziFlowAuth-ra épül (V16).

   Firestore-struktúra:
     users/{uid}/apps/hanziflow  →  { data: { <kulcs>: <json-string> }, updatedAt }
     (a NihonCore a users/{uid} dokumentumba ír — a kettő nem írja felül egymást;
      a fiók közös, ugyanaz a Firebase-projekt)

   Sync-stratégia:
     • Login után: PULL (felhő → lokál, merge)
     • Periodikusan (30s) + tab-elhagyáskor: PUSH (ha változott)
     • Manuális: HanziFlowSync.syncNow()
     • Merge:
         - hanziflow_sessions_v1: APPEND-merge (id-unió — kör soha nem vész)
         - hanziflow_srs_v1: per-item a frissebb (magasabb box / újabb ts)
         - minden más (profilok/settings/flashcard): last-write-wins
           a snapshot updatedAt-ja szerint

   Eszköz-specifikus kulcsok NINCSENEK szinkronizálva:
     theme, helpers, audio_on, focus_hint, last_readiness_tier, pwa_dismiss
   ==================================================== */

window.HanziFlowSync = (function () {
  // Pontos kulcs-lista (csak tanulási adat)
  const EXACT_KEYS = [
    'hanziflow_sessions_v1',
    'hanziflow_srs_v1',
    'hanziflow_path_v1',            // tanulási út: szint + lépések haladása
    'hanziflow_goal_v1',            // napi cél (a kezdőlap „Folytatás" kártyáján)
    'hanziflow_tones_profile_v1',   // Tónus-tréner: tónusonkénti eredmény
    'hanziflow_tones_settings_v1',
    'hanziflow_pinyin_settings_v1', // Pinyin-tábla: mód, szint, tónus, kártyák száma
    'hanziflow_measure_profile_v1', // Mérőszavak: mérőszavankénti eredmény
    'hanziflow_measure_settings_v1',
    'hanziflow_sentence_profile_v1', // Mondat-Mester: szabályonkénti eredmény
    'hanziflow_sentence_settings_v1',
    'hanziflow_numbers_profile_v1',  // Dátum, idő, pénz: témánkénti eredmény
    'hanziflow_numbers_settings_v1',
    'hanziflow_exam_profile_v1',     // Próbavizsga: legjobb pontszám, részenkénti eredmény
    'hanziflow_exam_settings_v1'
  ];
  const PREFIX_KEYS = [];

  let _db = null;
  let _enabled = false;
  let _user = null;
  let _lastPushHash = '';
  let _pushTimer = null;
  const _statusCallbacks = [];

  function onStatus(cb) { if (typeof cb === 'function') _statusCallbacks.push(cb); }
  function _emitStatus(state, detail) {
    // state: 'idle' | 'syncing' | 'synced' | 'error' | 'offline'
    _statusCallbacks.forEach(cb => { try { cb(state, detail); } catch (e) {} });
  }

  // ── Lokális snapshot gyűjtés / visszaírás ─────────────
  function collectLocalKeys() {
    const keys = [];
    for (const k of EXACT_KEYS) {
      if (localStorage.getItem(k) !== null) keys.push(k);
    }
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (PREFIX_KEYS.some(p => k && k.startsWith(p))) keys.push(k);
    }
    return Array.from(new Set(keys));
  }
  function collectLocal() {
    const data = {};
    collectLocalKeys().forEach(k => { data[k] = localStorage.getItem(k); });
    return data;
  }
  function snapshotHash(data) {
    // egyszerű, gyors hash a "változott-e" detektáláshoz
    let s = '';
    Object.keys(data).sort().forEach(k => { s += k + '=' + (data[k] || '') + ';'; });
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
    return String(h);
  }

  // ── Merge-segédek ─────────────────────────────────────
  function mergeSessions(localStr, cloudStr) {
    let local = [], cloud = [];
    try { local = JSON.parse(localStr) || []; } catch (e) {}
    try { cloud = JSON.parse(cloudStr) || []; } catch (e) {}
    const byId = {};
    [...cloud, ...local].forEach(s => { if (s && s.id) byId[s.id] = s; });
    const merged = Object.values(byId).sort((a, b) => (a.ts || 0) - (b.ts || 0));
    return JSON.stringify(merged);
  }
  function mergeSrs(localStr, cloudStr) {
    let local = {}, cloud = {};
    try { local = JSON.parse(localStr) || {}; } catch (e) {}
    try { cloud = JSON.parse(cloudStr) || {}; } catch (e) {}
    const out = Object.assign({}, cloud);
    Object.keys(local).forEach(itemId => {
      const l = local[itemId], c = cloud[itemId];
      if (!c) { out[itemId] = l; return; }
      // a frissebb nyer (az ütemező a `lastTs` mezőbe írja az utolsó válasz idejét; a `lastReview`
      // régi név). Döntetlennél: magasabb box. — Korábban csak a `lastReview`-t nézte, ami soha
      // nincs kitöltve, ezért mindig a magasabb box nyert: egy elrontott kérdés (box 0) a másik
      // eszköz régebbi, jobb állapotára íródott vissza.
      const when = x => (x && (x.lastTs || x.lastReview)) || 0;
      const lts = when(l), cts = when(c);
      if (lts > cts) out[itemId] = l;
      else if (lts === cts && (l.box || 0) > (c.box || 0)) out[itemId] = l;
    });
    return JSON.stringify(out);
  }

  // Firestore hibakód → magyar üzenet
  function fsError(e) {
    const code = (e && e.code) || '';
    if (code === 'permission-denied')
      return 'Firestore: nincs jogosultság — a szabályokban engedélyezni kell a users/{uid}/apps/{app} helyet.';
    if (code === 'unavailable')
      return 'Firestore: nem elérhető (offline vagy nincs internet).';
    if (code === 'not-found' || code === 'failed-precondition')
      return 'Firestore: az adatbázis nincs létrehozva a Console-on (Create database).';
    return 'Firestore hiba: ' + (code || (e && e.message) || 'ismeretlen');
  }

  // ── PULL (felhő → lokál) ──────────────────────────────
  async function pull() {
    if (!_enabled || !_user) { console.log('[Sync] pull skip (enabled=' + _enabled + ', user=' + (!!_user) + ')'); return; }
    _emitStatus('syncing');
    try {
      const docRef = _db.collection('users').doc(_user.uid).collection('apps').doc('hanziflow');
      const snap = await docRef.get();
      if (!snap.exists) { console.log('[Sync] pull: nincs felhő-dokumentum még (első push hozza létre)'); _emitStatus('synced', 'no-cloud'); return; }
      const remote = snap.data() || {};
      const cloudData = remote.data || {};
      const cloudUpdatedAt = (remote.updatedAt && remote.updatedAt.toMillis) ? remote.updatedAt.toMillis() : 0;
      const localUpdatedAt = parseInt(localStorage.getItem('hanziflow_sync_updatedAt') || '0', 10);

      Object.keys(cloudData).forEach(k => {
        const cloudVal = cloudData[k];
        const localVal = localStorage.getItem(k);
        if (k === 'hanziflow_sessions_v1') {   // azonosító szerinti lista
          localStorage.setItem(k, mergeSessions(localVal, cloudVal));  // mindig merge
        } else if (k === 'hanziflow_srs_v1') {
          localStorage.setItem(k, mergeSrs(localVal, cloudVal));        // mindig merge
        } else {
          // last-write-wins: ha a felhő frissebb VAGY lokálban nincs → felhő nyer
          if (localVal === null || cloudUpdatedAt >= localUpdatedAt) {
            localStorage.setItem(k, cloudVal);
          }
        }
      });
      console.log('[Sync] pull OK — felhő-adat letöltve + merge-elve');
      _emitStatus('synced', 'pulled');
    } catch (e) {
      console.warn('[Sync] PULL HIBA:', fsError(e), e);
      _emitStatus('error', fsError(e));
    }
  }

  // ── PUSH (lokál → felhő) ──────────────────────────────
  async function push(force) {
    if (!_enabled || !_user) return;
    const data = collectLocal();
    const hash = snapshotHash(data);
    if (!force && hash === _lastPushHash) return;   // nincs változás
    _emitStatus('syncing');
    try {
      const docRef = _db.collection('users').doc(_user.uid).collection('apps').doc('hanziflow');
      await docRef.set({
        data: data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        email: _user.email || null
      }, { merge: true });
      _lastPushHash = hash;
      localStorage.setItem('hanziflow_sync_updatedAt', String(Date.now()));
      console.log('[Sync] push OK — ' + Object.keys(data).length + ' kulcs felvíve a felhőbe');
      _emitStatus('synced', 'pushed');
    } catch (e) {
      console.warn('[Sync] PUSH HIBA:', fsError(e), e);
      _emitStatus('error', fsError(e));
    }
  }

  function schedulePush() {
    if (!_enabled || !_user) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(() => push(false), 3000);  // 3s debounce
  }

  async function syncNow() {
    await pull();
    await push(true);
  }

  // V19: a Firestore SDK lazy-betöltése — CSAK az első bejelentkezéskor
  //   (a ~300 KB firestore-compat nem terheli a bejelentkezés nélküli
  //    böngészést — ez a fő mobil-perf nyereség).
  let _firestoreLoading = null;
  async function ensureFirestore() {
    if (_enabled && _db) return true;
    if (window.location.protocol === 'file:') { _emitStatus('offline', 'file'); return false; }
    if (_firestoreLoading) return _firestoreLoading;
    _firestoreLoading = (async () => {
      try {
        // Ha az auth.js kitette a loader-t, használjuk; egyébként közvetlen
        if (typeof firebase === 'undefined' || !firebase.firestore) {
          if (window.HanziFlowLoadFB) {
            await window.HanziFlowLoadFB('firebase-firestore-compat.js');
          }
        }
        if (typeof firebase === 'undefined' || !firebase.firestore) {
          console.warn('[Sync] Firestore SDK nem tölthető be.');
          _emitStatus('offline', 'no-sdk');
          return false;
        }
        _db = firebase.firestore();
        _enabled = true;
        console.log('[Sync] Firestore lazy-betöltve (bejelentkezés után).');
        return true;
      } catch (e) {
        console.warn('[Sync] Firestore lazy-load hiba:', e);
        _emitStatus('error', e.message);
        return false;
      }
    })();
    return _firestoreLoading;
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    if (window.location.protocol === 'file:') { _emitStatus('offline', 'file'); return; }
    // NEM töltünk Firestore SDK-t most — csak az auth-állapotot követjük.
    // Ha az HanziFlowAuth még nem kész (lazy SDK), megvárjuk a ready()-t.
    let _attached = false;
    function attach() {
      if (_attached || !window.HanziFlowAuth) return;
      _attached = true;
      window.HanziFlowAuth.onChange(async user => {
        _user = user;
        if (user) {
          const ok = await ensureFirestore();   // ITT tölt a firestore SDK (lazy)
          if (!ok) return;
          await pull();        // belépés után letöltés + merge
          await push(true);    // majd a merge-elt állapot vissza
          startAutoPush();
        } else {
          stopAutoPush();
          _emitStatus('idle', 'logged-out');
        }
      });
    }
    // Ha az auth már elérhető, azonnal; egyébként várjuk meg a ready-t
    if (window.HanziFlowAuth && window.HanziFlowAuth.ready) {
      window.HanziFlowAuth.ready().then(attach);
      // Plusz azonnali attach is, hogy a már-bejelentkezett state ne maradjon le
      attach();
    } else {
      attach();
    }
  }

  // ── Auto-push (periodikus + tab-elhagyás) ─────────────
  let _intervalId = null;
  function startAutoPush() {
    stopAutoPush();
    _intervalId = setInterval(() => push(false), 30000);  // 30s
    document.addEventListener('visibilitychange', _onHide);
    window.addEventListener('beforeunload', _onUnload);
  }
  function stopAutoPush() {
    if (_intervalId) clearInterval(_intervalId);
    _intervalId = null;
    document.removeEventListener('visibilitychange', _onHide);
    window.removeEventListener('beforeunload', _onUnload);
  }
  function _onHide() { if (document.visibilityState === 'hidden') push(false); }
  function _onUnload() { push(false); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    isEnabled: () => _enabled,
    pull, push, syncNow, schedulePush, onStatus,
    getUser: () => _user
  };
})();
