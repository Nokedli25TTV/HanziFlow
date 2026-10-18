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
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l15&round=read' },

  // ── HSK 2 · 1. lecke ──
  { id: 'l16-lesson', glyph: '要', title: 'Magyarázat: 要, 最, 觉得, 为什么, 十几 · 二十多',
    desc: 'Terv, vélemény és indoklás: mikor a legjobb utazni, és miért.',
    module: 'lesson', href: 'pages/lesson.html?id=l16' },
  { id: 'l16-listen', glyph: '听', title: 'Hallás: utazási tervek',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l16&round=listen' },
  { id: 'l16-read', glyph: '读', title: 'Olvasás: Az utazási tervem',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l16&round=read' },

  // ── HSK 2 · 2. lecke ──
  { id: 'l17-lesson', glyph: '每', title: 'Magyarázat: 每…都, 是不是, ige + időtartam, 多 + melléknév',
    desc: 'Napi szokások: mikor és mennyi ideig, és a megerősítő kérdés.',
    module: 'lesson', href: 'pages/lesson.html?id=l17' },
  { id: 'l17-listen', glyph: '听', title: 'Hallás: reggeli futás',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l17&round=listen' },
  { id: 'l17-read', glyph: '读', title: 'Olvasás: David napja',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l17&round=read' },

  // ── HSK 2 · 3. lecke ──
  { id: 'l18-lesson', glyph: '色', title: 'Magyarázat: 的-szerkezet, színek, oldalak, 一下',
    desc: 'Melyik az enyém? A piros, a bal oldali, az új — főnév nélkül.',
    module: 'lesson', href: 'pages/lesson.html?id=l18' },
  { id: 'l18-listen', glyph: '听', title: 'Hallás: a csomagszalagnál',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l18&round=listen' },
  { id: 'l18-read', glyph: '读', title: 'Olvasás: A reptéren',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l18&round=read' },

  // ── HSK 2 · 4. lecke ──
  { id: 'l19-lesson', glyph: '帮', title: 'Magyarázat: 是…的 (ki?), …的时候, 已经…了, 帮, két tárgy',
    desc: 'Ki tette, mikor, és már megtörtént-e: segítség és új munka.',
    module: 'lesson', href: 'pages/lesson.html?id=l19' },
  { id: 'l19-listen', glyph: '听', title: 'Hallás: az új munka',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l19&round=listen' },
  { id: 'l19-read', glyph: '读', title: 'Olvasás: Anna új munkája',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l19&round=read' },

  // ── HSK 2 · 5. lecke ──
  { id: 'l20-lesson', glyph: '千', title: 'Magyarázat: 还, 就, 千, 有点儿 / 一点儿, 件 · 条 · 双',
    desc: 'Ruhavásárlás: ár ezres nagyságrendben, alku, még egy darab.',
    module: 'lesson', href: 'pages/lesson.html?id=l20' },
  { id: 'l20-listen', glyph: '听', title: 'Hallás: a ruhavásáron',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l20&round=listen' },
  { id: 'l20-read', glyph: '读', title: 'Olvasás: Kabátvásárlás',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l20&round=read' },

  // ── HSK 2 · 6. lecke ──
  { id: 'l21-lesson', glyph: '因', title: 'Magyarázat: 怎么 (hogyhogy), 因为…所以, 了 (változás), 不…了, 可以',
    desc: 'Magyarázkodás: miért nem jöttél, mi változott, mit nem csinálsz már.',
    module: 'lesson', href: 'pages/lesson.html?id=l21' },
  { id: 'l21-listen', glyph: '听', title: 'Hallás: magyarázkodás',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l21&round=listen' },
  { id: 'l21-read', glyph: '读', title: 'Olvasás: Miért nem jött David?',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l21&round=read' },

  // ── HSK 2 · 7. lecke ──
  { id: 'l22-lesson', glyph: '离', title: 'Magyarázat: 离, 从…到, 要 + időtartam, 还 (még mindig), 吧 (sejtés)',
    desc: 'Távolság és közlekedés: milyen messze, honnan hová, mennyi idő.',
    module: 'lesson', href: 'pages/lesson.html?id=l22' },
  { id: 'l22-listen', glyph: '听', title: 'Hallás: reggeli út',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l22&round=listen' },
  { id: 'l22-read', glyph: '读', title: 'Olvasás: Wang Ming reggele',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l22&round=read' },

  // ── HSK 2 · 8. lecke ──
  { id: 'l23-lesson', glyph: '让', title: 'Magyarázat: 让, igekettőzés, 再 / 又, 告诉, 先…再…',
    desc: 'Tanács és program: hadd gondolkodjak, nézz körül, előbb ez, aztán az.',
    module: 'lesson', href: 'pages/lesson.html?id=l23' },
  { id: 'l23-listen', glyph: '听', title: 'Hallás: programterv',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l23&round=listen' },
  { id: 'l23-read', glyph: '读', title: 'Olvasás: Anya Pekingbe jön',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l23&round=read' },

  // ── HSK 2 · 9. lecke ──
  { id: 'l24-lesson', glyph: '完', title: 'Magyarázat: eredménykiegészítők: 完, 懂, 见, 到, 好, 错, 对 · 第',
    desc: 'A cselekvés eredménye: megcsináltam, megértettem, megtaláltam — vagy nem.',
    module: 'lesson', href: 'pages/lesson.html?id=l24' },
  { id: 'l24-listen', glyph: '听', title: 'Hallás: a könyvtárban',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l24&round=listen' },
  { id: 'l24-read', glyph: '读', title: 'Olvasás: Az első dolgozat',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l24&round=read' },

  // ── HSK 2 · 10. lecke ──
  { id: 'l25-lesson', glyph: '别', title: 'Magyarázat: 别, 别…了, 正在…呢, testrész + 疼, 一天三次',
    desc: 'Orvosnál: mi fáj, hányszor kell bevenni a gyógyszert — és ne aggódj!',
    module: 'lesson', href: 'pages/lesson.html?id=l25' },
  { id: 'l25-listen', glyph: '听', title: 'Hallás: orvosnál',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l25&round=listen' },
  { id: 'l25-read', glyph: '读', title: 'Olvasás: Anna megfázott',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l25&round=read' },

  // ── HSK 2 · 11. lecke ──
  { id: 'l26-lesson', glyph: '比', title: 'Magyarázat: 比, a különbség, 没有…那么, 更 / 还, 跟…一样',
    desc: 'Összehasonlítás: nagyobb, sokkal melegebb, nem olyan, ugyanolyan.',
    module: 'lesson', href: 'pages/lesson.html?id=l26' },
  { id: 'l26-listen', glyph: '听', title: 'Hallás: fagylalt a hőségben',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l26&round=listen' },
  { id: 'l26-read', glyph: '读', title: 'Olvasás: Peking és Budapest',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l26&round=read' },

  // ── HSK 2 · 12. lecke ──
  { id: 'l27-lesson', glyph: '得', title: 'Magyarázat: ige + 得 + melléknév, 虽然…但是, dicséret',
    desc: 'Hogyan csinálod? Szépen énekelsz, gyorsan beszélsz — bár…, de….',
    module: 'lesson', href: 'pages/lesson.html?id=l27' },
  { id: 'l27-listen', glyph: '听', title: 'Hallás: az iskolai est után',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l27&round=listen' },
  { id: 'l27-read', glyph: '读', title: 'Olvasás: Az iskolai est',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l27&round=read' },

  // ── HSK 2 · 13. lecke ──
  { id: 'l28-lesson', glyph: '着', title: 'Magyarázat: ige + 着, hely + ige + 着, 往, 进来 / 出去',
    desc: 'Állapot és irány: mi van rajtad, mi hol van, merre menj.',
    module: 'lesson', href: 'pages/lesson.html?id=l28' },
  { id: 'l28-listen', glyph: '听', title: 'Hallás: a kávézóban',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l28&round=listen' },
  { id: 'l28-read', glyph: '读', title: 'Olvasás: Egy fénykép',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l28&round=read' },

  // ── HSK 2 · 14. lecke ──
  { id: 'l29-lesson', glyph: '过', title: 'Magyarázat: ige + 过, 没…过, 过 + szám + 次, 过 vagy 了, 还没…呢',
    desc: 'Tapasztalatok: mit csináltál már, mit még soha, hányszor.',
    module: 'lesson', href: 'pages/lesson.html?id=l29' },
  { id: 'l29-listen', glyph: '听', title: 'Hallás: a Nagy Fal',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l29&round=listen' },
  { id: 'l29-read', glyph: '读', title: 'Olvasás: Ahol már jártam',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l29&round=read' },

  // ── HSK 2 · 15. lecke ──
  { id: 'l30-lesson', glyph: '祝', title: 'Magyarázat: (快 / 就)要…了, 都…了, 祝, 送, ünnepek',
    desc: 'Búcsú és jókívánságok: mindjárt itt az újév, jó utat, boldog új évet!',
    module: 'lesson', href: 'pages/lesson.html?id=l30' },
  { id: 'l30-listen', glyph: '听', title: 'Hallás: búcsú',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l30&round=listen' },
  { id: 'l30-read', glyph: '读', title: 'Olvasás: Viszlát, Peking!',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l30&round=read' },

  // ── HSK 3 · 1. lecke ──
  { id: 'l31-lesson', glyph: '算', title: 'Magyarázat: 打算, 还是 / 或者, 一边…一边…, 先…然后…, …以前 / …以后',
    desc: 'Tervek az új félévre: választás, egyidejűség, sorrend, mielőtt és miután.',
    module: 'lesson', href: 'pages/lesson.html?id=l31' },
  { id: 'l31-listen', glyph: '听', title: 'Hallás: tervek a menzán',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l31&round=listen' },
  { id: 'l31-read', glyph: '读', title: 'Olvasás: Terveim az új félévre',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l31&round=read' },

  // ── HSK 3 · 2. lecke ──
  { id: 'l32-lesson', glyph: '搬', title: 'Magyarázat: összetett irányjelölők, a hely és a tárgy helye, 刚 / 刚才',
    desc: 'Költözés: felhoz, kiszalad, berak a szekrénybe, hazaugrik.',
    module: 'lesson', href: 'pages/lesson.html?id=l32' },
  { id: 'l32-listen', glyph: '听', title: 'Hallás: költözés',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l32&round=listen' },
  { id: 'l32-read', glyph: '读', title: 'Olvasás: Wang Ming költözik',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l32&round=read' },

  // ── HSK 3 · 3. lecke ──
  { id: 'l33-lesson', glyph: '越', title: 'Magyarázat: 越来越, 越…越…, 又…又…, 一点儿也不, 极了 · 得很',
    desc: 'Változás és fokozás: egyre melegebb, minél többet, annál jobban.',
    module: 'lesson', href: 'pages/lesson.html?id=l33' },
  { id: 'l33-listen', glyph: '听', title: 'Hallás: tavasz a parkban',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l33&round=listen' },
  { id: 'l33-read', glyph: '读', title: 'Olvasás: Én és a kínai',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l33&round=read' },

  // ── HSK 3 · 4. lecke ──
  { id: 'l34-lesson', glyph: '得', title: 'Magyarázat: ige + 得 / 不 + kiegészítő, 得了 / 不了, 来得及, 突然',
    desc: 'Képes vagy nem képes: megérted-e, megtalálod-e, odaérsz-e még.',
    module: 'lesson', href: 'pages/lesson.html?id=l34' },
  { id: 'l34-listen', glyph: '听', title: 'Hallás: hol a kulcs?',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l34&round=listen' },
  { id: 'l34-read', glyph: '读', title: 'Olvasás: Egy bosszantó este',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l34&round=read' },

  // ── HSK 3 · 5. lecke ──
  { id: 'l35-lesson', glyph: '久', title: 'Magyarázat: időtartam + 了…了, …没…了, szétválasztható igék, 才 / 就, 知道 · 认识 · 了解',
    desc: 'Mióta tart, mióta nem történt — és ki kit hogyan ismer.',
    module: 'lesson', href: 'pages/lesson.html?id=l35' },
  { id: 'l35-listen', glyph: '听', title: 'Hallás: találkozás a metrón',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l35&round=listen' },
  { id: 'l35-read', glyph: '读', title: 'Olvasás: Régi osztálytársak',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l35&round=read' },

  // ── HSK 3 · 6. lecke ──
  { id: 'l36-lesson', glyph: '谁', title: 'Magyarázat: 谁都 / 什么都, kérdőszó…就…, 只要…就…, 只有…才…, 怎么这么',
    desc: 'Bárhol, bármi, bárki — és a feltételek: elég, ha…, csak akkor, ha….',
    module: 'lesson', href: 'pages/lesson.html?id=l36' },
  { id: 'l36-listen', glyph: '听', title: 'Hallás: a terv',
    desc: 'A lecke mondatai hang után: mit jelent, amit hallasz?',
    module: 'lesson', mode: 'listen', href: 'pages/lesson.html?id=l36&round=listen' },
  { id: 'l36-read', glyph: '读', title: 'Olvasás: Születésnapi meglepetés',
    desc: 'Rövid szöveg a lecke nyelvtanával, utána négy kérdés.',
    module: 'lesson', mode: 'read', href: 'pages/lesson.html?id=l36&round=read' }
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
    steps: ['l15-lesson', 'l15-listen', 'l15-read'] },
  { id: 'u-l16', kicker: 'HSK 2 · 1. lecke', title: 'Mikor a legjobb utazni?', sub: '要, 最, 觉得, 为什么 / 因为, közelítő számok',
    steps: ['l16-lesson', 'l16-listen', 'l16-read'] },
  { id: 'u-l17', kicker: 'HSK 2 · 2. lecke', title: 'Minden nap hatkor kelek', sub: '每…都, 是不是, időtartam, 多高 / 多长时间',
    steps: ['l17-lesson', 'l17-listen', 'l17-read'] },
  { id: 'u-l18', kicker: 'HSK 2 · 3. lecke', title: 'A bal oldali piros az enyém', sub: '红色的 · 我的, színek, 左边 / 右边 / 旁边, 一下',
    steps: ['l18-lesson', 'l18-listen', 'l18-read'] },
  { id: 'u-l19', kicker: 'HSK 2 · 4. lecke', title: 'Ki ajánlotta?', sub: '是…的 (ki?), …的时候, 已经…了, 帮, 教 / 给 / 问 / 送',
    steps: ['l19-lesson', 'l19-listen', 'l19-read'] },
  { id: 'u-l20', kicker: 'HSK 2 · 5. lecke', title: 'Kicsit olcsóbban?', sub: '还, 就, 百 / 千 / 零, 有点儿 / 一点儿, ruhák mérőszavai',
    steps: ['l20-lesson', 'l20-listen', 'l20-read'] },
  { id: 'u-l21', kicker: 'HSK 2 · 6. lecke', title: 'Hogyhogy nem jöttél?', sub: '怎么 + 没, 因为…所以…, mondatvégi 了, 不…了, 可以',
    steps: ['l21-lesson', 'l21-listen', 'l21-read'] },
  { id: 'u-l22', kicker: 'HSK 2 · 7. lecke', title: 'Messze laksz?', sub: '离, 从…到…, 要 + időtartam, 还 = még mindig, …吧？',
    steps: ['l22-lesson', 'l22-listen', 'l22-read'] },
  { id: 'u-l23', kicker: 'HSK 2 · 8. lecke', title: 'Hadd gondolkodjak', sub: '让, 看看 / 休息休息, 再 és 又, 告诉, 先…再…',
    steps: ['l23-lesson', 'l23-listen', 'l23-read'] },
  { id: 'u-l24', kicker: 'HSK 2 · 9. lecke', title: 'Megértetted?', sub: '做完, 听懂, 看见, 找到, 写错, 没 + ige + kieg., 第 + szám',
    steps: ['l24-lesson', 'l24-listen', 'l24-read'] },
  { id: 'u-l25', kicker: 'HSK 2 · 10. lecke', title: 'Ne aggódj!', sub: '别 + ige, 别…了, 正在…呢, 头疼, gyakoriság',
    steps: ['l25-lesson', 'l25-listen', 'l25-read'] },
  { id: 'u-l26', kicker: 'HSK 2 · 11. lecke', title: 'Peking melegebb', sub: 'A 比 B + mn., 大三岁, 没有…那么, 更, 跟…一样',
    steps: ['l26-lesson', 'l26-listen', 'l26-read'] },
  { id: 'u-l27', kicker: 'HSK 2 · 12. lecke', title: 'Szépen énekelsz!', sub: '唱得很好, 说汉语说得很好, 打得比我好, 虽然…但是…',
    steps: ['l27-lesson', 'l27-listen', 'l27-read'] },
  { id: 'u-l28', kicker: 'HSK 2 · 13. lecke', title: 'Fehér ruha van rajtam', sub: '门开着, 桌子上放着…, 笑着说, 往左走, 进来 / 出去',
    steps: ['l28-lesson', 'l28-listen', 'l28-read'] },
  { id: 'u-l29', kicker: 'HSK 2 · 14. lecke', title: 'Voltál már a Nagy Falon?', sub: '吃过, 没去过, 去过两次, 过 vagy 了, 还没…呢',
    steps: ['l29-lesson', 'l29-listen', 'l29-read'] },
  { id: 'u-l30', kicker: 'HSK 2 · 15. lecke', title: 'Boldog új évet!', sub: '快要…了, 就要…了, 都…了, 祝你…, 送, 节',
    steps: ['l30-lesson', 'l30-listen', 'l30-read'] },
  { id: 'u-l31', kicker: 'HSK 3 · 1. lecke', title: 'Új félév, új tervek', sub: '打算, 还是 / 或者, 一边…一边…, 先…然后…, 以前 / 以后',
    steps: ['l31-lesson', 'l31-listen', 'l31-read'] },
  { id: 'u-l32', kicker: 'HSK 3 · 2. lecke', title: 'Hozd fel, vidd vissza!', sub: '上来 / 下去, 搬上来, 走进教室来, 买回来, 刚 / 刚才',
    steps: ['l32-lesson', 'l32-listen', 'l32-read'] },
  { id: 'u-l33', kicker: 'HSK 3 · 3. lecke', title: 'Egyre szebb', sub: '越来越, 越…越…, 又…又…, 一点儿也不 / 一…也没, 极了',
    steps: ['l33-lesson', 'l33-listen', 'l33-read'] },
  { id: 'u-l34', kicker: 'HSK 3 · 4. lecke', title: 'Nem találom!', sub: '看得懂 / 看不懂, 进不去, 吃不了, 来得及, 没找到 vagy 找不到',
    steps: ['l34-lesson', 'l34-listen', 'l34-read'] },
  { id: 'u-l35', kicker: 'HSK 3 · 5. lecke', title: 'Rég láttalak!', sub: '认识十年了, 半年没见面了, 见个面, 才 / 就, 知道 / 认识 / 了解',
    steps: ['l35-lesson', 'l35-listen', 'l35-read'] },
  { id: 'u-l36', kicker: 'HSK 3 · 6. lecke', title: 'Bárhol jó', sub: '谁都, 什么也没, 想吃什么就吃什么, 只要…就…, 只有…才…',
    steps: ['l36-lesson', 'l36-listen', 'l36-read'] }
];
