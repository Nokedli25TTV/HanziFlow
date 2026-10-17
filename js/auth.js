/* ====================================================
   HANZIFLOW — auth.js (V16 — Firebase Auth)
   ----------------------------------------------------
   Egyetlen indokolt különálló JS-fájl: az auth modul-független
   felelősség (a CLAUDE.md kivétel-szabálya szerint).

   Firebase compat SDK-t használ (globális `firebase` névtér),
   mert a projekt vanilla / no-build-step. A compat build a
   gstatic.com-ról jön, a HTML-ekben az app.js ELŐTT töltődik.

   API a `window.HanziFlowAuth`-on:
     ready()                       → Promise, ami akkor resolve-ol, ha kész
     register(email, pw, name)     → Promise<user>
     login(email, pw)              → Promise<user>
     loginGoogle()                 → Promise<user>
     logout()                      → Promise
     onChange(cb)                  → auth-state observer (cb(user|null))
     getUser()                     → jelenlegi user vagy null
     isEnabled()                   → boolean (Firebase elérhető-e)

   FONTOS — single-user mód:
     A regisztráció működik (az első fiók létrehozásához kell),
     de a tényleges adatvédelmet a Firestore security-rules adja
     majd (V17), ami az adatokat a tulaj uid-jéhez köti.

   FONTOS — file:// vs http:
     A Firebase Auth CSAK http/https origin alatt működik (a file://
     "null origin"-t ad, amit a Firebase elutasít). file:// alatt
     az auth csendesen kikapcsol — az app működik nélküle is.
   ==================================================== */

window.HanziFlowAuth = (function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAM1usqhUkp9fEdj1V6M9zuXpY0BHUTsFg",
    authDomain: "japangyakorlo.firebaseapp.com",
    projectId: "japangyakorlo",
    storageBucket: "japangyakorlo.firebasestorage.app",
    messagingSenderId: "685384774742",
    appId: "1:685384774742:web:a129c0ea6cbba4ee5177f7",
    measurementId: "G-THRVH9ZHJL"
  };

  let _auth = null;
  let _enabled = false;
  let _readyResolve;
  const _readyPromise = new Promise(res => { _readyResolve = res; });
  const _changeCallbacks = [];

  function isEnabled() { return _enabled; }
  function ready() { return _readyPromise; }
  function getUser() { return _enabled && _auth ? _auth.currentUser : null; }

  function onChange(cb) {
    if (typeof cb !== 'function') return;
    _changeCallbacks.push(cb);
    // V20: ha az SDK MÁR kész, azonnal a valós állapot.
    // Ha még tölt (lazy), NEM hívunk null-lal — különben felülírná a
    // header optimista (cache-elt) renderét egy villanással. Az
    // onAuthStateChanged majd tüzel a valós állapottal az SDK betöltése után.
    if (_enabled && _auth) cb(_auth.currentUser);
  }
  function _notify(user) {
    _changeCallbacks.forEach(cb => { try { cb(user); } catch (e) {} });
  }

  // V20: flicker-mentes cache — a bejelentkezett user nevét/emailjét
  // localStorage-ba mentjük, így a header AZONNAL renderelhet (a lazy
  // Firebase SDK betöltése előtt), nincs 1mp "Bejelentkezés" villanás.
  function _cacheUser(user) {
    try {
      if (user) {
        localStorage.setItem('hanziflow_cached_user',
          JSON.stringify({ displayName: user.displayName, email: user.email }));
      } else {
        localStorage.removeItem('hanziflow_cached_user');
      }
    } catch (e) {}
  }
  function getCachedUser() {
    try { return JSON.parse(localStorage.getItem('hanziflow_cached_user') || 'null'); }
    catch (e) { return null; }
  }

  // ── Hibakód → magyar üzenet ───────────────────────────
  function humanError(err) {
    const code = (err && err.code) || '';
    const map = {
      'auth/invalid-email':          'Érvénytelen e-mail cím.',
      'auth/user-disabled':          'Ez a fiók le van tiltva.',
      'auth/user-not-found':         'Nincs ilyen e-mailű fiók.',
      'auth/wrong-password':         'Hibás jelszó.',
      'auth/invalid-credential':     'Hibás e-mail vagy jelszó.',
      'auth/email-already-in-use':   'Ez az e-mail már regisztrálva van.',
      'auth/weak-password':          'A jelszó túl gyenge (min. 6 karakter).',
      'auth/popup-closed-by-user':   'A Google-ablak bezárult belépés előtt.',
      'auth/popup-blocked':          'A böngésző blokkolta a Google-ablakot.',
      'auth/network-request-failed': 'Hálózati hiba — ellenőrizd a kapcsolatot.',
      'auth/too-many-requests':      'Túl sok próbálkozás — várj egy kicsit.'
    };
    return map[code] || (err && err.message) || 'Ismeretlen hiba történt.';
  }

  // ── V19: lazy SDK-betöltés (perf — mobil) ─────────────
  //   A Firebase SDK NEM blokkolja a page-render-t. A render UTÁN,
  //   idle-ben töltjük be az app + auth SDK-t. A firestore-t a sync.js
  //   tölti, CSAK ha a user bejelentkezett.
  const SDK_BASE = 'https://www.gstatic.com/firebasejs/10.12.2/';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[data-fb="' + src + '"]')) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.setAttribute('data-fb', src);
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('SDK nem tölthető: ' + src));
      document.head.appendChild(s);
    });
  }
  // Megosztott helper a sync.js-nek (firestore lazy-load)
  window.HanziFlowLoadFB = (file) => loadScript(SDK_BASE + file);

  function scheduleIdle(fn) {
    if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 2500 });
    else setTimeout(fn, 1200);
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    // file:// alatt nem indul (Firebase Auth http/https-t kíván)
    if (window.location.protocol === 'file:') {
      console.warn('[HanziFlowAuth] file:// protokoll — auth kikapcsolva (http/https kell).');
      _readyResolve(false);
      return;
    }
    // Lazy: a render után, idle-ben töltjük az SDK-t
    scheduleIdle(async () => {
      try {
        await loadScript(SDK_BASE + 'firebase-app-compat.js');
        await loadScript(SDK_BASE + 'firebase-auth-compat.js');
        initFirebase();
      } catch (e) {
        console.warn('[HanziFlowAuth] SDK lazy-load hiba:', e);
        _enabled = false;
        _readyResolve(false);
      }
    });
  }

  function initFirebase() {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      console.warn('[HanziFlowAuth] Firebase SDK nem töltődött be.');
      _readyResolve(false);
      return;
    }
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      _auth = firebase.auth();
      _enabled = true;
      // Session-perzisztencia: LOCAL (page-reload után is bejelentkezve marad)
      try { _auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) {}
      _auth.onAuthStateChanged(user => { _cacheUser(user); _notify(user); });
      _readyResolve(true);
    } catch (e) {
      console.warn('[HanziFlowAuth] init hiba:', e);
      _enabled = false;
      _readyResolve(false);
    }
  }

  // ── Publikus műveletek ────────────────────────────────
  async function register(email, password, displayName) {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const cred = await _auth.createUserWithEmailAndPassword(email, password);
    if (displayName && cred.user) {
      try { await cred.user.updateProfile({ displayName }); } catch (e) {}
    }
    return cred.user;
  }
  async function login(email, password) {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const cred = await _auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  }
  async function loginGoogle() {
    if (!_enabled) throw new Error('Az auth jelenleg nem elérhető (HTTP szerver kell).');
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await _auth.signInWithPopup(provider);
    return cred.user;
  }
  async function logout() {
    if (!_enabled) return;
    await _auth.signOut();
  }

  // DOM ready után init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    ready, isEnabled, getUser, onChange, getCachedUser,
    register, login, loginGoogle, logout, humanError
  };
})();
