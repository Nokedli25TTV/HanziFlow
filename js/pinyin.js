/* ====================================================
   HANZIFLOW — pinyin.js (pinyin-motor — váz)
   ----------------------------------------------------
   Tiszta függvények, DOM nélkül. A felület (beviteli mező,
   színezés) és a hanzi–pinyin párosítás (<ruby>) KÜLÖN modul
   dolga; ez a fájl csak szöveget és adatot ad vissza.

   API:
     HanziFlowPinyin.toMarked('ni3 hao3')       → 'nǐ hǎo'   (számos → jeles)
     HanziFlowPinyin.toNumbered('nǐ hǎo')       → 'ni3 hao3' (jeles → számos)
     HanziFlowPinyin.parse('ni3hao3')           → [{ base: 'ni', tone: 3 }, { base: 'hao', tone: 3 }]
     HanziFlowPinyin.segment('pingguo')         → ['ping', 'guo']
     HanziFlowPinyin.check(beírt, elvárt)       → { status, syllables }
     HanziFlowPinyin.checkLive(beírt, elvárt)   → { ok, done, typed, total }
     HanziFlowPinyin.setToneMarks({ a: [...] }) → a tónustábla kitöltése futás közben
     HanziFlowPinyin.addSyllables([...])        → a szótaglista bővítése

   Belső ábrázolás: egy szótag = { base, tone }.
     • base: tónus nélküli kisbetűs alak, az ü helyén 'v' (lv, nv, lve)
     • tone: 1–4, a semleges tónus 0 (beírva 0 vagy 5)

   🔴 KITÖLTENDŐ: a TONE_MARKS tábla és a SYLLABLES lista szándékosan
   hiányos (próbaadat). Amíg egy jeles betű hiányzik, a toMarked a
   számos alakot hagyja meg (ni3), hibát nem dob.

   Reguláris kifejezés nincs: minden karakterenkénti ciklus.
   A visszaadott szöveget a felület textContent-tel tegye ki
   (innerHTML-lel soha), mert felhasználói bevitelből is származhat.
   ==================================================== */

window.HanziFlowPinyin = (function () {
  'use strict';

  /* ── 1. Kitöltendő adatok ─────────────────────────── */

  // Magánhangzónként 5 elem: [alapbetű, 1. tónus, 2. tónus, 3. tónus, 4. tónus].
  // A null helyére kézzel kell beírni a jeles betűt. A 'v' sor az ü-é:
  // az alapbetű (0. elem) ott maga az ü, a többi az ü tónusjeles alakja.
  const TONE_MARKS = {
    a: ['a', null, null, null, null],
    e: ['e', null, null, null, null],
    i: ['i', null, null, null, null],
    o: ['o', null, null, null, null],
    u: ['u', null, null, null, null],
    v: [null, null, null, null, null]
  };

  // Érvényes pinyin-szótagok (tónus nélkül, ü = v). Próbaadat:
  // a teljes lista (kb. 410 szótag) kézzel vagy külön adatfájlból jön.
  const SYLLABLES = {};
  ['a', 'an', 'ni', 'hao', 'xi', 'xue', 'sheng', 'ping', 'guo', 'pin', 'yin',
   'bei', 'jing', 'zhong', 'wen', 'lv', 'nv', 'ma', 'shi', 'han', 'zi'
  ].forEach(function (s) { SYLLABLES[s] = true; });

  /* ── 2. Állandók ─────────────────────────────────── */

  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  const VOWELS = 'aeiouv';
  const SYL_BREAK = '·\'’-';     // szótaghatár egy szón belül (xué·sheng, xī'ān)
  const SPACES = ' \t\n\r';
  const MAX_SYL = 6;             // a leghosszabb szótag: zhuang, shuang, chuang

  // jeles betű → { key, tone } — a TONE_MARKS-ból épül
  let reverse = {};
  rebuildReverse();

  function rebuildReverse() {
    reverse = {};
    Object.keys(TONE_MARKS).forEach(function (key) {
      TONE_MARKS[key].forEach(function (ch, tone) {
        if (ch && ch !== key) reverse[ch] = { key: key, tone: tone };
      });
    });
  }

  function setToneMarks(rows) {
    Object.keys(rows || {}).forEach(function (key) {
      const row = rows[key];
      if (TONE_MARKS[key] && Array.isArray(row) && row.length === 5) TONE_MARKS[key] = row.slice();
    });
    rebuildReverse();
  }

  function addSyllables(list) {
    (list || []).forEach(function (s) {
      if (typeof s === 'string' && s) SYLLABLES[s.toLowerCase()] = true;
    });
  }

  /* ── 3. Karakterek osztályozása ──────────────────── */

  function classify(ch) {
    const low = ch.toLowerCase();
    if (LETTERS.indexOf(low) >= 0) return { kind: 'letter', key: low, tone: 0 };
    if (reverse[low]) return { kind: 'letter', key: reverse[low].key, tone: reverse[low].tone };
    if (ch >= '0' && ch <= '5') return { kind: 'digit', tone: ch === '5' ? 0 : Number(ch) };
    if (SPACES.indexOf(ch) >= 0) return { kind: 'space' };
    if (SYL_BREAK.indexOf(ch) >= 0) return { kind: 'break' };
    return { kind: 'other' };
  }

  /* ── 4. Szótagolás ───────────────────────────────── */

  // Tónus nélküli betűsor → szótagok. A leghosszabb illeszkedést próbálja
  // először, és visszalép, ha a maradék nem bontható. Ha a sor nem bontható
  // (pl. hiányzik a szótaglistából), egyetlen szótagként adja vissza.
  // Megjegyzés: a „xian" így lehet xian vagy xi + an — a listán múlik;
  // a kétértelműséget a beírt ' vagy · jel oldja fel.
  function segment(letters) {
    letters = String(letters || '');
    if (!letters) return [];
    const memo = {};

    function from(i) {
      if (i === letters.length) return [];
      if (memo[i] !== undefined) return memo[i];
      let result = null;
      for (let len = Math.min(MAX_SYL, letters.length - i); len >= 1 && !result; len--) {
        const piece = letters.substr(i, len);
        if (SYLLABLES[piece]) {
          const rest = from(i + len);
          if (rest) result = [piece].concat(rest);
        }
      }
      memo[i] = result;
      return result;
    }

    return from(0) || [letters];
  }

  /* ── 5. Elemzés ──────────────────────────────────── */

  // Szöveg → elemek listája:
  //   { syls: [{ base, tone }], cap: bool }  — egy pinyin-szó (szóköz nélküli egység)
  //   { text: ' ' }                          — minden más (szóköz, írásjel), változatlanul
  // Elfogadott alakok: számos (ni3hao3, ni3 hao3), jeles (nǐ hǎo, ha a tábla ki van
  // töltve), tónus nélküli (nihao), vegyes; ü = v vagy u: (lv3, lu:3).
  function parseText(text) {
    text = String(text || '');
    const items = [];
    let word = null;       // a készülő szó
    let chunk = [];        // a készülő betűsor: [{ key, tone }]

    function flushChunk(digitTone) {
      if (!chunk.length) return;
      const letters = chunk.map(function (c) { return c.key; }).join('');
      const parts = segment(letters);
      let pos = 0;
      parts.forEach(function (part, idx) {
        let tone = 0;
        for (let k = pos; k < pos + part.length; k++) {
          if (chunk[k].tone) tone = chunk[k].tone;
        }
        // a szám a betűsor utolsó szótagjára vonatkozik
        if (idx === parts.length - 1 && digitTone !== undefined) tone = digitTone;
        word.syls.push({ base: part, tone: tone });
        pos += part.length;
      });
      chunk = [];
    }

    function flushWord() {
      flushChunk();
      if (word && word.syls.length) items.push(word);
      word = null;
    }

    function pushText(ch) {
      const last = items[items.length - 1];
      if (last && last.text !== undefined) last.text += ch;
      else items.push({ text: ch });
    }

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];

      // u: → ü (v)
      if (ch === ':' && chunk.length && chunk[chunk.length - 1].key === 'u') {
        chunk[chunk.length - 1].key = 'v';
        continue;
      }

      const c = classify(ch);
      if (c.kind === 'letter') {
        if (!word) word = { syls: [], cap: ch !== ch.toLowerCase() };
        chunk.push({ key: c.key, tone: c.tone });
      } else if (c.kind === 'digit' && chunk.length) {
        flushChunk(c.tone);                     // a szám lezárja a szótagot
      } else if (c.kind === 'break' && word) {
        flushChunk();
      } else {
        flushWord();
        pushText(ch);
      }
    }
    flushWord();
    return items;
  }

  // Csak a szótagok, laposan: [{ base, tone }, …]
  function parse(text) {
    const out = [];
    parseText(text).forEach(function (item) {
      if (item.syls) item.syls.forEach(function (s) { out.push({ base: s.base, tone: s.tone }); });
    });
    return out;
  }

  /* ── 6. Tónusjel elhelyezése ─────────────────────── */

  // Melyik betű kapja a jelet? Ha van a vagy e, az; „ou"-ban az o;
  // különben az utolsó magánhangzó (liù, guǐ, nǚ). −1, ha nincs magánhangzó.
  function markIndex(base) {
    const a = base.indexOf('a');
    if (a >= 0) return a;
    const e = base.indexOf('e');
    if (e >= 0) return e;
    const ou = base.indexOf('ou');
    if (ou >= 0) return ou;
    for (let i = base.length - 1; i >= 0; i--) {
      if (VOWELS.indexOf(base[i]) >= 0) return i;
    }
    return -1;
  }

  // { base, tone } → jeles alak. Ha a táblából hiányzik a szükséges betű,
  // a számos alakot adja vissza (base + tone), hogy semmi ne vesszen el.
  function markSyllable(base, tone) {
    const t = tone >= 1 && tone <= 4 ? tone : 0;
    const at = t ? markIndex(base) : -1;
    let out = '';
    for (let i = 0; i < base.length; i++) {
      const ch = base[i];
      const row = TONE_MARKS[ch];
      if (!row) { out += ch; continue; }
      if (i === at) {
        if (!row[t]) return base + t;          // nincs még kitöltve
        out += row[t];
      } else {
        out += row[0] || ch;                   // tónus nélküli betű (v → ü, ha megvan)
      }
    }
    return out;
  }

  /* ── 7. Átalakítás ───────────────────────────────── */

  function rebuild(text, render) {
    return parseText(text).map(function (item) {
      if (item.text !== undefined) return item.text;
      let out = item.syls.map(render).join('');
      if (item.cap && out) out = out.charAt(0).toUpperCase() + out.slice(1);
      return out;
    }).join('');
  }

  // Számos (vagy vegyes) → jeles. A, e, o kezdetű második szótag elé
  // aposztróf kerül (xī'ān), ahogy a pinyin-helyesírás kéri.
  function toMarked(text) {
    return rebuild(text, function (s, j) {
      const apos = j > 0 && 'aeo'.indexOf(s.base[0]) >= 0 ? '\'' : '';
      return apos + markSyllable(s.base, s.tone);
    });
  }

  // Jeles (vagy vegyes) → számos. A semleges tónus 5-öt kap.
  function toNumbered(text) {
    return rebuild(text, function (s) {
      return s.base + (s.tone ? s.tone : 5);
    });
  }

  /* ── 8. Ellenőrzés ───────────────────────────────── */

  // A beírt válasz összevetése az elvárttal, szótagonként.
  //   status: 'correct' — betűre és tónusra is jó
  //           'tone'    — betűre jó, de legalább egy tónus rossz
  //           'notone'  — betűre jó, de a beírásban egyáltalán nincs tónus
  //           'wrong'   — a betűk (vagy a szótagok száma) nem egyeznek
  //   syllables: [{ expected, given, base: bool, tone: bool }] — a színezéshez
  function check(input, expected) {
    const given = parse(input);
    const want = parse(expected);
    const n = Math.max(given.length, want.length);
    const rows = [];
    let baseOk = given.length === want.length;
    let toneOk = true;
    let anyTone = false;

    for (let i = 0; i < n; i++) {
      const g = given[i] || null;
      const w = want[i] || null;
      const b = !!(g && w && g.base === w.base);
      const t = !!(g && w && g.tone === w.tone);
      if (g && g.tone) anyTone = true;
      if (!b) baseOk = false;
      if (!t) toneOk = false;
      rows.push({ expected: w, given: g, base: b, tone: t });
    }

    let status = 'wrong';
    if (baseOk && toneOk) status = 'correct';
    else if (baseOk) status = anyTone ? 'tone' : 'notone';
    return { status: status, syllables: rows };
  }

  // Élő beírás: a beírt betűk (tónus és szóköz nélkül) az elvárt
  // eleje-e? A felület ebből színezheti a mezőt gépelés közben.
  function lettersOf(text) {
    return parse(text).map(function (s) { return s.base; }).join('');
  }

  function checkLive(input, expected) {
    const typed = lettersOf(input);
    const target = lettersOf(expected);
    let ok = typed.length <= target.length;
    for (let i = 0; ok && i < typed.length; i++) {
      if (typed[i] !== target[i]) ok = false;
    }
    return { ok: ok, done: ok && typed.length === target.length, typed: typed.length, total: target.length };
  }

  return {
    toMarked: toMarked,
    toNumbered: toNumbered,
    parse: parse,
    segment: segment,
    markIndex: markIndex,
    check: check,
    checkLive: checkLive,
    setToneMarks: setToneMarks,
    addSyllables: addSyllables
  };
})();
