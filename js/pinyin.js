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
     HanziFlowPinyin.isSyllable('lv')           → true (érvényes szótag-e)
     HanziFlowPinyin.check(beírt, elvárt)       → { status, syllables }
     HanziFlowPinyin.checkLive(beírt, elvárt)   → { ok, done, typed, total }
     HanziFlowPinyin.setToneMarks({ a: [...] }) → a tónustábla kitöltése futás közben
     HanziFlowPinyin.addSyllables([...])        → a szótaglista bővítése
     HanziFlowPinyin.renderRuby(elem, hanzik, pinyinek) → <ruby>-k, csak textContent-tel

   Belső ábrázolás: egy szótag = { base, tone }.
     • base: tónus nélküli kisbetűs alak, az ü helyén 'v' (lv, nv, lve)
     • tone: 1–4, a semleges tónus 0 (beírva 0 vagy 5)

   A TONE_MARKS tábla és a SYLLABLES lista a user kitöltése. Ha egy
   jeles betű mégis hiányozna, a toMarked a számos alakot hagyja meg
   (ni3), hibát nem dob.

   Reguláris kifejezés nincs: minden karakterenkénti ciklus.
   A visszaadott szöveget a felület textContent-tel tegye ki
   (innerHTML-lel soha), mert felhasználói bevitelből is származhat —
   erre való a renderRuby() segédfüggvény (9. rész).
   ==================================================== */

window.HanziFlowPinyin = (function () {
  'use strict';

  /* ── 1. Kitöltendő adatok ─────────────────────────── */

  // Magánhangzónként 5 elem: [alapbetű, 1. tónus, 2. tónus, 3. tónus, 4. tónus].
  // A 'v' sor az ü-é: az alapbetű (0. elem) ott maga az ü.
  const TONE_MARKS = {
    a: ['a', 'ā', 'á', 'ǎ', 'à'],
    e: ['e', 'ē', 'é', 'ě', 'è'],
    i: ['i', 'ī', 'í', 'ǐ', 'ì'],
    o: ['o', 'ō', 'ó', 'ǒ', 'ò'],
    u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
    v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
  };

  // Az érvényes pinyin-szótagok (tónus nélkül, ü = v), kb. 410 darab.
  // Az r-es (erhua) alakokat — wánr, diǎnr — a segment() külön kezeli.
  const SYLLABLES = {};
  ('a,ai,an,ang,ao,ba,bai,ban,bang,bao,bei,ben,beng,bi,bian,biao,bie,bin,bing,bo,bu,' +
   'ca,cai,can,cang,cao,ce,cen,ceng,cha,chai,chan,chang,chao,che,chen,cheng,chi,chong,chou,chu,' +
   'chua,chuai,chuan,chuang,chui,chun,chuo,ci,cong,cou,cu,cuan,cui,cun,cuo,' +
   'da,dai,dan,dang,dao,de,dei,den,deng,di,dian,diao,die,ding,diu,dong,dou,du,duan,dui,dun,duo,' +
   'e,ei,en,eng,er,fa,fan,fang,fei,fen,feng,fo,fou,fu,' +
   'ga,gai,gan,gang,gao,ge,gei,gen,geng,gong,gou,gu,gua,guai,guan,guang,gui,gun,guo,' +
   'ha,hai,han,hang,hao,he,hei,hen,heng,hong,hou,hu,hua,huai,huan,huang,hui,hun,huo,' +
   'ji,jia,jian,jiang,jiao,jie,jin,jing,jiong,jiu,ju,juan,jue,jun,' +
   'ka,kai,kan,kang,kao,ke,ken,keng,kong,kou,ku,kua,kuai,kuan,kuang,kui,kun,kuo,' +
   'la,lai,lan,lang,lao,le,lei,leng,li,lia,lian,liang,liao,lie,lin,ling,liu,long,lou,lu,' +
   'luan,lun,luo,lv,lve,' +
   'ma,mai,man,mang,mao,me,mei,men,meng,mi,mian,miao,mie,min,ming,miu,mo,mou,mu,' +
   'na,nai,nan,nang,nao,ne,nei,nen,neng,ng,ni,nian,niang,niao,nie,nin,ning,niu,nong,nou,' +
   'nu,nuan,nun,nuo,nv,nve,o,ou,' +
   'pa,pai,pan,pang,pao,pei,pen,peng,pi,pian,piao,pie,pin,ping,po,pou,pu,' +
   'qi,qia,qian,qiang,qiao,qie,qin,qing,qiong,qiu,qu,quan,que,qun,' +
   'ran,rang,rao,re,ren,reng,ri,rong,rou,ru,ruan,rui,run,ruo,' +
   'sa,sai,san,sang,sao,se,sen,seng,sha,shai,shan,shang,shao,she,shei,shen,sheng,shi,shou,shu,' +
   'shua,shuai,shuan,shuang,shui,shun,shuo,si,song,sou,su,suan,sui,sun,suo,' +
   'ta,tai,tan,tang,tao,te,teng,ti,tian,tiao,tie,ting,tong,tou,tu,tuan,tui,tun,tuo,' +
   'wa,wai,wan,wang,wei,wen,weng,wo,wu,' +
   'xi,xia,xian,xiang,xiao,xie,xin,xing,xiong,xiu,xu,xuan,xue,xun,' +
   'ya,yan,yang,yao,ye,yi,yin,ying,yo,yong,you,yu,yuan,yue,yun,' +
   'za,zai,zan,zang,zao,ze,zei,zen,zeng,zha,zhai,zhan,zhang,zhao,zhe,zhei,zhen,zheng,zhi,' +
   'zhong,zhou,zhu,zhua,zhuai,zhuan,zhuang,zhui,zhun,zhuo,zi,zong,zou,zu,zuan,zui,zun,zuo'
  ).split(',').forEach(function (s) { SYLLABLES[s] = true; });

  /* ── 2. Állandók ─────────────────────────────────── */

  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  const VOWELS = 'aeiouv';
  const SYL_BREAK = '·\'’-';     // szótaghatár egy szón belül (xué·sheng, xī'ān)
  const SPACES = ' \t\n\r';
  const MAX_SYL = 7;             // a leghosszabb szótag: zhuang (6) + erhua r: zhuangr

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

  // Érvényes szótag-e (tónus nélküli alak, ü = v)? A Pinyin-tábla ebből rajzolja a cellákat.
  function isSyllable(base) {
    return !!SYLLABLES[String(base || '').toLowerCase()];
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
  // Megjegyzés: a „xian" így xian lesz (nem xi + an) — a kétértelműséget
  // a beírt ' vagy · jel oldja fel (xī'ān, Xī·ān).
  function segment(letters) {
    letters = String(letters || '');
    if (!letters) return [];
    const memo = {};

    // Érvényes-e a darab? Az erhua (diǎnr, wánr) is: szótag + r, de csak ha
    // utána nem magánhangzó jön — különben a shiren shir + en lenne, nem shi + ren.
    function valid(piece, end) {
      if (SYLLABLES[piece]) return true;
      if (piece.length < 2 || piece[piece.length - 1] !== 'r' || piece === 'er') return false;
      if (end < letters.length && VOWELS.indexOf(letters[end]) >= 0) return false;
      return !!SYLLABLES[piece.slice(0, -1)];
    }

    function from(i) {
      if (i === letters.length) return [];
      if (memo[i] !== undefined) return memo[i];
      let result = null;
      for (let len = Math.min(MAX_SYL, letters.length - i); len >= 1 && !result; len--) {
        const piece = letters.substr(i, len);
        if (valid(piece, i + len)) {
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
    let hyphen = false;    // kötőjel előzi meg a következő szótagot (dì-yī)

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
        const syl = { base: part, tone: tone };
        if (idx === 0 && hyphen) syl.hyphen = true;
        word.syls.push(syl);
        pos += part.length;
      });
      chunk = [];
      hyphen = false;
    }

    function flushWord() {
      flushChunk();
      if (word && word.syls.length) items.push(word);
      word = null;
      hyphen = false;
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
        if (ch === '-') hyphen = true;          // a kötőjel megmarad, a · és a ' nem
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
      let lead = '';
      if (s.hyphen) lead = '-';
      else if (j > 0 && 'aeo'.indexOf(s.base[0]) >= 0) lead = '\'';
      return lead + markSyllable(s.base, s.tone);
    });
  }

  // Jeles (vagy vegyes) → számos. A semleges tónus 5-öt kap.
  function toNumbered(text) {
    return rebuild(text, function (s) {
      return (s.hyphen ? '-' : '') + s.base + (s.tone ? s.tone : 5);
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

  /* ── 9. Megjelenítés (DOM) ───────────────────────── */

  // Hanzik és a hozzájuk tartozó pinyinek → <ruby> elemek a konténerben.
  // Csak createElement + textContent: a bevitt szöveg nem értelmeződik HTML-ként.
  // A pinyin lehet számos is (ni3) — a toMarked jeles alakra hozza.
  function renderRuby(container, hanziList, pinyinList) {
    if (!container || typeof document === 'undefined') return;
    container.textContent = '';
    (hanziList || []).forEach(function (hanzi, i) {
      const ruby = document.createElement('ruby');
      ruby.textContent = hanzi;
      const rt = document.createElement('rt');
      rt.textContent = pinyinList && pinyinList[i] ? toMarked(pinyinList[i]) : '';
      ruby.appendChild(rt);
      container.appendChild(ruby);
    });
  }

  return {
    renderRuby: renderRuby,
    toMarked: toMarked,
    toNumbered: toNumbered,
    parse: parse,
    segment: segment,
    isSyllable: isSyllable,
    markIndex: markIndex,
    check: check,
    checkLive: checkLive,
    setToneMarks: setToneMarks,
    addSyllables: addSyllables
  };
})();
