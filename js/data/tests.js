/* ====================================================
   HanziFlow — a dolgozatok (témazárók) leírása (pages/tests.html)
   ----------------------------------------------------
   A kérdések a leckék saját anyagából jönnek (js/data/course.js): szólisták, példamondatok,
   ellenőrző kérdések és olvasmányok. Itt csak a dolgozatok összeállítása és a jegyek állnak.

   HANZIFLOW_TESTS        { id, level, title, lessons: [leckeszámok], topics, final? }
                          final: szintzáró (több kérdés, több idő, két olvasmány)
   HANZIFLOW_TEST_PARTS   a részek sorrendje és a kérdések száma (normal / final)
   HANZIFLOW_TEST_GRADES  [legalább ennyi %, jegy, név] — csökkenő sorrendben
   ==================================================== */

const HANZIFLOW_TESTS = [
  { id: 'h1a', level: 1, title: '1. témazáró', lessons: [1, 2, 3, 4, 5],
    topics: 'Köszönés és bocsánatkérés, udvarias fordulatok, bemutatkozás, emberek körülöttem, család és életkor.' },
  { id: 'h1b', level: 1, title: '2. témazáró', lessons: [6, 7, 8, 9, 10],
    topics: 'Képességek, dátum és tervek, vásárlás és pénz, hely és munkahely, mi van hol.' },
  { id: 'h1c', level: 1, title: '3. témazáró', lessons: [11, 12, 13, 14, 15],
    topics: 'Idő és napirend, időjárás és hogylét, telefonbeszélgetés, ami megtörtént, egy történet részletei.' },
  { id: 'h1z', level: 1, title: 'Szintzáró: HSK 1', lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], final: true,
    topics: 'A HSK 1 mind a tizenöt leckéje egy nagyobb dolgozatban.' },

  { id: 'h2a', level: 2, title: '1. témazáró', lessons: [16, 17, 18, 19, 20],
    topics: 'Utazási tervek és vélemény, szokások, dolgok azonosítása, segítség és új munka, ruhavásárlás.' },
  { id: 'h2b', level: 2, title: '2. témazáró', lessons: [21, 22, 23, 24, 25],
    topics: 'Okok és változások, távolság és közlekedés, tanács és program, a cselekvés eredménye, betegség és orvos.' },
  { id: 'h2c', level: 2, title: '3. témazáró', lessons: [26, 27, 28, 29, 30],
    topics: 'Összehasonlítás, hogyan csinálod, állapot és irány, tapasztalatok, búcsú és jókívánságok.' },
  { id: 'h2z', level: 2, title: 'Szintzáró: HSK 2', lessons: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], final: true,
    topics: 'A HSK 2 mind a tizenöt leckéje egy nagyobb dolgozatban.' },

  { id: 'h3a', level: 3, title: '1. témazáró', lessons: [31, 32, 33, 34, 35],
    topics: 'Tervek, költözés, változás és fokozás, képes vagy nem képes, idő és ismeretség.' },
  { id: 'h3b', level: 3, title: '2. témazáró', lessons: [36, 37, 38, 39, 40],
    topics: 'Meglepetésbuli, család és hasonlóság, első nap a munkahelyen, irodai munka, lakásbérlés.' },
  { id: 'h3c', level: 3, title: '3. témazáró', lessons: [41, 42, 43, 44, 45],
    topics: 'Egy hosszú hét, feltétel és cél, valószínűség, felismerés és folytatás, a szenvedő szerkezet.' },
  { id: 'h3d', level: 3, title: '4. témazáró', lessons: [46, 47, 48, 49, 50],
    topics: 'Az első munkahét, szempontok és viszonyok, gombócsütés, hírek és meglepetések, búcsú két év után.' },
  { id: 'h3z', level: 3, title: 'Szintzáró: HSK 3', lessons: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], final: true,
    topics: 'A HSK 3 mind a húsz leckéje egy nagyobb dolgozatban.' },

  { id: 'h4a', level: 4, title: '1. témazáró', lessons: [51, 52, 53, 54, 55],
    topics: 'Új város és munka, lakásbérlés, értekezlet, vacsora a kollégákkal, orvosnál.' },
  { id: 'h4b', level: 4, title: '2. témazáró', lessons: [56, 57, 58, 59, 60],
    topics: 'Kirándulás, rendelés a neten, időbeosztás, vita a lakótárssal, régi barát.' },
  { id: 'h4c', level: 4, title: '3. témazáró', lessons: [61, 62, 63, 64, 65],
    topics: 'Szelektív gyűjtés, állásinterjú, Holdünnep, maraton, mobilfizetés.' },
  { id: 'h4d', level: 4, title: '4. témazáró', lessons: [66, 67, 68, 69, 70],
    topics: 'A szülők látogatása, esküvő, előléptetés, vita egy cikkről, egy év Sanghajban.' },
  { id: 'h4z', level: 4, title: 'Szintzáró: HSK 4', lessons: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], final: true,
    topics: 'A HSK 4 mind a húsz leckéje egy nagyobb dolgozatban.' }
];

const HANZIFLOW_TEST_PARTS = [
  { id: 'words', name: 'Szavak',   normal: 6, final: 8 },
  { id: 'sent',  name: 'Mondatok', normal: 4, final: 6 },
  { id: 'gram',  name: 'Nyelvtan', normal: 7, final: 10 },
  { id: 'read',  name: 'Olvasás',  normal: 3, final: 6 }
];
const HANZIFLOW_TEST_MINUTES = { normal: 20, final: 30 };

const HANZIFLOW_TEST_GRADES = [
  [85, 5, 'jeles'], [70, 4, 'jó'], [55, 3, 'közepes'], [40, 2, 'elégséges'], [0, 1, 'elégtelen']
];
