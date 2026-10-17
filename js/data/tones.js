/* ====================================================
   HANZIFLOW — Tónus-tréner adatai (pages/tones.html)
   ----------------------------------------------------
   HANZIFLOW_TONES       a négy tónus leírása (név, magyar hasonlat, dallam)
   HANZIFLOW_TONE_SETS   szótag-négyesek: ugyanaz a szótag négy tónussal,
                         mindegyikhez egy írásjegy, amely egymagában is így
                         hangzik (a felolvasó ezt kapja). Ahol egy tónushoz
                         nincs köznapi írásjegy, az a hely null.
                         [írásjegy, pinyin, magyar jelentés]
   HANZIFLOW_TONE_WORDS  kétszótagú szavak a szópár-módhoz. Csak olyan szó
                         van itt, amelyben nincs semleges tónus és nincs két
                         egymást követő 3. tónus (ott a kiejtés eltér az
                         írottól — azt a lecke magyarázza).
                         { zh, pinyin, tones: [a, b], hu }
   ==================================================== */

const HANZIFLOW_TONES = [
  { n: 1, mark: 'ā', name: 'Első tónus',    short: 'magas, egyenletes',
    tip: 'Magasan kezded, és végig ott tartod, mint egy kitartott hangot énekben.',
    curve: 'M4 9 L36 9' },
  { n: 2, mark: 'á', name: 'Második tónus', short: 'emelkedő',
    tip: 'Középről indul felfelé, mint a meglepett kérdésben: „Tényleg?"',
    curve: 'M4 22 L36 8' },
  { n: 3, mark: 'ǎ', name: 'Harmadik tónus', short: 'mély (lebukó)',
    tip: 'Lemegy a hangod aljára. Egymagában a végén kicsit vissza is jön, mondatban többnyire mélyen marad.',
    curve: 'M4 18 Q14 32 22 30 Q30 28 36 14' },
  { n: 4, mark: 'à', name: 'Negyedik tónus', short: 'éles, eső',
    tip: 'Fentről határozottan leesik, mint egy rövid, kurta parancs: „Nem!"',
    curve: 'M4 7 L36 30' }
];

const HANZIFLOW_TONE_SETS = [
  { base: 'ma',   items: [['妈', 'mā', 'anya'],        ['麻', 'má', 'kender'],      ['马', 'mǎ', 'ló'],          ['骂', 'mà', 'szidni']] },
  { base: 'ba',   items: [['八', 'bā', 'nyolc'],       ['拔', 'bá', 'kihúzni'],     ['把', 'bǎ', 'fogantyú'],     ['爸', 'bà', 'apa']] },
  { base: 'da',   items: [['搭', 'dā', 'felállítani'], ['答', 'dá', 'válaszolni'],  ['打', 'dǎ', 'ütni'],         ['大', 'dà', 'nagy']] },
  { base: 'shi',  items: [['诗', 'shī', 'vers'],       ['十', 'shí', 'tíz'],        ['史', 'shǐ', 'történelem'],  ['是', 'shì', 'lenni']] },
  { base: 'qi',   items: [['七', 'qī', 'hét (7)'],     ['骑', 'qí', 'lovagolni'],   ['起', 'qǐ', 'felkelni'],     ['气', 'qì', 'levegő']] },
  { base: 'wu',   items: [['屋', 'wū', 'szoba'],       ['无', 'wú', 'nincs'],       ['五', 'wǔ', 'öt'],           ['雾', 'wù', 'köd']] },
  { base: 'shu',  items: [['书', 'shū', 'könyv'],      ['熟', 'shú', 'érett'],      ['鼠', 'shǔ', 'egér'],        ['树', 'shù', 'fa']] },
  { base: 'tu',   items: [['秃', 'tū', 'kopasz'],      ['图', 'tú', 'kép'],         ['土', 'tǔ', 'föld'],         ['兔', 'tù', 'nyúl']] },
  { base: 'fei',  items: [['飞', 'fēi', 'repülni'],    ['肥', 'féi', 'kövér'],      ['匪', 'fěi', 'bandita'],     ['费', 'fèi', 'költség']] },
  { base: 'tang', items: [['汤', 'tāng', 'leves'],     ['糖', 'táng', 'cukor'],     ['躺', 'tǎng', 'feküdni'],    ['烫', 'tàng', 'forró']] },
  { base: 'wen',  items: [['温', 'wēn', 'langyos'],    ['文', 'wén', 'írás'],       ['稳', 'wěn', 'stabil'],      ['问', 'wèn', 'kérdezni']] },
  { base: 'zhu',  items: [['猪', 'zhū', 'disznó'],     ['竹', 'zhú', 'bambusz'],    ['主', 'zhǔ', 'gazda'],       ['住', 'zhù', 'lakni']] },
  { base: 'xiang',items: [['香', 'xiāng', 'illatos'],  ['详', 'xiáng', 'részletes'], ['想', 'xiǎng', 'gondolni'],  ['向', 'xiàng', 'felé']] },
  { base: 'wan',  items: [['弯', 'wān', 'kanyar'],     ['玩', 'wán', 'játszani'],   ['晚', 'wǎn', 'késő'],        ['万', 'wàn', 'tízezer']] },
  { base: 'ge',   items: [['哥', 'gē', 'báty'],        ['格', 'gé', 'kocka (minta)'], ['葛', 'gě', 'kúzu (növény)'], ['个', 'gè', 'darab']] },
  { base: 'mai',  items: [null,                         ['埋', 'mái', 'elásni'],     ['买', 'mǎi', 'venni'],       ['卖', 'mài', 'eladni']] },
  { base: 'yu',   items: [null,                         ['鱼', 'yú', 'hal'],         ['雨', 'yǔ', 'eső'],          ['玉', 'yù', 'jáde']] },
  { base: 'li',   items: [null,                         ['梨', 'lí', 'körte'],       ['里', 'lǐ', 'benne'],        ['力', 'lì', 'erő']] },
  { base: 'hua',  items: [['花', 'huā', 'virág'],      ['滑', 'huá', 'csúszós'],    null,                         ['话', 'huà', 'beszéd']] },
  { base: 'tian', items: [['天', 'tiān', 'ég, nap'],    ['田', 'tián', 'szántóföld'], ['舔', 'tiǎn', 'nyalni'],     null] }
];

const HANZIFLOW_TONE_WORDS = [
  { zh: '中国', pinyin: 'Zhōngguó', tones: [1, 2], hu: 'Kína' },
  { zh: '喝茶', pinyin: 'hē chá',   tones: [1, 2], hu: 'teát inni' },
  { zh: '今天', pinyin: 'jīntiān',  tones: [1, 1], hu: 'ma' },
  { zh: '飞机', pinyin: 'fēijī',    tones: [1, 1], hu: 'repülőgép' },
  { zh: '星期', pinyin: 'xīngqī',   tones: [1, 1], hu: 'hét (naptári)' },
  { zh: '开车', pinyin: 'kāi chē',  tones: [1, 1], hu: 'autót vezetni' },
  { zh: '中午', pinyin: 'zhōngwǔ',  tones: [1, 3], hu: 'dél' },
  { zh: '喝水', pinyin: 'hē shuǐ',  tones: [1, 3], hu: 'vizet inni' },
  { zh: '吃饭', pinyin: 'chī fàn',  tones: [1, 4], hu: 'enni' },
  { zh: '商店', pinyin: 'shāngdiàn', tones: [1, 4], hu: 'bolt' },
  { zh: '工作', pinyin: 'gōngzuò',  tones: [1, 4], hu: 'munka' },
  { zh: '天气', pinyin: 'tiānqì',   tones: [1, 4], hu: 'időjárás' },
  { zh: '明天', pinyin: 'míngtiān', tones: [2, 1], hu: 'holnap' },
  { zh: '国家', pinyin: 'guójiā',   tones: [2, 1], hu: 'ország' },
  { zh: '时间', pinyin: 'shíjiān',  tones: [2, 1], hu: 'idő' },
  { zh: '回家', pinyin: 'huí jiā',  tones: [2, 1], hu: 'hazamenni' },
  { zh: '学习', pinyin: 'xuéxí',    tones: [2, 2], hu: 'tanulni' },
  { zh: '同学', pinyin: 'tóngxué',  tones: [2, 2], hu: 'osztálytárs' },
  { zh: '没有', pinyin: 'méiyǒu',   tones: [2, 3], hu: 'nincs' },
  { zh: '苹果', pinyin: 'píngguǒ',  tones: [2, 3], hu: 'alma' },
  { zh: '牛奶', pinyin: 'niúnǎi',   tones: [2, 3], hu: 'tej' },
  { zh: '茶杯', pinyin: 'chábēi',   tones: [2, 1], hu: 'teáscsésze' },
  { zh: '北京', pinyin: 'Běijīng',  tones: [3, 1], hu: 'Peking' },
  { zh: '老师', pinyin: 'lǎoshī',   tones: [3, 1], hu: 'tanár' },
  { zh: '手机', pinyin: 'shǒujī',   tones: [3, 1], hu: 'mobiltelefon' },
  { zh: '火车', pinyin: 'huǒchē',   tones: [3, 1], hu: 'vonat' },
  { zh: '美国', pinyin: 'Měiguó',   tones: [3, 2], hu: 'Amerika' },
  { zh: '女儿', pinyin: 'nǚ\'ér',   tones: [3, 2], hu: 'lánya valakinek' },
  { zh: '米饭', pinyin: 'mǐfàn',    tones: [3, 4], hu: 'főtt rizs' },
  { zh: '考试', pinyin: 'kǎoshì',   tones: [3, 4], hu: 'vizsga' },
  { zh: '上班', pinyin: 'shàngbān', tones: [4, 1], hu: 'dolgozni menni' },
  { zh: '大学', pinyin: 'dàxué',    tones: [4, 2], hu: 'egyetem' },
  { zh: '去年', pinyin: 'qùnián',   tones: [4, 2], hu: 'tavaly' },
  { zh: '汉语', pinyin: 'Hànyǔ',    tones: [4, 3], hu: 'kínai nyelv' },
  { zh: '下午', pinyin: 'xiàwǔ',    tones: [4, 3], hu: 'délután' },
  { zh: '电影', pinyin: 'diànyǐng', tones: [4, 3], hu: 'film' },
  { zh: '电脑', pinyin: 'diànnǎo',  tones: [4, 3], hu: 'számítógép' },
  { zh: '再见', pinyin: 'zàijiàn',  tones: [4, 4], hu: 'viszlát' },
  { zh: '汉字', pinyin: 'Hànzì',    tones: [4, 4], hu: 'kínai írásjegy' },
  { zh: '电视', pinyin: 'diànshì',  tones: [4, 4], hu: 'televízió' }
];
