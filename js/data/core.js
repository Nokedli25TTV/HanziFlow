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
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l5&round=read' },

  // ── 6. lecke ──
  { id: 'l6-lesson', glyph: '会', title: 'Magyarázat: 会, 很 + melléknév, 怎么',
    desc: 'Mit tudsz megcsinálni, milyen valami, és hogyan kell csinálni valamit.',
    module: 'lesson', href: 'pages/lesson.html?id=l6' },
  { id: 'l6-listen', glyph: '听', title: 'Hallás: tudok kínaiul',
    desc: 'A 6. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l6&round=listen' },
  { id: 'l6-read', glyph: '读', title: 'Olvasás: Tudok kínaiul',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l6&round=read' },

  // ── 7. lecke ──
  { id: 'l7-lesson', glyph: '号', title: 'Magyarázat: dátum, a hét napjai, 去 + hely',
    desc: 'Hányadika van, milyen nap, és hová mész valamit csinálni.',
    module: 'lesson', href: 'pages/lesson.html?id=l7' },
  { id: 'l7-listen', glyph: '听', title: 'Hallás: dátumok és tervek',
    desc: 'A 7. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l7&round=listen' },
  { id: 'l7-read', glyph: '读', title: 'Olvasás: Az én vasárnapom',
    desc: 'Rövid szöveg, utána négy kérdés a tartalmáról.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l7&round=read' },

  // ── 8. lecke ──
  { id: 'l8-lesson', glyph: '钱', title: 'Magyarázat: 想, mérőszavak, 多少钱',
    desc: 'Mit szeretnél, mennyibe kerül, hogyan számolsz mérőszóval.',
    module: 'lesson', href: 'pages/lesson.html?id=l8' },
  { id: 'l8-listen', glyph: '听', title: 'Hallás: vásárlás',
    desc: 'A 8. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l8&round=listen' },
  { id: 'l8-read', glyph: '读', title: 'Olvasás: A boltban',
    desc: 'Rövid szöveg, utána négy kérdés a tartalmáról.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l8&round=read' },

  // ── 9. lecke ──
  { id: 'l9-lesson', glyph: '在', title: 'Magyarázat: 在, 哪儿, helyszavak',
    desc: 'Hol van valami, hol dolgozik valaki: a 在 kétféle használata.',
    module: 'lesson', href: 'pages/lesson.html?id=l9' },
  { id: 'l9-listen', glyph: '听', title: 'Hallás: hol van?',
    desc: 'A 9. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l9&round=listen' },
  { id: 'l9-read', glyph: '读', title: 'Olvasás: Az én családom',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l9&round=read' },

  // ── 10. lecke ──
  { id: 'l10-lesson', glyph: '有', title: 'Magyarázat: hely + 有, 和, 能, 请',
    desc: 'Mi van valahol, felsorolás, engedélykérés és udvarias kínálás.',
    module: 'lesson', href: 'pages/lesson.html?id=l10' },
  { id: 'l10-listen', glyph: '听', title: 'Hallás: szabad ide ülnöm?',
    desc: 'A 10. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l10&round=listen' },
  { id: 'l10-read', glyph: '读', title: 'Olvasás: A szobám',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l10&round=read' },

  // ── 11. lecke ──
  { id: 'l11-lesson', glyph: '点', title: 'Magyarázat: 几点, időpont, 什么时候',
    desc: 'Hány óra van, mikor csinálsz valamit, mi történik mi előtt.',
    module: 'lesson', href: 'pages/lesson.html?id=l11' },
  { id: 'l11-listen', glyph: '听', title: 'Hallás: idő és napirend',
    desc: 'A 11. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l11&round=listen' },
  { id: 'l11-read', glyph: '读', title: 'Olvasás: Egy napom',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l11&round=read' },

  // ── 12. lecke ──
  { id: 'l12-lesson', glyph: '天', title: 'Magyarázat: 怎么样, 太…了, 会 (előrejelzés)',
    desc: 'Időjárás, hogylét, javaslat; a 会 második jelentése.',
    module: 'lesson', href: 'pages/lesson.html?id=l12' },
  { id: 'l12-listen', glyph: '听', title: 'Hallás: időjárás',
    desc: 'A 12. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l12&round=listen' },
  { id: 'l12-read', glyph: '读', title: 'Olvasás: Peking időjárása',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l12&round=read' },

  // ── 13. lecke ──
  { id: 'l13-lesson', glyph: '呢', title: 'Magyarázat: 在…呢, 喂, 给…打电话, 吧',
    desc: 'Éppen történő cselekvés, telefonálás, javaslat és feltevés.',
    module: 'lesson', href: 'pages/lesson.html?id=l13' },
  { id: 'l13-listen', glyph: '听', title: 'Hallás: telefonon',
    desc: 'A 13. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l13&round=listen' },
  { id: 'l13-read', glyph: '读', title: 'Olvasás: Szombat délelőtt',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l13&round=read' },

  // ── 14. lecke ──
  { id: 'l14-lesson', glyph: '了', title: 'Magyarázat: 了, 没(有), 都, 后',
    desc: 'Ami megtörtént és ami nem; mind; valami után.',
    module: 'lesson', href: 'pages/lesson.html?id=l14' },
  { id: 'l14-listen', glyph: '听', title: 'Hallás: ami megtörtént',
    desc: 'A 14. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l14&round=listen' },
  { id: 'l14-read', glyph: '读', title: 'Olvasás: Vásárlás',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l14&round=read' },

  // ── 15. lecke ──
  { id: 'l15-lesson', glyph: '的', title: 'Magyarázat: 是…的, közlekedés, 认识',
    desc: 'Egy megtörtént dolog körülményei: mikor, hol, hogyan, kivel.',
    module: 'lesson', href: 'pages/lesson.html?id=l15' },
  { id: 'l15-listen', glyph: '听', title: 'Hallás: hogyan jöttél?',
    desc: 'A 15. lecke mondatai hang után.',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l15&round=listen' },
  { id: 'l15-read', glyph: '读', title: 'Olvasás: Megérkeztem Kínába',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l15&round=read' }
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
    steps: ['l5-lesson', 'l5-listen', 'l5-read'] },
  { id: 'u-l6', kicker: 'HSK 1 · 6. lecke', title: 'Mit tudsz?', sub: '会, 很 + melléknév, 怎么, 一点儿',
    steps: ['l6-lesson', 'l6-listen', 'l6-read'] },
  { id: 'u-l7', kicker: 'HSK 1 · 7. lecke', title: 'Hányadika van ma?', sub: 'Dátum, a hét napjai, 去 + hely + cselekvés',
    steps: ['l7-lesson', 'l7-listen', 'l7-read'] },
  { id: 'u-l8', kicker: 'HSK 1 · 8. lecke', title: 'Mit kérsz?', sub: '想, mérőszavak, 多少钱, 这 / 那',
    steps: ['l8-lesson', 'l8-listen', 'l8-read'] },
  { id: 'u-l9', kicker: 'HSK 1 · 9. lecke', title: 'Hol van?', sub: '在 + hely, 在 + hely + ige, 哪儿, 下面',
    steps: ['l9-lesson', 'l9-listen', 'l9-read'] },
  { id: 'u-l10', kicker: 'HSK 1 · 10. lecke', title: 'Szabad ide ülnöm?', sub: 'hely + 有, 和, 能, 请, 前面 / 后面',
    steps: ['l10-lesson', 'l10-listen', 'l10-read'] },
  { id: 'u-l11', kicker: 'HSK 1 · 11. lecke', title: 'Hány óra van?', sub: '几点, 点 + 分, 什么时候, 前, 回',
    steps: ['l11-lesson', 'l11-listen', 'l11-read'] },
  { id: 'u-l12', kicker: 'HSK 1 · 12. lecke', title: 'Milyen idő lesz?', sub: '怎么样, 太…了, téma + megjegyzés, 会',
    steps: ['l12-lesson', 'l12-listen', 'l12-read'] },
  { id: 'u-l13', kicker: 'HSK 1 · 13. lecke', title: 'Mit csinálsz éppen?', sub: '在…呢, 喂, 给…打电话, 吧, 喜欢',
    steps: ['l13-lesson', 'l13-listen', 'l13-read'] },
  { id: 'u-l14', kicker: 'HSK 1 · 14. lecke', title: 'Mit vettél?', sub: 'ige + 了, 没(有), 都, 后, 这些',
    steps: ['l14-lesson', 'l14-listen', 'l14-read'] },
  { id: 'u-l15', kicker: 'HSK 1 · 15. lecke', title: 'Hogyan jöttél?', sub: '是…的, 坐 + jármű, teljes dátum, 认识, 一起',
    steps: ['l15-lesson', 'l15-listen', 'l15-read'] }
];
