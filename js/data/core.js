/* ====================================================
   HANZIFLOW — core.js: a tanulási út
   ----------------------------------------------------
   Az út a HSK 1 szint témáit és nyelvtani sorrendjét követi
   (saját leckékkel, saját magyarázattal és példamondatokkal).
   Előtte egy előkészítő fejezet: a pinyin és a négy tónus.

   HANZIFLOW_PATH — lépések:
     id       egyedi kulcs (a haladás ezzel mentődik)
     glyph    a lépés jele a térképen (egy írásjegy)
     title / desc
     module   a HanziFlowStats modul-kulcsa: 'lesson' | 'tones'
              (ehhez a modulhoz tartozó befejezett kör teljesíti a lépést)
     mode     a lecke-oldal körének fajtája: 'listen' | 'read' (alapból: ellenőrző kör)
     href     a megnyitandó oldal (a gyökérhez képest)
     level    'zero' = csak a nulláról indulónak kötelező; aki a pinyint már
              ismeri, annál „átugorva" jelenik meg
     preset   a modul beállításaira ültetett kör:  set: { kulcs: érték }
   A lépés akkor „kész", ha az innen indított kör legalább 60%-os.

   HANZIFLOW_PATH_UNITS — fejezetek (a térkép ezek szerint tagol):
     id · kicker (a fejléc kis címkéje) · title · sub · steps: [lépés-azonosítók]
   ==================================================== */

const HANZIFLOW_PATH = [
  // ── Előkészítő: kiejtés ──
  { id: 'l0-lesson', glyph: '音', title: 'Magyarázat: pinyin és tónusok',
    desc: 'Hogyan írjuk le latin betűkkel a kínai kiejtést, és mi az a négy tónus.',
    module: 'lesson', href: 'pages/lesson.html?id=l0', level: 'zero' },
  { id: 'tones-see', glyph: '调', title: 'Tónusjelek',
    desc: 'ā á ǎ à: melyik ékezet melyik dallamot jelöli?',
    module: 'tones', href: 'pages/tones.html', level: 'zero',
    preset: { set: { mode: 'see' } } },
  { id: 'tones-hear', glyph: '听', title: 'Tónusok hallás után',
    desc: 'Egy szótag szól: magas, emelkedő, mély vagy eső?',
    module: 'tones', href: 'pages/tones.html', level: 'zero',
    preset: { set: { mode: 'hear' } } },

  // ── 1. lecke ──
  { id: 'l1-lesson', glyph: '好', title: 'Magyarázat: 你好',
    desc: 'Köszönés, bocsánatkérés, és az első tónus-szabály: két 3. tónus egymás után.',
    module: 'lesson', href: 'pages/lesson.html?id=l1' },
  { id: 'l1-pairs', glyph: '声', title: 'Két szótag dallama',
    desc: 'Kétszótagú szavak: melyik tónus jön melyik után?',
    module: 'tones', href: 'pages/tones.html',
    preset: { set: { mode: 'pairs' } } },

  // ── 2. lecke ──
  { id: 'l2-lesson', glyph: '谢', title: 'Magyarázat: 谢谢, 不客气',
    desc: 'Köszönet és búcsú; a 不 tónusváltása és a semleges tónus.',
    module: 'lesson', href: 'pages/lesson.html?id=l2' },
  { id: 'l2-listen', glyph: '听', title: 'Hallás: udvarias fordulatok',
    desc: 'A 2. lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l2&round=listen' },

  // ── 3. lecke ──
  { id: 'l3-lesson', glyph: '名', title: 'Magyarázat: 什么, 是, 吗',
    desc: 'Hogy hívnak? Ki vagy? Az eldöntendő kérdés 吗-val.',
    module: 'lesson', href: 'pages/lesson.html?id=l3' },
  { id: 'l3-listen', glyph: '听', title: 'Hallás: bemutatkozás',
    desc: 'A 3. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l3&round=listen' },
  { id: 'l3-read', glyph: '读', title: 'Olvasás: Az új diák',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l3&round=read' },

  // ── 4. lecke ──
  { id: 'l4-lesson', glyph: '谁', title: 'Magyarázat: 谁, 哪, 的, 呢',
    desc: 'Ki ő? Honnan való? Birtoklás 的-vel, visszakérdezés 呢-vel.',
    module: 'lesson', href: 'pages/lesson.html?id=l4' },
  { id: 'l4-listen', glyph: '听', title: 'Hallás: ki kicsoda?',
    desc: 'A 4. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l4&round=listen' },
  { id: 'l4-read', glyph: '读', title: 'Olvasás: A tanárom',
    desc: 'Rövid szöveg, utána négy kérdés a tartalmáról.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l4&round=read' },

  // ── 5. lecke ──
  { id: 'l5-lesson', glyph: '岁', title: 'Magyarázat: 几, számok, 了, 多大',
    desc: 'Hányan vagytok? Hány éves? Számok százig, és a változást jelző 了.',
    module: 'lesson', href: 'pages/lesson.html?id=l5' },
  { id: 'l5-listen', glyph: '听', title: 'Hallás: család és életkor',
    desc: 'A 5. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l5&round=listen' },
  { id: 'l5-read', glyph: '读', title: 'Olvasás: Wang tanárnő családja',
    desc: 'Rövid szöveg, utána négy kérdés a tartalmáról.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l5&round=read' }
];

const HANZIFLOW_PATH_UNITS = [
  { id: 'u-prep', kicker: 'Előkészítő', title: 'Kiejtés és tónusok', sub: 'A pinyin betűi, a négy tónus, a semleges tónus',
    steps: ['l0-lesson', 'tones-see', 'tones-hear'] },
  { id: 'u-l1', kicker: 'HSK 1 · 1. lecke', title: 'Szia!', sub: '你好, 您, 你们; 对不起 és 没关系',
    steps: ['l1-lesson', 'l1-pairs'] },
  { id: 'u-l2', kicker: 'HSK 1 · 2. lecke', title: 'Köszönöm, viszlát', sub: '谢谢, 不客气, 再见; a 不 tónusa',
    steps: ['l2-lesson', 'l2-listen'] },
  { id: 'u-l3', kicker: 'HSK 1 · 3. lecke', title: 'Hogy hívnak?', sub: '叫, 什么, 是, 吗; országok és foglalkozások',
    steps: ['l3-lesson', 'l3-listen', 'l3-read'] },
  { id: 'u-l4', kicker: 'HSK 1 · 4. lecke', title: 'Ki ő?', sub: '谁, 哪, 的, 呢; tanár, osztálytárs, barát',
    steps: ['l4-lesson', 'l4-listen', 'l4-read'] },
  { id: 'u-l5', kicker: 'HSK 1 · 5. lecke', title: 'Család és életkor', sub: '几, 有, számok százig, 了, 多大',
    steps: ['l5-lesson', 'l5-listen', 'l5-read'] }
];
