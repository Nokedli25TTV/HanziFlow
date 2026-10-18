/* ====================================================
   HANZIFLOW — az app teljes logikája (egy fájl minden oldalhoz)
   ----------------------------------------------------
   Felül a közös részek (minden oldalon futnak), alattuk
   oldalanként egy init…Page(); a fájl végén az oldal-felismerő
   a <main> azonosítója szerint választ.
   Alap: a NihonCore váza (kör-keret, tanulási út, ismétlés,
   statisztika), a japán-specifikus részek nélkül.
   ==================================================== */

// ── HanziFlowMotion ── Zen-polish animation motor ──
//   Vékony anime.js wrapper, ami minden modulban újrahasznosítható.
//   Opcionális: ha az anime.js CDN nem töltődik be (offline első
//   indítás), a függvények csendben no-op-ot adnak vissza, és az
//   app működik animáció nélkül is.
//
//   API a `window.HanziFlowMotion`-on:
//     flashCorrect(el, opts)  — lágy zöld felvillanás (a „helyes" szín)
//     shakeWrong(el, opts)    — finom horizontális rázkódás
//     staggerIn(els, opts)    — listák lépcsős megjelenése
//     cardSlideIn(el, opts)   — új kártya alulról-fel (220ms)
//     tokenPop(el, opts)      — chip "pop" érzet (0.8→1.04→1)
//
//   Mind ease-out (Emil-szabály), gyors (120-220ms), opcionális.
window.HanziFlowMotion = (function () {
  const hasAnime = () => typeof window.anime === 'function';
  const reducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function flashCorrect(el, opts) {
    if (!el || reducedMotion()) return;
    opts = opts || {};
    // matcha-soft → transparent → matcha-soft pulzus (0.22s + 0.22s)
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        backgroundColor: [
          { value: 'rgba(76, 154, 31, 0.22)', duration: 180, easing: 'easeOutQuad' },
          { value: 'rgba(76, 154, 31, 0.00)', duration: 320, easing: 'easeOutQuad' }
        ],
        complete: () => { el.style.backgroundColor = ''; }
      });
    } else {
      // CSS fallback — egyszeri class-toggle, 500ms
      el.classList.add('hfm-flash-correct');
      setTimeout(() => el.classList.remove('hfm-flash-correct'), 500);
    }
  }

  function shakeWrong(el, opts) {
    if (!el || reducedMotion()) return;
    opts = opts || {};
    const amp = opts.amplitude || 6;     // ±6px
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        translateX: [
          { value: -amp,    duration: 70 },
          { value:  amp,    duration: 70 },
          { value: -amp*0.7,duration: 65 },
          { value:  amp*0.7,duration: 65 },
          { value: 0,       duration: 70 }
        ],
        easing: 'easeOutQuad',
        complete: () => { el.style.transform = ''; }
      });
    } else {
      el.classList.add('hfm-shake-wrong');
      setTimeout(() => el.classList.remove('hfm-shake-wrong'), 360);
    }
  }

  function staggerIn(els, opts) {
    if (!els || !els.length || reducedMotion()) return;
    opts = opts || {};
    const delay = opts.delay || 40;
    if (hasAnime()) {
      anime.remove(els);
      // kezdeti állapot
      Array.from(els).forEach(e => {
        e.style.opacity = '0';
        e.style.transform = 'translateY(8px)';
      });
      anime({
        targets: Array.from(els),
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 220,
        easing: 'easeOutCubic',
        delay: anime.stagger(delay),
        complete: () => {
          Array.from(els).forEach(e => {
            e.style.opacity = '';
            e.style.transform = '';
          });
        }
      });
    }
  }

  function cardSlideIn(el, opts) {
    if (!el || reducedMotion()) return;
    if (hasAnime()) {
      anime.remove(el);
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 220,
        easing: 'easeOutCubic',
        complete: () => {
          el.style.opacity = '';
          el.style.transform = '';
        }
      });
    }
  }

  function tokenPop(el, opts) {
    if (!el || reducedMotion()) return;
    if (hasAnime()) {
      anime.remove(el);
      anime({
        targets: el,
        scale: [
          { value: 0.85, duration: 80, easing: 'easeOutQuad' },
          { value: 1.04, duration: 90, easing: 'easeOutQuad' },
          { value: 1.0,  duration: 70, easing: 'easeOutQuad' }
        ],
        complete: () => { el.style.transform = ''; }
      });
    }
  }

  // Ünneplés — hibátlan kör, szintlépés
  //   options: { message?: string, emojis?: string[], duration?: ms }
  //
  //   Egy fixed overlay-t hoz létre, ami a viewport tetején lebeg.
  //   5-7 sakura/celebráció-emoji szétfut radiális mintázatban + szétpattan
  //   + elhalvány. Plusz egy "üdvözlő kártya" jelenik meg a közepén
  //   (szülőjével megadható: pl. "Új szint elérve!").
  //   ~1500ms total. NEM blokkoló, ÚJ overlay (nem nyúl a DOM-hoz).
  function celebrate(opts) {
    if (reducedMotion()) return;
    opts = opts || {};
    const emojis    = opts.emojis  || ['🏮', '✨', '🎉', '🧧', '✨', '🏮'];
    const message   = opts.message || opts.title || 'Új szint elérve!';
    const subtitle  = opts.subtitle || opts.sub || '';

    // Overlay + emoji-konténer + üdvözlő kártya
    const overlay = document.createElement('div');
    overlay.className = 'hfm-celebrate-overlay';
    overlay.innerHTML = `
      <div class="hfm-celebrate-card">
        <div class="hfm-celebrate-title">${message}</div>
        ${subtitle ? `<div class="hfm-celebrate-sub">${subtitle}</div>` : ''}
      </div>
      <div class="hfm-celebrate-particles"></div>`;
    document.body.appendChild(overlay);

    const card      = overlay.querySelector('.hfm-celebrate-card');
    const particles = overlay.querySelector('.hfm-celebrate-particles');

    // Részecskék generálása
    const N = 8;
    for (let i = 0; i < N; i++) {
      const span = document.createElement('span');
      span.className = 'hfm-celebrate-particle';
      span.textContent = emojis[i % emojis.length];
      particles.appendChild(span);
    }
    const particleEls = particles.querySelectorAll('.hfm-celebrate-particle');

    if (hasAnime()) {
      // Card: scale-pop + opacity fade-in/out
      anime({
        targets: card,
        scale: [
          { value: [0.6, 1.06], duration: 240, easing: 'easeOutCubic' },
          { value: 1.0,          duration: 120, easing: 'easeOutQuad' }
        ],
        opacity: [
          { value: [0, 1], duration: 200, easing: 'easeOutQuad' },
          { value: 1,      duration: 700, easing: 'linear' },
          { value: 0,      duration: 360, easing: 'easeOutQuad' }
        ]
      });
      // Particles: radiálisan szétfutnak
      particleEls.forEach((p, i) => {
        const angle = (Math.PI * 2 * i) / particleEls.length + (Math.random() - 0.5) * 0.4;
        const dist  = 140 + Math.random() * 80;
        const tx    = Math.cos(angle) * dist;
        const ty    = Math.sin(angle) * dist;
        const rot   = (Math.random() - 0.5) * 90;
        anime({
          targets: p,
          translateX: [0, tx],
          translateY: [0, ty],
          rotate:     [0, rot],
          scale:      [0.4, 1.2, 0.8],
          opacity:    [0, 1, 0],
          duration:   1300 + Math.random() * 300,
          delay:      i * 35,
          easing:     'easeOutCubic'
        });
      });
    }

    // Auto-cleanup
    const dur = opts.duration || 1500;
    setTimeout(() => { overlay.remove(); }, dur);
  }

  return { flashCorrect, shakeWrong, staggerIn, cardSlideIn, tokenPop, celebrate };
})();

// CSS fallback osztályok (ha anime.js nincs)
(function injectMotionFallbackCSS() {
  if (document.getElementById('hfm-fallback-styles')) return;
  const css = `
    @keyframes hfm-flash-correct-kf {
      0%   { background-color: rgba(76, 154, 31, 0.22); }
      100% { background-color: transparent; }
    }
    @keyframes hfm-shake-wrong-kf {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
    .hfm-flash-correct { animation: hfm-flash-correct-kf 500ms ease-out; }
    .hfm-shake-wrong   { animation: hfm-shake-wrong-kf 320ms ease-out; }
  `;
  const style = document.createElement('style');
  style.id = 'hfm-fallback-styles';
  style.textContent = css;
  document.head.appendChild(style);
})();

// Oldalváltás: sima többoldalas navigáció. Az áttűnést a böngésző natív
// cross-document view-transition-je adja (style.css: @view-transition) —
// nincs SPA-réteg, így minden oldal a saját fejlécével és adataival tölt be.


// ── HanziFlowRound ── Univerzális kör-őr + modul-név (V18) ────────────
//   Req 1: aktív kör közben BÁRMILYEN kilépés (logo / 🏠 / böngésző-vissza /
//          user-menü link) megerősítést kér — nem csak a „Kilépés" gomb.
//   Req 2: a modul neve MINDIG látszik a fejlécben (lobby ÉS kör közben),
//          a .module-page-title-ből a .module-page-nav-ba tükrözve.
//   Req 3: ha kör közben kilépsz (bárhogy), az eddigi válaszaid (helyes/
//          hibás) elmentődnek a statisztikába — nem csak a befejezett körök.
//
//   Egy kör életciklusa:
//     begin(snapshotFn)  — a modul a kör indításakor regisztrál egy
//        pillanatkép-fn-t, ami { module, mode, results, score, startTs }-t ad.
//     recordSession (kör vége) → markComplete() → a kör inaktív lesz.
//     Kilépés kör közben → flush() → ha van eredmény, recordSession(pillanatkép).
//   A flush-t a hero újra-megjelenése (kör → lobby), a navigációs-őr és a
//   pagehide is meghívja; a markComplete + _recorded gátolja a dupla mentést.
window.HanziFlowRound = (function () {
  var _active = false;
  var _recorded = false;
  var _snapshot = null;
  var _heroObserver = null;
  var EXIT_MSG = 'Biztosan kilépsz a körből?\n\n' +
    'A megkezdett kört nem fejezed be, de az eddigi válaszaid (helyes/hibás) ' +
    'elmentődnek a statisztikába.';

  function begin(snapshotFn) {
    _active = true; _recorded = false;
    _snapshot = (typeof snapshotFn === 'function') ? snapshotFn : null;
    markBody();
    scrollToRound();
  }
  function isActive() { return _active; }

  // A futó kör tetejére görget: a Pont/Sorozat sor a fix fejléc alá kerül.
  // A lobby alján lévő „Indítás" gomb és a feedback alján lévő „Következő"
  // után a kártya teteje különben a képernyő fölött marad.
  // rAF: a hívó a begin() UTÁN váltja láthatóra a runtime-ot. A module.html
  // fázisainak nincs .pr-stats sora → ott no-op (saját scrollIntoView-juk van).
  // target (nem kötelező): a kártya egy eleme — a kör teteje helyett ahhoz görget (olvasásnál a kérdéshez,
  // ha a szöveget a tanuló már látta: a szöveg vége a kérdés fölött látszik, a többi egy mozdulattal elérhető)
  function scrollToRound(target) {
    requestAnimationFrame(function () {
      var header = document.getElementById('header');
      var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var go = function (el, lead) {
        var top = el.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - lead;
        window.scrollTo({ top: Math.max(0, top), behavior: calm ? 'auto' : 'smooth' });
      };
      if (target && target.offsetParent !== null) { go(target, 88); return; }
      var rows = document.querySelectorAll('.pr-stats');
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].offsetParent === null) continue;
        go(rows[i], 16);
        return;
      }
    });
  }
  function markComplete() { _recorded = true; _active = false; markBody(); }

  // body.round-active: kör közben a fül-sáv és a lábléc helyet ad a kártyának
  function markBody() {
    if (document.body) document.body.classList.toggle('round-active', _active);
  }

  function flush() {
    if (!_active || _recorded || !_snapshot) { _active = false; markBody(); return; }
    try {
      var info = _snapshot();
      if (info && info.results && info.results.length > 0 &&
          window.HanziFlowStats && HanziFlowStats.recordSession) {
        _recorded = true;
        info.partial = true;                  // félbehagyott kör jelölése a statisztikában
        HanziFlowStats.recordSession(info);   // markComplete a recordSession-ben fut le
      }
    } catch (e) {}
    _active = false;
    markBody();
  }

  // ── Req 2 — modul-név a fejlécben ───────────────────
  function refreshBadge() {
    try {
      var nav = document.querySelector('.nav.module-page-nav');
      if (!nav) return;
      var titleEl = document.querySelector('.module-page-title');
      var name = titleEl ? (titleEl.textContent || '').trim() : '';
      if (!name) {   // pl. practice.html — nincs .module-page-title → a <title>-ből
        name = (document.title || '').replace(/\s*[—–-]\s*HanziFlow.*$/, '').trim();
      }
      nav.innerHTML = name ? '<span class="module-name-badge">' + name + '</span>' : '';
    } catch (e) {}
  }

  // ── Req 3 — hero újra-megjelenés (kör → lobby) → részeredmény mentés ──
  function attachHeroObserver() {
    if (!window.MutationObserver) return;
    if (_heroObserver) { _heroObserver.disconnect(); _heroObserver = null; }
    var hero = document.querySelector('.module-hero');
    if (!hero) return;
    _heroObserver = new MutationObserver(function () {
      if (_active && !hero.classList.contains('hidden')) flush();
    });
    _heroObserver.observe(hero, { attributes: true, attributeFilter: ['class'] });
  }

  // initCurrentPage hívja
  function refresh() { refreshBadge(); attachHeroObserver(); }

  // ── Kilépés-megerősítő lap (a natív confirm() helyett) ──
  var _sheet = null;
  function closeSheet() {
    if (!_sheet) return;
    document.removeEventListener('keydown', _sheet._onKey, true);
    _sheet.remove(); _sheet = null;
  }
  // Általános megerősítő lap. opts: { title, text, yes, no } — minden mező egyszerű szöveg.
  // A biztonságos gomb (no) kapja a fókuszt; Esc és a háttérre kattintás = mégsem.
  function confirmSheet(opts, onYes) {
    closeSheet();
    var el = document.createElement('div');
    el.className = 'hf-exit-backdrop';
    el.innerHTML =
      '<div class="hf-exit-sheet" role="alertdialog" aria-modal="true" aria-labelledby="ncExitTitle" aria-describedby="ncExitText">' +
        '<h2 class="hf-exit-title" id="ncExitTitle"></h2>' +
        '<p class="hf-exit-text" id="ncExitText"></p>' +
        '<div class="hf-exit-actions">' +
          '<button class="btn btn-outline hf-exit-yes" type="button"></button>' +
          '<button class="btn btn-primary hf-exit-no" type="button"></button>' +
        '</div>' +
      '</div>';
    el.querySelector('.hf-exit-title').textContent = opts.title;
    el.querySelector('.hf-exit-text').textContent = opts.text;
    el.querySelector('.hf-exit-yes').textContent = opts.yes;
    el.querySelector('.hf-exit-no').textContent = opts.no || 'Mégsem';
    document.body.appendChild(el);
    _sheet = el;
    el._onKey = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeSheet(); }
    };
    document.addEventListener('keydown', el._onKey, true);
    el.addEventListener('click', function (e) { if (e.target === el) closeSheet(); });
    el.querySelector('.hf-exit-no').addEventListener('click', closeSheet);
    el.querySelector('.hf-exit-yes').addEventListener('click', function () { closeSheet(); onYes(); });
    try { el.querySelector('.hf-exit-no').focus(); } catch (err) {}
  }
  function confirmExit(onYes) {
    confirmSheet({
      title: 'Kilépsz a körből?',
      text: 'A kört nem fejezed be, de az eddigi válaszaid elmentődnek a statisztikába.',
      yes: 'Kilépés', no: 'Folytatom'
    }, onYes);
  }
  // Törlés megerősítése (profil, ismétlés-ütemezés, előzmények)
  function confirmDelete(title, text, onYes) {
    confirmSheet({ title: title, text: text, yes: 'Törlés', no: 'Mégsem' }, onYes);
  }

  // ✕ gomb: a modul saját kezelője confirm()-ot hív — az újra-kattintás idejére igent adunk
  function onExitClick(e) {
    var btn = (e.target && e.target.closest) ? e.target.closest('.round-exit') : null;
    if (!btn || !_active) return;
    if (btn._ncConfirmed) { btn._ncConfirmed = false; return; }     // megerősítve: mehet a modul kezelője
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    confirmExit(function () {
      var orig = window.confirm;
      window.confirm = function () { return true; };
      btn._ncConfirmed = true;
      try { btn.click(); } finally { window.confirm = orig; btn._ncConfirmed = false; }
    });
  }

  // ── Req 1 — navigációs őr (capture fázisban) ──
  function onClick(e) {
    if (!_active) return;
    var a = (e.target && e.target.closest) ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.closest('.round-exit')) return;            // a ✕ gombot az onExitClick kezeli
    if (a.hasAttribute('data-no-guard')) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return;
    // Kör közben elnavigálna: megerősítés a saját lappal, igen esetén mentés + navigáció
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    confirmExit(function () {
      flush();
      window.location.href = a.href;
    });
  }

  function init() {
    document.addEventListener('click', onExitClick, true);
    document.addEventListener('click', onClick, true);
    window.addEventListener('beforeunload', function (e) {
      if (_active) { e.preventDefault(); e.returnValue = ''; return ''; }
    });
    window.addEventListener('pagehide', function () { if (_active) flush(); });
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { begin: begin, isActive: isActive, markComplete: markComplete, flush: flush, refresh: refresh, scrollToRound: scrollToRound, confirmDelete: confirmDelete };
})();


// ── HanziFlowPath ── tanulási út (kezdőlap) ──
//   A lépések a HANZIFLOW_PATH-ban vannak (js/data/core.js). Itt:
//     · a haladás tárolása (localStorage 'hanziflow_path_v1', szinkronizálva):
//         { level: 'zero' | 'pinyin' | null, steps: { id: { best, done, ts } } }
//     · az aktív lépés: a modul-oldal ?step=<id> paramétere (nem tárolódik —
//       szabad gyakorlásnál nincs aktív lépés, így a kör nem számít az útba)
//     · apply(module, settings): a lépés előre beállított köre a modulra
//     · onSession(rec): befejezett kör → a lépés eredménye
window.HanziFlowPath = (function () {
  const KEY = 'hanziflow_path_v1';
  const PASS = 0.6;                        // ennyitől „kész" a lépés
  const STEPS = (typeof HANZIFLOW_PATH !== 'undefined') ? HANZIFLOW_PATH : [];

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && typeof s === 'object') { s.steps = s.steps || {}; return s; }
    } catch (e) {}
    return { level: null, steps: {} };
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    if (window.HanziFlowSync && HanziFlowSync.schedulePush) HanziFlowSync.schedulePush();
  }

  function getStep(id) { return STEPS.find(s => s.id === id) || null; }
  const activeId = (function () {
    try { return new URLSearchParams(window.location.search).get('step'); } catch (e) { return null; }
  })();
  function activeStep() { return activeId ? getStep(activeId) : null; }

  function setLevel(level) { const st = load(); st.level = level; save(st); }

  // A lépések a tanuló szintje szerint: aki már olvassa a pinyint, annál az előkészítő lépések „átugorva"
  function view() {
    const st = load();
    const rows = STEPS.map((s, i) => {
      const r = st.steps[s.id] || {};
      const skipped = s.level === 'zero' && st.level === 'pinyin' && !r.done;
      return { step: s, index: i, done: !!r.done, best: typeof r.best === 'number' ? r.best : null, skipped: skipped, optional: !!s.optional };
    });
    // a nem kötelező lépés (dolgozat) nem állítja meg az utat, és nem számít bele a haladásba
    const next = rows.find(r => !r.done && !r.skipped && !r.optional) || null;
    const total = rows.filter(r => !r.skipped && !r.optional).length;
    const doneCount = rows.filter(r => r.done && !r.skipped && !r.optional).length;
    return { level: st.level, rows: rows, next: next, total: total, doneCount: doneCount };
  }

  // A lépés előre beállított köre a modul beállításaira
  function apply(moduleKey, settings) {
    const step = activeStep();
    if (!step || step.module !== moduleKey || !step.preset || !settings) return false;
    const p = step.preset;
    if (p.only) {
      Object.keys(p.only).forEach(k => {
        const map = settings[k];
        if (!map || typeof map !== 'object') return;
        Object.keys(map).forEach(x => { map[x] = false; });
        p.only[k].forEach(x => { map[x] = true; });
      });
    }
    if (p.set) Object.keys(p.set).forEach(k => { settings[k] = p.set[k]; });
    return true;
  }

  // A lecke-oldalon kétféle kör fut (ellenőrző és hallás utáni): a kör azt a lépést teljesíti,
  // amelyik ehhez a leckéhez és ehhez a körfajtához tartozik, bármelyik lépésről nyílt az oldal.
  function lessonStep(rec) {
    let id = null;
    try { id = new URLSearchParams(window.location.search).get('id'); } catch (e) {}
    if (!id || !/^\w+$/.test(id)) return null;
    const re = new RegExp('[?&]id=' + id + '(&|$)');
    return STEPS.find(s => s.module === 'lesson' && (s.mode || 'check') === rec.mode && re.test(s.href)) || null;
  }

  // Befejezett kör → a lépés eredménye (HanziFlowStats.recordSession hívja)
  function onSession(rec) {
    const step = (rec && rec.module === 'lesson') ? lessonStep(rec) : activeStep();
    if (!step || !rec || rec.partial || rec.module !== step.module || !rec.questionCount) return;
    const pct = rec.correctCount / rec.questionCount;
    const st = load();
    const prev = st.steps[step.id] || {};
    const wasDone = !!prev.done;
    st.steps[step.id] = {
      best: Math.max(typeof prev.best === 'number' ? prev.best : 0, pct),
      done: wasDone || pct >= PASS,
      ts: Date.now()
    };
    save(st);
    // A lecke-oldal összesítője maga vezet tovább a gyakorlásra: ott nem kell a lebegő jelzés.
    if (step.module !== 'lesson') showResult(step, pct, pct >= PASS, wasDone);
  }

  const homeHref = () => (window.location.pathname.includes('/pages/') ? '../' : '') + 'index.html#path';

  function showResult(step, pct, passed, wasDone) {
    const old = document.querySelector('.path-result');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'path-result ' + (passed ? 'path-result-ok' : 'path-result-retry');
    el.setAttribute('role', 'status');
    const p = Math.round(pct * 100);
    el.innerHTML =
      '<div class="path-result-text">' +
        '<strong>' + (passed ? (wasDone ? 'Újra megvan: ' : 'Lépés kész: ') + step.title
                             : step.title + ': most ' + p + '%') + '</strong>' +
        '<span>' + (passed ? p + '%-os kör. Mehet a következő lépés.'
                           : 'A lépéshez ' + Math.round(PASS * 100) + '% kell. Egy újabb körrel meglesz.') + '</span>' +
      '</div>' +
      '<a class="btn btn-primary" href="' + homeHref() + '">' + (passed ? 'Tovább az úton' : 'Vissza az útra') + '</a>' +
      '<button class="path-result-x" type="button" aria-label="Bezárás">✕</button>';
    document.body.appendChild(el);
    el.querySelector('.path-result-x').addEventListener('click', () => el.remove());
  }

  // Modul-oldalon: jelzés, hogy a kör a tanulási út lépéséhez van beállítva
  function banner() {
    const step = activeStep();
    const main = document.querySelector('.module-main');
    if (!step || !main || main.querySelector('.path-banner')) return;
    const b = document.createElement('a');
    b.className = 'path-banner';
    b.href = homeHref();
    b.innerHTML = '<span class="path-banner-glyph">' + step.glyph + '</span>' +
      '<span class="path-banner-text"><span class="path-banner-kicker">Tanulási út</span>' +
      '<strong>' + step.title + '</strong></span>';
    main.insertBefore(b, main.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();

  return {
    steps: STEPS, view: view, setLevel: setLevel, apply: apply,
    activeStep: activeStep, onSession: onSession, PASS: PASS,
    stepHref: function (step, fromRoot) {
      const sep = step.href.indexOf('?') >= 0 ? '&' : '?';
      return (fromRoot === false ? '../' : '') + step.href + sep + 'step=' + step.id;
    }
  };
})();


// ── HanziFlowPrefs ── eszköz-szintű gyakorlási beállítások ──
//   timerOn(): kell-e időlimit a beírós (Mester / Kiegészítés) módokban.
//   Alapból KI: a kezdő nyugodtan gondolkodhat; aki reflexet edz, bekapcsolja
//   a lobbi „Testreszabás" részében.
window.HanziFlowPrefs = (function () {
  const TIMER_KEY = 'hanziflow_timer';
  function timerOn() {
    try { return localStorage.getItem(TIMER_KEY) === 'on'; } catch (e) { return false; }
  }
  function setTimer(on) {
    try { localStorage.setItem(TIMER_KEY, on ? 'on' : 'off'); } catch (e) {}
  }
  return { timerOn: timerOn, setTimer: setTimer };
})();


// ── Lobbi-átrendező ── „Gyors indítás" minden modulban ──
//   A modulok lobbija eredetileg beállítópanel volt: 4–5 szekció után jött
//   az Indítás. Itt egységesen átrendezzük:
//     fejléc → Mód (ha van) → Indítás → <details> Testreszabás (minden más)
//   A csomópontokat MOZGATJUK (nem újraírjuk), így a modulok eseménykezelői
//   élnek tovább. A lobbi teljes újra-renderelésekor a MutationObserver
//   újra lefut; a Testreszabás nyitott/zárt állapota megmarad.
(function initLobbyQuickStart() {
  const LOBBY_SEL = '.conj-lobby, .practice-lobby, .ms-lobby, .cnt-lobby';
  const OPEN_KEY = 'hanziflow_lobby_custom_open';
  const TIMED_LOBBIES = { pinyinLobby: 12 };   // mp / kártya
  const CHEVRON = '<svg class="lcs-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function isOpen() { try { return localStorage.getItem(OPEN_KEY) === '1'; } catch (e) { return false; } }

  function timerRow(seconds) {
    const row = document.createElement('div');
    row.className = 'lobby-section cj-adaptive-section';
    row.innerHTML =
      '<label class="cj-adapt-switch">' +
        '<input type="checkbox" class="lobby-timer-toggle"' + (HanziFlowPrefs.timerOn() ? ' checked' : '') + ' />' +
        '<span class="cj-adapt-text"><strong>Időlimit a beírós módokban</strong>' +
        '<em>Bekapcsolva ' + seconds + ' másodperc jut egy kártyára. Kikapcsolva nyugodtan gondolkodhatsz.</em></span>' +
      '</label>';
    row.querySelector('input').addEventListener('change', e => HanziFlowPrefs.setTimer(e.target.checked));
    return row;
  }

  function enhance(lobby) {
    const sections = Array.prototype.filter.call(lobby.children, c => c.classList.contains('lobby-section'));
    if (!sections.length || lobby.querySelector(':scope > .lobby-custom')) return;

    const isMode = s => s.hasAttribute('data-lobby-keep') || !!s.querySelector('[class*="mode-row"]');
    const modeSections = sections.filter(isMode);
    const rest = sections.filter(s => !isMode(s));
    const start = Array.prototype.find.call(lobby.children, c => c.classList.contains('ml-start'));
    const stats = Array.prototype.find.call(lobby.children, c => c.classList.contains('lobby-stats'));
    if (!start || !rest.length) return;

    // a szekció-címkék sorszámai az új sorrendben már nem igazak
    lobby.querySelectorAll('.lobby-section-label').forEach(l => {
      const first = l.firstChild;
      if (first && first.nodeType === 3) first.nodeValue = first.nodeValue.replace(/^\s*\d+\s*·\s*/, '');
    });

    const details = document.createElement('details');
    details.className = 'lobby-custom';
    details.open = isOpen();
    details.innerHTML =
      '<summary class="lobby-custom-summary">' +
        '<span class="lcs-text"><span class="lcs-title">Testreszabás</span>' +
        '<span class="lcs-sub">szűrők, kártyaszám, haladó beállítások</span></span>' + CHEVRON +
      '</summary><div class="lobby-custom-body"></div>';
    details.addEventListener('toggle', () => {
      try { localStorage.setItem(OPEN_KEY, details.open ? '1' : '0'); } catch (e) {}
    });
    const body = details.querySelector('.lobby-custom-body');

    lobby.insertBefore(details, rest[0]);
    rest.forEach(s => body.appendChild(s));
    if (TIMED_LOBBIES[lobby.id]) body.appendChild(timerRow(TIMED_LOBBIES[lobby.id]));
    if (stats) body.appendChild(stats);

    // Indítás: a mód-szekció(k) után, a Testreszabás elé
    modeSections.forEach(s => lobby.insertBefore(s, details));
    const quick = document.createElement('div');
    quick.className = 'lobby-quick';
    lobby.insertBefore(quick, details);
    quick.appendChild(start);
    lobby.classList.add('lobby-enhanced');

    const title = lobby.querySelector('.lobby-title');
    if (title) title.textContent = modeSections.length ? 'Mit gyakorolnál?' : 'Indulhat a kör';
  }

  function scan(root) {
    (root || document).querySelectorAll(LOBBY_SEL).forEach(enhance);
  }
  function start() {
    scan(document);
    if (!window.MutationObserver) return;
    new MutationObserver(() => scan(document))
      .observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


// ── Kör-billentyűk + fókusz ──
//   Egységes billentyűzet-kezelés minden gyakorló körben:
//     1–9     a megfelelő válaszlehetőség
//     Enter   tovább (a visszajelzés fő gombja) — a gomb fókuszt is kap,
//             így a szóköz és az Enter natívan is működik
//     Esc     kilépés a körből (a megszokott megerősítéssel)
//   A visszajelzés megjelenésekor a fő gombja fókuszt kap; ha a visszajelzés
//   nem rögzített lap (module.html fázisai), a képernyőre is görgetjük.
(function initRoundKeys() {
  const OPTION_SEL = '.cj-option, .cnt-option, .sd-option, .mc-choice';
  const FEEDBACK_SEL = '.conj-feedback, .pr-feedback, .ms-feedback, .cnt-feedback, .sd-advance';
  const visible = el => !!el && el.offsetParent !== null;

  function primaryButton(fb) {
    return fb.querySelector('.btn-primary:not(:disabled)') || fb.querySelector('button:not(:disabled)');
  }
  function openFeedback() {
    const all = document.querySelectorAll(FEEDBACK_SEL);
    for (let i = 0; i < all.length; i++) {
      if (!all[i].classList.contains('hidden') && all[i].childElementCount > 0 &&
          (visible(all[i]) || getComputedStyle(all[i]).position === 'fixed')) return all[i];
    }
    return null;
  }

  document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!window.HanziFlowRound || !HanziFlowRound.isActive()) return;
    const t = e.target;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);

    if (e.key === 'Escape') {
      const exit = Array.prototype.find.call(document.querySelectorAll('.round-exit'), visible);
      if (exit) { e.preventDefault(); exit.click(); }
      return;
    }
    if (typing) return;

    if (e.key === 'Enter') {
      // gombon/linken állva a böngésző maga kattint
      if (t && (t.tagName === 'BUTTON' || t.tagName === 'A')) return;
      const fb = openFeedback();
      const btn = fb && primaryButton(fb);
      if (btn) { e.preventDefault(); btn.click(); }
      return;
    }
    if (/^[1-9]$/.test(e.key)) {
      const opts = Array.prototype.filter.call(document.querySelectorAll(OPTION_SEL), o => visible(o) && !o.disabled);
      const pick = opts[parseInt(e.key, 10) - 1];
      if (pick) { e.preventDefault(); pick.click(); }
    }
  });

  // Visszajelzés megjelent → fókusz a fő gombra (+ görgetés, ha nem rögzített lap)
  function onFeedbackShown(fb) {
    if (fb.classList.contains('hidden') || fb.childElementCount === 0) return;
    requestAnimationFrame(() => {
      const btn = primaryButton(fb);
      if (getComputedStyle(fb).position !== 'fixed') {
        try { fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) {}
      }
      if (btn) { try { btn.focus({ preventScroll: true }); } catch (err) {} }
    });
  }
  function start() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(muts => {
      const seen = new Set();
      muts.forEach(m => {
        const el = m.target && m.target.closest ? m.target.closest(FEEDBACK_SEL) : null;
        if (el && !seen.has(el)) { seen.add(el); onFeedbackShown(el); }
      });
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


// ── PWA install prompt + SW update banner (V8) ──
//   1) "Telepítsd a telefonra" toast a beforeinstallprompt eventen
//   2) "Új verzió elérhető — frissítés" toast amikor a SW új verziót talál
//   Mindkettő opt-in: a user "Mégsem"-mel elutasíthatja, és nem zaklatjuk újra
//   egy ideig (localStorage-szel tárolva).
(function initPWAToasts() {
  if (typeof document === 'undefined') return;
  const LS = {
    installDismissed: 'hanziflow_pwa_install_dismissed_ts'
  };
  const DISMISS_COOLDOWN_DAYS = 14;

  function showToast(opts) {
    // opts: { id, icon, title, sub, ctaLabel, onCta, onClose? }
    if (document.querySelector('#' + opts.id)) return; // ne dupla
    const el = document.createElement('div');
    el.className = 'hf-toast';
    el.id = opts.id;
    el.innerHTML = `
      <span class="hf-toast-icon">${opts.icon || '✨'}</span>
      <div class="hf-toast-body">
        <div class="hf-toast-title">${opts.title}</div>
        ${opts.sub ? `<div class="hf-toast-sub">${opts.sub}</div>` : ''}
      </div>
      <div class="hf-toast-actions">
        ${opts.ctaLabel ? `<button class="hf-toast-btn" type="button" data-act="cta">${opts.ctaLabel}</button>` : ''}
        <button class="hf-toast-close" type="button" data-act="close" aria-label="Bezárás">✕</button>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('visible'));

    function close() {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 280);
      if (typeof opts.onClose === 'function') opts.onClose();
    }
    el.querySelector('[data-act="cta"]')?.addEventListener('click', () => {
      if (typeof opts.onCta === 'function') opts.onCta();
      close();
    });
    el.querySelector('[data-act="close"]')?.addEventListener('click', close);
  }

  /* ── 1) PWA install prompt ────────────────────────── */
  let deferredInstallPrompt = null;
  function isRecentDismissal() {
    try {
      const ts = parseInt(localStorage.getItem(LS.installDismissed) || '0', 10);
      if (!ts) return false;
      const days = (Date.now() - ts) / (24 * 60 * 60 * 1000);
      return days < DISMISS_COOLDOWN_DAYS;
    } catch (e) { return false; }
  }
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    // Ne villantsd ki azonnal — 4 másodperc late, hogy a user először az app-ot lássa
    if (isRecentDismissal()) return;
    setTimeout(() => {
      if (!deferredInstallPrompt) return;
      showToast({
        id: 'hf-toast-pwa-install',
        icon: '📲',
        title: 'Telepítsd a telefonra',
        sub: 'Offline elérhető, gyorsabb betöltés, főképernyő-ikon.',
        ctaLabel: 'Telepítés',
        onCta: async () => {
          try {
            deferredInstallPrompt.prompt();
            const choice = await deferredInstallPrompt.userChoice;
            // 'accepted' vagy 'dismissed'
            if (choice && choice.outcome === 'dismissed') {
              try { localStorage.setItem(LS.installDismissed, String(Date.now())); } catch (e) {}
            }
          } catch (err) { /* csendes */ }
          deferredInstallPrompt = null;
        },
        onClose: () => {
          try { localStorage.setItem(LS.installDismissed, String(Date.now())); } catch (e) {}
        }
      });
    }, 4000);
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    document.querySelector('#hf-toast-pwa-install')?.remove();
  });

  /* ── 2) SW új verzió banner ────────────────────────── */
  function watchSWUpdates() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.getRegistration().then(reg => {
      if (!reg) return;

      function offerReload(worker) {
        showToast({
          id: 'hf-toast-sw-update',
          icon: '✨',
          title: 'Új verzió elérhető',
          sub: 'Frissítsd az alkalmazást a legújabb tartalomért.',
          ctaLabel: 'Frissítés',
          onCta: () => {
            // A SW activate után controllerchange — automatikus reload
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            }, { once: true });
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      }

      // Ha már létezik egy "waiting" SW (előző látogatás után)
      if (reg.waiting && navigator.serviceWorker.controller) {
        offerReload(reg.waiting);
      }

      // Új SW települ → várjuk az installed állapotot
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        if (!newSW) return;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            offerReload(newSW);
          }
        });
      });
    }).catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchSWUpdates);
  } else {
    watchSWUpdates();
  }
})();


// ── HanziFlowTheme ── világos (papír) / sötét (tus) téma ──
//   A papír (világos) az alapértelmezett. A user toggle-eli a fejléc
//   közelében elhelyezett gombbal — localStorage perzisztálja.
//   Az inicializálás flicker-mentes: a HTML <head>-ben egy mini-IIFE
//   olvassa a localStorage-t és felteszi a class-t a CSS load előtt.
//   Ez az IIFE csak a toggle-eseményt és a dinamikus gomb-beillesztést kezeli.
(function initHanziFlowTheme() {
  const STORAGE_KEY = 'hanziflow_theme';
  const root = document.documentElement;

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'ink' ? 'ink' : 'paper';
    } catch (e) { return 'paper'; }
  }
  function setTheme(t) {
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
    // Smooth-transition class — 220ms alatt átolvad
    root.classList.add('theme-transition');
    if (t === 'ink') root.classList.add('theme-ink');
    else              root.classList.remove('theme-ink');
    // Frissítsd a meta theme-color-t is (PWA telefonon)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'ink' ? '#16140F' : '#F6F1E8');
    // Frissítsd minden injektált toggle-gomb ikonját
    document.querySelectorAll('.ht-theme-btn').forEach(btn => paintButton(btn, t));
    // Eltávolítjuk a transition class-t a tranzíció után — különben minden mozgás 220ms lenne
    setTimeout(() => root.classList.remove('theme-transition'), 260);
  }
  function toggle() {
    setTheme(getTheme() === 'ink' ? 'paper' : 'ink');
  }

  const ICON_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_SUN  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  function paintButton(btn, t) {
    btn.innerHTML = t === 'ink' ? ICON_SUN : ICON_MOON;
    const label = t === 'ink' ? 'Világos téma' : 'Sötét téma';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  // Egy téma-gomb a fejléc jobb oldalán, minden oldalon ugyanott.
  function injectThemeButton() {
    const authBtns = document.querySelector('.header .auth-buttons');
    if (!authBtns || authBtns.querySelector('.ht-theme-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'hf-icon-btn ht-theme-btn';
    btn.type = 'button';
    paintButton(btn, getTheme());
    btn.addEventListener('click', toggle);
    const home = authBtns.querySelector('.btn-home');
    if (home) authBtns.insertBefore(btn, home);
    else      authBtns.appendChild(btn);
  }

  function setup() {
    injectThemeButton();
    // a mentett téma szerint a böngésző-keret színe is (PWA telefonon)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getTheme() === 'ink' ? '#16140F' : '#F6F1E8');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  window.HanziFlowTheme = { get: getTheme, set: setTheme, toggle: toggle, inject: setup };
})();


// ── Alsó fül-sáv (telefon) ──
//   768px alatt ez a fő navigáció: Kezdőlap · Modulok · Statisztika · Fiók.
//   Minden oldalon ugyanaz, a body végére injektálva. Kör közben a
//   body.round-active rejti (style.css), hogy a kártyáé legyen a hely.
(function initAppTabbar() {
  const svg = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const ICONS = {
    home:    svg('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'),
    modules: svg('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
    stats:   svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    account: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>')
  };

  function inPages() { return window.location.pathname.includes('/pages/'); }
  function onIndex() { return !inPages(); }

  function onModules() { return /\/modules\.html$/.test(window.location.pathname); }

  // A Modulok oldal és minden modul-oldal a „Modulok" fülhöz tartozik.
  function currentTab() {
    const p = window.location.pathname;
    if (/\/stats\.html$/.test(p)) return 'stats';
    if (/\/(login|register)\.html$/.test(p)) return 'account';
    return inPages() ? 'modules' : 'home';
  }

  function setup() {
    if (document.querySelector('.hf-tabbar') || !document.body) return;
    const root = inPages() ? '../' : '';
    const tabs = [
      { id: 'home',    label: 'Kezdőlap',    href: root + 'index.html' },
      { id: 'modules', label: 'Modulok',     href: root + 'pages/modules.html' },
      { id: 'stats',   label: 'Statisztika', href: root + 'pages/stats.html' },
      { id: 'account', label: 'Fiók',        href: root + 'pages/login.html' }
    ];
    const cur = currentTab();
    const nav = document.createElement('nav');
    nav.className = 'hf-tabbar';
    nav.setAttribute('aria-label', 'Fő navigáció');
    nav.innerHTML = tabs.map(t =>
      '<a class="hf-tab' + (t.id === cur ? ' active' : '') + '" data-tab="' + t.id + '" href="' + t.href + '"' +
      (t.id === cur ? ' aria-current="page"' : '') + '>' + ICONS[t.id] + '<span>' + t.label + '</span></a>'
    ).join('');
    document.body.appendChild(nav);

    // Azon az oldalon, ahová a fül vinne, nem tölt újra: a lap tetejére görget.
    const toTop = (tab, here) => nav.querySelector('[data-tab="' + tab + '"]').addEventListener('click', e => {
      if (!here()) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { history.replaceState(null, '', window.location.pathname); } catch (err) {}
    });
    toTop('home', onIndex);
    toTop('modules', onModules);
    // Fiók: bejelentkezve a fejléc fiók-menüjét nyitja (nincs külön profil-oldal);
    // kijelentkezve a link a belépésre visz.
    nav.querySelector('[data-tab="account"]').addEventListener('click', e => {
      const userBtn = document.querySelector('.hf-user-btn');
      if (!userBtn) return;
      e.preventDefault(); e.stopPropagation();
      userBtn.click();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();


// ── Header login-state (V16) ──
//   A HanziFlowAuth.onChange-re figyel, és a fejléc "Bejelentkezés"
//   linkjét lecseréli a user nevére + kijelentkezés gombra.
//   Minden oldalon fut (univerzális). file:// alatt no-op (auth off).
(function initAuthHeaderState() {
  if (!window.HanziFlowAuth) return;

  function displayName(user) {
    if (!user) return '';
    return user.displayName || (user.email ? user.email.split('@')[0] : 'Felhasználó');
  }
  // Path-detektálás: a stats.html / index.html a pages/ vagy a root felől
  function inPages() { return window.location.pathname.includes('/pages/'); }
  function statsHref() { return inPages() ? 'stats.html' : 'pages/stats.html'; }
  function homeHref()  { return inPages() ? '../index.html' : 'index.html'; }

  function render(user) {
    const authBtns = document.querySelector('.auth-buttons');
    if (!authBtns) return;

    // A "Bejelentkezés" + "Regisztráció" linkek
    const loginLink = authBtns.querySelector('a[href*="login"]');
    const regLink   = authBtns.querySelector('a[href*="register"]');

    // Régi user-chip eltávolítása (újra-render)
    authBtns.querySelector('.hf-user-chip')?.remove();

    if (user) {
      // Bejelentkezve — login/register linkek elrejtése + user-chip
      if (loginLink) loginLink.style.display = 'none';
      if (regLink)   regLink.style.display = 'none';

      const chip = document.createElement('div');
      chip.className = 'hf-user-chip';
      chip.innerHTML = `
        <button class="hf-user-btn" type="button" title="Fiók">
          <span class="hf-user-avatar">${displayName(user).charAt(0).toUpperCase()}</span>
          <span class="hf-user-name">${displayName(user)}</span>
        </button>
        <div class="hf-user-menu" hidden>
          <div class="hf-user-menu-name">${displayName(user)}</div>
          <div class="hf-user-menu-email">${user.email || ''}</div>
          <a class="hf-user-menu-link" href="${statsHref()}">Statisztika</a>
          <a class="hf-user-menu-link" href="${homeHref()}">Kezdőlap</a>
          <div class="hf-sync-status" id="ncSyncStatus">☁️ Felhő-szinkron aktív</div>
          <button class="hf-sync-now" type="button">☁️ Szinkronizálás most</button>
          <button class="hf-user-logout" type="button">Kijelentkezés</button>
        </div>`;
      // A home-gomb ELÉ szúrjuk (ha van), egyébként a végére
      const home = authBtns.querySelector('.btn-home');
      if (home) authBtns.insertBefore(chip, home);
      else      authBtns.appendChild(chip);

      const btn  = chip.querySelector('.hf-user-btn');
      const menu = chip.querySelector('.hf-user-menu');
      btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.hidden = !menu.hidden;
      });
      document.addEventListener('click', () => { menu.hidden = true; });

      // A menü-linkek explicit JS-navigációval mennek, hogy a document
      // click-listener (menü bezárása) ne zavarjon be.
      chip.querySelectorAll('.hf-user-menu-link').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          const href = link.getAttribute('href');
          if (href) window.location.href = href;
        });
      });

      chip.querySelector('.hf-user-logout').addEventListener('click', async () => {
        try { await window.HanziFlowAuth.logout(); } catch (e) {}
        // A render az onChange-ben automatikusan visszaáll
      });

      // V17: manuális szinkronizálás + státusz
      const syncBtn = chip.querySelector('.hf-sync-now');
      const syncStatusEl = chip.querySelector('#ncSyncStatus');
      if (syncBtn && window.HanziFlowSync) {
        syncBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          syncBtn.disabled = true;
          const orig = syncBtn.textContent;
          syncBtn.textContent = '⏳ Szinkronizálás...';
          try { await window.HanziFlowSync.syncNow(); } catch (err) {}
          syncBtn.textContent = '✓ Kész';
          setTimeout(() => { syncBtn.textContent = orig; syncBtn.disabled = false; }, 1500);
        });
      }
      if (syncStatusEl && window.HanziFlowSync) {
        window.HanziFlowSync.onStatus((state, detail) => {
          const el = document.getElementById('ncSyncStatus');
          if (!el) return;
          const map = {
            syncing: '⏳ Szinkronizálás...',
            synced:  '☁️ Szinkronizálva',
            error:   '⚠️ Sync hiba',
            offline: 'ℹ️ Felhő-sync csak online',
            idle:    '☁️ Felhő-szinkron aktív'
          };
          el.textContent = map[state] || el.textContent;
        });
      }
    } else {
      // Nincs bejelentkezve — linkek vissza
      if (loginLink) loginLink.style.display = '';
      if (regLink)   regLink.style.display = '';
    }
  }

  // V20: optimista render a cache-ből — AZONNAL mutatja a bejelentkezett
  // állapotot (nincs 1mp "Bejelentkezés" villanás a lazy Firebase SDK miatt).
  const cached = window.HanziFlowAuth.getCachedUser && window.HanziFlowAuth.getCachedUser();
  if (cached) render(cached);

  // A valós auth-state (a Firebase SDK betöltése után) felülírja a cache-eltet.
  window.HanziFlowAuth.onChange(render);
  // Barba afterEnter után újra-render (a header NEM cserélődik, de biztos ami biztos)
  window.HanziFlowAuthHeaderRender = () => render(window.HanziFlowAuth.getUser());
})();


// ── Univerzális Segítők kapcsoló (Pinyin · Tónusszín · Magyar · Hang) ─
// localStorage-ban perzisztált. body class-okat kapcsol.
(function initHelpersToggle() {
  // pinyin / tones / hu: "off"-kulcs (alapból AKTÍV) → body hide-class kapcsol.
  // audio: "on"-kulcs (alapból INAKTÍV, opt-in) → viselkedés-flag,
  //        a HanziFlowAudio.speakAnswer olvassa ki (V3 P2 F).
  const HIDE = {
    pinyin: { key: 'hanziflow_helpers_pinyin_off', cls: 'helpers-no-pinyin' },
    tones:  { key: 'hanziflow_helpers_tones_off',  cls: 'helpers-no-tones' },
    hu:     { key: 'hanziflow_helpers_hu_off',     cls: 'helpers-no-hu' }
  };
  const AUDIO_KEY = 'hanziflow_audio_on';

  // Body classok azonnali alkalmazása (flicker nélkül)
  Object.keys(HIDE).forEach(h => {
    if (localStorage.getItem(HIDE[h].key) === '1') {
      document.body.classList.add(HIDE[h].cls);
    }
  });

  // Gombok beállítása + kattintáskezelő (no-op ha nincs gomb az oldalon)
  document.querySelectorAll('.ht-btn').forEach(btn => {
    const helper = btn.dataset.helper;

    // 🔊 Hang — opt-in viselkedés-kapcsoló (nincs body hide-class)
    if (helper === 'audio') {
      btn.classList.toggle('active', localStorage.getItem(AUDIO_KEY) === '1');
      btn.addEventListener('click', () => {
        const willBeOn = !btn.classList.contains('active');
        btn.classList.toggle('active', willBeOn);
        if (willBeOn) localStorage.setItem(AUDIO_KEY, '1');
        else          localStorage.removeItem(AUDIO_KEY);
      });
      return;
    }

    const cfg = HIDE[helper];
    if (!cfg) return;
    const isOff = localStorage.getItem(cfg.key) === '1';
    btn.classList.toggle('active', !isOff);

    btn.addEventListener('click', () => {
      const willBeActive = !btn.classList.contains('active');
      btn.classList.toggle('active', willBeActive);
      document.body.classList.toggle(cfg.cls, !willBeActive);
      if (willBeActive) localStorage.removeItem(cfg.key);
      else              localStorage.setItem(cfg.key, '1');
    });
  });
})();

// ── Header scroll hatás (sötétebb lesz görgetéskor) ─
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return; // auth oldalak nem rendelkeznek header-rel
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else                     header.classList.remove('scrolled');
  }, { passive: true });
})();

// ── PWA Service Worker registráció (V7-Nap3) ────
// 1 helyen regisztrálva minden HTML-re, mert mindegyik HTML
// behúzza az app.js-t. `file://` protokollon NEM regisztrál
// (csak HTTPS / localhost engedélyezi a SW-t).
//
// FONTOS — az app.js most a /js/ mappában van, sw.js pedig a ROOT-ban.
// A root-URL-t a script-src-ből számoljuk: az app.js src-jének SZÜLŐ
// mappája a /js/, annak szülője pedig a ROOT. Mind az index.html (root)
// mind a /pages/*.html abszolút URL-en hivatkozik az app.js-re, ezért
// `new URL(...)` mindkét esetben helyes ROOT-ot ad.
(function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1') return;

  // A jelenleg futó script-src → /js/-en belül van → parent = ROOT
  const thisScript = document.currentScript ||
                     document.querySelector('script[src$="/js/app.js"]') ||
                     document.querySelector('script[src$="app.js"]');
  if (!thisScript || !thisScript.src) return;
  const scriptUrl = new URL(thisScript.src);          // /.../js/app.js
  const jsDirUrl  = new URL('./', scriptUrl);          // /.../js/
  const rootUrl   = new URL('../', jsDirUrl);          // /.../  (ROOT)
  const swUrl     = new URL('sw.js', rootUrl);         // /.../sw.js

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swUrl, { scope: rootUrl })
      .then(reg => {
        // Frissítés-figyelés: ha van új SW, a felhasználó következő
        // page-load-jakor aktívvá válik (skipWaiting + claim).
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              // console.log('SW frissítés letöltve — frissítsd az oldalt');
            }
          });
        });
      })
      .catch(err => {
        // Csendben — a SW opcionális, az app működik nélküle is.
        // console.warn('SW register fail:', err);
      });
  });
})();


/* ====================================================
   HANZIFLOW AUDIO ENGINE — V3 (globális, minden oldal)
   ----------------------------------------------------
   Kínai (mandarin, zh-CN) TTS a Google Translate (nem hivatalos) endpoint-
   járól. NEM window.speechSynthesis (iOS-inkompatibilis,
   robotikus, instabil).

   Lejátszás: <audio> elem (media-playback NEM CORS-köteles).
   Cache: Map<text, HTMLAudioElement> — első lejátszás után
   instant replay. Védekező: ha az audio hibázik, az
   onErrorCb meghívódik (a hívó modul szöveg-fallbackre vált).

   API:  HanziFlowAudio.play(text, { speed, onError })
         HanziFlowAudio.preload(text)
         HanziFlowAudio.stop()
   ==================================================== */
const HanziFlowAudio = (function () {
  const cache = new Map();         // text → HTMLAudioElement
  let current = null;              // épp játszó elem

  function buildUrl(text) {
    const q = encodeURIComponent(text);
    return 'https://translate.google.com/translate_tts'
         + '?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + q;
  }

  function getAudio(text) {
    if (cache.has(text)) return cache.get(text);
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = buildUrl(text);
    cache.set(text, audio);
    return audio;
  }

  let speechOnly = false;          // a TTS-végpont hibázott → innentől a böngésző felolvasója
  function canSpeak() {
    return typeof window.speechSynthesis !== 'undefined' &&
           typeof window.SpeechSynthesisUtterance !== 'undefined';
  }
  // Felolvasás a böngésző kínai hangjával. false, ha nincs rá mód.
  function speak(text, options) {
    if (!canSpeak()) return false;
    try {
      const voices = window.speechSynthesis.getVoices() || [];
      const zh = voices.find(v => /^zh[-_]CN/i.test(v.lang)) || voices.find(v => /^(zh|cmn)/i.test(v.lang) && !/HK|yue/i.test(v.lang));
      if (voices.length && !zh) return false;          // van hanglista, de nincs benne mandarin
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      if (zh) u.voice = zh;
      u.rate = Math.max(0.5, Math.min(1.2, options.speed || 1.0));
      u.onerror = function () { if (typeof options.onError === 'function') options.onError(); };
      if (typeof options.onEnd === 'function') u.onend = function () { options.onEnd(); };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stop() {
    if (current) {
      try { current.pause(); current.currentTime = 0; } catch (e) {}
      current = null;
    }
    if (canSpeak()) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  // Lejátszás. Promise-t ad vissza; hiba esetén onError() hívódik
  // (de a Promise nem dob — a hívó UI-ja nem törik el).
  // options.onEnd: a hang végén hívódik — így több szöveg egymás után játszható le (pl. párbeszéd).
  function play(text, options) {
    options = options || {};
    stop();
    if (speechOnly) {
      if (!speak(text, options) && typeof options.onError === 'function') options.onError();
      return Promise.resolve();
    }
    const audio = getAudio(text);
    audio.playbackRate = options.speed || 1.0;
    try { audio.currentTime = 0; } catch (e) {}
    current = audio;

    let errored = false;
    const onErr = () => {
      if (errored) return;
      errored = true;
      // tartalék: a böngésző felolvasója; csak ha az sincs, szólunk a hívónak
      if (speak(text, options)) { speechOnly = true; return; }
      if (typeof options.onError === 'function') options.onError();
    };
    audio.addEventListener('error', onErr, { once: true });
    // az elem gyorsítótárazott: egy korábbi, félbeszakított lejátszás „vége" figyelője ne maradjon rajta
    if (audio._ncEnd) audio.removeEventListener('ended', audio._ncEnd);
    audio._ncEnd = typeof options.onEnd === 'function' ? function () { options.onEnd(); } : null;
    if (audio._ncEnd) audio.addEventListener('ended', audio._ncEnd, { once: true });

    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      return p.catch(() => { onErr(); });
    }
    return Promise.resolve();
  }

  // Előtöltés (Audio elem létrehozása — a böngésző bufferelhet)
  function preload(text) {
    if (!text) return;
    getAudio(text);
  }

  // V3 P2 F — globális "helyes válasz felolvasása". Opt-in (helpers-bár
  // 🔊 Hang toggle, localStorage 'hanziflow_audio_on'). Debounce: ugyanaz
  // a szöveg 1.5 mp-en belül nem szólal meg újra (dupla-render védelem).
  //
  // A hanzi + pinyin duplázás (ruby-tartalmú elem → "你nǐ") elleni védelem a
  // `findAnswer`-ben van (initGlobalAnswerAudio), itt csak a már tiszta szöveg jön.
  let lastSpoke = { text: '', at: 0 };
  function speakAnswer(text) {
    if (!text) return;
    if (localStorage.getItem('hanziflow_audio_on') !== '1') return;
    // Csak az írásjegyek (és a mondat-írásjelek) maradnak — a pinyin / zárójel / ✓ kiesik.
    const zh = String(text).replace(/[^\u3400-\u9fff\uf900-\ufaff，。？！、]/g, '');
    if (!/[\u3400-\u9fff]/.test(zh)) return;
    const now = Date.now();
    if (zh === lastSpoke.text && now - lastSpoke.at < 1500) return;
    lastSpoke = { text: zh, at: now };
    play(zh, { speed: 0.9, onError: function () {} });
  }

  return { play, preload, stop, speakAnswer, buildUrl, _cache: cache };
})();


/* ====================================================
   GLOBÁLIS VÁLASZ-FELOLVASÁS (V3 P2 F) ─────────────
   ----------------------------------------------------
   MutationObserver figyeli a modul-feedback konténereket
   (.conj-feedback · .pr-feedback · #phaseContent). Amikor
   egy feedback renderelődik, a helyes kínai választ
   (első írásjegyet tartalmazó .pfe-zh-ok) felolvassa.
   Opt-in + debounce a HanziFlowAudio.speakAnswer-ben.
   ==================================================== */
(function initGlobalAnswerAudio() {
  const ZH = /[\u3400-\u9fff]/;   // van-e írásjegy

  // A válasz <ruby>汉<rt>hàn</rt></ruby> formában is állhat: a pinyin (rt) kimarad,
  // különben a felolvasó a latin betűket is megpróbálná kiejteni.
  function hanziText(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('rt, rp, .py-line').forEach(x => x.remove());
    return (clone.textContent || '').trim();
  }

  function findAnswer(node) {
    const hits = [];
    if (node.matches && node.matches('.pfe-zh-ok')) hits.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll('.pfe-zh-ok').forEach(e => hits.push(e));
    }
    for (const el of hits) {
      const t = hanziText(el);
      if (t && ZH.test(t)) return t;
    }
    return null;
  }

  const targets = [];
  document.querySelectorAll('.conj-feedback, .pr-feedback').forEach(el => targets.push(el));
  const phaseContent = document.getElementById('phaseContent');
  if (phaseContent) targets.push(phaseContent);
  if (targets.length === 0) return;   // index / auth oldalak

  const obs = new MutationObserver(muts => {
    let answer = null;
    for (const m of muts) {
      for (let i = 0; i < m.addedNodes.length && !answer; i++) {
        const node = m.addedNodes[i];
        if (node.nodeType === 1) answer = findAnswer(node);
      }
      if (answer) break;
    }
    if (answer) HanziFlowAudio.speakAnswer(answer);
  });
  targets.forEach(t => obs.observe(t, { childList: true, subtree: true }));
})();


/* ====================================================
   ZEN POLISH — Globális feedback animáció (Blokk 3)
   ----------------------------------------------------
   MutationObserver figyeli a modul-feedback konténereket
   és a body-t. Amikor egy feedback panel megkapja a
   pr-fb-correct / pr-fb-wrong / pr-fb-perfect / pr-fb-close /
   pr-fb-near class-t, automatikusan meghívja a HanziFlowMotion
   megfelelő animációját. Modul-specifikus kód-injekció NEM kell.
   ==================================================== */
(function initGlobalFeedbackMotion() {
  if (!window.HanziFlowMotion) return;

  const POSITIVE = new Set(['pr-fb-correct', 'pr-fb-perfect', 'pr-fb-close', 'pr-fb-near']);
  const NEGATIVE = new Set(['pr-fb-wrong']);
  // pr-fb-far és pr-fb-dontknow szándékosan KIMARAD — ezek "részben"
  // ill. "semleges" állapotok, ahol az animáció zavaró lenne.

  // Hogy ne triggereljen kétszer ugyanarra a class-add-ra
  const lastTrigger = new WeakMap();
  const DEBOUNCE_MS = 250;

  function maybeAnimate(el) {
    if (!el || el.nodeType !== 1) return;
    const cls = el.classList;
    let kind = null;
    if (cls.contains('pr-fb-wrong')) kind = 'wrong';
    else {
      for (const p of POSITIVE) { if (cls.contains(p)) { kind = 'correct'; break; } }
    }
    if (!kind) return;
    // A rögzített visszajelzés-lap saját becsúszó animációt kap; a háttér
    // villantása ott átlátszóvá tenné a lapot a tartalom fölött.
    if (getComputedStyle(el).position === 'fixed') return;
    const now = Date.now();
    const last = lastTrigger.get(el);
    if (last && (now - last.ts) < DEBOUNCE_MS && last.kind === kind) return;
    lastTrigger.set(el, { ts: now, kind });
    if (kind === 'correct') window.HanziFlowMotion.flashCorrect(el);
    else                    window.HanziFlowMotion.shakeWrong(el);
  }

  const obs = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        maybeAnimate(m.target);
      } else if (m.type === 'childList') {
        // Új gyermek-feedback elemek
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          maybeAnimate(node);
          if (node.querySelectorAll) {
            node.querySelectorAll('[class*="pr-fb-"]').forEach(maybeAnimate);
          }
        }
      }
    }
  });

  // Egy MutationObserver az egész body-n — a feedback panelek bármikor
  // megjelenhetnek (lobby → kör → új kör), kötött selector lassú lenne.
  obs.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
})();


/* ====================================================
   „NEM TUDOM" FEEDBACK-FEJLÉC (V3 P2) ──────────────
   ----------------------------------------------------
   Univerzális: minden modul feedback-panelje .pr-fb-mark
   + .pr-fb-title osztályt használ. A „Nem tudom" gomb
   után a feedback hibajelzés helyett semleges magyarázó.
   ==================================================== */
function markDontKnowFeedback(fbEl) {
  if (!fbEl) return;
  fbEl.classList.remove('pr-fb-wrong');
  fbEl.classList.add('pr-fb-dontknow');
  const mark  = fbEl.querySelector('.pr-fb-mark');
  const title = fbEl.querySelector('.pr-fb-title');
  if (mark)  mark.textContent  = '💡';
  if (title) title.textContent = 'Nem baj — nézd meg a megoldást';
}


/* ====================================================
   HANZIFLOW STATS — V4 statisztika adat-réteg ──────
   ----------------------------------------------------
   Layer 1: raw session-logok (localStorage).
   Layer 2: napi aggregát — a logokból SZÁMOLVA (nem tárolt).
   Layer 3: modul-profilok — a modulok saját profiljai (külön).
   Minden BEFEJEZETT kör egy session-rekordot ír (a félbehagyott
   kör — exit — nem mentődik, ahogy eddig is).
   ==================================================== */
const HanziFlowStats = (function () {
  const SESSIONS_KEY = 'hanziflow_sessions_v1';
  const MAX_SESSIONS = 1000;          // védő felső korlát

  function load() {
    try {
      const arr = JSON.parse(localStorage.getItem(SESSIONS_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function save(arr) {
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  // Egy befejezett kör mentése. info: { module, mode, results, score, startTs }
  function recordSession(info) {
    if (!info || !Array.isArray(info.results) || info.results.length === 0) return null;
    const results = info.results;
    const isOk = r => !!(r && (r.correct || r.allCorrect));
    const correct = results.filter(isOk).length;
    const errorCodes = results
      .map(r => r && (r.errorCode || r.errorType))
      .filter(Boolean);
    const now = Date.now();
    const rec = {
      id: 's' + now + Math.random().toString(36).slice(2, 7),
      ts: now,
      module: info.module || 'unknown',
      mode: info.mode || '',
      questionCount: results.length,
      correctCount: correct,
      wrongCount: results.length - correct,
      durationMs: info.startTs ? Math.max(0, now - info.startTs) : 0,
      score: info.score || 0,
      errorCodes: errorCodes,
      partial: !!info.partial          // V18: félbehagyott (kör közben kilépett) kör?
    };
    const arr = load();
    arr.push(rec);
    if (arr.length > MAX_SESSIONS) arr.splice(0, arr.length - MAX_SESSIONS);
    save(arr);
    // V17: kör vége → felhő-sync ütemezése (ha be van jelentkezve)
    if (window.HanziFlowSync && window.HanziFlowSync.schedulePush) {
      window.HanziFlowSync.schedulePush();
    }
    // V18: a kör-őrnek jelezzük, hogy ez a kör elmentődött (nincs dupla részmentés)
    if (window.HanziFlowRound && HanziFlowRound.markComplete) HanziFlowRound.markComplete();
    // Tanulási út: ha a kör egy út-lépésből indult, itt dől el a lépés eredménye
    if (window.HanziFlowPath && !info.skipPath) HanziFlowPath.onSession(rec);
    return rec;
  }

  function getSessions() { return load(); }
  function clearSessions() { try { localStorage.removeItem(SESSIONS_KEY); } catch (e) {} }

  // Layer 2 — napi aggregát a session-logokból számolva (nem tárolt).
  function getDailyAggregates() {
    const days = {};
    load().forEach(s => {
      const d = new Date(s.ts);
      const key = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      const day = days[key] || (days[key] = {
        date: key, sessions: 0, questions: 0, correct: 0, durationMs: 0, modules: {}
      });
      day.sessions++;
      day.questions  += s.questionCount || 0;
      day.correct    += s.correctCount  || 0;
      day.durationMs += s.durationMs    || 0;
      if (s.module) day.modules[s.module] = true;
    });
    return Object.keys(days).sort().map(k => {
      const d = days[k];
      d.accuracy = d.questions > 0 ? Math.round((d.correct / d.questions) * 100) : 0;
      d.moduleCount = Object.keys(d.modules).length;
      return d;
    });
  }

  // A mai nap összesítője és a sorozat — a kezdőlap napi célja és a statisztika is ebből számol.
  const dayKeyOf = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  function getToday() {
    const key = dayKeyOf(new Date());
    const today = load().filter(s => dayKeyOf(new Date(s.ts)) === key);
    const Q = today.reduce((a, s) => a + (s.questionCount || 0), 0);
    const C = today.reduce((a, s) => a + (s.correctCount || 0), 0);
    return {
      rounds: today.length, questions: Q, correct: C,
      accuracy: Q > 0 ? Math.round(C / Q * 100) : 0,
      durationMs: today.reduce((a, s) => a + (s.durationMs || 0), 0)
    };
  }
  // Egymást követő naptári napok. A sorozat él, ha tegnap volt gyakorlás (today: ma volt-e már).
  // A napok léptetése naptár szerint megy (nem 24 órával), így az óraátállítás nem szakítja meg.
  function getStreak() {
    const set = {};
    load().forEach(s => { set[dayKeyOf(new Date(s.ts))] = true; });
    const keys = Object.keys(set).sort();
    if (!keys.length) return { current: 0, longest: 0, today: false };
    const prevDay = d => { const p = new Date(d); p.setDate(p.getDate() - 1); return p; };
    let longest = 0, run = 0;
    keys.forEach(k => {
      const d = new Date(k + 'T12:00:00');
      run = set[dayKeyOf(prevDay(d))] ? run + 1 : 1;
      if (run > longest) longest = run;
    });
    let cursor = new Date(); cursor.setHours(12, 0, 0, 0);
    const today = !!set[dayKeyOf(cursor)];
    if (!today) cursor = prevDay(cursor);
    let current = 0;
    while (set[dayKeyOf(cursor)]) { current++; cursor = prevDay(cursor); }
    return { current: current, longest: longest, today: today };
  }

  return { recordSession, getSessions, getDailyAggregates, clearSessions, getToday, getStreak };
})();


/* ====================================================
   HANZIFLOW SRS — V5 P1 ítéletes ismétlési motor ───
   ----------------------------------------------------
   Univerzális item-szintű ütemező — Leitner-stílus.
   Box-ok (nap): 0 → 1 → 3 → 7 → 14 → 30. Sikertelen
   válasz visszaejt 0-ra; "easy" 2 boxot ugrik.

   itemId konvenció: '<scope>:<contentId>[:<subKey>]'
     pl. 'grammar:tara', 'grammar:tara:ex0'
   Scope-prefixre szűrhető; egyelőre csak a Grammar
   Patterns modul használja, de a forma univerzális,
   bármely modul ráköthető a saját item-térképére.

   API:
     recordReview(itemId, quality)    quality: 0=fail · 1=ok · 2=easy
     getItemState(itemId)             → null vagy { box, reps, lapses, lastTs, nextDueTs }
     getStateBatch(itemIds)           → { id: state|null }
     getDueItems(prefix, knownItemIds) → { due, seen, unseen }  (timestamp-szűrt)
     aggregateBoxes(prefix)           → [n0, n1, n2, n3, n4, n5]
     resetItem(itemId) / clearScope(prefix) / clearAll()

   localStorage: 'hanziflow_srs_v1'  (egyetlen objektum, id → state)
   ==================================================== */
const HanziFlowSRS = (function () {
  const STORE_KEY = 'hanziflow_srs_v1';
  const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];  // box index → days until next due
  const MAX_BOX = INTERVALS_DAYS.length - 1;
  const DAY_MS = 86400000;

  function loadAll() {
    try {
      const obj = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return (obj && typeof obj === 'object') ? obj : {};
    } catch (e) { return {}; }
  }
  function saveAll(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function getItemState(itemId) {
    if (!itemId) return null;
    const all = loadAll();
    return all[itemId] || null;
  }
  function getStateBatch(itemIds) {
    const all = loadAll();
    const out = {};
    (itemIds || []).forEach(id => { out[id] = all[id] || null; });
    return out;
  }

  function recordReview(itemId, quality) {
    if (!itemId) return null;
    const all = loadAll();
    const now = Date.now();
    const cur = all[itemId] || { box: 0, reps: 0, lapses: 0, lastTs: 0, nextDueTs: 0 };
    cur.reps++;
    if (quality === 0) {
      cur.lapses++;
      cur.box = 0;
      cur.nextDueTs = now;          // azonnal újra
    } else if (quality === 2) {
      cur.box = Math.min(MAX_BOX, cur.box + 2);
      cur.nextDueTs = now + INTERVALS_DAYS[cur.box] * DAY_MS;
    } else {
      cur.box = Math.min(MAX_BOX, cur.box + 1);
      cur.nextDueTs = now + INTERVALS_DAYS[cur.box] * DAY_MS;
    }
    cur.lastTs = now;
    all[itemId] = cur;
    saveAll(all);
    return cur;
  }

  function getDueItems(prefix, knownItemIds) {
    const all = loadAll();
    const now = Date.now();
    const due = [], seen = [], unseen = [];
    (knownItemIds || []).forEach(id => {
      if (prefix && !id.startsWith(prefix)) return;
      const s = all[id];
      if (!s) { unseen.push(id); return; }
      seen.push(id);
      if ((s.nextDueTs || 0) <= now) due.push(id);
    });
    return { due, seen, unseen };
  }

  // Egy scope összesítője a tárolt állapotból: hány elem van, hány esedékes, mikor jön a következő.
  function dueInfo(prefix) {
    const all = loadAll();
    const now = Date.now();
    let total = 0, due = 0, nextTs = 0;
    Object.keys(all).forEach(k => {
      if (prefix && !k.startsWith(prefix)) return;
      total++;
      const t = all[k].nextDueTs || 0;
      if (t <= now) due++;
      else if (!nextTs || t < nextTs) nextTs = t;
    });
    return { total: total, due: due, nextTs: nextTs };
  }

  function aggregateBoxes(prefix) {
    const all = loadAll();
    const boxes = INTERVALS_DAYS.map(() => 0);
    Object.keys(all).forEach(k => {
      if (prefix && !k.startsWith(prefix)) return;
      const b = (all[k].box || 0);
      if (b >= 0 && b < boxes.length) boxes[b]++;
    });
    return boxes;
  }

  function resetItem(itemId) {
    if (!itemId) return;
    const all = loadAll(); delete all[itemId]; saveAll(all);
  }
  function clearScope(prefix) {
    if (!prefix) return;
    const all = loadAll();
    Object.keys(all).forEach(k => { if (k.startsWith(prefix)) delete all[k]; });
    saveAll(all);
  }
  function clearAll() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }

  return {
    recordReview, getItemState, getStateBatch, getDueItems, dueInfo,
    aggregateBoxes, resetItem, clearScope, clearAll,
    INTERVALS_DAYS, MAX_BOX
  };
})();

// A három adat-/hang-modul a window-n is elérhető. Top-level `const`-ként
// nem kerülnének oda, pedig a fájl elején álló univerzális IIFE-k (kör-őr,
// párosító) `window.HanziFlowStats` / `window.HanziFlowAudio`
// formában hivatkoznak rájuk — e nélkül a félbehagyott körök részmentése
// (HanziFlowRound.flush) soha nem futott le.
window.HanziFlowAudio = HanziFlowAudio;
window.HanziFlowStats = HanziFlowStats;
window.HanziFlowSRS   = HanziFlowSRS;


/* ====================================================
   2. LANDING (index.html) ─────────────────────────
   ==================================================== */

function initLanding() {
  // Régi horgony (könyvjelző, gyorsítótárazott link): a modulok külön oldalra költöztek
  if (window.location.hash === '#modules') { window.location.replace('pages/modules.html'); return; }

  const Path = window.HanziFlowPath;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pctText = v => Math.round(v * 100) + '%';
  const CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
  const ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

  // ── Felső blokk: szintválasztó (első alkalom) vagy „Folytatás" ──
  // „Mai ismétlés": a leckék kérdései az ismétlés-ütemezőből (HanziFlowSRS, 'lesson:' scope).
  //   Esedékes kérdésnél kiemelt kártya; ha nincs, csendes sor a következő időponttal.
  function reviewCardHtml(v) {
    if (!window.HanziFlowSRS || !HanziFlowSRS.dueInfo) return '';
    const info = HanziFlowSRS.dueInfo('lesson:');
    const anyLesson = v.rows.some(r => r.done && r.step.module === 'lesson' && !r.step.mode);
    if (!info.total && !anyLesson) return '';
    const days = info.nextTs ? Math.max(1, Math.ceil((info.nextTs - Date.now()) / 86400000)) : 0;
    const title = info.due ? 'Mai ismétlés' : 'Ismétlés';
    const desc = info.due ? info.due + ' kérdés vár a korábbi leckékből'
      : info.total ? 'Ma nincs esedékes kérdés. A következő ' + (days <= 1 ? 'holnap' : days + ' nap múlva') + ' jön.'
      : 'Kérdések az eddig elvégzett leckékből';
    return `
      <a class="path-step-link review-card${info.due ? ' is-due' : ''}" href="pages/lesson.html?review=1">
        <span class="path-glyph" lang="zh-CN">复</span>
        <span class="path-step-body">
          <span class="path-step-title">${title}</span>
          <span class="path-step-desc">${desc}</span>
        </span>
        <span class="path-step-end"><span class="path-state${info.due ? ' path-state-next' : ''}">${info.due ? 'Indítás' : 'Megnézem'}</span></span>
      </a>`;
  }

  // ── Napi cél és sorozat: a „Folytatás" kártya alsó sora ──
  //   A cél a naponta megválaszolt kérdések száma (a körök és a leckék gyors kérdései, a
  //   statisztika mai napjából); a sorozat az egymást követő gyakorló napok száma.
  //   A célra koppintva három fokozat közül lehet választani.
  const GOAL_KEY = 'hanziflow_goal_v1';                    // { daily } — a fiókkal szinkronizálódik (sync.js)
  const GOALS = [{ n: 10, label: 'Könnyed' }, { n: 20, label: 'Rendes' }, { n: 40, label: 'Komoly' }];
  let goalOpen = false;
  function dailyGoal() {
    try {
      const g = JSON.parse(localStorage.getItem(GOAL_KEY) || '{}');
      if (GOALS.some(x => x.n === g.daily)) return g.daily;
    } catch (e) {}
    return 20;
  }
  function dayStripHtml() {
    if (!window.HanziFlowStats || !HanziFlowStats.getToday) return '';
    const goal = dailyGoal();
    const t = HanziFlowStats.getToday(), s = HanziFlowStats.getStreak();
    const met = t.questions >= goal;
    const R = 15, C = 2 * Math.PI * R;
    const off = C * (1 - Math.min(1, t.questions / goal));
    const streakLabel = s.current + ' napos sorozat' + (s.current && !s.today ? ', ma még nem gyakoroltál' : '');
    return `
        <div class="continue-day${met ? ' is-met' : ''}">
          <button class="day-goal" id="dayGoalBtn" type="button" aria-expanded="${goalOpen ? 'true' : 'false'}" aria-controls="dayGoalPick"
                  aria-label="${met ? 'Megvan a mai cél' : 'Mai cél'}: ${t.questions} / ${goal} kérdés. A cél módosítása">
            <svg class="day-ring" viewBox="0 0 36 36" width="40" height="40" aria-hidden="true" focusable="false">
              <circle class="day-ring-bg" cx="18" cy="18" r="${R}"/>
              <circle class="day-ring-fg" cx="18" cy="18" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
              ${met ? '<path class="day-ring-check" d="m12.5 18.4 3.7 3.7 7.3-7.6"/>' : ''}
            </svg>
            <span class="day-goal-text">
              <span class="day-goal-title">${met ? 'Megvan a mai cél' : 'Mai cél'}</span>
              <span class="day-goal-num">${t.questions} / ${goal} kérdés</span>
            </span>
          </button>
          ${s.current ? `<span class="day-streak${s.today ? '' : ' is-wait'}" role="img" aria-label="${streakLabel}"><span aria-hidden="true">🔥</span>${s.current} nap</span>` : ''}
          <div class="day-pick" id="dayGoalPick"${goalOpen ? '' : ' hidden'}>
            <span class="day-pick-label">Napi cél: hány kérdésre válaszolsz egy nap?</span>
            ${GOALS.map(g => `<button class="day-pick-btn${g.n === goal ? ' is-on' : ''}" type="button" data-goal="${g.n}" aria-pressed="${g.n === goal ? 'true' : 'false'}">${g.label}<span>${g.n} kérdés</span></button>`).join('')}
          </div>
        </div>`;
  }
  function bindDayStrip(top) {
    const btn = top.querySelector('#dayGoalBtn'), pick = top.querySelector('#dayGoalPick');
    if (!btn || !pick) return;
    btn.addEventListener('click', () => {
      goalOpen = !goalOpen;
      pick.hidden = !goalOpen;
      btn.setAttribute('aria-expanded', goalOpen ? 'true' : 'false');
    });
    pick.querySelectorAll('.day-pick-btn').forEach(b => b.addEventListener('click', () => {
      try { localStorage.setItem(GOAL_KEY, JSON.stringify({ daily: parseInt(b.dataset.goal, 10) })); } catch (e) {}
      if (window.HanziFlowSync && HanziFlowSync.schedulePush) HanziFlowSync.schedulePush();   // a cél a fiókkal együtt jár
      goalOpen = false;
      renderHomeTop();
      const again = document.getElementById('dayGoalBtn');
      if (again) try { again.focus(); } catch (e) {}
    }));
  }

  function renderHomeTop() {
    const top = document.getElementById('homeTop');
    if (!top || !Path) return;
    const v = Path.view();

    if (!v.level) {
      top.innerHTML = `
        <div class="home-hero">
          <h1 class="hero-title">
            <span class="hero-zh" lang="zh-CN"><ruby>汉<rt>hàn</rt></ruby><ruby>语<rt>yǔ</rt></ruby></span>
            <span class="hero-sub">lépésről lépésre, magyarul.</span>
          </h1>
          <p class="hero-desc">Kínai nyelv a nulláról: kiejtés és tónusok, írásjegyek, mondatok.
            Előbb megérted, aztán gyakorlod, végül ismétléssel rögzíted.</p>
        </div>
        <div class="onboard glass-panel-heavy">
          <h2 class="onboard-title">Honnan indulsz?</h2>
          <p class="onboard-sub">Ehhez igazítjuk az első lépéseket. Később bármikor átállíthatod.</p>
          <div class="onboard-options">
            <button class="onboard-opt" type="button" data-level="zero">
              <span class="path-glyph" lang="zh-CN">音</span>
              <span class="onboard-opt-text"><strong>Nulláról kezdem</strong>
                <span>Még nem ismerem a pinyint és a négy tónust.</span></span>
            </button>
            <button class="onboard-opt" type="button" data-level="pinyin">
              <span class="path-glyph" lang="zh-CN">字</span>
              <span class="onboard-opt-text"><strong>A pinyint már ismerem</strong>
                <span>Jöhetnek a leckék: mondatok, szavak, írásjegyek.</span></span>
            </button>
          </div>
        </div>`;
      top.querySelectorAll('.onboard-opt').forEach(btn => btn.addEventListener('click', () => {
        Path.setLevel(btn.dataset.level);
        renderAll();
        const card = document.querySelector('.continue');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }));
      return;
    }

    if (!v.next) {
      top.innerHTML = `
        <div class="continue glass-panel-heavy" data-glyph="贺">
          <div class="continue-kicker">Tanulási út · ${v.doneCount} / ${v.total} lépés kész</div>
          <div class="continue-main">
            <span class="path-glyph path-glyph-lg" lang="zh-CN">贺</span>
            <div class="continue-text">
              <h1 class="continue-title">Végigértél az úton</h1>
              <p class="continue-desc">Innen a szabad gyakorlás és a statisztika vakfoltjai visznek tovább.</p>
            </div>
          </div>
          <a class="btn btn-primary btn-lg" href="pages/modules.html">Szabad gyakorlás</a>
          ${dayStripHtml()}
        </div>${reviewCardHtml(v)}`;
      bindDayStrip(top);
      return;
    }

    const s = v.next.step;
    const stepNo = v.rows.filter(r => !r.skipped && !r.optional).findIndex(r => r.step.id === s.id) + 1;
    const started = v.doneCount > 0 || v.next.best !== null;
    top.innerHTML = `
      <div class="continue glass-panel-heavy" data-glyph="${esc(s.glyph)}">
        <div class="continue-kicker">${started ? 'Következő lépés' : 'Első lépés'} · ${stepNo} / ${v.total}</div>
        <div class="continue-main">
          <span class="path-glyph path-glyph-lg" lang="zh-CN">${esc(s.glyph)}</span>
          <div class="continue-text">
            <h1 class="continue-title">${esc(s.title)}</h1>
            <p class="continue-desc">${esc(s.desc)}</p>
          </div>
        </div>
        <a class="btn btn-primary btn-lg continue-btn" href="${Path.stepHref(s)}">${started ? 'Folytatás' : 'Kezdés'}</a>
        <div class="continue-progress" role="img" aria-label="${v.doneCount} / ${v.total} lépés kész">
          <div class="continue-bar"><div class="continue-fill" style="width: ${v.total ? (v.doneCount / v.total) * 100 : 0}%"></div></div>
          <span class="continue-count">${v.doneCount} / ${v.total} lépés kész</span>
        </div>
        <button class="continue-jump" type="button">Mutasd a térképen</button>
        ${dayStripHtml()}
      </div>${reviewCardHtml(v)}`;
    bindDayStrip(top);
    // A térkép hosszú: a gomb a következő lépés csomópontjához görget (ha a fejezete csukva van, kinyitja).
    top.querySelector('.continue-jump').addEventListener('click', () => {
      const node = document.querySelector('.path-node.is-next');
      if (!node) return;
      const unit = node.closest('.path-unit');
      if (unit && unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);
      node.scrollIntoView({ behavior: scrollMode(), block: 'center' });
    });
  }

  // ── A tanulási út térképe ──
  //   Fejezetek (HANZIFLOW_PATH_UNITS), bennük kanyargó ösvény. A geometria rögzített
  //   (a style.css „TANULÁSI ÚT — térkép" blokkjával egyezik), így az összekötő vonal
  //   mérés nélkül számolható.
  const UNITS = (typeof HANZIFLOW_PATH_UNITS !== 'undefined') ? HANZIFLOW_PATH_UNITS : null;
  const WAVE = [0, 52, 78, 52, 0, -52, -78, -52];          // vízszintes eltolás csomópontonként (px)
  const wide = window.matchMedia('(min-width: 600px)');
  const mapGeom = () => wide.matches ? { row: 150, disc: 80, top: 22 } : { row: 140, disc: 72, top: 22 };
  const SEEN_KEY = 'hanziflow_path_seen_v1';               // a „most lett kész" effekthez: mit láttunk már késznek
  let openPop = null;

  // Összecsukható fejezetek: a térkép hosszú, ezért alapból csak az a fejezet nyitott, ahol
  // tartasz, és az utána következő kettő; a többi egy sor. A fejezet fejléce a kapcsoló.
  const MAP_KEY = 'hanziflow_map_open';                    // munkamenet: amit kézzel kinyitottál / becsuktál
  const MAP_AHEAD = 2;
  let mapFold = {};
  try { mapFold = JSON.parse(sessionStorage.getItem(MAP_KEY) || '{}') || {}; } catch (e) {}
  const saveMapFold = () => { try { sessionStorage.setItem(MAP_KEY, JSON.stringify(mapFold)); } catch (e) {} };
  function updateFoldAll() {
    const b = document.getElementById('pathFoldAll');
    if (!b) return;
    const anyFolded = !!document.querySelector('#pathList .path-unit.is-folded');
    b.textContent = anyFolded ? 'Minden fejezet kinyitása' : 'Vissza a rövid nézethez';
    b.dataset.mode = anyFolded ? 'open' : 'auto';
  }
  function foldMapUnit(unit, open, remember) {
    if (!unit) return;
    if (!open && openPop && unit.contains(openPop.btn)) closePop();
    unit.classList.toggle('is-folded', !open);
    const map = unit.querySelector('.path-map'), b = unit.querySelector('.path-unit-fold');
    if (map) map.hidden = !open;
    if (b) {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', b.dataset.title + ': a lépések ' + (open ? 'elrejtése' : 'megjelenítése'));
    }
    if (remember) { mapFold[unit.dataset.unit] = open; saveMapFold(); updateFoldAll(); }
  }

  function closePop() {
    if (!openPop) return;
    const { pop, btn, section } = openPop;
    openPop = null;
    pop.remove();
    btn.setAttribute('aria-expanded', 'false');
    if (section) section.classList.remove('has-pop');
    document.documentElement.classList.remove('has-path-pop');
  }

  function openNode(btn, row, v) {
    const same = openPop && openPop.btn === btn;
    closePop();
    if (same) return;
    const s = row.step;
    const isNext = v.next && v.next.step.id === s.id && !!v.level;
    const chips = [];
    if (row.done) chips.push('<span class="path-pop-chip is-ok">Kész</span>');
    else if (row.skipped) chips.push('<span class="path-pop-chip">Átugorva: már ismered a pinyint</span>');
    else if (isNext) chips.push('<span class="path-pop-chip">Ez a következő lépés</span>');
    else if (row.optional) chips.push('<span class="path-pop-chip">Nem kötelező: nélküle is mehetsz tovább</span>');
    if (row.best !== null) chips.push('<span class="path-pop-chip' + (row.done ? ' is-ok' : '') + '">Legjobb köröd: ' + pctText(row.best) + '</span>');
    else if (!row.skipped) chips.push('<span class="path-pop-chip">A lépéshez ' + Math.round(Path.PASS * 100) + '% kell</span>');
    const cta = row.optional ? (row.best !== null ? 'Megírom újra' : 'Megnézem') : row.done ? 'Gyakorlás újra' : row.skipped ? 'Mégis megnézem' : (row.best !== null ? 'Folytatás' : 'Kezdés');

    const pop = document.createElement('div');
    pop.className = 'path-pop';
    pop.id = 'pathPop';
    pop.innerHTML =
      '<h4 class="path-pop-title">' + esc(s.title) + '</h4>' +
      '<p class="path-pop-desc">' + esc(s.desc) + '</p>' +
      (chips.length ? '<div class="path-pop-meta">' + chips.join('') + '</div>' : '') +
      '<a class="btn btn-primary" href="' + Path.stepHref(s) + '">' + cta + '</a>';
    const li = btn.closest('.path-node');
    li.appendChild(pop);
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', 'pathPop');
    const section = li.closest('.path-section');
    if (section) section.classList.add('has-pop');
    document.documentElement.classList.add('has-path-pop');   // a tartalomjegyzék lebegő gombja ne takarja a buborékot
    openPop = { pop: pop, btn: btn, section: section };
    // a buborék a lebegő fejléc és az alsó fül-sáv között legyen
    const r = pop.getBoundingClientRect();
    const header = document.getElementById('header');
    const tabbar = document.querySelector('.hf-tabbar');
    const topLimit = (header ? header.getBoundingClientRect().bottom : 0) + 12;
    const tb = tabbar ? tabbar.getBoundingClientRect() : null;
    const bottomLimit = (tb && tb.width > 0 ? tb.top : window.innerHeight) - 16;
    let dy = 0;
    if (r.bottom > bottomLimit) dy = r.bottom - bottomLimit;
    if (r.top - dy < topLimit) dy = r.top - topLimit;
    if (Math.abs(dy) > 2) window.scrollBy({ top: dy, behavior: 'smooth' });
  }

  function renderPath() {
    const list = document.getElementById('pathList');
    const levelEl = document.getElementById('pathLevel');
    if (!list || !Path) return;
    closePop();
    const v = Path.view();
    const byId = {};
    v.rows.forEach(r => { byId[r.step.id] = r; });

    // fejezetek; ami egyik fejezetben sincs, a végére kerül
    let units = UNITS
      ? UNITS.map(u => ({ unit: u, rows: u.steps.map(id => byId[id]).filter(Boolean) })).filter(u => u.rows.length)
      : [];
    const placed = {};
    units.forEach(u => u.rows.forEach(r => { placed[r.step.id] = true; }));
    const rest = v.rows.filter(r => !placed[r.step.id]);
    if (rest.length) units.push({ unit: { id: 'u-rest', title: UNITS ? 'További lépések' : 'Lépések', sub: '' }, rows: rest });

    // mit láttunk már késznek (az első alkalommal minden kész lépés „látott")
    let seen = null;
    try { seen = JSON.parse(localStorage.getItem(SEEN_KEY) || 'null'); } catch (e) {}
    const doneIds = v.rows.filter(r => r.done).map(r => r.step.id);
    const fresh = Array.isArray(seen) ? doneIds.filter(id => seen.indexOf(id) < 0) : [];
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(doneIds)); } catch (e) {}

    // melyik fejezet nyitott: ahol tartasz + a következő MAP_AHEAD; ha az út kész, mind csukva
    const nextId = v.next && v.level ? v.next.step.id : null;
    const nextUnit = nextId ? units.findIndex(u => u.rows.some(r => r.step.id === nextId)) : -1;
    const cur = nextUnit >= 0 ? nextUnit : (v.next ? 0 : -99);

    const g = mapGeom();
    const cy = i => i * g.row + g.top + g.disc / 2;
    let gi = 0;                                           // csomópont-sorszám az egész úton (a kanyar folytonos)
    list.innerHTML = units.map((u, ui) => {
      const uid = u.unit.id || ('u' + ui);
      const live = u.rows.filter(r => !r.skipped && !r.optional);
      const done = live.filter(r => r.done).length;
      const complete = live.length > 0 && done === live.length;
      // a frissen kész lépés fejezete ezen a megnyitáson még nyitva marad (hogy látsszon az animáció)
      const hasFresh = u.rows.some(r => fresh.indexOf(r.step.id) >= 0);
      const open = (uid in mapFold) ? !!mapFold[uid] : (hasFresh || (ui >= cur && ui <= cur + MAP_AHEAD));
      const xs = u.rows.map((r, i) => WAVE[(gi + i) % WAVE.length]);
      const segs = u.rows.slice(0, -1).map((r, i) => {
        const bothDone = r.done && u.rows[i + 1].done;
        const isFresh = bothDone && (fresh.indexOf(r.step.id) >= 0 || fresh.indexOf(u.rows[i + 1].step.id) >= 0);
        const y0 = cy(i), y1 = cy(i + 1), k = g.row * 0.5;
        return '<path class="path-seg' + (bothDone ? ' is-done' : '') + (isFresh ? ' just-done' : '') + '"' +
          (isFresh ? ' pathLength="1"' : '') +
          ' d="M ' + xs[i] + ' ' + y0 + ' C ' + xs[i] + ' ' + (y0 + k) + ', ' + xs[i + 1] + ' ' + (y1 - k) + ', ' + xs[i + 1] + ' ' + y1 + '"/>';
      }).join('');
      const h = u.rows.length * g.row;
      const nodes = u.rows.map((r, i) => {
        const s = r.step;
        const isNext = v.next && v.next.step.id === s.id && !!v.level;
        const cls = (r.done ? ' is-done' : r.skipped ? ' is-skipped' : isNext ? ' is-next' : '') +
                    (r.optional ? ' is-exam' : '') + (fresh.indexOf(s.id) >= 0 ? ' just-done' : '');
        const state = r.done ? 'kész' : r.skipped ? 'átugorva' : isNext ? 'következő lépés' : r.optional ? 'nem kötelező dolgozat' : 'még nem kezdted el';
        const n = gi + i;
        return `
          <li class="path-node${cls}" style="--x: ${xs[i]}px">
            <button class="path-node-btn" type="button" data-step="${esc(s.id)}" style="--i: ${Math.min(n, 9)}"
                    aria-expanded="false" aria-label="${esc(s.title)}, ${state}">
              <span class="path-node-disc">
                <span lang="zh-CN" aria-hidden="true">${esc(s.glyph)}</span>
                ${r.done ? '<span class="path-node-check">' + CHECK + '</span>' : ''}
                ${isNext ? '<span class="path-node-tag">' + (r.best !== null || v.doneCount > 0 ? 'Folytatás' : 'Kezdés') + '</span>' : ''}
              </span>
              <span class="path-node-label">${esc(s.title)}</span>
            </button>
          </li>`;
      }).join('');
      gi += u.rows.length;
      return `
        <li class="path-unit${complete ? ' is-complete' : ''}${open ? '' : ' is-folded'}" data-unit="${esc(uid)}">
          <div class="path-unit-head">
            <span class="path-unit-no">${esc(u.unit.kicker || ((ui + 1) + '. fejezet'))}</span>
            <h3 class="path-unit-title">${esc(u.unit.title)}</h3>
            ${u.unit.sub ? '<span class="path-unit-sub">' + esc(u.unit.sub) + '</span>' : ''}
            <span class="path-unit-count" aria-label="${done} / ${live.length} lépés kész">${live.length ? done + ' / ' + live.length : '–'}</span>
            <button class="path-unit-fold" type="button" aria-expanded="${open ? 'true' : 'false'}" aria-controls="pathMap${ui}"
                    data-title="${esc(u.unit.title)}" aria-label="${esc(u.unit.title)}: a lépések ${open ? 'elrejtése' : 'megjelenítése'}">${FOLD}</button>
          </div>
          <ol class="path-map" id="pathMap${ui}"${open ? '' : ' hidden'}>
            <svg class="path-map-line" viewBox="-180 0 360 ${h}" width="360" height="${h}" aria-hidden="true" focusable="false">${segs}</svg>
            ${nodes}
          </ol>
        </li>`;
    }).join('');

    // a fejezet fejléce az egész szélességében kapcsoló (a nyíl a billentyűzetes vezérlő)
    list.querySelectorAll('.path-unit-head').forEach(head => head.addEventListener('click', e => {
      e.stopPropagation();
      const unit = head.closest('.path-unit');
      closePop();
      foldMapUnit(unit, unit.classList.contains('is-folded'), true);
    }));
    updateFoldAll();

    list.querySelectorAll('.path-node-btn').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      const row = byId[btn.dataset.step];
      if (row) openNode(btn, row, Path.view());
    }));

    if (levelEl) {
      levelEl.innerHTML = !v.level ? '' :
        (v.level === 'zero' ? 'Nulláról indulsz: az út a kiejtéssel és a tónusokkal kezdődik.' : 'A pinyint már ismered: az út rögtön a leckékkel kezdődik.') +
        ' <button class="path-level-btn" type="button">Módosítás</button>';
      const b = levelEl.querySelector('.path-level-btn');
      if (b) b.addEventListener('click', () => { Path.setLevel(v.level === 'zero' ? 'pinyin' : 'zero'); renderAll(); });
    }

    renderToc(units, v);
  }
  // a buborék bezárása: kattintás máshová, Esc
  document.addEventListener('click', e => { if (openPop && !openPop.pop.contains(e.target)) closePop(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openPop) { const b = openPop.btn; closePop(); try { b.focus(); } catch (err) {} }
  });
  // a töréspont átlépésekor a térkép geometriája változik
  if (wide.addEventListener) wide.addEventListener('change', () => renderPath());
  // „Minden fejezet kinyitása" ↔ „Vissza a rövid nézethez" (az utóbbi törli a kézi állapotot)
  const foldAllBtn = document.getElementById('pathFoldAll');
  if (foldAllBtn) foldAllBtn.addEventListener('click', () => {
    if (foldAllBtn.dataset.mode === 'open') {
      document.querySelectorAll('#pathList .path-unit').forEach(u => { mapFold[u.dataset.unit] = true; });
    } else mapFold = {};
    saveMapFold();
    renderPath();
  });

  // ── A tanulási út tartalomjegyzéke ──
  //   Ugyanazokból a fejezetekből épül, mint a térkép (renderPath hívja). Asztali gépen
  //   (≥ 1100 px) rögzített oldalsáv, a tartalom mellé tolva; keskenyebb kijelzőn balról
  //   kihúzható fiók. Egy fejezetre vagy lépésre kattintva a térkép odagördül.
  //   A stílusa: style.css „TANULÁSI ÚT — térkép" blokk, „Tartalomjegyzék" rész.
  const TOC_KEY = 'hanziflow_toc_v1';                      // eszköz-helyi: nyitva van-e a sáv, minden fejezet nyitva van-e
  const tocEl = document.getElementById('pathToc');
  const tocBody = document.getElementById('ptocBody');
  const tocToggle = document.getElementById('ptocToggle');
  const tocScrim = document.getElementById('ptocScrim');
  const tocClose = document.getElementById('ptocClose');
  const tocAll = document.getElementById('ptocAll');
  const tocDock = window.matchMedia('(min-width: 1100px)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const FOLD = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const tocState = { open: null, all: false };
  try { Object.assign(tocState, JSON.parse(localStorage.getItem(TOC_KEY) || '{}')); } catch (e) {}
  const tocFolded = {};                                    // fejezet → nyitva van-e (erre a munkamenetre)
  let tocOpen = false, tocActive = null, tocSpy = null, locateTimer = 0;
  const saveToc = () => { try { localStorage.setItem(TOC_KEY, JSON.stringify(tocState)); } catch (e) {} };
  const scrollMode = () => calm.matches ? 'auto' : 'smooth';

  function renderToc(units, v) {
    if (!tocEl || !tocBody) return;
    const nextId = v.next && v.level ? v.next.step.id : null;
    const prog = document.getElementById('ptocProgress');
    if (prog) prog.textContent = v.doneCount + ' / ' + v.total + ' lépés kész';

    tocBody.innerHTML = units.map((u, ui) => {
      const uid = u.unit.id || ('u' + ui);
      const live = u.rows.filter(r => !r.skipped && !r.optional);
      const done = live.filter(r => r.done).length;
      const complete = live.length > 0 && done === live.length;
      const hasNext = !!nextId && u.rows.some(r => r.step.id === nextId);
      if (!(uid in tocFolded)) tocFolded[uid] = hasNext || (!nextId && ui === 0);
      const isOpen = tocState.all || tocFolded[uid];
      const steps = u.rows.map(r => {
        const s = r.step;
        const isNext = s.id === nextId;
        const cls = (r.done ? ' is-done' : r.skipped ? ' is-skipped' : isNext ? ' is-next' : '') + (r.optional ? ' is-exam' : '');
        const state = r.done ? 'kész' : r.skipped ? 'átugorva' : isNext ? 'következő lépés' : r.optional ? 'nem kötelező dolgozat' : 'még nem kezdted el';
        return `
          <li class="ptoc-step${cls}">
            <button class="ptoc-step-btn" type="button" data-step="${esc(s.id)}" aria-label="${esc(s.title)}, ${state}">
              <span class="ptoc-glyph" lang="zh-CN" aria-hidden="true">${esc(s.glyph)}</span>
              <span class="ptoc-step-title">${esc(s.title)}</span>
              ${r.done ? '<span class="ptoc-step-mark">' + CHECK + '</span>' : isNext ? '<span class="ptoc-step-mark ptoc-step-here">Itt tartasz</span>' : ''}
            </button>
          </li>`;
      }).join('');
      return `
        <section class="ptoc-unit${complete ? ' is-complete' : ''}${isOpen ? ' is-unfolded' : ''}" data-unit="${esc(uid)}">
          <div class="ptoc-unit-row">
            <button class="ptoc-unit-btn" type="button">
              <span class="ptoc-kicker">${esc(u.unit.kicker || ((ui + 1) + '. fejezet'))}</span>
              <span class="ptoc-unit-title">${esc(u.unit.title)}</span>
              ${u.unit.sub ? '<span class="ptoc-unit-sub">' + esc(u.unit.sub) + '</span>' : ''}
            </button>
            <span class="ptoc-count" aria-label="${done} / ${live.length} lépés kész">${live.length ? done + ' / ' + live.length : '–'}</span>
            <button class="ptoc-fold" type="button" aria-expanded="${isOpen ? 'true' : 'false'}" aria-controls="ptocSteps${ui}"
                    aria-label="${esc(u.unit.title)}: a lépések ${isOpen ? 'elrejtése' : 'megjelenítése'}">${FOLD}</button>
          </div>
          <ol class="ptoc-steps" id="ptocSteps${ui}"${isOpen ? '' : ' hidden'}>${steps}</ol>
        </section>`;
    }).join('');

    if (tocAll) {
      tocAll.textContent = tocState.all ? 'Mindet becsuk' : 'Mindet kinyit';
      tocAll.setAttribute('aria-pressed', tocState.all ? 'true' : 'false');
    }
    const keep = tocActive; tocActive = null;
    watchUnits();
    if (keep) markTocActive(keep);
    else if (tocOpen) {                                    // induláskor a sáv ott álljon, ahol tartasz
      const here = tocBody.querySelector('.ptoc-step.is-next');
      if (here) revealInToc(here.closest('.ptoc-unit'));
    }
  }

  // Egy fejezet lépéseinek kinyitása / becsukása a sávban
  function foldTocUnit(sec, open) {
    if (!sec) return;
    tocFolded[sec.dataset.unit] = open;
    sec.classList.toggle('is-unfolded', open);
    const list = sec.querySelector('.ptoc-steps');
    const fold = sec.querySelector('.ptoc-fold');
    if (list) list.hidden = !open;
    if (fold) {
      fold.setAttribute('aria-expanded', open ? 'true' : 'false');
      fold.setAttribute('aria-label', fold.getAttribute('aria-label').replace(open ? 'megjelenítése' : 'elrejtése', open ? 'elrejtése' : 'megjelenítése'));
    }
  }

  // Az a fejezet, amelyik éppen a képernyő felső sávjában van (görgetés-követés)
  function watchUnits() {
    if (tocSpy) { tocSpy.disconnect(); tocSpy = null; }
    if (!tocBody || !('IntersectionObserver' in window)) return;
    const els = Array.prototype.slice.call(document.querySelectorAll('#pathList .path-unit'));
    const header = document.getElementById('header');
    const cut = Math.round((header ? header.getBoundingClientRect().bottom : 0) + 16);
    const inView = new Set();
    tocSpy = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) inView.add(en.target); else inView.delete(en.target); });
      const first = els.find(el => inView.has(el));
      markTocActive(first ? first.dataset.unit : null);
    }, { rootMargin: '-' + cut + 'px 0px -55% 0px', threshold: 0 });
    els.forEach(el => tocSpy.observe(el));
  }

  function markTocActive(uid) {
    if (uid === tocActive || !tocBody) return;
    tocActive = uid;
    tocBody.querySelectorAll('.ptoc-unit.is-active').forEach(s => {
      s.classList.remove('is-active');
      const b = s.querySelector('.ptoc-unit-btn'); if (b) b.removeAttribute('aria-current');
    });
    if (!uid) return;
    const sec = tocBody.querySelector('.ptoc-unit[data-unit="' + uid + '"]');
    if (!sec) return;
    sec.classList.add('is-active');
    const b = sec.querySelector('.ptoc-unit-btn'); if (b) b.setAttribute('aria-current', 'true');
    if (tocOpen) revealInToc(sec);
  }

  // a sáv saját görgetése: az aktív fejezet maradjon látható (az oldal nem mozdul)
  function revealInToc(sec) {
    const b = tocBody.getBoundingClientRect();
    // ha a fejezet a lépéseivel együtt kifér, az egész látsszon; különben legalább a címsora
    const whole = sec.getBoundingClientRect();
    const r = whole.height <= b.height - 12 ? whole : (sec.querySelector('.ptoc-unit-row') || sec).getBoundingClientRect();
    if (r.top < b.top + 6) tocBody.scrollTop += r.top - b.top - 6;
    else if (r.bottom > b.bottom - 6) tocBody.scrollTop += r.bottom - b.bottom + 6;
  }

  function setTocOpen(open, focus) {
    if (!tocEl) return;
    tocOpen = open;
    const dock = tocDock.matches;
    tocEl.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('toc-docked', open && dock);
    if (tocScrim) tocScrim.classList.toggle('is-open', open && !dock);
    if (tocToggle) {
      tocToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      tocToggle.classList.toggle('is-away', open);
    }
    if (dock) { tocState.open = open; saveToc(); }       // a fiók (telefon) mindig csukva indul
    if (open) {
      const sec = tocActive && tocBody.querySelector('.ptoc-unit[data-unit="' + tocActive + '"]');
      const here = sec || tocBody.querySelector('.ptoc-step.is-next');
      if (here) revealInToc(here.closest('.ptoc-unit') || here);
      if (focus && tocClose) tocClose.focus();
    } else if (focus && tocToggle) tocToggle.focus();
  }

  // A térkép odagördül: a fejezet címe a lebegő fejléc alá, a lépés a képernyő közepére
  function locate(el) {
    if (!el) return;
    document.querySelectorAll('.is-located').forEach(x => x.classList.remove('is-located'));
    el.classList.add('is-located');
    clearTimeout(locateTimer);
    locateTimer = setTimeout(() => el.classList.remove('is-located'), 2400);
  }
  function goToUnit(uid) {
    const unit = document.querySelector('#pathList .path-unit[data-unit="' + uid + '"]');
    if (!unit) return;
    closePop();
    if (!tocDock.matches) setTocOpen(false);
    if (unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);   // a csukott fejezet kinyílik
    const header = document.getElementById('header');
    const y = unit.getBoundingClientRect().top + window.scrollY - (header ? header.getBoundingClientRect().bottom : 0) - 4;
    window.scrollTo({ top: Math.max(0, y), behavior: scrollMode() });
    locate(unit);
  }
  function goToStep(id) {
    const btn = document.querySelector('#pathList .path-node-btn[data-step="' + id + '"]');
    if (!btn) return;
    closePop();
    if (!tocDock.matches) setTocOpen(false);
    const node = btn.closest('.path-node');
    const unit = node.closest('.path-unit');
    if (unit && unit.classList.contains('is-folded')) foldMapUnit(unit, true, true);
    node.scrollIntoView({ behavior: scrollMode(), block: 'center' });
    locate(node);
    try { btn.focus({ preventScroll: true }); } catch (e) {}
  }

  if (tocEl && tocBody) {
    tocBody.addEventListener('click', e => {
      const fold = e.target.closest('.ptoc-fold');
      if (fold) {
        const sec = fold.closest('.ptoc-unit'), open = !sec.classList.contains('is-unfolded');
        foldTocUnit(sec, open);
        if (open) revealInToc(sec);
        return;
      }
      const unitBtn = e.target.closest('.ptoc-unit-btn');
      if (unitBtn) {
        const sec = unitBtn.closest('.ptoc-unit');
        foldTocUnit(sec, true);
        if (tocDock.matches) revealInToc(sec);
        goToUnit(sec.dataset.unit);
        return;
      }
      const stepBtn = e.target.closest('.ptoc-step-btn');
      if (stepBtn) goToStep(stepBtn.dataset.step);
    });
    if (tocToggle) tocToggle.addEventListener('click', () => setTocOpen(true, true));
    if (tocClose) tocClose.addEventListener('click', () => setTocOpen(false, true));
    if (tocScrim) tocScrim.addEventListener('click', () => setTocOpen(false));
    if (tocAll) tocAll.addEventListener('click', () => {
      tocState.all = !tocState.all; saveToc();
      if (!tocState.all) Object.keys(tocFolded).forEach(k => { tocFolded[k] = false; });   // becsukáskor csak az marad nyitva, ahol tartasz
      const next = tocBody.querySelector('.ptoc-step.is-next');
      tocBody.querySelectorAll('.ptoc-unit').forEach(sec => foldTocUnit(sec, tocState.all || (!!next && sec.contains(next))));
      tocAll.textContent = tocState.all ? 'Mindet becsuk' : 'Mindet kinyit';
      tocAll.setAttribute('aria-pressed', tocState.all ? 'true' : 'false');
      const sec = tocActive && tocBody.querySelector('.ptoc-unit[data-unit="' + tocActive + '"]');
      if (sec) revealInToc(sec);
    });
    // fiók-módban: Esc bezár, a Tab a fiókon belül marad
    document.addEventListener('keydown', e => {
      if (!tocOpen || tocDock.matches) return;
      if (e.key === 'Escape') { setTocOpen(false, true); return; }
      if (e.key !== 'Tab') return;
      const items = Array.prototype.filter.call(tocEl.querySelectorAll('button'), b => b.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // a töréspont átlépésekor: asztali gépen a mentett állapot, fiók-módban csukva
    const syncTocMode = () => setTocOpen(tocDock.matches ? tocState.open !== false : false);
    if (tocDock.addEventListener) tocDock.addEventListener('change', syncTocMode);
    syncTocMode();
  }

  function renderAll() { renderHomeTop(); renderPath(); }
  renderAll();

  // Fiók-blokk: bejelentkezve nincs rá szükség
  const account = document.getElementById('homeAccount');
  const hideAccount = user => { if (account) account.classList.toggle('hidden', !!user); };
  if (window.HanziFlowAuth) {
    try { hideAccount(HanziFlowAuth.getCachedUser && HanziFlowAuth.getCachedUser()); } catch (e) {}
    try { HanziFlowAuth.onChange && HanziFlowAuth.onChange(hideAccount); } catch (e) {}
  }

  // Oldalon belüli horgonyok: finom görgetés a lebegő fejléc alá
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const header = document.getElementById('header');
      const top = target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 24;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      try { history.replaceState(null, '', anchor.getAttribute('href')); } catch (err) {}
    });
  });
  // érkezés #path horgonnyal (pl. a modul-oldal „Tovább az úton" gombjáról)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) requestAnimationFrame(() => {
      const header = document.getElementById('header');
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 24) });
    });
  }

  // Aktív fejléc-link a görgetéssel
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));
}


/* ====================================================
   5. AUTH PAGES (login.html + register.html) ──────
   ==================================================== */

function initAuthPages() {

  // Shake CSS injection (auth-only animáció)
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60%  { transform: translateX(-6px); }
      40%,80%  { transform: translateX(6px); }
    }
    .shake { animation: shake 0.4s ease; }
  `;
  document.head.appendChild(shakeStyle);

  // Password visibility toggle
  const togglePw = document.getElementById('togglePw');
  const pwInput  = document.getElementById('password');
  const eyeIcon  = document.getElementById('eyeIcon');

  const eyeOpen   = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>`;
  const eyeClosed = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

  if (togglePw && pwInput && eyeIcon) {
    togglePw.addEventListener('click', () => {
      const isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      eyeIcon.innerHTML = isPassword ? eyeClosed : eyeOpen;
    });
  }

  // Password strength (register only)
  const pwStrength = document.getElementById('pwStrength');
  const bars       = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4'),
  ];
  const pwLabel = document.getElementById('pwLabel');

  function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, score);
  }
  const strengthLabels  = ['Gyenge', 'Közepes', 'Erős', 'Nagyon erős'];
  const strengthClasses = ['weak', 'fair', 'good', 'strong'];

  if (pwInput && pwStrength && bars.length && bars[0]) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      if (!val) {
        bars.forEach(b => { b.className = 'pw-bar'; });
        if (pwLabel) pwLabel.textContent = 'Jelszó erőssége';
        return;
      }
      const score = getStrength(val);
      bars.forEach((b, i) => {
        b.className = 'pw-bar' + (i < score ? ' ' + strengthClasses[score - 1] : '');
      });
      if (pwLabel) pwLabel.textContent = strengthLabels[score - 1] || '';
    });
  }

  // Password confirm check (register only)
  const pwConfirm  = document.getElementById('passwordConfirm');
  const pwMatchErr = document.getElementById('pwMatchError');

  if (pwConfirm && pwMatchErr) {
    pwConfirm.addEventListener('input', () => {
      if (pwInput && pwConfirm.value && pwConfirm.value !== pwInput.value) {
        pwMatchErr.classList.remove('hidden');
        pwConfirm.classList.add('error');
      } else {
        pwMatchErr.classList.add('hidden');
        pwConfirm.classList.remove('error');
      }
    });
  }

  function shakeForm() {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
  }

  // ── V16: Firebase auth integráció ────────────────────
  const AUTH = window.HanziFlowAuth;

  // Univerzális hiba-megjelenítő az auth-kártyán
  function showAuthError(msg) {
    let box = document.getElementById('authErrorBox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'authErrorBox';
      box.className = 'auth-error-box';
      const form = document.querySelector('.auth-form');
      if (form) form.insertBefore(box, form.firstChild);
    }
    box.textContent = msg;
    box.classList.add('visible');
    shakeForm();
  }
  function clearAuthError() {
    const box = document.getElementById('authErrorBox');
    if (box) box.classList.remove('visible');
  }
  // Sikeres belépés/regisztráció után — vissza az indexre
  function redirectAfterAuth() {
    window.location.href = '../index.html';
  }

  // Login gomb — valós Firebase
  const loginBtn    = document.getElementById('loginBtn');
  const loginLoader = document.getElementById('loginLoader');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      clearAuthError();
      const email = document.getElementById('email')?.value?.trim();
      const pw    = document.getElementById('password')?.value;
      if (!email || !pw) { shakeForm(); return; }
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      const btnText = loginBtn.querySelector('.btn-text');
      const orig = btnText ? btnText.textContent : '';
      if (btnText) btnText.textContent = 'Bejelentkezés...';
      if (loginLoader) loginLoader.classList.remove('hidden');
      loginBtn.disabled = true; loginBtn.style.opacity = '0.8';
      try {
        await AUTH.login(email, pw);
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        if (btnText) btnText.textContent = orig || 'Bejelentkezés';
        if (loginLoader) loginLoader.classList.add('hidden');
        loginBtn.disabled = false; loginBtn.style.opacity = '';
      }
    });
  }

  // Register gomb — valós Firebase
  const registerBtn    = document.getElementById('registerBtn');
  const registerLoader = document.getElementById('registerLoader');
  if (registerBtn) {
    registerBtn.addEventListener('click', async () => {
      clearAuthError();
      const terms = document.getElementById('terms');
      if (terms && !terms.checked) {
        terms.closest('.form-check')?.classList.add('shake');
        setTimeout(() => terms.closest('.form-check')?.classList.remove('shake'), 500);
        return;
      }
      const email = document.getElementById('email')?.value?.trim();
      const pw  = document.getElementById('password')?.value;
      const pc  = document.getElementById('passwordConfirm')?.value;
      const fname = document.getElementById('firstname')?.value?.trim() || '';
      const lname = document.getElementById('lastname')?.value?.trim() || '';
      if (!email || !pw) { shakeForm(); return; }
      if (pw && pc && pw !== pc) {
        if (pwMatchErr) pwMatchErr.classList.remove('hidden');
        return;
      }
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      const btnText = registerBtn.querySelector('.btn-text');
      const orig = btnText ? btnText.textContent : '';
      if (btnText) btnText.textContent = 'Regisztrálás...';
      if (registerLoader) registerLoader.classList.remove('hidden');
      registerBtn.disabled = true; registerBtn.style.opacity = '0.8';
      try {
        const displayName = (fname + ' ' + lname).trim() || email.split('@')[0];
        await AUTH.register(email, pw, displayName);
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        if (btnText) btnText.textContent = orig || 'Regisztráció';
        if (registerLoader) registerLoader.classList.add('hidden');
        registerBtn.disabled = false; registerBtn.style.opacity = '';
      }
    });
  }

  // Google gomb — valós Firebase popup
  document.querySelectorAll('#googleBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      clearAuthError();
      if (!AUTH || !AUTH.isEnabled()) {
        showAuthError('Az auth csak HTTP szerver alatt működik (GitHub Pages / localhost).');
        return;
      }
      btn.disabled = true; btn.style.opacity = '0.8';
      try {
        await AUTH.loginGoogle();
        redirectAfterAuth();
      } catch (err) {
        showAuthError(AUTH.humanError(err));
      } finally {
        btn.disabled = false; btn.style.opacity = '';
      }
    });
  });

  // Input focus icon color
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.input-wrapper')?.querySelector('.input-icon')?.setAttribute('style', 'color: var(--gold)');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.closest('.input-wrapper')?.querySelector('.input-icon')?.setAttribute('style', '');
      }
    });
  });
}


/* ====================================================
   9b. initStatsPage() — V4 Statisztika oldal ───────
   stats.html. P1: Practice History (E) nézet — a
   HanziFlowStats session-logokból. A többi fül (A/B/
   C/D/F) a V4 következő fázisaiban nyílik.
   ==================================================== */

function initStatsPage() {

  const MODULE_LABELS = {
    lesson: 'Leckék',
    tones: 'Tónus-tréner',
    pinyin: 'Pinyin-tábla'
  };
  const MODE_LABELS = {
    hear: 'Hallás után', see: 'Jelölés', pairs: 'Szópárok', match: 'Párosító',
    write: 'Beírás', dictate: 'Diktálás',
    check: 'Ellenőrzés', listen: 'Hallás utáni kör', read: 'Olvasás', review: 'Ismétlés', retry: 'Hibák újra', quick: 'Gyors kérdések',
  };
  // Az Áttekintés műszerfal: benne az aktivitás (heatmap, sorozat) és a „mit gyakorolj" is.
  const TABS = [
    { id: 'overview',  name: 'Áttekintés', enabled: true  },
    { id: 'radar',     name: 'Modulok',    enabled: true  },
    { id: 'analytics', name: 'Elemzés',    enabled: true  },
    { id: 'history',   name: 'Előzmények', enabled: true  }
  ];
  let activeTab = 'overview';
  let radarModule = null;     // V4 P3 — modul drill-down állapot

  /* ── Formázók ──────────────────────────────────── */
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '. ' + pad(d.getMonth() + 1) + '. ' + pad(d.getDate()) +
           '.  ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function fmtDuration(ms) {
    const s = Math.round((ms || 0) / 1000);
    if (s < 60) return s + ' mp';
    return Math.floor(s / 60) + ' p ' + pad(s % 60) + ' mp';
  }
  // Hibakód → magyar felirat. Elsőként a modulok hiba-katalógusainak `title` mezője
  // (core.js), aztán a katalóguson kívüli, általános kódok; végső esetben a nyers kód.
  const ERROR_CATALOGS = [];
  const ERROR_LABELS = {
    wrong_form: 'Rossz alak', wrong_choice: 'Rossz válasz', wrong_reading: 'Rossz olvasat',
    wrong_type: 'Rossz típus', wrong_category: 'Rossz kategória', wrong_order: 'Rossz sorrend',
    wrong_pattern: 'Másik minta', wrong_particle: 'Rossz partikula', wrong: 'Rossz válasz',
    empty: 'Üres válasz', dont_know: 'Nem tudtam', typo: 'Elgépelés', timeout: 'Lejárt az idő',
    partial_match: 'Részben jó', far: 'Messze járt', near: 'Közel járt', close: 'Majdnem jó',
    wrong_tone: 'Rossz tónus', tone_pair: 'Tónus-pár'
  };
  function errorLabel(code) {
    const key = String(code || '');
    for (let i = 0; i < ERROR_CATALOGS.length; i++) {
      const hit = ERROR_CATALOGS[i][key];
      if (hit && hit.title) return hit.title;
    }
    return ERROR_LABELS[key] || key.replace(/[_-]/g, ' ');
  }
  function topError(codes) {
    if (!codes || !codes.length) return null;
    const freq = {};
    codes.forEach(c => { freq[c] = (freq[c] || 0) + 1; });
    let best = null, n = 0;
    Object.keys(freq).forEach(c => { if (freq[c] > n) { n = freq[c]; best = c; } });
    return best ? { code: errorLabel(best), count: n } : null;
  }

  /* ── V4 P2 — stat-számítók ─────────────────────── */
  const DAY_MS = 86400000;
  const MODULE_KEYS = Object.keys(MODULE_LABELS);
  const TOD_BUCKETS = [
    { id: 'reggel',  label: 'Reggel',  emoji: '🌅', hint: '5–11 óra' },
    { id: 'delutan', label: 'Délután', emoji: '☀️', hint: '12–17 óra' },
    { id: 'este',    label: 'Este',    emoji: '🌆', hint: '18–22 óra' },
    { id: 'ejszaka', label: 'Éjszaka', emoji: '🌙', hint: '23–4 óra' }
  ];
  function bucketOf(h) {
    if (h >= 5 && h <= 11) return 'reggel';
    if (h >= 12 && h <= 17) return 'delutan';
    if (h >= 18 && h <= 22) return 'este';
    return 'ejszaka';
  }
  function dayKey(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function startOfDay(ts) {
    const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime();
  }

  // Readiness: modul-mastery + frissesség + napi aktivitás (cél: HSK 1)
  function computeReadiness() {
    const sessions = HanziFlowStats.getSessions();
    const now = Date.now();
    const pm = {};
    MODULE_KEYS.forEach(m => { pm[m] = { Q: 0, C: 0, last: 0 }; });
    sessions.forEach(s => {
      const p = pm[s.module]; if (!p) return;
      p.Q += s.questionCount || 0;
      p.C += s.correctCount || 0;
      if (s.ts > p.last) p.last = s.ts;
    });
    let masterySum = 0, freshSum = 0;
    const moduleScores = {};
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.Q === 0) { moduleScores[m] = 0; return; }
      const accuracy = p.C / p.Q;
      const coverage = Math.min(1, p.Q / 60);          // ~60 kérdés = teli lefedettség
      const mastery = accuracy * coverage;
      masterySum += mastery;
      const daysSince = (now - p.last) / DAY_MS;
      const fresh = daysSince <= 2 ? 1
                  : daysSince >= 21 ? 0.25
                  : 1 - 0.75 * (daysSince - 2) / 19;
      freshSum += fresh;
      moduleScores[m] = Math.round(mastery * 100);
    });
    const masteryComp = masterySum / MODULE_KEYS.length;
    const freshComp   = freshSum   / MODULE_KEYS.length;
    const weekAgo = startOfDay(now) - 6 * DAY_MS;
    let activeDays = 0;
    HanziFlowStats.getDailyAggregates().forEach(d => {
      if (new Date(d.date + 'T00:00:00').getTime() >= weekAgo) activeDays++;
    });
    const activityComp = Math.min(1, activeDays / 5);
    return {
      score:     Math.round(100 * (0.55 * masteryComp + 0.20 * freshComp + 0.25 * activityComp)),
      mastery:   Math.round(masteryComp * 100),
      freshness: Math.round(freshComp * 100),
      activity:  Math.round(activityComp * 100),
      moduleScores: moduleScores
    };
  }

  // Felkészültség: küszöb-átlépéskor ünneplés
  // Tier-küszöbök: 25 / 50 / 75 / 90. Csak NÖVEKVŐ átlépésnél triggerel.
  // localStorage: 'hanziflow_last_readiness_tier' eltárolja a legmagasabb elért tier-t.
  function tierForScore(score) {
    if (score >= 90) return 90;
    if (score >= 75) return 75;
    if (score >= 50) return 50;
    if (score >= 25) return 25;
    return 0;
  }
  const TIER_MESSAGES = {
    25: { title: '🌱 Első küszöb!',     sub: '25% — megtetted az első lépéseket.' },
    50: { title: '🏮 Félút!',           sub: '50% — szilárd alapokon állsz.' },
    75: { title: '🐉 Erős készültség!', sub: '75% — már sokat tudsz.' },
    90: { title: '✨ Mester szint!',    sub: '90% — kiváló kínai tudás. Tarts ki!' }
  };
  function checkReadinessTierMilestone() {
    if (!window.HanziFlowMotion || !window.HanziFlowMotion.celebrate) return;
    const rd = computeReadiness();
    const newTier = tierForScore(rd.score);
    let lastTier = 0;
    try { lastTier = parseInt(localStorage.getItem('hanziflow_last_readiness_tier') || '0', 10) || 0; }
    catch (e) {}
    if (newTier > lastTier && TIER_MESSAGES[newTier]) {
      // Új tier átlépve — celebrate (800ms delay-vel, hogy a felhasználó lássa az új score-t)
      const msg = TIER_MESSAGES[newTier];
      setTimeout(() => {
        window.HanziFlowMotion.celebrate({ message: msg.title, subtitle: msg.sub, duration: 1700 });
      }, 800);
      try { localStorage.setItem('hanziflow_last_readiness_tier', String(newTier)); }
      catch (e) {}
    } else if (newTier < lastTier) {
      // Ha lecsökkent a score (pl. clearSessions után), reseteljük a track-et
      try { localStorage.setItem('hanziflow_last_readiness_tier', String(newTier)); }
      catch (e) {}
    }
  }

  // Egymást követő naptári napok streakje
  //   (a számítás a HanziFlowStats-ban van: a kezdőlap napi célja ugyanebből dolgozik)
  function computeStreak() { return HanziFlowStats.getStreak(); }

  function todayStats() { return HanziFlowStats.getToday(); }

  // Heatmap — az elmúlt egy év (53 hét × 7 nap), hétfő-kezdő hetek, GitHub-szerű elrendezés.
  //   level 0–4: a napi kérdésszám a legaktívabb naphoz mérve.
  const HM_MONTHS = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
  function heatmapData() {
    const map = {};
    let maxQ = 1;
    HanziFlowStats.getDailyAggregates().forEach(d => {
      map[d.date] = d; if (d.questions > maxQ) maxQ = d.questions;
    });
    const today = startOfDay(Date.now());
    const todayDow = (new Date(today).getDay() + 6) % 7;   // hétfő = 0
    const WEEKS = 53;
    const start = new Date(today);
    start.setDate(start.getDate() - todayDow - (WEEKS - 1) * 7);
    const cells = [], months = [];
    let totalQ = 0, activeDays = 0, lastMonth = -1;
    for (let i = 0; i < WEEKS * 7; i++) {
      const dt = new Date(start); dt.setDate(start.getDate() + i);   // naptári lépés (óraátállítás-biztos)
      const ts = dt.getTime();
      const d = map[dayKey(ts)];
      const q = d ? d.questions : 0;
      let level = 0;
      if (q > 0) level = q >= maxQ * 0.75 ? 4 : q >= maxQ * 0.5 ? 3 : q >= maxQ * 0.25 ? 2 : 1;
      const future = ts > today;
      if (!future && q > 0) { totalQ += q; activeDays++; }
      cells.push({ ts: ts, q: q, sessions: d ? d.sessions : 0, accuracy: d ? d.accuracy : 0,
                   level: level, future: future, today: ts === today });
      // hónap-felirat: annak a hétnek az oszlopa fölé, amelyikben a hónap első hétfője van
      if (i % 7 === 0 && dt.getMonth() !== lastMonth) {
        lastMonth = dt.getMonth();
        months.push({ week: i / 7, label: HM_MONTHS[lastMonth] });
      }
    }
    return { cells: cells, weeks: WEEKS, months: months, totalQ: totalQ, activeDays: activeDays };
  }

  function timeOfDayData() {
    const b = {};
    TOD_BUCKETS.forEach(x => { b[x.id] = { sessions: 0, Q: 0, C: 0 }; });
    HanziFlowStats.getSessions().forEach(s => {
      const bk = b[bucketOf(new Date(s.ts).getHours())];
      bk.sessions++; bk.Q += s.questionCount || 0; bk.C += s.correctCount || 0;
    });
    return TOD_BUCKETS.map(x => ({
      id: x.id, label: x.label, emoji: x.emoji, hint: x.hint,
      sessions: b[x.id].sessions,
      accuracy: b[x.id].Q > 0 ? Math.round(b[x.id].C / b[x.id].Q * 100) : 0
    }));
  }

  // Legjobb tanulási idő — a legjobb pontosságú napszak (min. 2 kör)
  function bestStudyTime(tod) {
    let best = null;
    tod.forEach(t => {
      if (t.sessions >= 2 && (!best || t.accuracy > best.accuracy)) best = t;
    });
    return best;
  }

  // Readiness ring SVG (kézzel rajzolt)
  function ringSvg(score) {
    const r = 80, C = 2 * Math.PI * r;
    const off = C * (1 - Math.max(0, Math.min(100, score)) / 100);
    const tone = score >= 70 ? 'ring-hi' : score >= 40 ? 'ring-mid' : 'ring-lo';
    // V8 polish: kezdeti offset = teljes kerület (üres ring), data-target-offset
    // attribútumban tároljuk a célt → a renderelés után JS animálja a CSS transition-ön át.
    return `
      <svg class="readiness-ring ${tone}" viewBox="0 0 200 200" data-target-offset="${off.toFixed(1)}">
        <circle class="ring-track" cx="100" cy="100" r="${r}" />
        <circle class="ring-fill" cx="100" cy="100" r="${r}"
                stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"
                transform="rotate(-90 100 100)" />
      </svg>`;
  }

  function animateReadinessRings(root) {
    const svgs = (root || document).querySelectorAll('.readiness-ring[data-target-offset]');
    svgs.forEach(svg => {
      const target = svg.getAttribute('data-target-offset');
      const fill = svg.querySelector('.ring-fill');
      if (!fill || !target) return;
      // Egy frame után állítjuk → CSS transition triggerel
      requestAnimationFrame(() => {
        setTimeout(() => fill.setAttribute('stroke-dashoffset', target), 50);
      });
      svg.removeAttribute('data-target-offset');
    });
  }

  function emptyState(icon, title, sub) {
    return `
      <div class="stats-empty glass-panel">
        <div class="stats-empty-icon">${icon}</div>
        <p>${title}</p>
        <p class="stats-empty-sub">${sub}</p>
        <a href="modules.html" class="btn btn-primary glow-effect">Irány a modulok →</a>
      </div>`;
  }

  /* ── V4 P3 — radar + analytics helperek ────────── */
  // Radar tengely-sorrend (V5 bővítve: + Mintázatok)
  const RADAR_ORDER = ['lesson', 'tones', 'pinyin'];
  const RADAR_LABELS = { lesson: 'Leckék', tones: 'Tónusok', pinyin: 'Pinyin' };
  // Profil-alapú al-bontás (a modulok saját localStorage profiljaiból)
  const PROFILE_CONFIG = {
    tones: { key: 'hanziflow_tones_profile_v1', stats: [
      { field: 'toneStats', title: 'Tónusonként' } ] }
  };

  function cleanKey(k) {
    const s = String(k).replace(/[_-]/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }

  // Egy modul session-log statja (per-mód bontással)
  function moduleSessionStats(moduleKey) {
    const sess = HanziFlowStats.getSessions().filter(s => s.module === moduleKey);
    const modes = {};
    let Q = 0, C = 0, dur = 0;
    sess.forEach(s => {
      Q += s.questionCount || 0; C += s.correctCount || 0; dur += s.durationMs || 0;
      const m = modes[s.mode] = modes[s.mode] || { Q: 0, C: 0, n: 0 };
      m.Q += s.questionCount || 0; m.C += s.correctCount || 0; m.n++;
    });
    return {
      rounds: sess.length, questions: Q, correct: C, durationMs: dur,
      accuracy: Q > 0 ? Math.round(C / Q * 100) : 0,
      modes: Object.keys(modes).map(k => ({
        mode: k, rounds: modes[k].n, questions: modes[k].Q,
        pct: modes[k].Q > 0 ? Math.round(modes[k].C / modes[k].Q * 100) : 0
      }))
    };
  }

  // Profil-alapú al-bontások egy modulhoz (Godan/Ichidan, te/nai/masu, kategória…)
  function subBreakdowns(moduleKey) {
    const out = [];
    const cfg = PROFILE_CONFIG[moduleKey];
    if (cfg) {
      const p = readJson(cfg.key);
      if (p) cfg.stats.forEach(s => {
        const obj = p[s.field];
        if (obj && Object.keys(obj).length) {
          const rows = Object.keys(obj).map(k => {
            const st = obj[k] || {};
            const a = st.attempts || 0, c = st.correct || 0;
            return { label: cleanKey(k), attempts: a, correct: c,
                     pct: a > 0 ? Math.round(c / a * 100) : 0 };
          }).sort((x, y) => x.pct - y.pct);   // gyengétől erősig
          out.push({ title: s.title, kind: 'rate', rows: rows });
        }
      });
    }
    if (moduleKey === 'listening') {
      const p = readJson('hanziflow_listening_profile_v1');
      if (p && p.trapErrors) {
        const rows = Object.keys(p.trapErrors)
          .map(k => ({ label: errorLabel(k), count: p.trapErrors[k] || 0 }))
          .sort((x, y) => y.count - x.count);
        if (rows.some(r => r.count > 0))
          out.push({ title: 'Hang-csapda hibák', kind: 'count', rows: rows });
      }
    }
    return out;
  }

  // Pontosság-trend napi bontásban
  function trendData() {
    return HanziFlowStats.getDailyAggregates().map(d => ({
      date: d.date, accuracy: d.accuracy, questions: d.questions
    }));
  }

  // Radar SVG — kézzel rajzolt, 6 tengely
  function radarSvg(items) {
    const cx = 175, cy = 150, R = 96, n = items.length;
    const pt = (r, i) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const polyOf = rr => items.map((_, i) => pt(rr, i).map(v => v.toFixed(1)).join(',')).join(' ');
    let grid = '';
    [0.25, 0.5, 0.75, 1].forEach(f => { grid += `<polygon class="radar-grid" points="${polyOf(R * f)}" />`; });
    let axes = '';
    items.forEach((_, i) => {
      const [x, y] = pt(R, i);
      axes += `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
    });
    const dataPts = items.map((it, i) =>
      pt(R * Math.max(0, Math.min(100, it.value)) / 100, i).map(v => v.toFixed(1)).join(',')).join(' ');
    let dots = '', labels = '';
    items.forEach((it, i) => {
      const [dx, dy] = pt(R * Math.max(0, Math.min(100, it.value)) / 100, i);
      dots += `<circle class="radar-dot" cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="3.6" />`;
      const [lx, ly] = pt(R + 20, i);
      const anchor = Math.abs(lx - cx) < 8 ? 'middle' : (lx > cx ? 'start' : 'end');
      labels += `<text class="radar-label" x="${lx.toFixed(1)}" y="${(ly + 3).toFixed(1)}" text-anchor="${anchor}">${it.label}</text>`;
      labels += `<text class="radar-label-val" x="${lx.toFixed(1)}" y="${(ly + 15).toFixed(1)}" text-anchor="${anchor}">${it.value}</text>`;
    });
    return `<svg viewBox="0 0 350 300" class="radar-svg">
      ${grid}${axes}
      <polygon class="radar-data" points="${dataPts}" />
      ${dots}${labels}
    </svg>`;
  }

  // Vonaldiagram SVG — kézzel rajzolt
  function lineSvg(points, opts) {
    opts = opts || {};
    if (points.length === 0) return '';
    const W = 600, H = 190, padL = 38, padR = 14, padT = 14, padB = 30;
    const iw = W - padL - padR, ih = H - padT - padB;
    const max = opts.max || 100;
    const xAt = i => padL + (points.length === 1 ? iw / 2 : iw * i / (points.length - 1));
    const yAt = v => padT + ih * (1 - Math.max(0, Math.min(max, v)) / max);
    let grid = '';
    [0, 0.5, 1].forEach(f => {
      const y = padT + ih * f;
      grid += `<line class="ln-grid" x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" />`;
      grid += `<text class="ln-axis" x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end">${Math.round(max * (1 - f))}</text>`;
    });
    const line = points.map((p, i) => `${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(' ');
    const area = `${padL},${(padT + ih).toFixed(1)} ${line} ${xAt(points.length - 1).toFixed(1)},${(padT + ih).toFixed(1)}`;
    let dots = '';
    points.forEach((p, i) => {
      dots += `<circle class="ln-dot" cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="3.2">` +
              `<title>${p.label}: ${p.value}${opts.unit || ''}</title></circle>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="line-svg">
      ${grid}
      <polygon class="ln-area" points="${area}" />
      <polyline class="ln-line" points="${line}" />
      ${dots}
    </svg>`;
  }

  /* ── Fül-sáv ───────────────────────────────────── */
  function renderTabs() {
    document.getElementById('statsTabs').innerHTML = TABS.map(t => `
      <button class="stats-tab ${t.id === activeTab ? 'active' : ''} ${t.enabled ? '' : 'stats-tab-locked'}"
              data-tab="${t.id}" ${t.enabled ? '' : 'disabled'}>
        ${t.name}${t.enabled ? '' : ' 🔒'}
      </button>
    `).join('');
    // telefonon a fül-sáv vízszintesen görgethető: az aktív fül legyen látható
    const bar = document.getElementById('statsTabs'), act = bar.querySelector('.stats-tab.active');
    if (act && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = Math.max(0, act.offsetLeft - (bar.clientWidth - act.offsetWidth) / 2);
    document.querySelectorAll('.stats-tab').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        radarModule = null;
        renderTabs();
        renderContent();
      });
    });
  }

  function renderContent() {
    if      (activeTab === 'overview')  renderOverview();
    else if (activeTab === 'radar')     renderRadar();
    else if (activeTab === 'analytics') renderAnalytics();
    else if (activeTab === 'history')   renderHistory();
    else renderComingSoon();
  }

  function renderComingSoon() {
    document.getElementById('statsContent').innerHTML = `
      <div class="stats-empty glass-panel">
        <div class="stats-empty-icon">🚧</div>
        <p>Ez a nézet a V4 következő fázisában készül el.</p>
        <p class="stats-empty-sub">Addig is: az „Előzmények" fülön látod a befejezett köreidet.</p>
      </div>`;
  }

  /* ── E) Practice History ───────────────────────── */
  function renderHistory() {
    const sessions = HanziFlowStats.getSessions().slice().reverse(); // legújabb elöl
    const el = document.getElementById('statsContent');

    if (sessions.length === 0) {
      el.innerHTML = `
        <div class="stats-empty glass-panel">
          <div class="stats-empty-icon">📋</div>
          <p>Még nincs gyakorlási előzményed.</p>
          <p class="stats-empty-sub">Játssz le egy teljes kört bármelyik modulban —
            a kör végén automatikusan ide mentődik.</p>
          <a href="modules.html" class="btn btn-primary glow-effect">Irány a modulok →</a>
        </div>`;
      return;
    }

    const totalQ = sessions.reduce((s, x) => s + (x.questionCount || 0), 0);
    const totalC = sessions.reduce((s, x) => s + (x.correctCount || 0), 0);
    const acc = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;

    const rows = sessions.map(s => {
      const pct = s.questionCount > 0 ? Math.round((s.correctCount / s.questionCount) * 100) : 0;
      const cls = pct >= 80 ? 'sh-ok' : pct >= 50 ? 'sh-warn' : 'sh-bad';
      const te = topError(s.errorCodes);
      const statusCls = s.partial ? 'sh-status-partial' : 'sh-status-done';
      const statusTxt = s.partial ? '⏸ Félbehagyott' : '✓ Befejezett';
      return `
        <div class="sh-row ${cls}${s.partial ? ' sh-row-partial' : ''}">
          <div class="sh-main">
            <span class="sh-module">${MODULE_LABELS[s.module] || s.module}</span>
            <span class="sh-mode">${MODE_LABELS[s.mode] || s.mode}</span>
            <span class="sh-status ${statusCls}">${statusTxt}</span>
            <span class="sh-date">${fmtDate(s.ts)}</span>
          </div>
          <div class="sh-stats">
            <span class="sh-score">${s.correctCount}/${s.questionCount}</span>
            <span class="sh-pct">${pct}%</span>
            <span class="sh-dur">⏱ ${fmtDuration(s.durationMs)}</span>
            ${te ? `<span class="sh-err">fő hiba: ${te.code}${te.count > 1 ? ' ×' + te.count : ''}</span>` : ''}
          </div>
        </div>`;
    }).join('');

    const doneCount    = sessions.filter(s => !s.partial).length;
    const partialCount = sessions.length - doneCount;

    el.innerHTML = `
      <div class="sh-summary glass-panel">
        <div class="sh-sum-stat"><span class="sh-sum-num">${doneCount}</span><span class="sh-sum-label">befejezett kör</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${partialCount}</span><span class="sh-sum-label">félbehagyott kör</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${totalQ}</span><span class="sh-sum-label">összes kérdés</span></div>
        <div class="sh-sum-stat"><span class="sh-sum-num">${acc}%</span><span class="sh-sum-label">össz-pontosság</span></div>
        <button class="sh-clear" id="shClear" type="button">Előzmények törlése</button>
      </div>
      <div class="sh-list">${rows}</div>
    `;

    const clr = document.getElementById('shClear');
    if (clr) clr.addEventListener('click', () => {
      HanziFlowRound.confirmDelete('Törlöd az előzményeket?', 'A teljes gyakorlási előzmény elvész, vele a statisztika is. Ez nem vonható vissza.', () => {
        HanziFlowStats.clearSessions();
        renderHistory();
      });
    });
  }

  /* ── A) Áttekintés — műszerfal ─────────────────── */
  const ICON = {
    flame:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-1.6.6-2.7 1.4-3.6.3 1.4 1 2.2 1.9 2.4C10 9 10.6 6 12 3z"/></svg>',
    rounds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="13" height="15" rx="3"/><path d="M8 5V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    clock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  function todayBlurb(today, streak) {
    if (today.rounds === 0) {
      return streak.current > 0
        ? 'Ma még nem gyakoroltál. Egy gyors kör életben tartja a sorozatot.'
        : 'Ma még nem gyakoroltál. Egy rövid kör is számít.';
    }
    if (today.accuracy >= 85) return 'Kiváló forma ma: ' + today.accuracy + '% pontosság.';
    if (today.accuracy >= 60) return 'Szép munka ma, így tovább.';
    return 'A kitartás a lényeg: a mai körök is építenek.';
  }

  function fmtShort(ms) {
    const s = Math.round((ms || 0) / 1000);
    return s < 60 ? s + ' mp' : Math.round(s / 60) + ' perc';
  }
  function fmtDay(ts) {
    const d = new Date(ts);
    return d.getFullYear() + '. ' + HM_MONTHS[d.getMonth()] + ' ' + d.getDate() + '.';
  }

  // Éves heatmap (GitHub-szerű): hetek oszlopban, napok sorban, hónap-feliratok felül.
  function heatmapHtml(hm) {
    const cells = hm.cells.map(c => {
      const tip = c.future ? '' : fmtDay(c.ts) + ': ' + (c.q > 0 ? c.q + ' kérdés, ' + c.sessions + ' kör, ' + c.accuracy + '%' : 'nem gyakoroltál');
      return '<i class="hm-c hm-l' + c.level + (c.future ? ' hm-future' : '') + (c.today ? ' hm-today' : '') + '"' +
        (tip ? ' data-tip="' + tip + '" title="' + tip + '"' : '') + '></i>';
    }).join('');
    const months = hm.months.map((m, i) => {
      const next = hm.months[i + 1];
      // túl szoros felirat (2 hétnél rövidebb hely) kimarad
      if (next && next.week - m.week < 3) return '';
      return '<span style="grid-column: ' + (m.week + 1) + ' / span ' + Math.min(3, hm.weeks - m.week) + '">' + m.label + '</span>';
    }).join('');
    return `
      <div class="hm">
        <div class="hm-dows" aria-hidden="true"><span>H</span><span></span><span>Sze</span><span></span><span>P</span><span></span><span></span></div>
        <div class="hm-scroll" id="hmScroll" tabindex="0" role="img"
             aria-label="Aktivitás az elmúlt egy évben: ${hm.totalQ} kérdés ${hm.activeDays} aktív napon">
          <div class="hm-months" style="grid-template-columns: repeat(${hm.weeks}, var(--hm-cell))">${months}</div>
          <div class="hm-grid">${cells}</div>
        </div>
      </div>
      <div class="hm-foot">
        <span class="hm-caption" id="hmCaption">${hm.totalQ} kérdés az elmúlt egy évben, ${hm.activeDays} aktív napon</span>
        <span class="hm-legend" aria-hidden="true">
          kevesebb
          <i class="hm-c hm-l0"></i><i class="hm-c hm-l1"></i><i class="hm-c hm-l2"></i><i class="hm-c hm-l3"></i><i class="hm-c hm-l4"></i>
          több
        </span>
      </div>`;
  }

  function renderOverview() {
    const el = document.getElementById('statsContent');
    const hasData = HanziFlowStats.getSessions().length > 0;
    const rd = computeReadiness();
    const today = todayStats();
    const streak = computeStreak();
    const hm = heatmapData();
    const readyLabel = rd.score >= 70 ? 'Jó úton haladsz' : rd.score >= 40 ? 'Halad a tanulás' : 'Most kezdődik';

    const comps = [
      { label: 'Tudás',      val: rd.mastery,   hint: 'pontosság és lefedettség, a modulok átlaga' },
      { label: 'Frissesség', val: rd.freshness, hint: 'mennyire friss a gyakorlásod' },
      { label: 'Aktivitás',  val: rd.activity,  hint: 'aktív napok az elmúlt héten' }
    ].map(c => `
      <div class="ov-comp">
        <div class="ov-comp-top">
          <span class="ov-comp-label">${c.label}</span>
          <span class="ov-comp-val">${c.val}%</span>
        </div>
        <div class="ov-comp-bar"><div class="ov-comp-fill" style="width:${c.val}%"></div></div>
        <div class="ov-comp-hint">${c.hint}</div>
      </div>
    `).join('');

    const vitals = [
      { icon: ICON.rounds, num: today.rounds,                  label: 'mai kör' },
      { icon: ICON.target, num: today.rounds ? today.accuracy + '%' : '–', label: 'mai pontosság' },
      { icon: ICON.clock,  num: today.rounds ? fmtShort(today.durationMs) : '–', label: 'mai idő' }
    ].map(v => `
      <div class="st-vital">
        <span class="st-vital-icon">${v.icon}</span>
        <span class="st-vital-num">${v.num}</span>
        <span class="st-vital-label">${v.label}</span>
      </div>
    `).join('');

    // „Mit gyakorolj most?" — a vakfolt-elemzés legfontosabb tételei
    const spots = hasData ? detectBlindSpots() : [];
    const spotCards = spots.slice(0, 4).map(s => `
      <div class="bs-card">
        <span class="bs-icon">${s.icon}</span>
        <div class="bs-body">
          <div class="bs-title">${s.title}</div>
          <div class="bs-text">${s.text}</div>
        </div>
        ${s.module ? `<button class="btn btn-outline bs-go" type="button" data-mod="${s.module}" data-note="${s.note || ''}">Gyakorlás</button>` : ''}
      </div>
    `).join('');

    el.innerHTML = `
      <section class="st-hero" aria-label="Sorozat és a mai nap">
        <div class="st-streak">
          <span class="st-streak-flame${streak.current > 0 ? ' is-lit' : ''}">${ICON.flame}</span>
          <div class="st-streak-text">
            <span class="st-streak-num" data-count="${streak.current}">${streak.current}</span>
            <span class="st-streak-label">napos sorozat</span>
          </div>
          <span class="st-streak-best">leghosszabb: ${streak.longest} nap</span>
        </div>
        <div class="st-vitals">${vitals}</div>
        <p class="st-blurb">${todayBlurb(today, streak)}</p>
      </section>

      <section class="st-card glass-panel">
        <h2 class="st-card-title">Aktivitás</h2>
        ${heatmapHtml(hm)}
      </section>

      ${hasData ? `
      <section class="st-card glass-panel st-ready">
        <div class="ov-ring-wrap">
          <div class="ov-ring">
            ${ringSvg(rd.score)}
            <div class="ov-ring-center">
              <span class="ov-ring-num" data-count="${rd.score}">${rd.score}</span>
              <span class="ov-ring-unit">/ 100</span>
            </div>
          </div>
          <div class="ov-ring-caption">
            <strong>Felkészültség</strong>
            <span>${readyLabel}</span>
          </div>
        </div>
        <div class="ov-comps">
          <h2 class="st-card-title">Miből áll össze</h2>
          ${comps}
        </div>
      </section>

      <section class="st-card glass-panel">
        <h2 class="st-card-title">Mit gyakorolj most?</h2>
        ${spots.length
          ? spotCards
          : '<p class="st-note">Nincs kiugró gyenge pont: kiegyensúlyozott a gyakorlásod. Ha egy terület lemarad, itt jelezzük.</p>'}
      </section>` : `
      <section class="st-card glass-panel st-empty">
        <h2 class="st-card-title">Itt fog megjelenni a haladásod</h2>
        <p class="st-note">Minden kör után színesedik a naptár, nő a sorozat, és megmutatjuk, mit érdemes gyakorolnod.</p>
        <a href="modules.html" class="btn btn-primary">Az első kör indítása</a>
      </section>`}
    `;

    animateReadinessRings(el);
    countUp(el);
    el.querySelectorAll('.bs-go').forEach(b => {
      b.addEventListener('click', () => goPractice(b.dataset.mod, b.dataset.note));
    });

    // heatmap: a legfrissebb hét látszódjon; koppintásra a nap részletei a lábléc-sorba kerülnek
    const sc = document.getElementById('hmScroll');
    const cap = document.getElementById('hmCaption');
    if (sc) {
      sc.scrollLeft = sc.scrollWidth;
      const base = cap ? cap.textContent : '';
      sc.addEventListener('click', e => {
        const c = e.target.closest ? e.target.closest('.hm-c[data-tip]') : null;
        sc.querySelectorAll('.hm-c.is-picked').forEach(x => x.classList.remove('is-picked'));
        if (!cap) return;
        if (c) { c.classList.add('is-picked'); cap.textContent = c.dataset.tip; }
        else cap.textContent = base;
      });
    }
  }

  // Számok felpörgetése 0-ról (sorozat, felkészültség) — csak ha a mozgás engedélyezett
  function countUp(root) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.querySelectorAll('[data-count]').forEach(n => {
      const to = +n.dataset.count;
      if (!(to > 0)) return;
      const t0 = performance.now(), D = 700;
      (function tick() {
        const p = Math.min(1, Math.max(0, (performance.now() - t0) / D));
        n.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      })();
      setTimeout(() => { n.textContent = to; }, D + 120);
    });
  }

  // Napszak szerinti eloszlás (az Elemzés fülön)
  function timeOfDayCard() {
    const tod = timeOfDayData();
    const best = bestStudyTime(tod);
    const maxTod = Math.max(1, tod[0].sessions, tod[1].sessions, tod[2].sessions, tod[3].sessions);
    const todBars = tod.map(t => `
      <div class="tod-col">
        <div class="tod-bar-wrap">
          <span class="tod-bar-val">${t.sessions}</span>
          <div class="tod-bar" style="height:${Math.round(t.sessions / maxTod * 100)}%"></div>
        </div>
        <div class="tod-label">${t.label}</div>
        <div class="tod-acc">${t.sessions > 0 ? t.accuracy + '%' : '–'}</div>
      </div>
    `).join('');
    return `
      <div class="act-card glass-panel">
        <div class="act-card-title">Mikor gyakorolsz?</div>
        <div class="tod-chart">${todBars}</div>
        <div class="act-best">
          ${best
            ? `<strong>A legjobb időd:</strong> ${best.label.toLowerCase()} (${best.hint}), ${best.accuracy}% pontossággal.`
            : 'Gyakorolj több körben, különböző napszakokban, és megmutatjuk, mikor megy a legjobban.'}
        </div>
      </div>`;
  }

  /* ── C) Module Radar + drill-down ──────────────── */
  function renderRadar() {
    const el = document.getElementById('statsContent');
    if (HanziFlowStats.getSessions().length === 0) {
      el.innerHTML = emptyState('📡', 'Még nincs modul-adat.',
        'Gyakorolj a modulokban — a radar a teljesítményedből rajzolódik ki.');
      return;
    }
    if (radarModule) { renderModuleDrill(radarModule); return; }

    const rd = computeReadiness();
    const items = RADAR_ORDER.map(m => ({
      key: m, label: RADAR_LABELS[m], value: rd.moduleScores[m] || 0
    }));
    const rows = items.map(it => `
      <button class="radar-row" data-mod="${it.key}">
        <span class="radar-row-name">${MODULE_LABELS[it.key]}</span>
        <span class="radar-row-bar"><span class="radar-row-fill" style="width:${it.value}%"></span></span>
        <span class="radar-row-val">${it.value}</span>
        <span class="radar-row-arrow">→</span>
      </button>
    `).join('');

    el.innerHTML = `
      ${items.length >= 5 ? `<div class="act-card glass-panel">
        <div class="act-card-title">Modul-profil — felkészültség tengelyenként</div>
        <div class="radar-wrap">${radarSvg(items)}</div>
      </div>` : ''}
      <div class="act-card glass-panel">
        <div class="act-card-title">Modulok — kattints a részletekért</div>
        ${rows}
      </div>
    `;
    document.querySelectorAll('.radar-row').forEach(b => {
      b.addEventListener('click', () => { radarModule = b.dataset.mod; renderContent(); });
    });
  }

  function renderModuleDrill(moduleKey) {
    const el = document.getElementById('statsContent');
    const st = moduleSessionStats(moduleKey);
    const subs = subBreakdowns(moduleKey);

    const modeRows = st.modes.length ? st.modes.map(m => `
      <div class="md-mode-row">
        <span class="md-mode-name">${MODE_LABELS[m.mode] || m.mode}</span>
        <span class="md-mode-bar"><span class="md-mode-fill" style="width:${m.pct}%"></span></span>
        <span class="md-mode-val">${m.pct}% · ${m.rounds} kör</span>
      </div>
    `).join('') : '<p class="md-empty">Ebben a modulban még nincs befejezett kör.</p>';

    const subHtml = subs.map(sub => {
      const rows = sub.rows.map(r => {
        if (sub.kind === 'count') {
          return `<div class="md-sub-row">
            <span class="md-sub-label">${r.label}</span>
            <span class="md-sub-count">${r.count} hiba</span>
          </div>`;
        }
        const cls = r.pct >= 80 ? 'sb-ok' : r.pct >= 50 ? 'sb-warn' : 'sb-bad';
        return `<div class="md-sub-row">
          <span class="md-sub-label">${r.label}</span>
          <span class="md-sub-bar"><span class="md-sub-fill ${cls}" style="width:${r.pct}%"></span></span>
          <span class="md-sub-val">${r.pct}% <small>(${r.correct}/${r.attempts})</small></span>
        </div>`;
      }).join('');
      return `<div class="md-sub"><div class="md-sub-title">${sub.title}</div>${rows}</div>`;
    }).join('');

    el.innerHTML = `
      <button class="md-back" id="mdBack">← Vissza a modulokhoz</button>
      <div class="md-head glass-panel">
        <h3 class="md-title">${MODULE_LABELS[moduleKey]}</h3>
        <div class="md-head-stats">
          <span><strong>${st.rounds}</strong> kör</span>
          <span><strong>${st.questions}</strong> kérdés</span>
          <span><strong>${st.accuracy}%</strong> pontosság</span>
        </div>
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Módonkénti bontás</div>
        ${modeRows}
      </div>
      ${subs.length ? `<div class="act-card glass-panel">
        <div class="act-card-title">Részletes bontás (gyengétől erősig)</div>
        ${subHtml}
      </div>` : `<div class="act-card glass-panel">
        <p class="md-empty">Ehhez a modulhoz még nincs altéma-szintű profil-adat.</p>
      </div>`}
    `;
    document.getElementById('mdBack').addEventListener('click', () => {
      radarModule = null; renderContent();
    });
  }

  /* ── F) Analytics Detail ───────────────────────── */
  function renderAnalytics() {
    const el = document.getElementById('statsContent');
    const sessions = HanziFlowStats.getSessions();
    if (sessions.length === 0) {
      el.innerHTML = emptyState('📈', 'Még nincs elemzési adat.',
        'A fejlődési trend néhány nap gyakorlás után rajzolódik ki.');
      return;
    }
    const trend = trendData();
    const accPoints = trend.map(d => ({ label: d.date, value: d.accuracy }));
    const qPoints = trend.map(d => ({ label: d.date, value: d.questions }));
    const qMax = Math.max(10, ...trend.map(d => d.questions));

    const totalQ = sessions.reduce((a, s) => a + (s.questionCount || 0), 0);
    const totalC = sessions.reduce((a, s) => a + (s.correctCount || 0), 0);
    const totalDur = sessions.reduce((a, s) => a + (s.durationMs || 0), 0);
    const overallAcc = totalQ > 0 ? Math.round(totalC / totalQ * 100) : 0;

    // V5 P3b — SRS box-grafika (scope-agnostic; jelenleg csak 'grammar:')
    const srsPanels = SRS_SCOPES.map(sc => {
      const boxes = HanziFlowSRS.aggregateBoxes(sc.prefix);
      const total = boxes.reduce((s, n) => s + n, 0);
      if (total === 0) return '';
      return `
        <div class="act-card glass-panel">
          <div class="act-card-title">${sc.label} — SRS box-eloszlás</div>
          <div class="act-card-sub">Összesen <strong>${total}</strong> elem ütemezve · 6 ismétlési lépcső: 0 / 1 / 3 / 7 / 14 / 30 nap</div>
          ${srsBoxChart(boxes)}
        </div>
      `;
    }).filter(Boolean).join('');

    el.innerHTML = `
      <div class="an-stats">
        <div class="an-stat glass-panel"><span class="an-stat-num">${sessions.length}</span><span class="an-stat-label">összes kör</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${totalQ}</span><span class="an-stat-label">összes kérdés</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${overallAcc}%</span><span class="an-stat-label">átlagos pontosság</span></div>
        <div class="an-stat glass-panel"><span class="an-stat-num">${fmtDuration(totalDur)}</span><span class="an-stat-label">összes gyakorlás</span></div>
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Pontosság-trend — napi</div>
        ${trend.length >= 2
          ? lineSvg(accPoints, { max: 100, unit: '%' })
          : '<p class="md-empty">Legalább 2 különböző nap adata kell a trendhez — gyakorolj még!</p>'}
      </div>
      <div class="act-card glass-panel">
        <div class="act-card-title">Napi kérdés-volumen</div>
        ${trend.length >= 2
          ? lineSvg(qPoints, { max: qMax, unit: ' kérdés' })
          : '<p class="md-empty">Legalább 2 nap adata kell ehhez a grafikonhoz.</p>'}
      </div>
      ${timeOfDayCard()}
      ${srsPanels}
    `;
  }

  // V5 P3b — Ismert SRS-scope-ok listája. Jövőbeli modulok ide kerülnek.
  const SRS_SCOPES = [
    { prefix: 'lesson:', label: 'A leckék kérdései' }
    // pl. jövőbeli: { prefix: 'listening:', label: '🔊 Hallás' }
  ];

  const SRS_BOX_INFO = [
    { day: '<24 h', tone: 'fresh' },   // box 0 — új vagy bukott
    { day: '1 nap', tone: 'short' },
    { day: '3 nap', tone: 'short' },
    { day: '7 nap', tone: 'mid' },
    { day: '14 nap', tone: 'mid' },
    { day: '30 nap', tone: 'long' }
  ];

  // Vertikális bar-chart — 6 box-oszlop, magasság az ott lévő itemek számával
  // arányos. Tooltip (`title` attrib.) hover-on mutatja a következő esedékességet.
  function srsBoxChart(boxes) {
    const max = Math.max(1, ...boxes);
    const cols = boxes.map((n, i) => {
      const pct = Math.round((n / max) * 100);
      const info = SRS_BOX_INFO[i] || { day: '?', tone: 'short' };
      return `
        <div class="srs-box-col" title="Box ${i} — ${n} item · következő ismétlés: ${info.day}">
          <div class="srs-box-bar-wrap">
            <span class="srs-box-bar srs-box-tone-${info.tone}" style="height:${pct}%"></span>
          </div>
          <div class="srs-box-n">${n}</div>
          <div class="srs-box-label">Box ${i}<br/><em>${info.day}</em></div>
        </div>
      `;
    }).join('');
    return `<div class="srs-chart">${cols}</div>`;
  }

  /* ── D) Blind Spot Detector ────────────────────── */
  const MODULE_URL = { tones: 'tones.html', pinyin: 'pinyin.html', lesson: '../index.html#path' };

  // Stratégiai diagnózisok a statokból, severity-szerint rendezve
  function detectBlindSpots() {
    const sessions = HanziFlowStats.getSessions();
    const out = [];
    if (sessions.length === 0) return out;
    const now = Date.now();

    const pm = {};
    MODULE_KEYS.forEach(m => { pm[m] = { Q: 0, C: 0, n: 0, last: 0 }; });
    sessions.forEach(s => {
      const p = pm[s.module]; if (!p) return;
      p.Q += s.questionCount || 0; p.C += s.correctCount || 0; p.n++;
      if (s.ts > p.last) p.last = s.ts;
    });

    // A) nem gyakorolt / régóta nem nyitott modulok
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.n === 0) {
        out.push({ severity: 72, icon: '🚪', module: m, note: 'feltérképezés',
          title: MODULE_LABELS[m] + ' — még nem próbáltad',
          text: 'Ezt a modult még meg sem nyitottad. Egy bevezető kör megmutatja, hol állsz.' });
      } else {
        const days = Math.floor((now - p.last) / DAY_MS);
        if (days >= 7) {
          out.push({ severity: 54 + Math.min(28, days), icon: '🕸️', module: m,
            note: days + ' napja kihagyva',
            title: MODULE_LABELS[m] + ' — ' + days + ' napja nem gyakoroltad',
            text: 'Rég nem nyitottad meg ezt a modult — a tudás fakul. Egy felfrissítő kör most sokat ér.' });
        }
      }
    });

    // B) alacsony pontosságú modulok
    MODULE_KEYS.forEach(m => {
      const p = pm[m];
      if (p.Q >= 12) {
        const acc = Math.round(p.C / p.Q * 100);
        if (acc < 55) {
          out.push({ severity: 62 + (55 - acc), icon: '📉', module: m, note: 'alacsony pontosság',
            title: MODULE_LABELS[m] + ' — alacsony pontosság (' + acc + '%)',
            text: 'Itt magas a hibaarányod. Lassíts, és olvasd el a magyarázatokat — a mennyiség önmagában kevés.' });
        }
      }
    });

    // C) gyenge al-területek (profil-alapú: forma / csoport / kategória)
    MODULE_KEYS.forEach(m => {
      subBreakdowns(m).forEach(sub => {
        if (sub.kind !== 'rate') return;
        sub.rows.forEach(r => {
          if (r.attempts >= 8 && r.pct < 50) {
            out.push({ severity: 50 + Math.round((50 - r.pct) / 2), icon: '🎯',
              module: m, note: r.label,
              title: MODULE_LABELS[m] + ' · ' + r.label + ' — gyenge pont (' + r.pct + '%)',
              text: 'A(z) „' + r.label + '" területet gyakran elvéted. Érdemes célzottan ismételni.' });
          }
        });
      });
    });

    // D) domináns, ismétlődő hibatípus
    const errFreq = {};
    let errTotal = 0;
    sessions.forEach(s => (s.errorCodes || []).forEach(c => {
      errFreq[c] = (errFreq[c] || 0) + 1; errTotal++;
    }));
    if (errTotal >= 6) {
      let topCode = null, topN = 0;
      Object.keys(errFreq).forEach(c => { if (errFreq[c] > topN) { topN = errFreq[c]; topCode = c; } });
      if (topCode && topN / errTotal >= 0.35) {
        out.push({ severity: 46 + Math.round(topN / errTotal * 28), icon: '🔁',
          title: 'Ismétlődő hibatípus: ' + errorLabel(topCode),
          text: 'A hibáid nagy része ugyanaz a típus (' + topN + '× / ' + errTotal + ' hiba). ' +
                'Ez nem véletlen — egy konkrét szabályt érdemes átnézni.' });
      }
    }

    out.sort((a, b) => b.severity - a.severity);
    return out;
  }

  // „Célzott gyakorlás" — focus-hint mentése + navigáció a gyenge modulhoz
  function goPractice(moduleKey, note) {
    try {
      localStorage.setItem('hanziflow_focus_hint',
        JSON.stringify({ module: moduleKey, note: note || '', ts: Date.now() }));
    } catch (e) {}
    if (MODULE_URL[moduleKey]) location.href = MODULE_URL[moduleKey];
  }

  /* ── INIT ──────────────────────────────────────── */
  renderTabs();
  renderContent();
  // V8: tier-átlépés celebration (sakura-bloom, ha új küszöböt léptél át)
  checkReadinessTierMilestone();

  window._stats = { HanziFlowStats, computeReadiness, computeStreak, detectBlindSpots, checkReadinessTierMilestone };
}


/* ====================================================
   9c. TÓNUS-TRÉNER (pages/tones.html)
   ----------------------------------------------------
   A négy tónus felismerése. Az adat: js/data/tones.js.

   Módok:
     hear   hallás után: egy szótag szól, melyik tónussal? (a válasz a pinyin-alak)
     see    jelölés: a pinyin ékezetéből melyik tónus? (válasz után meg is szólal)
     pairs  szópárok: egy kétszótagú szó szól, melyik a két tónus?
   Jó válasznál a kör magától lép tovább; hibánál megáll, és megmutatja,
   mit választottál és mi lett volna a helyes.

   Profil ('hanziflow_tones_profile_v1'): tónusonként { attempts, correct } —
   a statisztika „Tónusonként" bontása ebből jön.
   ==================================================== */
function initTonesPage() {
  const PROFILE_KEY  = 'hanziflow_tones_profile_v1';
  const SETTINGS_KEY = 'hanziflow_tones_settings_v1';
  const TONES = HANZIFLOW_TONES;
  const SETS  = HANZIFLOW_TONE_SETS;
  const WORDS = HANZIFLOW_TONE_WORDS;
  const AUTO_ADVANCE_MS = 750;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PLAY = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const curveSvg = (n, size) => {
    const t = TONES[n - 1];
    return '<svg class="tone-curve tone-c' + n + '" width="' + (size || 40) + '" height="' + Math.round((size || 40) * 0.92) + '" viewBox="0 0 40 37" aria-hidden="true">' +
      '<path class="tone-curve-grid" d="M2 4H38M2 11H38M2 18H38M2 25H38M2 32H38"/>' +
      '<path class="tone-curve-line" d="' + t.curve + '"/></svg>';
  };

  /* ── A) Beállítások + profil ───────────────────── */
  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  const saved = loadJson(SETTINGS_KEY) || {};
  const drillSettings = {
    mode: saved.mode || 'hear',
    cardCount: saved.cardCount || 10
  };
  HanziFlowPath.apply('tones', drillSettings);
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(drillSettings)); } catch (e) {}
  }
  function loadProfile() {
    const p = loadJson(PROFILE_KEY);
    return (p && p.toneStats) ? p : { toneStats: {}, totalAttempts: 0, totalCorrect: 0, bestStreak: 0 };
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
    if (window.HanziFlowSync && HanziFlowSync.schedulePush) HanziFlowSync.schedulePush();
  }

  const run = {
    inLobby: true, cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0, results: [],
    submitted: false, roundStartTs: 0, advanceTimer: null
  };

  /* ── B) Készlet ────────────────────────────────── */
  // szótag: { id, zh, py, hu, tone, set }
  const SYLLABLES = [];
  SETS.forEach(set => set.items.forEach((it, i) => {
    if (it) SYLLABLES.push({ id: set.base + (i + 1), zh: it[0], py: it[1], hu: it[2], tone: i + 1, set: set });
  }));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // A sor: a gyengébb tónusok gyakrabban jönnek
  function weightOf(profile, tone) {
    const st = profile.toneStats[tone + '. tónus'];
    if (!st || !st.attempts) return 2;
    return st.correct / st.attempts >= 0.8 ? 1 : 3;
  }
  function buildQueue(count) {
    const profile = loadProfile();
    const pool = drillSettings.mode === 'pairs' ? WORDS : SYLLABLES;
    const keyed = pool.map(it => {
      const tones = it.tones || [it.tone];
      const w = Math.max.apply(null, tones.map(t => weightOf(profile, t)));
      return { it: it, key: Math.pow(Math.random(), 1 / w) };
    });
    keyed.sort((a, b) => b.key - a.key);
    let queue = keyed.map(k => k.it);
    while (queue.length < count) queue = queue.concat(shuffle(pool));
    return queue.slice(0, count);
  }
  // szópár-mód: a helyes minta + három másik (előbb az egyik tónusban egyezők)
  const PATTERNS = [];
  [1, 2, 3, 4].forEach(a => [1, 2, 3, 4].forEach(b => { if (!(a === 3 && b === 3)) PATTERNS.push([a, b]); }));
  function patternOptions(tones) {
    const same = p => p[0] === tones[0] && p[1] === tones[1];
    const near = shuffle(PATTERNS.filter(p => !same(p) && (p[0] === tones[0] || p[1] === tones[1])));
    const far = shuffle(PATTERNS.filter(p => !same(p) && p[0] !== tones[0] && p[1] !== tones[1]));
    return shuffle([tones].concat(near.slice(0, 2), far.slice(0, 1)));
  }
  const patternLabel = p => p[0] + '. + ' + p[1] + '. tónus';

  /* ── C) Fejléc-statisztika + tónus-tábla ───────── */
  function renderStatsBar() {
    const el = document.getElementById('tonesStatsBar');
    if (!el) return;
    const p = loadProfile();
    const acc = p.totalAttempts ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${p.totalAttempts}</span><span class="csc-label">válasz</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${acc}%</span><span class="csc-label">pontosság</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${p.bestStreak || 0} 🔥</span><span class="csc-label">legjobb sorozat</span></div>`;
  }

  function renderChart() {
    const el = document.getElementById('tonesChart');
    if (!el) return;
    const p = loadProfile();
    const ma = SETS[0].items;
    el.innerHTML = `
      <div class="tone-chart-head">
        <h2 class="tone-chart-h">A négy tónus</h2>
        <p class="tone-chart-sub">Koppints egy példára, és meghallgatod. Ugyanaz a szótag négyféle dallammal négy különböző szó.</p>
      </div>
      <div class="tone-grid">
        ${TONES.map((t, i) => {
          const st = p.toneStats[t.n + '. tónus'];
          const pct = st && st.attempts ? Math.round(st.correct / st.attempts * 100) : null;
          return `
          <div class="tone-card tone-k${t.n}">
            <div class="tone-card-top">
              ${curveSvg(t.n, 44)}
              <div class="tone-card-titles">
                <span class="tone-card-name">${t.name}</span>
                <span class="tone-card-short">${t.short}</span>
              </div>
              ${pct !== null ? `<span class="tone-card-pct">${pct}%</span>` : ''}
            </div>
            <p class="tone-card-tip">${t.tip}</p>
            <button class="tone-card-ex" type="button" data-say="${ma[i][0]}">
              <span class="tone-card-zh" lang="zh-CN">${ma[i][0]}</span>
              <span class="tone-card-py">${ma[i][1]}</span>
              <span class="tone-card-hu">${ma[i][2]}</span>
            </button>
          </div>`;
        }).join('')}
      </div>
      <p class="tone-chart-note"><strong>Semleges tónus:</strong> egyes szótagok röviden, hangsúly nélkül hangzanak, ékezet nélkül írjuk őket (pl. <span lang="zh-CN">妈妈</span> māma, <span lang="zh-CN">吗</span> ma).</p>`;
    el.querySelectorAll('[data-say]').forEach(btn => btn.addEventListener('click', () => {
      btn.classList.add('is-playing');
      setTimeout(() => btn.classList.remove('is-playing'), 1400);
      if (window.HanziFlowAudio) HanziFlowAudio.play(btn.dataset.say, { speed: 0.8 });
    }));
  }

  /* ── D) Lobbi ──────────────────────────────────── */
  function renderLobby() {
    const el = document.getElementById('tonesLobby');
    const modes = [
      { id: 'hear',  name: 'Hallás után', sub: 'egy szótag szól: melyik tónus?' },
      { id: 'see',   name: 'Jelölés',     sub: 'az ékezetből: melyik tónus?' },
      { id: 'pairs', name: 'Szópárok',    sub: 'kétszótagú szavak dallama' }
    ].map(m => `
      <button class="cj-mode-btn ${drillSettings.mode === m.id ? 'active' : ''}" data-mode="${m.id}" type="button">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>`).join('');
    const presets = [10, 20, 40].map(n => `
      <button class="ml-count-btn ${drillSettings.cardCount === n ? 'active' : ''}" data-count="${n}" type="button">${n}</button>`).join('');

    el.innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Tónusok</div>
        <h2 class="lobby-title">Mit gyakorolnál?</h2>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">Mód</div>
        <div class="cj-mode-row tones-mode-row">${modes}</div>
      </div>

      <div class="lobby-section">
        <div class="lobby-section-label">Kártyák száma</div>
        <div class="ml-count-row">
          <div class="ml-count-presets">${presets}</div>
        </div>
      </div>

      <button class="btn btn-primary ml-start" id="tonesStart" type="button">Indítás</button>`;

    el.querySelectorAll('.cj-mode-btn').forEach(btn => btn.addEventListener('click', () => {
      drillSettings.mode = btn.dataset.mode;
      el.querySelectorAll('.cj-mode-btn').forEach(b => b.classList.toggle('active', b === btn));
      saveSettings(); updateStartBtn();
    }));
    el.querySelectorAll('.ml-count-btn').forEach(btn => btn.addEventListener('click', () => {
      drillSettings.cardCount = parseInt(btn.dataset.count, 10);
      el.querySelectorAll('.ml-count-btn').forEach(b => b.classList.toggle('active', b === btn));
      saveSettings(); updateStartBtn();
    }));
    document.getElementById('tonesStart').addEventListener('click', startRound);
    updateStartBtn();
  }
  function updateStartBtn() {
    const btn = document.getElementById('tonesStart');
    if (btn) btn.textContent = 'Indítás — ' + drillSettings.cardCount + ' kártya';
  }

  /* ── E) Kör ────────────────────────────────────── */
  function startRound() {
    run.cards = buildQueue(drillSettings.cardCount).map(it => ({ item: it }));
    run.cardIdx = 0; run.score = 0; run.streak = 0; run.bestStreak = 0; run.results = [];
    run.roundStartTs = Date.now();
    run.inLobby = false;
    HanziFlowRound.begin(function () {
      return { module: 'tones', mode: drillSettings.mode, results: run.results, score: run.score, startTs: run.roundStartTs };
    });
    document.querySelector('.module-hero')?.classList.add('hidden');
    document.getElementById('tonesLobby').classList.add('hidden');
    document.getElementById('tonesChart').classList.add('hidden');
    document.getElementById('tonesRuntime').classList.remove('hidden');
    const sEl = document.getElementById('tonesSummary');
    sEl.classList.add('hidden'); sEl.innerHTML = '';
    renderCard();
  }

  function updateHeader() {
    const total = run.cards.length;
    document.getElementById('tonesScore').textContent  = run.score;
    document.getElementById('tonesStreak').textContent = `${run.streak} 🔥`;
    document.getElementById('tonesCardCount').textContent = `Kártya ${Math.min(run.cardIdx + 1, total)} / ${total}`;
    document.getElementById('tonesProgressFill').style.width = `${total ? (run.cardIdx / total) * 100 : 0}%`;
  }

  function play(text, speed, btn) {
    if (!window.HanziFlowAudio) return audioFailed();
    if (btn) { btn.classList.add('is-playing'); setTimeout(() => btn.classList.remove('is-playing'), 1600); }
    try { HanziFlowAudio.play(text, { speed: speed, onError: audioFailed }); } catch (e) { audioFailed(); }
  }
  function audioFailed() {
    const el = document.getElementById('tonesNoAudio');
    if (el) el.classList.remove('hidden');
  }

  function renderCard() {
    run.submitted = false;
    updateHeader();
    const fb = document.getElementById('tonesFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    const card = run.cards[run.cardIdx];
    const it = card.item;
    const mode = drillSettings.mode;
    let prompt = '', options = [];

    if (mode === 'hear') {
      card.options = it.set.items.map((x, i) => x ? { tone: i + 1, label: x[1] } : null).filter(Boolean);
      card.right = card.options.findIndex(o => o.tone === it.tone);
      prompt = `
        <div class="cj-prompt-eyebrow"><span class="cj-pe-group">Hallás után</span><span class="cj-pe-dot">·</span>${esc(it.set.base)}</div>
        <div class="kana-task">Melyik tónust hallod?</div>
        <div class="lq-listen">
          <button class="lq-listen-btn" id="tonesPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
          <button class="btn btn-ghost lq-listen-slow" id="tonesSlow" type="button">Lassabban</button>
        </div>`;
      options = card.options.map(o => `<span class="tone-opt-py">${esc(o.label)}</span><span class="tone-opt-n">${o.tone}. tónus</span>`);
    } else if (mode === 'see') {
      card.options = TONES.map(t => ({ tone: t.n }));
      card.right = it.tone - 1;
      prompt = `
        <div class="cj-prompt-eyebrow"><span class="cj-pe-group">Jelölés</span></div>
        <div class="tone-glyph-py">${esc(it.py)}</div>
        <div class="kana-task">Melyik tónus ez az ékezet?</div>`;
      options = TONES.map(t => `${curveSvg(t.n, 30)}<span class="tone-opt-name">${t.n}. tónus</span><span class="tone-opt-short">${t.short}</span>`);
    } else {
      card.options = patternOptions(it.tones).map(p => ({ pattern: p }));
      card.right = card.options.findIndex(o => o.pattern[0] === it.tones[0] && o.pattern[1] === it.tones[1]);
      prompt = `
        <div class="cj-prompt-eyebrow"><span class="cj-pe-group">Szópárok</span><span class="cj-pe-dot">·</span>${esc(it.hu)}</div>
        <div class="kana-task">Milyen tónusokkal szól ez a szó?</div>
        <div class="lq-listen">
          <button class="lq-listen-btn" id="tonesPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
          <button class="btn btn-ghost lq-listen-slow" id="tonesSlow" type="button">Lassabban</button>
        </div>`;
      options = card.options.map(o => `<span class="tone-opt-pair">${curveSvg(o.pattern[0], 26)}${curveSvg(o.pattern[1], 26)}</span><span class="tone-opt-name">${patternLabel(o.pattern)}</span>`);
    }

    document.getElementById('tonesCard').innerHTML = `
      <div class="cj-prompt">${prompt}
        <p class="tone-noaudio hidden" id="tonesNoAudio">A hang most nem szól. Ezt a kártyát a „Nem tudom" gombbal átugorhatod, vagy válts a Jelölés módra.</p>
      </div>
      <div class="cj-options tone-options${mode === 'see' ? ' tone-options-see' : ''}">
        ${options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}">${o}</button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;

    const say = mode === 'pairs' ? it.zh : it.zh;
    const playBtn = document.getElementById('tonesPlay');
    if (playBtn) {
      playBtn.addEventListener('click', () => play(say, 0.85, playBtn));
      document.getElementById('tonesSlow').addEventListener('click', () => play(say, 0.6, playBtn));
      play(say, 0.85, playBtn);
    }
    const buttons = document.querySelectorAll('#tonesCard .cj-option');
    const lock = () => document.querySelectorAll('#tonesCard .cj-option, #tonesCard .dont-know-btn').forEach(b => { b.disabled = true; });
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (run.submitted) return;
      const idx = parseInt(btn.dataset.idx, 10);
      const ok = idx === card.right;
      lock();
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) buttons[card.right].classList.add('reveal-correct');
      finalize(card, ok, { chosen: card.options[idx] });
    }));
    document.querySelector('#tonesCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lock();
      buttons[card.right].classList.add('reveal-correct');
      finalize(card, false, { dontKnow: true });
    });
  }

  function finalize(card, ok, info) {
    run.submitted = true;
    const it = card.item;
    if (ok) { run.score += 10; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); }
    else    { run.streak = 0; }
    run.results.push({ item: it.id || it.zh, tones: it.tones || [it.tone], correct: ok,
                       errorCode: ok ? null : (info.dontKnow ? 'dont_know' : 'wrong_tone') });
    document.getElementById('tonesScore').textContent  = run.score;
    document.getElementById('tonesStreak').textContent = `${run.streak} 🔥`;
    if (drillSettings.mode === 'see') play(it.zh, 0.85);       // a jelölés után meg is hallja
    if (ok) { run.advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS + (drillSettings.mode === 'see' ? 500 : 0)); return; }
    renderFeedback(card, info);
  }

  function renderFeedback(card, info) {
    const it = card.item;
    const fb = document.getElementById('tonesFeedback');
    const isLast = run.cardIdx + 1 >= run.cards.length;
    const word = it.tones
      ? `<strong class="pfe-zh-ok" lang="zh-CN">${esc(it.zh)}</strong> ${esc(it.pinyin)} — ${esc(it.hu)}`
      : `<strong class="pfe-zh-ok" lang="zh-CN">${esc(it.zh)}</strong> ${esc(it.py)} — ${esc(it.hu)}`;
    const rightTxt = it.tones ? patternLabel(it.tones) : it.tone + '. tónus (' + TONES[it.tone - 1].short + ')';
    let mine = '';
    if (info.chosen) {
      if (info.chosen.pattern) mine = patternLabel(info.chosen.pattern);
      else if (info.chosen.label) mine = info.chosen.label + ' — ' + info.chosen.tone + '. tónus';
      else mine = info.chosen.tone + '. tónus';
    }
    const tip = it.tones
      ? it.tones.map((t, i) => (i ? 'utána ' : 'Az első szótag ') + TONES[t - 1].short).join(', ') + '.'
      : TONES[it.tone - 1].tip;
    fb.className = 'conj-feedback ' + (info.dontKnow ? 'pr-fb-dontknow' : 'pr-fb-wrong');
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${info.dontKnow ? '💡' : '🤔'}</span>
        <span class="pr-fb-title">${info.dontKnow ? 'Ez a helyes' : 'Nézzük meg együtt'}</span>
      </div>
      <div class="pr-fb-explain">
        <div class="pfe-row pfe-correct"><span class="pfe-label">Helyes</span><span class="pfe-text">${rightTxt}<br>${word}</span></div>
        ${mine ? `<div class="pfe-row pfe-wrong"><span class="pfe-label">A te válaszod</span><span class="pfe-text">${esc(mine)}</span></div>` : ''}
        <div class="pfe-row pfe-context"><span class="pfe-label">Figyeld</span><span class="pfe-text">${tip}</span></div>
      </div>
      <div class="tone-fb-actions"><button class="btn btn-outline" id="tonesAgain" type="button">Meghallgatom újra</button></div>
      <button class="btn btn-primary cj-next" id="tonesNext" type="button">${isLast ? 'Eredmények' : 'Következő'}</button>`;
    document.getElementById('tonesAgain').addEventListener('click', () => play(it.zh, 0.7));
    document.getElementById('tonesNext').addEventListener('click', advance);
  }

  function advance() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    run.cardIdx++;
    if (run.cardIdx >= run.cards.length) showSummary();
    else renderCard();
    HanziFlowRound.scrollToRound();
  }

  /* ── F) Összesítő ──────────────────────────────── */
  function showSummary() {
    HanziFlowStats.recordSession({
      module: 'tones', mode: drillSettings.mode,
      results: run.results, score: run.score, startTs: run.roundStartTs
    });
    const p = loadProfile();
    run.results.forEach(r => {
      r.tones.forEach(t => {
        const k = t + '. tónus';
        const st = p.toneStats[k] = p.toneStats[k] || { attempts: 0, correct: 0 };
        st.attempts++; if (r.correct) st.correct++;
      });
      p.totalAttempts++; if (r.correct) p.totalCorrect++;
    });
    p.bestStreak = Math.max(p.bestStreak || 0, run.bestStreak);
    saveProfile(p);

    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    // melyik tónus ment a legrosszabbul ebben a körben
    const per = {};
    run.results.forEach(r => r.tones.forEach(t => { const x = per[t] = per[t] || [0, 0]; x[1]++; if (r.correct) x[0]++; }));
    const weak = Object.keys(per).filter(t => per[t][1] >= 2 && per[t][0] / per[t][1] < 0.6).map(Number);
    document.getElementById('tonesCard').innerHTML = '';
    const fb = document.getElementById('tonesFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('tonesProgressFill').style.width = '100%';
    const sEl = document.getElementById('tonesSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége: ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      ${weak.length ? `<p class="lq-summary-note">Ezt a tónust érdemes még hallgatni: ${weak.map(t => '<strong>' + t + '. (' + TONES[t - 1].short + ')</strong>').join(', ')}.</p>` : ''}
      <div class="kana-summary-actions">
        <button class="btn btn-primary" id="tonesRoundAgain" type="button">Még egy kör</button>
        <button class="btn btn-outline" id="tonesBack" type="button">Vissza a táblához</button>
      </div>`;
    document.getElementById('tonesRoundAgain').addEventListener('click', startRound);
    document.getElementById('tonesBack').addEventListener('click', backToLobby);
    if (pct === 100 && window.HanziFlowMotion && HanziFlowMotion.celebrate) {
      try { HanziFlowMotion.celebrate({ title: 'Hibátlan kör!', sub: `${total} / ${total}` }); } catch (e) {}
    }
  }

  function backToLobby() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    if (window.HanziFlowAudio) HanziFlowAudio.stop();
    run.inLobby = true; run.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');   // → a kör-őr elmenti a részeredményt
    document.getElementById('tonesRuntime').classList.add('hidden');
    document.getElementById('tonesLobby').classList.remove('hidden');
    document.getElementById('tonesChart').classList.remove('hidden');
    renderStatsBar(); renderChart(); updateStartBtn();
  }

  /* ── G) Init ───────────────────────────────────── */
  document.getElementById('tonesExit').addEventListener('click', () => {
    if (run.inLobby) return;
    if (!confirm('Biztosan kilépsz a körből?')) return;
    backToLobby();
  });

  renderStatsBar();
  renderLobby();
  renderChart();

  window._tones = { SYLLABLES, WORDS, buildQueue, patternOptions, drillSettings, run };
}


/* ====================================================
   9c2. PINYIN-TÁBLA (pages/pinyin.html)
   ----------------------------------------------------
   A pinyin-motorra épül (js/pinyin.js, HanziFlowPinyin).
     · Tábla: kezdőhangok × véghangok, négy csoportban (a-, i-, u-, ü-).
       Egy cellára koppintva a szótag négy tónusa jelenik meg; ha a leckékben
       van rá írásjegy, meg is szólal (a felolvasó írásjegyet kap, nem pinyint).
     · Beírás ('write'): írásjegy + jelentés → a pinyin begépelése.
     · Diktálás ('dictate'): a szó elhangzik → a pinyin begépelése.
   Gépelés közben a mező jelzi, hogy a betűk jó irányba mennek-e (checkLive),
   alatta a beírás ékezetes alakja látszik (toMarked); beküldéskor a check()
   szótagonként megmondja, mi jó: a betű, a tónus.
   A szavak a leckék szólistáiból jönnek (words[].items).
   A beírt szöveg csak textContent-tel kerül az oldalra, innerHTML-lel soha.
   Beállítás: 'hanziflow_pinyin_settings_v1' (mód, szint, tónus, kártyák száma).
   ==================================================== */
function initPinyinPage() {
  const P = window.HanziFlowPinyin;
  if (!P) return;
  const COURSE = typeof HANZIFLOW_COURSE !== 'undefined' ? HANZIFLOW_COURSE : [];
  const SETTINGS_KEY = 'hanziflow_pinyin_settings_v1';
  const AUTO_ADVANCE_MS = 1100;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PLAY = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const isHanzi = ch => { const c = ch.codePointAt(0); return c >= 0x3400 && c <= 0x9fff; };
  const marked = s => P.toMarked(s.base + (s.tone || 5));      // { base, tone } → jeles alak

  /* ── A) Beállítások ────────────────────────────── */
  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  const LEVELS = [
    { id: 'hsk1', name: 'HSK 1', sub: 'előkészítő + 1–15. lecke', from: 0, to: 15 },
    { id: 'hsk2', name: 'HSK 2', sub: '16–30. lecke', from: 16, to: 30 },
    { id: 'hsk3', name: 'HSK 3', sub: '31–50. lecke', from: 31, to: 50 },
    { id: 'all',  name: 'Mind',  sub: 'minden lecke szavai', from: 0, to: 9999 }
  ];
  const saved = loadJson(SETTINGS_KEY) || {};
  const settings = {
    mode: saved.mode === 'dictate' ? 'dictate' : 'write',
    level: LEVELS.some(l => l.id === saved.level) ? saved.level : 'hsk1',
    tones: saved.tones !== false,                 // a tónus is számít-e
    cardCount: [10, 20, 40].indexOf(saved.cardCount) >= 0 ? saved.cardCount : 10
  };
  HanziFlowPath.apply('pinyin', settings);
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  /* ── B) Adatok a leckékből ─────────────────────── */
  // '{学生|xué·sheng}{们|men}' → [{ zh: '学生', py: 'xué·sheng' }, { zh: '们', py: 'men' }]
  function tokens(markup) {
    const out = [];
    const s = String(markup || '');
    let i = s.indexOf('{');
    while (i >= 0) {
      const bar = s.indexOf('|', i), end = s.indexOf('}', i);
      if (bar > i && end > bar) {
        out.push({ zh: s.slice(i + 1, bar), py: s.slice(bar + 1, end) });
        i = s.indexOf('{', end);
      } else {
        i = s.indexOf('{', i + 1);
      }
    }
    return out;
  }
  function eachString(v, fn) {
    if (typeof v === 'string') fn(v);
    else if (Array.isArray(v)) v.forEach(x => eachString(x, fn));
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => eachString(v[k], fn));
  }

  // A gyakorlás szavai: { zh, expected, py, hu, no } — csak az olyan szavak, ahol
  // a pinyin szótagszáma = írásjegyek száma (az erhuás 玩儿 és a tulajdonnevek egy része kimarad)
  const WORDS = [];
  (function buildWords() {
    const seen = {};
    COURSE.forEach(lesson => {
      const no = parseInt(String(lesson.id).slice(1), 10) || 0;
      (lesson.words || []).forEach(group => (group.items || []).forEach(it => {
        const tk = tokens(it.zh);
        if (!tk.length) return;
        const zh = tk.map(t => t.zh).join('');
        if (!zh || seen[zh] || [...zh].some(ch => !isHanzi(ch))) return;
        const expected = tk.map(t => t.py).join(' ');
        if (P.parse(expected).length !== [...zh].length) return;
        seen[zh] = true;
        WORDS.push({ zh: zh, expected: expected, py: it.pinyin || P.toMarked(expected), hu: it.hu || '', no: no });
      }));
    });
  })();
  function poolFor(levelId) {
    const lv = LEVELS.find(l => l.id === levelId) || LEVELS[0];
    const pool = WORDS.filter(w => w.no >= lv.from && w.no <= lv.to);
    return pool.length >= 4 ? pool : WORDS;
  }

  // Szótag + tónus → egy írásjegy a leckékből, hogy a táblában meg is szólaljon: 'ma3' → '马'.
  // A felolvasó egy magányos írásjegyet az alapolvasatával mond ki, ezért minden írásjegy
  // csak a leckékben leggyakoribb olvasatához lehet példa (长 = cháng, nem zhǎng), a hangot
  // váltó 不 és 一 pedig csak alaptónusban (bù, yī). A többszótagú jelölések is számítanak
  // (觉得 jué·de → 觉 = jue2), ha a szótagszám egyezik az írásjegyekével.
  let sayIndex = null;
  function getSayIndex() {
    if (sayIndex) return sayIndex;
    const counts = {};                                     // írásjegy → { 'jue2': 12, 'jiao4': 3 }
    eachString(COURSE, str => tokens(str).forEach(t => {
      const chars = [...t.zh];
      if (!chars.length || chars.some(ch => !isHanzi(ch))) return;
      const syl = P.parse(t.py);
      if (syl.length !== chars.length) return;
      chars.forEach((ch, i) => {
        const key = syl[i].base + syl[i].tone;
        const c = counts[ch] = counts[ch] || {};
        c[key] = (c[key] || 0) + 1;
      });
    }));
    const best = {};                                       // 'jue2' → { ch, n }
    Object.keys(counts).forEach(ch => {
      const c = counts[ch];
      let top = null;
      Object.keys(c).forEach(k => { if (!top || c[k] > c[top]) top = k; });
      if (ch === '不') top = c.bu4 ? 'bu4' : null;
      if (ch === '一') top = c.yi1 ? 'yi1' : null;
      if (!top || top.slice(-1) === '0') return;           // semleges tónus: nem jó hangpélda
      if (!best[top] || c[top] > best[top].n) best[top] = { ch: ch, n: c[top] };
    });
    sayIndex = {};
    Object.keys(best).forEach(k => { sayIndex[k] = best[k].ch; });
    return sayIndex;
  }

  /* ── C) A tábla ────────────────────────────────── */
  const INITIALS = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'];
  const GROUPS = [
    { id: 'a', name: 'a-, o-, e-', finals: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'er'] },
    { id: 'i', name: 'i-',         finals: ['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong'] },
    { id: 'u', name: 'u-',         finals: ['u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ueng'] },
    { id: 'v', name: 'ü-',         finals: ['v', 've', 'van', 'vn'] }
  ];
  // kezdőhang + véghang → a leírt szótag (belső alak, ü = v).
  // Kezdőhang nélkül y / w kerül elé (yi, ya, wu, wa, yu); j, q, x után az ü-t u-nak írjuk.
  function spell(ini, fin) {
    if (!ini) {
      if (fin[0] === 'i') {
        if (fin === 'i' || fin === 'in' || fin === 'ing') return 'y' + fin;
        if (fin === 'iu') return 'you';
        return 'y' + fin.slice(1);
      }
      if (fin[0] === 'u') {
        if (fin === 'u') return 'wu';
        if (fin === 'ui') return 'wei';
        if (fin === 'un') return 'wen';
        if (fin === 'ueng') return 'weng';
        return 'w' + fin.slice(1);
      }
      if (fin[0] === 'v') return 'yu' + fin.slice(1);
      return fin;
    }
    if (fin[0] === 'v' && (ini === 'j' || ini === 'q' || ini === 'x')) return ini + 'u' + fin.slice(1);
    return ini + fin;
  }
  const chart = { group: 'a', sel: null };   // sel: { base, ini, fin }

  function renderChart() {
    const el = document.getElementById('pyChart');
    if (!el) return;
    const g = GROUPS.find(x => x.id === chart.group) || GROUPS[0];
    const tabs = GROUPS.map(x => `
      <button class="py-tab ${x.id === g.id ? 'active' : ''}" type="button" data-group="${x.id}" aria-pressed="${x.id === g.id}">${esc(x.name)}</button>`).join('');
    const head = g.finals.map(f => `<th scope="col">${esc(P.toMarked(f))}</th>`).join('');
    const rows = INITIALS.map(ini => {
      let any = false;
      const cells = g.finals.map(fin => {
        const base = spell(ini, fin);
        if (!P.isSyllable(base)) return '<td class="py-empty"></td>';
        any = true;
        const on = chart.sel && chart.sel.base === base ? ' is-selected' : '';
        return `<td><button class="py-cell${on}" type="button" data-syl="${esc(base)}" data-ini="${esc(ini)}" data-fin="${esc(fin)}">${esc(P.toMarked(base))}</button></td>`;
      }).join('');
      return any ? `<tr><th scope="row" class="py-ini">${ini ? esc(ini) : '–'}</th>${cells}</tr>` : '';
    }).join('');

    el.innerHTML = `
      <div class="tone-chart-head">
        <h2 class="tone-chart-h">A pinyin-tábla</h2>
        <p class="tone-chart-sub">Sorban a kezdőhangok, oszlopban a véghangok. Koppints egy szótagra: megmutatom a négy tónusát.</p>
      </div>
      <div class="py-tabs" role="group" aria-label="Véghang-csoport">${tabs}</div>
      <div class="py-detail" id="pyDetail"></div>
      <div class="py-table-wrap">
        <table class="py-table">
          <thead><tr><th scope="col" class="py-corner"><span class="sr-only">Kezdőhang</span></th>${head}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    el.querySelectorAll('.py-tab').forEach(btn => btn.addEventListener('click', () => {
      chart.group = btn.dataset.group;
      renderChart();
    }));
    el.querySelectorAll('.py-cell').forEach(btn => btn.addEventListener('click', () => {
      chart.sel = { base: btn.dataset.syl, ini: btn.dataset.ini, fin: btn.dataset.fin };
      el.querySelectorAll('.py-cell.is-selected').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      renderDetail(true);
    }));
    renderDetail(false);
  }

  function detailNote(sel) {
    const { base, ini, fin } = sel;
    if (fin[0] === 'v' && (ini === 'j' || ini === 'q' || ini === 'x')) return 'A j, q, x után mindig ü áll, ezért a pontjait elhagyjuk: ' + P.toMarked(base) + ' = ' + ini + P.toMarked(fin) + '.';
    if (fin[0] === 'v' && !ini) return 'Kezdőhang nélkül az ü elé y kerül, a pontjai elmaradnak: yu, yue, yuan, yun.';
    if (fin[0] === 'v') return 'Az n és az l után az ü pontjai megmaradnak (nǚ, lǜ). Gépeléskor írd v-vel: ' + base + '3.';
    if (fin === 'i' && ['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].indexOf(ini) >= 0) return 'Itt az i nem „i": a mássalhangzó zümmögő folytatása, a nyelv a helyén marad.';
    if (!ini && (fin[0] === 'i' || fin[0] === 'u')) return 'Kezdőhang nélkül az i- és u-kezdetű véghangok elé y vagy w kerül: ' + P.toMarked(base) + '.';
    if (fin === 'iu' || fin === 'ui' || fin === 'un') return 'Rövidített írás: ' + fin + ' = ' + ({ iu: 'iou', ui: 'uei', un: 'uen' }[fin]) + ' — a középső hangot halkan ejtjük.';
    return '';
  }

  function renderDetail(scroll) {
    const el = document.getElementById('pyDetail');
    if (!el) return;
    const sel = chart.sel;
    if (!sel) {
      el.innerHTML = '<p class="py-detail-hint">Válassz egy szótagot a táblából.</p>';
      return;
    }
    const say = getSayIndex();
    const tones = [1, 2, 3, 4].map(t => {
      const zh = say[sel.base + t];
      return `
        <button class="py-tone tone-k${t}" type="button" ${zh ? `data-say="${esc(zh)}"` : 'disabled'} aria-label="${esc(P.toMarked(sel.base + t))}${zh ? ', ' + esc(zh) : ', nincs hangpélda'}">
          <span class="py-tone-py">${esc(P.toMarked(sel.base + t))}</span>
          <span class="py-tone-zh" lang="zh-CN">${zh ? esc(zh) : '—'}</span>
        </button>`;
    }).join('');
    const missing = [1, 2, 3, 4].some(t => !say[sel.base + t]);
    const note = detailNote(sel);
    el.innerHTML = `
      <div class="py-detail-top">
        <span class="py-detail-syl">${esc(P.toMarked(sel.base))}</span>
        <span class="py-detail-parts">kezdőhang: <strong>${sel.ini ? esc(sel.ini) : 'nincs'}</strong> · véghang: <strong>${esc(P.toMarked(sel.fin))}</strong></span>
      </div>
      <div class="py-tones">${tones}</div>
      ${note ? `<p class="py-detail-note">${esc(note)}</p>` : ''}
      ${missing ? '<p class="py-detail-small">A „—" jelű tónushoz a leckékben még nincs írásjegy, ezért nem szól.</p>' : ''}`;
    el.querySelectorAll('[data-say]').forEach(btn => btn.addEventListener('click', () => {
      btn.classList.add('is-playing');
      setTimeout(() => btn.classList.remove('is-playing'), 1400);
      if (window.HanziFlowAudio) HanziFlowAudio.play(btn.dataset.say, { speed: 0.8 });
    }));
    if (scroll) {
      const header = document.getElementById('header');
      const top = el.getBoundingClientRect().top - (header ? header.offsetHeight : 0) - 12;
      if (top < 0 || top > window.innerHeight * 0.6) {
        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: Math.max(0, window.pageYOffset + top), behavior: calm ? 'auto' : 'smooth' });
      }
    }
  }

  function renderTips() {
    const el = document.getElementById('pyTips');
    if (!el) return;
    const tips = [
      ['zh · ch · sh · r', 'A nyelv hegye hátrahajlik a szájpadlás felé. zh ≈ kemény „dzs", ch ≈ kemény „cs" erős lehelettel, sh ≈ „s", r ≈ „zs"-szerű, gyenge hang.'],
      ['z · c · s', 'A nyelv a fogak mögött marad. z ≈ „dz", c ≈ magyar „c", de erős lehelettel, s ≈ „sz".'],
      ['j · q · x', 'A nyelv a szájpadlás közepéhez simul, az ajak kissé széthúzva. j ≈ lágy „dzs", q ≈ lágy „cs" lehelettel, x ≈ „sz" és „s" közötti hang. Csak i és ü előtt állnak.'],
      ['b · d · g — p · t · k', 'A b, d, g nem zöngés, mint a magyarban: inkább lehelet nélküli p, t, k. A p, t, k utána erős lehelettel szól — tartsd a szád elé a tenyered, és érezni fogod.'],
      ['ü', 'Mint a magyar ü. A j, q, x és y után a pontjai elmaradnak (ju, qu, xu, yu), az n és l után megmaradnak (nǚ, lǜ). Gépeléskor v-vel vagy u:-tal írd.'],
      ['zhi · chi · shi · ri · zi · ci · si', 'Az i itt nem „i": a mássalhangzó zümmögő, magánhangzószerű folytatása. A nyelv nem mozdul el.']
    ];
    el.innerHTML = `
      <div class="tone-chart-head">
        <h2 class="tone-chart-h">Figyelj ezekre</h2>
        <p class="tone-chart-sub">A magyar fülnek nehéz párok és a pinyin-írás buktatói.</p>
      </div>
      <dl class="py-tip-list">
        ${tips.map(t => `<div class="py-tip"><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join('')}
      </dl>
      <p class="tone-chart-note"><strong>Hogyan gépelj?</strong> Számmal a szótag után (ni3 hao3; a semleges tónus 5 vagy semmi), vagy ékezettel (nǐ hǎo). Az ü helyett írhatsz v-t.</p>`;
  }

  /* ── D) Fejléc-statisztika + lobbi ─────────────── */
  function renderStatsBar() {
    const el = document.getElementById('pyStatsBar');
    if (!el || !window.HanziFlowStats) return;
    const sess = HanziFlowStats.getSessions().filter(s => s.module === 'pinyin');
    const Q = sess.reduce((n, s) => n + (s.questionCount || 0), 0);
    const C = sess.reduce((n, s) => n + (s.correctCount || 0), 0);
    el.innerHTML = `
      <div class="conj-stat-chip"><span class="csc-num">${WORDS.length}</span><span class="csc-label">szó a leckékből</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${Q}</span><span class="csc-label">beírás</span></div>
      <div class="conj-stat-chip"><span class="csc-num">${Q ? Math.round(C / Q * 100) : 0}%</span><span class="csc-label">pontosság</span></div>`;
  }

  function renderLobby() {
    const el = document.getElementById('pyLobby');
    const modes = [
      { id: 'write',   name: 'Beírás',   sub: 'látod az írásjegyet: írd be a pinyint' },
      { id: 'dictate', name: 'Diktálás', sub: 'hallod a szót: írd le pinyinnel' }
    ].map(m => `
      <button class="cj-mode-btn ${settings.mode === m.id ? 'active' : ''}" data-mode="${m.id}" type="button">
        <span class="cj-m-name">${m.name}</span>
        <span class="cj-m-sub">${m.sub}</span>
      </button>`).join('');
    const levels = LEVELS.map(l => `
      <button class="cj-mode-btn ${settings.level === l.id ? 'active' : ''}" data-level="${l.id}" type="button">
        <span class="cj-m-name">${l.name}</span>
        <span class="cj-m-sub">${l.sub} · ${poolFor(l.id).length} szó</span>
      </button>`).join('');
    const tones = [
      { v: true,  name: 'Tónussal',     sub: 'a tónus is számít' },
      { v: false, name: 'Tónus nélkül', sub: 'elég, ha a betűk jók' }
    ].map(t => `
      <button class="cj-mode-btn ${settings.tones === t.v ? 'active' : ''}" data-tones="${t.v ? 1 : 0}" type="button">
        <span class="cj-m-name">${t.name}</span>
        <span class="cj-m-sub">${t.sub}</span>
      </button>`).join('');
    const presets = [10, 20, 40].map(n => `
      <button class="ml-count-btn ${settings.cardCount === n ? 'active' : ''}" data-count="${n}" type="button">${n}</button>`).join('');

    el.innerHTML = `
      <div class="lobby-header">
        <div class="lobby-eyebrow">Pinyin</div>
        <h2 class="lobby-title">Mit gyakorolnál?</h2>
      </div>
      <div class="lobby-section">
        <div class="lobby-section-label">Mód</div>
        <div class="cj-mode-row py-mode-row">${modes}</div>
      </div>
      <div class="lobby-section">
        <div class="lobby-section-label">Szavak</div>
        <div class="cj-mode-row py-level-row">${levels}</div>
      </div>
      <div class="lobby-section">
        <div class="lobby-section-label">Tónusok</div>
        <div class="cj-mode-row py-mode-row">${tones}</div>
      </div>
      <div class="lobby-section">
        <div class="lobby-section-label">Kártyák száma</div>
        <div class="ml-count-row"><div class="ml-count-presets">${presets}</div></div>
      </div>
      <button class="btn btn-primary ml-start" id="pyStart" type="button">Indítás</button>`;

    const pick = (sel, apply) => el.querySelectorAll(sel).forEach(btn => btn.addEventListener('click', () => {
      apply(btn);
      el.querySelectorAll(sel).forEach(b => b.classList.toggle('active', b === btn));
      saveSettings(); updateStartBtn();
    }));
    pick('[data-mode]',   b => { settings.mode = b.dataset.mode; });
    pick('[data-level]',  b => { settings.level = b.dataset.level; });
    pick('[data-tones]',  b => { settings.tones = b.dataset.tones === '1'; });
    pick('[data-count]',  b => { settings.cardCount = parseInt(b.dataset.count, 10); });
    document.getElementById('pyStart').addEventListener('click', startRound);
    updateStartBtn();
  }
  function updateStartBtn() {
    const btn = document.getElementById('pyStart');
    if (btn) btn.textContent = 'Indítás — ' + settings.cardCount + ' kártya';
  }

  /* ── E) Kör ────────────────────────────────────── */
  const run = {
    inLobby: true, cards: [], cardIdx: 0,
    score: 0, streak: 0, bestStreak: 0, results: [],
    submitted: false, roundStartTs: 0, advanceTimer: null
  };

  function startRound() {
    const pool = poolFor(settings.level);
    if (!pool.length) return;
    let queue = shuffle(pool);
    while (queue.length < settings.cardCount) queue = queue.concat(shuffle(pool));
    run.cards = queue.slice(0, settings.cardCount).map(w => ({ item: w }));
    run.cardIdx = 0; run.score = 0; run.streak = 0; run.bestStreak = 0; run.results = [];
    run.roundStartTs = Date.now();
    run.inLobby = false;
    HanziFlowRound.begin(function () {
      return { module: 'pinyin', mode: settings.mode, results: run.results, score: run.score, startTs: run.roundStartTs };
    });
    document.querySelector('.module-hero')?.classList.add('hidden');
    ['pyLobby', 'pyChart', 'pyTips'].forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('pyRuntime').classList.remove('hidden');
    const sEl = document.getElementById('pySummary');
    sEl.classList.add('hidden'); sEl.innerHTML = '';
    renderCard();
  }

  function updateHeader() {
    const total = run.cards.length;
    document.getElementById('pyScore').textContent = run.score;
    document.getElementById('pyStreak').textContent = `${run.streak} 🔥`;
    document.getElementById('pyCardCount').textContent = `Kártya ${Math.min(run.cardIdx + 1, total)} / ${total}`;
    document.getElementById('pyProgressFill').style.width = `${total ? (run.cardIdx / total) * 100 : 0}%`;
  }

  function play(text, speed, btn) {
    if (!window.HanziFlowAudio) return audioFailed();
    if (btn) { btn.classList.add('is-playing'); setTimeout(() => btn.classList.remove('is-playing'), 1600); }
    try { HanziFlowAudio.play(text, { speed: speed, onError: audioFailed }); } catch (e) { audioFailed(); }
  }
  function audioFailed() {
    if (settings.mode !== 'dictate') return;               // beírásnál a hang csak ráadás
    const el = document.getElementById('pyNoAudio');
    if (el) el.classList.remove('hidden');
  }

  function renderCard() {
    run.submitted = false;
    updateHeader();
    const fb = document.getElementById('pyFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    const card = run.cards[run.cardIdx];
    const it = card.item;
    const dictate = settings.mode === 'dictate';
    const level = LEVELS.find(l => l.id === settings.level) || LEVELS[0];
    const sylCount = P.parse(it.expected).length;
    const keys = [1, 2, 3, 4].map(t => `
      <button class="py-key tone-k${t}" type="button" data-ins="${t}" aria-label="${t}. tónus">${esc(P.toMarked('a' + t))}<small>${t}</small></button>`).join('') +
      '<button class="py-key" type="button" data-ins="v" aria-label="ü (v)">ü<small>v</small></button>';

    const prompt = dictate ? `
        <div class="kana-task">Írd le pinyinnel, amit hallasz!</div>
        <div class="lq-listen">
          <button class="lq-listen-btn" id="pyPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
          <button class="btn btn-ghost lq-listen-slow" id="pySlow" type="button">Lassabban</button>
        </div>` : `
        <div class="py-zh" lang="zh-CN">${esc(it.zh)}</div>
        <div class="py-hu">${esc(it.hu)}</div>
        <div class="kana-task">Hogyan írjuk pinyinnel?</div>`;

    document.getElementById('pyCard').innerHTML = `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow"><span class="cj-pe-group">${dictate ? 'Diktálás' : 'Beírás'}</span><span class="cj-pe-dot">·</span>${esc(level.name)}<span class="cj-pe-dot">·</span>${sylCount} szótag</div>
        ${prompt}
        <p class="tone-noaudio hidden" id="pyNoAudio">A hang most nem szól. Ezt a kártyát a „Nem tudom" gombbal átugorhatod, vagy válts a Beírás módra.</p>
      </div>
      <form class="py-answer" id="pyForm" novalidate>
        <label class="sr-only" for="pyInput">A szó pinyinje</label>
        <input class="py-input" id="pyInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"
               placeholder="${dictate ? 'pl. xue2sheng' : 'pl. ni3 hao3 vagy nǐ hǎo'}" />
        <div class="py-keys" aria-label="Tónus és ü beírása">${keys}</div>
        <div class="py-preview" id="pyPreview" aria-live="polite"></div>
        <button class="btn btn-primary py-submit" type="submit">Ellenőrzés</button>
      </form>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;

    const input = document.getElementById('pyInput');
    const preview = document.getElementById('pyPreview');
    function onInput() {
      const v = input.value;
      if (!v.trim()) {
        preview.textContent = '';
        input.classList.remove('is-ok', 'is-off');
        return;
      }
      preview.textContent = P.toMarked(v);                 // csak textContent: a beírás nem HTML
      const st = P.checkLive(v, it.expected);
      input.classList.toggle('is-off', !st.ok);
      input.classList.toggle('is-ok', st.ok && st.done);
    }
    input.addEventListener('input', onInput);
    document.querySelectorAll('#pyCard .py-key').forEach(btn => btn.addEventListener('click', () => {
      if (run.submitted) return;
      const s = input.selectionStart == null ? input.value.length : input.selectionStart;
      const e = input.selectionEnd == null ? s : input.selectionEnd;
      input.setRangeText(btn.dataset.ins, s, e, 'end');
      input.focus();
      onInput();
    }));
    document.getElementById('pyForm').addEventListener('submit', ev => {
      ev.preventDefault();
      if (run.submitted) return;
      if (!input.value.trim()) { input.focus(); return; }
      submit(card, input.value);
    });
    document.querySelector('#pyCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lockCard();
      finalize(card, false, { dontKnow: true });
    });

    const playBtn = document.getElementById('pyPlay');
    if (playBtn) {
      playBtn.addEventListener('click', () => play(it.zh, 0.85, playBtn));
      document.getElementById('pySlow').addEventListener('click', () => play(it.zh, 0.6, playBtn));
      play(it.zh, 0.85, playBtn);
    }
    try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
  }

  function lockCard() {
    const input = document.getElementById('pyInput');
    if (input) { input.disabled = true; input.blur(); }
    document.querySelectorAll('#pyCard button').forEach(b => {
      if (b.id !== 'pyPlay' && b.id !== 'pySlow') b.disabled = true;
    });
  }

  function submit(card, value) {
    const res = P.check(value, card.item.expected);
    const ok = res.status === 'correct' ||
      (!settings.tones && (res.status === 'tone' || res.status === 'notone'));
    lockCard();
    const input = document.getElementById('pyInput');
    if (input) input.classList.add(ok ? 'is-right' : 'is-wrong');
    finalize(card, ok, { res: res, given: value });
  }

  function finalize(card, ok, info) {
    run.submitted = true;
    const it = card.item;
    if (ok) { run.score += 10; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); }
    else    { run.streak = 0; }
    const code = ok ? null : (info.dontKnow ? 'dont_know' : info.res.status);
    run.results.push({ item: it.zh, correct: ok, errorCode: code });
    document.getElementById('pyScore').textContent = run.score;
    document.getElementById('pyStreak').textContent = `${run.streak} 🔥`;
    play(it.zh, 0.85);                                     // a válasz után a szó meg is szól
    renderFeedback(card, ok, info);
    if (ok && info.res && info.res.status === 'correct') {
      run.advanceTimer = setTimeout(advance, AUTO_ADVANCE_MS);
    }
  }

  function renderFeedback(card, ok, info) {
    const it = card.item;
    const res = info.res;
    const fb = document.getElementById('pyFeedback');
    const isLast = run.cardIdx + 1 >= run.cards.length;
    const auto = ok && res && res.status === 'correct';

    let mark = '🤔', title = 'Nézzük meg együtt', cls = 'pr-fb-wrong';
    if (info.dontKnow) { mark = '💡'; title = 'Ez a helyes'; cls = 'pr-fb-dontknow'; }
    else if (res.status === 'correct') { mark = '✅'; title = 'Pontosan!'; cls = 'pr-fb-correct'; }
    else if (res.status === 'tone') { mark = '🎵'; title = ok ? 'Betűre jó — a tónus még nem pontos' : 'Betűre jó, de a tónus nem stimmel'; cls = ok ? 'pr-fb-correct' : 'pr-fb-dontknow'; }
    else if (res.status === 'notone') { mark = '🎵'; title = ok ? 'Betűre jó!' : 'Betűre jó — írd hozzá a tónusokat is'; cls = ok ? 'pr-fb-correct' : 'pr-fb-dontknow'; }

    // a helyes alak szótagonként: zöld = jó, borostyán = csak a tónus rossz, piros = a betűk rosszak
    const rows = info.dontKnow
      ? P.parse(it.expected).map(s => ({ expected: s, base: true, tone: true }))
      : res.syllables.filter(r => r.expected);
    const chips = rows.map(r => {
      const state = info.dontKnow ? '' : (r.base && r.tone ? ' is-ok' : r.base ? ' is-tone' : ' is-bad');
      return `<span class="py-chip${state}">${esc(marked(r.expected))}</span>`;
    }).join('');
    const toneTips = (!info.dontKnow && res.status !== 'wrong')
      ? res.syllables.filter(r => r.expected && r.base && !r.tone).map(r =>
          `${esc(marked(r.expected))}: ${r.expected.tone ? r.expected.tone + '. tónus' : 'semleges'} (nálad: ${r.given && r.given.tone ? r.given.tone + '.' : 'nincs'})`)
      : [];

    fb.className = 'conj-feedback ' + cls;
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${mark}</span>
        <span class="pr-fb-title">${title}</span>
      </div>
      <div class="pr-fb-explain">
        <div class="pfe-row pfe-correct"><span class="pfe-label">Helyes</span>
          <span class="pfe-text"><span class="py-chips">${chips}</span><br><strong lang="zh-CN">${esc(it.zh)}</strong> — ${esc(it.hu)}</span></div>
        ${info.given !== undefined && res.status !== 'correct' ? `<div class="pfe-row pfe-wrong"><span class="pfe-label">A te válaszod</span><span class="pfe-text py-mine" id="pyMine"></span></div>` : ''}
        ${toneTips.length ? `<div class="pfe-row pfe-context"><span class="pfe-label">Tónus</span><span class="pfe-text">${toneTips.join('<br>')}</span></div>` : ''}
      </div>
      <div class="tone-fb-actions"><button class="btn btn-outline" id="pyAgain" type="button">Meghallgatom újra</button></div>
      ${auto ? '' : `<button class="btn btn-primary cj-next" id="pyNext" type="button">${isLast ? 'Eredmények' : 'Következő'}</button>`}`;
    const mine = document.getElementById('pyMine');
    if (mine) mine.textContent = P.toMarked(info.given);  // a beírás: csak textContent
    document.getElementById('pyAgain').addEventListener('click', () => play(it.zh, 0.7));
    const next = document.getElementById('pyNext');
    if (next) { next.addEventListener('click', advance); try { next.focus({ preventScroll: true }); } catch (e) {} }
    fb.classList.remove('hidden');
  }

  function advance() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    run.cardIdx++;
    if (run.cardIdx >= run.cards.length) showSummary();
    else renderCard();
    HanziFlowRound.scrollToRound();
  }

  /* ── F) Összesítő ──────────────────────────────── */
  function showSummary() {
    HanziFlowStats.recordSession({
      module: 'pinyin', mode: settings.mode,
      results: run.results, score: run.score, startTs: run.roundStartTs
    });
    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const toneMiss = run.results.filter(r => r.errorCode === 'tone' || r.errorCode === 'notone').length;
    const missed = run.cards.filter((c, i) => run.results[i] && !run.results[i].correct).map(c => c.item);
    const uniq = [];
    missed.forEach(w => { if (uniq.indexOf(w) < 0) uniq.push(w); });

    document.getElementById('pyCard').innerHTML = '';
    const fb = document.getElementById('pyFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('pyProgressFill').style.width = '100%';
    const sEl = document.getElementById('pySummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : pct >= 75 ? '⚡' : pct >= 50 ? '🎯' : '🌱'}</div>
      <h3>Kör vége: ${pct}%</h3>
      <div class="summary-score">${correct} / ${total}</div>
      ${toneMiss ? `<p class="lq-summary-note">${toneMiss} szónál a betűk jók voltak, csak a tónus nem — a Tónus-tréner segít.</p>` : ''}
      ${uniq.length ? `<div class="py-missed">${uniq.slice(0, 8).map(w => `<span class="py-missed-item"><strong lang="zh-CN">${esc(w.zh)}</strong> ${esc(P.toMarked(w.expected))}</span>`).join('')}</div>` : ''}
      <div class="kana-summary-actions">
        <button class="btn btn-primary" id="pyRoundAgain" type="button">Még egy kör</button>
        <button class="btn btn-outline" id="pyBack" type="button">Vissza a táblához</button>
      </div>`;
    document.getElementById('pyRoundAgain').addEventListener('click', startRound);
    document.getElementById('pyBack').addEventListener('click', backToLobby);
    if (pct === 100 && window.HanziFlowMotion && HanziFlowMotion.celebrate) {
      try { HanziFlowMotion.celebrate({ title: 'Hibátlan kör!', sub: `${total} / ${total}` }); } catch (e) {}
    }
  }

  function backToLobby() {
    if (run.advanceTimer) { clearTimeout(run.advanceTimer); run.advanceTimer = null; }
    if (window.HanziFlowAudio) HanziFlowAudio.stop();
    run.inLobby = true; run.cards = [];
    document.querySelector('.module-hero')?.classList.remove('hidden');   // → a kör-őr elmenti a részeredményt
    document.getElementById('pyRuntime').classList.add('hidden');
    ['pyLobby', 'pyChart', 'pyTips'].forEach(id => document.getElementById(id).classList.remove('hidden'));
    renderStatsBar(); renderLobby();
  }

  /* ── G) Init ───────────────────────────────────── */
  document.getElementById('pyExit').addEventListener('click', () => {
    if (run.inLobby) return;
    if (!confirm('Biztosan kilépsz a körből?')) return;
    backToLobby();
  });

  renderStatsBar();
  renderLobby();
  renderChart();
  renderTips();

  window._pinyin = { WORDS, spell, poolFor, getSayIndex, settings, run, startRound, submit: v => submit(run.cards[run.cardIdx], v) };
}


/* ====================================================
   9d. LESSON PAGE — a tanulási út magyarázó oldala (lesson.html)
   ----------------------------------------------------
   A lecke szövege a js/data/course.js-ben van (HANZIFLOW_COURSE); az oldal
   a ?id=<lecke-id> paraméter szerint rajzolja ki:
     · fejléc: a lecke száma, címe, „a végére…" pontok
     · nyelvtani pontok: minta, magyarázat, meghallgatható példamondatok
     · „Ellenőrizd magad": rövid feleletválasztós kör a közös kör-keretben
   Az ellenőrző kör a statisztikába 'lesson' / 'check' néven kerül, és a
   tanulási út ezzel teljesíti a lecke lépését (legalább 60%).
     · további körök: hallás utáni ('listen') és olvasás ('read': a lecke
       rövid szövege kérdésekkel — course.js: reading); saját lépésük van az úton

   Kínai szöveg: a {汉字|hànzì} jelölésből a hanzi fölé pinyin kerül, a
   felolvasáshoz pedig maga az írásjegyes szöveg megy (zh-CN hang).
   ==================================================== */
function initLessonPage() {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RB = /\{([^|{}]+)\|([^|{}]+)\}/g;
  // Ha a pinyin szóközzel tagolt, és annyi tagja van, ahány írásjegy, írásjegyenként kerül fölé
  // ({你好|nǐ hǎo} → 你/nǐ 好/hǎo). Szón belül a szótaghatárt · jelöli: {学生|xué·sheng} (kiírva: xuésheng).
  // Ha a tagok száma nem egyezik, az egész szó fölé kerül.
  const rubyWord = (m, zh, py) => {
    const chars = Array.from(zh), parts = py.trim().split(/[\s·]+/);
    if (chars.length > 1 && parts.length === chars.length) return chars.map((c, i) => '<ruby>' + c + '<rt>' + parts[i] + '</rt></ruby>').join('');
    return '<ruby>' + zh + '<rt>' + py.replace(/·/g, '') + '</rt></ruby>';
  };
  const ruby = s => esc(s).replace(RB, rubyWord);       // képernyőre
  const reading = s => String(s).replace(RB, '$1').replace(/[\s　＿…]/g, '');  // felolvasásra: az írásjegyek
  const rubyHtml = s => String(s).replace(RB, rubyWord);   // HTML-es magyarázó szövegbe (body, tip)
  const hasZh = s => /[\u3400-\u9fff]/.test(s);
  // A pinyin-sor a jelölésből: {我|wǒ}{是|shì}{学生|xuésheng}。 → „Wǒ shì xuésheng." (ha a példának nincs saját pinyin mezője)
  const ZH_PUNCT = { '。': '.', '，': ',', '？': '?', '！': '!', '、': ',', '：': ':', '；': ';', '“': '"', '”': '"', '（': '(', '）': ')', '…': '…', '—': '—', '＿': '＿' };
  function autoPinyin(s) {
    const parts = [];
    String(s || '').replace(/\{([^|{}]+)\|([^|{}]+)\}|([。，？！、：；“”（）…—＿])|([^{}\s]+)/g, (m, zh, py, p, other) => {
      if (py) parts.push({ w: py.replace(/·/g, '') });
      else if (p) parts.push({ p: ZH_PUNCT[p] || p });
      else if (other && !hasZh(other)) parts.push({ w: other });
      return m;
    });
    let out = '', cap = true;
    parts.forEach(x => {
      if (x.p) { out += (x.p === '＿' || x.p === '"' || x.p === '(' ? ' ' : '') + x.p; cap = /[.?!]/.test(x.p); return; }
      const w = cap ? x.w.charAt(0).toUpperCase() + x.w.slice(1) : x.w;
      out += (out && !/["(]$/.test(out) ? ' ' : '') + w; cap = false;
    });
    return out.replace(/\s+([,.?!:;)])/g, '$1').trim();
  }
  const pyOf = e => (e && (e.pinyin || autoPinyin(e.zh))) || '';
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const PLAY = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const STOP = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>';

  const course = (typeof HANZIFLOW_COURSE !== 'undefined') ? HANZIFLOW_COURSE : [];
  let id = null;
  try { id = new URLSearchParams(window.location.search).get('id'); } catch (e) {}
  // Ismétlő mód (lesson.html?review=1): nincs lecke, a kör a korábbi leckék esedékes kérdéseiből áll.
  let isReview = false;
  try { isReview = new URLSearchParams(window.location.search).get('review') === '1'; } catch (e) {}
  const lesson = isReview
    ? { id: 'review', review: true, no: '', badge: '复', kicker: 'Ismétlés', label: 'Ismétlés', title: 'Mai ismétlés',
        lead: 'A korábbi leckék kérdései térnek vissza, egyre ritkábban: amit tudsz, az 1, 3, 7, 14, majd 30 nap múlva jön újra; amit elrontasz, az rögtön.',
        cando: [], points: [], quiz: [], ownOnly: true }
    : course.find(l => l.id === id);
  if (isReview) document.documentElement.classList.remove('lesson-steps');

  // Ismétlés-ütemezés: a leckék saját kérdései a közös ütemezőbe (HanziFlowSRS) kerülnek.
  const SRS_PREFIX = 'lesson:';
  const srsOf = new Map();                                 // kérdés → { id, lesson }
  course.forEach(l => (l.quiz || []).forEach((q, qi) => srsOf.set(q, { id: SRS_PREFIX + l.id + ':' + qi, lesson: l })));
  // jó válasz csak akkor lépteti előre, ha a kérdés már esedékes volt (egy napon belüli újrázás nem „tanulás")
  function srsMark(q, ok) {
    const src = srsOf.get(q);
    if (!src || !window.HanziFlowSRS) return;
    const st = HanziFlowSRS.getItemState(src.id);
    if (ok && st && (st.nextDueTs || 0) > Date.now()) return;
    HanziFlowSRS.recordReview(src.id, ok ? 1 : 0);
  }
  const hero = document.getElementById('lessonHero');
  const content = document.getElementById('lessonContent');
  const runtime = document.getElementById('lessonRuntime');

  if (!lesson) {
    document.documentElement.classList.remove('lesson-steps');
    hero.classList.add('hidden');
    content.innerHTML = `
      <div class="stats-empty glass-panel">
        <p>Ez a lecke még nem készült el.</p>
        <p class="stats-empty-sub">Ilyen számú lecke nincs a tanulási úton.</p>
        <a href="../index.html#path" class="btn btn-primary">Vissza a tanulási útra</a>
      </div>`;
    return;
  }

  /* ── A) Fejléc ─────────────────────────────────── */
  // A könyv leckéi számot kapnak; az előkészítő és a kiegészítő leckék saját jelet (badge) és címkét (kicker, label).
  const lessonLabel = lesson.label || (lesson.no + '. lecke');
  document.title = lessonLabel + ': ' + lesson.title + ' — HanziFlow';
  document.getElementById('lessonNo').textContent = lesson.badge || lesson.no;
  document.getElementById('lessonKicker').textContent = lesson.kicker || (lesson.book + ' · ' + lesson.no + '. lecke');
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonLead').textContent = lesson.lead;
  document.getElementById('lessonCando').innerHTML = lesson.cando.map(c => '<li>' + esc(c) + '</li>').join('');
  if (lesson.review) {
    const tag = document.querySelector('#lessonHero .badge-group');
    if (tag) tag.textContent = 'Időzített ismétlés';
  }
  if (window.HanziFlowRound && HanziFlowRound.refresh) HanziFlowRound.refresh();   // modul-név a fejlécbe

  /* ── A2) A lecke gyakorló lépései a tanulási útról ─ */
  //   A fejezet (HANZIFLOW_PATH_UNITS) többi lépése: ezekbe vezet a lecke az
  //   ellenőrzés után, hogy az átvett anyagot rögtön gyakorolni lehessen.
  const Path = window.HanziFlowPath;
  function practiceRows() {
    if (!Path || typeof HANZIFLOW_PATH_UNITS === 'undefined') return [];
    const v = Path.view();
    const mine = v.rows.find(r => r.step.module === 'lesson' && new RegExp('[?&]id=' + lesson.id + '$').test(r.step.href));
    if (!mine) return [];
    const unit = HANZIFLOW_PATH_UNITS.find(u => u.steps.indexOf(mine.step.id) >= 0);
    if (!unit) return [];
    // csak a gyakorló lépések: más modul köre, vagy ennek a leckének a saját hallás- és olvasás-lépése
    // (a fejezet többi magyarázó leckéje és azok lépései nem ide tartoznak)
    const isMine = st => new RegExp('[?&]id=' + lesson.id + '(&|$)').test(st.href);
    return unit.steps.filter(sid => sid !== mine.step.id)
      .map(sid => v.rows.find(r => r.step.id === sid))
      .filter(r => r && (r.step.module !== 'lesson' || ((r.step.mode === 'listen' || r.step.mode === 'read') && isMine(r.step))));
  }
  function practiceHtml() {
    const rows = practiceRows();
    if (!rows.length) return '';
    return `
      <section class="lp-practice glass-panel" id="lpPractice">
        <h2 class="lp-check-title">Gyakorlás</h2>
        <p class="lp-check-sub">A lecke anyaga feladatokban. Sorban érdemes haladni, de bármelyik indítható.</p>
        <ul class="lp-practice-list">
          ${rows.map(r => `
            <li>
              <a class="path-step-link"${r.step.module === 'lesson' ? ' data-round="' + esc(r.step.mode) + '"' : ''} href="${Path.stepHref(r.step, false)}">
                <span class="path-glyph" lang="zh-CN">${esc(r.step.glyph)}</span>
                <span class="path-step-body">
                  <span class="path-step-title">${esc(r.step.title)}</span>
                  <span class="path-step-desc">${esc(r.step.desc)}</span>
                </span>
                <span class="path-step-end">${r.done
                  ? '<span class="path-state path-state-done">' + (r.best !== null ? Math.round(r.best * 100) + '%' : 'Kész') + '</span>'
                  : '<span class="path-state path-state-next">Indítás</span>'}</span>
              </a>
            </li>`).join('')}
        </ul>
      </section>`;
  }

  /* ── B) Nyelvtani pontok ───────────────────────── */
  function renderLesson() {
    // meghallgatható sor (példa, párbeszéd, kifejezés): a hang a data-say-ből megy
    const sayRow = (e, extra) => `
            <li class="lp-ex${extra && extra.who ? ' lp-ex-line' : ''}">
              <button class="lp-ex-play" type="button" data-say="${esc(reading(e.zh))}" aria-label="Meghallgatom">${PLAY}</button>
              <div class="lp-ex-text">
                ${extra && extra.who ? `<div class="lp-ex-who">${esc(extra.who)}</div>` : ''}
                <div class="lp-ex-zh" lang="zh-CN">${ruby(e.zh)}</div>
                ${e.pinyin ? `<div class="lp-ex-pinyin">${esc(e.pinyin)}</div>` : ''}
                <div class="lp-ex-hu">${esc(e.hu)}</div>
                ${e.note ? `<div class="lp-ex-note">${rubyHtml(e.note)}</div>` : ''}
              </div>
            </li>`;
    const tableHtml = t => `
        <figure class="lp-table-fig">
          ${t.caption ? `<figcaption class="lp-table-cap">${rubyHtml(t.caption)}</figcaption>` : ''}
          <div class="lp-table-wrap"><table class="lp-table">
            ${t.head ? `<thead><tr>${t.head.map(h => `<th>${rubyHtml(h)}</th>`).join('')}</tr></thead>` : ''}
            <tbody>${t.rows.map(r => `<tr>${r.map((c, k) => k === 0 ? `<th scope="row">${rubyHtml(c)}</th>` : `<td>${rubyHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </figure>`;

    // Egy pont két lap: előbb a szabály (minta, magyarázat, táblák, jó tudni),
    // utána a példák (példamondatok, gyakori hibák) — így egy lap egy-másfél képernyő.
    const points = lesson.points.map((p, i) => `
      <section class="lp-point glass-panel" id="p${i + 1}">
        <div class="lp-point-head">
          <span class="lp-point-no">${i + 1}</span>
          <h2 class="lp-point-title" lang="zh-CN">${ruby(p.title)}</h2>
          <span class="lp-point-sub">${ruby(p.sub)}</span>
        </div>
        <div class="lp-pattern" lang="zh-CN">${ruby(p.pattern)}</div>
        <p class="lp-body">${rubyHtml(p.body)}</p>
        ${(p.more || []).map(m => `<p class="lp-body lp-more">${rubyHtml(m)}</p>`).join('')}
        ${(p.tables || []).map(tableHtml).join('')}
        ${p.notes && p.notes.length ? `
          <div class="lp-notes">
            <div class="lp-block-title">Jó tudni</div>
            <ul>${p.notes.map(n => `<li>${rubyHtml(n)}</li>`).join('')}</ul>
          </div>` : ''}
      </section>
      <section class="lp-point lp-point-ex glass-panel" id="p${i + 1}x">
        <div class="lp-point-head">
          <span class="lp-point-no">${i + 1}</span>
          <h2 class="lp-point-title">Példák</h2>
          <span class="lp-point-sub" lang="zh-CN">${ruby(p.title)}</span>
        </div>
        <div class="lp-pattern" lang="zh-CN">${ruby(p.pattern)}</div>
        <ul class="lp-examples">
          ${p.examples.map(e => sayRow(e)).join('')}
        </ul>
        ${p.mistakes && p.mistakes.length ? `
          <div class="lp-mistakes">
            <div class="lp-block-title">Gyakori hiba</div>
            ${p.mistakes.map(m => `
              <div class="lp-mistake">
                <div class="lp-mis-bad" lang="zh-CN"><span class="lp-mis-mark" aria-label="Hibás">✕</span><span>${ruby(m.bad)}</span></div>
                <div class="lp-mis-good" lang="zh-CN"><span class="lp-mis-mark" aria-label="Helyes">✓</span><span>${ruby(m.good)}</span></div>
                <div class="lp-mis-why">${rubyHtml(m.why)}</div>
              </div>`).join('')}
          </div>` : ''}
        ${p.tip ? `<div class="lp-tip"><strong>Figyelj:</strong> ${rubyHtml(p.tip)}</div>` : ''}
      </section>
      <section class="lp-quick glass-panel-heavy" id="q${i + 1}" data-point="${i}"></section>`).join('');

    // A lecke elején: miről szól, és egy rövid párbeszéd, amelyben a lecke nyelvtana élőben látszik
    const introHtml = lesson.intro && lesson.intro.length ? `
      <section class="lp-intro glass-panel" id="lpIntro">
        <h2 class="lp-sec-title">Miről szól ez a lecke?</h2>
        ${lesson.intro.map(t => `<p class="lp-body">${rubyHtml(t)}</p>`).join('')}
      </section>` : '';
    const dlg = lesson.dialogue;
    const dialogueHtml = dlg ? `
      <section class="lp-dialogue glass-panel" id="lpDialogue">
        <h2 class="lp-sec-title">Párbeszéd<span class="lp-sec-sub">${esc(dlg.title || '')}</span></h2>
        ${dlg.scene ? `<p class="lp-body lp-scene">${rubyHtml(dlg.scene)}</p>` : ''}
        <div class="lp-dlg-tools">
          <button class="btn btn-outline lp-dlg-play" id="lpDlgPlay" type="button" aria-pressed="false">
            <span class="lp-dlg-ico" aria-hidden="true">${PLAY}</span><span class="lp-dlg-play-text">Lejátszás végig</span>
          </button>
          <button class="lp-dlg-toggle" id="lpDlgZh" type="button" aria-pressed="false">
            <span class="lp-dlg-dot" aria-hidden="true"></span>Csak kínaiul
          </button>
        </div>
        <p class="lp-dlg-hint" id="lpDlgHint" aria-live="polite">Koppints egy sorra, ha kell az átírás és a fordítás.</p>
        <ul class="lp-examples" id="lpDlgLines">${dlg.lines.map(l => sayRow(l, { who: l.who })).join('')}</ul>
      </section>
      ${dlg.notes && dlg.notes.length ? `
      <section class="lp-dialogue lp-dialogue-notes glass-panel" id="lpDialogueNotes">
        <h2 class="lp-sec-title">A párbeszédből<span class="lp-sec-sub">amit érdemes megjegyezni</span></h2>
        <div class="lp-notes lp-notes-plain">
          <ul>${dlg.notes.map(n => `<li>${rubyHtml(n)}</li>`).join('')}</ul>
        </div>
      </section>` : ''}` : '';

    // A lecke végén: kifejezések, szavak, kulturális tudnivalók, összefoglaló
    const phrasesHtml = lesson.phrases && lesson.phrases.length ? `
      <section class="lp-phrases glass-panel" id="lpPhrases">
        <h2 class="lp-sec-title">Hasznos kifejezések</h2>
        <p class="lp-body lp-scene">Kész fordulatok: ezeket egyben érdemes megtanulni, ahogy vannak.</p>
        <ul class="lp-examples">${lesson.phrases.map(e => sayRow(e)).join('')}</ul>
      </section>` : '';
    const wordsHtml = lesson.words && lesson.words.length ? `
      <section class="lp-words glass-panel" id="lpWords">
        <h2 class="lp-sec-title">Szavak a leckéhez</h2>
        <p class="lp-body lp-scene">Koppints egy szóra, és meghallgatod.</p>
        ${lesson.words.map(g => `
          <div class="lp-word-group">
            <h3 class="lp-word-title">${ruby(g.title)}</h3>
            ${g.note ? `<p class="lp-word-note">${rubyHtml(g.note)}</p>` : ''}
            <div class="lp-word-grid">
              ${g.items.map(w => `
                <button class="lp-word" type="button" data-say="${esc(reading(w.say || w.zh))}">
                  <span class="lp-word-zh" lang="zh-CN">${esc(reading(w.zh))}</span>
                  <span class="lp-word-pinyin lp-ex-pinyin">${esc(pyOf(w))}</span>
                  <span class="lp-word-hu lp-ex-hu">${esc(w.hu)}</span>
                </button>`).join('')}
            </div>
          </div>`).join('')}
      </section>` : '';
    const cultureHtml = lesson.culture && lesson.culture.length ? `
      <section class="lp-culture glass-panel" id="lpCulture">
        <h2 class="lp-sec-title">Jó tudni Kínáról</h2>
        ${lesson.culture.map(c => `
          <div class="lp-culture-item">
            <h3 class="lp-word-title">${ruby(c.title)}</h3>
            <p class="lp-body">${rubyHtml(c.text)}</p>
          </div>`).join('')}
      </section>` : '';
    const glanceHtml = (lesson.intro || lesson.dialogue) ? `
      <section class="lp-glance glass-panel" id="lpGlance">
        <h2 class="lp-sec-title">A lecke egy pillantásra</h2>
        <ul class="lp-glance-list">
          ${lesson.points.map((p, i) => `
            <li><a href="#p${i + 1}" class="lp-glance-row lp-toc-link-plain">
              <span class="lp-glance-pattern" lang="zh-CN">${ruby(p.pattern)}</span>
              <span class="lp-glance-sub">${ruby(p.sub)}</span>
            </a></li>`).join('')}
        </ul>
      </section>` : '';

    content.innerHTML = `
      ${introHtml}
      ${dialogueHtml}
      ${points}
      ${phrasesHtml}
      ${wordsHtml}
      ${cultureHtml}
      ${glanceHtml}
      <section class="lp-check glass-panel-heavy" id="lpCheck">
        <h2 class="lp-check-title">Ellenőrizd magad</h2>
        <p class="lp-check-sub">${ROUND} kérdés a leckéből: szabályok és a példamondatok fordítása. Minden kör más; a lépéshez 60% kell.</p>
        <div class="lp-check-actions">
          <button class="btn btn-primary btn-lg" id="lqStart" type="button">${canListen || canRead ? 'Ellenőrző kör' : 'Kezdjük'}</button>
          ${canListen ? '<button class="btn btn-outline btn-lg" id="lqListen" type="button">Hallás utáni kör</button>' : ''}
          ${canRead ? '<button class="btn btn-outline btn-lg" id="lqRead" type="button">Olvasás</button>' : ''}
        </div>
        ${canListen ? '<p class="lp-check-hint">A hallás utáni körben a lecke példamondatait hallod, és ki kell választanod, mit jelentenek.</p>' : ''}
        ${canRead ? '<p class="lp-check-hint">Az olvasásban egy rövid szöveget kapsz a lecke nyelvtanával, utána kérdéseket a tartalmáról.</p>' : ''}
      </section>
      ${practiceHtml()}`;

    content.querySelectorAll('[data-say]').forEach(btn => btn.addEventListener('click', () => {
      if (!window.HanziFlowAudio) return;
      stopDialogue();                                      // egy sor meghallgatása leállítja a végigjátszást
      content.querySelectorAll('.is-playing').forEach(b => b.classList.remove('is-playing'));
      btn.classList.add('is-playing');
      const done = () => btn.classList.remove('is-playing');
      setTimeout(done, 4000);
      try { HanziFlowAudio.play(btn.dataset.say, { speed: 0.9, onError: done }); } catch (err) { done(); }
    }));
    // széles tábla: jelzés, hogy oldalra húzható
    content.querySelectorAll('.lp-table-wrap').forEach(w => {
      if (w.scrollWidth > w.clientWidth + 4) w.parentNode.classList.add('is-wide');
    });
    initDialogue();
    initSteps();
    // az összefoglaló sorai a megfelelő pont lapjára visznek
    content.querySelectorAll('.lp-glance-row').forEach(a => a.addEventListener('click', ev => {
      ev.preventDefault();
      const i = steps.laps.findIndex(l => l.kind === 'lap' && l.els[0].id === a.getAttribute('href').slice(1));
      if (i >= 0) showLap(i);
    }));
    document.getElementById('lqStart').addEventListener('click', () => startQuiz('check'));
    const listenBtn = document.getElementById('lqListen'), readBtn = document.getElementById('lqRead');
    if (listenBtn) listenBtn.addEventListener('click', () => startQuiz('listen'));
    if (readBtn) readBtn.addEventListener('click', () => startQuiz('read'));
    // a „Gyakorlás" lista hallás- és olvasás-sora helyben indítja a kört
    content.querySelectorAll('.path-step-link[data-round]').forEach(a => a.addEventListener('click', ev => {
      if (!roundAvailable(a.dataset.round)) return;
      ev.preventDefault();
      startQuiz(a.dataset.round);
    }));
    // A tanulási út hallás- vagy olvasás-lépése (…&round=listen | read): az a kör a fő gomb
    const want = wantedRound();
    const wantBtn = want === 'listen' ? listenBtn : want === 'read' ? readBtn : null;
    if (wantBtn) {
      const a = document.getElementById('lqStart');
      a.classList.replace('btn-primary', 'btn-outline'); wantBtn.classList.replace('btn-outline', 'btn-primary');
      wantBtn.parentNode.insertBefore(wantBtn, a);
    }
  }

  /* ── B1) Párbeszéd: lejátszás végig, „csak kínaiul" ─ */
  //   A sorok egymás után szólalnak meg: a hang végén lép tovább, és ha a hang
  //   vége nem jelez, időre. „Csak kínaiul": az átírás és a fordítás rejtve,
  //   egy sorra koppintva az a sor megmutatja.
  const DLG_ZH_KEY = 'hanziflow_dlg_zhonly';               // eszköz-helyi beállítás
  const dlgRun = { token: 0, playing: false, timer: 0 };
  function dlgButton(on) {
    const btn = document.getElementById('lpDlgPlay');
    if (!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('is-on', on);
    btn.querySelector('.lp-dlg-play-text').textContent = on ? 'Leállítás' : 'Lejátszás végig';
    btn.querySelector('.lp-dlg-ico').innerHTML = on ? STOP : PLAY;
  }
  function stopDialogue() {
    const was = dlgRun.playing;
    dlgRun.token++; dlgRun.playing = false;
    clearTimeout(dlgRun.timer);
    if (!was) return;
    dlgButton(false);
    content.querySelectorAll('#lpDlgLines .is-current').forEach(li => li.classList.remove('is-current'));
    content.querySelectorAll('#lpDlgLines .is-playing').forEach(b => b.classList.remove('is-playing'));
  }
  function playDialogue() {
    const lines = Array.prototype.slice.call(content.querySelectorAll('#lpDlgLines .lp-ex'));
    if (!lines.length || !window.HanziFlowAudio) return;
    stopDialogue();
    const my = ++dlgRun.token;
    dlgRun.playing = true;
    dlgButton(true);
    const hint = document.getElementById('lpDlgHint');
    if (hint) { hint.textContent = 'Koppints egy sorra, ha kell az átírás és a fordítás.'; hint.classList.remove('is-alert'); }
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let silent = 0;                                        // egymás utáni néma sorok
    const step = k => {
      if (my !== dlgRun.token) return;
      lines.forEach(li => li.classList.remove('is-current'));
      if (k >= lines.length) { stopDialogue(); return; }
      const li = lines[k], b = li.querySelector('.lp-ex-play');
      li.classList.add('is-current');
      b.classList.add('is-playing');
      // a sor maradjon a lépés-sáv és az alsó gombsor között
      const r = li.getBoundingClientRect();
      if (r.top < 84 || r.bottom > window.innerHeight - 110) li.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
      let moved = false;
      const next = (wait, failed) => {
        if (moved || my !== dlgRun.token) return;
        moved = true;
        clearTimeout(dlgRun.timer);
        b.classList.remove('is-playing');
        silent = failed ? silent + 1 : 0;
        if (silent >= 2) {                                 // nincs hang: nem pörgetjük végig némán
          stopDialogue();
          if (hint) { hint.textContent = 'A hang most nem érhető el. A sorokat így is elolvashatod.'; hint.classList.add('is-alert'); }
          return;
        }
        dlgRun.timer = setTimeout(() => step(k + 1), wait);
      };
      const text = b.dataset.say;
      dlgRun.timer = setTimeout(() => next(0, false), 2600 + text.length * 320);   // ha a hang vége nem jelez
      try { HanziFlowAudio.play(text, { speed: 0.9, onEnd: () => next(450, false), onError: () => next(700, true) }); }
      catch (err) { next(700, true); }
    };
    step(0);
  }
  function initDialogue() {
    const sec = document.getElementById('lpDialogue');
    const zhBtn = document.getElementById('lpDlgZh'), playBtn = document.getElementById('lpDlgPlay');
    if (!sec || !zhBtn || !playBtn) return;
    const setJp = on => {
      sec.classList.toggle('is-zh-only', on);
      zhBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (!on) sec.querySelectorAll('.is-peek').forEach(li => li.classList.remove('is-peek'));
    };
    let on = false;
    try { on = localStorage.getItem(DLG_ZH_KEY) === '1'; } catch (e) {}
    setJp(on);
    zhBtn.addEventListener('click', () => {
      const v = !sec.classList.contains('is-zh-only');
      setJp(v);
      try { localStorage.setItem(DLG_ZH_KEY, v ? '1' : '0'); } catch (e) {}
    });
    sec.querySelectorAll('#lpDlgLines .lp-ex-text').forEach(t => t.addEventListener('click', () => {
      if (sec.classList.contains('is-zh-only')) t.parentNode.classList.toggle('is-peek');
    }));
    playBtn.addEventListener('click', () => {
      if (dlgRun.playing) { stopDialogue(); HanziFlowAudio.stop(); } else playDialogue();
    });
  }

  /* ── B2) Lépések: a lecke lapokra bontva ──────── */
  //   Egy rész = egy lap; egy nyelvtani pont két lap (szabály, aztán példák),
  //   utána egy gyors kérdés áll.
  //   Fent a lépés-sáv (✕ · folyamatosan töltődő csík · Tartalom), lent a gombsor
  //   (menü · Vissza · Következő). A menü-gomb hozza elő a fül-sávot.
  //   A stílusa: style.css LECKE-OLDAL blokk, „Lépések" rész.
  const POS_KEY = 'hanziflow_lesson_pos_v1';              // eszköz-helyi: leckénként az utolsó lap
  const root = document.documentElement;
  const steps = { laps: [], cur: 0, mains: 0 };
  const quickDone = {};                                    // pont → megválaszolta-e (erre a megnyitásra)
  const plainText = s => String(s || '').replace(RB, '$1').replace(/<[^>]+>/g, '');
  let wantRoundLap = '';                                   // a tanulási út hallás- vagy olvasás-lépése (…&round=listen | read)

  // A gyors kérdés: a lecke saját kérdései közül az, amelyik a ponthoz tartozik
  // (a kínai szöveg egyezése alapján); ha nincs ilyen, a pont egyik példamondatából készül.
  let quickMap = null;
  let quickTagged = false;                                 // a lecke kérdései meg vannak-e jelölve (point mező)
  function buildQuickMap() {
    // A kérdés `point` mezője megmondja, melyik nyelvtani ponthoz tartozik (sorszám 1-től; ha nincs,
    // a kérdés egyik ponthoz sem kötődik — pl. köszönés, kultúra). Jelöletlen leckénél a
    // szövegegyezés dönt (lent).
    quickTagged = lesson.quiz.some(q => typeof q.point === 'number');
    if (quickTagged) {
      const tagged = lesson.points.map(() => []);
      lesson.quiz.forEach(q => { if (tagged[q.point - 1]) tagged[q.point - 1].push({ q: q, score: 9 }); });
      return tagged;
    }
    const JP = /[぀-ヿ一-鿿]+/g;
    const jpRuns = s => (plainText(s).match(JP) || []);
    const pointJp = lesson.points.map(p => {
      const parts = [p.title, p.pattern, p.body, p.tip].concat(p.more || [], p.notes || []);
      p.examples.forEach(e => parts.push(e.zh));
      (p.mistakes || []).forEach(m => parts.push(m.good, m.bad));
      (p.tables || []).forEach(t => t.rows.forEach(r => r.forEach(c => parts.push(c))));
      return jpRuns(parts.join(' ')).join(' ');
    });
    const pointWords = lesson.points.map(p => plainText([p.title, p.sub, p.pattern, p.body].concat(p.more || [],
      p.examples.map(e => pyOf(e) + ' ' + e.hu), (p.tables || []).map(t => t.rows.map(r => r.join(' ')).join(' '))).join(' ')).toLowerCase());
    // a leghosszabb közös kínai szövegdarab hossza
    const common = (runs, text) => {
      let best = 0;
      runs.forEach(r => {
        for (let len = Math.min(r.length, 24); len > best && len >= 2; len--) {
          for (let i = 0; i + len <= r.length; i++) {
            if (text.indexOf(r.substr(i, len)) >= 0) { best = len; break; }
          }
        }
      });
      return best;
    };
    const map = lesson.points.map(() => []);
    lesson.quiz.forEach(q => {
      const filled = q.zh ? plainText(q.zh).replace(/＿/g, plainText(q.a)) : '';
      const runs = jpRuns([filled, q.a, q.q].join(' '));
      let bestP = -1, bestS = 0;
      lesson.points.forEach((p, pi) => {
        let s = common(runs, pointJp[pi]);
        if (s < 3 && lesson.ownOnly) {                    // az előkészítő leckénél a szavak egyezése dönt
          const words = plainText(q.q + ' ' + q.a).toLowerCase().match(/[a-záéíóöőúüűāīūēō]{4,}/g) || [];
          s = words.filter(w => pointWords[pi].indexOf(w) >= 0).length >= 2 ? 3 : 0;
        }
        if (s > bestS) { bestS = s; bestP = pi; }
      });
      if (bestP >= 0 && bestS >= 3) map[bestP].push({ q: q, score: bestS });
    });
    map.forEach(list => list.sort((a, b) => b.score - a.score));
    return map;
  }
  function quickFor(pi) {
    if (!quickMap) quickMap = buildQuickMap();
    const list = quickMap[pi];
    if (list.length) {
      // jelölt leckénél a pont bármelyik kérdése jöhet; becslésnél csak a legjobban illő három
      const top = quickTagged ? list : list.filter(x => x.score >= Math.max(3, list[0].score * 0.6)).slice(0, 3);
      return top[Math.floor(Math.random() * top.length)].q;
    }
    if (lesson.ownOnly) return null;
    const mine = shuffle(allExamples.filter(x => x.point === pi));
    for (let k = 0; k < mine.length; k++) {
      const wrong = pickOthers(mine[k], 'hu');
      if (wrong.length === 3) return { q: 'Mit jelent ez a mondat?', zh: mine[k].ex.zh, a: mine[k].ex.hu, wrong: wrong, why: 'Így ejted: ' + pyOf(mine[k].ex) };
    }
    return null;
  }
  function hasQuick(pi) {
    if (lesson.ownOnly) { if (!quickMap) quickMap = buildQuickMap(); return quickMap[pi].length > 0; }
    return lesson.points[pi].examples.length > 0 && allExamples.length >= 4;
  }
  function renderQuick(pi) {
    const sec = document.getElementById('q' + (pi + 1));
    if (!sec || sec.dataset.ready) return;
    const q = quickFor(pi);
    if (!q) { quickDone[pi] = true; sec.innerHTML = '<p class="lp-body">Ehhez a ponthoz most nincs kérdés: mehetsz tovább.</p>'; sec.dataset.ready = '1'; return; }
    const options = shuffle([q.a].concat(q.wrong));
    const long = options.some(o => reading(o).length > 9);
    sec.dataset.ready = '1';
    sec.innerHTML = `
      <div class="lp-quick-eyebrow">Gyors kérdés<span class="cj-pe-dot">·</span><span lang="zh-CN">${ruby(lesson.points[pi].title)}</span></div>
      <div class="lq-question">${ruby(q.q)}</div>
      ${q.zh ? `<div class="lq-zh" lang="zh-CN">${ruby(q.zh)}</div>` : ''}
      <div class="cj-options lq-options${long ? ' lq-options-long' : ''}">
        ${options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}">${optHtml(o)}</button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>
      <div class="lp-quick-fb hidden" aria-live="polite"></div>`;
    const buttons = sec.querySelectorAll('.cj-option');
    const right = options.indexOf(q.a);
    const done = (ok, dontKnow) => {
      srsMark(q, ok);
      if (!quickLog.length) quickStart = Date.now();
      quickLog.push({ q: (srsOf.get(q) || {}).id || lesson.id + ':quick', correct: ok, errorCode: ok ? null : (dontKnow ? 'dont_know' : 'wrong_choice') });
      sec.querySelectorAll('.cj-option, .dont-know-btn').forEach(b => { b.disabled = true; });
      if (!ok) buttons[right].classList.add('reveal-correct');
      const fb = sec.querySelector('.lp-quick-fb');
      fb.className = 'lp-quick-fb ' + (ok ? 'is-ok' : dontKnow ? 'is-reveal' : 'is-miss');
      fb.innerHTML = `<div class="lp-quick-fb-title">${ok ? 'Így van' : dontKnow ? 'Ez a helyes válasz' : 'Nézzük meg együtt'}</div>
        <div class="lp-quick-fb-why">${ruby(q.why)}</div>`;
      quickDone[pi] = true;
      updateStepBar();
      const next = document.getElementById('lsNext');
      if (next) try { next.focus({ preventScroll: true }); } catch (e) {}
    };
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (quickDone[pi]) return;
      const ok = options[parseInt(btn.dataset.idx, 10)] === q.a;
      btn.classList.add(ok ? 'correct' : 'wrong');
      done(ok, false);
    }));
    sec.querySelector('.dont-know-btn').addEventListener('click', () => { if (!quickDone[pi]) done(false, true); });
  }

  // A gyors kérdések válaszai egy rövid körként mennek a statisztikába, így a napi cél
  // a lecke olvasását is számolja. Mentés: kör indításakor és az oldal elhagyásakor.
  const quickLog = [];
  let quickStart = 0;
  function flushQuick() {
    if (!quickLog.length) return;
    const results = quickLog.splice(0, quickLog.length);
    HanziFlowStats.recordSession({ module: 'lesson', mode: 'quick', results: results,
      score: results.filter(r => r.correct).length * 10,
      startTs: Math.max(quickStart, Date.now() - results.length * 90000),   // kérdésenként legfeljebb másfél perc számít
      skipPath: true });
  }
  window.addEventListener('pagehide', flushQuick);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushQuick(); });

  function closeLayers() {
    root.classList.remove('ls-sheet-open', 'ls-nav-open');
    const a = document.getElementById('lsTocBtn'), b = document.getElementById('lsNavBtn');
    if (a) a.setAttribute('aria-expanded', 'false');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  function updateStepBar() {
    const lap = steps.laps[steps.cur];
    if (!lap) return;
    const last = steps.cur === steps.laps.length - 1;
    const pct = Math.round(((steps.cur + 1) / steps.laps.length) * 100);
    const fill = document.getElementById('lsFill'), track = document.getElementById('lsTrack');
    if (fill) fill.style.width = pct + '%';
    if (track) track.setAttribute('aria-valuenow', String(pct));
    document.getElementById('lsCount').textContent = lap.no + ' / ' + steps.mains;
    document.getElementById('lsName').innerHTML = lap.kind === 'quick' ? 'Gyors kérdés' : lap.nameHtml;
    const back = document.getElementById('lsBack'), next = document.getElementById('lsNext');
    back.classList.toggle('hidden', steps.cur === 0);
    next.textContent = steps.cur === 0 ? 'Kezdjük' : last ? (wantRoundLap === 'listen' ? 'Hallás utáni kör' : wantRoundLap === 'read' ? 'Olvasás' : 'Ellenőrző kör') : 'Következő';
    next.disabled = lap.kind === 'quick' && !quickDone[lap.point];
    document.querySelectorAll('#lsList .ls-item').forEach(b => {
      const i = parseInt(b.dataset.lap, 10);
      const here = steps.laps[steps.cur].no === steps.laps[i].no;
      b.classList.toggle('is-here', here);
      b.classList.toggle('is-seen', !here && i < steps.cur);
      if (here) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }

  function showLap(i, quiet) {
    i = Math.max(0, Math.min(steps.laps.length - 1, i));
    stopDialogue();
    if (window.HanziFlowAudio) try { HanziFlowAudio.stop(); } catch (e) {}
    closeLayers();
    steps.cur = i;
    const lap = steps.laps[i];
    steps.laps.forEach(l => l.els.forEach(el => { el.classList.add('ls-off'); el.classList.remove('ls-in'); }));
    if (lap.kind === 'quick') renderQuick(lap.point);
    lap.els.forEach(el => { el.classList.remove('ls-off'); if (!quiet) el.classList.add('ls-in'); });
    updateStepBar();
    try {
      const pos = JSON.parse(localStorage.getItem(POS_KEY) || '{}');
      pos[lesson.id] = i;
      localStorage.setItem(POS_KEY, JSON.stringify(pos));
    } catch (e) {}
    window.scrollTo(0, 0);
    // széles tábla: a jelzés csak látható lapon mérhető
    lap.els.forEach(el => el.querySelectorAll('.lp-table-wrap').forEach(w => {
      if (w.scrollWidth > w.clientWidth + 4) w.parentNode.classList.add('is-wide');
    }));
  }
  function nextLap() {
    const lap = steps.laps[steps.cur];
    if (lap.kind === 'quick' && !quickDone[lap.point]) return;
    if (steps.cur >= steps.laps.length - 1) { startQuiz(wantRoundLap || 'check'); return; }
    showLap(steps.cur + 1);
  }

  function initSteps() {
    wantRoundLap = wantedRound();
    const sec = sel => content.querySelector(sel);
    const laps = [];
    let no = 0;
    const add = (els, nameHtml, sub, glyph, extra) => {
      els = els.filter(Boolean);
      if (!els.length) return;
      no++;
      laps.push(Object.assign({ kind: 'lap', no: no, els: els, nameHtml: nameHtml, sub: sub, glyph: glyph }, extra || {}));
    };
    add([hero, sec('#lpIntro')], 'Áttekintés', 'miről szól a lecke', String(lesson.badge || lesson.no));
    add([sec('#lpDialogue')], 'Párbeszéd', lesson.dialogue ? esc(lesson.dialogue.title || '') : '', '话');
    // a párbeszéd megjegyzései külön lapon (a Tartalom-lapon a párbeszédhez tartoznak)
    const dlgNotes = sec('#lpDialogueNotes');
    if (dlgNotes) laps.push({ kind: 'part', no: no, els: [dlgNotes], nameHtml: 'Párbeszéd<span class="ls-name-of">megjegyzések</span>' });
    lesson.points.forEach((p, pi) => {
      add([sec('#p' + (pi + 1))], '<span lang="zh-CN">' + ruby(p.title) + '</span>', ruby(p.sub), String(pi + 1), { point: pi });
      // a pont második lapja: a példák (a Tartalom-lapon a ponthoz tartozik, nem külön sor)
      const ex = sec('#p' + (pi + 1) + 'x');
      if (ex) laps.push({ kind: 'part', no: no, els: [ex], point: pi, nameHtml: 'Példák<span class="ls-name-of" lang="zh-CN">' + ruby(p.title) + '</span>' });
      const q = sec('#q' + (pi + 1));
      if (q && hasQuick(pi)) laps.push({ kind: 'quick', no: no, els: [q], point: pi });
      else if (q) q.classList.add('ls-off');
    });
    add([sec('#lpPhrases')], 'Hasznos kifejezések', (lesson.phrases || []).length + ' fordulat', '句');
    add([sec('#lpWords')], 'Szavak a leckéhez', (lesson.words || []).reduce((n, g) => n + g.items.length, 0) + ' szó', '词');
    add([sec('#lpCulture')], 'Jó tudni Kínáról', (lesson.culture || []).length + ' tudnivaló', '文');
    add([sec('#lpGlance')], 'A lecke egy pillantásra', 'összefoglaló', '要');
    add([sec('#lpCheck'), sec('#lpPractice')], 'Ellenőrzés és gyakorlás', ROUND + ' kérdés, aztán feladatok', '✓');
    steps.laps = laps;
    steps.mains = no;

    // Tartalom-lap: a fő lapok listája (a gyors kérdések a pontjukhoz tartoznak)
    const list = document.getElementById('lsList');
    list.innerHTML = laps.map((l, i) => l.kind !== 'lap' ? '' : `
      <li><button class="ls-item" type="button" data-lap="${i}">
        <span class="ls-item-glyph" lang="zh-CN" aria-hidden="true">${esc(l.glyph)}</span>
        <span class="ls-item-text"><span class="ls-item-name">${l.nameHtml}</span>${l.sub ? `<span class="ls-item-sub">${l.sub}</span>` : ''}</span>
      </button></li>`).join('');
    if (list.dataset.bound) { showLap(Math.min(steps.cur, laps.length - 1), true); return; }
    list.dataset.bound = '1';
    list.addEventListener('click', e => {
      const b = e.target.closest('.ls-item');
      if (b) showLap(parseInt(b.dataset.lap, 10));
    });
    // a segítők (pinyin / tónusszín / magyar / hang) a Tartalom-lap aljára kerülnek
    const foot = document.getElementById('lsSheetFoot'), helpers = document.getElementById('helpersBar');
    if (foot && helpers) foot.insertBefore(helpers, foot.firstChild);
    document.getElementById('lsTheme').addEventListener('click', () => { if (window.HanziFlowTheme) HanziFlowTheme.toggle(); });

    document.getElementById('lsNext').addEventListener('click', nextLap);
    document.getElementById('lsBack').addEventListener('click', () => showLap(steps.cur - 1));
    const tocBtn = document.getElementById('lsTocBtn'), navBtn = document.getElementById('lsNavBtn');
    tocBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = !root.classList.contains('ls-sheet-open');
      closeLayers();
      root.classList.toggle('ls-sheet-open', open);
      tocBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { const here = list.querySelector('.is-here'); if (here) here.scrollIntoView({ block: 'nearest' }); }
    });
    navBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = !root.classList.contains('ls-nav-open');
      closeLayers();
      root.classList.toggle('ls-nav-open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.getElementById('lsScrim').addEventListener('click', closeLayers);
    document.addEventListener('click', e => {
      if (root.classList.contains('ls-nav-open') && !e.target.closest('.hf-tabbar')) closeLayers();
    });
    document.addEventListener('keydown', e => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (window.HanziFlowRound && HanziFlowRound.isActive && HanziFlowRound.isActive()) return;
      if (!content.offsetParent) return;                   // kör vagy összesítő látszik
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'Escape') { closeLayers(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextLap(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showLap(steps.cur - 1); return; }
      const lap = steps.laps[steps.cur];
      if (lap && lap.kind === 'quick' && /^[1-4]$/.test(e.key)) {
        const opts = lap.els[0].querySelectorAll('.cj-option:not(:disabled)');
        const pick = lap.els[0].querySelectorAll('.cj-option')[parseInt(e.key, 10) - 1];
        if (opts.length && pick && !pick.disabled) { e.preventDefault(); pick.click(); }
      }
    });

    // hol tartottál: a mentett lapon folytatod (a kör lapjáról elölről indul)
    let start = 0;
    try { start = parseInt((JSON.parse(localStorage.getItem(POS_KEY) || '{}'))[lesson.id], 10) || 0; } catch (e) {}
    if (start >= laps.length - 1) start = 0;
    if (wantRoundLap) start = laps.length - 1;
    showLap(start, true);
  }

  /* ── C) Ellenőrző kör ──────────────────────────── */
  const run = { inLesson: true, kind: 'check', cards: [], idx: 0, score: 0, streak: 0, results: [], submitted: false, startTs: 0 };

  // Egy kör ROUND kérdés: a lecke saját kérdéseiből OWN_PER_ROUND, a többi a
  // példamondatokból készül (kínai → magyar és magyar → kínai), így minden kör más.
  const ROUND = 10, OWN_PER_ROUND = 6;
  const allExamples = [];
  lesson.points.forEach((p, pi) => p.examples.forEach(e => allExamples.push({ ex: e, point: pi })));
  (lesson.phrases || []).forEach(e => allExamples.push({ ex: e, point: 'phrases' }));

  // elterelő válaszok: előbb ugyanabból a pontból (hasonlóbbak), aztán a lecke többi példájából
  function pickOthers(item, field) {
    const same = shuffle(allExamples.filter(x => x !== item && x.point === item.point));
    const rest = shuffle(allExamples.filter(x => x.point !== item.point));
    const out = [];
    same.concat(rest).forEach(x => {
      const v = x.ex[field];
      if (out.length < 3 && v !== item.ex[field] && out.indexOf(v) < 0) out.push(v);
    });
    return out;
  }
  function generatedQuestions(n) {
    const out = [];
    shuffle(allExamples).forEach(item => {
      if (out.length >= n) return;
      const toHu = out.length % 2 === 0;
      const wrong = pickOthers(item, toHu ? 'hu' : 'zh');
      if (wrong.length < 3) return;
      out.push(toHu
        ? { q: 'Mit jelent ez a mondat?', zh: item.ex.zh, a: item.ex.hu, wrong: wrong, why: 'Így ejted: ' + pyOf(item.ex), gen: true }
        : { q: '„' + item.ex.hu + '" Melyik a kínai mondat?', a: item.ex.zh, wrong: wrong, why: 'Így ejted: ' + pyOf(item.ex), gen: true });
    });
    return out;
  }
  function buildRound() {
    // ownOnly: a lecke csak a saját kérdéseit kapja (pl. az előkészítő leckénél,
    // ahol a tanuló még nem ismer szavakat, így a példákból készített kérdés nem volna fair)
    const own = shuffle(lesson.quiz).slice(0, lesson.ownOnly ? ROUND : OWN_PER_ROUND);
    let qs = lesson.ownOnly ? own : own.concat(generatedQuestions(ROUND - own.length));
    if (qs.length < ROUND) qs = qs.concat(shuffle(lesson.quiz).filter(q => qs.indexOf(q) < 0).slice(0, ROUND - qs.length));
    return shuffle(qs).map(q => ({ q: q, options: shuffle([q.a].concat(q.wrong)) }));
  }

  // Hallás utáni kör: a lecke példamondatai hang alapján; a válasz a magyar jelentés.
  // (Az előkészítő leckénél nincs: ott a tanuló még nem ismer szavakat.)
  const canListen = !lesson.ownOnly && allExamples.length >= 8;
  function buildListenRound() {
    return shuffle(allExamples).slice(0, ROUND).map(item => {
      const wrong = pickOthers(item, 'hu');
      const q = { listen: true, gen: true, q: 'Melyik mondatot hallod?', ex: item.ex, a: item.ex.hu, wrong: wrong,
                  why: 'Így ejted: ' + pyOf(item.ex) };
      return { q: q, options: shuffle([q.a].concat(wrong)) };
    }).filter(c => c.options.length === 4);
  }
  function playListen(card, speed, btn) {
    if (!window.HanziFlowAudio) return listenFailed();
    if (btn) { btn.classList.add('is-playing'); setTimeout(() => btn.classList.remove('is-playing'), 3500); }
    try { HanziFlowAudio.play(reading(card.q.ex.zh), { speed: speed, onError: listenFailed }); } catch (err) { listenFailed(); }
  }
  // Ha nincs hang, a mondat írásban jelenik meg: a kártya így is megválaszolható.
  function listenFailed() {
    const el = document.getElementById('lqListenText');
    if (el) el.classList.remove('hidden');
  }

  // Olvasás: a lecke rövid szövege (lesson.reading), utána kérdések a tartalmáról, a szöveg sorrendjében.
  // A szöveg minden kérdés fölött ott van; a fordítása csak az összesítőben látszik.
  const readingSet = (!lesson.review && lesson.reading && Array.isArray(lesson.reading.text) && lesson.reading.text.length &&
    Array.isArray(lesson.reading.questions) && lesson.reading.questions.length >= 3) ? lesson.reading : null;
  const canRead = !!readingSet;
  function buildReadRound() {
    if (!readingSet) return [];
    return readingSet.questions.map((src, i) => {
      const q = Object.assign({}, src, { read: true, no: i });
      return { q: q, options: shuffle([q.a].concat(q.wrong)) };
    });
  }
  // a szöveg mondatonként; a `par` jelű mondat új bekezdést kezd
  function passageHtml(set) {
    const paras = [];
    set.text.forEach(s => { if (s.par || !paras.length) paras.push([]); paras[paras.length - 1].push(s); });
    const spaced = false;
    return `
        <div class="rd-passage">
          <div class="rd-kicker">Olvasd el a szöveget</div>
          ${set.title ? '<div class="rd-title" lang="zh-CN">' + ruby(set.title) + '</div>' : ''}
          <div class="rd-text" lang="zh-CN">${paras.map(p => '<p>' + p.map(s => '<span class="rd-s">' + ruby(s.zh) + '</span>').join(spaced ? ' ' : '') + '</p>').join('')}</div>
          ${set.words && set.words.length ? '<dl class="rd-words">' + set.words.map(w => '<div class="rd-word"><dt lang="zh-CN">' + ruby(w.zh) + '</dt><dd>' + esc(w.hu) + '</dd></div>').join('') + '</dl>' : ''}
        </div>`;
  }
  // az összesítőben: a szöveg mondatonként, a fordításával
  function passageTransHtml(set) {
    return `
      <div class="rd-trans">
        <div class="lp-block-title">A szöveg és a fordítása</div>
        ${set.title ? '<div class="rd-trans-title"><span lang="zh-CN">' + ruby(set.title) + '</span>' + (set.titleHu ? ' <span class="rd-trans-mean">' + esc(set.titleHu) + '</span>' : '') + '</div>' : ''}
        <ol class="rd-trans-list">
          ${set.text.map(s => '<li><span class="rd-trans-zh" lang="zh-CN">' + ruby(s.zh) + '</span><span class="rd-trans-mean">' + esc(s.hu) + '</span></li>').join('')}
        </ol>
      </div>`;
  }
  const roundAvailable = kind => kind === 'listen' ? canListen : kind === 'read' ? canRead : false;
  // a tanulási út hallás- vagy olvasás-lépése (…&round=listen | read) azt a kört kéri
  function wantedRound() {
    let r = '';
    try { r = new URLSearchParams(window.location.search).get('round') || ''; } catch (e) {}
    return roundAvailable(r) ? r : '';
  }

  // retryCards: „Hibáim újra" — az előző kör elrontott kártyái jönnek vissza (a kör fajtája marad).
  function startQuiz(kind, retryCards) {
    stopDialogue();
    flushQuick();
    const retry = Array.isArray(retryCards) && retryCards.length > 0;
    run.kind = kind === 'listen' ? 'listen' : kind === 'read' ? 'read' : kind === 'review' ? 'review' : 'check';
    run.cards = retry ? shuffle(retryCards).map(c => ({ q: c.q, options: shuffle(c.options) }))
      : run.kind === 'listen' ? buildListenRound() : run.kind === 'read' ? buildReadRound() : run.kind === 'review' ? buildReviewRound() : buildRound();
    if (!run.cards.length) return;
    run.retry = retry;
    run.idx = 0; run.score = 0; run.streak = 0; run.results = []; run.startTs = Date.now(); run.inLesson = false;
    HanziFlowRound.begin(function () {
      return { module: 'lesson', mode: run.retry ? 'retry' : run.kind, results: run.results, score: run.score, startTs: run.startTs, skipPath: run.retry };
    });
    closeLayers();
    root.classList.add('ls-round');                      // kör-nézet (a kör és az összesítője): a lépés-sáv és a gombsor rejtve
    hero.classList.add('hidden');
    content.classList.add('hidden');
    runtime.classList.remove('hidden');
    const sEl = document.getElementById('lqSummary');
    sEl.classList.add('hidden'); sEl.innerHTML = '';
    renderCard();
    HanziFlowRound.scrollToRound();
  }

  function updateBar() {
    const total = run.cards.length;
    document.getElementById('lqScore').textContent = run.score;
    document.getElementById('lqStreak').textContent = `${run.streak} 🔥`;
    document.getElementById('lqCount').textContent = `Kérdés ${Math.min(run.idx + 1, total)} / ${total}`;
    document.getElementById('lqFill').style.width = `${total ? (run.idx / total) * 100 : 0}%`;
  }

  function optHtml(text) {
    return `<span class="lq-opt"${hasZh(text) ? ' lang="zh-CN"' : ''}>${ruby(text)}</span>`;
  }

  function renderCard() {
    run.submitted = false;
    updateBar();
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    const card = run.cards[run.idx];
    const q = card.q;
    const long = card.options.some(o => reading(o).length > 9);
    document.getElementById('lqCard').innerHTML = `
      <div class="cj-prompt">
        <div class="cj-prompt-eyebrow">
          <span class="cj-pe-group">${esc(lesson.review && srsOf.get(q) ? (srsOf.get(q).lesson.label || srsOf.get(q).lesson.no + '. lecke') : lessonLabel)}</span><span class="cj-pe-dot">·</span>${q.listen ? 'Hallás' : q.read ? 'Olvasás' : lesson.review ? 'Ismétlés' : 'Ellenőrzés'}
        </div>
        ${q.read ? passageHtml(readingSet) : ''}
        <div class="lq-question">${ruby(q.q)}</div>
        ${q.zh ? `<div class="lq-zh" lang="zh-CN">${ruby(q.zh)}</div>` : ''}
        ${q.listen ? `
          <div class="lq-listen">
            <button class="lq-listen-btn" id="lqPlay" type="button" aria-label="Lejátszás">${PLAY}</button>
            <button class="btn btn-ghost lq-listen-slow" id="lqSlow" type="button">Lassabban</button>
          </div>
          <div class="lq-zh lq-listen-text hidden" id="lqListenText" lang="zh-CN">${ruby(q.ex.zh)}</div>` : ''}
      </div>
      <div class="cj-options lq-options${long ? ' lq-options-long' : ''}">
        ${card.options.map((o, i) => `<button class="cj-option" type="button" data-idx="${i}">${optHtml(o)}</button>`).join('')}
      </div>
      <button class="dont-know-btn" type="button">Nem tudom</button>`;

    if (q.listen) {
      const playBtn = document.getElementById('lqPlay');
      playBtn.addEventListener('click', () => playListen(card, 0.9, playBtn));
      document.getElementById('lqSlow').addEventListener('click', () => playListen(card, 0.65, playBtn));
      playListen(card, 0.9, playBtn);          // a kártya megjelenésekor magától megszólal
    }
    const buttons = document.querySelectorAll('#lqCard .cj-option');
    const lock = () => document.querySelectorAll('#lqCard .cj-option, #lqCard .dont-know-btn').forEach(b => { b.disabled = true; });
    const right = card.options.indexOf(q.a);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (run.submitted) return;
      const chosen = card.options[parseInt(btn.dataset.idx, 10)];
      const ok = chosen === q.a;
      lock();
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) buttons[right].classList.add('reveal-correct');
      finalize(card, ok, { chosen: chosen });
    }));
    document.querySelector('#lqCard .dont-know-btn').addEventListener('click', () => {
      if (run.submitted) return;
      lock();
      buttons[right].classList.add('reveal-correct');
      finalize(card, false, { dontKnow: true });
    });
  }

  function finalize(card, ok, info) {
    run.submitted = true;
    if (ok) { run.score += 10; run.streak++; } else { run.streak = 0; }
    if (!card.q.listen && !card.q.gen && !card.q.read) srsMark(card.q, ok);
    run.results.push({ q: lesson.review && srsOf.get(card.q) ? srsOf.get(card.q).id
                         : lesson.id + ':' + (card.q.listen ? 'listen' : card.q.read ? 'read' + card.q.no : card.q.gen ? 'gen' : lesson.quiz.indexOf(card.q)), correct: ok,
                       errorCode: ok ? null : (info.dontKnow ? 'dont_know' : 'wrong_choice') });
    document.getElementById('lqScore').textContent = run.score;
    document.getElementById('lqStreak').textContent = `${run.streak} 🔥`;

    const q = card.q;
    const isLast = run.idx + 1 >= run.cards.length;
    const fb = document.getElementById('lqFeedback');
    fb.className = 'conj-feedback ' + (ok ? 'pr-fb-correct' : info.dontKnow ? 'pr-fb-dontknow' : 'pr-fb-wrong');
    fb.innerHTML = `
      <div class="pr-fb-header">
        <span class="pr-fb-mark">${ok ? '✅' : info.dontKnow ? '💡' : '🤔'}</span>
        <span class="pr-fb-title">${ok ? 'Így van' : info.dontKnow ? 'Ez a helyes' : 'Nézzük meg együtt'}</span>
      </div>
      <div class="pr-fb-explain">
        ${q.listen ? `<div class="pfe-row pfe-rule">
          <span class="pfe-label">Ezt hallottad</span>
          <span class="pfe-text"><strong class="pfe-zh-ok" lang="zh-CN">${ruby(q.ex.zh)}</strong></span>
        </div>` : ''}
        ${ok ? '' : `<div class="pfe-row pfe-correct">
          <span class="pfe-label">${q.listen ? 'Jelentése' : 'Helyes'}</span>
          <span class="pfe-text"><strong class="${hasZh(q.a) ? 'pfe-zh-ok' : ''}"${hasZh(q.a) ? ' lang="zh-CN"' : ''}>${ruby(q.a)}</strong></span>
        </div>`}
        ${!ok && info.chosen ? `<div class="pfe-row pfe-wrong">
          <span class="pfe-label">A te válaszod</span>
          <span class="pfe-text"${hasZh(info.chosen) ? ' lang="zh-CN"' : ''}>${ruby(info.chosen)}</span>
        </div>` : ''}
        <div class="pfe-row pfe-context">
          <span class="pfe-label">Miért?</span>
          <span class="pfe-text">${ruby(q.why)}</span>
        </div>
      </div>
      <button class="btn btn-primary cj-next" id="lqNext" type="button">${isLast ? 'Eredmény' : 'Következő'}</button>`;
    document.getElementById('lqNext').addEventListener('click', advance);
  }

  function advance() {
    run.idx++;
    if (run.idx >= run.cards.length) showSummary(); else renderCard();
    // olvasásnál a második kérdéstől a kérdéshez görgetünk (a szöveg fölötte marad)
    const sameText = run.kind === 'read' && !run.retry && run.idx > 0 && run.idx < run.cards.length;
    HanziFlowRound.scrollToRound(sameText ? document.querySelector('#lqCard .lq-question') : null);
  }

  // Összesítő. „Hibáim újra": az elrontott kérdések rövid körben térnek vissza; ez a kör a
  // statisztikába 'retry' néven megy, és a tanulási út lépését nem dönti el (skipPath) —
  // a lépéshez továbbra is egy teljes, legalább 60%-os kör kell.
  function showSummary() {
    const retry = !!run.retry;
    HanziFlowStats.recordSession({ module: 'lesson', mode: retry ? 'retry' : run.kind, results: run.results, score: run.score,
      startTs: run.startTs, skipPath: retry });
    if (run.kind === 'review') { showReviewSummary(); return; }
    const listen = run.kind === 'listen', read = run.kind === 'read';
    if (listen && window.HanziFlowAudio) HanziFlowAudio.stop();
    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    if (!retry) run.base = { passed: pct >= 60 };          // a teljes kör eredménye: ettől függ, merre visz tovább a gomb
    const passed = run.base ? run.base.passed : pct >= 60;
    const missed = run.cards.filter((c, i) => run.results[i] && !run.results[i].correct);
    run.missed = missed;
    const nextPractice = practiceRows().find(r => !r.done);
    document.getElementById('lqCard').innerHTML = '';
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('lqFill').style.width = '100%';

    // a továbbvivő gomb: sikeres teljes kör után a gyakorlás, különben egy új teljes kör
    const main = missed.length ? 'btn-outline' : 'btn-primary';
    const forward = passed
      ? (nextPractice
          ? (nextPractice.step.module === 'lesson' && roundAvailable(nextPractice.step.mode)
              ? '<button class="btn ' + main + '" id="lqGoRound" type="button">Gyakorlás: ' + esc(nextPractice.step.title) + '</button>'
              : '<a class="btn ' + main + '" href="' + Path.stepHref(nextPractice.step, false) + '">Gyakorlás: ' + esc(nextPractice.step.title) + '</a>')
          : '<a class="btn ' + main + '" href="../index.html#path">Tovább az úton</a>')
      : '<button class="btn ' + main + '" id="lqAgain" type="button">Új kör</button>';
    const title = retry
      ? (missed.length ? 'Még ' + missed.length + ' kérdés nem megy' : 'Kijavítottad a hibáidat')
      : !passed ? 'Még egy kör, és megvan' : listen ? 'Megvan a hallás utáni kör' : read ? 'Megvan az olvasás' : 'Megvan a lecke';
    const note = missed.length
      ? (passed ? 'Amit elrontottál, most rögtön átveheted újra — vagy mehetsz tovább.'
                : 'Előbb vedd át újra, amit elrontottál, aztán jöhet egy új kör: a lépéshez 60% kell.')
      : retry ? (passed ? 'Minden kérdés megvan. Mehetsz tovább.' : 'Minden kérdés megvan. Most jöhet egy új, teljes kör: a lépéshez 60% kell.')
      : nextPractice ? 'Most jöhet a gyakorlás: a lecke anyaga feladatokban.'
      : 'A lecke minden gyakorlása megvan. Mehet a következő lecke.';
    const sEl = document.getElementById('lqSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${pct === 100 ? '🏆' : passed ? '🎯' : '🌱'}</div>
      <h3>${title}</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="lq-summary-note">${note}</p>
      <div class="kana-summary-actions">
        ${missed.length ? '<button class="btn btn-primary" id="lqRetry" type="button">Hibáim újra (' + missed.length + ')</button>' : ''}
        ${forward}
        ${passed && !missed.length && !retry ? '<button class="btn btn-outline" id="lqAgain" type="button">Még egy kör</button>' : ''}
        <button class="btn btn-ghost" id="lqBack" type="button">Vissza a leckéhez</button>
      </div>
      ${read ? passageTransHtml(readingSet) : ''}`;
    document.getElementById('lqBack').addEventListener('click', backToLesson);
    const retryBtn = document.getElementById('lqRetry');
    if (retryBtn) retryBtn.addEventListener('click', () => startQuiz(run.kind, run.missed));
    const again = document.getElementById('lqAgain');
    if (again) again.addEventListener('click', () => startQuiz(run.kind));
    const goRound = document.getElementById('lqGoRound');
    if (goRound) goRound.addEventListener('click', () => startQuiz(nextPractice.step.mode));
    if (pct === 100 && !retry && window.HanziFlowMotion && HanziFlowMotion.celebrate) {
      try { HanziFlowMotion.celebrate({ title: 'Hibátlan!', sub: `${total} / ${total}` }); } catch (e) {}
    }
  }

  function backToLesson() {
    if (window.HanziFlowAudio) HanziFlowAudio.stop();
    run.inLesson = true; run.cards = [];
    root.classList.remove('ls-round');
    hero.classList.remove('hidden');          // → a kör-őr elmenti a részeredményt
    content.classList.remove('hidden');
    runtime.classList.add('hidden');
    if (lesson.review) renderReview();        // az ismétlő mód nyitólapja a friss számokkal
    window.scrollTo({ top: 0 });
  }

  document.getElementById('lqExit').addEventListener('click', () => {
    if (run.inLesson) return;
    if (!confirm('Biztosan kilépsz a körből?\n\nA megkezdett kört nem fejezed be, ' +
      'de az eddigi válaszaid (helyes/hibás) elmentődnek a statisztikába.')) return;
    backToLesson();
  });

  /* ── D) Ismétlő mód ─────────────────────────────── */
  //   Az esedékes kérdések (a legrégebben esedékes elöl); ha nincs elég, a már elvégzett
  //   leckék még nem látott kérdéseivel telik fel a kör.
  function reviewPool() {
    const now = Date.now();
    const due = [], fresh = [];
    const doneLessons = {};
    if (Path) Path.view().rows.forEach(r => {
      const m = r.done && r.step.module === 'lesson' && !r.step.mode && /[?&]id=(\w+)/.exec(r.step.href || '');
      if (m) doneLessons[m[1]] = true;
    });
    srsOf.forEach((src, q) => {
      const st = window.HanziFlowSRS ? HanziFlowSRS.getItemState(src.id) : null;
      if (st) { if ((st.nextDueTs || 0) <= now) due.push({ q: q, ts: st.nextDueTs || 0 }); }
      else if (doneLessons[src.lesson.id]) fresh.push(q);
    });
    due.sort((a, b) => a.ts - b.ts);
    return { due: due.map(x => x.q), fresh: fresh };
  }
  function buildReviewRound() {
    const pool = reviewPool();
    const qs = pool.due.slice(0, ROUND).concat(shuffle(pool.fresh)).slice(0, ROUND);
    return shuffle(qs).map(q => ({ q: q, options: shuffle([q.a].concat(q.wrong)) }));
  }
  function renderReview() {
    const pool = reviewPool();
    const info = window.HanziFlowSRS ? HanziFlowSRS.dueInfo(SRS_PREFIX) : { total: 0, due: 0, nextTs: 0 };
    const n = Math.min(ROUND, pool.due.length + pool.fresh.length);
    const days = info.nextTs ? Math.max(1, Math.ceil((info.nextTs - Date.now()) / 86400000)) : 0;
    const head = pool.due.length ? pool.due.length + ' kérdés vár'
      : n ? 'Ma nincs esedékes kérdés' : 'Még nincs mit ismételni';
    const sub = pool.due.length
      ? 'Egy kör ' + ROUND + ' kérdés, a legrégebben esedékesekkel kezdve.' + (pool.due.length > ROUND ? ' A többi a következő körben jön.' : '')
      : n ? (days ? 'A következő ' + (days <= 1 ? 'holnap' : days + ' nap múlva') + ' esedékes. ' : '') + 'Addig új kérdéseket kaphatsz az elvégzett leckékből.'
          : 'Az ismétlés az elvégzett leckék kérdéseiből áll. Előbb csinálj végig egy leckét az ellenőrző körével együtt.';
    content.innerHTML = `
      <section class="lp-check glass-panel-heavy" id="lpCheck">
        <h2 class="lp-check-title">${head}</h2>
        <p class="lp-check-sub">${sub}</p>
        <div class="rv-chips">
          <span class="rv-chip"><b>${pool.due.length}</b> esedékes</span>
          <span class="rv-chip"><b>${pool.fresh.length}</b> még nem látott</span>
          <span class="rv-chip"><b>${info.total}</b> ütemezve</span>
        </div>
        <div class="lp-check-actions">
          ${n ? '<button class="btn btn-primary btn-lg" id="lqStart" type="button">' + (pool.due.length ? 'Ismétlés indítása' : 'Új kérdések') + '</button>'
              : '<a class="btn btn-primary btn-lg" href="../index.html#path">A tanulási útra</a>'}
        </div>
      </section>`;
    const start = document.getElementById('lqStart');
    if (start) start.addEventListener('click', () => startQuiz('review'));
  }
  function showReviewSummary() {
    const total = run.results.length;
    const correct = run.results.filter(r => r.correct).length;
    const left = reviewPool().due.length;
    document.getElementById('lqCard').innerHTML = '';
    const fb = document.getElementById('lqFeedback');
    fb.classList.add('hidden'); fb.innerHTML = '';
    document.getElementById('lqFill').style.width = '100%';
    const sEl = document.getElementById('lqSummary');
    sEl.classList.remove('hidden');
    sEl.innerHTML = `
      <div class="summary-icon">${correct === total ? '🏆' : '🎯'}</div>
      <h3>${left ? 'Még ' + left + ' kérdés vár' : 'Megvan a mai ismétlés'}</h3>
      <div class="summary-score">${correct} / ${total}</div>
      <p class="lq-summary-note">${left
        ? 'Amit elrontottál, rögtön visszajön; a többi kérdés a maga idejében tér vissza.'
        : 'Amit most tudtál, az néhány nap múlva jön újra. Mehet a következő lecke.'}</p>
      <div class="kana-summary-actions">
        ${left ? '<button class="btn btn-primary" id="lqAgain" type="button">Még egy kör</button><a class="btn btn-outline" href="../index.html">Kezdőlap</a>'
               : '<a class="btn btn-primary" href="../index.html">Tovább a tanulási úton</a><button class="btn btn-ghost" id="lqBack" type="button">Vissza</button>'}
      </div>`;
    const again = document.getElementById('lqAgain');
    if (again) again.addEventListener('click', () => startQuiz('review'));
    const back = document.getElementById('lqBack');
    if (back) back.addEventListener('click', backToLesson);
    if (correct === total && total >= 5 && window.HanziFlowMotion && HanziFlowMotion.celebrate) {
      try { HanziFlowMotion.celebrate({ title: 'Hibátlan!', sub: total + ' / ' + total }); } catch (e) {}
    }
  }

  if (lesson.review) renderReview(); else renderLesson();
  window._lesson = { lesson, ruby, reading, startQuiz, run, buildRound, buildListenRound, buildReadRound, readingSet, practiceRows, steps, showLap,
    playDialogue, stopDialogue, dlgRun, flushQuick,
    quickMatches: () => (quickMap || (quickMap = buildQuickMap())).map(l => l.length) };
}


/* ====================================================
   10. PAGE DETECTOR — egy oldal-init futtatása ─────
   ----------------------------------------------------
   A switch egy függvénybe csomagolva (window.HanziFlowInitPage).
   ==================================================== */

function initCurrentPage() {
  if (document.getElementById('statsMain')) {
    initStatsPage();
  } else if (document.getElementById('tonesMain')) {
    initTonesPage();
  } else if (document.getElementById('pinyinMain')) {
    initPinyinPage();
  } else if (document.getElementById('lessonMain')) {
    initLessonPage();
  } else if (document.querySelector('.auth-card')) {
    initAuthPages();
  } else if (document.getElementById('homeMain')) {
    initLanding();
  }
  // pages/modules.html (#modulesMain): statikus kártyarács — csak a közös részek futnak.
  // modul-név a fejlécben + a kör-őr figyelője
  if (window.HanziFlowRound && HanziFlowRound.refresh) HanziFlowRound.refresh();
}

// Kezdeti init
initCurrentPage();
window.HanziFlowInitPage = initCurrentPage;
