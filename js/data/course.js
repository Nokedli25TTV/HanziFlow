/* ====================================================
   HANZIFLOW — course.js: a leckék
   ----------------------------------------------------
   Saját leckék a HSK 1 szint témáinak és nyelvtani sorrendjének
   nyomán. A magyarázatok, a párbeszédek, a példamondatok és a
   kérdések saját szövegek (könyvből nem másolunk).

   Kínai szöveg jelölése: {汉字|hàn·zì} → a képernyőn a hanzi fölött a
   pinyin, a felolvasás az írásjegyeket kapja. Egy jelölés = egy szó.
   A példák pinyin-sora a jelölésből áll össze (pinyin mező csak akkor
   kell, ha ettől eltérne). A lead és a cando sima szöveg (jelölés nélkül).

   Egy lecke mezői:
     id, no, badge?, kicker, label?, title, lead, cando[], ownOnly?
     intro[]                       a lecke elején: miről szól (HTML is lehet)
     dialogue { title, scene, lines: [{ who, zh, hu, note? }], notes[] }
     points[]  nyelvtani pontok: { title, sub, pattern, body, more[], tables[{ caption, head[], rows[][] }],
               notes[], examples[{ zh, hu, note? }], mistakes[{ bad, good, why }], tip }
     phrases[] { zh, hu }          kész fordulatok
     words[]   { title, note?, items: [{ zh, pinyin, hu }] }   — a szó-kártya pinyinje külön mezőben
     culture[] { title, text }
     reading   { title, titleHu, text: [{ zh, hu, par? }], words?: [{ zh, hu }], questions: [{ q, a, wrong[3], why }] }
     quiz[]    { q, zh?, a, wrong[3], why, point? }   — a `point` a nyelvtani pont sorszáma (1-től)
   🔴 A quiz tömb sorrendje azonosító (az ismétlés-ütemező kulcsa): új kérdés csak a végére.
   ==================================================== */

const HANZIFLOW_COURSE = [

/* ════════════════════════════════════════════════════
   ELŐKÉSZÍTŐ — a pinyin és a négy tónus
   ════════════════════════════════════════════════════ */
{
  id: 'l0', no: 0, badge: '音', kicker: 'Előkészítő', label: 'Előkészítő lecke',
  title: 'A pinyin és a négy tónus',
  lead: 'Mielőtt az első szót kimondod: hogyan épül fel egy kínai szótag, mit jelentenek a pinyin betűi, és miért számít, milyen dallammal ejted.',
  cando: [
    'Tudod, hogy egy kínai szótag kezdőhangból, véghangból és tónusból áll.',
    'Ki tudod ejteni a pinyin trükkös betűit: q, x, zh, c, ü, e.',
    'Felismered a négy tónus jelét, és tudod, melyik milyen dallam.',
    'Tudod, mit jelent a semleges (hangsúlytalan) tónus.'
  ],
  ownOnly: true,
  intro: [
    'A kínai írás nem betűkből áll: minden <b>írásjegy</b> (hanzi) egy szótagot és egy jelentést jelöl. Az írásjegyből viszont nem látszik, hogyan kell kiejteni. Ezért a tanuláshoz egy latin betűs átírást használunk: ez a <b>pinyin</b> (szó szerint „hangok összerakása").',
    'A pinyint Kínában is mindenki ismeri: ebből tanulnak olvasni a gyerekek, a szótárak ezt adják meg, és a telefonon is pinyinnel gépelnek írásjegyet. Neked is ez lesz az első kapaszkodó: a HanziFlow minden kínai szó fölé odaírja.',
    'Egy figyelmeztetés: a pinyin betűi <b>nem a magyar kiejtést</b> jelölik. A <i>q</i> nem „kú", az <i>x</i> nem „iksz", a <i>c</i> nem a magyar „c". Ebben a leckében sorra vesszük, mi mit jelent, magyar füllel elmagyarázva.'
  ],
  points: [
    {
      title: '{妈|mā}', sub: 'egy szótag = kezdőhang + véghang + tónus',
      pattern: 'm + a + ˉ  →  mā',
      body: 'Minden kínai szótag három részből áll: egy <b>kezdőhangból</b> (mássalhangzó az elején, ez el is maradhat), egy <b>véghangból</b> (magánhangzó, utána esetleg <i>n</i> vagy <i>ng</i>) és egy <b>tónusból</b>, vagyis a hang dallamából. A {妈|mā} („anya") szótagban a kezdőhang <i>m</i>, a véghang <i>a</i>, a tónus az első (magas, egyenletes).',
      more: [
        'A mandarinban mindössze kb. 400-féle szótag van (a magyarban ennek sokszorosa). Ezért sok szó hangzik egyformán, és a tónus segít megkülönböztetni őket. Egy szótag egymagában is gyakran egész szó, a legtöbb szó azonban két szótagból (két írásjegyből) áll.',
        'A szótag végén csak magánhangzó, <i>n</i> vagy <i>ng</i> állhat (a <i>-r</i>-es pekingi ejtés különleges eset, később jön). Nincs olyan szótag, amely <i>-k</i>, <i>-t</i> vagy <i>-p</i> hangra végződne.'
      ],
      tables: [
        { caption: 'Néhány szótag a részeire bontva',
          head: ['Szótag', 'Kezdőhang', 'Véghang', 'Tónus', 'Jelentés'],
          rows: [
            ['{妈|mā}', 'm', 'a', '1.', 'anya'],
            ['{好|hǎo}', 'h', 'ao', '3.', 'jó'],
            ['{中|zhōng}', 'zh', 'ong', '1.', 'közép'],
            ['{二|èr}', '—', 'er', '4.', 'kettő'],
            ['{学|xué}', 'x', 'üe (írva: ue)', '2.', 'tanulni']
          ] }
      ],
      notes: [
        'A pinyint <b>szavanként</b> egybeírjuk: {中国|Zhōng·guó} „Kína", {老师|lǎo·shī} „tanár". A tulajdonnevek nagy kezdőbetűt kapnak.',
        'Ha egy szótag magánhangzóval kezdődik, és összeolvadhatna az előzővel, aposztróf választja el: {女儿|nǚ\'ér} „lánya valakinek".'
      ],
      examples: [
        { zh: '{妈|mā}', hu: 'anya' },
        { zh: '{好|hǎo}', hu: 'jó' },
        { zh: '{中国|Zhōng·guó}', hu: 'Kína' },
        { zh: '{学生|xué·sheng}', hu: 'diák' }
      ],
      tip: 'Szokj hozzá, hogy a kínai szót mindig a tónusával együtt tanulod meg: a <i>ma</i> egymagában nem szó, csak a <i>mā</i>, <i>má</i>, <i>mǎ</i> vagy <i>mà</i>.'
    },
    {
      title: 'b p · d t · g k', sub: 'a kezdőhangok, és a „levegős" párok',
      pattern: 'b – p   d – t   g – k   z – c   zh – ch   j – q',
      body: 'A legfontosabb különbség a kínai mássalhangzók között nem a zöngésség (mint a magyar <i>b–p</i>), hanem az, hogy <b>kijön-e utánuk egy erős levegőfújás</b>. A pinyin <i>b, d, g</i> valójában olyan, mint a magyar <i>p, t, k</i>: zöngétlen, de levegő nélküli. A pinyin <i>p, t, k</i> ugyanez, csak utána egy határozott „h"-szerű fuvallat jön ki, mint az angol <i>pen</i> vagy a német <i>Tag</i> szó elején.',
      more: [
        'Próba: tarts egy papírlapot a szád elé. A <i>bā</i> ({八|bā} „nyolc") kiejtésekor a lap alig mozdul, a <i>pā</i> kiejtésekor meglebben. Ugyanez a pár: <i>d–t</i>, <i>g–k</i>, <i>z–c</i>, <i>zh–ch</i>, <i>j–q</i>.',
        'A többi kezdőhangnál a magyar fülnek három csoport okoz gondot: a <i>j, q, x</i> (a nyelv hegye az alsó fogaknál), a <i>zh, ch, sh, r</i> (a nyelv hegye hátrahajlítva a szájpadlás felé) és a <i>z, c, s</i> (a nyelv hegye a felső fogaknál).'
      ],
      tables: [
        { caption: 'A kezdőhangok magyar füllel',
          head: ['Pinyin', 'Hogyan ejtsd', 'Példa'],
          rows: [
            ['b · d · g', 'mint a magyar p, t, k (levegő nélkül)', '{八|bā} nyolc · {大|dà} nagy · {哥|gē} báty'],
            ['p · t · k', 'p, t, k erős levegőfújással', '{怕|pà} félni · {他|tā} ő · {口|kǒu} száj'],
            ['m · f · n · l', 'mint a magyarban', '{妈|mā} anya · {你|nǐ} te'],
            ['h', 'erős, hátul képzett h, mint a német „ach"', '{好|hǎo} jó · {喝|hē} inni'],
            ['j', 'lágy, zöngétlen „gy"/„ty" a nyelv hegyével lent', '{几|jǐ} hány · {家|jiā} otthon'],
            ['q', 'ugyanez erős levegővel, „cs"-szerű', '{七|qī} hét (7) · {去|qù} menni'],
            ['x', 'a „sz" és az „s" közötti lágy sziszegés', '{谢|xiè} köszönni · {学|xué} tanulni'],
            ['zh', '„dzs", a nyelv hegye hátrahajlítva', '{中|zhōng} közép'],
            ['ch', '„cs", hátrahajlított nyelvvel, levegővel', '{吃|chī} enni · {茶|chá} tea'],
            ['sh', '„s", hátrahajlított nyelvvel', '{是|shì} lenni · {书|shū} könyv'],
            ['r', 'a „zs" és az angol r között', '{人|rén} ember · {热|rè} meleg'],
            ['z', 'zöngétlen „dz", levegő nélkül', '{字|zì} írásjegy · {在|zài} -ban/-ben'],
            ['c', 'a magyar „c" erős levegővel', '{菜|cài} étel · {从|cóng} -tól'],
            ['s', 'mint a magyar „sz"', '{三|sān} három · {四|sì} négy']
          ] }
      ],
      notes: [
        'Magyarul régebben a kínai neveket magyaros átírással írták: Peking = <i>Běijīng</i>, Hszi = <i>Xí</i>, Csou = <i>Zhōu</i>. A HanziFlow mindenhol a nemzetközi pinyint használja, mert a szótárak és a kínai billentyűzet is ezt értik.',
        'A <i>j, q, x</i> után sosem áll <i>a, o, e</i> közvetlenül, csak <i>i</i> vagy <i>ü</i>: <i>ji, jia, jie, ju (=jü)</i>. Ezt ki lehet használni: ha <i>j, q, x</i> után <i>u</i>-t látsz, az valójában <i>ü</i>.'
      ],
      examples: [
        { zh: '{八|bā}', hu: 'nyolc' },
        { zh: '{他|tā}', hu: 'ő (férfi)' },
        { zh: '{七|qī}', hu: 'hét (7)' },
        { zh: '{谢谢|xiè·xie}', hu: 'köszönöm' },
        { zh: '{吃|chī}', hu: 'enni' },
        { zh: '{四|sì}', hu: 'négy' }
      ],
      mistakes: [
        { bad: 'q = „kú"', good: '{七|qī} = „csí", levegővel', why: 'A pinyin <i>q</i> egy levegős „cs"-szerű hang, semmi köze a magyar <i>k</i>-hoz.' },
        { bad: 'c = magyar „c" levegő nélkül', good: '{菜|cài}: „c" + erős fuvallat', why: 'A <i>c</i> a levegős párja a <i>z</i>-nek; a magyar <i>c</i>-hez képest erősebben fújva ejtsd.' }
      ],
      tip: 'Ha bizonytalan vagy, a <i>b–p, d–t, g–k</i> párnál gondolj arra, hogy a magyar <i>p, t, k</i> „félúton" van: a kínai <i>b, d, g</i> pontosan ilyen, a <i>p, t, k</i> pedig még egy kis levegőt kap.'
    },
    {
      title: 'a o e i u ü', sub: 'a véghangok, és amire figyelni kell',
      pattern: 'a · o · e · i · u · ü  +  -n / -ng',
      body: 'A véghang (a szótag magánhangzós része) egy vagy több magánhangzó, utána esetleg <i>-n</i> vagy <i>-ng</i>. A legtöbb magyarul is jól kiejthető, de néhányra figyelj: a kínai <b>a</b> nyílt, világos hang, inkább a rövid „á"-hoz hasonlít, mint a magyar „a"-hoz; az <b>e</b> önmagában egy ajakkerekítés nélküli, hátul képzett hang, mintha „ö"-t mondanál széthúzott szájjal; az <b>ü</b> pontosan a magyar „ü".',
      more: [
        'Az <i>-n</i> és az <i>-ng</i> két külön hang: {三|sān} „három" ↔ {上|shàng} „fent". Az <i>-ng</i> olyan, mint a magyar „hang" szó végén, de a <i>g</i> nem hallatszik külön.',
        'A <i>z, c, s</i> és a <i>zh, ch, sh, r</i> után álló <b>-i nem „i"</b>: a nyelv a mássalhangzó helyén marad, és egy rövid zümmögés hallatszik. A {四|sì} „négy" tehát nem „szí", hanem inkább „sz" + zümmögő magánhangzó.',
        'Ha a szótag <i>i</i>-vel, <i>u</i>-val vagy <i>ü</i>-vel kezdődne, a pinyin <i>y</i>-t vagy <i>w</i>-t ír elé: <i>yi, ya, ye, you</i> · <i>wu, wo, wei</i> · <i>yu, yue, yuan</i> (ez utóbbiakban az <i>u</i> = <i>ü</i>).'
      ],
      tables: [
        { caption: 'A gyakori véghangok',
          head: ['Pinyin', 'Hogyan ejtsd', 'Példa'],
          rows: [
            ['a', 'nyílt, rövid „á"', '{八|bā} nyolc'],
            ['e', 'széthúzott szájjal ejtett „ö"', '{喝|hē} inni'],
            ['ai · ei', '„áj" · „éj"', '{爱|ài} szeretni · {美|měi} szép'],
            ['ao · ou', '„áu" · „ou"', '{好|hǎo} jó · {口|kǒu} száj'],
            ['an · ang', '„án" · „áng"', '{三|sān} három · {忙|máng} elfoglalt'],
            ['en · eng', 'rövid „ön" · „öng"', '{人|rén} ember · {冷|lěng} hideg'],
            ['ong', '„ung"', '{中|zhōng} közép'],
            ['ian', '„jen" (nem „ján"!)', '{天|tiān} ég, nap'],
            ['iu', '„jou"', '{六|liù} hat'],
            ['ui', '„uej"', '{对|duì} helyes'],
            ['un', '„uen"', '{问|wèn} kérdezni (w + en)'],
            ['ü · üe', '„ü" · „üe"', '{女|nǚ} nő · {学|xué} tanulni']
          ] }
      ],
      notes: [
        'Az <i>iu</i>, <i>ui</i> és <i>un</i> rövidített írásmód: teljes alakjuk <i>iou</i>, <i>uei</i>, <i>uen</i>, és így is hangzanak.',
        'Az <i>er</i> külön véghang: {二|èr} „kettő", {儿|ér} „gyermek". A nyelv hegye ilyenkor hátrahajlik.'
      ],
      examples: [
        { zh: '{喝|hē}', hu: 'inni' },
        { zh: '{天|tiān}', hu: 'ég, nap' },
        { zh: '{六|liù}', hu: 'hat' },
        { zh: '{女|nǚ}', hu: 'nő' },
        { zh: '{人|rén}', hu: 'ember' }
      ],
      mistakes: [
        { bad: 'tian = „tján"', good: '{天|tiān} ≈ „tjen"', why: 'Az <i>i</i> és az <i>n</i> között az <i>a</i> „e"-re zárul: <i>ian</i> = „jen", <i>yan</i> = „jen".' },
        { bad: 'si = „szí"', good: '{四|sì} ≈ „sz" + zümmögés', why: 'A <i>z, c, s, zh, ch, sh, r</i> utáni <i>-i</i> nem valódi „i".' }
      ]
    },
    {
      title: 'mā · má · mǎ · mà', sub: 'a négy tónus',
      pattern: '1. ā magas · 2. á emelkedő · 3. ǎ mély · 4. à eső',
      body: 'A <b>tónus</b> a szótag dallama, és a kínaiban jelentést hordoz: {妈|mā} „anya", {麻|má} „kender", {马|mǎ} „ló", {骂|mà} „szidni". A magyarban a dallam csak a mondat hangulatát változtatja (kérdés, csodálkozás), a kínaiban viszont minden szótagnak saját, rögzített dallama van.',
      more: [
        '<b>1. tónus (ˉ)</b>: magasan kezded és végig ott tartod, mintha énekelnél egy hosszú hangot. <b>2. tónus (ˊ)</b>: középről felfelé emelkedik, mint a csodálkozó kérdés: „Igen?" <b>3. tónus (ˇ)</b>: lemegy a hangod aljára; egymagában a végén kicsit vissza is jön, mondatban többnyire mélyen marad. <b>4. tónus (ˋ)</b>: fentről határozottan leesik, mint egy kurta „Nem!".',
        'A tónusjel mindig a magánhangzóra kerül. Ha több magánhangzó van, a sorrend: <i>a</i>, ha nincs, akkor <i>o</i> vagy <i>e</i>; az <i>iu</i> és <i>ui</i> párban a második kapja: {六|liù}, {对|duì}. Az <i>i</i> pontja eltűnik a jel alatt: <i>nǐ</i>.'
      ],
      tables: [
        { caption: 'A négy tónus egy pillantásra',
          head: ['Tónus', 'Jel', 'Dallam', 'Példa'],
          rows: [
            ['1.', 'ā', 'magas, egyenletes', '{妈|mā} anya · {八|bā} nyolc'],
            ['2.', 'á', 'emelkedő', '{麻|má} kender · {十|shí} tíz'],
            ['3.', 'ǎ', 'mély (lebukó)', '{马|mǎ} ló · {五|wǔ} öt'],
            ['4.', 'à', 'éles, eső', '{骂|mà} szidni · {四|sì} négy']
          ] }
      ],
      notes: [
        'A tónust nem kell „énekelni": elég, ha a dallam iránya jó. A saját hangterjedelmedben gondolkodj: az 1. tónus a te magas hangod, a 3. a te mély hangod.',
        'Gyakorlásnál a számok segítenek: <i>ma1 ma2 ma3 ma4</i>. Ezt a jelölést sok szótár és billentyűzet is ismeri.'
      ],
      examples: [
        { zh: '{妈|mā}', hu: 'anya' },
        { zh: '{麻|má}', hu: 'kender' },
        { zh: '{马|mǎ}', hu: 'ló' },
        { zh: '{骂|mà}', hu: 'szidni' },
        { zh: '{买|mǎi}', hu: 'venni' },
        { zh: '{卖|mài}', hu: 'eladni' }
      ],
      mistakes: [
        { bad: 'mǎi = mài', good: '{买|mǎi} venni ↔ {卖|mài} eladni', why: 'Csak a tónus különbözteti meg őket: ha rossz tónussal mondod, épp az ellenkezőjét mondhatod.' }
      ],
      tip: 'A tónust a szóval együtt, hallás után tanuld. A Tónus-tréner (következő lépés) pontosan erre való.'
    },
    {
      title: '{妈妈|mā·ma}', sub: 'a semleges tónus',
      pattern: 'ékezet nélküli szótag = rövid, hangsúlytalan',
      body: 'Egyes szótagok nem kapnak tónust: röviden, könnyedén, hangsúly nélkül hangzanak. Ez a <b>semleges tónus</b>, és a pinyin nem tesz rá ékezetet. Leggyakrabban a megkettőzött szavak második szótagja ({妈妈|mā·ma} „anya", {谢谢|xiè·xie} „köszönöm"), a nyelvtani szócskák ({吗|ma} kérdőszócska, {们|men} többesszám-jel) és egyes kéttagú szavak vége ({学生|xué·sheng} „diák").',
      more: [
        'A semleges szótag magassága az előtte álló tónustól függ: 1., 2. és 4. tónus után kicsit lejjebb kerül, 3. tónus után kicsit feljebb. Ezt nem kell külön megtanulni: elég, ha rövidre és gyengére ejted.'
      ],
      examples: [
        { zh: '{妈妈|mā·ma}', hu: 'anya' },
        { zh: '{爸爸|bà·ba}', hu: 'apa' },
        { zh: '{谢谢|xiè·xie}', hu: 'köszönöm' },
        { zh: '{你们|nǐ·men}', hu: 'ti' }
      ],
      tip: 'Ha egy szónál a második szótagon nincs ékezet, ne hagyd el, csak „nyeld le" félig: <i>xiè-xie</i>, nem <i>xiè-xiè</i>.'
    }
  ],
  phrases: [],
  words: [
    { title: 'A lecke példaszavai', note: 'Ezeket még nem kell megtanulnod: most csak a kiejtésüket figyeld.',
      items: [
        { zh: '{妈|mā}', pinyin: 'mā', hu: 'anya' },
        { zh: '{马|mǎ}', pinyin: 'mǎ', hu: 'ló' },
        { zh: '{八|bā}', pinyin: 'bā', hu: 'nyolc' },
        { zh: '{七|qī}', pinyin: 'qī', hu: 'hét (7)' },
        { zh: '{四|sì}', pinyin: 'sì', hu: 'négy' },
        { zh: '{人|rén}', pinyin: 'rén', hu: 'ember' },
        { zh: '{中国|Zhōng·guó}', pinyin: 'Zhōngguó', hu: 'Kína' },
        { zh: '{谢谢|xiè·xie}', pinyin: 'xièxie', hu: 'köszönöm' }
      ] }
  ],
  culture: [
    { title: 'Mandarin, putonghua, „kínai"', text: 'Amit „kínai nyelvként" tanulunk, az a <b>mandarin</b>, Kína hivatalos köznyelve: Kínában {普通话|pǔ·tōng·huà} („közös nyelv"), Tajvanon {国语|guó·yǔ}, Szingapúrban {华语|huá·yǔ} a neve. Kínában sok más nyelvváltozatot is beszélnek (a kantonit vagy a sanghajit például a mandarin beszélője nem érti), de az iskola, a tévé és a hivatal nyelve mindenhol a mandarin.' },
    { title: 'Egyszerűsített és hagyományos írás', text: 'Az 1950-es években Kínában sok írásjegyet leegyszerűsítettek: a „ló" hagyományosan {馬|mǎ}, egyszerűsítve {马|mǎ}. A HanziFlow az <b>egyszerűsített</b> írást tanítja, mert ezt használják Kínában és a HSK-vizsgán. A hagyományos írás Tajvanon és Hongkongban él tovább.' }
  ],
  quiz: [
    { q: 'Melyik három részből áll egy kínai szótag?', a: 'kezdőhang, véghang és tónus', wrong: ['magánhangzó, mássalhangzó, hangsúly', 'írásjegy, pinyin és jelentés', 'gyök, toldalék és tónus'], why: 'Például {妈|mā}: <i>m</i> (kezdőhang) + <i>a</i> (véghang) + 1. tónus.', point: 1 },
    { q: 'Mi a pinyin?', a: 'a kínai kiejtés hivatalos latin betűs átírása', wrong: ['a kínai írásjegyek egyszerűsített formája', 'egy kínai nyelvjárás', 'a tónusok neve'], why: 'A pinyin a szótárakban, a tankönyvekben és a telefonos gépelésben is ott van.', point: 1 },
    { q: 'Mi a különbség a pinyin b és p között?', a: 'a p után erős levegőfújás jön, a b után nem', wrong: ['a b zöngés, a p zöngétlen, mint a magyarban', 'a p hosszabb, mint a b', 'nincs különbség, csak az írás más'], why: 'A kínai b olyan, mint a magyar p; a kínai p ehhez képest még egy fuvallatot kap.', point: 2 },
    { q: 'Melyik hanghoz hasonlít leginkább a pinyin q?', a: 'egy levegős „cs"-hez', wrong: ['a magyar k-hoz', 'a magyar kv-hez', 'a magyar g-hez'], why: '{七|qī} „hét": a nyelv hegye lent van, és erős levegő jön ki.', point: 2 },
    { q: 'Hogyan ejtsd a pinyin x hangot?', a: 'a „sz" és az „s" közötti lágy sziszegésként', wrong: ['„ksz"-ként, ahogy a magyar szavakban', 'zöngésen, mint a magyar „zs" hangot', 'hátul, a torokban, mint a német „ch"-t'], why: '{谢谢|xiè·xie}: lágy, a nyelv hegye az alsó fogaknál.', point: 2 },
    { q: 'Melyik hangpár között NEM a levegőfújás a különbség?', a: 's – sh', wrong: ['d – t', 'z – c', 'g – k'], why: 'Az <i>s</i> és az <i>sh</i> a nyelv helyzetében különbözik (az <i>sh</i>-nál a nyelv hegye hátrahajlik).', point: 2 },
    { q: 'Hogyan hangzik a pinyin ian (pl. {天|tiān})?', a: '„jen"', wrong: ['„ján"', '„ion"', '„ien" két szótagban'], why: 'Az <i>i</i> és az <i>n</i> között az <i>a</i> „e"-vé zárul.', point: 3 },
    { q: 'Mit jelöl a j, q, x után írt u (pl. qu, xue)?', a: 'valójában ü-t', wrong: ['valódi u-t', 'hosszú ú-t', 'semleges tónust'], why: 'A <i>j, q, x</i> után sosem állhat <i>u</i>, ezért az ü pontjait elhagyják: <i>qu</i> = „csü".', point: 3 },
    { q: 'Milyen a 4. tónus dallama?', a: 'fentről határozottan leeső', wrong: ['magas, egyenletes', 'középről emelkedő', 'mélyre lebukó'], why: '{四|sì} „négy", {是|shì} „lenni": kurta, eső dallam.', point: 4 },
    { q: 'Melyik a 3. tónus jele?', a: 'ǎ', wrong: ['ā', 'á', 'à'], why: 'A 3. tónus jele egy kis „pipa" (ˇ): {马|mǎ} „ló".', point: 4 },
    { q: '{马|mǎ} — mit jelent?', a: 'ló', wrong: ['anya', 'kender', 'szidni'], why: '{妈|mā} anya · {麻|má} kender · {马|mǎ} ló · {骂|mà} szidni.', point: 4 },
    { q: 'Melyik magánhangzó kapja a tónusjelet a hǎo szótagban?', a: 'az a', wrong: ['az o', 'a h', 'mindkét magánhangzó'], why: 'Ha van <i>a</i> a szótagban, mindig az kapja a jelet.', point: 4 },
    { q: 'Mit jelent, ha egy szótagon nincs tónusjel (pl. {妈妈|mā·ma} második fele)?', a: 'semleges tónusú: röviden, hangsúly nélkül ejted', wrong: ['1. tónusú: magasan és hosszan ejted', 'bármelyik tónussal ejtheted, ahogy tetszik', 'néma: írásban áll, de nem ejted ki'], why: 'A semleges tónus rövid és gyenge: <i>mā-ma</i>.', point: 5 },
    { q: 'Melyik írásmódot tanítja a HanziFlow?', a: 'az egyszerűsítettet, ahogy Kínában írnak', wrong: ['a hagyományosat, ahogy Tajvanon írnak', 'mindkettőt egyszerre', 'csak a pinyint, írásjegyek nélkül'], why: 'Kínában és a HSK-vizsgán az egyszerűsített írás az alap.' },
    { q: 'Hogyan ejtsd az e véghangot (pl. {喝|hē})?', a: 'mint egy széthúzott szájjal ejtett „ö"-t', wrong: ['pontosan úgy, mint a magyar „e"-t', 'zártan, mint a magyar hosszú „é"-t', 'röviden, mint a magyar „i"-t'], why: 'Az önálló <i>e</i> hátul képzett, ajakkerekítés nélküli hang.', point: 3 },
    { q: 'Melyik szóban van semleges tónusú szótag?', a: '{学生|xué·sheng}', wrong: ['{中国|Zhōng·guó}', '{老师|lǎo·shī}', '{北京|Běi·jīng}'], why: 'A {学生|xué·sheng} második szótagján nincs ékezet: röviden, hangsúly nélkül ejted.', point: 5 }
  ]
},

/* ════════════════════════════════════════════════════
   1. LECKE — 你好 (köszönés)
   ════════════════════════════════════════════════════ */
{
  id: 'l1', no: 1, kicker: 'HSK 1 · 1. lecke',
  title: 'Szia! — köszönés és bocsánatkérés',
  lead: 'Az első mondatok kínaiul: köszönni egy barátnak, egy tanárnak, egy egész csoportnak, és bocsánatot kérni, ha valakinek nekimentél.',
  cando: [
    'Tudsz köszönni barátnak (你好) és udvariasan, idősebbnek (您好).',
    'Egyszerre több embert is üdvözölsz (你们好).',
    'Bocsánatot kérsz (对不起), és válaszolsz rá (没关系).',
    'Tudod, hogyan hangzik két egymást követő 3. tónus.'
  ],
  intro: [
    'Ebben a leckében hat szót tanulsz, de ezekkel már valódi helyzetekben is megállod a helyed. A legfontosabb a {你好|nǐ hǎo}: szó szerint „te jó", és a napszaktól függetlenül bármikor használható köszönés.',
    'A lecke másik fele kiejtés: a {你好|nǐ hǎo} két 3. tónusú szótagból áll, és ilyenkor a kínai nem úgy ejti, ahogy írja. Ez az első tónus-szabály, amellyel találkozol, és nagyon gyakori.'
  ],
  dialogue: {
    title: 'Az első nap a nyelviskolában',
    scene: 'Anna, egy budapesti egyetemista, belép a pekingi nyelviskola folyosójára. Egy kínai diák, Wang Ming jön vele szemben.',
    lines: [
      { who: 'Wang Ming', zh: '{你好|nǐ hǎo}！', hu: 'Szia!' },
      { who: 'Anna', zh: '{你好|nǐ hǎo}！', hu: 'Szia!' },
      { who: 'Zhang tanárnő', zh: '{你们好|nǐ·men hǎo}！', hu: 'Jó napot, gyerekek! (Sziasztok!)', note: 'A tanárnő egyszerre köszön mindkettőjüknek: {你们|nǐ·men} „ti".' },
      { who: 'Anna', zh: '{您好|nín hǎo}！', hu: 'Jó napot kívánok!', note: 'Annának a tanárnő idősebb, és tanár: neki az udvarias {您|nín} jár.' },
      { who: 'Anna', zh: '{对不起|duì·bu·qǐ}！', hu: 'Elnézést! (Bocsánat!)', note: 'Anna sietve hátrál, és véletlenül meglöki Wang Minget.' },
      { who: 'Wang Ming', zh: '{没关系|méi guān·xi}。', hu: 'Semmi baj.' }
    ],
    notes: [
      'A {你好|nǐ hǎo}-ra a válasz egyszerűen {你好|nǐ hǎo}. Nincs külön „jó reggelt", „jó estét" kötelező formája: a {你好|nǐ hǎo} egész nap jó.',
      'A tanár köszönésére a diákok kórusban felelnek: {老师好|lǎo·shī hǎo} „Jó napot, tanár úr / tanárnő!" — a megszólítás + {好|hǎo} minta nagyon gyakori.',
      'A {没关系|méi guān·xi} szó szerint „nincs kapcsolat / nincs jelentősége": így válaszolsz egy bocsánatkérésre.'
    ]
  },
  points: [
    {
      title: '{你好|nǐ hǎo}', sub: 'köszönés: „szia", „jó napot"',
      pattern: '{你|nǐ} + {好|hǎo}',
      body: 'A {你|nǐ} jelentése „te", a {好|hǎo} jelentése „jó". Együtt a leggyakoribb kínai köszönés, amelyet ismeretlennek és ismerősnek, reggel és este egyaránt mondhatsz. Válaszként ugyanezt mondod vissza.',
      more: [
        'A minta — <b>valaki + {好|hǎo}</b> — más megszólítással is működik: {老师好|lǎo·shī hǎo} „Jó napot, tanárnő!", {大家好|dà·jiā hǎo} „Jó napot mindenkinek!". A köszönés így mindig a megszólított személyre szabott.',
        'Közeli ismerősök között a {你好|nǐ hǎo} kissé hivatalosnak is hathat: barátok inkább a nevet mondják, vagy rákérdeznek valamire („Mész valahová?"). Kezdőként viszont mindig jó választás.'
      ],
      examples: [
        { zh: '{你好|nǐ hǎo}！', hu: 'Szia! / Jó napot!' },
        { zh: '{老师|lǎo·shī}{好|hǎo}！', hu: 'Jó napot, tanárnő!' },
        { zh: '{大家|dà·jiā}{好|hǎo}！', hu: 'Jó napot mindenkinek!' }
      ],
      tip: 'A {你好|nǐ hǎo} <b>nem</b> kérdés („Jól vagy?"), csak köszönés. Arra, hogy hogy vagy, később egy külön fordulat jön.'
    },
    {
      title: '{您|nín}', sub: 'az udvarias „ön"',
      pattern: '{您好|nín hǎo}',
      body: 'A {您|nín} a {你|nǐ} udvarias változata, olyan, mint a magyar „ön" vagy „maga". Idősebbeknek, tanárnak, hivatalos helyzetben, vásárlónak, vendégnek mondod. Az írásjegyben a {你|nǐ} alatt egy {心|xīn} „szív" áll: „te, szívből".',
      more: [
        'A kínai a magyarnál ritkábban magáz: barátok, osztálytársak, kollégák egymás közt a {你|nǐ}-t használják. A {您|nín} főleg köszönéskor és udvarias kérésekben jön elő.',
        'Fontos: a {您|nín}-nek nincs többes száma. Ha több embert szólítasz meg udvariasan, a {你们|nǐ·men} vagy egy megszólítás ({各位|gè·wèi} „hölgyeim és uraim") jön.'
      ],
      examples: [
        { zh: '{您好|nín hǎo}！', hu: 'Jó napot kívánok!' },
        { zh: '{老师|lǎo·shī}，{您好|nín hǎo}！', hu: 'Tanárnő, jó napot kívánok!' }
      ],
      mistakes: [
        { bad: '{您们好|nín·men hǎo}', good: '{你们好|nǐ·men hǎo}', why: 'A {您|nín} egyes számú: több embert {你们|nǐ·men}-nel köszöntesz.' }
      ]
    },
    {
      title: '{你们|nǐ·men}', sub: 'ti — a {们|men} többes szám',
      pattern: '{你|nǐ} + {们|men} = {你们|nǐ·men}',
      body: 'A {们|men} egy rövid, semleges tónusú toldalék, amely a személyes névmást többes számba teszi: {你|nǐ} „te" → {你们|nǐ·men} „ti". Ugyanígy: {我|wǒ} „én" → {我们|wǒ·men} „mi", {他|tā} „ő" → {他们|tā·men} „ők".',
      more: [
        'A kínai főnévnek nincs kötelező többes száma: {书|shū} lehet „könyv" és „könyvek" is. A {们|men} főleg névmások és embereket jelentő szavak után áll: {同学们|tóng·xué·men} „diáktársak".'
      ],
      tables: [
        { caption: 'Személyes névmások',
          head: ['', 'Egyes szám', 'Többes szám'],
          rows: [
            ['1. személy', '{我|wǒ} én', '{我们|wǒ·men} mi'],
            ['2. személy', '{你|nǐ} te · {您|nín} ön', '{你们|nǐ·men} ti'],
            ['3. személy', '{他|tā} ő · {她|tā} ő (nő)', '{他们|tā·men} ők']
          ] }
      ],
      examples: [
        { zh: '{你们|nǐ·men}{好|hǎo}！', hu: 'Sziasztok! (Jó napot nektek!)' },
        { zh: '{我们|wǒ·men}', hu: 'mi' }
      ]
    },
    {
      title: '{对不起|duì·bu·qǐ} · {没关系|méi guān·xi}', sub: 'bocsánatkérés és válasz',
      pattern: '{对不起|duì·bu·qǐ}！ — {没关系|méi guān·xi}。',
      body: 'A {对不起|duì·bu·qǐ} a leggyakoribb bocsánatkérés: „Elnézést, sajnálom". Akkor mondod, ha valamit elrontottál, késtél, vagy valakinek nekimentél. A válasz rá a {没关系|méi guān·xi}: „Semmi baj, nem gond."',
      more: [
        'A {对不起|duì·bu·qǐ} középső szótagja semleges tónusú, ezért gyorsan hangzik: <i>duì-bu-qǐ</i>. A {没关系|méi guān·xi} utolsó szótagja is semleges.',
        'Ha valakit csak meg akarsz szólítani („Elnézést, merre van…?"), arra nem a {对不起|duì·bu·qǐ} a legjobb, hanem a {请问|qǐng·wèn} „szabad kérdeznem" — ezt egy későbbi leckében tanulod.'
      ],
      examples: [
        { zh: '{对不起|duì·bu·qǐ}！', hu: 'Elnézést! Bocsánat!' },
        { zh: '{没关系|méi guān·xi}。', hu: 'Semmi baj.' },
        { zh: '{老师|lǎo·shī}，{对不起|duì·bu·qǐ}！', hu: 'Tanárnő, elnézést!' }
      ],
      mistakes: [
        { bad: '{对不起|duì·bu·qǐ}！ — {不客气|bú kè·qi}。', good: '{对不起|duì·bu·qǐ}！ — {没关系|méi guān·xi}。', why: 'A {不客气|bú kè·qi} („szívesen") a köszönetre válasz, nem a bocsánatkérésre.' }
      ]
    },
    {
      title: '{你好|nǐ hǎo} → ní hǎo', sub: 'két 3. tónus egymás után',
      pattern: '3. + 3. tónus  →  2. + 3. tónus',
      body: 'Ha két 3. tónusú szótag kerül egymás mellé, az elsőt <b>2. tónussal</b> (emelkedő dallammal) ejted: {你好|nǐ hǎo} hangzása tehát „ní hǎo". Az írás ettől nem változik: a pinyin továbbra is <i>nǐ hǎo</i>, a szabályt csak kiejtéskor alkalmazod.',
      more: [
        'A szabály minden 3+3 párra érvényes: {很好|hěn hǎo} „nagyon jó" → „hén hǎo", {可以|kě·yǐ} „lehet" → „kéyǐ", {水果|shuǐ·guǒ} „gyümölcs" → „shuíguǒ".',
        'Miért? Két mély, lebukó dallamot egymás után nehéz kiejteni, ezért az első „felkapaszkodik". Ezt a beszélők nem tudatosan teszik: ha sokat hallgatod, magától jön.'
      ],
      tables: [
        { caption: 'Írás és kiejtés',
          head: ['Szó', 'Pinyin (írva)', 'Hangzik', 'Jelentés'],
          rows: [
            ['{你好|nǐ hǎo}', 'nǐ hǎo', 'ní hǎo', 'szia'],
            ['{很好|hěn hǎo}', 'hěn hǎo', 'hén hǎo', 'nagyon jó'],
            ['{可以|kě·yǐ}', 'kěyǐ', 'kéyǐ', 'lehet, szabad'],
            ['{水果|shuǐ·guǒ}', 'shuǐguǒ', 'shuíguǒ', 'gyümölcs']
          ] }
      ],
      examples: [
        { zh: '{你好|nǐ hǎo}', hu: 'szia — hangzása: ní hǎo' },
        { zh: '{很好|hěn hǎo}', hu: 'nagyon jó — hangzása: hén hǎo' }
      ],
      tip: 'Ha a felolvasást lassan hallgatod meg, jól hallod, hogy a <i>nǐ</i> felfelé ível, mint egy 2. tónus.'
    }
  ],
  phrases: [
    { zh: '{你好|nǐ hǎo}！', hu: 'Szia! Jó napot!' },
    { zh: '{您好|nín hǎo}！', hu: 'Jó napot kívánok! (udvarias)' },
    { zh: '{你们好|nǐ·men hǎo}！', hu: 'Sziasztok!' },
    { zh: '{老师好|lǎo·shī hǎo}！', hu: 'Jó napot, tanár úr / tanárnő!' },
    { zh: '{对不起|duì·bu·qǐ}！', hu: 'Elnézést!' },
    { zh: '{没关系|méi guān·xi}。', hu: 'Semmi baj.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{你|nǐ}', pinyin: 'nǐ', hu: 'te' },
        { zh: '{好|hǎo}', pinyin: 'hǎo', hu: 'jó' },
        { zh: '{您|nín}', pinyin: 'nín', hu: 'ön (udvarias)' },
        { zh: '{你们|nǐ·men}', pinyin: 'nǐmen', hu: 'ti' },
        { zh: '{对不起|duì·bu·qǐ}', pinyin: 'duìbuqǐ', hu: 'elnézést, bocsánat' },
        { zh: '{没关系|méi guān·xi}', pinyin: 'méi guānxi', hu: 'semmi baj' }
      ] },
    { title: 'Ráadás', note: 'A párbeszédben is előkerültek.',
      items: [
        { zh: '{老师|lǎo·shī}', pinyin: 'lǎoshī', hu: 'tanár' },
        { zh: '{我|wǒ}', pinyin: 'wǒ', hu: 'én' },
        { zh: '{我们|wǒ·men}', pinyin: 'wǒmen', hu: 'mi' },
        { zh: '{大家|dà·jiā}', pinyin: 'dàjiā', hu: 'mindenki' }
      ] }
  ],
  culture: [
    { title: 'Hogyan köszönnek a kínaiak?', text: 'A {你好|nǐ hǎo} a „hivatalos" köszönés, a tankönyvek első szava. Az utcán ismerősök között gyakran egy egyszerű kérdés helyettesíti: „Ettél már?", „Hová mész?", vagy csak a nevet mondják mosolyogva. Ezek a kérdések nem kíváncsiskodók: csak annyit jelentenek, hogy „látlak, örülök neked".' },
    { title: 'Kézfogás, meghajlás, puszi', text: 'Hivatalos találkozón Kínában is kezet fognak, de nem olyan erősen, mint Európában. A meghajlás (mint Japánban) nem jellemző, legfeljebb egy kis biccentés. A puszi ismerősök között sem szokás: barátok inkább egy mosollyal vagy kézlegyintéssel köszönnek.' }
  ],
  quiz: [
    { q: 'Mit mondasz, ha köszönsz egy kínai diáktársadnak?', a: '{你好|nǐ hǎo}！', wrong: ['{对不起|duì·bu·qǐ}！', '{没关系|méi guān·xi}。', '{你们|nǐ·men}'], why: 'A {你好|nǐ hǎo} a mindennapi köszönés: „szia".', point: 1 },
    { q: 'Hogyan köszönsz udvariasan egy idős professzornak?', a: '{您好|nín hǎo}！', wrong: ['{你们好|nǐ·men hǎo}！', '{没关系|méi guān·xi}！', '{我好|wǒ hǎo}！'], why: 'A {您|nín} az udvarias „ön": {您好|nín hǎo}.', point: 2 },
    { q: 'Egy egész osztályt köszöntesz. Mit mondasz?', a: '{你们好|nǐ·men hǎo}！', wrong: ['{您好|nín hǎo}！', '{你好们|nǐ hǎo men}！', '{对不起|duì·bu·qǐ}！'], why: 'A {你们|nǐ·men} „ti": több embert köszöntesz vele.', point: 3 },
    { q: 'Mit jelent a {们|men} a {我们|wǒ·men} szóban?', a: 'többes számot: „én" → „mi"', wrong: ['udvariasságot: „én" → „ön"', 'kérdést: „én?" → „ki?"', 'múlt időt: „vagyok" → „voltam"'], why: 'A {们|men} a névmás többes száma: {我|wǒ} → {我们|wǒ·men}.', point: 3 },
    { q: 'Valaki azt mondja: {对不起|duì·bu·qǐ}！ Mit válaszolsz?', a: '{没关系|méi guān·xi}。', wrong: ['{你好|nǐ hǎo}。', '{您好|nín hǎo}。', '{你们|nǐ·men}。'], why: 'A bocsánatkérésre a válasz: {没关系|méi guān·xi} „semmi baj".', point: 4 },
    { q: 'Mit jelent: {对不起|duì·bu·qǐ}?', a: 'Elnézést! Bocsánat!', wrong: ['Köszönöm!', 'Semmi baj.', 'Viszontlátásra!'], why: 'A {对不起|duì·bu·qǐ} bocsánatkérés.', point: 4 },
    { q: 'Hogyan hangzik ténylegesen a {你好|nǐ hǎo}?', a: 'ní hǎo (az első szótag emelkedő)', wrong: ['nǐ hǎo, mindkettő mély', 'nì hào, mindkettő eső', 'nī hāo, mindkettő magas'], why: 'Két 3. tónus egymás után: az első 2. tónusúvá válik.', point: 5 },
    { q: 'Melyik szóban érvényes a „3 + 3 → 2 + 3" szabály?', a: '{很好|hěn hǎo}', wrong: ['{你们|nǐ·men}', '{老师|lǎo·shī}', '{您好|nín hǎo}'], why: 'A {很|hěn} és a {好|hǎo} is 3. tónusú, ezért „hén hǎo".', point: 5 },
    { q: 'Változik-e a pinyin írása a „3 + 3" szabály miatt?', a: 'nem, csak a kiejtés változik', wrong: ['igen, az első szótagra 2. tónusjel kerül', 'igen, mindkét jel eltűnik', 'csak a tankönyvekben'], why: 'A pinyin <i>nǐ hǎo</i> marad; a „ní" csak a kiejtésben van.', point: 5 },
    { q: 'Melyik NEM helyes köszönés?', a: '{您们好|nín·men hǎo}！', wrong: ['{你好|nǐ hǎo}！', '{您好|nín hǎo}！', '{老师好|lǎo·shī hǎo}！'], why: 'A {您|nín}-nek nincs többes száma.', point: 2 },
    { q: 'Mit jelent: {老师好|lǎo·shī hǎo}！', a: 'Jó napot, tanár úr / tanárnő!', wrong: ['A tanár nagyon jó ember.', 'Szia, ő itt a tanárunk!', 'Elnézést, tanárnő, késtem!'], why: 'Megszólítás + {好|hǎo}: a megszólítottnak szóló köszönés.', point: 1 },
    { q: 'A {你好|nǐ hǎo} szó szerint…', a: '„te jó"', wrong: ['„jó reggelt"', '„hogy vagy?"', '„én jól"'], why: '{你|nǐ} „te" + {好|hǎo} „jó".', point: 1 },
    { q: 'Napszakhoz kötött-e a {你好|nǐ hǎo}?', a: 'nem, reggel, délben és este is használható', wrong: ['igen, csak reggel, tizenegy óráig', 'igen, csak délután és este mondják', 'csak telefonon és levélben használják'], why: 'A {你好|nǐ hǎo} egész nap jó.', point: 1 },
    { q: 'Melyik mondja: „mi"?', a: '{我们|wǒ·men}', wrong: ['{你们|nǐ·men}', '{您|nín}', '{我|wǒ}'], why: '{我|wǒ} „én" + {们|men} = {我们|wǒ·men} „mi".', point: 3 },
    { q: 'Melyik szótag semleges tónusú a {没关系|méi guān·xi} szóban?', a: 'az utolsó (xi)', wrong: ['az első (méi)', 'a középső (guān)', 'egyik sem'], why: '<i>méi guānxi</i>: a <i>xi</i>-n nincs ékezet, röviden ejted.', point: 4 },
    { q: 'A {对不起|duì·bu·qǐ}-ra válaszként mit NEM mondasz?', a: '{不客气|bú kè·qi}', wrong: ['{没关系|méi guān·xi}', 'semmit, csak bólintasz', '{没关系|méi guān·xi}，{没关系|méi guān·xi}'], why: 'A {不客气|bú kè·qi} „szívesen", a köszönetre válasz (2. lecke).', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   2. LECKE — 谢谢 (köszönet, búcsú)
   ════════════════════════════════════════════════════ */
{
  id: 'l2', no: 2, kicker: 'HSK 1 · 2. lecke',
  title: 'Köszönöm, viszlát — udvarias fordulatok',
  lead: 'Megköszönöd, ha segítenek, válaszolsz a köszönetre, és elbúcsúzol. Közben megismered a 不 tagadószót, amely a mondatban a tónusát is változtatja.',
  cando: [
    'Megköszönsz valamit (谢谢, 谢谢你), és válaszolsz a köszönetre (不客气).',
    'Elbúcsúzol (再见), és megmondod, mikor látjátok egymást (明天见).',
    'Tudod, mikor ejted a 不 szót bù-nak és mikor bú-nak.',
    'Felismered a semleges tónust a megkettőzött szavakban.'
  ],
  intro: [
    'A „köszönöm" és a „szívesen" minden nyelvben az első szavak közé tartozik. A kínaiban a {谢谢|xiè·xie} a köszönet, a {不客气|bú kè·qi} a válasz — szó szerint: „ne udvariaskodj".',
    'A {不客气|bú kè·qi}-ben megismered a {不|bù} „nem" szót is. Ez a leggyakoribb tagadószó, és van egy különlegessége: a következő szótag tónusától függően más dallammal hangzik.'
  ],
  dialogue: {
    title: 'A könyvtárban',
    scene: 'Anna a nyelviskola könyvtárában keres egy szótárt. Wang Ming leveszi neki a legfelső polcról.',
    lines: [
      { who: 'Wang Ming', zh: '{你好|nǐ hǎo}！', hu: 'Szia!' },
      { who: 'Anna', zh: '{谢谢你|xiè·xie nǐ}！', hu: 'Köszönöm (neked)!' },
      { who: 'Wang Ming', zh: '{不客气|bú kè·qi}。', hu: 'Szívesen. (Nincs mit.)' },
      { who: 'Anna', zh: '{再见|zài·jiàn}！', hu: 'Viszlát!' },
      { who: 'Wang Ming', zh: '{明天见|míng·tiān jiàn}！', hu: 'Holnap találkozunk! (Holnapig!)' },
      { who: 'Anna', zh: '{老师|lǎo·shī}，{再见|zài·jiàn}！', hu: 'Viszontlátásra, tanárnő!', note: 'Kifelé menet Anna elköszön Zhang tanárnőtől is.' }
    ],
    notes: [
      'A {谢谢|xiè·xie} egymagában is teljes köszönet; a {谢谢你|xiè·xie nǐ} / {谢谢您|xiè·xie nín} személyesebb: „köszönöm neked / önnek".',
      'A {再见|zài·jiàn} szó szerint „újra látni". A {见|jiàn} „látni, találkozni" más időpontokkal is összeáll: {明天见|míng·tiān jiàn} „holnap találkozunk".'
    ]
  },
  points: [
    {
      title: '{谢谢|xiè·xie}', sub: 'köszönöm',
      pattern: '{谢谢|xiè·xie}（{你|nǐ} / {您|nín}）',
      body: 'A {谢谢|xiè·xie} a „köszönöm". Ugyanaz az írásjegy kétszer egymás után, és a második <b>semleges tónusú</b>: <i>xiè-xie</i>, a második fele rövid és gyenge. Ha a köszönet egy bizonyos személynek szól, utána mondhatod: {谢谢你|xiè·xie nǐ}, udvariasan {谢谢您|xiè·xie nín}.',
      more: [
        'Fokozni is lehet: {谢谢你们|xiè·xie nǐ·men} „köszönöm nektek", {太谢谢你了|tài xiè·xie nǐ le} „nagyon-nagyon köszönöm" (ezt a szerkezetet később tanulod).',
        'Kínában közeli barátok és családtagok között a túl sok „köszönöm" távolságtartónak hathat: ott a segítség magától értetődő. Idegennek, eladónak, tanárnak viszont mindig mondd.'
      ],
      examples: [
        { zh: '{谢谢|xiè·xie}！', hu: 'Köszönöm!' },
        { zh: '{谢谢你|xiè·xie nǐ}！', hu: 'Köszönöm neked!' },
        { zh: '{谢谢您|xiè·xie nín}，{老师|lǎo·shī}！', hu: 'Köszönöm, tanárnő!' }
      ]
    },
    {
      title: '{不客气|bú kè·qi}', sub: 'szívesen — a válasz a köszönetre',
      pattern: '{谢谢|xiè·xie}！ — {不客气|bú kè·qi}。',
      body: 'A {不客气|bú kè·qi} a köszönetre adott válasz: „szívesen, nincs mit". Szó szerint „ne udvariaskodj", vagyis: nem kell megköszönnöd. Hasonló, rövidebb válasz a {不谢|bú xiè} „nem kell megköszönni".',
      examples: [
        { zh: '{不客气|bú kè·qi}。', hu: 'Szívesen.' },
        { zh: '{不谢|bú xiè}。', hu: 'Nincs mit (megköszönni).' }
      ],
      mistakes: [
        { bad: '{谢谢|xiè·xie}！ — {没关系|méi guān·xi}。', good: '{谢谢|xiè·xie}！ — {不客气|bú kè·qi}。', why: 'A {没关系|méi guān·xi} („semmi baj") a bocsánatkérésre válasz.' }
      ]
    },
    {
      title: '{不|bù} → {不|bú}', sub: 'a tagadószó tónusváltása',
      pattern: '{不|bù} + 4. tónus  →  bú',
      body: 'A {不|bù} „nem" alapvetően 4. tónusú. Ha azonban <b>4. tónusú szótag követi</b>, 2. tónussal (emelkedő dallammal) ejted: {不客气|bú kè·qi}, {不是|bú shì} „nem az", {不对|bú duì} „nem helyes". Minden más szótag előtt marad <i>bù</i>: {不好|bù hǎo} „nem jó", {不忙|bù máng} „nem elfoglalt".',
      more: [
        'Ez ugyanaz a jelenség, mint a {你好|nǐ hǎo}-nál: két egyforma, nehezen egymás után ejthető dallam közül az első megváltozik. Két eső dallam helyett emelkedő + eső: <i>bú kè</i>.',
        'A legtöbb tankönyv és ez az app is a <b>ténylegesen ejtett</b> tónust írja a {不|bù}-ra: <i>bú kèqi</i>, <i>bú shì</i>. Szótárban viszont mindig <i>bù</i> szerepel.'
      ],
      tables: [
        { caption: 'Mikor bù, mikor bú?',
          head: ['Utána álló tónus', 'Ejtés', 'Példa'],
          rows: [
            ['1. tónus', 'bù', '{不喝|bù hē} nem iszik'],
            ['2. tónus', 'bù', '{不来|bù lái} nem jön'],
            ['3. tónus', 'bù', '{不好|bù hǎo} nem jó'],
            ['4. tónus', '<b>bú</b>', '{不是|bú shì} nem az · {不客气|bú kè·qi} szívesen']
          ] }
      ],
      examples: [
        { zh: '{不客气|bú kè·qi}', hu: 'szívesen' },
        { zh: '{不是|bú shì}', hu: 'nem (az), nem úgy van' },
        { zh: '{不好|bù hǎo}', hu: 'nem jó' }
      ],
      tip: 'Hallásból könnyen megjegyzed: a <i>bú shì</i> és a <i>bú kèqi</i> „felfelé indul", a <i>bù hǎo</i> „lefelé".'
    },
    {
      title: '{再见|zài·jiàn}', sub: 'viszlát, viszontlátásra',
      pattern: '{再见|zài·jiàn}！ · időpont + {见|jiàn}！',
      body: 'A {再见|zài·jiàn} a semleges, mindenkinek mondható búcsú. A {再|zài} jelentése „újra", a {见|jiàn} jelentése „látni, találkozni". A {见|jiàn} elé időpontot is tehetsz: {明天见|míng·tiān jiàn} „holnap találkozunk", {一会儿见|yíhuìr jiàn} „mindjárt jövök / mindjárt találkozunk".',
      examples: [
        { zh: '{再见|zài·jiàn}！', hu: 'Viszlát!' },
        { zh: '{明天见|míng·tiān jiàn}！', hu: 'Holnap találkozunk!' },
        { zh: '{老师|lǎo·shī}{再见|zài·jiàn}！', hu: 'Viszontlátásra, tanárnő!' }
      ],
      notes: ['A fiatalok között gyakori az angolból átvett {拜拜|bái·bái} „bájbáj" is.']
    },
    {
      title: '{谢谢|xiè·xie} · {妈妈|mā·ma}', sub: 'semleges tónus a megkettőzött szavakban',
      pattern: 'XX → a második X semleges',
      body: 'Ha egy szó két egyforma szótagból áll, a második rendszerint <b>semleges tónusú</b>: {谢谢|xiè·xie} „köszönöm", {妈妈|mā·ma} „anya", {爸爸|bà·ba} „apa", {哥哥|gē·ge} „báty". A második szótag rövid, gyenge, és dallama az elsőhöz igazodik.',
      examples: [
        { zh: '{妈妈|mā·ma}', hu: 'anya' },
        { zh: '{爸爸|bà·ba}', hu: 'apa' },
        { zh: '{哥哥|gē·ge}', hu: 'báty' }
      ],
      mistakes: [
        { bad: 'xiè xiè (két erős eső szótag)', good: 'xiè-xie (a második rövid)', why: 'Két erős eső dallam kissé gépiesnek és ingerültnek hat.' }
      ]
    }
  ],
  phrases: [
    { zh: '{谢谢|xiè·xie}！', hu: 'Köszönöm!' },
    { zh: '{谢谢您|xiè·xie nín}！', hu: 'Köszönöm (önnek)!' },
    { zh: '{不客气|bú kè·qi}。', hu: 'Szívesen.' },
    { zh: '{不谢|bú xiè}。', hu: 'Nincs mit.' },
    { zh: '{再见|zài·jiàn}！', hu: 'Viszlát!' },
    { zh: '{明天见|míng·tiān jiàn}！', hu: 'Holnap találkozunk!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{谢谢|xiè·xie}', pinyin: 'xièxie', hu: 'köszönöm' },
        { zh: '{不|bù}', pinyin: 'bù', hu: 'nem' },
        { zh: '{不客气|bú kè·qi}', pinyin: 'bú kèqi', hu: 'szívesen' },
        { zh: '{再见|zài·jiàn}', pinyin: 'zàijiàn', hu: 'viszlát' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{明天|míng·tiān}', pinyin: 'míngtiān', hu: 'holnap' },
        { zh: '{见|jiàn}', pinyin: 'jiàn', hu: 'látni, találkozni' },
        { zh: '{妈妈|mā·ma}', pinyin: 'māma', hu: 'anya' },
        { zh: '{爸爸|bà·ba}', pinyin: 'bàba', hu: 'apa' }
      ] }
  ],
  culture: [
    { title: 'A dicséret elhárítása', text: 'Ha kínaiul megdicsérnek („Milyen jól beszélsz kínaiul!"), udvarias dolog szerényen elhárítani: {哪里哪里|nǎ·li nǎ·li} „ugyan, hol". Ezt nem kell komolyan venni: a beszélgetés így szokott menni. A „köszönöm" ilyenkor is elfogadható, főleg fiatalok között.' },
    { title: 'Ajándék két kézzel', text: 'Ha valamit átadsz vagy átveszel (ajándékot, névjegyet, könyvet), illik két kézzel tenni. Az ajándékot a kínaiak gyakran nem bontják ki az ajándékozó előtt; ez nem udvariatlanság, hanem tapintat.' }
  ],
  quiz: [
    { q: 'Mit mondasz, ha valaki segített neked?', a: '{谢谢|xiè·xie}！', wrong: ['{不客气|bú kè·qi}！', '{没关系|méi guān·xi}！', '{再见|zài·jiàn}！'], why: 'A {谢谢|xiè·xie} „köszönöm".', point: 1 },
    { q: 'Valaki megköszön neked valamit. Mit felelsz?', a: '{不客气|bú kè·qi}。', wrong: ['{对不起|duì·bu·qǐ}。', '{谢谢|xiè·xie}。', '{你好|nǐ hǎo}。'], why: 'A köszönetre a válasz {不客气|bú kè·qi} „szívesen".', point: 2 },
    { q: 'Mit jelent szó szerint a {不客气|bú kè·qi}?', a: '„ne udvariaskodj"', wrong: ['„nem kérek"', '„jó vendég"', '„nincs baj"'], why: 'A {客气|kè·qi} „udvariaskodó, kimért", a {不|bù} tagad.', point: 2 },
    { q: 'Hogyan ejted a {不|bù}-t a {不是|bú shì} kifejezésben?', a: 'bú (emelkedő)', wrong: ['bù (eső)', 'bǔ (mély)', 'bū (magas)'], why: 'A {是|shì} 4. tónusú, előtte a {不|bù} 2. tónusú lesz.', point: 3 },
    { q: 'Melyik kifejezésben marad bù a {不|bù}?', a: '{不好|bù hǎo}', wrong: ['{不是|bú shì}', '{不客气|bú kè·qi}', '{不对|bú duì}'], why: 'A {好|hǎo} 3. tónusú: előtte a {不|bù} nem változik.', point: 3 },
    { q: 'Mi a {不|bù} tónusváltásának szabálya?', a: '4. tónus előtt 2. tónusú lesz', wrong: ['3. tónus előtt 2. tónusú lesz', 'mindig semleges', 'mondat végén 1. tónusú lesz'], why: 'bù + 4. tónus → bú.', point: 3 },
    { q: 'Mit jelent: {再见|zài·jiàn}?', a: 'Viszlát!', wrong: ['Köszönöm!', 'Szia!', 'Szívesen!'], why: 'A {再|zài} „újra", a {见|jiàn} „látni": viszontlátásra.', point: 4 },
    { q: 'Hogyan mondod: „Holnap találkozunk!"?', a: '{明天见|míng·tiān jiàn}！', wrong: ['{再见明天|zài·jiàn míng·tiān}！', '{明天再|míng·tiān zài}！', '{见明天|jiàn míng·tiān}！'], why: 'Időpont + {见|jiàn}: {明天见|míng·tiān jiàn}.', point: 4 },
    { q: 'Melyik szótag semleges tónusú a {谢谢|xiè·xie} szóban?', a: 'a második', wrong: ['az első', 'mindkettő', 'egyik sem'], why: '<i>xiè-xie</i>: a megkettőzött szó második fele semleges.', point: 5 },
    { q: 'Melyik szó áll két egyforma szótagból, semleges második szótaggal?', a: '{爸爸|bà·ba}', wrong: ['{再见|zài·jiàn}', '{老师|lǎo·shī}', '{不是|bú shì}'], why: '{爸爸|bà·ba} „apa": <i>bà-ba</i>.', point: 5 },
    { q: 'Hogyan köszönöd meg udvariasan egy tanárnak?', a: '{谢谢您|xiè·xie nín}！', wrong: ['{谢谢你们|xiè·xie nǐ·men}！', '{您谢谢|nín xiè·xie}！', '{不客气您|bú kè·qi nín}！'], why: 'A köszönet után a megszólított: {谢谢您|xiè·xie nín}.', point: 1 },
    { q: 'Mit mondasz, ha elköszönsz a tanártól?', a: '{老师|lǎo·shī}，{再见|zài·jiàn}！', wrong: ['{老师|lǎo·shī}，{不客气|bú kè·qi}！', '{老师|lǎo·shī}，{对不起|duì·bu·qǐ}！', '{老师|lǎo·shī}，{没关系|méi guān·xi}！'], why: 'Búcsúzáskor: {再见|zài·jiàn}.', point: 4 },
    { q: 'Mit jelent: {不谢|bú xiè}?', a: 'Nincs mit (megköszönni).', wrong: ['Nem, köszönöm, nem kérek.', 'Ne haragudj, elnézést kérek.', 'Nem látom, hol van.'], why: 'Rövid válasz a köszönetre, mint a {不客气|bú kè·qi}.', point: 2 },
    { q: 'Miért ejted bú-nak a {不|bù}-t a {不客气|bú kè·qi}-ben?', a: 'mert a {客|kè} 4. tónusú', wrong: ['mert a mondat elején áll', 'mert semleges tónusú', 'mert udvarias kifejezés'], why: 'A {客|kè} 4. tónusú, előtte a {不|bù} → bú.', point: 3 },
    { q: 'A {谢谢|xiè·xie} után mit mondasz, ha a köszönet több embernek szól?', a: '{你们|nǐ·men}', wrong: ['{您|nín}', '{您们|nín·men}', '{我们|wǒ·men}'], why: '{谢谢你们|xiè·xie nǐ·men} „köszönöm nektek".', point: 1 },
    { q: 'Mit jelent a {见|jiàn} a {再见|zài·jiàn}-ben?', a: 'látni, találkozni', wrong: ['újra, még egyszer', 'jó, rendben van', 'holnap, másnap'], why: 'A {再|zài} „újra", a {见|jiàn} „látni".', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   3. LECKE — 叫, 什么, 是, 吗 (bemutatkozás)
   ════════════════════════════════════════════════════ */
{
  id: 'l3', no: 3, kicker: 'HSK 1 · 3. lecke',
  title: 'Hogy hívnak? — bemutatkozás',
  lead: 'Megkérdezed valakinek a nevét, megmondod a sajátodat, és elmondod, honnan jöttél. Közben három alapszerkezet: a 什么 kérdőszó, a 是 „lenni" és a 吗-s kérdés.',
  cando: [
    'Megkérdezed valakinek a nevét (你叫什么名字？), és bemutatkozol (我叫…).',
    'Elmondod, ki vagy (我是学生), és tagadod (我不是老师).',
    'Eldöntendő kérdést teszel fel a 吗 szócskával.',
    'Megmondod a nemzetiséged: 中国人, 美国人, 匈牙利人.'
  ],
  intro: [
    'Ebben a leckében már egész mondatokat mondasz. Jó hír: a kínai mondat alapszórendje ugyanaz, mint a „Péter almát eszik" típusú magyar mondaté: <b>alany – ige – tárgy</b>. Ragozás nincs: a {是|shì} „lenni" ugyanaz minden személyben, nincs „vagyok, vagy, van" külön alak.',
    'A kérdésekhez sem kell szórendet cserélni. Ha kérdőszó kell, az oda kerül, ahol a válasz állna; ha eldöntendő a kérdés, a mondat végére egy {吗|ma} kerül, és kész.'
  ],
  dialogue: {
    title: 'Az első óra',
    scene: 'Zhang tanárnő az első órán sorra kérdezi a diákokat. Anna Budapestről jött, Wang Ming pekingi diák, aki besegít az órákon.',
    lines: [
      { who: 'Zhang tanárnő', zh: '{你好|nǐ hǎo}！{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', hu: 'Szia! Hogy hívnak?' },
      { who: 'Anna', zh: '{我|wǒ}{叫|jiào}{安娜|Ān·nà}。', hu: 'Annának hívnak.' },
      { who: 'Zhang tanárnő', zh: '{你|nǐ}{是|shì}{美国人|Měi·guó·rén}{吗|ma}？', hu: 'Amerikai vagy?' },
      { who: 'Anna', zh: '{不是|bú shì}，{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Nem, magyar vagyok.', note: 'A {匈牙利|Xiōngyálì} „Magyarország" nem HSK-szó, de neked az egyik legfontosabb.' },
      { who: 'Zhang tanárnő', zh: '{他|tā}{叫|jiào}{王明|Wáng Míng}，{他|tā}{是|shì}{中国人|Zhōng·guó·rén}。', hu: 'Őt Wang Mingnek hívják, ő kínai.' },
      { who: 'Anna', zh: '{王明|Wáng Míng}，{你|nǐ}{是|shì}{老师|lǎo·shī}{吗|ma}？', hu: 'Wang Ming, te tanár vagy?' },
      { who: 'Wang Ming', zh: '{不是|bú shì}，{我|wǒ}{是|shì}{学生|xué·sheng}。', hu: 'Nem, diák vagyok.' }
    ],
    notes: [
      'A {你叫什么名字|nǐ jiào shénme míngzi} szó szerint „te hívsz milyen nevet": a {叫|jiào} „hívni, nevezni", a {什么|shénme} „mi, milyen", a {名字|míngzi} „név".',
      'Kínai neveknél a <b>családnév áll elöl</b>: {王明|Wáng Míng} családneve {王|Wáng}, utóneve {明|Míng} — mint a magyarban, és nem úgy, mint az angolban.',
      'A {不是|bú shì} „nem az" egymagában is lehet válasz egy {吗|ma}-s kérdésre. A {不|bù} itt <i>bú</i>, mert a {是|shì} 4. tónusú.'
    ]
  },
  points: [
    {
      title: '{叫|jiào}', sub: 'valakit valahogy hívnak',
      pattern: 'A + {叫|jiào} + név',
      body: 'A {叫|jiào} „hívni, nevezni" ige után a név áll: {我叫安娜|wǒ jiào Ānnà} „Annának hívnak", {他叫王明|tā jiào Wáng Míng} „őt Wang Mingnek hívják". A magyarral szemben itt nincs „-nak/-nek" rag, és nem kell visszaható szerkezet („engem hívnak"): egyszerűen „én hívódom X".',
      more: [
        'A kérdés: {你叫什么名字|nǐ jiào shénme míngzi}？ „Hogy hívnak?" Rövidebben is lehet: {你叫什么|nǐ jiào shénme}？ A válaszban elég a név: {安娜|Ānnà}.',
        'Udvariasabb, főleg idősebbektől: {您贵姓|nín guìxìng}？ „Mi a (tisztelt) családneve?" Ezt a következő szinten tanulod; a {叫|jiào} mindenkinél jó.'
      ],
      examples: [
        { zh: '{我|wǒ}{叫|jiào}{安娜|Ān·nà}。', hu: 'Annának hívnak.' },
        { zh: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', hu: 'Hogy hívnak?' },
        { zh: '{她|tā}{叫|jiào}{刘|Liú}{芳|Fāng}。', hu: 'Őt Liu Fangnak hívják.' }
      ]
    },
    {
      title: '{什么|shénme}', sub: '„mi?", „milyen?" — a kérdőszó a válasz helyén áll',
      pattern: '{你|nǐ}{叫|jiào}{什么|shén·me}？ → {我|wǒ}{叫|jiào}{安娜|Ān·nà}。',
      body: 'A kínai kérdőszó <b>pontosan oda kerül, ahová a válasz</b>: a kérdés és a válasz szórendje azonos. {你叫什么|nǐ jiào shénme}？ — {我叫安娜|wǒ jiào Ānnà}. A {什么|shénme} a mondat közepén vagy végén áll, nem kell az elejére hozni.',
      more: [
        'A {什么|shénme} főnév előtt „milyen, miféle" jelentésű: {什么名字|shénme míngzi} „milyen név", {什么书|shénme shū} „milyen könyv".',
        'A kérdőszavas kérdés végére <b>nem</b> kerül {吗|ma}: a {什么|shénme} egymagában kérdővé teszi a mondatot.'
      ],
      examples: [
        { zh: '{你|nǐ}{叫|jiào}{什么|shén·me}？', hu: 'Hogy hívnak? (Mi a neved?)' },
        { zh: '{他|tā}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', hu: 'Őt hogy hívják?' },
        { zh: '{你|nǐ}{学|xué}{什么|shén·me}？', hu: 'Mit tanulsz?' }
      ],
      mistakes: [
        { bad: '{什么|shén·me}{名字|míng·zi}{你|nǐ}{叫|jiào}？', good: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', why: 'A kérdőszó a helyén marad: oda, ahol a válaszban a név állna.' },
        { bad: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}{吗|ma}？', good: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', why: 'Kérdőszó mellett nincs {吗|ma}.' }
      ]
    },
    {
      title: '{是|shì}', sub: 'A az B — azonosítás két főnév között',
      pattern: 'A + {是|shì} + B · A + {不是|bú shì} + B',
      body: 'A {是|shì} két főnevet köt össze: „A az B", „A = B". {我是学生|wǒ shì xuésheng} „diák vagyok", {她是老师|tā shì lǎoshī} „ő tanár". Az ige minden személyben ugyanaz: {我是|wǒ shì}, {你是|nǐ shì}, {他是|tā shì}. Tagadva {不是|bú shì}: {我不是老师|wǒ bú shì lǎoshī} „nem vagyok tanár".',
      more: [
        'A magyarban harmadik személyben a „van" elmarad („Ő tanár."), a kínaiban a {是|shì} ott is kell: {他是老师|tā shì lǎoshī}, nem *{他老师|tā lǎoshī}.',
        'Fontos: a {是|shì} főnévvel áll, <b>melléknévvel nem</b>. „Jó vagyok" nem *{我是好|wǒ shì hǎo}, hanem {我很好|wǒ hěn hǎo} — ezt a 6. leckében tanulod.'
      ],
      examples: [
        { zh: '{我|wǒ}{是|shì}{学生|xué·sheng}。', hu: 'Diák vagyok.' },
        { zh: '{她|tā}{是|shì}{老师|lǎo·shī}。', hu: 'Ő tanár.' },
        { zh: '{我|wǒ}{不是|bú shì}{美国人|Měi·guó·rén}。', hu: 'Nem vagyok amerikai.' },
        { zh: '{王明|Wáng Míng}{是|shì}{中国人|Zhōng·guó·rén}。', hu: 'Wang Ming kínai.' }
      ],
      mistakes: [
        { bad: '{他|tā}{老师|lǎo·shī}。', good: '{他|tā}{是|shì}{老师|lǎo·shī}。', why: 'Két főnév között a {是|shì} nem maradhat el.' },
        { bad: '{我|wǒ}{没|méi}{是|shì}{老师|lǎo·shī}。', good: '{我|wǒ}{不是|bú shì}{老师|lǎo·shī}。', why: 'A {是|shì} tagadása mindig {不|bù}: {不是|bú shì}.' }
      ]
    },
    {
      title: '{吗|ma}', sub: 'eldöntendő kérdés: állítás + {吗|ma}？',
      pattern: 'állítás + {吗|ma}？ → {是|shì}。/ {不是|bú shì}。',
      body: 'Ha egy állító mondat végére {吗|ma}-t teszel, igen-nem kérdés lesz belőle: {你是学生|nǐ shì xuésheng} „diák vagy" → {你是学生吗|nǐ shì xuésheng ma}？ „Diák vagy?" A szórend nem változik, a hanghordozás sem kell, hogy emelkedjen: a {吗|ma} maga a kérdőjel.',
      more: [
        'A kínaiban nincs külön „igen" és „nem" szó, mint a magyarban. A válaszban a kérdés igéjét ismétled meg: {你是学生吗|nǐ shì xuésheng ma}？ — {是|shì}（{我是学生|wǒ shì xuésheng}）„igen" / {不是|bú shì} „nem".',
        'A {吗|ma} semleges tónusú, röviden ejted.'
      ],
      examples: [
        { zh: '{你|nǐ}{是|shì}{学生|xué·sheng}{吗|ma}？', hu: 'Diák vagy?' },
        { zh: '{是|shì}，{我|wǒ}{是|shì}{学生|xué·sheng}。', hu: 'Igen, diák vagyok.' },
        { zh: '{她|tā}{是|shì}{中国人|Zhōng·guó·rén}{吗|ma}？', hu: 'Ő kínai?' },
        { zh: '{不是|bú shì}，{她|tā}{是|shì}{美国人|Měi·guó·rén}。', hu: 'Nem, ő amerikai.' }
      ],
      tip: 'Kezdőként a legbiztosabb: vedd a választ, és tegyél a végére {吗|ma}-t. Így sosem rontod el a szórendet.'
    },
    {
      title: '{中国人|Zhōngguórén}', sub: 'ország + {人|rén} = nemzetiség',
      pattern: 'ország + {人|rén}',
      body: 'A {人|rén} jelentése „ember". Az ország neve után téve megadja, ki honnan való: {中国|Zhōngguó} „Kína" → {中国人|Zhōngguórén} „kínai (ember)", {美国|Měiguó} „Amerika" → {美国人|Měiguórén} „amerikai", {匈牙利|Xiōngyálì} „Magyarország" → {匈牙利人|Xiōngyálìrén} „magyar".',
      more: [
        'Az ország nevében gyakran ott a {国|guó} „ország" írásjegy: {中国|Zhōngguó} szó szerint „Középső ország", {美国|Měiguó} „Szép ország" (az „Amerika" második szótagjának hangzásából).',
        'A nyelv neve más szerkezet: {汉语|Hànyǔ} vagy {中文|Zhōngwén} „kínai nyelv", {英语|Yīngyǔ} „angol" — ezeket a következő leckében tanulod.'
      ],
      tables: [
        { caption: 'Országok és nemzetiségek',
          head: ['Ország', 'Nemzetiség'],
          rows: [
            ['{中国|Zhōng·guó} Kína', '{中国人|Zhōng·guó·rén} kínai'],
            ['{美国|Měi·guó} Amerika (USA)', '{美国人|Měi·guó·rén} amerikai'],
            ['{匈牙利|Xiōng·yá·lì} Magyarország', '{匈牙利人|Xiōng·yá·lì·rén} magyar'],
            ['{英国|Yīng·guó} Nagy-Britannia', '{英国人|Yīng·guó·rén} brit'],
            ['{德国|Dé·guó} Németország', '{德国人|Dé·guó·rén} német']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Magyar vagyok.' },
        { zh: '{你|nǐ}{是|shì}{中国人|Zhōng·guó·rén}{吗|ma}？', hu: 'Kínai vagy?' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', hu: 'Hogy hívnak?' },
    { zh: '{我|wǒ}{叫|jiào}…', hu: '…-nak/-nek hívnak.' },
    { zh: '{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Magyar vagyok.' },
    { zh: '{你|nǐ}{是|shì}{学生|xué·sheng}{吗|ma}？', hu: 'Diák vagy?' },
    { zh: '{不是|bú shì}。', hu: 'Nem (az).' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{叫|jiào}', pinyin: 'jiào', hu: 'hívni, nevezni' },
        { zh: '{什么|shén·me}', pinyin: 'shénme', hu: 'mi, milyen' },
        { zh: '{名字|míng·zi}', pinyin: 'míngzi', hu: 'név' },
        { zh: '{我|wǒ}', pinyin: 'wǒ', hu: 'én' },
        { zh: '{是|shì}', pinyin: 'shì', hu: 'van, -nak lenni' },
        { zh: '{吗|ma}', pinyin: 'ma', hu: 'kérdőszócska' },
        { zh: '{老师|lǎo·shī}', pinyin: 'lǎoshī', hu: 'tanár' },
        { zh: '{学生|xué·sheng}', pinyin: 'xuésheng', hu: 'diák' },
        { zh: '{人|rén}', pinyin: 'rén', hu: 'ember' }
      ] },
    { title: 'Országok',
      items: [
        { zh: '{中国|Zhōng·guó}', pinyin: 'Zhōngguó', hu: 'Kína' },
        { zh: '{美国|Měi·guó}', pinyin: 'Měiguó', hu: 'Amerika' },
        { zh: '{匈牙利|Xiōng·yá·lì}', pinyin: 'Xiōngyálì', hu: 'Magyarország' }
      ] }
  ],
  culture: [
    { title: 'Kínai nevek', text: 'A kínai név általában két vagy három szótag: elöl az egy szótagú <b>családnév</b> ({王|Wáng}, {李|Lǐ}, {张|Zhāng} a leggyakoribbak), utána az egy-két szótagú utónév. A családnevek száma meglepően kicsi: a három leggyakoribb nevet több száz millió ember viseli. Az utónevet a szülők jelentése alapján választják: {明|míng} „fényes", {月|yuè} „hold".' },
    { title: 'Magyar név kínaiul', text: 'A külföldi neveket hangzás szerint írják át: {安娜|Ānnà} „Anna", {彼得|Bǐdé} „Péter". Sok kínait tanuló választ magának kínai nevet is, kínai családnévvel: ezt egy tanár vagy kínai barát segítségével érdemes megtenni, mert a hangzás mellett az írásjegyek jelentése is számít.' }
  ],
  reading: {
    title: '{新|xīn}{同学|tóng·xué}', titleHu: 'Az új diák',
    text: [
      { zh: '{你们好|nǐ·men hǎo}！', hu: 'Sziasztok!' },
      { zh: '{我|wǒ}{叫|jiào}{安娜|Ān·nà}，{我|wǒ}{是|shì}{学生|xué·sheng}。', hu: 'Annának hívnak, diák vagyok.' },
      { zh: '{我|wǒ}{不是|bú shì}{美国人|Měi·guó·rén}，{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Nem vagyok amerikai, magyar vagyok.' },
      { zh: '{我|wǒ}{的|de}{老师|lǎo·shī}{叫|jiào}{张|Zhāng}{红|Hóng}，{她|tā}{是|shì}{中国人|Zhōng·guó·rén}。', hu: 'A tanárnőmet Zhang Hongnak hívják, ő kínai.', par: true },
      { zh: '{王明|Wáng Míng}{也|yě}{是|shì}{中国人|Zhōng·guó·rén}，{他|tā}{是|shì}{学生|xué·sheng}，{不是|bú shì}{老师|lǎo·shī}。', hu: 'Wang Ming is kínai, ő diák, nem tanár.' }
    ],
    words: [
      { zh: '{新|xīn}', hu: 'új' },
      { zh: '{也|yě}', hu: 'is' },
      { zh: '{的|de}', hu: '(birtokos szócska, 4. lecke)' }
    ],
    questions: [
      { q: 'Kinek a bemutatkozása ez a szöveg?', a: 'Annáé', wrong: ['Zhang tanárnőé', 'Wang Mingé', 'egy amerikai diáké'], why: '{我叫安娜|wǒ jiào Ānnà}: „Annának hívnak."' },
      { q: 'Honnan jött Anna?', a: 'Magyarországról', wrong: ['Amerikából', 'Kínából', 'nem derül ki'], why: '{我是匈牙利人|wǒ shì Xiōngyálìrén}.' },
      { q: 'Ki Zhang Hong?', a: 'Anna kínai tanárnője', wrong: ['Anna osztálytársa', 'egy amerikai diák', 'Wang Ming anyja'], why: '{我的老师叫张红|wǒ de lǎoshī jiào Zhāng Hóng}, {她是中国人|tā shì Zhōngguórén}.' },
      { q: 'Mit tudunk meg Wang Mingről?', a: 'Kínai, és diák, nem tanár.', wrong: ['Amerikai tanár.', 'Magyar diák.', 'Ő Anna tanára.'], why: '{他是学生|tā shì xuésheng}，{不是老师|bú shì lǎoshī}.' }
    ]
  },
  quiz: [
    { q: 'Hogyan kérdezed meg valakinek a nevét?', a: '{你|nǐ}{叫|jiào}{什么|shén·me}{名字|míng·zi}？', wrong: ['{你|nǐ}{是|shì}{什么|shén·me}？', '{你|nǐ}{叫|jiào}{吗|ma}？', '{什么|shén·me}{你|nǐ}{名字|míng·zi}？'], why: 'A {叫|jiào} után a kérdőszó és a „név": {你叫什么名字|nǐ jiào shénme míngzi}？', point: 1 },
    { q: 'Mit jelent: {我叫安娜|wǒ jiào Ānnà}。', a: 'Annának hívnak.', wrong: ['Anna a tanárom.', 'Anna vagy?', 'Hívd Annát!'], why: 'A {叫|jiào} „valahogy hívnak".', point: 1 },
    { q: 'Hová kerül a {什么|shénme} a kérdésben?', a: 'oda, ahol a válaszban a keresett szó állna', wrong: ['mindig a mondat legelejére, mint angolul', 'mindig a mondat végére, a kérdőjel elé', 'mindig közvetlenül az ige elé'], why: 'Kérdés és válasz szórendje azonos: {你叫什么|nǐ jiào shénme}？ — {我叫安娜|wǒ jiào Ānnà}.', point: 2 },
    { q: 'Melyik mondat helyes?', a: '{你|nǐ}{叫|jiào}{什么|shén·me}？', wrong: ['{你|nǐ}{叫|jiào}{什么|shén·me}{吗|ma}？', '{什么|shén·me}{你|nǐ}{叫|jiào}？', '{叫|jiào}{你|nǐ}{什么|shén·me}？'], why: 'Kérdőszó mellett nincs {吗|ma}, és a kérdőszó a helyén marad.', point: 2 },
    { q: '„Diák vagyok." — Melyik a helyes?', a: '{我|wǒ}{是|shì}{学生|xué·sheng}。', wrong: ['{我|wǒ}{学生|xué·sheng}。', '{是|shì}{我|wǒ}{学生|xué·sheng}。', '{我|wǒ}{叫|jiào}{学生|xué·sheng}。'], why: 'Két főnév között a {是|shì} áll: A {是|shì} B.', point: 3 },
    { q: 'Hogyan tagadod: {我是老师|wǒ shì lǎoshī}?', a: '{我|wǒ}{不是|bú shì}{老师|lǎo·shī}。', wrong: ['{我|wǒ}{是|shì}{不|bù}{老师|lǎo·shī}。', '{我|wǒ}{没|méi}{是|shì}{老师|lǎo·shī}。', '{不|bù}{我|wǒ}{是|shì}{老师|lǎo·shī}。'], why: 'A tagadó {不|bù} közvetlenül az ige elé kerül: {不是|bú shì}.', point: 3 },
    { q: 'Hogyan ejted a {不是|bú shì} első szótagját?', a: 'bú (emelkedő)', wrong: ['bù (eső)', 'bǔ (mély)', 'bū (magas)'], why: 'A {是|shì} 4. tónusú, előtte a {不|bù} 2. tónusú.', point: 3 },
    { q: '„Ő tanár." — miért kell a {是|shì} a kínaiban?', a: 'mert két főnév között a {是|shì} harmadik személyben sem maradhat el', wrong: ['mert a {是|shì} itt udvarias, tisztelettudó forma', 'mert a {是|shì} itt múlt időt jelez', 'nem kell: a {是|shì} ilyenkor elhagyható'], why: '{他是老师|tā shì lǎoshī}: a magyar „van" elmarad, a kínai {是|shì} nem.', point: 3 },
    { q: 'Hogyan lesz kérdés a {你是学生|nǐ shì xuésheng} mondatból?', a: '{你|nǐ}{是|shì}{学生|xué·sheng}{吗|ma}？', wrong: ['{是|shì}{你|nǐ}{学生|xué·sheng}？', '{吗|ma}{你|nǐ}{是|shì}{学生|xué·sheng}？', '{你|nǐ}{吗|ma}{是|shì}{学生|xué·sheng}？'], why: 'Állítás + {吗|ma}: a szórend nem változik.', point: 4 },
    { q: '{你是中国人吗|nǐ shì Zhōngguórén ma}？ — Hogyan felelsz „igen"-nel?', a: '{是|shì}。', wrong: ['{吗|ma}。', '{好|hǎo}。', '{叫|jiào}。'], why: 'Az „igen" a kérdés igéje: {是|shì}.', point: 4 },
    { q: 'Mit jelent: {她是美国人吗|tā shì Měiguórén ma}？', a: 'Ő amerikai?', wrong: ['Ő amerikai.', 'Ő nem amerikai.', 'Hol van Amerika?'], why: 'A mondat végi {吗|ma} kérdéssé teszi.', point: 4 },
    { q: 'Hogyan mondod: „magyar (ember)"?', a: '{匈牙利人|Xiōng·yá·lì·rén}', wrong: ['{人|rén}{匈牙利|Xiōng·yá·lì}', '{匈牙利|Xiōng·yá·lì}{国|guó}', '{匈牙利|Xiōng·yá·lì}{是|shì}'], why: 'Ország + {人|rén}.', point: 5 },
    { q: 'Mit jelent a {中国|Zhōngguó}?', a: 'Kína', wrong: ['kínai ember', 'kínai nyelv', 'Amerika'], why: '{中国|Zhōngguó} „Kína", {中国人|Zhōngguórén} „kínai ember".', point: 5 },
    { q: '{王明|Wáng Míng} — melyik a családnév?', a: '{王|Wáng}', wrong: ['{明|Míng}', 'mindkettő', 'egyik sem'], why: 'A kínai névben a családnév áll elöl.' },
    { q: 'Melyik a „diák"?', a: '{学生|xué·sheng}', wrong: ['{老师|lǎo·shī}', '{名字|míng·zi}', '{什么|shén·me}'], why: '{学生|xuésheng} „diák", {老师|lǎoshī} „tanár".', point: 3 },
    { q: '{你是老师吗|nǐ shì lǎoshī ma}？ — „Nem, diák vagyok."', a: '{不是|bú shì}，{我|wǒ}{是|shì}{学生|xué·sheng}。', wrong: ['{不|bù}，{我|wǒ}{学生|xué·sheng}。', '{没有|méi·yǒu}，{我|wǒ}{是|shì}{学生|xué·sheng}。', '{是|shì}，{我|wǒ}{不是|bú shì}{学生|xué·sheng}。'], why: 'A nemleges válasz {不是|bú shì}, utána a helyesbítés.', point: 4 },
    { q: 'Mit jelent a {名字|míngzi}?', a: 'név', wrong: ['hívni', 'mi, milyen', 'ember'], why: '{名字|míngzi} „név".', point: 1 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{是|shì}{好|hǎo}。', wrong: ['{我|wǒ}{是|shì}{老师|lǎo·shī}。', '{他|tā}{是|shì}{学生|xué·sheng}。', '{她|tā}{是|shì}{中国人|Zhōng·guó·rén}。'], why: 'A {是|shì} főnévvel áll, melléknévvel nem; „jól vagyok" = {我很好|wǒ hěn hǎo}.', point: 3 }
  ]
},

/* ════════════════════════════════════════════════════
   4. LECKE — 谁, 哪, 的, 呢
   ════════════════════════════════════════════════════ */
{
  id: 'l4', no: 4, kicker: 'HSK 1 · 4. lecke',
  title: 'Ki ő? — emberek körülöttem',
  lead: 'Megkérdezed, ki valaki és honnan jött, elmondod, ki a tanárod, a barátod, az osztálytársad. Három új szócska: 谁 „ki", 哪 „melyik", és a birtokos 的; plusz a visszakérdező 呢.',
  cando: [
    'Megkérdezed, ki valaki (她是谁？), és honnan jött (你是哪国人？).',
    'Birtokot és viszonyt fejezel ki a 的 szócskával (我的老师).',
    'Visszakérdezel a 呢 szócskával (你呢？).',
    'Tudod, hogy a 他 és a 她 egyformán hangzik.'
  ],
  intro: [
    'Az előző leckében magadról beszéltél. Most másokról: ki az, akit látsz, honnan jött, milyen viszonyban vagytok. Ehhez két új kérdőszó kell — {谁|shéi} „ki" és {哪|nǎ} „melyik" —, és ezek is ugyanúgy a válasz helyén állnak, mint a {什么|shénme}.',
    'A {的|de} szócska a magyar birtokos szerkezetet adja vissza („a tanárom", „Anna barátja"), csak fordított logikával: a birtokos áll elöl, a {的|de} után jön, ami az övé.'
  ],
  dialogue: {
    title: 'Az iskola kapujában',
    scene: 'Anna és David, egy amerikai osztálytárs, az iskola kapujában várnak. Két ember közeledik feléjük.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{她|tā}{是|shì}{谁|shéi}？', hu: 'Anna, ő ki?' },
      { who: 'Anna', zh: '{她|tā}{是|shì}{张|Zhāng}{老师|lǎo·shī}，{我|wǒ}{的|de}{汉语|Hàn·yǔ}{老师|lǎo·shī}。', hu: 'Ő Zhang tanárnő, a kínaitanárom.' },
      { who: 'David', zh: '{她|tā}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', hu: 'Milyen nemzetiségű? (Melyik ország embere?)' },
      { who: 'Anna', zh: '{她|tā}{是|shì}{中国人|Zhōng·guó·rén}。', hu: 'Kínai.' },
      { who: 'David', zh: '{他|tā}{呢|ne}？', hu: 'És ő?' },
      { who: 'Anna', zh: '{他|tā}{是|shì}{我|wǒ}{的|de}{朋友|péng·you}，{叫|jiào}{王明|Wáng Míng}。', hu: 'Ő a barátom, Wang Mingnek hívják.' },
      { who: 'Wang Ming', zh: '{你好|nǐ hǎo}！{你|nǐ}{是|shì}{安娜|Ān·nà}{的|de}{同学|tóng·xué}{吗|ma}？', hu: 'Szia! Te Anna osztálytársa vagy?', note: 'Wang Ming odaér, és Davidhez fordul.' },
      { who: 'David', zh: '{是|shì}，{我|wǒ}{是|shì}{美国人|Měi·guó·rén}。{你|nǐ}{呢|ne}？', hu: 'Igen, amerikai vagyok. És te?' },
      { who: 'Wang Ming', zh: '{我|wǒ}{是|shì}{北京|Běi·jīng}{人|rén}。', hu: 'Pekingi vagyok.' }
    ],
    notes: [
      'A {哪国人|nǎ guó rén} „melyik ország embere" a „milyen nemzetiségű vagy" szokásos kérdése. A beszélt nyelvben a {哪|nǎ}-t gyakran <i>něi</i>-nek ejtik.',
      'A {你呢|nǐ ne}？ „és te?" a legrövidebb visszakérdezés: az előző kérdést kérdezi vissza, így nem kell megismételni.',
      'Városnévvel is működik az „ország + {人|rén}" minta: {北京人|Běijīngrén} „pekingi", {上海人|Shànghǎirén} „sanghaji".'
    ]
  },
  points: [
    {
      title: '{谁|shéi}', sub: '„ki?" — a válasz helyén',
      pattern: '{她|tā}{是|shì}{谁|shéi}？ → {她|tā}{是|shì}{张|Zhāng}{老师|lǎo·shī}。',
      body: 'A {谁|shéi} „ki" kérdőszó, és mint minden kínai kérdőszó, ott áll, ahol a válaszban a személy: {她是谁|tā shì shéi}？ „Ő ki?" — {她是张老师|tā shì Zhāng lǎoshī}. Ha az alanyt kérdezed, a mondat elejére kerül: {谁是老师|shéi shì lǎoshī}？ „Ki a tanár?"',
      more: [
        'Kétféle kiejtése van: <i>shéi</i> (a köznyelvben ez a gyakoribb) és <i>shuí</i> (választékosabb). Mindkettő helyes.',
        'Itt sincs {吗|ma}: {她是谁吗|tā shì shéi ma}？ hibás.'
      ],
      examples: [
        { zh: '{她|tā}{是|shì}{谁|shéi}？', hu: 'Ő ki?' },
        { zh: '{谁|shéi}{是|shì}{你|nǐ}{的|de}{老师|lǎo·shī}？', hu: 'Ki a tanárod?' },
        { zh: '{他|tā}{是|shì}{谁|shéi}？{他|tā}{是|shì}{我|wǒ}{的|de}{同学|tóng·xué}。', hu: 'Ő ki? Az osztálytársam.' }
      ],
      mistakes: [
        { bad: '{她|tā}{是|shì}{谁|shéi}{吗|ma}？', good: '{她|tā}{是|shì}{谁|shéi}？', why: 'Kérdőszóval nincs {吗|ma}.' }
      ]
    },
    {
      title: '{哪|nǎ}', sub: '„melyik?" — {哪|nǎ}{国|guó}{人|rén}？',
      pattern: '{你|nǐ}{是|shì}{哪|nǎ}{国|guó}{人|rén}？',
      body: 'A {哪|nǎ} „melyik" egy főnév előtt áll, és több lehetőség közül kérdez rá egyre: {哪国人|nǎ guó rén} „melyik ország embere" = „milyen nemzetiségű". Válasz: {我是匈牙利人|wǒ shì Xiōngyálìrén}.',
      more: [
        'Figyelj a tónusra: a {哪|nǎ} 3. tónusú, és összetéveszthető a {那|nà} „az, amaz" szóval (4. tónus), amely nem kérdőszó. Írásban a {哪|nǎ} bal oldalán ott a „száj" ({口|kǒu}) jel: kérdő szavaknál gyakori.',
        'A {国|guó} itt „ország" jelentésű, és csak összetételben áll: {哪国|nǎ guó}, {中国|Zhōngguó}, {美国|Měiguó}.'
      ],
      examples: [
        { zh: '{你|nǐ}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', hu: 'Milyen nemzetiségű vagy?' },
        { zh: '{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Magyar vagyok.' },
        { zh: '{你|nǐ}{的|de}{老师|lǎo·shī}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', hu: 'Milyen nemzetiségű a tanárod?' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{是|shì}{什么|shén·me}{国|guó}{人|rén}？', good: '{你|nǐ}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', why: 'Választásra (melyik ország) a {哪|nǎ} kérdez, nem a {什么|shénme}.' }
      ]
    },
    {
      title: '{的|de}', sub: 'birtok és viszony: {我|wǒ}{的|de}{老师|lǎo·shī}',
      pattern: 'birtokos + {的|de} + birtok',
      body: 'A {的|de} összeköti a birtokost és a birtokot: {我的老师|wǒ de lǎoshī} „az én tanárom", {安娜的朋友|Ānnà de péngyou} „Anna barátja". A sorrend mindig ugyanaz: <b>kié</b> → {的|de} → <b>mi</b>. A magyar „Anna barátja" helyett szó szerint „Anna-féle barát".',
      more: [
        'Közeli emberi viszonyoknál és intézményeknél a {的|de} gyakran elmarad, ha névmás a birtokos: {我妈妈|wǒ māma} „anyám", {我朋友|wǒ péngyou} „a barátom", {我们学校|wǒmen xuéxiào} „az iskolánk". Tárgyaknál viszont kell: {我的书|wǒ de shū} „a könyvem".',
        'A {的|de} semleges tónusú, és ugyanez a szócska a jelzős szerkezetekben is előjön majd („a piros könyv").'
      ],
      tables: [
        { caption: 'Mikor marad el a {的|de}?',
          head: ['Szerkezet', 'Példa', 'Megjegyzés'],
          rows: [
            ['névmás + {的|de} + tárgy', '{我的书|wǒ de shū} a könyvem', 'tárgynál kell'],
            ['névmás + családtag', '{我妈妈|wǒ mā·ma} anyám', 'a {的|de} elmaradhat'],
            ['névmás + közeli viszony', '{我朋友|wǒ péng·you} a barátom', 'mindkettő jó'],
            ['név + {的|de} + bármi', '{安娜的老师|Ān·nà de lǎo·shī} Anna tanára', 'névnél kell']
          ] }
      ],
      examples: [
        { zh: '{她|tā}{是|shì}{我|wǒ}{的|de}{汉语|Hàn·yǔ}{老师|lǎo·shī}。', hu: 'Ő a kínaitanárom.' },
        { zh: '{王明|Wáng Míng}{是|shì}{安娜|Ān·nà}{的|de}{朋友|péng·you}。', hu: 'Wang Ming Anna barátja.' },
        { zh: '{这|zhè}{是|shì}{我|wǒ}{妈妈|mā·ma}。', hu: 'Ő az anyukám.' }
      ],
      mistakes: [
        { bad: '{老师|lǎo·shī}{的|de}{我|wǒ}', good: '{我|wǒ}{的|de}{老师|lǎo·shī}', why: 'A birtokos áll elöl: „én-féle tanár".' }
      ]
    },
    {
      title: '{呢|ne}', sub: '„és te?" — visszakérdezés',
      pattern: 'A …。 B {呢|ne}？',
      body: 'A {呢|ne} egy főnév vagy névmás után rövid visszakérdezést ad: {我是学生，你呢|wǒ shì xuésheng, nǐ ne}？ „Én diák vagyok, és te?" Az előző mondat tartalmát kérdezi vissza egy másik személyről, így nem kell megismételni.',
      more: [
        'A {呢|ne} a beszélgetés elején is állhat, ha a helyzetből világos a kérdés: {王明呢|Wáng Míng ne}？ „És Wang Ming? (Ő hol van?)" — ezt a jelentést a 9. leckében veszed.',
        'A {呢|ne} és a {吗|ma} nem cserélhető fel: a {吗|ma} igen-nem kérdést csinál egy teljes mondatból, a {呢|ne} egy szó után visszakérdez.'
      ],
      examples: [
        { zh: '{我|wǒ}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}，{你|nǐ}{呢|ne}？', hu: 'Én magyar vagyok, és te?' },
        { zh: '{我|wǒ}{叫|jiào}{安娜|Ān·nà}，{他|tā}{呢|ne}？', hu: 'Engem Annának hívnak, és őt?' },
        { zh: '{我|wǒ}{很|hěn}{好|hǎo}，{你|nǐ}{呢|ne}？', hu: 'Jól vagyok, és te?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{是|shì}{学生|xué·sheng}，{你|nǐ}{吗|ma}？', good: '{我|wǒ}{是|shì}{学生|xué·sheng}，{你|nǐ}{呢|ne}？', why: 'Egy szó utáni visszakérdezés {呢|ne}, nem {吗|ma}.' }
      ]
    },
    {
      title: '{他|tā} · {她|tā}', sub: 'ő (férfi) és ő (nő) — ugyanaz a hang',
      pattern: '{他|tā} = {她|tā} = tā',
      body: 'A kínaiban, mint a magyarban, a harmadik személyű névmás kiejtése nem különbözteti meg a nemeket: {他|tā} és {她|tā} egyaránt <i>tā</i>. Írásban viszont van különbség: a {他|tā} bal oldalán az „ember" ({亻|rén}), a {她|tā} bal oldalán a „nő" ({女|nǚ}) jel áll.',
      more: [
        'Beszédben tehát ugyanúgy hangzik, mint a magyar „ő": a hallgató a helyzetből tudja, kiről van szó. Többes számban: {他们|tāmen} „ők" (vegyes vagy férfi csoport), {她们|tāmen} „ők (csak nők)".'
      ],
      examples: [
        { zh: '{他|tā}{是|shì}{我|wǒ}{的|de}{同学|tóng·xué}。', hu: 'Ő (férfi) az osztálytársam.' },
        { zh: '{她|tā}{是|shì}{我|wǒ}{的|de}{朋友|péng·you}。', hu: 'Ő (nő) a barátnőm.' }
      ]
    }
  ],
  phrases: [
    { zh: '{她|tā}{是|shì}{谁|shéi}？', hu: 'Ő ki?' },
    { zh: '{你|nǐ}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', hu: 'Milyen nemzetiségű vagy?' },
    { zh: '{你|nǐ}{呢|ne}？', hu: 'És te?' },
    { zh: '{他|tā}{是|shì}{我|wǒ}{的|de}{朋友|péng·you}。', hu: 'Ő a barátom.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{她|tā}', pinyin: 'tā', hu: 'ő (nő)' },
        { zh: '{他|tā}', pinyin: 'tā', hu: 'ő (férfi)' },
        { zh: '{谁|shéi}', pinyin: 'shéi', hu: 'ki' },
        { zh: '{的|de}', pinyin: 'de', hu: 'birtokos szócska' },
        { zh: '{汉语|Hàn·yǔ}', pinyin: 'Hànyǔ', hu: 'kínai nyelv' },
        { zh: '{哪|nǎ}', pinyin: 'nǎ', hu: 'melyik' },
        { zh: '{国|guó}', pinyin: 'guó', hu: 'ország' },
        { zh: '{呢|ne}', pinyin: 'ne', hu: 'és…? (visszakérdező)' },
        { zh: '{同学|tóng·xué}', pinyin: 'tóngxué', hu: 'osztálytárs, évfolyamtárs' },
        { zh: '{朋友|péng·you}', pinyin: 'péngyou', hu: 'barát' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{北京|Běi·jīng}', pinyin: 'Běijīng', hu: 'Peking' },
        { zh: '{也|yě}', pinyin: 'yě', hu: 'is' },
        { zh: '{这|zhè}', pinyin: 'zhè', hu: 'ez' }
      ] }
  ],
  culture: [
    { title: 'Tanár és diák', text: 'Kínában a tanárt nagy tisztelet övezi. A diákok a tanárt a családnevével és a {老师|lǎoshī} szóval szólítják: {张老师|Zhāng lǎoshī} „Zhang tanár(nő)" — a keresztnév vagy a puszta „tanár úr" szokatlan volna. A {老师|lǎoshī} megszólítást egyébként nem csak iskolában használják: tisztelettel szólítanak így bárkit, akitől tanulni lehet.' },
    { title: 'A {汉语|Hànyǔ} szó', text: 'A {汉语|Hànyǔ} szó szerint „a han nép nyelve". A {汉|Hàn} Kína legnagyobb népcsoportjának neve (egy ősi dinasztiáról), és ebből lett a {汉字|hànzì} „kínai írásjegy" szó is — és innen kapta a nevét ez az app.' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{朋友|péng·you}', titleHu: 'A barátaim',
    text: [
      { zh: '{我|wǒ}{叫|jiào}{大卫|Dà·wèi}，{我|wǒ}{是|shì}{美国人|Měi·guó·rén}。', hu: 'Davidnek hívnak, amerikai vagyok.' },
      { zh: '{安娜|Ān·nà}{是|shì}{我|wǒ}{的|de}{同学|tóng·xué}，{她|tā}{不是|bú shì}{美国人|Měi·guó·rén}，{她|tā}{是|shì}{匈牙利人|Xiōng·yá·lì·rén}。', hu: 'Anna az osztálytársam, ő nem amerikai, hanem magyar.' },
      { zh: '{王明|Wáng Míng}{是|shì}{安娜|Ān·nà}{的|de}{朋友|péng·you}，{也|yě}{是|shì}{我|wǒ}{的|de}{朋友|péng·you}。', hu: 'Wang Ming Anna barátja, és az én barátom is.', par: true },
      { zh: '{他|tā}{是|shì}{北京|Běi·jīng}{人|rén}。', hu: 'Ő pekingi.' },
      { zh: '{我们|wǒ·men}{的|de}{汉语|Hàn·yǔ}{老师|lǎo·shī}{是|shì}{张|Zhāng}{老师|lǎo·shī}。', hu: 'A kínaitanárunk Zhang tanárnő.', par: true }
    ],
    words: [ { zh: '{大卫|Dà·wèi}', hu: 'David' }, { zh: '{也|yě}', hu: 'is' } ],
    questions: [
      { q: 'Milyen nemzetiségű David?', a: 'amerikai', wrong: ['magyar', 'kínai', 'nem derül ki'], why: '{我是美国人|wǒ shì Měiguórén}.' },
      { q: 'Ki Anna Davidnek?', a: 'az osztálytársa', wrong: ['a tanára', 'a húga', 'egy ismeretlen'], why: '{安娜是我的同学|Ānnà shì wǒ de tóngxué}.' },
      { q: 'Kinek a barátja Wang Ming?', a: 'Annáé és Davidé is', wrong: ['csak Annáé', 'csak Davidé', 'Zhang tanárnőé'], why: '{是安娜的朋友|shì Ānnà de péngyou}，{也是我的朋友|yě shì wǒ de péngyou}.' },
      { q: 'Ki a kínaitanáruk?', a: 'Zhang tanárnő', wrong: ['Wang Ming', 'Anna', 'egy amerikai tanár'], why: '{我们的汉语老师是张老师|wǒmen de Hànyǔ lǎoshī shì Zhāng lǎoshī}.' }
    ]
  },
  quiz: [
    { q: 'Hogyan kérdezed: „Ő ki?"', a: '{她|tā}{是|shì}{谁|shéi}？', wrong: ['{她|tā}{是|shì}{谁|shéi}{吗|ma}？', '{谁|shéi}{她|tā}{是|shì}？', '{她|tā}{是|shì}{什么|shén·me}？'], why: 'A {谁|shéi} a válasz helyén áll, {吗|ma} nélkül.', point: 1 },
    { q: 'Mit jelent: {谁是你的老师|shéi shì nǐ de lǎoshī}？', a: 'Ki a tanárod?', wrong: ['A tanárod ki?', 'Kinek vagy a tanára?', 'Tanár vagy?'], why: 'Az alany helyén álló {谁|shéi}: „ki a tanárod".', point: 1 },
    { q: 'Hogyan kérdezed meg valakinek a nemzetiségét?', a: '{你|nǐ}{是|shì}{哪|nǎ}{国|guó}{人|rén}？', wrong: ['{你|nǐ}{是|shì}{什么|shén·me}{国|guó}{人|rén}？', '{你|nǐ}{是|shì}{谁|shéi}{国|guó}？', '{哪|nǎ}{你|nǐ}{是|shì}{国|guó}{人|rén}？'], why: 'Melyik ország: {哪国人|nǎ guó rén}.', point: 2 },
    { q: 'Melyik tónusú a {哪|nǎ} „melyik"?', a: '3.', wrong: ['4.', '1.', 'semleges'], why: '{哪|nǎ} 3. tónus; a 4. tónusú {那|nà} „az" nem kérdőszó.', point: 2 },
    { q: '„a tanárom" — melyik a helyes?', a: '{我|wǒ}{的|de}{老师|lǎo·shī}', wrong: ['{老师|lǎo·shī}{的|de}{我|wǒ}', '{的|de}{我|wǒ}{老师|lǎo·shī}', '{我|wǒ}{老师|lǎo·shī}{的|de}'], why: 'Birtokos + {的|de} + birtok.', point: 3 },
    { q: '„Anna barátja" kínaiul:', a: '{安娜|Ān·nà}{的|de}{朋友|péng·you}', wrong: ['{朋友|péng·you}{的|de}{安娜|Ān·nà}', '{安娜|Ān·nà}{朋友|péng·you}{的|de}', '{的|de}{安娜|Ān·nà}{朋友|péng·you}'], why: 'Név után a {的|de} kell: {安娜的朋友|Ānnà de péngyou}.', point: 3 },
    { q: 'Melyik esetben maradhat el a {的|de}?', a: '{我|wǒ}{妈妈|mā·ma} (családtag)', wrong: ['{我|wǒ}{的|de}{书|shū} (tárgy)', '{安娜|Ān·nà}{的|de}{老师|lǎo·shī} (név)', 'soha nem maradhat el'], why: 'Névmás + közeli családtag: a {的|de} elmaradhat.', point: 3 },
    { q: '{我是学生|wǒ shì xuésheng}，{你呢|nǐ ne}？ — mit kérdez a {你呢|nǐ ne}?', a: '„És te? (Te is diák vagy?)"', wrong: ['„Hol vagy most éppen?"', '„Ki vagy te egyáltalán?"', '„Hogy hívnak téged?"'], why: 'A {呢|ne} az előző mondatot kérdezi vissza.', point: 4 },
    { q: 'Melyik a helyes visszakérdezés?', a: '{我|wǒ}{是|shì}{中国人|Zhōng·guó·rén}，{你|nǐ}{呢|ne}？', wrong: ['{我|wǒ}{是|shì}{中国人|Zhōng·guó·rén}，{你|nǐ}{吗|ma}？', '{我|wǒ}{是|shì}{中国人|Zhōng·guó·rén}，{呢|ne}{你|nǐ}？', '{我|wǒ}{是|shì}{中国人|Zhōng·guó·rén}，{你|nǐ}{谁|shéi}？'], why: 'Egy szó utáni visszakérdezés: {你呢|nǐ ne}？', point: 4 },
    { q: 'Hogyan hangzik a {她|tā} „ő (nő)"?', a: 'ugyanúgy, mint a {他|tā}: tā', wrong: ['4. tónussal: tà', 'zöngésen: dā', 'a „nő" szóval együtt: nǚ tā'], why: 'Csak az írásjegy más, a kiejtés azonos.', point: 5 },
    { q: 'Mi a különbség a {他|tā} és a {她|tā} között?', a: 'csak az írásban: a {她|tā}-ban a „nő" jel áll', wrong: ['a {她|tā} 4. tónussal hangzik', 'a {她|tā} udvariasabb, idősebbeknek jár', 'a {他|tā} többes szám, a {她|tā} egyes'], why: 'A {她|tā} bal oldalán {女|nǚ} „nő" áll.', point: 5 },
    { q: 'Mit jelent: {她是我的汉语老师|tā shì wǒ de Hànyǔ lǎoshī}。', a: 'Ő a kínaitanárom.', wrong: ['Ő kínai tanár.', 'Én vagyok a kínaitanára.', 'Ő tanul kínaiul.'], why: '{我的|wǒ de} „az én", {汉语老师|Hànyǔ lǎoshī} „kínaitanár".', point: 3 },
    { q: 'Mit jelent a {同学|tóngxué}?', a: 'osztálytárs, évfolyamtárs', wrong: ['barát, ismerős', 'tanár, oktató', 'diák (bárki, aki tanul)'], why: '{同|tóng} „ugyanaz" + {学|xué} „tanulni": aki veled tanul.' },
    { q: 'Mit jelent a {朋友|péngyou}?', a: 'barát', wrong: ['osztálytárs', 'család', 'ismeretlen'], why: '{朋友|péngyou} „barát" — a második szótag semleges.' },
    { q: '{你是北京人吗|nǐ shì Běijīngrén ma}？ — mit kérdeznek?', a: 'Pekingi vagy?', wrong: ['Pekingben laksz most?', 'Szereted Pekinget?', 'Hol van Peking?'], why: 'Város + {人|rén}: aki onnan való.', point: 2 },
    { q: 'Melyik mondat hibás?', a: '{她|tā}{是|shì}{谁|shéi}{吗|ma}？', wrong: ['{她|tā}{是|shì}{谁|shéi}？', '{她|tā}{是|shì}{老师|lǎo·shī}{吗|ma}？', '{她|tā}{是|shì}{哪|nǎ}{国|guó}{人|rén}？'], why: 'Kérdőszó ({谁|shéi}) mellé nem kell {吗|ma}.', point: 1 },
    { q: 'Mit jelent a {汉语|Hànyǔ}?', a: 'kínai nyelv', wrong: ['kínai ember', 'kínai írásjegy', 'Kína'], why: '{汉语|Hànyǔ} a kínai (mandarin) nyelv neve.' },
    { q: 'David: {我是美国人|wǒ shì Měiguórén}。{你呢|nǐ ne}？ — Wang Ming válasza:', a: '{我|wǒ}{是|shì}{中国人|Zhōng·guó·rén}。', wrong: ['{我|wǒ}{是|shì}{美国人|Měi·guó·rén}{吗|ma}？', '{我|wǒ}{叫|jiào}{中国|Zhōng·guó}。', '{你|nǐ}{是|shì}{谁|shéi}？'], why: 'A {你呢|nǐ ne}？ a nemzetiséget kérdezi vissza.', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   5. LECKE — 几, számok, 了, 多大, 有
   ════════════════════════════════════════════════════ */
{
  id: 'l5', no: 5, kicker: 'HSK 1 · 5. lecke',
  title: 'Család és életkor',
  lead: 'Elmondod, hányan vagytok otthon, kinek van gyereke, ki hány éves. Ehhez megtanulod a számokat százig, a 几 és a 多大 kérdést, a 有 „van valamije" igét, és a változást jelző 了-t.',
  cando: [
    'Elmondod, hányan vagytok a családban (我家有四口人).',
    'Kimondod a számokat 0-tól 99-ig.',
    'Megkérdezed, ki hány éves (几岁？ 多大？), és válaszolsz (二十岁了).',
    'Tudod, hogy a 有 tagadása 没有, nem 不有.'
  ],
  intro: [
    'A kínai számok csodálatosan szabályosak: ha tudsz tízig számolni, százig is tudsz. A „huszonhárom" egyszerűen „két-tíz-három" ({二十三|èrshísān}). Nincs „-teen", nincs „huszon-" és „harminc-" külön szó.',
    'A családról és az életkorról Kínában teljesen természetes kérdezni, már az első beszélgetésben is. Ehhez két kérdés kell: a {几|jǐ} „hány" (kis számokra) és a {多大|duō dà} „mennyi idős".'
  ],
  dialogue: {
    title: 'Zhang tanárnő fényképe',
    scene: 'Óra után Zhang tanárnő asztalán egy családi fénykép áll. Anna rákérdez.',
    lines: [
      { who: 'Anna', zh: '{张|Zhāng}{老师|lǎo·shī}，{您|nín}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', hu: 'Zhang tanárnő, önök hányan vannak a családban?' },
      { who: 'Zhang tanárnő', zh: '{我|wǒ}{家|jiā}{有|yǒu}{三|sān}{口|kǒu}{人|rén}。', hu: 'Hárman vagyunk.' },
      { who: 'Anna', zh: '{她|tā}{是|shì}{您|nín}{的|de}{女儿|nǚ\'ér}{吗|ma}？', hu: 'Ő az ön lánya?' },
      { who: 'Zhang tanárnő', zh: '{是|shì}，{她|tā}{今年|jīn·nián}{二十|èr·shí}{岁|suì}{了|le}。', hu: 'Igen, idén már húszéves.' },
      { who: 'Anna', zh: '{她|tā}{也|yě}{是|shì}{老师|lǎo·shī}{吗|ma}？', hu: 'Ő is tanár?' },
      { who: 'Zhang tanárnő', zh: '{不是|bú shì}，{她|tā}{是|shì}{大学生|dà·xué·shēng}。{你|nǐ}{多|duō}{大|dà}{了|le}？', hu: 'Nem, egyetemista. Te hány éves vagy?' },
      { who: 'Anna', zh: '{我|wǒ}{十九|shí·jiǔ}{岁|suì}。', hu: 'Tizenkilenc vagyok.' }
    ],
    notes: [
      'Családtagok számolásához a {口|kǒu} („száj") mérőszó jár: {三口人|sān kǒu rén} „három fő". Régen azt számolták, hány szájat kell etetni.',
      'A {她今年二十岁了|tā jīnnián èrshí suì le} mondatban nincs {是|shì}: az életkor közvetlenül az alany után állhat.',
      'A {大学生|dàxuéshēng} „egyetemista" szó szerint „nagy-iskola-diák".'
    ]
  },
  points: [
    {
      title: '{一|yī}{二|èr}{三|sān}…{九十九|jiǔshíjiǔ}', sub: 'számok 0-tól 99-ig',
      pattern: 'tízes + {十|shí} + egyes:  {二十三|èr·shí·sān} = 2 × 10 + 3',
      body: 'Tízig meg kell tanulni a számokat; onnan minden szám ezekből rakódik össze. 11–19: {十|shí} + egyes ({十一|shíyī} 11, {十九|shíjiǔ} 19). A kerek tízesek: egyes + {十|shí} ({二十|èrshí} 20, {五十|wǔshí} 50). A többi: tízes + {十|shí} + egyes ({二十三|èrshísān} 23, {九十九|jiǔshíjiǔ} 99).',
      more: [
        'A nulla {零|líng}. Telefonszámban és szobaszámban számjegyenként olvasnak, és az {一|yī}-t gyakran <i>yāo</i>-nak ejtik, hogy ne keverjék a {七|qī}-vel.',
        'A számok tónusára figyelj: {一|yī} 1., {二|èr} 4., {三|sān} 1., {四|sì} 4., {五|wǔ} 3., {六|liù} 4., {七|qī} 1., {八|bā} 1., {九|jiǔ} 3., {十|shí} 2. tónusú. A {十|shí} az összetételek közepén gyakran gyengébben hangzik.'
      ],
      tables: [
        { caption: 'Számok',
          rows: [
            ['{一|yī} 1', '{二|èr} 2', '{三|sān} 3', '{四|sì} 4'],
            ['{五|wǔ} 5', '{六|liù} 6', '{七|qī} 7', '{八|bā} 8'],
            ['{九|jiǔ} 9', '{十|shí} 10', '{十一|shí·yī} 11', '{十五|shí·wǔ} 15'],
            ['{二十|èr·shí} 20', '{二十一|èr·shí·yī} 21', '{三十|sān·shí} 30', '{四十八|sì·shí·bā} 48'],
            ['{六十|liù·shí} 60', '{七十七|qī·shí·qī} 77', '{九十|jiǔ·shí} 90', '{九十九|jiǔ·shí·jiǔ} 99']
          ] }
      ],
      notes: [
        'Ujjal is mutatják a számokat, egy kézzel 1-től 10-ig — a hat, a hét, a nyolc, a kilenc és a tíz jele egészen más, mint nálunk. Piacon hasznos tudni!',
        'A {四|sì} „négy" hangzása emlékeztet a {死|sǐ} „halál" szóra, ezért sokan babonásan kerülik (emeletszámban, telefonszámban). A {八|bā} „nyolc" viszont szerencseszám.'
      ],
      examples: [
        { zh: '{十一|shí·yī}', hu: '11' },
        { zh: '{二十|èr·shí}', hu: '20' },
        { zh: '{三十五|sān·shí·wǔ}', hu: '35' },
        { zh: '{九十九|jiǔ·shí·jiǔ}', hu: '99' }
      ],
      mistakes: [
        { bad: '{十二|shí·èr} = 20', good: '{二十|èr·shí} = 20 · {十二|shí·èr} = 12', why: 'A sorrend számít: a {十|shí} előtti szám szorzó, az utána álló hozzáadandó.' }
      ]
    },
    {
      title: '{几|jǐ}', sub: '„hány?" — kis számokra, mérőszóval',
      pattern: '{几|jǐ} + mérőszó + főnév',
      body: 'A {几|jǐ} „hány" akkor kérdez, ha a válasz várhatóan kicsi szám (nagyjából tíz alatt). Utána mérőszó áll: {几口人|jǐ kǒu rén} „hány fő", {几岁|jǐ suì} „hány éves". A válaszban a {几|jǐ} helyére a szám kerül: {三口人|sān kǒu rén}.',
      more: [
        'A kínaiban a számnév és a főnév közé szinte mindig <b>mérőszó</b> kell (mint a magyar „három <i>szem</i> alma", „két <i>fő</i>"). A {口|kǒu} családtagokra, a {岁|suì} életkorra; a leggyakoribb általános mérőszót, a {个|gè}-t a 8. leckében tanulod.',
        'Nagy számokra (pl. egy egyetem hallgatóinak száma) a {多少|duōshao} „mennyi" kérdez — ez is a 8. leckében jön.'
      ],
      examples: [
        { zh: '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', hu: 'Hányan vagytok a családban?' },
        { zh: '{我|wǒ}{家|jiā}{有|yǒu}{四|sì}{口|kǒu}{人|rén}。', hu: 'Négyen vagyunk.' },
        { zh: '{你|nǐ}{女儿|nǚ\'ér}{几|jǐ}{岁|suì}{了|le}？', hu: 'Hány éves a lányod?' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{人|rén}？', good: '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', why: 'A {几|jǐ} után mérőszó kell: {几口人|jǐ kǒu rén}.' }
      ]
    },
    {
      title: '{有|yǒu}', sub: 'van valamije · tagadva: {没有|méi·yǒu}',
      pattern: 'A + {有|yǒu} + B · A + {没有|méi·yǒu} + B',
      body: 'A {有|yǒu} „van valamije, rendelkezik valamivel": {我有一个女儿|wǒ yǒu yí ge nǚ\'ér} „van egy lányom", {我家有三口人|wǒ jiā yǒu sān kǒu rén} „a családomban hárman vagyunk" (szó szerint: „az otthonomnak három fője van"). A magyar „nekem van" helyett a kínai egyszerűen „én bírok".',
      more: [
        '🔴 A {有|yǒu} tagadása <b>mindig {没有|méiyǒu}</b>, sosem *{不有|bù yǒu}: {我没有女儿|wǒ méiyǒu nǚ\'ér} „nincs lányom". Ez az egyetlen ige, amelyet sosem tagadsz {不|bù}-val.',
        'Kérdés {吗|ma}-val: {你有女儿吗|nǐ yǒu nǚ\'ér ma}？ — {有|yǒu} „van" / {没有|méiyǒu} „nincs".'
      ],
      examples: [
        { zh: '{我|wǒ}{家|jiā}{有|yǒu}{三|sān}{口|kǒu}{人|rén}。', hu: 'Hárman vagyunk otthon.' },
        { zh: '{您|nín}{有|yǒu}{女儿|nǚ\'ér}{吗|ma}？', hu: 'Van lánya?' },
        { zh: '{我|wǒ}{没有|méi·yǒu}{女儿|nǚ\'ér}。', hu: 'Nincs lányom.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{不|bù}{有|yǒu}{女儿|nǚ\'ér}。', good: '{我|wǒ}{没有|méi·yǒu}{女儿|nǚ\'ér}。', why: 'A {有|yǒu}-t a {没|méi} tagadja.' }
      ]
    },
    {
      title: '{了|le}', sub: 'változás: „már … lett"',
      pattern: 'mondat + {了|le}（változás, új helyzet）',
      body: 'A mondat végi {了|le} azt jelzi, hogy <b>új helyzet állt elő</b>, valami megváltozott: {她二十岁了|tā èrshí suì le} „már húszéves (lett)". A mondat {了|le} nélkül is helyes ({她二十岁|tā èrshí suì} „húszéves"), de a {了|le} hozzáteszi, hogy ez most új, eddig nem így volt.',
      more: [
        'Életkornál nagyon gyakori, mert az életkor évről évre változik: {你多大了|nǐ duō dà le}？ „Hány éves (lettél) most?" Hasonlóan: {我是大学生了|wǒ shì dàxuéshēng le} „már egyetemista vagyok".',
        'A {了|le}-nak van egy másik, igéhez kötött szerepe is (befejezett cselekvés, 14. lecke). Most csak a mondat végi „változás" jelentést jegyezd meg.'
      ],
      examples: [
        { zh: '{她|tā}{今年|jīn·nián}{二十|èr·shí}{岁|suì}{了|le}。', hu: 'Idén már húszéves.' },
        { zh: '{我|wǒ}{是|shì}{大学生|dà·xué·shēng}{了|le}。', hu: 'Már egyetemista vagyok.' },
        { zh: '{你|nǐ}{儿子|ér·zi}{几|jǐ}{岁|suì}{了|le}？', hu: 'Hány éves (most) a fiad?' }
      ],
      tip: 'A {了|le} semleges tónusú; a mondat végén röviden, könnyedén mondd.'
    },
    {
      title: '{多大|duō dà}', sub: '„mennyi idős?" — életkor kérdezése',
      pattern: '{你|nǐ}{多|duō}{大|dà}{了|le}？ · {你|nǐ}{几|jǐ}{岁|suì}{了|le}？',
      body: 'A {多大|duō dà} szó szerint „mennyire nagy", és felnőttek, fiatalok életkorát kérdezi: {你多大了|nǐ duō dà le}？ „Hány éves vagy?" Gyereknél (kb. tíz év alatt) a {几岁|jǐ suì} a természetes: {你几岁了|nǐ jǐ suì le}？ A válasz mindig szám + {岁|suì}: {我十九岁|wǒ shíjiǔ suì}.',
      more: [
        'Idősebbeknél udvariatlan a {多大|duō dà}: náluk a {您多大年纪了|nín duō dà niánjì le}？ „Mennyi idős ön?" a tisztelettudó kérdés (a {年纪|niánjì} „életkor" választékos szó).',
        'A {多|duō} melléknév előtt „mennyire?" jelentésű kérdőszó: {多大|duō dà} „milyen idős/nagy", {多高|duō gāo} „milyen magas".'
      ],
      tables: [
        { caption: 'Kinek melyik kérdés?',
          head: ['Kinek', 'Kérdés', 'Válasz'],
          rows: [
            ['gyerek', '{你|nǐ}{几|jǐ}{岁|suì}{了|le}？', '{我|wǒ}{六|liù}{岁|suì}。'],
            ['fiatal, felnőtt', '{你|nǐ}{多|duō}{大|dà}{了|le}？', '{我|wǒ}{二十|èr·shí}{岁|suì}。'],
            ['idősebb', '{您|nín}{多|duō}{大|dà}{年纪|nián·jì}{了|le}？', '{我|wǒ}{七十|qī·shí}{岁|suì}{了|le}。']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{多|duō}{大|dà}{了|le}？', hu: 'Hány éves vagy?' },
        { zh: '{我|wǒ}{十九|shí·jiǔ}{岁|suì}。', hu: 'Tizenkilenc vagyok.' },
        { zh: '{小朋友|xiǎo·péng·you}，{你|nǐ}{几|jǐ}{岁|suì}{了|le}？', hu: 'Kicsikém, hány éves vagy?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{是|shì}{十九|shí·jiǔ}{岁|suì}。', good: '{我|wǒ}{十九|shí·jiǔ}{岁|suì}。', why: 'Az életkor elé általában nem kell {是|shì} (nem hiba, de szokatlan).' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', hu: 'Hányan vagytok otthon?' },
    { zh: '{我|wǒ}{家|jiā}{有|yǒu}{四|sì}{口|kǒu}{人|rén}。', hu: 'Négyen vagyunk.' },
    { zh: '{你|nǐ}{多|duō}{大|dà}{了|le}？', hu: 'Hány éves vagy?' },
    { zh: '{我|wǒ}{二十|èr·shí}{岁|suì}。', hu: 'Húszéves vagyok.' },
    { zh: '{我|wǒ}{没有|méi·yǒu}…', hu: 'Nincs …-om/-em.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{家|jiā}', pinyin: 'jiā', hu: 'otthon, család' },
        { zh: '{有|yǒu}', pinyin: 'yǒu', hu: 'van (valamije)' },
        { zh: '{口|kǒu}', pinyin: 'kǒu', hu: 'fő (családtagok mérőszava)' },
        { zh: '{女儿|nǚ\'ér}', pinyin: 'nǚ\'ér', hu: 'lánya valakinek' },
        { zh: '{几|jǐ}', pinyin: 'jǐ', hu: 'hány' },
        { zh: '{岁|suì}', pinyin: 'suì', hu: 'év (életkor)' },
        { zh: '{了|le}', pinyin: 'le', hu: 'változást jelző szócska' },
        { zh: '{今年|jīn·nián}', pinyin: 'jīnnián', hu: 'idén' },
        { zh: '{多|duō}', pinyin: 'duō', hu: 'mennyire? / sok' },
        { zh: '{大|dà}', pinyin: 'dà', hu: 'nagy; idős' }
      ] },
    { title: 'Számok',
      items: [
        { zh: '{一|yī}', pinyin: 'yī', hu: '1' }, { zh: '{二|èr}', pinyin: 'èr', hu: '2' }, { zh: '{三|sān}', pinyin: 'sān', hu: '3' },
        { zh: '{四|sì}', pinyin: 'sì', hu: '4' }, { zh: '{五|wǔ}', pinyin: 'wǔ', hu: '5' }, { zh: '{六|liù}', pinyin: 'liù', hu: '6' },
        { zh: '{七|qī}', pinyin: 'qī', hu: '7' }, { zh: '{八|bā}', pinyin: 'bā', hu: '8' }, { zh: '{九|jiǔ}', pinyin: 'jiǔ', hu: '9' },
        { zh: '{十|shí}', pinyin: 'shí', hu: '10' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{没有|méi·yǒu}', pinyin: 'méiyǒu', hu: 'nincs' },
        { zh: '{儿子|ér·zi}', pinyin: 'érzi', hu: 'fia valakinek' },
        { zh: '{大学生|dà·xué·shēng}', pinyin: 'dàxuéshēng', hu: 'egyetemista' }
      ] }
  ],
  culture: [
    { title: 'Szabad kérdezni az életkort?', text: 'Kínában az életkorról kérdezni nem tolakodó: a válaszból derül ki, hogyan szólítsd a másikat, ki az idősebb, kinek jár nagyobb tisztelet. Idősebbet a {您多大年纪了|nín duō dà niánjì le}？ formával kérdezz. Nőktől a fiatalabb nemzedék körében ma már Kínában is kevésbé illik életkort kérdezni.' },
    { title: 'Milyen állat vagy?', text: 'Sokan nem a számot kérdezik, hanem a kínai állatövi jegyet: {你属什么|nǐ shǔ shénme}？ „Milyen állat (jegyében születtél)?" A tizenkét állat (patkány, bivaly, tigris, nyúl, sárkány, kígyó, ló, kecske, majom, kakas, kutya, disznó) tizenkét évente ismétlődik, így a válaszból — és a külsőből — az életkor is kitalálható.' }
  ],
  reading: {
    title: '{王|Wáng}{老师|lǎo·shī}{的|de}{家|jiā}', titleHu: 'Wang tanár úr családja',
    text: [
      { zh: '{王|Wáng}{老师|lǎo·shī}{是|shì}{我|wǒ}{的|de}{汉语|Hàn·yǔ}{老师|lǎo·shī}。', hu: 'Wang tanár úr a kínaitanárom.' },
      { zh: '{他|tā}{家|jiā}{有|yǒu}{四|sì}{口|kǒu}{人|rén}。', hu: 'A családjukban négyen vannak.' },
      { zh: '{他|tā}{有|yǒu}{一个|yí ge}{女儿|nǚ\'ér}，{一个|yí ge}{儿子|ér·zi}。', hu: 'Van egy lánya és egy fia.', par: true },
      { zh: '{他|tā}{女儿|nǚ\'ér}{今年|jīn·nián}{二十二|èr·shí·èr}{岁|suì}{了|le}，{是|shì}{大学生|dà·xué·shēng}。', hu: 'A lánya idén már huszonkét éves, egyetemista.' },
      { zh: '{他|tā}{儿子|ér·zi}{八|bā}{岁|suì}，{是|shì}{小学生|xiǎo·xué·shēng}。', hu: 'A fia nyolcéves, általános iskolás.' },
      { zh: '{王|Wáng}{老师|lǎo·shī}{没有|méi·yǒu}{哥哥|gē·ge}。', hu: 'Wang tanár úrnak nincs bátyja.', par: true }
    ],
    words: [ { zh: '{一个|yí ge}', hu: 'egy (darab)' }, { zh: '{小学生|xiǎo·xué·shēng}', hu: 'általános iskolás' }, { zh: '{哥哥|gē·ge}', hu: 'báty' } ],
    questions: [
      { q: 'Hányan vannak Wang tanár úr családjában?', a: 'négyen', wrong: ['hárman', 'ketten', 'öten'], why: '{他家有四口人|tā jiā yǒu sì kǒu rén}.' },
      { q: 'Hány gyereke van Wang tanár úrnak?', a: 'kettő: egy lánya és egy fia', wrong: ['egy lánya', 'egy fia', 'nincs gyereke'], why: '{他有一个女儿，一个儿子|tā yǒu yí ge nǚ\'ér, yí ge érzi}.' },
      { q: 'Hány éves a lánya?', a: '22', wrong: ['12', '20', '8'], why: '{二十二岁|èrshí\'èr suì} = 22.' },
      { q: 'Mit tudunk a fiáról?', a: 'nyolcéves, általános iskolás', wrong: ['egyetemista', 'huszonkét éves', 'tanár'], why: '{他儿子八岁|tā érzi bā suì}，{是小学生|shì xiǎoxuéshēng}.' }
    ]
  },
  quiz: [
    { q: 'Mennyi a {二十三|èrshísān}?', a: '23', wrong: ['32', '13', '203'], why: '{二|èr} × {十|shí} + {三|sān} = 23.', point: 1 },
    { q: 'Hogyan mondod: 15?', a: '{十五|shí·wǔ}', wrong: ['{五十|wǔ·shí}', '{一五|yī wǔ}', '{十|shí}{一|yī}{五|wǔ}'], why: '11–19: {十|shí} + egyes; az {五十|wǔshí} az 50.', point: 1 },
    { q: 'Mennyi a {九十九|jiǔshíjiǔ}?', a: '99', wrong: ['19', '90', '909'], why: '9 × 10 + 9.', point: 1 },
    { q: 'Melyik a 40?', a: '{四十|sì·shí}', wrong: ['{十四|shí·sì}', '{四四|sì sì}', '{四十四|sì·shí·sì}'], why: 'Kerek tízes: egyes + {十|shí}; a {十四|shísì} a 14.', point: 1 },
    { q: 'Hogyan kérdezed: „Hányan vagytok a családban?"', a: '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', wrong: ['{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{人|rén}？', '{你|nǐ}{家|jiā}{是|shì}{几|jǐ}{口|kǒu}？', '{几|jǐ}{你|nǐ}{家|jiā}{人|rén}？'], why: '{几|jǐ} + mérőszó ({口|kǒu}) + {人|rén}.', point: 2 },
    { q: 'Mikor használod a {几|jǐ} kérdőszót?', a: 'ha kis számot (kb. tíz alattit) vársz válaszul', wrong: ['bármilyen, akár nagy számra is', 'csak az életkor kérdezésére', 'csak árak és pénz kérdezésére'], why: 'Nagy számra a {多少|duōshao} kérdez.', point: 2 },
    { q: 'Melyik mérőszóval számolod a családtagokat?', a: '{口|kǒu}', wrong: ['{岁|suì}', '{国|guó}', '{家|jiā}'], why: '{三口人|sān kǒu rén} „három fő".', point: 2 },
    { q: '„Nincs lányom." — melyik a helyes?', a: '{我|wǒ}{没有|méi·yǒu}{女儿|nǚ\'ér}。', wrong: ['{我|wǒ}{不|bù}{有|yǒu}{女儿|nǚ\'ér}。', '{我|wǒ}{不是|bú shì}{女儿|nǚ\'ér}。', '{我|wǒ}{有|yǒu}{不|bù}{女儿|nǚ\'ér}。'], why: 'A {有|yǒu} tagadása mindig {没有|méiyǒu}.', point: 3 },
    { q: 'Mit jelent: {您有女儿吗|nín yǒu nǚ\'ér ma}？', a: 'Van lánya?', wrong: ['Ő az ön lánya?', 'Hány lánya van?', 'Hol a lánya?'], why: '{有|yǒu} „van valamije" + {吗|ma}.', point: 3 },
    { q: 'Mit tesz hozzá a mondat végi {了|le} a {她二十岁了|tā èrshí suì le} mondathoz?', a: 'hogy ez új helyzet: „már húszéves lett"', wrong: ['múlt időt: „húszéves volt"', 'tagadást: „nem húszéves"', 'kérdést: „húszéves?"'], why: 'A mondat végi {了|le} változást, új helyzetet jelez.', point: 4 },
    { q: 'Melyik mondatban jelez változást a {了|le}?', a: '{我|wǒ}{是|shì}{大学生|dà·xué·shēng}{了|le}。', wrong: ['{我|wǒ}{是|shì}{大学生|dà·xué·shēng}。', '{我|wǒ}{了|le}{是|shì}{大学生|dà·xué·shēng}。', '{了|le}{我|wǒ}{是|shì}{大学生|dà·xué·shēng}。'], why: '„Már egyetemista vagyok" — a {了|le} a mondat végén áll.', point: 4 },
    { q: 'Hogyan kérdezed meg egy egyetemista korát?', a: '{你|nǐ}{多|duō}{大|dà}{了|le}？', wrong: ['{你|nǐ}{几|jǐ}{口|kǒu}{了|le}？', '{你|nǐ}{大|dà}{吗|ma}？', '{您|nín}{多|duō}{大|dà}{年纪|nián·jì}{了|le}？'], why: 'Fiatal, felnőtt: {多大|duō dà}; idősnek {多大年纪|duō dà niánjì}.', point: 5 },
    { q: 'Egy hatéves gyereket kérdezel. Mit mondasz?', a: '{你|nǐ}{几|jǐ}{岁|suì}{了|le}？', wrong: ['{您|nín}{多|duō}{大|dà}{年纪|nián·jì}{了|le}？', '{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}{口|kǒu}{人|rén}？', '{你|nǐ}{是|shì}{几|jǐ}？'], why: 'Gyereknél a {几岁|jǐ suì} a természetes.', point: 5 },
    { q: 'Melyik az udvarias kérdés egy idős emberhez?', a: '{您|nín}{多|duō}{大|dà}{年纪|nián·jì}{了|le}？', wrong: ['{你|nǐ}{几|jǐ}{岁|suì}{了|le}？', '{你|nǐ}{多|duō}{大|dà}？', '{您|nín}{几|jǐ}{岁|suì}？'], why: 'Idősebbeknek a {年纪|niánjì} „életkor" szóval kérdezünk.', point: 5 },
    { q: 'Mit jelent a {今年|jīnnián}?', a: 'idén', wrong: ['tavaly', 'jövőre', 'ma'], why: '{今|jīn} „most, ez a" + {年|nián} „év".' },
    { q: 'Mit jelent: {我家有三口人|wǒ jiā yǒu sān kǒu rén}。', a: 'Hárman vagyunk otthon (a családban).', wrong: ['Három házunk van.', 'Három ember jött hozzánk.', 'Három éve lakunk itt.'], why: '{家|jiā} „család, otthon", {三口人|sān kǒu rén} „három fő".', point: 3 },
    { q: 'Milyen tónusú a {十|shí} „tíz"?', a: '2.', wrong: ['1.', '3.', '4.'], why: '{十|shí} emelkedő, 2. tónusú.', point: 1 },
    { q: 'Melyik számot kerülik sokan babonából?', a: 'a {四|sì} „négy"-et', wrong: ['a {八|bā} „nyolc"-at', 'a {六|liù} „hat"-ot', 'a {九|jiǔ} „kilenc"-et'], why: 'A {四|sì} hangzása a „halál" ({死|sǐ}) szóra emlékeztet.' },
    { q: 'Mit jelent a {女儿|nǚ\'ér}?', a: 'lánya valakinek', wrong: ['nő', 'anya', 'húg'], why: '{女|nǚ} „nő" + {儿|ér} „gyermek".' }
  ]
},

/* ════════════════════════════════════════════════════
   6. LECKE — 会, 很 + melléknév, 怎么
   ════════════════════════════════════════════════════ */
{
  id: 'l6', no: 6, kicker: 'HSK 1 · 6. lecke',
  title: 'Mit tudsz? — képességek és melléknevek',
  lead: 'Elmondod, mit tudsz megcsinálni (beszélni kínaiul, írni, főzni), milyen valami (finom, jó), és megkérdezed, hogyan kell valamit csinálni.',
  cando: [
    'Elmondod, mit tanultál meg (我会说汉语), és mit nem (我不会写汉字).',
    'Melléknévvel írsz le valamit: 中国菜很好吃 — a 是 nélkül.',
    'Megkérdezed, hogyan kell csinálni valamit (这个字怎么读？).',
    'Tudsz szerényen válaszolni: 会一点儿 „egy kicsit".'
  ],
  intro: [
    'Ebben a leckében az első <b>segédigét</b> tanulod: a {会|huì} „tud (valamit, mert megtanulta)". A kínai három külön szóval mondja, amit a magyar egy „tud"-dal: a {会|huì} a megtanult képességet, a {能|néng} a lehetőséget, a {可以|kěyǐ} az engedélyt jelöli. Most csak az elsővel foglalkozunk.',
    'A másik nagy téma a <b>melléknév</b>. A kínai melléknév úgy viselkedik, mint egy ige: közvetlenül az alany után áll, {是|shì} nélkül: {中国菜很好吃|Zhōngguó cài hěn hǎochī} „a kínai étel nagyon finom". Ez az egyik leggyakoribb kezdő hiba, ezért alaposan megnézzük.'
  ],
  dialogue: {
    title: 'Vacsora Wang Mingéknél',
    scene: 'Wang Ming meghívja Annát vacsorára. Az édesanyja kínai ételt főz.',
    lines: [
      { who: 'Wang Ming anyja', zh: '{安娜|Ān·nà}，{你|nǐ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}{吗|ma}？', hu: 'Anna, beszélsz kínaiul?' },
      { who: 'Anna', zh: '{会|huì}{一点儿|yì·diǎnr}。', hu: 'Egy kicsit.', note: 'Szerény válasz: {一点儿|yìdiǎnr} „egy kicsit". A kínaiak nagyra értékelik, ha a saját tudásodat nem nagyítod fel.' },
      { who: 'Wang Ming', zh: '{她|tā}{的|de}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}！', hu: 'Nagyon jó a kínaija!' },
      { who: 'Anna', zh: '{阿姨|ā·yí}，{您|nín}{做|zuò}{的|de}{中国菜|Zhōng·guó·cài}{很|hěn}{好吃|hǎo·chī}！', hu: 'Néni, nagyon finom a kínai étel, amit főzött!', note: 'A barát anyját a fiatalok {阿姨|āyí} „néni"-nek szólítják.' },
      { who: 'Wang Ming anyja', zh: '{谢谢|xiè·xie}！{你|nǐ}{会|huì}{做|zuò}{菜|cài}{吗|ma}？', hu: 'Köszönöm! Te tudsz főzni?' },
      { who: 'Anna', zh: '{我|wǒ}{不|bú}{会|huì}{做|zuò}{中国菜|Zhōng·guó·cài}。', hu: 'Kínai ételt nem tudok főzni.' },
      { who: 'Anna', zh: '{王明|Wáng Míng}，“{菜|cài}”{这个|zhè·ge}{字|zì}{怎么|zěn·me}{写|xiě}？', hu: 'Wang Ming, hogy kell leírni a „cai" írásjegyet?', note: 'Anna a menükártyán lát egy írásjegyet, és kíváncsi lesz.' },
      { who: 'Wang Ming', zh: '{我|wǒ}{写|xiě}，{你|nǐ}{看|kàn}。', hu: 'Leírom, figyeld (nézd).' }
    ],
    notes: [
      'A {会|huì} tagadása {不会|bú huì}: a {会|huì} 4. tónusú, ezért a {不|bù} itt <i>bú</i>.',
      'A {很好吃|hěn hǎochī} „nagyon finom": a {好吃|hǎochī} szó szerint „jó enni". Ugyanígy {好看|hǎokàn} „szép" (jó nézni), {好听|hǎotīng} „szép hangzású" (jó hallgatni).',
      'Az {您做的中国菜|nín zuò de Zhōngguó cài} „az ön által főzött kínai étel" előreugrás: ilyen jelzős szerkezetet később tanulsz, most csak egészében jegyezd meg.'
    ]
  },
  points: [
    {
      title: '{会|huì}', sub: 'tud valamit — mert megtanulta',
      pattern: 'A + {会|huì} + ige (+ tárgy) · A + {不会|bú huì} + ige',
      body: 'A {会|huì} egy igét kíván maga után, és azt jelenti, hogy valaki <b>megtanult, elsajátított</b> valamit: {我会说汉语|wǒ huì shuō Hànyǔ} „tudok kínaiul", {她会做中国菜|tā huì zuò Zhōngguó cài} „tud kínai ételt főzni". Tagadva {不会|bú huì}: {我不会写汉字|wǒ bú huì xiě Hànzì} „nem tudok írásjegyeket írni".',
      more: [
        'Kérdés {吗|ma}-val: {你会说汉语吗|nǐ huì shuō Hànyǔ ma}？ A rövid válasz a segédige maga: {会|huì} „igen, tudok" / {不会|bú huì} „nem tudok".',
        'A {会|huì} nem testi képességet vagy lehetőséget jelöl. „Nem tudok jönni, mert beteg vagyok" — ehhez egy másik szó, a {能|néng} kell (10. lecke).',
        'Nyelvekre is a {会|huì} illik: {我会说英语|wǒ huì shuō Yīngyǔ} „tudok angolul".'
      ],
      examples: [
        { zh: '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', hu: 'Tudok kínaiul.' },
        { zh: '{你|nǐ}{会|huì}{写|xiě}{汉字|Hàn·zì}{吗|ma}？', hu: 'Tudsz írásjegyeket írni?' },
        { zh: '{我|wǒ}{不|bú}{会|huì}{做|zuò}{中国菜|Zhōng·guó·cài}。', hu: 'Nem tudok kínai ételt főzni.' },
        { zh: '{他|tā}{会|huì}{说|shuō}{一点儿|yì·diǎnr}{汉语|Hàn·yǔ}。', hu: 'Egy kicsit tud kínaiul.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{会|huì}{汉语|Hàn·yǔ}{说|shuō}。', good: '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', why: 'A szórend: alany – {会|huì} – ige – tárgy. A tárgy az ige után áll.' },
        { bad: '{我|wǒ}{没|méi}{会|huì}{写|xiě}。', good: '{我|wǒ}{不|bú}{会|huì}{写|xiě}。', why: 'A {会|huì}-t a {不|bù} tagadja.' }
      ]
    },
    {
      title: '{很|hěn} + melléknév', sub: 'a melléknév mint állítmány — {是|shì} nélkül',
      pattern: 'A + {很|hěn} + melléknév · A + {不|bù} + melléknév',
      body: 'Ha azt mondod, milyen valami, a melléknév <b>közvetlenül az alany után</b> áll, {是|shì} nélkül: {中国菜很好吃|Zhōngguó cài hěn hǎochī} „a kínai étel (nagyon) finom", {她的汉语很好|tā de Hànyǔ hěn hǎo} „jó a kínaija". A melléknév itt úgy viselkedik, mint az ige: maga az állítmány.',
      more: [
        'Az állító mondatban szinte mindig ott a {很|hěn}. Jelentése „nagyon", de itt gyakran elhalványul, és csak a mondatot „kerekíti le": {我很好|wǒ hěn hǎo} egyszerűen „jól vagyok". {很|hěn} nélkül a melléknév szembeállítást sugall („ez jó — de az nem").',
        'Tagadva {不|bù} + melléknév, és ilyenkor nem kell {很|hěn}: {不好吃|bù hǎochī} „nem finom", {不好|bù hǎo} „nem jó". Kérdés: {好吃吗|hǎochī ma}？ „Finom?"'
      ],
      tables: [
        { caption: 'Állítás, tagadás, kérdés',
          head: ['', 'Példa', 'Jelentés'],
          rows: [
            ['állítás', '{菜|cài}{很|hěn}{好吃|hǎo·chī}。', 'Az étel finom.'],
            ['tagadás', '{菜|cài}{不|bù}{好吃|hǎo·chī}。', 'Az étel nem finom.'],
            ['kérdés', '{菜|cài}{好吃|hǎo·chī}{吗|ma}？', 'Finom az étel?']
          ] }
      ],
      examples: [
        { zh: '{中国菜|Zhōng·guó·cài}{很|hěn}{好吃|hǎo·chī}。', hu: 'A kínai étel finom.' },
        { zh: '{她|tā}{的|de}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}。', hu: 'Jó a kínaija.' },
        { zh: '{我|wǒ}{很|hěn}{好|hǎo}，{你|nǐ}{呢|ne}？', hu: 'Jól vagyok, és te?' },
        { zh: '{汉字|Hàn·zì}{不|bù}{难|nán}。', hu: 'Az írásjegyek nem nehezek.' }
      ],
      mistakes: [
        { bad: '{中国菜|Zhōng·guó·cài}{是|shì}{好吃|hǎo·chī}。', good: '{中国菜|Zhōng·guó·cài}{很|hěn}{好吃|hǎo·chī}。', why: 'Melléknév elé nem kell {是|shì}: a melléknév maga az állítmány.' },
        { bad: '{我|wǒ}{是|shì}{很|hěn}{好|hǎo}。', good: '{我|wǒ}{很|hěn}{好|hǎo}。', why: 'Ugyanez: „jól vagyok" = {我很好|wǒ hěn hǎo}.' }
      ],
      tip: 'Ha magyarul „van" + melléknév jön ki („jó vagyok", „szép az idő"), kínaiul a {是|shì} helyére {很|hěn} kerül.'
    },
    {
      title: '{怎么|zěnme}', sub: '„hogyan?" — ige előtt',
      pattern: '{怎么|zěn·me} + ige？',
      body: 'A {怎么|zěnme} „hogyan, miként" kérdőszó, és <b>az ige elé</b> áll: {这个字怎么读|zhège zì zěnme dú}？ „Hogy kell olvasni ezt az írásjegyet?", {怎么写|zěnme xiě}？ „Hogy kell leírni?" Az alany, amiről kérdezel, gyakran a mondat elejére kerül.',
      more: [
        'Hasonló kérdés: {汉语怎么说|Hànyǔ zěnme shuō}？ „Hogy mondják kínaiul?" — ezzel bármilyen szót megkérdezhetsz: {“苹果”英语怎么说|"píngguǒ" Yīngyǔ zěnme shuō}？',
        'A {怎么|zěnme}-nek a beszélt nyelvben van egy „miért, hogyhogy?" jelentése is ({你怎么不吃|nǐ zěnme bù chī}？ „Hogyhogy nem eszel?"). Ezt később tanulod; most a „hogyan" a fontos.'
      ],
      examples: [
        { zh: '{这个|zhè·ge}{字|zì}{怎么|zěn·me}{读|dú}？', hu: 'Hogy kell olvasni ezt az írásjegyet?' },
        { zh: '{你|nǐ}{的|de}{名字|míng·zi}{怎么|zěn·me}{写|xiě}？', hu: 'Hogy kell leírni a neved?' },
        { zh: '“{谢谢|xiè·xie}”{汉语|Hàn·yǔ}{怎么|zěn·me}{说|shuō}？', hu: 'Hogy mondják kínaiul, hogy „köszönöm"?' }
      ],
      mistakes: [
        { bad: '{这个|zhè·ge}{字|zì}{读|dú}{怎么|zěn·me}？', good: '{这个|zhè·ge}{字|zì}{怎么|zěn·me}{读|dú}？', why: 'A {怎么|zěnme} az ige előtt áll.' }
      ]
    },
    {
      title: '{说|shuō} · {读|dú} · {写|xiě}', sub: 'beszélni, olvasni, írni',
      pattern: '{说|shuō}{汉语|Hàn·yǔ} · {读|dú}{书|shū} · {写|xiě}{汉字|Hàn·zì}',
      body: 'Három ige a nyelvtanuláshoz: {说|shuō} „beszélni, mondani" ({说汉语|shuō Hànyǔ} „kínaiul beszélni"), {读|dú} „(hangosan) olvasni" ({读书|dú shū} „könyvet olvasni, tanulni"), {写|xiě} „írni" ({写汉字|xiě Hànzì} „írásjegyet írni"). A tárgy mindig az ige után áll.',
      more: [
        'A {字|zì} „írásjegy, betű" egyetlen jelet jelent; a {汉字|Hànzì} kifejezetten a kínai írásjegy. Egy szó ({词|cí}) egy vagy több írásjegyből állhat.',
        'A {读|dú} főleg hangos olvasást, felolvasást jelent; a magában olvasásra a {看|kàn} „nézni" is használatos: {看书|kàn shū} „könyvet olvas".'
      ],
      examples: [
        { zh: '{我|wǒ}{会|huì}{读|dú}，{不|bú}{会|huì}{写|xiě}。', hu: 'Olvasni tudom, írni nem.' },
        { zh: '{他|tā}{会|huì}{写|xiě}{很|hěn}{多|duō}{汉字|Hàn·zì}。', hu: 'Sok írásjegyet tud írni.' },
        { zh: '{妈妈|mā·ma}{会|huì}{说|shuō}{英语|Yīng·yǔ}。', hu: 'Anya tud angolul.' }
      ]
    },
    {
      title: '{一点儿|yìdiǎnr}', sub: '„egy kicsit" — szerény válasz',
      pattern: '{会|huì}{一点儿|yì·diǎnr} · ige + {一点儿|yì·diǎnr} + tárgy',
      body: 'Az {一点儿|yìdiǎnr} „egy kicsit, egy kevés". Önálló válaszként szerénységet fejez ki: {你会说汉语吗|nǐ huì shuō Hànyǔ ma}？ — {会一点儿|huì yìdiǎnr} „egy kicsit". A főnév elé is állhat: {说一点儿汉语|shuō yìdiǎnr Hànyǔ} „egy kicsit beszél kínaiul".',
      more: [
        'A végén az <i>-r</i> a pekingi „r-esítés" ({儿化|érhuà}): a {儿|ér} írásjegy nem külön szótag, hanem az előző szótagot teszi r-végűvé: <i>diǎn</i> + <i>r</i> = <i>diǎnr</i>. Dél-Kínában sokan {一点|yìdiǎn}-t mondanak, r nélkül.',
        'Az {一|yī} itt <i>yì</i>: a {一|yī} 1., 2. és 3. tónusú szótag előtt 4. tónussal hangzik ({一点儿|yìdiǎnr}), 4. tónus előtt 2. tónussal ({一个|yí ge}). Ezt a 7. leckében részletesen veszed.'
      ],
      examples: [
        { zh: '{会|huì}{一点儿|yì·diǎnr}。', hu: 'Egy kicsit (tudok).' },
        { zh: '{我|wǒ}{会|huì}{写|xiě}{一点儿|yì·diǎnr}{汉字|Hàn·zì}。', hu: 'Tudok írni néhány írásjegyet.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}{吗|ma}？', hu: 'Beszélsz kínaiul?' },
    { zh: '{会|huì}{一点儿|yì·diǎnr}。', hu: 'Egy kicsit.' },
    { zh: '{很|hěn}{好吃|hǎo·chī}！', hu: 'Nagyon finom!' },
    { zh: '{这个|zhè·ge}{字|zì}{怎么|zěn·me}{读|dú}？', hu: 'Hogy kell ezt olvasni?' },
    { zh: '……{汉语|Hàn·yǔ}{怎么|zěn·me}{说|shuō}？', hu: 'Hogy mondják kínaiul, hogy …?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{会|huì}', pinyin: 'huì', hu: 'tud (megtanulta)' },
        { zh: '{说|shuō}', pinyin: 'shuō', hu: 'beszélni, mondani' },
        { zh: '{菜|cài}', pinyin: 'cài', hu: 'étel, fogás' },
        { zh: '{很|hěn}', pinyin: 'hěn', hu: 'nagyon' },
        { zh: '{好吃|hǎo·chī}', pinyin: 'hǎochī', hu: 'finom' },
        { zh: '{做|zuò}', pinyin: 'zuò', hu: 'csinálni, (ételt) főzni' },
        { zh: '{写|xiě}', pinyin: 'xiě', hu: 'írni' },
        { zh: '{汉字|Hàn·zì}', pinyin: 'Hànzì', hu: 'kínai írásjegy' },
        { zh: '{字|zì}', pinyin: 'zì', hu: 'írásjegy, betű' },
        { zh: '{怎么|zěn·me}', pinyin: 'zěnme', hu: 'hogyan' },
        { zh: '{读|dú}', pinyin: 'dú', hu: 'olvasni (hangosan)' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{一点儿|yì·diǎnr}', pinyin: 'yìdiǎnr', hu: 'egy kicsit' },
        { zh: '{阿姨|ā·yí}', pinyin: 'āyí', hu: 'néni (megszólítás)' },
        { zh: '{英语|Yīng·yǔ}', pinyin: 'Yīngyǔ', hu: 'angol nyelv' },
        { zh: '{难|nán}', pinyin: 'nán', hu: 'nehéz' }
      ] }
  ],
  culture: [
    { title: 'A kínai konyha', text: 'A „kínai étel" valójában sok különböző konyha: a csípős szecsuáni ({川菜|chuāncài}), a finom ízű kantoni ({粤菜|yuècài}), a sós-tartalmas északi. Délen a rizs, északon a búzából készült tészta és gőzölt kenyér ({馒头|mántou}) az alap. Asztalnál a fogások középre kerülnek, mindenki a közösből szed; a vendégnek a házigazda gyakran maga szed a tányérjára.' },
    { title: 'Hogyan írnak a kínaiak?', text: 'Az írásjegyeket meghatározott vonássorrenddel írják (fentről lefelé, balról jobbra, a vízszintes a függőleges előtt). Ma a legtöbben telefonon pinyinnel gépelnek: beírják a kiejtést, és a megjelenő írásjegyek közül választanak. Emiatt sok kínai panaszkodik, hogy kézzel már nehezen emlékszik egy-egy ritkább írásjegyre ({提笔忘字|tí bǐ wàng zì} „tollat fog, elfelejti a jelet").' }
  ],
  reading: {
    title: '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}', titleHu: 'Tudok kínaiul',
    text: [
      { zh: '{我|wǒ}{叫|jiào}{大卫|Dà·wèi}，{我|wǒ}{会|huì}{说|shuō}{英语|Yīng·yǔ}，{也|yě}{会|huì}{说|shuō}{一点儿|yì·diǎnr}{汉语|Hàn·yǔ}。', hu: 'Davidnek hívnak, tudok angolul, és egy kicsit kínaiul is.' },
      { zh: '{我|wǒ}{会|huì}{读|dú}{汉字|Hàn·zì}，{但是|dàn·shì}{不|bú}{会|huì}{写|xiě}。', hu: 'Az írásjegyeket el tudom olvasni, de leírni nem tudom.' },
      { zh: '{我|wǒ}{的|de}{朋友|péng·you}{王明|Wáng Míng}{会|huì}{写|xiě}{很|hěn}{多|duō}{汉字|Hàn·zì}。', hu: 'A barátom, Wang Ming sok írásjegyet tud írni.', par: true },
      { zh: '{他|tā}{妈妈|mā·ma}{会|huì}{做|zuò}{中国菜|Zhōng·guó·cài}，{她|tā}{做|zuò}{的|de}{菜|cài}{很|hěn}{好吃|hǎo·chī}。', hu: 'Az anyja tud kínai ételt főzni, az ételei nagyon finomak.' },
      { zh: '{我|wǒ}{不|bú}{会|huì}{做|zuò}{菜|cài}。', hu: 'Én nem tudok főzni.', par: true }
    ],
    words: [ { zh: '{但是|dàn·shì}', hu: 'de' }, { zh: '{也|yě}', hu: 'is' }, { zh: '{多|duō}', hu: 'sok' } ],
    questions: [
      { q: 'Milyen nyelveken beszél David?', a: 'angolul, és egy kicsit kínaiul', wrong: ['csak angolul', 'jól kínaiul, angolul nem', 'magyarul és angolul'], why: '{我会说英语，也会说一点儿汉语|wǒ huì shuō Yīngyǔ, yě huì shuō yìdiǎnr Hànyǔ}.' },
      { q: 'Mit tud David az írásjegyekkel?', a: 'olvasni tudja, írni nem', wrong: ['írni tudja, olvasni nem', 'olvasni és írni is tudja', 'egyiket sem tudja'], why: '{我会读汉字，但是不会写|wǒ huì dú Hànzì, dànshì bú huì xiě}.' },
      { q: 'Ki tud sok írásjegyet írni?', a: 'Wang Ming', wrong: ['David', 'Wang Ming anyja', 'David anyja'], why: '{我的朋友王明会写很多汉字|wǒ de péngyou Wáng Míng huì xiě hěn duō Hànzì}.' },
      { q: 'Tud-e David főzni?', a: 'nem', wrong: ['igen, kínai ételt', 'igen, de csak egy kicsit', 'nem derül ki'], why: '{我不会做菜|wǒ bú huì zuò cài}.' }
    ]
  },
  quiz: [
    { q: '„Tudok kínaiul." — melyik a helyes?', a: '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', wrong: ['{我|wǒ}{是|shì}{汉语|Hàn·yǔ}。', '{我|wǒ}{会|huì}{汉语|Hàn·yǔ}{说|shuō}。', '{我|wǒ}{说|shuō}{会|huì}{汉语|Hàn·yǔ}。'], why: 'Alany – {会|huì} – ige – tárgy.', point: 1 },
    { q: 'Mit fejez ki a {会|huì}?', a: 'megtanult képességet', wrong: ['engedélyt (szabad-e)', 'testi erőt, lehetőséget', 'jövő időt'], why: 'A {会|huì} azt jelzi, hogy valaki megtanult valamit.', point: 1 },
    { q: 'Hogyan tagadod: {我会写汉字|wǒ huì xiě Hànzì}?', a: '{我|wǒ}{不|bú}{会|huì}{写|xiě}{汉字|Hàn·zì}。', wrong: ['{我|wǒ}{没|méi}{会|huì}{写|xiě}{汉字|Hàn·zì}。', '{我|wǒ}{会|huì}{不|bù}{写|xiě}{汉字|Hàn·zì}。', '{我|wǒ}{不是|bú shì}{写|xiě}{汉字|Hàn·zì}。'], why: 'A {会|huì} elé kerül a {不|bù}.', point: 1 },
    { q: 'Hogyan ejted a {不会|bú huì}-ban a {不|bù}-t?', a: 'bú', wrong: ['bù', 'bǔ', 'bū'], why: 'A {会|huì} 4. tónusú, ezért a {不|bù} 2. tónusú lesz.', point: 1 },
    { q: '„A kínai étel finom." — melyik a helyes?', a: '{中国菜|Zhōng·guó·cài}{很|hěn}{好吃|hǎo·chī}。', wrong: ['{中国菜|Zhōng·guó·cài}{是|shì}{好吃|hǎo·chī}。', '{中国菜|Zhōng·guó·cài}{是|shì}{很|hěn}{好吃|hǎo·chī}。', '{很|hěn}{好吃|hǎo·chī}{是|shì}{中国菜|Zhōng·guó·cài}。'], why: 'A melléknév közvetlenül az alany után áll, {是|shì} nélkül.', point: 2 },
    { q: 'Miért van ott a {很|hěn} a {我很好|wǒ hěn hǎo} mondatban?', a: 'mert állító mondatban a melléknév elé szinte mindig kell, a jelentése ilyenkor halvány', wrong: ['mert múlt időt jelöl az állító mondatban', 'mert a {很|hěn} itt a „vagyok" megfelelője, mint a {是|shì}', 'mert csak udvarias, idősebbeknek mondott mondatban kell'], why: 'A {很|hěn} „kerekíti le" a mondatot; nélküle szembeállítást sugallna.', point: 2 },
    { q: 'Hogyan mondod: „Nem finom."?', a: '{不|bù}{好吃|hǎo·chī}。', wrong: ['{很|hěn}{不|bù}{好吃|hǎo·chī}{是|shì}。', '{没|méi}{好吃|hǎo·chī}。', '{不是|bú shì}{好吃|hǎo·chī}。'], why: 'Melléknevet a {不|bù} tagad, {是|shì} nélkül.', point: 2 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{是|shì}{很|hěn}{好|hǎo}。', wrong: ['{我|wǒ}{很|hěn}{好|hǎo}。', '{她|tā}{的|de}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}。', '{菜|cài}{很|hěn}{好吃|hǎo·chī}。'], why: 'Melléknév elé nem kell {是|shì}.', point: 2 },
    { q: '„Hogy kell olvasni ezt az írásjegyet?"', a: '{这个|zhè·ge}{字|zì}{怎么|zěn·me}{读|dú}？', wrong: ['{这个|zhè·ge}{字|zì}{读|dú}{怎么|zěn·me}？', '{怎么|zěn·me}{这个|zhè·ge}{字|zì}{读|dú}{吗|ma}？', '{这个|zhè·ge}{字|zì}{什么|shén·me}{读|dú}？'], why: 'A {怎么|zěnme} az ige előtt áll.', point: 3 },
    { q: 'Mit jelent: {“谢谢”汉语怎么说|"xièxie" Hànyǔ zěnme shuō}？', a: 'Hogy mondják kínaiul, hogy „köszönöm"?', wrong: ['Miért mondod, hogy köszönöm?', 'Ki mondta, hogy köszönöm?', 'Tudsz kínaiul köszönni?'], why: '{怎么说|zěnme shuō} „hogyan mondják".', point: 3 },
    { q: 'Melyik igét használod: „kínaiul beszélni"?', a: '{说|shuō}', wrong: ['{写|xiě}', '{读|dú}', '{做|zuò}'], why: '{说汉语|shuō Hànyǔ}.', point: 4 },
    { q: 'Mit jelent a {写|xiě}?', a: 'írni', wrong: ['olvasni', 'beszélni', 'főzni'], why: '{写汉字|xiě Hànzì} „írásjegyet írni".', point: 4 },
    { q: 'Mit jelent a {字|zì}?', a: 'írásjegy, betű', wrong: ['szó, mondat', 'nyelv', 'név'], why: 'Egy {字|zì} egy írásjegy; a {汉字|Hànzì} a kínai írásjegy.', point: 4 },
    { q: '{你会说汉语吗|nǐ huì shuō Hànyǔ ma}？ — szerény igenlő válasz:', a: '{会|huì}{一点儿|yì·diǎnr}。', wrong: ['{很|hěn}{会|huì}{一点儿|yì·diǎnr}{说|shuō}。', '{一点儿|yì·diǎnr}{不|bú}{会|huì}。', '{是|shì}{一点儿|yì·diǎnr}。'], why: '{会一点儿|huì yìdiǎnr} „egy kicsit (tudok)".', point: 5 },
    { q: 'Mit jelöl a {一点儿|yìdiǎnr} végén az r?', a: 'az előző szótagot r-végűvé teszi (nem külön szótag)', wrong: ['egy külön, harmadik szótagot jelöl', 'a többes szám jele, mint a {们|men}', 'a semleges tónus jele a szó végén'], why: 'Pekingi r-esítés: <i>diǎn</i> + <i>r</i> = <i>diǎnr</i>.', point: 5 },
    { q: 'Mit jelent a {好吃|hǎochī}?', a: 'finom (étel)', wrong: ['sokat eszik', 'éhes', 'szép'], why: '{好|hǎo} „jó" + {吃|chī} „enni": jó enni → finom.', point: 2 },
    { q: 'Mit jelent: {他会做中国菜|tā huì zuò Zhōngguó cài}。', a: 'Tud kínai ételt főzni.', wrong: ['Kínai ételt eszik.', 'Kínai étteremben dolgozik.', 'Szereti a kínai ételt.'], why: '{会|huì} „tud" + {做菜|zuò cài} „ételt főzni".', point: 1 },
    { q: 'Melyik a helyes kérdés: „Finom?"', a: '{好吃|hǎo·chī}{吗|ma}？', wrong: ['{是|shì}{好吃|hǎo·chī}{吗|ma}？', '{很|hěn}{好吃|hǎo·chī}{呢|ne}？', '{好吃|hǎo·chī}{什么|shén·me}？'], why: 'Melléknév + {吗|ma}: {好吃吗|hǎochī ma}？', point: 2 }
  ]
},

/* ════════════════════════════════════════════════════
   7. LECKE — dátum, a hét napjai, 去 + hely + cselekvés
   ════════════════════════════════════════════════════ */
{
  id: 'l7', no: 7, kicker: 'HSK 1 · 7. lecke',
  title: 'Hányadika van ma? — dátum és tervek',
  lead: 'Megmondod, hányadika és milyen nap van, mit csinálsz holnap, és hová mész valamit csinálni. A dátum kínaiul a naptár logikáját követi: a nagyobb egység áll elöl.',
  cando: [
    'Megmondod és megkérdezed a dátumot (今天几月几号？).',
    'Megnevezed a hét napjait (星期一 … 星期天).',
    'Dátumot mondasz 是 nélkül (今天十月十八号).',
    'Elmondod, hová mész és mit csinálsz ott (我去学校看书).'
  ],
  intro: [
    'A dátumot a kínai pontosan úgy rakja össze, mint a magyar: <b>év – hónap – nap</b>, a nagyobb egység elöl. A hónapok és a hét napjai ráadásul egyszerűen számozottak: „egyes hónap" = január, „hét-egy" = hétfő. Ha tudsz tízig számolni, a naptárat már tudod.',
    'A lecke másik fele egy nagyon kínai szerkezet: a <b>sorba fűzött igék</b>. „Elmegyek a könyvtárba olvasni" kínaiul: „megyek könyvtár olvasok" — két ige kötőszó nélkül, egymás után, abban a sorrendben, ahogy a dolgok történnek.'
  ],
  dialogue: {
    title: 'Mit csinálsz holnap?',
    scene: 'Szombat délután. David és Anna az iskola előtt beszélgetnek.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{今天|jīn·tiān}{几|jǐ}{号|hào}？', hu: 'Anna, hányadika van ma?' },
      { who: 'Anna', zh: '{今天|jīn·tiān}{十月|shí·yuè}{十七|shí·qī}{号|hào}。', hu: 'Ma október tizenhetedike van.' },
      { who: 'David', zh: '{明天|míng·tiān}{星期|xīng·qī}{几|jǐ}？', hu: 'Holnap milyen nap van?' },
      { who: 'Anna', zh: '{明天|míng·tiān}{星期天|xīng·qī·tiān}。', hu: 'Holnap vasárnap.' },
      { who: 'David', zh: '{明天|míng·tiān}{你|nǐ}{去|qù}{学校|xué·xiào}{吗|ma}？', hu: 'Holnap mész az iskolába?' },
      { who: 'Anna', zh: '{去|qù}。{我|wǒ}{去|qù}{学校|xué·xiào}{看|kàn}{书|shū}。{你|nǐ}{呢|ne}？', hu: 'Megyek. Bemegyek az iskolába olvasni. És te?' },
      { who: 'David', zh: '{我|wǒ}{去|qù}{北京|Běi·jīng}{大学|dà·xué}{看|kàn}{朋友|péng·you}。', hu: 'Elmegyek a Pekingi Egyetemre meglátogatni egy barátomat.', note: 'A {看|kàn} jelentése „nézni, olvasni", emberrel pedig „meglátogatni": {看朋友|kàn péngyou}.' },
      { who: 'Anna', zh: '{星期一|xīng·qī·yī}{见|jiàn}！', hu: 'Hétfőn találkozunk!' }
    ],
    notes: [
      'A {今天十月十七号|jīntiān shíyuè shíqī hào} mondatban nincs ige: dátumnál, napnál, életkornál a {是|shì} elmaradhat.',
      'A {号|hào} a beszélt nyelv „nap (a hónapban)" szava; írásban, hivatalos szövegben {日|rì} áll helyette.',
      'A {星期天|xīngqītiān} „vasárnap" mellett a {星期日|xīngqīrì} is helyes (főleg írásban).'
    ]
  },
  points: [
    {
      title: '{年|nián}{月|yuè}{日|rì}', sub: 'a dátum: év – hónap – nap',
      pattern: 'évszám + {年|nián} · szám + {月|yuè} · szám + {号|hào}（{日|rì}）',
      body: 'A hónapok számozottak: {一月|yīyuè} „január", {二月|èryuè} „február" … {十二月|shí\'èryuè} „december". A nap: szám + {号|hào} (írásban {日|rì}). A sorrend a magyarral azonos: {十月十七号|shíyuè shíqī hào} „október 17.".',
      more: [
        'Az évszámot számjegyenként olvassák: {二〇二六年|èr líng èr liù nián} „2026". (A {〇|líng} a nulla egyik írásmódja.)',
        'Kérdés: {今天几月几号|jīntiān jǐ yuè jǐ hào}？ „Hányadika van ma?" — a {几|jǐ} a hiányzó szám helyén.'
      ],
      tables: [
        { caption: 'A hónapok',
          head: ['', '', ''],
          rows: [
            ['{一月|yī·yuè} január', '{二月|èr·yuè} február', '{三月|sān·yuè} március'],
            ['{四月|sì·yuè} április', '{五月|wǔ·yuè} május', '{六月|liù·yuè} június'],
            ['{七月|qī·yuè} július', '{八月|bā·yuè} augusztus', '{九月|jiǔ·yuè} szeptember'],
            ['{十月|shí·yuè} október', '{十一月|shí·yī·yuè} november', '{十二月|shí·èr·yuè} december']
          ] }
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{几|jǐ}{月|yuè}{几|jǐ}{号|hào}？', hu: 'Hányadika van ma?' },
        { zh: '{今天|jīn·tiān}{十月|shí·yuè}{十七|shí·qī}{号|hào}。', hu: 'Ma október 17. van.' },
        { zh: '{我|wǒ}{的|de}{生日|shēng·rì}{是|shì}{五月|wǔ·yuè}{三|sān}{号|hào}。', hu: 'A születésnapom május 3.' }
      ],
      mistakes: [
        { bad: '{十七|shí·qī}{号|hào}{十月|shí·yuè}', good: '{十月|shí·yuè}{十七|shí·qī}{号|hào}', why: 'A nagyobb egység áll elöl: hónap, aztán nap.' },
        { bad: '{月|yuè}{十|shí} (= október)', good: '{十月|shí·yuè}', why: 'A szám áll a {月|yuè} előtt. A {十个月|shí ge yuè} viszont „tíz hónap" (időtartam)!' }
      ]
    },
    {
      title: '{星期|xīngqī}', sub: 'a hét napjai',
      pattern: '{星期|xīng·qī} + {一|yī}…{六|liù} · {星期天|xīng·qī·tiān}',
      body: 'A hét {星期|xīngqī}, a napok egyszerűen számozottak: {星期一|xīngqīyī} „hétfő", {星期二|xīngqī\'èr} „kedd" … {星期六|xīngqīliù} „szombat". A vasárnap kivétel: {星期天|xīngqītiān} vagy {星期日|xīngqīrì} — nincs „hetedik nap".',
      more: [
        'Kérdés: {今天星期几|jīntiān xīngqī jǐ}？ „Milyen nap van ma?" — megint a {几|jǐ} áll a szám helyén.',
        'A beszélt nyelvben a {星期|xīngqī} helyett gyakran {周|zhōu} vagy {礼拜|lǐbài} áll: {周一|zhōuyī} „hétfő", {礼拜天|lǐbàitiān} „vasárnap".'
      ],
      tables: [
        { caption: 'A hét napjai',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{星期一|xīng·qī·yī}', 'hétfő'], ['{星期二|xīng·qī·èr}', 'kedd'], ['{星期三|xīng·qī·sān}', 'szerda'],
            ['{星期四|xīng·qī·sì}', 'csütörtök'], ['{星期五|xīng·qī·wǔ}', 'péntek'], ['{星期六|xīng·qī·liù}', 'szombat'],
            ['{星期天|xīng·qī·tiān} / {星期日|xīng·qī·rì}', 'vasárnap']
          ] }
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{星期|xīng·qī}{几|jǐ}？', hu: 'Milyen nap van ma?' },
        { zh: '{今天|jīn·tiān}{星期五|xīng·qī·wǔ}。', hu: 'Ma péntek van.' },
        { zh: '{明天|míng·tiān}{星期六|xīng·qī·liù}。', hu: 'Holnap szombat.' }
      ],
      tip: 'A hét napjainál könnyű hibázni egyet: a {星期一|xīngqīyī} a hétfő, nem a vasárnap — a kínai hét is hétfővel kezdődik.'
    },
    {
      title: '{今天|jīntiān}{星期五|xīngqīwǔ}', sub: 'mondat ige nélkül: dátum, nap, életkor',
      pattern: 'A + dátum / nap / életkor  ·  tagadva: A + {不是|bú shì} + …',
      body: 'Ha az állítmány egy dátum, egy nap, egy életkor vagy egy ár, a {是|shì} rendszerint elmarad: {今天十月十七号|jīntiān shíyuè shíqī hào} „ma október 17. van", {明天星期天|míngtiān xīngqītiān} „holnap vasárnap", {她二十岁|tā èrshí suì} „húszéves".',
      more: [
        'Tagadáskor viszont a {是|shì} visszatér: {今天不是星期五|jīntiān bú shì xīngqīwǔ} „ma nem péntek van".',
        'Az ilyen mondat is kérdezhető {吗|ma}-val: {明天星期天吗|míngtiān xīngqītiān ma}？ — de gyakoribb a kérdőszavas forma: {明天星期几|míngtiān xīngqī jǐ}？'
      ],
      examples: [
        { zh: '{明天|míng·tiān}{星期天|xīng·qī·tiān}。', hu: 'Holnap vasárnap.' },
        { zh: '{今天|jīn·tiān}{不是|bú shì}{星期五|xīng·qī·wǔ}。', hu: 'Ma nem péntek van.' },
        { zh: '{昨天|zuó·tiān}{十月|shí·yuè}{十六|shí·liù}{号|hào}。', hu: 'Tegnap október 16. volt.' }
      ],
      mistakes: [
        { bad: '{今天|jīn·tiān}{不|bù}{星期五|xīng·qī·wǔ}。', good: '{今天|jīn·tiān}{不是|bú shì}{星期五|xīng·qī·wǔ}。', why: 'Tagadáskor a {是|shì} nem maradhat el.' }
      ]
    },
    {
      title: '{去|qù} + hely + cselekvés', sub: 'sorba fűzött igék: {去|qù}{学校|xué·xiào}{看|kàn}{书|shū}',
      pattern: 'A + {去|qù} + hely + ige (+ tárgy)',
      body: 'Ha valahová elmész valamit csinálni, a két igét egyszerűen egymás után mondod, abban a sorrendben, ahogy történnek: {我去学校看书|wǒ qù xuéxiào kàn shū} „elmegyek az iskolába olvasni" (szó szerint: „megyek iskola nézek könyv"). Nincs „azért, hogy", nincs „-ni" végződés.',
      more: [
        'A cél (mit csinálsz) mindig a hely után jön: {去商店买东西|qù shāngdiàn mǎi dōngxi} „elmegy a boltba vásárolni", {去中国学汉语|qù Zhōngguó xué Hànyǔ} „Kínába megy kínait tanulni".',
        'A {去|qù} után közvetlenül áll a hely, elöljárószó nélkül: {去北京|qù Běijīng} „Pekingbe megy" — a magyar „-ba/-be" ragnak itt nincs megfelelője.'
      ],
      examples: [
        { zh: '{我|wǒ}{去|qù}{学校|xué·xiào}{看|kàn}{书|shū}。', hu: 'Elmegyek az iskolába olvasni.' },
        { zh: '{她|tā}{去|qù}{北京|Běi·jīng}{看|kàn}{朋友|péng·you}。', hu: 'Pekingbe megy meglátogatni a barátját.' },
        { zh: '{你|nǐ}{去|qù}{中国|Zhōng·guó}{学|xué}{汉语|Hàn·yǔ}{吗|ma}？', hu: 'Kínába mész kínait tanulni?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{看|kàn}{书|shū}{去|qù}{学校|xué·xiào}。', good: '{我|wǒ}{去|qù}{学校|xué·xiào}{看|kàn}{书|shū}。', why: 'Az események sorrendje: előbb odamész, aztán olvasol.' }
      ]
    },
    {
      title: '{昨天|zuótiān} · {今天|jīntiān} · {明天|míngtiān}', sub: 'időhatározó: az ige előtt',
      pattern: 'időpont + A + ige · A + időpont + ige',
      body: 'Az időhatározó ({昨天|zuótiān} „tegnap", {今天|jīntiān} „ma", {明天|míngtiān} „holnap") <b>az ige előtt</b> áll: vagy a mondat elején, vagy közvetlenül az alany után. {明天我去学校|míngtiān wǒ qù xuéxiào} = {我明天去学校|wǒ míngtiān qù xuéxiào} „holnap megyek az iskolába". A mondat végére nem kerülhet, mint az angolban.',
      more: [
        'A kínai igének nincs múlt és jövő ideje: az időt gyakran csak az időhatározó mutatja. {我明天去|wǒ míngtiān qù} „holnap megyek", {我昨天去了|wǒ zuótiān qù le} „tegnap mentem" (a {了|le}-ról a 14. leckében lesz szó).'
      ],
      examples: [
        { zh: '{明天|míng·tiān}{我|wǒ}{去|qù}{学校|xué·xiào}。', hu: 'Holnap megyek az iskolába.' },
        { zh: '{我|wǒ}{今天|jīn·tiān}{不|bú}{去|qù}。', hu: 'Ma nem megyek.' },
        { zh: '{昨天|zuó·tiān}{星期四|xīng·qī·sì}。', hu: 'Tegnap csütörtök volt.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{去|qù}{学校|xué·xiào}{明天|míng·tiān}。', good: '{我|wǒ}{明天|míng·tiān}{去|qù}{学校|xué·xiào}。', why: 'Az időhatározó az ige elé kerül, nem a mondat végére.' }
      ]
    }
  ],
  phrases: [
    { zh: '{今天|jīn·tiān}{几|jǐ}{号|hào}？', hu: 'Hányadika van ma?' },
    { zh: '{今天|jīn·tiān}{星期|xīng·qī}{几|jǐ}？', hu: 'Milyen nap van ma?' },
    { zh: '{明天|míng·tiān}{见|jiàn}！', hu: 'Holnap találkozunk!' },
    { zh: '{星期一|xīng·qī·yī}{见|jiàn}！', hu: 'Hétfőn találkozunk!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{月|yuè}', pinyin: 'yuè', hu: 'hónap; hold' },
        { zh: '{号|hào}', pinyin: 'hào', hu: 'nap (a hónapban); szám' },
        { zh: '{星期|xīng·qī}', pinyin: 'xīngqī', hu: 'hét (naptári)' },
        { zh: '{昨天|zuó·tiān}', pinyin: 'zuótiān', hu: 'tegnap' },
        { zh: '{今天|jīn·tiān}', pinyin: 'jīntiān', hu: 'ma' },
        { zh: '{明天|míng·tiān}', pinyin: 'míngtiān', hu: 'holnap' },
        { zh: '{去|qù}', pinyin: 'qù', hu: 'menni' },
        { zh: '{学校|xué·xiào}', pinyin: 'xuéxiào', hu: 'iskola' },
        { zh: '{看|kàn}', pinyin: 'kàn', hu: 'nézni, olvasni; meglátogatni' },
        { zh: '{书|shū}', pinyin: 'shū', hu: 'könyv' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{年|nián}', pinyin: 'nián', hu: 'év' },
        { zh: '{日|rì}', pinyin: 'rì', hu: 'nap (írásban)' },
        { zh: '{大学|dà·xué}', pinyin: 'dàxué', hu: 'egyetem' },
        { zh: '{生日|shēng·rì}', pinyin: 'shēngrì', hu: 'születésnap' },
        { zh: '{学|xué}', pinyin: 'xué', hu: 'tanulni' }
      ] }
  ],
  culture: [
    { title: 'Két naptár', text: 'Kínában a hétköznapokban a Gergely-naptárt használják, de az ünnepek nagy része a hagyományos holdnaptárhoz igazodik. Ezért vándorol évről évre a kínai újév ({春节|Chūnjié} „tavaszünnep") január vége és február közepe között. A holdnaptár szerinti születésnapot sok idősebb ember ma is számon tartja.' },
    { title: 'Aranyhetek', text: 'Kínában két nagy, egyhetes ünnep van: a tavaszünnep és az október eleji nemzeti ünnep ({国庆节|Guóqìngjié}, október 1.). Ilyenkor százmilliók utaznak haza a családjukhoz — a világ legnagyobb éves népvándorlása. A szabadnapok miatt a környező hétvégéken gyakran szombaton is dolgozni kell.' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{星期天|xīng·qī·tiān}', titleHu: 'Az én vasárnapom',
    text: [
      { zh: '{今天|jīn·tiān}{十月|shí·yuè}{十八|shí·bā}{号|hào}，{星期天|xīng·qī·tiān}。', hu: 'Ma október 18. van, vasárnap.' },
      { zh: '{我|wǒ}{今天|jīn·tiān}{不|bú}{去|qù}{学校|xué·xiào}。', hu: 'Ma nem megyek az iskolába.' },
      { zh: '{上午|shàng·wǔ}{我|wǒ}{在|zài}{家|jiā}{看|kàn}{书|shū}，{下午|xià·wǔ}{去|qù}{北京|Běi·jīng}{大学|dà·xué}{看|kàn}{朋友|péng·you}。', hu: 'Délelőtt otthon olvasok, délután elmegyek a Pekingi Egyetemre meglátogatni egy barátomat.', par: true },
      { zh: '{我|wǒ}{的|de}{朋友|péng·you}{叫|jiào}{李|Lǐ}{华|Huá}，{他|tā}{是|shì}{大学生|dà·xué·shēng}。', hu: 'A barátomat Li Huának hívják, egyetemista.' },
      { zh: '{明天|míng·tiān}{星期一|xīng·qī·yī}，{我|wǒ}{去|qù}{学校|xué·xiào}{学|xué}{汉语|Hàn·yǔ}。', hu: 'Holnap hétfő, megyek az iskolába kínait tanulni.', par: true }
    ],
    words: [ { zh: '{上午|shàng·wǔ}', hu: 'délelőtt' }, { zh: '{下午|xià·wǔ}', hu: 'délután' }, { zh: '{在|zài}{家|jiā}', hu: 'otthon' } ],
    questions: [
      { q: 'Milyen nap van ma?', a: 'vasárnap, október 18.', wrong: ['hétfő, október 18.', 'szombat, október 17.', 'vasárnap, augusztus 10.'], why: '{十月十八号|shíyuè shíbā hào}，{星期天|xīngqītiān}.' },
      { q: 'Mit csinál délelőtt?', a: 'otthon olvas', wrong: ['iskolába megy', 'meglátogatja a barátját', 'kínait tanul az iskolában'], why: '{上午我在家看书|shàngwǔ wǒ zài jiā kàn shū}.' },
      { q: 'Hová megy délután, és miért?', a: 'a Pekingi Egyetemre, meglátogatni a barátját', wrong: ['az iskolába, olvasni', 'a boltba, vásárolni', 'haza, főzni'], why: '{下午去北京大学看朋友|xiàwǔ qù Běijīng dàxué kàn péngyou}.' },
      { q: 'Mit csinál holnap?', a: 'iskolába megy kínait tanulni', wrong: ['otthon marad olvasni', 'Pekingbe utazik', 'meglátogatja Li Huát'], why: '{明天星期一，我去学校学汉语|míngtiān xīngqīyī, wǒ qù xuéxiào xué Hànyǔ}.' }
    ]
  },
  quiz: [
    { q: 'Hogyan mondod: „október 1."?', a: '{十月|shí·yuè}{一|yī}{号|hào}', wrong: ['{一|yī}{号|hào}{十月|shí·yuè}', '{月|yuè}{十|shí}{一|yī}{号|hào}', '{十|shí}{一|yī}{月|yuè}{号|hào}'], why: 'Hónap, aztán nap: {十月一号|shíyuè yī hào}.', point: 1 },
    { q: 'Melyik hónap a {十二月|shí\'èryuè}?', a: 'december', wrong: ['február', 'november', 'tizenkét hónap'], why: '12. hónap = december.', point: 1 },
    { q: 'Hogyan kérdezed: „Hányadika van ma?"', a: '{今天|jīn·tiān}{几|jǐ}{号|hào}？', wrong: ['{今天|jīn·tiān}{是|shì}{号|hào}{吗|ma}？', '{几|jǐ}{今天|jīn·tiān}{号|hào}？', '{今天|jīn·tiān}{什么|shén·me}{星期|xīng·qī}？'], why: 'A {几|jǐ} a szám helyén: {几号|jǐ hào}.', point: 1 },
    { q: 'Melyik nap a {星期三|xīngqīsān}?', a: 'szerda', wrong: ['kedd', 'csütörtök', 'vasárnap'], why: 'A hét hétfővel kezdődik: 1 hétfő, 2 kedd, 3 szerda.', point: 2 },
    { q: 'Hogyan mondod: „vasárnap"?', a: '{星期天|xīng·qī·tiān}', wrong: ['{星期七|xīng·qī·qī}', '{星期一|xīng·qī·yī}', '{星期零|xīng·qī·líng}'], why: 'A vasárnap kivétel: {星期天|xīngqītiān} / {星期日|xīngqīrì}.', point: 2 },
    { q: 'Mit jelent: {今天星期几|jīntiān xīngqī jǐ}？', a: 'Milyen nap van ma?', wrong: ['Hány hét van még?', 'Hányadika van ma?', 'Mennyi az idő?'], why: '{星期几|xīngqī jǐ} „a hét hányadik napja".', point: 2 },
    { q: 'Melyik mondat helyes?', a: '{明天|míng·tiān}{星期六|xīng·qī·liù}。', wrong: ['{明天|míng·tiān}{是|shì}{很|hěn}{星期六|xīng·qī·liù}。', '{明天|míng·tiān}{不|bù}{星期六|xīng·qī·liù}。', '{星期六|xīng·qī·liù}{明天|míng·tiān}{是|shì}{吗|ma}。'], why: 'Napnál a {是|shì} elmaradhat; tagadáskor viszont kell.', point: 3 },
    { q: '„Ma nem péntek van."', a: '{今天|jīn·tiān}{不是|bú shì}{星期五|xīng·qī·wǔ}。', wrong: ['{今天|jīn·tiān}{不|bù}{星期五|xīng·qī·wǔ}。', '{今天|jīn·tiān}{没|méi}{星期五|xīng·qī·wǔ}。', '{不|bù}{今天|jīn·tiān}{星期五|xīng·qī·wǔ}。'], why: 'Tagadáskor a {是|shì} visszatér: {不是|bú shì}.', point: 3 },
    { q: '„Elmegyek az iskolába olvasni."', a: '{我|wǒ}{去|qù}{学校|xué·xiào}{看|kàn}{书|shū}。', wrong: ['{我|wǒ}{看|kàn}{书|shū}{去|qù}{学校|xué·xiào}。', '{我|wǒ}{去|qù}{看|kàn}{书|shū}{学校|xué·xiào}。', '{我|wǒ}{学校|xué·xiào}{去|qù}{看|kàn}{书|shū}。'], why: 'Menni + hely + cselekvés, a történés sorrendjében.', point: 4 },
    { q: 'Mit jelent: {她去北京看朋友|tā qù Běijīng kàn péngyou}。', a: 'Pekingbe megy meglátogatni a barátját.', wrong: ['Pekingben nézi a barátját.', 'A barátja Pekingbe megy.', 'Pekingből jön a barátja.'], why: '{看朋友|kàn péngyou} „barátot meglátogatni".', point: 4 },
    { q: 'Hová kerül a {明天|míngtiān} a mondatban?', a: 'az ige elé (a mondat elejére vagy az alany után)', wrong: ['mindig a mondat legvégére, mint angolul', 'közvetlenül a tárgy után, a mondat végén', 'csak a kérdő mondat végére a {吗|ma} elé'], why: '{我明天去|wǒ míngtiān qù} vagy {明天我去|míngtiān wǒ qù}.', point: 5 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{去|qù}{学校|xué·xiào}{明天|míng·tiān}。', wrong: ['{我|wǒ}{明天|míng·tiān}{去|qù}{学校|xué·xiào}。', '{明天|míng·tiān}{我|wǒ}{去|qù}{学校|xué·xiào}。', '{明天|míng·tiān}{你|nǐ}{去|qù}{吗|ma}？'], why: 'Az időhatározó nem állhat a mondat végén.', point: 5 },
    { q: 'Mit jelent a {昨天|zuótiān}?', a: 'tegnap', wrong: ['ma', 'holnap', 'tegnapelőtt'], why: '{昨天|zuótiān} tegnap · {今天|jīntiān} ma · {明天|míngtiān} holnap.', point: 5 },
    { q: 'Mit jelent a {看|kàn} a {看书|kàn shū} kifejezésben?', a: 'olvasni (szó szerint: nézni)', wrong: ['írni (szó szerint: rajzolni)', 'venni (szó szerint: fizetni)', 'tanulni (szó szerint: hallgatni)'], why: 'A {看|kàn} „nézni"; könyvvel „olvasni", emberrel „meglátogatni".', point: 4 },
    { q: 'Mi a különbség a {号|hào} és a {日|rì} között?', a: 'a {号|hào} beszélt nyelvi, a {日|rì} írásbeli', wrong: ['a {号|hào} a hónap, a {日|rì} a nap', 'a {日|rì} a hét napja', 'nincs különbség, mindkettő „hónap"'], why: 'Mindkettő a hónap napját jelöli.', point: 1 },
    { q: 'Hogyan olvasod: 2026{年|nián}?', a: '{二〇二六年|èr líng èr liù nián}', wrong: ['{两千二十六年|liǎngqiān èrshíliù nián}', '{二十六年|èrshíliù nián}', '{二千年|èrqiān nián}'], why: 'Az évszámot számjegyenként olvassák.', point: 1 },
    { q: 'Mit jelent a {学校|xuéxiào}?', a: 'iskola', wrong: ['tanulni', 'diák', 'könyv'], why: '{学校|xuéxiào} „iskola", {学生|xuésheng} „diák".' },
    { q: '{明天你去学校吗|míngtiān nǐ qù xuéxiào ma}？ — igenlő rövid válasz:', a: '{去|qù}。', wrong: ['{是|shì}。', '{会|huì}。', '{好|hǎo}。'], why: 'Az igenlő válasz a kérdés igéje: {去|qù}.', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   8. LECKE — 想, 多少, mérőszavak, pénz
   ════════════════════════════════════════════════════ */
{
  id: 'l8', no: 8, kicker: 'HSK 1 · 8. lecke',
  title: 'Mit kérsz? — kívánság, vásárlás, pénz',
  lead: 'Elmondod, mit szeretnél enni, inni, venni, megkérdezed az árát, és kifizeted. Közben megismered a kínai nyelv egyik legfontosabb sajátosságát: a mérőszavakat.',
  cando: [
    'Elmondod, mit szeretnél (我想喝茶), és mit nem (我不想去).',
    'Megkérdezed az árat (多少钱？), és megérted a választ (二十八块).',
    'Számolsz mérőszóval: 一个杯子, 三本书, 一杯茶.',
    'Rámutatsz valamire: 这个, 那个.'
  ],
  intro: [
    'A vásárlás az első igazán gyakorlati helyzet, ahol a kínait használhatod. Három dolog kell hozzá: kifejezni, mit akarsz ({想|xiǎng}), megkérdezni az árat ({多少钱|duōshao qián}), és jól megszámolni a dolgokat.',
    'Ez utóbbi a nehezebb: a kínaiban a szám és a főnév közé <b>mérőszó</b> kerül, mint a magyar „két <i>szál</i> virág", „egy <i>pohár</i> víz", csak sokkal gyakrabban: minden megszámolt dologhoz. A legáltalánosabb a {个|gè}, de sok tárgynak saját mérőszava van.'
  ],
  dialogue: {
    title: 'A teázóban és a boltban',
    scene: 'Anna és Wang Ming egy teázóba ül be, aztán bemennek a szomszédos boltba bögrét venni.',
    lines: [
      { who: 'Wang Ming', zh: '{你|nǐ}{想|xiǎng}{喝|hē}{什么|shén·me}？', hu: 'Mit szeretnél inni?' },
      { who: 'Anna', zh: '{我|wǒ}{想|xiǎng}{喝|hē}{茶|chá}。', hu: 'Teát szeretnék inni.' },
      { who: 'Wang Ming', zh: '{服务员|fú·wù·yuán}，{两|liǎng}{杯|bēi}{茶|chá}！', hu: 'Pincér, két teát kérünk!', note: 'Két csésze: {两杯|liǎng bēi} — mérőszó előtt a „kettő" {两|liǎng}, nem {二|èr}.' },
      { who: 'Anna', zh: '{这个|zhè·ge}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', hu: 'Mennyibe kerül ez a bögre?', note: 'A boltban.' },
      { who: 'Eladó', zh: '{二十八|èr·shí·bā}{块|kuài}。', hu: 'Huszonnyolc jüan.' },
      { who: 'Anna', zh: '{那个|nà·ge}{呢|ne}？', hu: 'És az ott?' },
      { who: 'Eladó', zh: '{那个|nà·ge}{十五|shí·wǔ}{块|kuài}。', hu: 'Az tizenöt jüan.' },
      { who: 'Anna', zh: '{我|wǒ}{买|mǎi}{两|liǎng}{个|ge}{那个|nà·ge}，{一共|yí·gòng}{三十|sān·shí}{块|kuài}，{对|duì}{吗|ma}？', hu: 'Abból veszek kettőt, összesen harminc jüan, igaz?' },
      { who: 'Eladó', zh: '{对|duì}，{三十|sān·shí}{块|kuài}。{谢谢|xiè·xie}！', hu: 'Igen, harminc jüan. Köszönöm!' }
    ],
    notes: [
      'A {想|xiǎng} itt „szeretne, kedve van", és mindig ige áll utána: {想喝茶|xiǎng hē chá}.',
      'A {块|kuài} a jüan beszélt nyelvi neve; az árcédulán {元|yuán} áll.',
      'A {这个|zhège} „ez" és a {那个|nàge} „az" mérőszóval álló mutató szó: magában is megállhat, ha a helyzetből világos, miről van szó.'
    ]
  },
  points: [
    {
      title: '{想|xiǎng}', sub: 'szeretne, akar valamit csinálni',
      pattern: 'A + {想|xiǎng} + ige (+ tárgy) · A + {不想|bù xiǎng} + ige',
      body: 'A {想|xiǎng} segédigeként kívánságot fejez ki: „szeretne, kedve van valamihez". Ige áll utána: {我想喝茶|wǒ xiǎng hē chá} „teát szeretnék inni", {我想去中国|wǒ xiǎng qù Zhōngguó} „Kínába szeretnék menni". Tagadva {不想|bù xiǎng} „nincs kedve, nem akar".',
      more: [
        'Kérdés: {你想吃什么|nǐ xiǎng chī shénme}？ „Mit szeretnél enni?" vagy {你想去吗|nǐ xiǎng qù ma}？ „Szeretnél menni?"',
        'A {想|xiǎng} önálló igeként „gondolni, gondolkodni; hiányzik valaki" jelentésű: {我想你|wǒ xiǎng nǐ} „hiányzol". Ige előtt azonban mindig „szeretne".'
      ],
      examples: [
        { zh: '{我|wǒ}{想|xiǎng}{喝|hē}{茶|chá}。', hu: 'Teát szeretnék inni.' },
        { zh: '{你|nǐ}{想|xiǎng}{吃|chī}{什么|shén·me}？', hu: 'Mit szeretnél enni?' },
        { zh: '{我|wǒ}{不|bù}{想|xiǎng}{去|qù}{商店|shāng·diàn}。', hu: 'Nincs kedvem boltba menni.' },
        { zh: '{下午|xià·wǔ}{我|wǒ}{想|xiǎng}{去|qù}{买|mǎi}{杯子|bēi·zi}。', hu: 'Délután bögrét szeretnék venni.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{想|xiǎng}{茶|chá}。', good: '{我|wǒ}{想|xiǎng}{喝|hē}{茶|chá}。', why: 'A „szeretne" jelentésű {想|xiǎng} után ige kell.' }
      ]
    },
    {
      title: '{个|gè} · {杯|bēi} · {本|běn}', sub: 'mérőszavak: szám + mérőszó + főnév',
      pattern: 'szám / {这|zhè} / {那|nà} / {几|jǐ} + mérőszó + főnév',
      body: 'A kínaiban a szám és a főnév közé <b>mindig mérőszó</b> kerül: {一个杯子|yí ge bēizi} „egy bögre", {三本书|sān běn shū} „három könyv", {一杯茶|yì bēi chá} „egy csésze tea". A legáltalánosabb a {个|gè} (emberekre és sok tárgyra); egyes dolgoknak saját mérőszavuk van, amely gyakran az alakjukra utal.',
      more: [
        'Nem csak számok után: a {这|zhè} „ez", a {那|nà} „az" és a {几|jǐ} „hány" után is: {这个人|zhège rén} „ez az ember", {几本书|jǐ běn shū} „hány könyv".',
        'Ha nem tudod a pontos mérőszót, a {个|gè} sokszor elfogadható — a kínaiak megértenek, csak kicsit „kezdős" lesz.',
        'A {个|gè} mérőszóként semleges tónusú: <i>yí ge</i>.'
      ],
      tables: [
        { caption: 'Gyakori mérőszavak',
          head: ['Mérőszó', 'Mire', 'Példa'],
          rows: [
            ['{个|gè}', 'általános: emberek, sok tárgy', '{一个|yí ge}{人|rén} · {三个|sān ge}{杯子|bēi·zi}'],
            ['{口|kǒu}', 'családtagok', '{四口|sì kǒu}{人|rén}'],
            ['{本|běn}', 'könyvek, füzetek', '{两本|liǎng běn}{书|shū}'],
            ['{杯|bēi}', 'egy pohár/csésze (ital)', '{一杯|yì bēi}{茶|chá} · {两杯|liǎng bēi}{水|shuǐ}'],
            ['{块|kuài}', 'pénz (jüan)', '{十|shí}{块|kuài}{钱|qián}']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{想|xiǎng}{买|mǎi}{一个|yí ge}{杯子|bēi·zi}。', hu: 'Szeretnék venni egy bögrét.' },
        { zh: '{他|tā}{有|yǒu}{三|sān}{本|běn}{汉语|Hàn·yǔ}{书|shū}。', hu: 'Három kínai könyve van.' },
        { zh: '{两|liǎng}{杯|bēi}{茶|chá}，{谢谢|xiè·xie}！', hu: 'Két teát kérek, köszönöm!' }
      ],
      mistakes: [
        { bad: '{三|sān}{书|shū}', good: '{三|sān}{本|běn}{书|shū}', why: 'Szám és főnév közé mérőszó kell.' },
        { bad: '{二|èr}{个|ge}{杯子|bēi·zi}', good: '{两|liǎng}{个|ge}{杯子|bēi·zi}', why: 'Mérőszó előtt a „kettő" {两|liǎng}.' }
      ]
    },
    {
      title: '{多少|duōshao}', sub: '„mennyi?" — nagy számokra, árra',
      pattern: '{多少|duō·shao} (+ mérőszó) + főnév？ · {多少|duō·shao}{钱|qián}？',
      body: 'A {多少|duōshao} „mennyi, hány" akkor kérdez, ha a válasz nagy szám lehet, vagy nem tudod, mekkorára számíts: {你们学校有多少学生|nǐmen xuéxiào yǒu duōshao xuésheng}？ „Hány diák van az iskolátokban?" Az árat mindig ezzel kérdezik: {多少钱|duōshao qián}？ „Mennyibe kerül?"',
      more: [
        'A {多少|duōshao} után a mérőszó elmaradhat ({多少学生|duōshao xuésheng}), a {几|jǐ} után viszont kötelező ({几个学生|jǐ ge xuésheng}).',
        'A {几|jǐ} tehát kis számra (kb. 10 alatt), a {多少|duōshao} bármekkora számra jó.'
      ],
      tables: [
        { caption: '{几|jǐ} vagy {多少|duō·shao}?',
          head: ['', '{几|jǐ}', '{多少|duō·shao}'],
          rows: [
            ['várt szám', 'kicsi (kb. 10 alatt)', 'bármekkora'],
            ['mérőszó utána', 'kötelező', 'elmaradhat'],
            ['példa', '{几个|jǐ ge}{人|rén}？', '{多少|duō·shao}{人|rén}？'],
            ['ár', '—', '{多少|duō·shao}{钱|qián}？']
          ] }
      ],
      examples: [
        { zh: '{这个|zhè·ge}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', hu: 'Mennyibe kerül ez a bögre?' },
        { zh: '{你们|nǐ·men}{学校|xué·xiào}{有|yǒu}{多少|duō·shao}{学生|xué·sheng}？', hu: 'Hány diák van az iskolátokban?' }
      ],
      mistakes: [
        { bad: '{几|jǐ}{钱|qián}？', good: '{多少|duō·shao}{钱|qián}？', why: 'Árat a {多少|duōshao} kérdez.' }
      ]
    },
    {
      title: '{块|kuài} · {毛|máo} · {分|fēn}', sub: 'a kínai pénz',
      pattern: 'szám + {块|kuài}（+ szám + {毛|máo}）',
      body: 'A kínai pénz a {人民币|rénmínbì} („népi pénz"), egysége a jüan. Beszédben a jüan neve {块|kuài}, a tized része {毛|máo}: {二十八块|èrshíbā kuài} „28 jüan", {三块五毛|sān kuài wǔ máo} „3,50 jüan". Írásban és hivatalosan {元|yuán} és {角|jiǎo} áll.',
      more: [
        'Az utolsó egység gyakran elmarad: {三块五|sān kuài wǔ} = 3,50 jüan. A {分|fēn} (a jüan századrésze) a mindennapokban már alig létezik.',
        'A „kettő" itt is {两|liǎng}: {两块|liǎng kuài} „2 jüan". De: {十二块|shí\'èr kuài} „12 jüan" — összetett számban {二|èr} marad.',
        'Kínában ma szinte mindenki telefonnal, QR-kóddal fizet; a készpénz ritka.'
      ],
      tables: [
        { caption: 'Beszélt és írott pénznevek',
          head: ['Érték', 'Beszédben', 'Írásban'],
          rows: [
            ['1 jüan', '{一块|yí kuài}（{钱|qián}）', '{一元|yì yuán}'],
            ['0,1 jüan', '{一毛|yì máo}', '{一角|yì jiǎo}'],
            ['3,50 jüan', '{三块五|sān kuài wǔ}', '{三元五角|sān yuán wǔ jiǎo}']
          ] }
      ],
      examples: [
        { zh: '{二十八|èr·shí·bā}{块|kuài}。', hu: 'Huszonnyolc jüan.' },
        { zh: '{一|yì}{杯|bēi}{茶|chá}{十二|shí·èr}{块|kuài}。', hu: 'Egy tea tizenkét jüan.' },
        { zh: '{一共|yí·gòng}{多少|duō·shao}{钱|qián}？', hu: 'Összesen mennyi?' }
      ]
    },
    {
      title: '{这|zhè} · {那|nà}', sub: 'ez, az — és az {一|yī} tónusa',
      pattern: '{这|zhè} / {那|nà} + mérőszó + főnév',
      body: 'A {这|zhè} „ez (itt)", a {那|nà} „az (ott)". Főnév előtt mérőszóval állnak: {这个杯子|zhège bēizi} „ez a bögre", {那本书|nà běn shū} „az a könyv". Magukban is megállnak: {这是我的书|zhè shì wǒ de shū} „ez az én könyvem", {那个呢|nàge ne}？ „és az?"',
      more: [
        'Figyelj: a {那|nà} „az" 4. tónusú, a {哪|nǎ} „melyik" (4. lecke) 3. tónusú.',
        'Az {一|yī} tónusa is változik, mint a {不|bù}-é: 4. tónus előtt 2. tónus ({一个|yí ge}, {一共|yígòng}), 1., 2., 3. tónus előtt 4. tónus ({一杯|yì bēi}, {一点儿|yìdiǎnr}). Egymagában, számolásnál, sorszámban marad <i>yī</i>: {十一|shíyī}, {星期一|xīngqīyī}.'
      ],
      tables: [
        { caption: 'Az {一|yī} kiejtése',
          head: ['Helyzet', 'Ejtés', 'Példa'],
          rows: [
            ['egymagában, szám végén, sorszámban', 'yī', '{十一|shí·yī} · {星期一|xīng·qī·yī}'],
            ['4. tónus előtt', 'yí', '{一个|yí ge} · {一共|yí·gòng}'],
            ['1., 2., 3. tónus előtt', 'yì', '{一杯|yì bēi} · {一点儿|yì·diǎnr}']
          ] }
      ],
      examples: [
        { zh: '{这个|zhè·ge}{多少|duō·shao}{钱|qián}？', hu: 'Ez mennyibe kerül?' },
        { zh: '{那|nà}{本|běn}{书|shū}{是|shì}{我|wǒ}{的|de}。', hu: 'Az a könyv az enyém.' },
        { zh: '{我|wǒ}{买|mǎi}{这个|zhè·ge}。', hu: 'Ezt veszem meg.' }
      ],
      mistakes: [
        { bad: '{这|zhè}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', good: '{这个|zhè·ge}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', why: 'A {这|zhè} és a főnév közé is mérőszó kell.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{想|xiǎng}{喝|hē}{什么|shén·me}？', hu: 'Mit szeretnél inni?' },
    { zh: '{这个|zhè·ge}{多少|duō·shao}{钱|qián}？', hu: 'Ez mennyibe kerül?' },
    { zh: '{一共|yí·gòng}{多少|duō·shao}{钱|qián}？', hu: 'Összesen mennyi?' },
    { zh: '{我|wǒ}{买|mǎi}{这个|zhè·ge}。', hu: 'Ezt kérem (megveszem).' },
    { zh: '{两|liǎng}{杯|bēi}{茶|chá}，{谢谢|xiè·xie}。', hu: 'Két teát kérek, köszönöm.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{想|xiǎng}', pinyin: 'xiǎng', hu: 'szeretne; gondol' },
        { zh: '{喝|hē}', pinyin: 'hē', hu: 'inni' },
        { zh: '{茶|chá}', pinyin: 'chá', hu: 'tea' },
        { zh: '{吃|chī}', pinyin: 'chī', hu: 'enni' },
        { zh: '{米饭|mǐ·fàn}', pinyin: 'mǐfàn', hu: 'főtt rizs' },
        { zh: '{下午|xià·wǔ}', pinyin: 'xiàwǔ', hu: 'délután' },
        { zh: '{商店|shāng·diàn}', pinyin: 'shāngdiàn', hu: 'bolt' },
        { zh: '{买|mǎi}', pinyin: 'mǎi', hu: 'venni' },
        { zh: '{个|gè}', pinyin: 'gè', hu: 'általános mérőszó' },
        { zh: '{杯子|bēi·zi}', pinyin: 'bēizi', hu: 'pohár, bögre' },
        { zh: '{这|zhè}', pinyin: 'zhè', hu: 'ez' },
        { zh: '{那|nà}', pinyin: 'nà', hu: 'az' },
        { zh: '{多少|duō·shao}', pinyin: 'duōshao', hu: 'mennyi, hány' },
        { zh: '{钱|qián}', pinyin: 'qián', hu: 'pénz' },
        { zh: '{块|kuài}', pinyin: 'kuài', hu: 'jüan (beszédben)' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{两|liǎng}', pinyin: 'liǎng', hu: 'kettő (mérőszó előtt)' },
        { zh: '{杯|bēi}', pinyin: 'bēi', hu: 'csésze, pohár (mérőszó)' },
        { zh: '{本|běn}', pinyin: 'běn', hu: 'könyvek mérőszava' },
        { zh: '{一共|yí·gòng}', pinyin: 'yígòng', hu: 'összesen' },
        { zh: '{服务员|fú·wù·yuán}', pinyin: 'fúwùyuán', hu: 'pincér, kiszolgáló' },
        { zh: '{对|duì}', pinyin: 'duì', hu: 'helyes, igaz' }
      ] }
  ],
  culture: [
    { title: 'Alku', text: 'Piacon, kis üzletekben, turistáknak szóló boltokban az alku megszokott, áruházban és éttermekben nem. Ha alkudni szeretnél: {便宜一点儿吧|piányi yìdiǎnr ba} „legyen egy kicsit olcsóbb". Barátságosan, mosolyogva csináld: az alku játék, nem veszekedés.' },
    { title: 'Tea', text: 'A tea ({茶|chá}) Kínából indult világhódító útjára — a magyar „tea" és az angol „tea" egy déli kínai nyelvjárás <i>te</i> ejtéséből, az orosz „csáj" az északi <i>chá</i>-ból lett. Kínában a zöld tea a legnépszerűbb; cukrot, tejet nem tesznek bele. Vendégségben a csészét újra meg újra teletöltik: ha már nem kérsz, hagyj benne egy kicsit.' }
  ],
  reading: {
    title: '{在|zài}{商店|shāng·diàn}', titleHu: 'A boltban',
    text: [
      { zh: '{今天|jīn·tiān}{下午|xià·wǔ}{我|wǒ}{和|hé}{王明|Wáng Míng}{去|qù}{商店|shāng·diàn}{买|mǎi}{东西|dōng·xi}。', hu: 'Ma délután Wang Minggel elmentünk a boltba vásárolni.' },
      { zh: '{我|wǒ}{想|xiǎng}{买|mǎi}{两|liǎng}{个|ge}{杯子|bēi·zi}。', hu: 'Két bögrét szerettem volna venni.' },
      { zh: '{一个|yí ge}{杯子|bēi·zi}{二十|èr·shí}{块|kuài}，{两|liǎng}{个|ge}{四十|sì·shí}{块|kuài}。', hu: 'Egy bögre húsz jüan, kettő negyven.', par: true },
      { zh: '{王明|Wáng Míng}{想|xiǎng}{买|mǎi}{三|sān}{本|běn}{书|shū}，{一共|yí·gòng}{九十|jiǔ·shí}{块|kuài}。', hu: 'Wang Ming három könyvet akart venni, összesen kilencven jüanért.' },
      { zh: '{我们|wǒ·men}{不|bù}{想|xiǎng}{喝|hē}{茶|chá}，{我们|wǒ·men}{想|xiǎng}{吃|chī}{米饭|mǐ·fàn}。', hu: 'Teázni nem volt kedvünk, rizst akartunk enni.', par: true }
    ],
    words: [ { zh: '{和|hé}', hu: 'és, -val/-vel' }, { zh: '{东西|dōng·xi}', hu: 'dolog, holmi' } ],
    questions: [
      { q: 'Mit akart venni a szöveg írója?', a: 'két bögrét', wrong: ['három könyvet', 'egy csésze teát', 'két könyvet'], why: '{我想买两个杯子|wǒ xiǎng mǎi liǎng ge bēizi}.' },
      { q: 'Mennyibe kerül egy bögre?', a: '20 jüan', wrong: ['40 jüan', '2 jüan', '90 jüan'], why: '{一个杯子二十块|yí ge bēizi èrshí kuài}.' },
      { q: 'Mennyit fizetett Wang Ming a könyvekért?', a: 'összesen 90 jüant', wrong: ['könyvenként 90 jüant', '40 jüant', '30 jüant'], why: '{三本书，一共九十块|sān běn shū, yígòng jiǔshí kuài}.' },
      { q: 'Mit akartak ezután?', a: 'rizst enni', wrong: ['teát inni', 'még vásárolni', 'hazamenni'], why: '{我们不想喝茶，我们想吃米饭|wǒmen bù xiǎng hē chá, wǒmen xiǎng chī mǐfàn}.' }
    ]
  },
  quiz: [
    { q: '„Teát szeretnék inni."', a: '{我|wǒ}{想|xiǎng}{喝|hē}{茶|chá}。', wrong: ['{我|wǒ}{想|xiǎng}{茶|chá}。', '{我|wǒ}{喝|hē}{想|xiǎng}{茶|chá}。', '{我|wǒ}{会|huì}{茶|chá}{喝|hē}。'], why: '{想|xiǎng} + ige + tárgy.', point: 1 },
    { q: 'Mit jelent: {我不想去|wǒ bù xiǎng qù}。', a: 'Nincs kedvem menni.', wrong: ['Nem tudok menni.', 'Nem gondolok rá.', 'Nem mentem el.'], why: '{不想|bù xiǎng} „nem akar, nincs kedve".', point: 1 },
    { q: 'Melyik a helyes: „három könyv"?', a: '{三|sān}{本|běn}{书|shū}', wrong: ['{三|sān}{书|shū}', '{书|shū}{三|sān}{本|běn}', '{三|sān}{个|ge}{本|běn}{书|shū}'], why: 'Szám + mérőszó + főnév; könyv mérőszava {本|běn}.', point: 2 },
    { q: 'Melyik a helyes: „két bögre"?', a: '{两|liǎng}{个|ge}{杯子|bēi·zi}', wrong: ['{二|èr}{个|ge}{杯子|bēi·zi}', '{两|liǎng}{杯子|bēi·zi}', '{二|èr}{杯子|bēi·zi}'], why: 'Mérőszó előtt {两|liǎng}, és a mérőszó nem maradhat el.', point: 2 },
    { q: 'Melyik az általános mérőszó (pl. emberekre)?', a: '{个|gè}', wrong: ['{本|běn}', '{杯|bēi}', '{口|kǒu}'], why: '{一个人|yí ge rén} „egy ember".', point: 2 },
    { q: 'Hogyan kérdezed meg az árat?', a: '{多少|duō·shao}{钱|qián}？', wrong: ['{几|jǐ}{钱|qián}？', '{钱|qián}{多|duō}{吗|ma}？', '{什么|shén·me}{钱|qián}？'], why: 'Árat a {多少|duōshao} kérdez.', point: 3 },
    { q: 'Mi a különbség a {几|jǐ} és a {多少|duōshao} között?', a: 'a {几|jǐ} kis számra, mérőszóval; a {多少|duōshao} bármekkorára', wrong: ['a {几|jǐ} csak pénzre és árakra, a {多少|duōshao} emberekre', 'a {多少|duōshao} kis számra, a {几|jǐ} nagy számra való', 'nincs különbség, bármikor felcserélhetők'], why: '{几个人|jǐ ge rén} kevés ember; {多少学生|duōshao xuésheng} akárhány diák.', point: 3 },
    { q: 'Mennyi: {三块五|sān kuài wǔ}?', a: '3,50 jüan', wrong: ['35 jüan', '3,05 jüan', '5,30 jüan'], why: '{块|kuài} jüan, utána a {毛|máo} (tized) elmaradt: 3 jüan 5 mao.', point: 4 },
    { q: 'Mi a jüan beszélt nyelvi neve?', a: '{块|kuài}', wrong: ['{元|yuán}', '{毛|máo}', '{钱|qián}'], why: 'Beszédben {块|kuài}, írásban {元|yuán}.', point: 4 },
    { q: '„Ez a bögre mennyibe kerül?"', a: '{这个|zhè·ge}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', wrong: ['{这|zhè}{杯子|bēi·zi}{多少|duō·shao}{钱|qián}？', '{杯子|bēi·zi}{这个|zhè·ge}{几|jǐ}{钱|qián}？', '{这个|zhè·ge}{杯子|bēi·zi}{是|shì}{钱|qián}{吗|ma}？'], why: '{这|zhè} + mérőszó + főnév; árat {多少钱|duōshao qián} kérdez.', point: 5 },
    { q: 'Hogyan ejted az {一|yī}-t az {一个|yí ge} kifejezésben?', a: 'yí', wrong: ['yī', 'yì', 'yǐ'], why: 'A {个|gè} eredetileg 4. tónusú: előtte az {一|yī} 2. tónusú.', point: 5 },
    { q: 'Hogyan ejted az {一|yī}-t az {一杯|yì bēi} kifejezésben?', a: 'yì', wrong: ['yí', 'yī', 'yǐ'], why: '1. tónus előtt az {一|yī} 4. tónusú.', point: 5 },
    { q: 'Melyik tónusú a {那|nà} „az"?', a: '4.', wrong: ['3.', '1.', '2.'], why: '{那|nà} 4. tónus; a 3. tónusú {哪|nǎ} „melyik".', point: 5 },
    { q: 'Mit jelent: {一共多少钱|yígòng duōshao qián}？', a: 'Összesen mennyi?', wrong: ['Egy darab mennyi?', 'Van pénzed?', 'Mennyi pénzed van?'], why: '{一共|yígòng} „összesen".', point: 3 },
    { q: 'Mit jelent a {商店|shāngdiàn}?', a: 'bolt', wrong: ['iskola', 'étterem', 'piac'], why: '{商店|shāngdiàn} „bolt, üzlet".' },
    { q: 'Mit jelent a {米饭|mǐfàn}?', a: 'főtt rizs', wrong: ['tészta', 'kenyér', 'leves'], why: '{米|mǐ} „rizs(szem)" + {饭|fàn} „étel".' },
    { q: 'Mit jelent: {两杯茶|liǎng bēi chá}？', a: 'két csésze tea', wrong: ['két teáskanna', 'második tea', 'tizenkét tea'], why: '{两|liǎng} „kettő" + {杯|bēi} „csésze" + {茶|chá}.', point: 2 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{想|xiǎng}{买|mǎi}{三|sān}{杯子|bēi·zi}。', wrong: ['{我|wǒ}{想|xiǎng}{买|mǎi}{三|sān}{个|ge}{杯子|bēi·zi}。', '{我|wǒ}{想|xiǎng}{喝|hē}{一|yì}{杯|bēi}{茶|chá}。', '{他|tā}{有|yǒu}{两|liǎng}{本|běn}{书|shū}。'], why: 'Hiányzik a mérőszó: {三个杯子|sān ge bēizi}.', point: 2 }
  ]
},

/* ════════════════════════════════════════════════════
   9. LECKE — 在 (lenni valahol, valahol csinálni), 哪儿
   ════════════════════════════════════════════════════ */
{
  id: 'l9', no: 9, kicker: 'HSK 1 · 9. lecke',
  title: 'Hol van? — hely és munkahely',
  lead: 'Megkérdezed és megmondod, hol van valaki vagy valami, és hol csinál valaki valamit — például hol dolgozik. Mindkettőhöz ugyanaz a szó kell: a 在.',
  cando: [
    'Megmondod, hol van valaki vagy valami (小猫在椅子下面).',
    'Megkérdezed: hol? (在哪儿？), és rámutatsz: itt, ott (这儿, 那儿).',
    'Elmondod, hol csinál valaki valamit (他在医院工作).',
    'A 呢-vel megkérdezed, hol van valaki (你爸爸呢？).'
  ],
  intro: [
    'A magyar a helyet ragokkal fejezi ki („a kórház<i>ban</i>", „a szék <i>alatt</i>"). A kínai egyetlen szóval, a {在|zài}-val, és egy helyhatározó szóval a főnév <b>után</b>: {椅子下面|yǐzi xiàmiàn} „a szék alatt" (szó szerint „szék alsó oldala").',
    'A {在|zài} kétféleképpen áll: önálló igeként „valahol van" ({他在家|tā zài jiā} „otthon van"), és egy másik ige előtt, mint a helyszín bevezetője ({他在家工作|tā zài jiā gōngzuò} „otthon dolgozik"). A sorrend fontos: a hely <b>a cselekvés előtt</b> áll.'
  ],
  dialogue: {
    title: 'Hol a cica?',
    scene: 'Anna Wang Mingéknél van. Keresi a házi cicát, akiről Wang Ming annyit mesélt.',
    lines: [
      { who: 'Anna', zh: '{王明|Wáng Míng}，{你|nǐ}{家|jiā}{的|de}{小猫|xiǎo māo}{呢|ne}？', hu: 'Wang Ming, és hol a cicátok?' },
      { who: 'Wang Ming', zh: '{在|zài}{那儿|nàr}，{在|zài}{椅子|yǐ·zi}{下面|xià·miàn}。', hu: 'Ott van, a szék alatt.' },
      { who: 'Anna', zh: '{你|nǐ}{爸爸|bà·ba}{在|zài}{家|jiā}{吗|ma}？', hu: 'Apukád itthon van?' },
      { who: 'Wang Ming', zh: '{不|bú}{在|zài}。{他|tā}{在|zài}{医院|yī·yuàn}{工作|gōng·zuò}，{他|tā}{是|shì}{医生|yī·shēng}。', hu: 'Nincs itthon. A kórházban dolgozik, orvos.' },
      { who: 'Anna', zh: '{你|nǐ}{妈妈|mā·ma}{呢|ne}？{她|tā}{在|zài}{哪儿|nǎr}{工作|gōng·zuò}？', hu: 'És anyukád? Ő hol dolgozik?' },
      { who: 'Wang Ming', zh: '{她|tā}{在|zài}{一个|yí ge}{中学|zhōng·xué}{工作|gōng·zuò}，{她|tā}{是|shì}{老师|lǎo·shī}。', hu: 'Egy középiskolában dolgozik, tanárnő.' },
      { who: 'Anna', zh: '{你|nǐ}{有|yǒu}{哥哥|gē·ge}{吗|ma}？{他|tā}{在|zài}{北京|Běi·jīng}{吗|ma}？', hu: 'Van bátyád? Ő Pekingben van?' },
      { who: 'Wang Ming', zh: '{有|yǒu}，{他|tā}{在|zài}{上海|Shàng·hǎi}{工作|gōng·zuò}。', hu: 'Van, Sanghajban dolgozik.' }
    ],
    notes: [
      'A {小猫|xiǎo māo} szó szerint „kis macska": a {小|xiǎo} „kicsi" a kicsinyítés legegyszerűbb módja, kedveskedő is.',
      'A {不在|bú zài} „nincs ott, nincs itthon": a {在|zài} 4. tónusú, ezért a {不|bù} <i>bú</i>.',
      'A {哪儿|nǎr} „hol, hová" r-esített szó (6. lecke): a {儿|ér} nem külön szótag. Dél-Kínában {哪里|nǎli}-t mondanak helyette.'
    ]
  },
  points: [
    {
      title: '{在|zài} + hely', sub: 'valaki / valami valahol van',
      pattern: 'A + {在|zài} + hely · A + {不在|bú zài} + hely',
      body: 'Önálló igeként a {在|zài} azt mondja meg, <b>hol van</b> valaki vagy valami: {他在家|tā zài jiā} „otthon van", {小猫在椅子下面|xiǎo māo zài yǐzi xiàmiàn} „a cica a szék alatt van". A helyet nem rag, hanem a {在|zài} utáni helyhatározó jelöli. Tagadva {不在|bú zài}.',
      more: [
        'A {在|zài} az alanyt helyezi el: a dolog, amiről beszélsz, <b>ismert</b> (a cica, apukád), csak a helye a kérdés. Ha azt mondod el, <i>mi</i> van egy helyen, arra a {有|yǒu} kell (10. lecke).',
        'Telefonban, ajtóban gyakori kérdés: {王老师在吗|Wáng lǎoshī zài ma}？ „Wang tanár úr itt van / elérhető?"'
      ],
      examples: [
        { zh: '{我|wǒ}{在|zài}{家|jiā}。', hu: 'Otthon vagyok.' },
        { zh: '{小猫|xiǎo māo}{在|zài}{椅子|yǐ·zi}{下面|xià·miàn}。', hu: 'A cica a szék alatt van.' },
        { zh: '{我|wǒ}{爸爸|bà·ba}{不|bú}{在|zài}{北京|Běi·jīng}。', hu: 'Apukám nincs Pekingben.' },
        { zh: '{张|Zhāng}{老师|lǎo·shī}{在|zài}{吗|ma}？', hu: 'Zhang tanárnő itt van?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{是|shì}{在|zài}{家|jiā}。', good: '{我|wǒ}{在|zài}{家|jiā}。', why: 'A {在|zài} maga az ige: nem kell mellé {是|shì}.' },
        { bad: '{我|wǒ}{没|méi}{在|zài}{北京|Běi·jīng}。', good: '{我|wǒ}{不|bú}{在|zài}{北京|Běi·jīng}。', why: 'Jelen helyzetre a {不在|bú zài} a természetes tagadás.' }
      ]
    },
    {
      title: '{哪儿|nǎr} · {这儿|zhèr} · {那儿|nàr}', sub: 'hol? — itt — ott',
      pattern: '… {在|zài}{哪儿|nǎr}？ → … {在|zài}{这儿|zhèr} / {那儿|nàr}。',
      body: 'A {哪儿|nǎr} „hol, hová" kérdőszó, és mint minden kérdőszó, a válasz helyén áll: {你在哪儿|nǐ zài nǎr}？ „Hol vagy?" — {我在学校|wǒ zài xuéxiào} „Az iskolában vagyok." Párjai: {这儿|zhèr} „itt (közel)" és {那儿|nàr} „ott (távol)".',
      more: [
        'Figyelj a tónusokra: {哪儿|nǎr} „hol?" 3. tónus, {那儿|nàr} „ott" 4. tónus, {这儿|zhèr} „itt" 4. tónus. Ugyanaz a tónus-különbség, mint a {哪|nǎ} „melyik" és a {那|nà} „az" között.',
        'R nélküli megfelelőik (Dél-Kínában és írásban gyakoribbak): {哪里|nǎli}, {这里|zhèli}, {那里|nàli}.'
      ],
      tables: [
        { caption: 'Hol? Itt, ott',
          head: ['', 'Pekingi (r-esített)', 'Déli / írott'],
          rows: [
            ['hol?', '{哪儿|nǎr}', '{哪里|nǎ·li}'],
            ['itt', '{这儿|zhèr}', '{这里|zhè·li}'],
            ['ott', '{那儿|nàr}', '{那里|nà·li}']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{在|zài}{哪儿|nǎr}？', hu: 'Hol vagy?' },
        { zh: '{我|wǒ}{的|de}{书|shū}{在|zài}{这儿|zhèr}。', hu: 'Itt a könyvem.' },
        { zh: '{你|nǐ}{去|qù}{哪儿|nǎr}？', hu: 'Hová mész?' }
      ],
      mistakes: [
        { bad: '{哪儿|nǎr}{你|nǐ}{在|zài}？', good: '{你|nǐ}{在|zài}{哪儿|nǎr}？', why: 'A kérdőszó a helyén marad: a {在|zài} után.' }
      ]
    },
    {
      title: '{在|zài} + hely + ige', sub: 'hol csinál valaki valamit',
      pattern: 'A + {在|zài} + hely + ige (+ tárgy)',
      body: 'Ha azt mondod el, <b>hol történik</b> egy cselekvés, a {在|zài} + hely a fő ige <b>elé</b> kerül: {他在医院工作|tā zài yīyuàn gōngzuò} „a kórházban dolgozik", {我在家看书|wǒ zài jiā kàn shū} „otthon olvasok". A sorrend kötött: előbb a hely, aztán a cselekvés.',
      more: [
        'Kérdés: {你在哪儿工作|nǐ zài nǎr gōngzuò}？ „Hol dolgozol?", {你在哪儿学汉语|nǐ zài nǎr xué Hànyǔ}？ „Hol tanulsz kínaiul?"',
        'Ilyenkor a {在|zài} olyan, mint egy elöljárószó („-ban/-ben"); a tagadás a {在|zài} elé kerül: {他不在医院工作|tā bú zài yīyuàn gōngzuò} „nem a kórházban dolgozik".'
      ],
      examples: [
        { zh: '{他|tā}{在|zài}{医院|yī·yuàn}{工作|gōng·zuò}。', hu: 'A kórházban dolgozik.' },
        { zh: '{你|nǐ}{在|zài}{哪儿|nǎr}{工作|gōng·zuò}？', hu: 'Hol dolgozol?' },
        { zh: '{我|wǒ}{在|zài}{学校|xué·xiào}{学|xué}{汉语|Hàn·yǔ}。', hu: 'Az iskolában tanulok kínaiul.' },
        { zh: '{我|wǒ}{儿子|ér·zi}{在|zài}{北京|Běi·jīng}{工作|gōng·zuò}。', hu: 'A fiam Pekingben dolgozik.' }
      ],
      mistakes: [
        { bad: '{他|tā}{工作|gōng·zuò}{在|zài}{医院|yī·yuàn}。', good: '{他|tā}{在|zài}{医院|yī·yuàn}{工作|gōng·zuò}。', why: 'A helyhatározó az ige elé kerül, nem utána (mint az angolban).' }
      ],
      tip: 'Magyarul úgy jegyezd meg: „ő a-kórházban dolgozik" — a hely előbb jön, mint a cselekvés.'
    },
    {
      title: '{下面|xiàmiàn} · {上面|shàngmiàn} · {里面|lǐmiàn}', sub: 'helyhatározó szavak: a főnév után',
      pattern: 'főnév + {下面|xià·miàn} / {上面|shàng·miàn} / {里面|lǐ·miàn}',
      body: 'A „-ban, -on, alatt" jelentést a kínai egy <b>a főnév után álló</b> helyszóval fejezi ki: {椅子下面|yǐzi xiàmiàn} „a szék alatt", {桌子上面|zhuōzi shàngmiàn} „az asztalon", {家里面|jiā lǐmiàn} „a házban". A magyarral egyezik a sorrend: előbb a tárgy, aztán a viszony („a szék <i>alatt</i>").',
      more: [
        'A rövid alakok is gyakoriak: {桌子上|zhuōzi shàng} „az asztalon", {家里|jiā li} „otthon, a házban" (a {里|lǐ} itt semleges tónusú).',
        'Országnév és városnév után nem kell helyszó: {在中国|zài Zhōngguó}, {在北京|zài Běijīng}. Tárgy után viszont igen: {在桌子上|zài zhuōzi shàng}, nem *{在桌子|zài zhuōzi}.'
      ],
      tables: [
        { caption: 'Helyszavak',
          head: ['Helyszó', 'Jelentés', 'Példa'],
          rows: [
            ['{上面|shàng·miàn} / {上|shàng}', 'rajta, fölötte', '{桌子上|zhuō·zi shàng} az asztalon'],
            ['{下面|xià·miàn}', 'alatta', '{椅子下面|yǐ·zi xià·miàn} a szék alatt'],
            ['{里面|lǐ·miàn} / {里|li}', 'benne', '{家里|jiā li} otthon, a házban'],
            ['{前面|qián·miàn}', 'előtte', '{学校前面|xué·xiào qián·miàn} az iskola előtt'],
            ['{后面|hòu·miàn}', 'mögötte', '{商店后面|shāng·diàn hòu·miàn} a bolt mögött']
          ] }
      ],
      examples: [
        { zh: '{小猫|xiǎo māo}{在|zài}{椅子|yǐ·zi}{下面|xià·miàn}。', hu: 'A cica a szék alatt van.' },
        { zh: '{我|wǒ}{的|de}{书|shū}{在|zài}{桌子|zhuō·zi}{上|shàng}。', hu: 'A könyvem az asztalon van.' }
      ],
      mistakes: [
        { bad: '{在|zài}{下面|xià·miàn}{椅子|yǐ·zi}', good: '{在|zài}{椅子|yǐ·zi}{下面|xià·miàn}', why: 'A helyszó a főnév után áll.' }
      ]
    },
    {
      title: '{呢|ne}', sub: '„hol van…?" — {小猫|xiǎo māo}{呢|ne}？',
      pattern: 'főnév + {呢|ne}？（beszélgetés elején）',
      body: 'Ha egy főnév után egymagában, a beszélgetés elején áll a {呢|ne}, azt kérdezi: <b>hol van?</b> {小猫呢|xiǎo māo ne}？ „Hol a cica?", {你的书呢|nǐ de shū ne}？ „Hol a könyved?" Ez a kérdés természetesebb és rövidebb, mint a …{在哪儿|zài nǎr}？',
      more: [
        'A 4. leckében a {呢|ne} visszakérdezett („és te?"). A két jelentés a helyzetből válik szét: ha előtte már mondtál valamit ({我很好，你呢|wǒ hěn hǎo, nǐ ne}？), visszakérdez; ha a beszélgetés elején jön, a hollétre kérdez.'
      ],
      examples: [
        { zh: '{小猫|xiǎo māo}{呢|ne}？', hu: 'Hol a cica?' },
        { zh: '{你|nǐ}{爸爸|bà·ba}{呢|ne}？', hu: 'Hol van apukád?' },
        { zh: '{我|wǒ}{的|de}{杯子|bēi·zi}{呢|ne}？', hu: 'Hol a bögrém?' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{在|zài}{哪儿|nǎr}？', hu: 'Hol vagy?' },
    { zh: '{你|nǐ}{在|zài}{哪儿|nǎr}{工作|gōng·zuò}？', hu: 'Hol dolgozol?' },
    { zh: '{在|zài}{这儿|zhèr}。', hu: 'Itt (van).' },
    { zh: '{他|tā}{不|bú}{在|zài}。', hu: 'Nincs itt.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{小|xiǎo}', pinyin: 'xiǎo', hu: 'kicsi' },
        { zh: '{猫|māo}', pinyin: 'māo', hu: 'macska' },
        { zh: '{在|zài}', pinyin: 'zài', hu: 'van valahol; -ban/-ben' },
        { zh: '{那儿|nàr}', pinyin: 'nàr', hu: 'ott' },
        { zh: '{狗|gǒu}', pinyin: 'gǒu', hu: 'kutya' },
        { zh: '{椅子|yǐ·zi}', pinyin: 'yǐzi', hu: 'szék' },
        { zh: '{下面|xià·miàn}', pinyin: 'xiàmiàn', hu: 'alatt, lent' },
        { zh: '{哪儿|nǎr}', pinyin: 'nǎr', hu: 'hol, hová' },
        { zh: '{工作|gōng·zuò}', pinyin: 'gōngzuò', hu: 'dolgozni; munka' },
        { zh: '{儿子|ér·zi}', pinyin: 'érzi', hu: 'fia valakinek' },
        { zh: '{医院|yī·yuàn}', pinyin: 'yīyuàn', hu: 'kórház' },
        { zh: '{医生|yī·shēng}', pinyin: 'yīshēng', hu: 'orvos' },
        { zh: '{爸爸|bà·ba}', pinyin: 'bàba', hu: 'apa' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{这儿|zhèr}', pinyin: 'zhèr', hu: 'itt' },
        { zh: '{桌子|zhuō·zi}', pinyin: 'zhuōzi', hu: 'asztal' },
        { zh: '{上海|Shàng·hǎi}', pinyin: 'Shànghǎi', hu: 'Sanghaj' },
        { zh: '{中学|zhōng·xué}', pinyin: 'zhōngxué', hu: 'középiskola' },
        { zh: '{哥哥|gē·ge}', pinyin: 'gēge', hu: 'báty' }
      ] }
  ],
  culture: [
    { title: 'A háziállatok', text: 'A városi Kínában a macska és a kiskutya ma ugyanolyan kedvelt, mint nálunk. A kutya a kínai állatöv egyik jegye is. A {狗|gǒu} „kutya" szó viszont sértésekben is gyakori, ezért emberre mondva kerüld.' },
    { title: 'Ahol a család dolgozik', text: 'Kínában sokan a szülőföldjüktől messze dolgoznak: vidékről a nagyvárosokba, északról a déli gyárvárosokba. A családtagok gyakran csak a nagy ünnepeken látják egymást, a nagyszülők nevelik az unokákat. Ezért kerül a beszélgetésben hamar elő a kérdés: {你家人在哪儿|nǐ jiārén zài nǎr}？ „Hol él a családod?"' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{家|jiā}', titleHu: 'Az én családom',
    text: [
      { zh: '{我|wǒ}{叫|jiào}{王明|Wáng Míng}，{我|wǒ}{家|jiā}{在|zài}{北京|Běi·jīng}。', hu: 'Wang Mingnek hívnak, a családom Pekingben él.' },
      { zh: '{我|wǒ}{爸爸|bà·ba}{是|shì}{医生|yī·shēng}，{他|tā}{在|zài}{医院|yī·yuàn}{工作|gōng·zuò}。', hu: 'Apukám orvos, kórházban dolgozik.' },
      { zh: '{我|wǒ}{妈妈|mā·ma}{是|shì}{老师|lǎo·shī}，{她|tā}{在|zài}{中学|zhōng·xué}{工作|gōng·zuò}。', hu: 'Anyukám tanár, középiskolában dolgozik.' },
      { zh: '{我|wǒ}{哥哥|gē·ge}{不|bú}{在|zài}{北京|Běi·jīng}，{他|tā}{在|zài}{上海|Shàng·hǎi}{工作|gōng·zuò}。', hu: 'A bátyám nincs Pekingben, Sanghajban dolgozik.', par: true },
      { zh: '{我|wǒ}{家|jiā}{有|yǒu}{一|yì}{只|zhī}{小猫|xiǎo māo}，{它|tā}{很|hěn}{小|xiǎo}。', hu: 'Van egy kiscicánk, nagyon kicsi.', par: true },
      { zh: '{它|tā}{喜欢|xǐ·huan}{在|zài}{椅子|yǐ·zi}{下面|xià·miàn}{睡觉|shuì·jiào}。', hu: 'Szeret a szék alatt aludni.' }
    ],
    words: [ { zh: '{只|zhī}', hu: 'állatok mérőszava' }, { zh: '{它|tā}', hu: 'ő (állat, tárgy)' }, { zh: '{喜欢|xǐ·huan}', hu: 'szeret' }, { zh: '{睡觉|shuì·jiào}', hu: 'aludni' } ],
    questions: [
      { q: 'Hol dolgozik Wang Ming apja?', a: 'kórházban', wrong: ['középiskolában', 'Sanghajban', 'otthon'], why: '{他在医院工作|tā zài yīyuàn gōngzuò}.' },
      { q: 'Mi Wang Ming anyjának a foglalkozása?', a: 'tanár', wrong: ['orvos', 'diák', 'nem derül ki'], why: '{我妈妈是老师|wǒ māma shì lǎoshī}.' },
      { q: 'Hol dolgozik a báty?', a: 'Sanghajban', wrong: ['Pekingben', 'kórházban', 'otthon'], why: '{他在上海工作|tā zài Shànghǎi gōngzuò}.' },
      { q: 'Hol szeret aludni a cica?', a: 'a szék alatt', wrong: ['az asztalon', 'a kórházban', 'a báty szobájában'], why: '{它喜欢在椅子下面睡觉|tā xǐhuan zài yǐzi xiàmiàn shuìjiào}.' }
    ]
  },
  quiz: [
    { q: '„Otthon vagyok."', a: '{我|wǒ}{在|zài}{家|jiā}。', wrong: ['{我|wǒ}{是|shì}{家|jiā}。', '{我|wǒ}{是|shì}{在|zài}{家|jiā}。', '{我|wǒ}{家|jiā}{在|zài}。'], why: 'A {在|zài} maga az ige: „valahol van".', point: 1 },
    { q: 'Hogyan tagadod: {他在家|tā zài jiā}?', a: '{他|tā}{不|bú}{在|zài}{家|jiā}。', wrong: ['{他|tā}{在|zài}{不|bù}{家|jiā}。', '{他|tā}{不是|bú shì}{家|jiā}。', '{不|bù}{他|tā}{在|zài}{家|jiā}。'], why: '{不|bù} a {在|zài} elé; a {在|zài} 4. tónusú, ezért <i>bú</i>.', point: 1 },
    { q: 'Mit jelent: {张老师在吗|Zhāng lǎoshī zài ma}？', a: 'Zhang tanárnő itt van (elérhető)?', wrong: ['Zhang tanárnő tanár?', 'Hol tanít Zhang tanárnő?', 'Zhang tanárnő otthon dolgozik?'], why: '{在|zài} + {吗|ma}: „itt van?"', point: 1 },
    { q: 'Hogyan kérdezed: „Hol vagy?"', a: '{你|nǐ}{在|zài}{哪儿|nǎr}？', wrong: ['{哪儿|nǎr}{你|nǐ}{在|zài}？', '{你|nǐ}{在|zài}{哪儿|nǎr}{吗|ma}？', '{你|nǐ}{是|shì}{哪儿|nǎr}？'], why: 'A kérdőszó a {在|zài} után, {吗|ma} nélkül.', point: 2 },
    { q: 'Melyik jelenti: „ott"?', a: '{那儿|nàr}', wrong: ['{哪儿|nǎr}', '{这儿|zhèr}', '{在|zài}'], why: '{那儿|nàr} 4. tónus „ott"; {哪儿|nǎr} 3. tónus „hol?".', point: 2 },
    { q: '„A kórházban dolgozik." — melyik a helyes?', a: '{他|tā}{在|zài}{医院|yī·yuàn}{工作|gōng·zuò}。', wrong: ['{他|tā}{工作|gōng·zuò}{在|zài}{医院|yī·yuàn}。', '{他|tā}{医院|yī·yuàn}{在|zài}{工作|gōng·zuò}。', '{在|zài}{他|tā}{医院|yī·yuàn}{工作|gōng·zuò}。'], why: '{在|zài} + hely az ige elé kerül.', point: 3 },
    { q: 'Hogyan kérdezed: „Hol dolgozol?"', a: '{你|nǐ}{在|zài}{哪儿|nǎr}{工作|gōng·zuò}？', wrong: ['{你|nǐ}{工作|gōng·zuò}{在|zài}{哪儿|nǎr}？', '{你|nǐ}{哪儿|nǎr}{工作|gōng·zuò}{在|zài}？', '{哪儿|nǎr}{你|nǐ}{工作|gōng·zuò}？'], why: '{在哪儿|zài nǎr} az ige előtt.', point: 3 },
    { q: 'Mit jelent: {我在学校学汉语|wǒ zài xuéxiào xué Hànyǔ}。', a: 'Az iskolában tanulok kínaiul.', wrong: ['Iskolába megyek kínait tanulni.', 'Kínai iskolába járok.', 'A kínai iskolában tanítok.'], why: '{在学校|zài xuéxiào} „az iskolában" + {学汉语|xué Hànyǔ}.', point: 3 },
    { q: '„a szék alatt"', a: '{椅子|yǐ·zi}{下面|xià·miàn}', wrong: ['{下面|xià·miàn}{椅子|yǐ·zi}', '{椅子|yǐ·zi}{上面|shàng·miàn}', '{在|zài}{下面|xià·miàn}'], why: 'A helyszó a főnév után áll.', point: 4 },
    { q: 'Mit jelent: {书在桌子上|shū zài zhuōzi shàng}。', a: 'A könyv az asztalon van.', wrong: ['A könyv az asztal alatt van.', 'Az asztalon van egy könyv?', 'Az asztal a könyvön van.'], why: '{桌子上|zhuōzi shàng} „az asztalon".', point: 4 },
    { q: 'Mit kérdez a beszélgetés elején: {小猫呢|xiǎo māo ne}？', a: 'Hol a cica?', wrong: ['És a cica?', 'Kicsi a cica?', 'Van cicád?'], why: 'Beszélgetés elején a {呢|ne} a hollétre kérdez.', point: 5 },
    { q: 'Mit jelent a {医生|yīshēng}?', a: 'orvos', wrong: ['kórház', 'beteg', 'tanár'], why: '{医生|yīshēng} „orvos", {医院|yīyuàn} „kórház".' },
    { q: 'Mit jelent a {工作|gōngzuò}?', a: 'dolgozni; munka', wrong: ['iskola', 'tanulni', 'pihenni'], why: 'Igeként és főnévként is használható.', point: 3 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{是|shì}{在|zài}{北京|Běi·jīng}。', wrong: ['{我|wǒ}{在|zài}{北京|Běi·jīng}。', '{我|wǒ}{在|zài}{北京|Běi·jīng}{工作|gōng·zuò}。', '{我|wǒ}{不|bú}{在|zài}{北京|Běi·jīng}。'], why: 'A {在|zài} mellé nem kell {是|shì}.', point: 1 },
    { q: 'Mi a {哪儿|nǎr} r nélküli (déli, írott) párja?', a: '{哪里|nǎ·li}', wrong: ['{那里|nà·li}', '{这里|zhè·li}', '{哪|nǎ}'], why: '{哪儿|nǎr} = {哪里|nǎli} „hol?"', point: 2 },
    { q: 'Melyik a helyes: „Kínában dolgozik"?', a: '{他|tā}{在|zài}{中国|Zhōng·guó}{工作|gōng·zuò}。', wrong: ['{他|tā}{在|zài}{中国|Zhōng·guó}{里|li}{工作|gōng·zuò}。', '{他|tā}{工作|gōng·zuò}{中国|Zhōng·guó}。', '{他|tā}{在|zài}{工作|gōng·zuò}{中国|Zhōng·guó}。'], why: 'Országnév után nem kell helyszó; a hely az ige előtt.', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   10. LECKE — hely + 有, 和, 能, 请
   ════════════════════════════════════════════════════ */
{
  id: 'l10', no: 10, kicker: 'HSK 1 · 10. lecke',
  title: 'Szabad ide ülnöm? — mi van hol, és szabad-e',
  lead: 'Elmondod, mi található egy helyen (桌子上有一个电脑), felsorolsz (和), udvariasan kérsz (请), és megkérdezed, szabad-e valamit (我能坐这儿吗？).',
  cando: [
    'Elmondod, mi van valahol: hely + 有 + dolog.',
    'Főneveket kapcsolsz össze a 和 szóval.',
    'Engedélyt kérsz és adsz a 能 segédigével.',
    'Udvariasan kínálsz és kérsz: 请坐, 请喝茶.'
  ],
  intro: [
    'Az előző leckében a {在|zài}-val egy <b>ismert</b> dolgot helyeztél el („a cica a szék alatt van"). Most a fordított irányt tanulod: egy helyről mondod meg, <b>mi van ott</b>. Ehhez a {有|yǒu} kell, és a mondat a hellyel kezdődik: {桌子上有一个电脑|zhuōzi shàng yǒu yí ge diànnǎo} „az asztalon van egy számítógép".',
    'A {能|néng} a második „tud" szó: azt jelenti, hogy valami <b>lehetséges vagy szabad</b>. A {请|qǐng} pedig a „kérem, tessék" — a kínai udvariasság alapszava.'
  ],
  dialogue: {
    title: 'A könyvtárban',
    scene: 'Anna a könyvtárban helyet keres. Egy asztalnál egy idősebb úr ül.',
    lines: [
      { who: 'Anna', zh: '{先生|xiān·sheng}，{我|wǒ}{能|néng}{坐|zuò}{这儿|zhèr}{吗|ma}？', hu: 'Uram, ideülhetek?' },
      { who: 'Idős úr', zh: '{能|néng}，{请|qǐng}{坐|zuò}。', hu: 'Igen, tessék, üljön le.' },
      { who: 'Anna', zh: '{谢谢|xiè·xie}。{桌子|zhuō·zi}{上|shàng}{的|de}{电脑|diàn·nǎo}{是|shì}{您|nín}{的|de}{吗|ma}？', hu: 'Köszönöm. Az asztalon lévő számítógép az öné?' },
      { who: 'Idős úr', zh: '{不是|bú shì}，{这儿|zhèr}{有|yǒu}{很|hěn}{多|duō}{电脑|diàn·nǎo}，{都|dōu}{是|shì}{图书馆|tú·shū·guǎn}{的|de}。', hu: 'Nem, itt sok számítógép van, mind a könyvtáré.' },
      { who: 'Anna', zh: '{这儿|zhèr}{有|yǒu}{汉语|Hàn·yǔ}{书|shū}{吗|ma}？', hu: 'Vannak itt kínai könyvek?' },
      { who: 'Idős úr', zh: '{有|yǒu}。{在|zài}{前面|qián·miàn}，{电脑|diàn·nǎo}{和|hé}{桌子|zhuō·zi}{后面|hòu·miàn}。', hu: 'Vannak. Elöl, a számítógépek és az asztalok mögött.' },
      { who: 'Anna', zh: '{太|tài}{好|hǎo}{了|le}！{谢谢|xiè·xie}{您|nín}！', hu: 'Nagyszerű! Köszönöm!' }
    ],
    notes: [
      'A {先生|xiānsheng} „úr" udvarias megszólítás ismeretlen férfinak; nőnek a {女士|nǚshì} „hölgy" a megfelelője.',
      'A {能|néng}-es kérdésre a rövid válasz a segédige: {能|néng} „lehet, szabad" / {不能|bù néng} „nem lehet".',
      'A {太好了|tài hǎo le} „nagyszerű, de jó!" — a {太|tài}…{了|le} szerkezetet a 12. leckében tanulod.'
    ]
  },
  points: [
    {
      title: 'hely + {有|yǒu}', sub: 'valahol van valami',
      pattern: 'hely + {有|yǒu} + (szám + mérőszó) + dolog · hely + {没有|méi·yǒu} + dolog',
      body: 'Ha azt mondod meg, mi található egy helyen, a mondat <b>a hellyel kezdődik</b>, utána {有|yǒu}, végül a dolog: {桌子上有一个电脑|zhuōzi shàng yǒu yí ge diànnǎo} „az asztalon van egy számítógép", {这儿有很多书|zhèr yǒu hěn duō shū} „itt sok könyv van". Tagadva {没有|méiyǒu}: {这儿没有汉语书|zhèr méiyǒu Hànyǔ shū} „itt nincs kínai könyv".',
      more: [
        'Ez ugyanaz a {有|yǒu}, mint az 5. leckében („van valamije"); itt a „birtokos" egy hely. A magyar „van … -n/-ban" fordítás nagyon természetes.',
        'Kérdés: {这儿有汉语书吗|zhèr yǒu Hànyǔ shū ma}？ „Van itt kínai könyv?", vagy kérdőszóval: {桌子上有什么|zhuōzi shàng yǒu shénme}？ „Mi van az asztalon?"'
      ],
      tables: [
        { caption: '{在|zài} vagy {有|yǒu}?',
          head: ['', 'A dolog ismert, a hely kérdéses', 'A hely ismert, a dolog kérdéses'],
          rows: [
            ['szerkezet', 'dolog + {在|zài} + hely', 'hely + {有|yǒu} + dolog'],
            ['példa', '{电脑|diàn·nǎo}{在|zài}{桌子|zhuō·zi}{上|shàng}。', '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{电脑|diàn·nǎo}。'],
            ['jelentés', 'A számítógép az asztalon van.', 'Az asztalon van egy számítógép.']
          ] }
      ],
      examples: [
        { zh: '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{一个|yí ge}{电脑|diàn·nǎo}。', hu: 'Az asztalon van egy számítógép.' },
        { zh: '{杯子|bēi·zi}{里|li}{有|yǒu}{茶|chá}。', hu: 'A bögrében tea van.' },
        { zh: '{这儿|zhèr}{没有|méi·yǒu}{汉语|Hàn·yǔ}{书|shū}。', hu: 'Itt nincs kínai könyv.' },
        { zh: '{学校|xué·xiào}{前面|qián·miàn}{有|yǒu}{一个|yí ge}{商店|shāng·diàn}。', hu: 'Az iskola előtt van egy bolt.' }
      ],
      mistakes: [
        { bad: '{一个|yí ge}{电脑|diàn·nǎo}{在|zài}{桌子|zhuō·zi}{上|shàng}。', good: '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{一个|yí ge}{电脑|diàn·nǎo}。', why: 'Ha a dolog új (egy számítógép), a {有|yǒu}-os szerkezet a természetes.' },
        { bad: '{桌子|zhuō·zi}{上|shàng}{不|bù}{有|yǒu}{书|shū}。', good: '{桌子|zhuō·zi}{上|shàng}{没有|méi·yǒu}{书|shū}。', why: 'A {有|yǒu} tagadása mindig {没有|méiyǒu}.' }
      ]
    },
    {
      title: '{和|hé}', sub: '„és" — főnevek között',
      pattern: 'A + {和|hé} + B',
      body: 'A {和|hé} „és, valamint" főneveket és névmásokat kapcsol össze: {电脑和桌子|diànnǎo hé zhuōzi} „számítógépek és asztalok", {我和我朋友|wǒ hé wǒ péngyou} „én és a barátom". Több elemnél csak az utolsó elé kerül: {爸爸、妈妈和我|bàba, māma hé wǒ}.',
      more: [
        '🔴 A {和|hé} <b>nem köt össze mondatokat és igéket</b>, mint a magyar „és". „Olvasok és írok" nem *{我看书和写字|wǒ kàn shū hé xiě zì}; ilyenkor egyszerűen egymás mellé teszed: {我看书，写字|wǒ kàn shū, xiě zì}, vagy később tanult kötőszót használsz.',
        'Jelentése „-val/-vel" is lehet: {我和朋友去商店|wǒ hé péngyou qù shāngdiàn} „a barátommal megyek a boltba".'
      ],
      examples: [
        { zh: '{我|wǒ}{和|hé}{王明|Wáng Míng}{是|shì}{朋友|péng·you}。', hu: 'Wang Ming és én barátok vagyunk.' },
        { zh: '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{书|shū}{和|hé}{杯子|bēi·zi}。', hu: 'Az asztalon könyvek és bögrék vannak.' },
        { zh: '{我|wǒ}{家|jiā}{有|yǒu}{爸爸|bà·ba}、{妈妈|mā·ma}{和|hé}{我|wǒ}。', hu: 'A családom: apa, anya és én.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{喝|hē}{茶|chá}{和|hé}{看|kàn}{书|shū}。', good: '{我|wǒ}{喝|hē}{茶|chá}，{看|kàn}{书|shū}。', why: 'A {和|hé} nem köt össze igéket.' }
      ]
    },
    {
      title: '{能|néng}', sub: 'lehet, szabad — lehetőség és engedély',
      pattern: 'A + {能|néng} + ige ？ · {能|néng}。/ {不能|bù néng}。',
      body: 'A {能|néng} azt fejezi ki, hogy valami <b>lehetséges</b> vagy <b>szabad</b>: {我能坐这儿吗|wǒ néng zuò zhèr ma}？ „Ideülhetek?", {明天我不能去|míngtiān wǒ bù néng qù} „holnap nem tudok menni (mert nem lehetséges)". Tagadva {不能|bù néng}.',
      more: [
        'A {会|huì} (6. lecke) a <b>megtanult</b> tudást jelöli, a {能|néng} a <b>körülmények adta</b> lehetőséget vagy az engedélyt. {我会开车|wǒ huì kāi chē} „tudok vezetni (megtanultam)", de {今天我不能开车|jīntiān wǒ bù néng kāi chē} „ma nem vezethetek (pl. mert ittam)".',
        'Engedélykérésre a {可以|kěyǐ} is jó, és udvariasabb: {我可以坐这儿吗|wǒ kěyǐ zuò zhèr ma}？'
      ],
      tables: [
        { caption: '{会|huì} vagy {能|néng}?',
          head: ['', '{会|huì}', '{能|néng}'],
          rows: [
            ['jelentés', 'megtanult tudás', 'lehetőség, engedély'],
            ['példa', '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', '{我|wǒ}{能|néng}{坐|zuò}{这儿|zhèr}{吗|ma}？'],
            ['magyarul', 'Tudok kínaiul.', 'Ideülhetek?']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{能|néng}{坐|zuò}{这儿|zhèr}{吗|ma}？', hu: 'Ideülhetek?' },
        { zh: '{能|néng}，{请|qǐng}{坐|zuò}。', hu: 'Igen, tessék, ülj le.' },
        { zh: '{明天|míng·tiān}{我|wǒ}{不|bù}{能|néng}{去|qù}{学校|xué·xiào}。', hu: 'Holnap nem tudok iskolába menni.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{能|néng}{说|shuō}{汉语|Hàn·yǔ}。（megtanultam）', good: '{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', why: 'Megtanult nyelvtudásra a {会|huì} a természetes.' }
      ]
    },
    {
      title: '{请|qǐng}', sub: 'kérem, tessék — udvarias kérés és kínálás',
      pattern: '{请|qǐng} + ige (+ tárgy)',
      body: 'A {请|qǐng} egy ige elé téve udvarias kérést vagy kínálást fejez ki: {请坐|qǐng zuò} „foglaljon helyet", {请喝茶|qǐng hē chá} „tessék, igyon teát", {请进|qǐng jìn} „tessék, jöjjön be". Ugyanez a szó van a {请问|qǐngwèn} „szabad kérdeznem" fordulatban.',
      more: [
        'A {请|qǐng} jelentése „meghívni" is: {我请你喝茶|wǒ qǐng nǐ hē chá} „meghívlak egy teára (én fizetek)". Ezt étteremben gyakran hallod.',
        'A {请|qǐng} a mondat elején áll, a {吗|ma} helyett nem kérdez: felszólít, csak kedvesen.'
      ],
      examples: [
        { zh: '{请|qǐng}{坐|zuò}！', hu: 'Foglaljon helyet!' },
        { zh: '{请|qǐng}{喝|hē}{茶|chá}。', hu: 'Tessék, igyon teát.' },
        { zh: '{请问|qǐng·wèn}，{这儿|zhèr}{有|yǒu}{汉语|Hàn·yǔ}{书|shū}{吗|ma}？', hu: 'Elnézést, van itt kínai könyv?' }
      ]
    },
    {
      title: '{前面|qiánmiàn} · {后面|hòumiàn} · {里|lǐ}', sub: 'további helyszavak',
      pattern: 'főnév + {前面|qián·miàn} / {后面|hòu·miàn} / {里|li} / {上|shàng}',
      body: 'A 9. lecke helyszavai bővülnek: {前面|qiánmiàn} „előtte, elöl", {后面|hòumiàn} „mögötte, hátul", {里|lǐ} „benne", {上|shàng} „rajta". Mindig a főnév <b>után</b> állnak: {学校前面|xuéxiào qiánmiàn} „az iskola előtt", {杯子里|bēizi li} „a bögrében".',
      more: [
        'Önállóan is megállnak: {在前面|zài qiánmiàn} „elöl van", {后面有一个商店|hòumiàn yǒu yí ge shāngdiàn} „hátul van egy bolt".'
      ],
      examples: [
        { zh: '{医院|yī·yuàn}{在|zài}{学校|xué·xiào}{后面|hòu·miàn}。', hu: 'A kórház az iskola mögött van.' },
        { zh: '{汉语|Hàn·yǔ}{书|shū}{在|zài}{前面|qián·miàn}。', hu: 'A kínai könyvek elöl vannak.' }
      ]
    }
  ],
  phrases: [
    { zh: '{我|wǒ}{能|néng}{坐|zuò}{这儿|zhèr}{吗|ma}？', hu: 'Ideülhetek?' },
    { zh: '{请|qǐng}{坐|zuò}。', hu: 'Foglaljon helyet.' },
    { zh: '{请|qǐng}{喝|hē}{茶|chá}。', hu: 'Tessék, egy kis tea.' },
    { zh: '{这儿|zhèr}{有|yǒu}……{吗|ma}？', hu: 'Van itt …?' },
    { zh: '{太|tài}{好|hǎo}{了|le}！', hu: 'Nagyszerű!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{桌子|zhuō·zi}', pinyin: 'zhuōzi', hu: 'asztal' },
        { zh: '{上|shàng}', pinyin: 'shàng', hu: 'rajta, fent' },
        { zh: '{电脑|diàn·nǎo}', pinyin: 'diànnǎo', hu: 'számítógép' },
        { zh: '{和|hé}', pinyin: 'hé', hu: 'és' },
        { zh: '{本|běn}', pinyin: 'běn', hu: 'könyvek mérőszava' },
        { zh: '{里|lǐ}', pinyin: 'lǐ', hu: 'benne' },
        { zh: '{前面|qián·miàn}', pinyin: 'qiánmiàn', hu: 'előtte, elöl' },
        { zh: '{后面|hòu·miàn}', pinyin: 'hòumiàn', hu: 'mögötte, hátul' },
        { zh: '{这儿|zhèr}', pinyin: 'zhèr', hu: 'itt' },
        { zh: '{没有|méi·yǒu}', pinyin: 'méiyǒu', hu: 'nincs' },
        { zh: '{能|néng}', pinyin: 'néng', hu: 'lehet, szabad; képes' },
        { zh: '{坐|zuò}', pinyin: 'zuò', hu: 'ülni' },
        { zh: '{请|qǐng}', pinyin: 'qǐng', hu: 'kérem; meghívni' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{图书馆|tú·shū·guǎn}', pinyin: 'túshūguǎn', hu: 'könyvtár' },
        { zh: '{先生|xiān·sheng}', pinyin: 'xiānsheng', hu: 'úr' },
        { zh: '{都|dōu}', pinyin: 'dōu', hu: 'mind, mindnyájan' },
        { zh: '{请问|qǐng·wèn}', pinyin: 'qǐngwèn', hu: 'szabad kérdeznem' }
      ] }
  ],
  culture: [
    { title: 'Vendégségben', text: 'Kínai otthonban a vendéget azonnal hellyel ({请坐|qǐng zuò}) és teával ({请喝茶|qǐng hē chá}) kínálják. Sok helyen cipőt is vesznek: figyeld, mit csinálnak a házigazdák. Ha valamit felajánlanak, udvarias egyszer-kétszer szerényen elhárítani, mielőtt elfogadod — a házigazda úgyis ragaszkodni fog hozzá.' },
    { title: 'Ki fizet?', text: 'Kínában a közös étkezés után ritkán osztják el a számlát. A {我请你|wǒ qǐng nǐ} „én hívlak meg" gyakran kedves vitát indít arról, ki fizessen. A legközelebbi alkalommal illik viszonozni.' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{房间|fáng·jiān}', titleHu: 'A szobám',
    text: [
      { zh: '{这|zhè}{是|shì}{我|wǒ}{的|de}{房间|fáng·jiān}。', hu: 'Ez a szobám.' },
      { zh: '{房间|fáng·jiān}{里|li}{有|yǒu}{一|yì}{张|zhāng}{桌子|zhuō·zi}{和|hé}{两|liǎng}{把|bǎ}{椅子|yǐ·zi}。', hu: 'A szobában van egy asztal és két szék.' },
      { zh: '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{一个|yí ge}{电脑|diàn·nǎo}{和|hé}{三|sān}{本|běn}{汉语|Hàn·yǔ}{书|shū}。', hu: 'Az asztalon van egy számítógép és három kínai könyv.', par: true },
      { zh: '{桌子|zhuō·zi}{下面|xià·miàn}{有|yǒu}{我|wǒ}{的|de}{小猫|xiǎo māo}。', hu: 'Az asztal alatt van a cicám.' },
      { zh: '{我|wǒ}{的|de}{朋友|péng·you}{能|néng}{在|zài}{这儿|zhèr}{看|kàn}{书|shū}，{但是|dàn·shì}{不|bù}{能|néng}{喝|hē}{茶|chá}。', hu: 'A barátaim olvashatnak itt, de teát nem ihatnak.', par: true }
    ],
    words: [ { zh: '{房间|fáng·jiān}', hu: 'szoba' }, { zh: '{张|zhāng}', hu: 'lapos tárgyak mérőszava (asztal)' }, { zh: '{把|bǎ}', hu: 'fogós tárgyak mérőszava (szék)' }, { zh: '{但是|dàn·shì}', hu: 'de' } ],
    questions: [
      { q: 'Mi van a szobában?', a: 'egy asztal és két szék', wrong: ['két asztal és egy szék', 'csak egy számítógép', 'egy ágy és egy asztal'], why: '{一张桌子和两把椅子|yì zhāng zhuōzi hé liǎng bǎ yǐzi}.' },
      { q: 'Hány kínai könyv van az asztalon?', a: 'három', wrong: ['kettő', 'egy', 'egy sem'], why: '{三本汉语书|sān běn Hànyǔ shū}.' },
      { q: 'Hol van a cica?', a: 'az asztal alatt', wrong: ['az asztalon', 'a széken', 'a könyvtárban'], why: '{桌子下面有我的小猫|zhuōzi xiàmiàn yǒu wǒ de xiǎo māo}.' },
      { q: 'Mit nem szabad a barátoknak a szobában?', a: 'teát inni', wrong: ['olvasni', 'leülni', 'számítógépezni'], why: '{不能喝茶|bù néng hē chá}.' }
    ]
  },
  quiz: [
    { q: '„Az asztalon van egy számítógép."', a: '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{一个|yí ge}{电脑|diàn·nǎo}。', wrong: ['{一个|yí ge}{电脑|diàn·nǎo}{有|yǒu}{桌子|zhuō·zi}{上|shàng}。', '{有|yǒu}{电脑|diàn·nǎo}{桌子|zhuō·zi}{上|shàng}。', '{桌子|zhuō·zi}{有|yǒu}{上|shàng}{电脑|diàn·nǎo}。'], why: 'Hely + {有|yǒu} + dolog.', point: 1 },
    { q: 'Hogyan tagadod: {这儿有汉语书|zhèr yǒu Hànyǔ shū}?', a: '{这儿|zhèr}{没有|méi·yǒu}{汉语|Hàn·yǔ}{书|shū}。', wrong: ['{这儿|zhèr}{不|bù}{有|yǒu}{汉语|Hàn·yǔ}{书|shū}。', '{这儿|zhèr}{有|yǒu}{不|bù}{汉语|Hàn·yǔ}{书|shū}。', '{这儿|zhèr}{不是|bú shì}{汉语|Hàn·yǔ}{书|shū}。'], why: 'A {有|yǒu} tagadása {没有|méiyǒu}.', point: 1 },
    { q: 'Mi a különbség: {电脑在桌子上|diànnǎo zài zhuōzi shàng} / {桌子上有电脑|zhuōzi shàng yǒu diànnǎo}?', a: '{在|zài}: hol van az ismert gép · {有|yǒu}: mi van az asztalon', wrong: ['az első múlt idejű, a második jelen idejű mondat', 'az első kérdés, a második egy egyszerű állítás', 'semmi, teljesen azonos a jelentésük minden helyzetben'], why: '{在|zài}: ismert dolog helye; {有|yǒu}: mi van egy helyen.', point: 1 },
    { q: '„Wang Ming és én barátok vagyunk."', a: '{我|wǒ}{和|hé}{王明|Wáng Míng}{是|shì}{朋友|péng·you}。', wrong: ['{我|wǒ}{王明|Wáng Míng}{和|hé}{是|shì}{朋友|péng·you}。', '{我|wǒ}{是|shì}{和|hé}{王明|Wáng Míng}{朋友|péng·you}。', '{和|hé}{我|wǒ}{王明|Wáng Míng}{朋友|péng·you}。'], why: 'A {和|hé} két főnevet köt össze.', point: 2 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{喝|hē}{茶|chá}{和|hé}{看|kàn}{书|shū}。', wrong: ['{我|wǒ}{和|hé}{他|tā}{是|shì}{同学|tóng·xué}。', '{桌子|zhuō·zi}{上|shàng}{有|yǒu}{书|shū}{和|hé}{杯子|bēi·zi}。', '{爸爸|bà·ba}{和|hé}{妈妈|mā·ma}{在|zài}{家|jiā}。'], why: 'A {和|hé} nem köt össze igéket.', point: 2 },
    { q: '„Ideülhetek?"', a: '{我|wǒ}{能|néng}{坐|zuò}{这儿|zhèr}{吗|ma}？', wrong: ['{我|wǒ}{会|huì}{坐|zuò}{这儿|zhèr}{吗|ma}？', '{我|wǒ}{坐|zuò}{能|néng}{这儿|zhèr}{吗|ma}？', '{请|qǐng}{我|wǒ}{坐|zuò}{这儿|zhèr}？'], why: 'Engedélyt a {能|néng} kér.', point: 3 },
    { q: 'Mikor {会|huì} és mikor {能|néng}?', a: '{会|huì}: megtanult tudás · {能|néng}: lehetőség, engedély', wrong: ['{会|huì}: lehetőség, engedély · {能|néng}: megtanult tudás', '{会|huì}: múlt idő · {能|néng}: jövő idő, tervezett dolog', 'teljesen felcserélhetők, bármikor bármelyik jó'], why: '{我会说汉语|wǒ huì shuō Hànyǔ} vs. {我能坐这儿吗|wǒ néng zuò zhèr ma}？', point: 3 },
    { q: '{我能坐这儿吗|wǒ néng zuò zhèr ma}？ — igenlő válasz:', a: '{能|néng}，{请|qǐng}{坐|zuò}。', wrong: ['{会|huì}，{请|qǐng}{坐|zuò}。', '{是|shì}，{坐|zuò}{请|qǐng}。', '{有|yǒu}，{请|qǐng}{坐|zuò}。'], why: 'A válasz a segédige: {能|néng}.', point: 3 },
    { q: 'Mit jelent: {请喝茶|qǐng hē chá}。', a: 'Tessék, igyon teát.', wrong: ['Kérek egy teát.', 'Teát iszom.', 'Meghívtam teára.'], why: '{请|qǐng} + ige: udvarias kínálás.', point: 4 },
    { q: 'Mit jelent: {我请你喝茶|wǒ qǐng nǐ hē chá}。', a: 'Meghívlak egy teára.', wrong: ['Kérlek, igyál teát!', 'Te hívsz meg teára.', 'Kérek tőled egy teát.'], why: 'A {请|qǐng} „meghívni" jelentésben.', point: 4 },
    { q: '„az iskola mögött"', a: '{学校|xué·xiào}{后面|hòu·miàn}', wrong: ['{后面|hòu·miàn}{学校|xué·xiào}', '{学校|xué·xiào}{前面|qián·miàn}', '{在|zài}{后|hòu}{学校|xué·xiào}'], why: 'Főnév + helyszó.', point: 5 },
    { q: 'Mit jelent a {前面|qiánmiàn}?', a: 'előtte, elöl', wrong: ['mögötte, hátul', 'benne', 'alatta'], why: '{前面|qiánmiàn} ↔ {后面|hòumiàn}.', point: 5 },
    { q: 'Mit jelent: {杯子里有茶|bēizi li yǒu chá}。', a: 'A bögrében tea van.', wrong: ['A tea a bögre mellett van.', 'A bögre teás.', 'Teát iszik a bögréből.'], why: '{杯子里|bēizi li} „a bögrében".', point: 1 },
    { q: 'Mit jelent a {电脑|diànnǎo}?', a: 'számítógép', wrong: ['televízió', 'telefon', 'könyvtár'], why: 'Szó szerint „elektromos agy".' },
    { q: 'Mit jelent a {坐|zuò}?', a: 'ülni', wrong: ['állni', 'csinálni', 'menni'], why: '{请坐|qǐng zuò} „foglaljon helyet". (Figyelj: a {做|zuò} „csinálni" más írásjegy!)' },
    { q: '„Holnap nem tudok iskolába menni (nem lehetséges)."', a: '{明天|míng·tiān}{我|wǒ}{不|bù}{能|néng}{去|qù}{学校|xué·xiào}。', wrong: ['{明天|míng·tiān}{我|wǒ}{不|bú}{会|huì}{去|qù}{学校|xué·xiào}。', '{明天|míng·tiān}{我|wǒ}{没|méi}{能|néng}{去|qù}{学校|xué·xiào}。', '{我|wǒ}{不|bù}{能|néng}{明天|míng·tiān}{学校|xué·xiào}{去|qù}。'], why: 'Körülmények miatti lehetetlenség: {不能|bù néng}.', point: 3 }
  ]
},

/* ════════════════════════════════════════════════════
   11. LECKE — idő: 几点, 点 + 分, 什么时候, 前
   ════════════════════════════════════════════════════ */
{
  id: 'l11', no: 11, kicker: 'HSK 1 · 11. lecke',
  title: 'Hány óra van? — idő és napirend',
  lead: 'Megkérdezed és megmondod, hány óra van, mikor csinálsz valamit, és elmondod a napirendedet. A kínai itt is a nagyobb egységgel kezd: nap → napszak → óra → perc.',
  cando: [
    'Megkérdezed és megmondod a pontos időt (现在几点？ 十点十分).',
    'Időpontot teszel a cselekvés elé (我七点吃早饭).',
    'Megkérdezed: mikor? (什么时候？).',
    'Kifejezed, hogy valami előtt (三点前).'
  ],
  intro: [
    'Az időt mondó szavak a kínai mondatban mindig a cselekvés <b>előtt</b> állnak, és nagyobbtól a kisebb felé haladnak: {明天上午十点|míngtiān shàngwǔ shí diǎn} „holnap délelőtt tíz órakor". Ha ezt a szabályt megjegyzed, a napirendet már könnyen elmondod.',
    'Az óra {点|diǎn}, a perc {分|fēn}: {八点二十分|bā diǎn èrshí fēn} „nyolc óra húsz". A „háromnegyed" és a „fél" is megvan, de a kezdő nyugodtan mondhat perceket.'
  ],
  dialogue: {
    title: 'Mozi este',
    scene: 'Anna és David a délelőtti óra után beszélgetnek. David moziba hívja Annát.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{现在|xiàn·zài}{几|jǐ}{点|diǎn}？', hu: 'Anna, hány óra van?' },
      { who: 'Anna', zh: '{现在|xiàn·zài}{十一|shí·yī}{点|diǎn}{二十|èr·shí}{分|fēn}。', hu: 'Tizenegy óra húsz perc van.' },
      { who: 'David', zh: '{你|nǐ}{中午|zhōng·wǔ}{几|jǐ}{点|diǎn}{吃|chī}{饭|fàn}？', hu: 'Délben hánykor eszel?' },
      { who: 'Anna', zh: '{十二|shí·èr}{点|diǎn}。{你|nǐ}{呢|ne}？', hu: 'Tizenkettőkor. És te?' },
      { who: 'David', zh: '{我|wǒ}{也|yě}{是|shì}。{晚上|wǎn·shang}{我们|wǒ·men}{去|qù}{看|kàn}{电影|diàn·yǐng}，{好|hǎo}{吗|ma}？', hu: 'Én is. Este elmegyünk moziba, jó?' },
      { who: 'Anna', zh: '{好|hǎo}{啊|a}！{什么|shén·me}{时候|shí·hou}{去|qù}？', hu: 'Jó! Mikor megyünk?' },
      { who: 'David', zh: '{电影|diàn·yǐng}{七|qī}{点|diǎn}{半|bàn}{开始|kāi·shǐ}，{我们|wǒ·men}{七|qī}{点|diǎn}{前|qián}{去|qù}。', hu: 'A film fél nyolckor kezdődik, hét előtt indulunk.' },
      { who: 'Anna', zh: '{好|hǎo}，{我|wǒ}{六|liù}{点|diǎn}{半|bàn}{回|huí}{家|jiā}，{七|qī}{点|diǎn}{见|jiàn}！', hu: 'Jó, fél hétkor hazamegyek, hétkor találkozunk!' }
    ],
    notes: [
      'A {几点|jǐ diǎn} „hány óra" a {几|jǐ}-vel kérdez, mert a válasz 12 alatti szám.',
      'A …，{好吗|hǎo ma}？ „…, jó?" a javaslat utáni szokásos kérdés. Válasz: {好|hǎo} vagy {好啊|hǎo a} „rendben, jó!".',
      'A {半|bàn} „fél": {七点半|qī diǎn bàn} „fél nyolc" — szó szerint „hét óra és fél". Figyelj: a magyar „fél nyolc" a 7:30, és a kínaiban is: <b>hét</b> óra fél.'
    ]
  },
  points: [
    {
      title: '{几点|jǐ diǎn}', sub: 'hány óra? — óra és perc',
      pattern: 'szám + {点|diǎn}（+ szám + {分|fēn}）',
      body: 'Az óra {点|diǎn}, a perc {分|fēn}: {八点|bā diǎn} „nyolc óra", {八点十分|bā diǎn shí fēn} „nyolc óra tíz", {十一点二十|shíyī diǎn èrshí} „tizenegy húsz" (a {分|fēn} a végén elhagyható). Kérdés: {现在几点|xiànzài jǐ diǎn}？ „Hány óra van most?"',
      more: [
        'A „fél" {半|bàn}: {七点半|qī diǎn bàn} „hét óra harminc". A negyedóra {刻|kè}: {八点一刻|bā diǎn yí kè} „nyolc tizenöt".',
        'Két óra: {两点|liǎng diǎn} (mérőszó-szerű a {点|diǎn}, ezért {两|liǎng}); de {十二点|shí\'èr diǎn} „tizenkét óra".',
        'Tíz perc alatt a {零|líng} „nulla" is beszúrható: {九点零五分|jiǔ diǎn líng wǔ fēn} „kilenc óra öt perc".'
      ],
      tables: [
        { caption: 'Időpontok',
          head: ['Idő', 'Kínaiul'],
          rows: [
            ['8:00', '{八|bā}{点|diǎn}'],
            ['8:10', '{八|bā}{点|diǎn}{十|shí}{分|fēn}'],
            ['8:15', '{八|bā}{点|diǎn}{一|yí}{刻|kè} / {八|bā}{点|diǎn}{十五|shí·wǔ}'],
            ['8:30', '{八|bā}{点|diǎn}{半|bàn}'],
            ['2:05', '{两|liǎng}{点|diǎn}{零|líng}{五|wǔ}{分|fēn}']
          ] }
      ],
      examples: [
        { zh: '{现在|xiàn·zài}{几|jǐ}{点|diǎn}？', hu: 'Hány óra van?' },
        { zh: '{现在|xiàn·zài}{十|shí}{点|diǎn}{十|shí}{分|fēn}。', hu: 'Tíz óra tíz perc van.' },
        { zh: '{现在|xiàn·zài}{两|liǎng}{点|diǎn}{半|bàn}。', hu: 'Fél három van.' }
      ],
      mistakes: [
        { bad: '{二|èr}{点|diǎn}', good: '{两|liǎng}{点|diǎn}', why: 'Két órakor {两点|liǎng diǎn}.' },
        { bad: '{半|bàn}{八|bā}{点|diǎn} (= fél nyolc)', good: '{七|qī}{点|diǎn}{半|bàn}', why: 'A {半|bàn} az óra után áll: 7:30 = {七点半|qī diǎn bàn}.' }
      ]
    },
    {
      title: 'idő + cselekvés', sub: 'az időpont az ige előtt',
      pattern: 'A + időpont + ige · időpont + A + ige',
      body: 'Az időpont, amikor valami történik, <b>az ige elé</b> kerül (a mondat elejére vagy az alany után): {我七点吃早饭|wǒ qī diǎn chī zǎofàn} „hétkor reggelizem", {明天上午十点我去医院|míngtiān shàngwǔ shí diǎn wǒ qù yīyuàn} „holnap délelőtt tízkor megyek a kórházba". Több időszó esetén a nagyobb egység van elöl.',
      more: [
        'A napszakok: {早上|zǎoshang} „reggel", {上午|shàngwǔ} „délelőtt", {中午|zhōngwǔ} „dél", {下午|xiàwǔ} „délután", {晚上|wǎnshang} „este". Ezek is az óra elé kerülnek: {晚上八点|wǎnshang bā diǎn} „este nyolc".',
        'Kérdés: {你几点吃饭|nǐ jǐ diǎn chī fàn}？ „Hánykor eszel?" — a {几点|jǐ diǎn} a helyén, az ige előtt.'
      ],
      examples: [
        { zh: '{我|wǒ}{早上|zǎo·shang}{七|qī}{点|diǎn}{吃|chī}{早饭|zǎo·fàn}。', hu: 'Reggel hétkor reggelizem.' },
        { zh: '{你|nǐ}{几|jǐ}{点|diǎn}{去|qù}{学校|xué·xiào}？', hu: 'Hánykor mész iskolába?' },
        { zh: '{下午|xià·wǔ}{三|sān}{点|diǎn}{我|wǒ}{回|huí}{家|jiā}。', hu: 'Délután háromkor hazamegyek.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{吃|chī}{饭|fàn}{十二|shí·èr}{点|diǎn}。', good: '{我|wǒ}{十二|shí·èr}{点|diǎn}{吃|chī}{饭|fàn}。', why: 'Az időpont az ige előtt áll.' },
        { bad: '{八|bā}{点|diǎn}{晚上|wǎn·shang}', good: '{晚上|wǎn·shang}{八|bā}{点|diǎn}', why: 'Nagyobb egység elöl: napszak, aztán óra.' }
      ]
    },
    {
      title: '{什么时候|shénme shíhou}', sub: '„mikor?"',
      pattern: 'A + {什么|shén·me}{时候|shí·hou} + ige？',
      body: 'A {什么时候|shénme shíhou} „mikor" (szó szerint „milyen időben") általános időre kérdez: lehet nap, napszak vagy óra. Az ige elé kerül: {你什么时候回家|nǐ shénme shíhou huí jiā}？ „Mikor mész haza?" Ha pontos órát vársz, a {几点|jǐ diǎn} a jobb.',
      examples: [
        { zh: '{你|nǐ}{什么|shén·me}{时候|shí·hou}{回|huí}{家|jiā}？', hu: 'Mikor mész haza?' },
        { zh: '{我们|wǒ·men}{什么|shén·me}{时候|shí·hou}{去|qù}{看|kàn}{电影|diàn·yǐng}？', hu: 'Mikor megyünk moziba?' },
        { zh: '{明天|míng·tiān}{下午|xià·wǔ}。', hu: 'Holnap délután.' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{回|huí}{家|jiā}{什么|shén·me}{时候|shí·hou}？', good: '{你|nǐ}{什么|shén·me}{时候|shí·hou}{回|huí}{家|jiā}？', why: 'A „mikor" is időhatározó: az ige elé.' }
      ]
    },
    {
      title: '…{前|qián}', sub: 'valami előtt',
      pattern: 'időpont / esemény + {前|qián}',
      body: 'A {前|qián} egy időpont vagy esemény <b>után</b> állva „előtte" jelentésű: {七点前|qī diǎn qián} „hét óra előtt", {吃饭前|chī fàn qián} „evés előtt". A magyarhoz képest itt is fordított a sorrend: „hét óra előtt" = „hét óra" + „előtt".',
      more: [
        'Párja a {后|hòu} „utána": {吃饭后|chī fàn hòu} „evés után" (a 14. leckében még előkerül).',
        'A {以前|yǐqián} hosszabb alak, ugyanilyen jelentéssel: {七点以前|qī diǎn yǐqián}.'
      ],
      examples: [
        { zh: '{我们|wǒ·men}{七|qī}{点|diǎn}{前|qián}{去|qù}。', hu: 'Hét előtt indulunk.' },
        { zh: '{吃|chī}{饭|fàn}{前|qián}{我|wǒ}{看|kàn}{一会儿|yí·huìr}{书|shū}。', hu: 'Evés előtt olvasok egy kicsit.' }
      ]
    },
    {
      title: '{回|huí}', sub: 'visszamenni, hazamenni',
      pattern: '{回|huí} + hely（{回|huí}{家|jiā}）',
      body: 'A {回|huí} „visszamenni, visszajönni": oda megy, ahonnan jött vagy ahová tartozik. Leggyakoribb: {回家|huí jiā} „hazamegy", {回学校|huí xuéxiào} „visszamegy az iskolába", {回国|huí guó} „hazautazik (a saját országába)". A hely itt is közvetlenül az ige után áll, rag nélkül.',
      examples: [
        { zh: '{我|wǒ}{六|liù}{点|diǎn}{半|bàn}{回|huí}{家|jiā}。', hu: 'Fél hétkor megyek haza.' },
        { zh: '{她|tā}{明年|míng·nián}{回|huí}{国|guó}。', hu: 'Jövőre hazautazik (a hazájába).' }
      ]
    }
  ],
  phrases: [
    { zh: '{现在|xiàn·zài}{几|jǐ}{点|diǎn}？', hu: 'Hány óra van?' },
    { zh: '{你|nǐ}{几|jǐ}{点|diǎn}{吃|chī}{饭|fàn}？', hu: 'Hánykor eszel?' },
    { zh: '{什么|shén·me}{时候|shí·hou}{去|qù}？', hu: 'Mikor megyünk?' },
    { zh: '……，{好|hǎo}{吗|ma}？', hu: '…, jó? (javaslat)' },
    { zh: '{七|qī}{点|diǎn}{见|jiàn}！', hu: 'Hétkor találkozunk!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{现在|xiàn·zài}', pinyin: 'xiànzài', hu: 'most' },
        { zh: '{点|diǎn}', pinyin: 'diǎn', hu: 'óra (időpont)' },
        { zh: '{分|fēn}', pinyin: 'fēn', hu: 'perc' },
        { zh: '{中午|zhōng·wǔ}', pinyin: 'zhōngwǔ', hu: 'dél' },
        { zh: '{吃饭|chī fàn}', pinyin: 'chī fàn', hu: 'enni, étkezni' },
        { zh: '{时候|shí·hou}', pinyin: 'shíhou', hu: 'idő, időpont' },
        { zh: '{回|huí}', pinyin: 'huí', hu: 'visszamenni' },
        { zh: '{我们|wǒ·men}', pinyin: 'wǒmen', hu: 'mi' },
        { zh: '{电影|diàn·yǐng}', pinyin: 'diànyǐng', hu: 'film' },
        { zh: '{住|zhù}', pinyin: 'zhù', hu: 'lakni' },
        { zh: '{前|qián}', pinyin: 'qián', hu: 'előtt' }
      ] },
    { title: 'Napszakok és ráadás',
      items: [
        { zh: '{早上|zǎo·shang}', pinyin: 'zǎoshang', hu: 'reggel' },
        { zh: '{上午|shàng·wǔ}', pinyin: 'shàngwǔ', hu: 'délelőtt' },
        { zh: '{下午|xià·wǔ}', pinyin: 'xiàwǔ', hu: 'délután' },
        { zh: '{晚上|wǎn·shang}', pinyin: 'wǎnshang', hu: 'este' },
        { zh: '{半|bàn}', pinyin: 'bàn', hu: 'fél' },
        { zh: '{开始|kāi·shǐ}', pinyin: 'kāishǐ', hu: 'kezdődni' }
      ] }
  ],
  culture: [
    { title: 'Egy időzóna', text: 'Kína szélessége öt időzónát fedne le, mégis az egész ország egyetlen, a pekingi időt használja. A nyugati Hszincsiangban ezért nyáron este tizenegykor is világos van, és a helyiek egymás közt gyakran a „helyi időben" ({新疆时间|Xīnjiāng shíjiān}) beszélnek.' },
    { title: 'Ebédszünet', text: 'Kínában az ebéd korán van: déli tizenkettő körül, és sok iskolában, hivatalban utána rövid délutáni pihenő ({午休|wǔxiū}) következik. A vacsora is korábbi, mint nálunk, gyakran már hat körül.' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{一|yì}{天|tiān}', titleHu: 'Egy napom',
    text: [
      { zh: '{我|wǒ}{早上|zǎo·shang}{七|qī}{点|diǎn}{吃|chī}{早饭|zǎo·fàn}，{八|bā}{点|diǎn}{去|qù}{学校|xué·xiào}。', hu: 'Reggel hétkor reggelizem, nyolckor megyek iskolába.' },
      { zh: '{上午|shàng·wǔ}{我|wǒ}{学|xué}{汉语|Hàn·yǔ}。', hu: 'Délelőtt kínait tanulok.' },
      { zh: '{中午|zhōng·wǔ}{十二|shí·èr}{点|diǎn}，{我|wǒ}{和|hé}{朋友|péng·you}{在|zài}{学校|xué·xiào}{吃|chī}{饭|fàn}。', hu: 'Délben tizenkettőkor a barátaimmal az iskolában ebédelek.', par: true },
      { zh: '{下午|xià·wǔ}{我|wǒ}{在|zài}{图书馆|tú·shū·guǎn}{看|kàn}{书|shū}，{五|wǔ}{点|diǎn}{半|bàn}{回|huí}{家|jiā}。', hu: 'Délután a könyvtárban olvasok, fél hatkor megyek haza.' },
      { zh: '{今天|jīn·tiān}{晚上|wǎn·shang}{我|wǒ}{和|hé}{大卫|Dà·wèi}{去|qù}{看|kàn}{电影|diàn·yǐng}。', hu: 'Ma este Daviddel moziba megyek.', par: true }
    ],
    words: [ { zh: '{早饭|zǎo·fàn}', hu: 'reggeli' }, { zh: '{一|yì}{天|tiān}', hu: 'egy nap' } ],
    questions: [
      { q: 'Hánykor megy iskolába?', a: 'nyolckor', wrong: ['hétkor', 'tizenkettőkor', 'fél hatkor'], why: '{八点去学校|bā diǎn qù xuéxiào}.' },
      { q: 'Hol és kivel ebédel?', a: 'az iskolában, a barátaival', wrong: ['otthon, a családjával', 'a könyvtárban, egyedül', 'moziban, Daviddel'], why: '{我和朋友在学校吃饭|wǒ hé péngyou zài xuéxiào chī fàn}.' },
      { q: 'Mikor megy haza?', a: 'fél hatkor', wrong: ['fél ötkor', 'hatkor', 'este nyolckor'], why: '{五点半回家|wǔ diǎn bàn huí jiā} = 5:30.' },
      { q: 'Mit csinál ma este?', a: 'moziba megy Daviddel', wrong: ['otthon olvas', 'kínait tanul', 'a könyvtárban ül'], why: '{今天晚上我和大卫去看电影|jīntiān wǎnshang wǒ hé Dàwèi qù kàn diànyǐng}.' }
    ]
  },
  quiz: [
    { q: 'Hogyan kérdezed: „Hány óra van?"', a: '{现在|xiàn·zài}{几|jǐ}{点|diǎn}？', wrong: ['{现在|xiàn·zài}{多少|duō·shao}{钱|qián}？', '{现在|xiàn·zài}{什么|shén·me}{点|diǎn}{吗|ma}？', '{几|jǐ}{现在|xiàn·zài}{点|diǎn}？'], why: '{几点|jǐ diǎn} „hány óra".', point: 1 },
    { q: 'Hogyan mondod: 8:10?', a: '{八|bā}{点|diǎn}{十|shí}{分|fēn}', wrong: ['{十|shí}{分|fēn}{八|bā}{点|diǎn}', '{八|bā}{分|fēn}{十|shí}{点|diǎn}', '{十|shí}{点|diǎn}{八|bā}{分|fēn}'], why: 'Óra, aztán perc.', point: 1 },
    { q: 'Mennyi az idő: {七点半|qī diǎn bàn}?', a: '7:30', wrong: ['6:30', '7:50', '8:30'], why: '{七点|qī diǎn} + {半|bàn} „fél" = 7:30.', point: 1 },
    { q: 'Hogyan mondod: „két óra"?', a: '{两|liǎng}{点|diǎn}', wrong: ['{二|èr}{点|diǎn}', '{二|èr}{个|ge}{点|diǎn}', '{点|diǎn}{两|liǎng}'], why: 'A {点|diǎn} előtt a „kettő" {两|liǎng}.', point: 1 },
    { q: '„Hétkor reggelizem."', a: '{我|wǒ}{七|qī}{点|diǎn}{吃|chī}{早饭|zǎo·fàn}。', wrong: ['{我|wǒ}{吃|chī}{早饭|zǎo·fàn}{七|qī}{点|diǎn}。', '{七|qī}{点|diǎn}{吃|chī}{我|wǒ}{早饭|zǎo·fàn}。', '{我|wǒ}{早饭|zǎo·fàn}{七|qī}{点|diǎn}{吃|chī}{在|zài}。'], why: 'Az időpont az ige előtt.', point: 2 },
    { q: 'Melyik a helyes: „este nyolckor"?', a: '{晚上|wǎn·shang}{八|bā}{点|diǎn}', wrong: ['{八|bā}{点|diǎn}{晚上|wǎn·shang}', '{晚上|wǎn·shang}{的|de}{八|bā}', '{八|bā}{晚上|wǎn·shang}{点|diǎn}'], why: 'Nagyobb egység elöl.', point: 2 },
    { q: 'Hogyan kérdezed: „Mikor mész haza?"', a: '{你|nǐ}{什么|shén·me}{时候|shí·hou}{回|huí}{家|jiā}？', wrong: ['{你|nǐ}{回|huí}{家|jiā}{什么|shén·me}{时候|shí·hou}？', '{什么|shén·me}{你|nǐ}{回|huí}{家|jiā}{时候|shí·hou}？', '{你|nǐ}{回|huí}{家|jiā}{吗|ma}{什么|shén·me}？'], why: 'A {什么时候|shénme shíhou} az ige elé kerül.', point: 3 },
    { q: 'Mikor jobb a {几点|jǐ diǎn}, mint a {什么时候|shénme shíhou}?', a: 'ha pontos órát vársz válaszul', wrong: ['ha napot vagy dátumot kérdezel', 'ha a múltról kérdezel valakit', 'ha udvariasan kérdezel idősebbet'], why: 'A {几点|jǐ diǎn} órára, a {什么时候|shénme shíhou} bármilyen időre kérdez.', point: 3 },
    { q: '„hét óra előtt"', a: '{七|qī}{点|diǎn}{前|qián}', wrong: ['{前|qián}{七|qī}{点|diǎn}', '{七|qī}{前|qián}{点|diǎn}', '{前面|qián·miàn}{七|qī}{点|diǎn}'], why: 'Időpont + {前|qián}.', point: 4 },
    { q: 'Mit jelent: {吃饭前|chī fàn qián}？', a: 'evés előtt', wrong: ['evés után', 'evés közben', 'a vendéglő előtt'], why: 'Esemény + {前|qián} „előtte".', point: 4 },
    { q: 'Mit jelent: {我六点回家|wǒ liù diǎn huí jiā}。', a: 'Hatkor megyek haza.', wrong: ['Hat órát vagyok otthon.', 'Hat órára jövök vissza.', 'Hatkor jövök el otthonról.'], why: '{回家|huí jiā} „hazamenni".', point: 5 },
    { q: 'Mit jelent a {现在|xiànzài}?', a: 'most', wrong: ['ma', 'mindig', 'később'], why: '{现在几点|xiànzài jǐ diǎn}？ „Hány óra van most?"' },
    { q: 'Mit jelent a {电影|diànyǐng}?', a: 'film', wrong: ['televízió', 'számítógép', 'telefon'], why: '{看电影|kàn diànyǐng} „filmet néz, moziba megy".' },
    { q: 'Melyik a „délután"?', a: '{下午|xià·wǔ}', wrong: ['{上午|shàng·wǔ}', '{中午|zhōng·wǔ}', '{晚上|wǎn·shang}'], why: '{上午|shàngwǔ} délelőtt · {中午|zhōngwǔ} dél · {下午|xiàwǔ} délután.', point: 2 },
    { q: '{晚上我们去看电影，好吗|wǎnshang wǒmen qù kàn diànyǐng, hǎo ma}？ — mit jelent a {好吗|hǎo ma}?', a: '„jó?" — javaslat utáni kérdés', wrong: ['„jó film?" — a filmről kérdez', '„jól vagy?" — hogylétre kérdez', '„nem jó?" — tagadó kérdés'], why: 'Javaslat + {好吗|hǎo ma}？ = „…, jó lesz?"', point: 2 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{吃|chī}{饭|fàn}{十二|shí·èr}{点|diǎn}。', wrong: ['{我|wǒ}{十二|shí·èr}{点|diǎn}{吃|chī}{饭|fàn}。', '{十二|shí·èr}{点|diǎn}{我|wǒ}{吃|chī}{饭|fàn}。', '{我|wǒ}{中午|zhōng·wǔ}{吃|chī}{饭|fàn}。'], why: 'Az időpont nem kerülhet az ige után.', point: 2 }
  ]
},

/* ════════════════════════════════════════════════════
   12. LECKE — 怎么样, 太…了, téma + állítmány, 会 (valószínűség)
   ════════════════════════════════════════════════════ */
{
  id: 'l12', no: 12, kicker: 'HSK 1 · 12. lecke',
  title: 'Milyen idő lesz holnap? — időjárás és hogylét',
  lead: 'Beszélsz az időjárásról, megkérdezed, hogy van valaki, és javaslatot teszel. Közben: a sokoldalú 怎么样, a túlzó 太…了, és a 会 második jelentése — „valószínűleg fog".',
  cando: [
    'Megkérdezed, milyen valami (天气怎么样？), és javaslatot teszel (…，怎么样？).',
    'Erős érzést fejezel ki: 太热了！ 太好了！',
    'Elmondod, hogy van valaki: 我身体很好.',
    'Előrejelzést mondasz a 会 segédigével: 明天会下雨.'
  ],
  intro: [
    'Az időjárás Kínában is az első beszédtéma két ismeretlen között. A legfontosabb kérdés: {天气怎么样|tiānqì zěnmeyàng}？ „Milyen az idő?" — és a {怎么样|zěnmeyàng} szinte bármire rákérdez: hogylétre, ízre, filmre, tervre.',
    'Új mondatszerkezetet is tanulsz: a <b>téma + megjegyzés</b> mondatot. A {我身体很好|wǒ shēntǐ hěn hǎo} szó szerint „én — a testem jó": előbb kimondod, kiről/miről beszélsz, aztán azt, ami róla igaz. A kínaiban ez nagyon gyakori.'
  ],
  dialogue: {
    title: 'Hétvégi tervek',
    scene: 'Péntek este. Anna felhívja Zhang tanárnőt, mert szombaton közös kirándulást terveztek a Nagy Falhoz.',
    lines: [
      { who: 'Anna', zh: '{张|Zhāng}{老师|lǎo·shī}，{明天|míng·tiān}{天气|tiān·qì}{怎么样|zěn·me·yàng}？', hu: 'Zhang tanárnő, milyen idő lesz holnap?' },
      { who: 'Zhang tanárnő', zh: '{明天|míng·tiān}{会|huì}{下雨|xià yǔ}，{很|hěn}{冷|lěng}。', hu: 'Holnap esni fog, és hideg lesz.' },
      { who: 'Anna', zh: '{太|tài}{冷|lěng}{了|le}！{我们|wǒ·men}{星期天|xīng·qī·tiān}{去|qù}，{怎么样|zěn·me·yàng}？', hu: 'Az túl hideg! Menjünk vasárnap, jó?' },
      { who: 'Zhang tanárnő', zh: '{好|hǎo}。{星期天|xīng·qī·tiān}{不|bú}{会|huì}{下雨|xià yǔ}，{天气|tiān·qì}{很|hěn}{好|hǎo}。', hu: 'Rendben. Vasárnap nem fog esni, szép idő lesz.' },
      { who: 'Zhang tanárnő', zh: '{你|nǐ}{身体|shēn·tǐ}{怎么样|zěn·me·yàng}？', hu: 'És hogy vagy (egészségileg)?' },
      { who: 'Anna', zh: '{我|wǒ}{身体|shēn·tǐ}{很|hěn}{好|hǎo}，{谢谢|xiè·xie}！', hu: 'Jól vagyok, köszönöm!' },
      { who: 'Zhang tanárnő', zh: '{北京|Běi·jīng}{的|de}{秋天|qiū·tiān}{很|hěn}{漂亮|piào·liang}，{你|nǐ}{会|huì}{喜欢|xǐ·huan}{的|de}。', hu: 'A pekingi ősz nagyon szép, meg fog tetszeni.' }
    ],
    notes: [
      'A {下雨|xià yǔ} szó szerint „esőt ejt (le)": a {下|xià} „le" + {雨|yǔ} „eső". Ugyanígy: {下雪|xià xuě} „havazik".',
      'A …，{怎么样|zěnmeyàng}？ a javaslat utáni kérdés: „…, mit szólsz?" Ugyanaz a funkció, mint a 11. lecke {好吗|hǎo ma}？ kérdésének.',
      'A {你会喜欢的|nǐ huì xǐhuan de} „biztosan tetszeni fog": a mondat végi {的|de} a meggyőződést erősíti. Most egészében jegyezd meg.'
    ]
  },
  points: [
    {
      title: '{怎么样|zěnmeyàng}', sub: '„milyen?", „hogy?", „mit szólsz?"',
      pattern: 'A + {怎么样|zěn·me·yàng}？ · javaslat，{怎么样|zěn·me·yàng}？',
      body: 'A {怎么样|zěnmeyàng} kétféleképpen kérdez. Egy dolog után <b>milyenségre</b>: {天气怎么样|tiānqì zěnmeyàng}？ „Milyen az idő?", {这个菜怎么样|zhège cài zěnmeyàng}？ „Milyen ez az étel?". Egy javaslat után <b>véleményre</b>: {我们去看电影，怎么样|wǒmen qù kàn diànyǐng, zěnmeyàng}？ „Menjünk moziba, mit szólsz?"',
      more: [
        'A válasz rendszerint melléknév ({很好|hěn hǎo}, {不错|búcuò} „nem rossz", {太冷了|tài lěng le}), javaslatra {好|hǎo} / {好啊|hǎo a} „jó!" vagy {不行|bù xíng} „nem jó, nem megy".',
        'Ne keverd a {怎么|zěnme}-vel (6. lecke): a {怎么|zěnme} ige előtt „hogyan csinálni", a {怎么样|zěnmeyàng} mondat végén „milyen".'
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{天气|tiān·qì}{怎么样|zěn·me·yàng}？', hu: 'Milyen ma az idő?' },
        { zh: '{这个|zhè·ge}{电影|diàn·yǐng}{怎么样|zěn·me·yàng}？', hu: 'Milyen ez a film?' },
        { zh: '{我们|wǒ·men}{明天|míng·tiān}{去|qù}，{怎么样|zěn·me·yàng}？', hu: 'Menjünk holnap, mit szólsz?' }
      ],
      mistakes: [
        { bad: '{天气|tiān·qì}{怎么|zěn·me}？', good: '{天气|tiān·qì}{怎么样|zěn·me·yàng}？', why: 'A „milyen?" kérdés {怎么样|zěnmeyàng}; a {怎么|zěnme} ige előtt áll.' }
      ]
    },
    {
      title: '{太|tài}…{了|le}', sub: '„túl …", „de …!"',
      pattern: '{太|tài} + melléknév + {了|le}',
      body: 'A {太|tài} + melléknév + {了|le} erős érzést fejez ki: vagy túlzást („túl hideg"), vagy lelkesedést („de jó!"). {太冷了|tài lěng le} „túl hideg van / de hideg van!", {太好了|tài hǎo le} „nagyszerű!", {太贵了|tài guì le} „túl drága!". A {了|le} itt a mondat végén áll, és a {太|tài}-val együtt jár.',
      more: [
        'Tagadva a {了|le} elmarad: {不太冷|bú tài lěng} „nem túl hideg, nem nagyon hideg" — ez udvarias, tompított tagadás.',
        'Pozitív melléknévvel ({好|hǎo}, {漂亮|piàoliang}) általában lelkesedés, negatívval ({冷|lěng}, {贵|guì}) panasz a jelentése.'
      ],
      examples: [
        { zh: '{太|tài}{冷|lěng}{了|le}！', hu: 'Túl hideg van! / De hideg van!' },
        { zh: '{太|tài}{好|hǎo}{了|le}！', hu: 'Nagyszerű!' },
        { zh: '{今天|jīn·tiān}{不|bú}{太|tài}{热|rè}。', hu: 'Ma nincs túl meleg.' }
      ],
      mistakes: [
        { bad: '{太|tài}{冷|lěng}！', good: '{太|tài}{冷|lěng}{了|le}！', why: 'Állításban a {太|tài} mellé a mondat végére {了|le} kell.' }
      ]
    },
    {
      title: '{我|wǒ}{身体|shēntǐ}{很|hěn}{好|hǎo}', sub: 'téma + megjegyzés',
      pattern: 'téma + (alany + állítmány)',
      body: 'A kínai mondat gyakran egy <b>témával</b> kezdődik, és utána egy teljes kis mondat mondja el, mi igaz rá: {我身体很好|wǒ shēntǐ hěn hǎo} „én — a testem jó" = „egészséges vagyok", {北京天气很冷|Běijīng tiānqì hěn lěng} „Peking — az időjárás hideg" = „Pekingben hideg van". Magyarul gyakran „-nál/-nél, -ban" vagy birtokos szerkezet lesz belőle.',
      more: [
        'A {你身体怎么样|nǐ shēntǐ zěnmeyàng}？ „Hogy van az egészséged?" udvarias, gondoskodó kérdés, főleg idősebbeknek.',
        'Ez nem birtokos szerkezet: nem kell {的|de}. {我身体很好|wǒ shēntǐ hěn hǎo} természetesebb, mint {我的身体很好|wǒ de shēntǐ hěn hǎo}.'
      ],
      examples: [
        { zh: '{我|wǒ}{身体|shēn·tǐ}{很|hěn}{好|hǎo}。', hu: 'Egészséges vagyok. (Jól vagyok.)' },
        { zh: '{北京|Běi·jīng}{天气|tiān·qì}{很|hěn}{冷|lěng}。', hu: 'Pekingben hideg van.' },
        { zh: '{她|tā}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}。', hu: 'Jól tud kínaiul. (A kínaija jó.)' }
      ]
    },
    {
      title: '{会|huì}', sub: '„valószínűleg fog" — előrejelzés',
      pattern: 'A + {会|huì} + ige / melléknév · A + {不会|bú huì} + …',
      body: 'A 6. leckében a {会|huì} megtanult tudást jelentett. Most egy második jelentést tanulsz: <b>valószínű jövő, előrejelzés</b>. {明天会下雨|míngtiān huì xià yǔ} „holnap esni fog", {他会来|tā huì lái} „el fog jönni (szerintem)". Tagadva {不会|bú huì}: {明天不会下雨|míngtiān bú huì xià yǔ} „holnap nem fog esni".',
      more: [
        'A kettőt a helyzet választja szét: {我会说汉语|wǒ huì shuō Hànyǔ} „tudok kínaiul" (megtanult tudás), {明天会冷|míngtiān huì lěng} „holnap hideg lesz" (előrejelzés).',
        'A mondat végi {的|de} erősítheti a bizonyosságot: {你会喜欢的|nǐ huì xǐhuan de} „biztosan tetszeni fog".'
      ],
      examples: [
        { zh: '{明天|míng·tiān}{会|huì}{下雨|xià yǔ}。', hu: 'Holnap esni fog.' },
        { zh: '{他|tā}{今天|jīn·tiān}{不|bú}{会|huì}{来|lái}。', hu: 'Ma nem fog eljönni.' },
        { zh: '{晚上|wǎn·shang}{会|huì}{很|hěn}{冷|lěng}。', hu: 'Este hideg lesz.' }
      ]
    },
    {
      title: '{热|rè} · {冷|lěng} · {下雨|xià yǔ}', sub: 'időjárás-szavak',
      pattern: '{天气|tiān·qì} + {很|hěn} + {热|rè} / {冷|lěng} · {下雨|xià yǔ} / {下雪|xià xuě}',
      body: 'Az időjárásról a melléknév-állítmányos mondattal beszélsz: {今天很热|jīntiān hěn rè} „ma meleg van", {外面很冷|wàimiàn hěn lěng} „kint hideg van". A csapadék ige: {下雨|xià yǔ} „esik az eső", {下雪|xià xuě} „havazik". A kínai ilyenkor nem tesz alanyt a mondatba, mint a magyar „esik".',
      tables: [
        { caption: 'Időjárás',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{热|rè}', 'meleg, forró'], ['{冷|lěng}', 'hideg'],
            ['{下雨|xià yǔ}', 'esik az eső'], ['{下雪|xià xuě}', 'havazik'],
            ['{晴天|qíng·tiān}', 'derült idő'], ['{阴天|yīn·tiān}', 'borult idő']
          ] }
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{很|hěn}{热|rè}。', hu: 'Ma meleg van.' },
        { zh: '{外面|wài·miàn}{下雨|xià yǔ}{了|le}。', hu: 'Kint elkezdett esni.' }
      ]
    }
  ],
  phrases: [
    { zh: '{天气|tiān·qì}{怎么样|zěn·me·yàng}？', hu: 'Milyen az idő?' },
    { zh: '{太|tài}{好|hǎo}{了|le}！', hu: 'Nagyszerű!' },
    { zh: '{太|tài}{冷|lěng}{了|le}！', hu: 'De hideg van!' },
    { zh: '{你|nǐ}{身体|shēn·tǐ}{怎么样|zěn·me·yàng}？', hu: 'Hogy van az egészséged?' },
    { zh: '……，{怎么样|zěn·me·yàng}？', hu: '…, mit szólsz?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{天气|tiān·qì}', pinyin: 'tiānqì', hu: 'időjárás' },
        { zh: '{怎么样|zěn·me·yàng}', pinyin: 'zěnmeyàng', hu: 'milyen, hogy' },
        { zh: '{太|tài}', pinyin: 'tài', hu: 'túl, nagyon' },
        { zh: '{热|rè}', pinyin: 'rè', hu: 'meleg' },
        { zh: '{冷|lěng}', pinyin: 'lěng', hu: 'hideg' },
        { zh: '{下雨|xià yǔ}', pinyin: 'xià yǔ', hu: 'esik az eső' },
        { zh: '{小姐|xiǎo·jiě}', pinyin: 'xiǎojiě', hu: 'kisasszony' },
        { zh: '{来|lái}', pinyin: 'lái', hu: 'jönni' },
        { zh: '{身体|shēn·tǐ}', pinyin: 'shēntǐ', hu: 'test; egészség' },
        { zh: '{爱|ài}', pinyin: 'ài', hu: 'szeretni' },
        { zh: '{些|xiē}', pinyin: 'xiē', hu: 'néhány' },
        { zh: '{水果|shuǐ·guǒ}', pinyin: 'shuǐguǒ', hu: 'gyümölcs' },
        { zh: '{水|shuǐ}', pinyin: 'shuǐ', hu: 'víz' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{秋天|qiū·tiān}', pinyin: 'qiūtiān', hu: 'ősz' },
        { zh: '{漂亮|piào·liang}', pinyin: 'piàoliang', hu: 'szép' },
        { zh: '{喜欢|xǐ·huan}', pinyin: 'xǐhuan', hu: 'szeretni, kedvelni' },
        { zh: '{下雪|xià xuě}', pinyin: 'xià xuě', hu: 'havazik' },
        { zh: '{贵|guì}', pinyin: 'guì', hu: 'drága' }
      ] }
  ],
  culture: [
    { title: 'Négy évszak, sok éghajlat', text: 'Peking telén mínusz tíz fok is lehet, nyara forró és párás; tavasszal a Góbiból érkező homokviharok szürkére festik az eget. Közben Kína déli partvidékén szinte sosincs tél, a délnyugati Kunmingot pedig „az örök tavasz városának" nevezik. Pekingben a legszebb évszak az ősz: tiszta, napos, enyhe.' },
    { title: 'Igyál meleg vizet!', text: 'Kínában a hideg vizet sokan egészségtelennek tartják: inkább meleg vizet vagy teát isznak, nyáron is. Ha megfázol, szinte biztosan ezt a tanácsot kapod: {多喝热水|duō hē rè shuǐ} „igyál sok meleg vizet!" — ez annyira közismert, hogy a kínaiak maguk is viccelődnek vele.' }
  ],
  reading: {
    title: '{北京|Běi·jīng}{的|de}{天气|tiān·qì}', titleHu: 'Peking időjárása',
    text: [
      { zh: '{我|wǒ}{很|hěn}{喜欢|xǐ·huan}{北京|Běi·jīng}，{但是|dàn·shì}{北京|Běi·jīng}{的|de}{冬天|dōng·tiān}{太|tài}{冷|lěng}{了|le}。', hu: 'Nagyon szeretem Pekinget, de a pekingi tél túl hideg.' },
      { zh: '{夏天|xià·tiān}{很|hěn}{热|rè}，{常常|cháng·cháng}{下雨|xià yǔ}。', hu: 'A nyár meleg, gyakran esik.' },
      { zh: '{秋天|qiū·tiān}{天气|tiān·qì}{最|zuì}{好|hǎo}，{不|bù}{冷|lěng}{也|yě}{不|bú}{热|rè}。', hu: 'Ősszel a legjobb az idő: se nem hideg, se nem meleg.', par: true },
      { zh: '{今天|jīn·tiān}{是|shì}{十月|shí·yuè}{二十|èr·shí}{号|hào}，{天气|tiān·qì}{很|hěn}{好|hǎo}。', hu: 'Ma október 20. van, szép idő van.' },
      { zh: '{明天|míng·tiān}{会|huì}{下雨|xià yǔ}，{我|wǒ}{不|bù}{想|xiǎng}{出去|chū·qu}。', hu: 'Holnap esni fog, nincs kedvem kimenni.', par: true }
    ],
    words: [ { zh: '{冬天|dōng·tiān}', hu: 'tél' }, { zh: '{夏天|xià·tiān}', hu: 'nyár' }, { zh: '{常常|cháng·cháng}', hu: 'gyakran' }, { zh: '{最|zuì}', hu: 'leg-' }, { zh: '{出去|chū·qu}', hu: 'kimenni' } ],
    questions: [
      { q: 'Mi nem tetszik a szöveg írójának Pekingben?', a: 'a túl hideg tél', wrong: ['a meleg nyár', 'az esős ősz', 'semmi'], why: '{北京的冬天太冷了|Běijīng de dōngtiān tài lěng le}.' },
      { q: 'Milyen a nyár?', a: 'meleg, és gyakran esik', wrong: ['hideg és száraz', 'enyhe, sosem esik', 'havazik'], why: '{夏天很热，常常下雨|xiàtiān hěn rè, chángcháng xià yǔ}.' },
      { q: 'Melyik évszakban a legjobb az idő?', a: 'ősszel', wrong: ['nyáron', 'télen', 'tavasszal'], why: '{秋天天气最好|qiūtiān tiānqì zuì hǎo}.' },
      { q: 'Miért nem akar holnap kimenni?', a: 'mert esni fog', wrong: ['mert túl meleg lesz', 'mert beteg', 'mert dolgoznia kell'], why: '{明天会下雨，我不想出去|míngtiān huì xià yǔ, wǒ bù xiǎng chūqu}.' }
    ]
  },
  quiz: [
    { q: 'Hogyan kérdezed: „Milyen az idő?"', a: '{天气|tiān·qì}{怎么样|zěn·me·yàng}？', wrong: ['{天气|tiān·qì}{怎么|zěn·me}？', '{天气|tiān·qì}{什么|shén·me}？', '{怎么样|zěn·me·yàng}{天气|tiān·qì}{吗|ma}？'], why: '{怎么样|zěnmeyàng} a mondat végén.', point: 1 },
    { q: 'Mit jelent: {我们去吃饭，怎么样|wǒmen qù chī fàn, zěnmeyàng}？', a: 'Menjünk enni, mit szólsz?', wrong: ['Hogyan megyünk enni?', 'Milyen volt az étel?', 'Mit eszünk?'], why: 'Javaslat + {怎么样|zěnmeyàng}: véleményt kér.', point: 1 },
    { q: 'Mi a különbség a {怎么|zěnme} és a {怎么样|zěnmeyàng} között?', a: '{怎么|zěnme} + ige: hogyan csinálni · {怎么样|zěnmeyàng}: milyen', wrong: ['{怎么样|zěnmeyàng} + ige: hogyan csinálni · {怎么|zěnme}: milyen', 'a {怎么样|zěnmeyàng} csak az udvarias, hosszabb alakja', 'a {怎么|zěnme} múlt idő, a {怎么样|zěnmeyàng} jelen'], why: '{怎么写|zěnme xiě}？ „hogyan írjuk" · {天气怎么样|tiānqì zěnmeyàng}？ „milyen az idő".', point: 1 },
    { q: '„De hideg van!"', a: '{太|tài}{冷|lěng}{了|le}！', wrong: ['{太|tài}{冷|lěng}！', '{冷|lěng}{太|tài}{了|le}！', '{很|hěn}{太|tài}{冷|lěng}！'], why: '{太|tài} + melléknév + {了|le}.', point: 2 },
    { q: 'Mit jelent: {太好了|tài hǎo le}！', a: 'Nagyszerű!', wrong: ['Túl jó, nem kérem.', 'Nem jó.', 'Jó volt.'], why: 'Pozitív melléknévvel a {太|tài}…{了|le} lelkesedés.', point: 2 },
    { q: 'Mit jelent: {今天不太热|jīntiān bú tài rè}。', a: 'Ma nincs túl meleg.', wrong: ['Ma nagyon meleg van.', 'Ma hideg van.', 'Ma nem lesz meleg.'], why: '{不太|bú tài} + melléknév: tompított tagadás.', point: 2 },
    { q: '„Egészséges vagyok." (szó szerint: én – test – jó)', a: '{我|wǒ}{身体|shēn·tǐ}{很|hěn}{好|hǎo}。', wrong: ['{我|wǒ}{是|shì}{身体|shēn·tǐ}{好|hǎo}。', '{身体|shēn·tǐ}{我|wǒ}{好|hǎo}{很|hěn}。', '{我|wǒ}{很|hěn}{身体|shēn·tǐ}{好|hǎo}。'], why: 'Téma ({我|wǒ}) + kis mondat ({身体很好|shēntǐ hěn hǎo}).', point: 3 },
    { q: 'Mit jelent: {北京天气很冷|Běijīng tiānqì hěn lěng}。', a: 'Pekingben hideg van.', wrong: ['Peking hideg város.', 'Pekingbe hideg idő jön.', 'Pekingben milyen az idő?'], why: 'Téma + megjegyzés: „Peking — az idő hideg".', point: 3 },
    { q: '„Holnap esni fog."', a: '{明天|míng·tiān}{会|huì}{下雨|xià yǔ}。', wrong: ['{明天|míng·tiān}{下雨|xià yǔ}{会|huì}。', '{明天|míng·tiān}{是|shì}{下雨|xià yǔ}。', '{明天|míng·tiān}{能|néng}{下雨|xià yǔ}。'], why: 'Előrejelzés: {会|huì} + ige.', point: 4 },
    { q: 'Melyik mondatban jelent a {会|huì} előrejelzést?', a: '{明天|míng·tiān}{会|huì}{很|hěn}{冷|lěng}。', wrong: ['{我|wǒ}{会|huì}{说|shuō}{汉语|Hàn·yǔ}。', '{她|tā}{会|huì}{做|zuò}{中国菜|Zhōng·guó·cài}。', '{你|nǐ}{会|huì}{写|xiě}{汉字|Hàn·zì}{吗|ma}？'], why: 'A többiben a {会|huì} megtanult tudást jelent.', point: 4 },
    { q: 'Mit jelent: {下雨|xià yǔ}?', a: 'esik az eső', wrong: ['esernyő', 'havazik', 'felhős'], why: '{下|xià} „le" + {雨|yǔ} „eső".', point: 5 },
    { q: 'Melyik a „hideg"?', a: '{冷|lěng}', wrong: ['{热|rè}', '{太|tài}', '{水|shuǐ}'], why: '{冷|lěng} hideg ↔ {热|rè} meleg.', point: 5 },
    { q: 'Mit jelent a {身体|shēntǐ}?', a: 'test; egészség', wrong: ['időjárás', 'gyümölcs', 'család'], why: '{你身体怎么样|nǐ shēntǐ zěnmeyàng}？ „Hogy van az egészséged?"', point: 3 },
    { q: 'Mit jelent a {水果|shuǐguǒ}?', a: 'gyümölcs', wrong: ['víz', 'gyümölcslé', 'zöldség'], why: '{水|shuǐ} „víz" + {果|guǒ} „termés": lédús termés.' },
    { q: 'Melyik mondat hibás?', a: '{今天|jīn·tiān}{太|tài}{热|rè}。', wrong: ['{今天|jīn·tiān}{太|tài}{热|rè}{了|le}。', '{今天|jīn·tiān}{很|hěn}{热|rè}。', '{今天|jīn·tiān}{不|bú}{太|tài}{热|rè}。'], why: 'Állításban a {太|tài} mellé {了|le} kell.', point: 2 },
    { q: '{我们星期天去，怎么样|wǒmen xīngqītiān qù, zěnmeyàng}？ — elfogadó válasz:', a: '{好|hǎo}{啊|a}！', wrong: ['{怎么样|zěn·me·yàng}！', '{不|bù}{会|huì}。', '{太|tài}{冷|lěng}{了|le}{吗|ma}？'], why: 'Javaslatra: {好|hǎo} / {好啊|hǎo a}.', point: 1 }
  ]
},

/* ════════════════════════════════════════════════════
   13. LECKE — 在…呢, 喂, 给…打电话, 吧, 喜欢
   ════════════════════════════════════════════════════ */
{
  id: 'l13', no: 13, kicker: 'HSK 1 · 13. lecke',
  title: 'Mit csinálsz éppen? — telefonon',
  lead: 'Telefonon beszélsz: felveszed (喂？), elmondod, mit csinálsz éppen (我在看电视呢), megkérdezed, mit szeret a másik, és javasolsz valamit (吧).',
  cando: [
    'Elmondod, mit csinálsz éppen: 在 + ige (+ 呢).',
    'Telefonon köszönsz (喂), és elmondod, kit hívsz fel (给…打电话).',
    'Javasolsz és feltételezel a 吧 szócskával.',
    'Elmondod, mit szeretsz csinálni (我喜欢看电影).'
  ],
  intro: [
    'A kínai igének nincs folyamatos alakja („olvasok" vs. „éppen olvasok"), de van egy egyszerű szerkezet, amely ezt kifejezi: a {在|zài} az ige előtt, és gyakran egy {呢|ne} a mondat végén. {他在看电视呢|tā zài kàn diànshì ne} „éppen tévét néz".',
    'Telefonáláskor egy különleges szó jön elő: a {喂|wéi}, amely csak a telefonba mondott „halló". Mellé a {吧|ba} szócskát is megtanulod, amely a javaslatot és a feltevést kedvesebbé, puhábbá teszi.'
  ],
  dialogue: {
    title: 'Egy telefonhívás',
    scene: 'Szombat délelőtt. David felhívja Wang Minget.',
    lines: [
      { who: 'Wang Ming', zh: '{喂|wéi}？', hu: 'Halló?' },
      { who: 'David', zh: '{喂|wéi}，{王明|Wáng Míng}，{我|wǒ}{是|shì}{大卫|Dà·wèi}。{你|nǐ}{在|zài}{做|zuò}{什么|shén·me}{呢|ne}？', hu: 'Halló, Wang Ming, David vagyok. Mit csinálsz éppen?' },
      { who: 'Wang Ming', zh: '{我|wǒ}{在|zài}{看|kàn}{电视|diàn·shì}{呢|ne}。{你|nǐ}{呢|ne}？', hu: 'Éppen tévét nézek. És te?' },
      { who: 'David', zh: '{我|wǒ}{在|zài}{学习|xué·xí}{汉语|Hàn·yǔ}。{安娜|Ān·nà}{在|zài}{你|nǐ}{那儿|nàr}{吗|ma}？', hu: 'Kínait tanulok. Anna ott van nálad?' },
      { who: 'Wang Ming', zh: '{在|zài}，{她|tā}{在|zài}{跟|gēn}{我|wǒ}{妈妈|mā·ma}{学|xué}{做|zuò}{中国菜|Zhōng·guó·cài}{呢|ne}。', hu: 'Itt van, éppen anyukámtól tanul kínai ételt főzni.' },
      { who: 'David', zh: '{太|tài}{好|hǎo}{了|le}！{下午|xià·wǔ}{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{看|kàn}{电影|diàn·yǐng}{吧|ba}？', hu: 'Nagyszerű! Délután menjünk el együtt moziba, jó?' },
      { who: 'Wang Ming', zh: '{好|hǎo}{啊|a}！{安娜|Ān·nà}{也|yě}{喜欢|xǐ·huan}{看|kàn}{电影|diàn·yǐng}。{三|sān}{点|diǎn}{我|wǒ}{给|gěi}{你|nǐ}{打|dǎ}{电话|diàn·huà}。', hu: 'Jó! Anna is szeret moziba járni. Háromkor felhívlak.' }
    ],
    notes: [
      'A {喂|wéi} csak telefonon „halló"; szótárban <i>wèi</i> is áll, de a telefonba szinte mindig emelkedő dallammal mondják.',
      'A {我是大卫|wǒ shì Dàwèi} telefonon a „David vagyok" bemutatkozás — itt a {是|shì} kell.',
      'A {跟|gēn}…{学|xué} „valakitől tanul": a {跟|gēn} „-val/-vel" elöljárószó.'
    ]
  },
  points: [
    {
      title: '{在|zài} + ige (+ {呢|ne})', sub: 'éppen történő cselekvés',
      pattern: 'A + {在|zài} + ige (+ tárgy) + {呢|ne}',
      body: 'Ha egy cselekvés <b>éppen most folyik</b>, a {在|zài} az ige elé kerül, és a mondat végére gyakran {呢|ne} jön: {我在看电视呢|wǒ zài kàn diànshì ne} „éppen tévét nézek", {她在学做菜呢|tā zài xué zuò cài ne} „éppen főzni tanul". A {在|zài} és a {呢|ne} külön-külön is elég: {我在看电视|wǒ zài kàn diànshì} / {我看电视呢|wǒ kàn diànshì ne}.',
      more: [
        'Kérdés: {你在做什么呢|nǐ zài zuò shénme ne}？ „Mit csinálsz éppen?" Tagadva {没(在)|méi (zài)}: {我没在看电视|wǒ méi zài kàn diànshì} „nem tévét nézek (most)".',
        'Ez ugyanaz a {在|zài}, mint a 9. leckében („valahol van"): itt az időben helyezi el a cselekvést, „benne van" a cselekvésben. Ha hely is van, a hely veszi át: {他在医院工作呢|tā zài yīyuàn gōngzuò ne} „éppen a kórházban dolgozik".'
      ],
      examples: [
        { zh: '{我|wǒ}{在|zài}{看|kàn}{电视|diàn·shì}{呢|ne}。', hu: 'Éppen tévét nézek.' },
        { zh: '{你|nǐ}{在|zài}{做|zuò}{什么|shén·me}{呢|ne}？', hu: 'Mit csinálsz éppen?' },
        { zh: '{他|tā}{在|zài}{睡觉|shuì·jiào}。', hu: 'Éppen alszik.' },
        { zh: '{妈妈|mā·ma}{做|zuò}{饭|fàn}{呢|ne}。', hu: 'Anya éppen főz.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{看|kàn}{在|zài}{电视|diàn·shì}。', good: '{我|wǒ}{在|zài}{看|kàn}{电视|diàn·shì}。', why: 'A {在|zài} az ige előtt áll.' },
        { bad: '{我|wǒ}{不|bú}{在|zài}{看|kàn}{电视|diàn·shì}。', good: '{我|wǒ}{没|méi}{在|zài}{看|kàn}{电视|diàn·shì}。', why: 'A folyamatos cselekvést a {没|méi} tagadja.' }
      ]
    },
    {
      title: '{喂|wéi}', sub: '„halló" — telefonon',
      pattern: '{喂|wéi}？· {喂|wéi}，{我|wǒ}{是|shì}…',
      body: 'A {喂|wéi} a telefonos „halló": ezzel veszed fel, és ezzel kezded, ha te hívsz. Utána bemutatkozol ({我是安娜|wǒ shì Ānnà} „Anna vagyok"), vagy megkérdezed, kit keresel: {喂，王老师在吗|wéi, Wáng lǎoshī zài ma}？ „Halló, Wang tanár úr ott van?"',
      more: [
        'Személyesen, utcán a {喂|wèi} (4. tónussal) „hé!" figyelemfelkeltő, és udvariatlannak hathat. Ismeretlent inkább {你好|nǐ hǎo}-val vagy {请问|qǐngwèn}-nel szólíts meg.'
      ],
      examples: [
        { zh: '{喂|wéi}，{你好|nǐ hǎo}！', hu: 'Halló, jó napot!' },
        { zh: '{喂|wéi}，{请问|qǐng·wèn}{张|Zhāng}{老师|lǎo·shī}{在|zài}{吗|ma}？', hu: 'Halló, Zhang tanárnő ott van?' }
      ]
    },
    {
      title: '{给|gěi}…{打电话|dǎ diànhuà}', sub: 'valakit felhívni',
      pattern: 'A + {给|gěi} + B + {打|dǎ}{电话|diàn·huà}',
      body: 'A „felhív valakit" kínaiul: „valakinek telefont üt" — {给|gěi} „-nak/-nek" + személy + {打电话|dǎ diànhuà}: {我给你打电话|wǒ gěi nǐ dǎ diànhuà} „felhívlak". A {给|gěi} itt elöljárószó, és mint minden ilyen bővítmény, az ige <b>előtt</b> áll.',
      more: [
        'A {给|gěi} önálló igeként „adni": {给我一本书|gěi wǒ yì běn shū} „adj nekem egy könyvet".',
        'Telefonszámot számjegyenként olvasnak, és az {一|yī}-t <i>yāo</i>-nak mondják: 138… = {一三八|yāo sān bā}…'
      ],
      examples: [
        { zh: '{我|wǒ}{给|gěi}{你|nǐ}{打|dǎ}{电话|diàn·huà}。', hu: 'Felhívlak.' },
        { zh: '{晚上|wǎn·shang}{我|wǒ}{给|gěi}{妈妈|mā·ma}{打|dǎ}{电话|diàn·huà}。', hu: 'Este felhívom anyát.' },
        { zh: '{你|nǐ}{的|de}{电话|diàn·huà}{是|shì}{多少|duō·shao}？', hu: 'Mi a telefonszámod?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{打|dǎ}{电话|diàn·huà}{给|gěi}{你|nǐ}。', good: '{我|wǒ}{给|gěi}{你|nǐ}{打|dǎ}{电话|diàn·huà}。', why: 'A {给|gěi} + személy az ige elé kerül (a fordított sorrend beszédben előfordul, de kezdőnek ez a biztos).' }
      ]
    },
    {
      title: '{吧|ba}', sub: 'javaslat és feltevés',
      pattern: 'javaslat + {吧|ba}！ · feltevés + {吧|ba}？',
      body: 'A mondat végi {吧|ba} két dolgot csinál. <b>Javaslatot</b> tesz kedvesebbé: {我们去看电影吧|wǒmen qù kàn diànyǐng ba} „menjünk moziba!" (nem parancs, hanem „mi lenne, ha…"). <b>Feltevést</b> erősíttet meg: {你是安娜吧|nǐ shì Ānnà ba}？ „Te Anna vagy, ugye?"',
      more: [
        'A {吗|ma}-s kérdés semleges („Anna vagy?"), a {吧|ba}-s kérdésnél már sejted a választ („Anna vagy, ugye?").',
        'A {吧|ba} semleges tónusú, röviden ejted.'
      ],
      examples: [
        { zh: '{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{吧|ba}！', hu: 'Menjünk együtt!' },
        { zh: '{你|nǐ}{是|shì}{王明|Wáng Míng}{的|de}{朋友|péng·you}{吧|ba}？', hu: 'Te Wang Ming barátja vagy, ugye?' },
        { zh: '{喝|hē}{点儿|diǎnr}{水|shuǐ}{吧|ba}。', hu: 'Igyál egy kis vizet!' }
      ]
    },
    {
      title: '{喜欢|xǐhuan}', sub: 'szeretni, kedvelni',
      pattern: 'A + {喜欢|xǐ·huan} + főnév / ige',
      body: 'A {喜欢|xǐhuan} „szeretni, kedvelni" után főnév és ige is állhat: {我喜欢猫|wǒ xǐhuan māo} „szeretem a macskákat", {我喜欢看电影|wǒ xǐhuan kàn diànyǐng} „szeretek filmet nézni". Fokozva {很喜欢|hěn xǐhuan} „nagyon szeret", tagadva {不喜欢|bù xǐhuan}.',
      more: [
        'A {爱|ài} (12. lecke) erősebb: emberekre „szeretni (szerelemmel)", dolgokra „imádni". A mindennapi „szeretem" a {喜欢|xǐhuan}.',
        'Az {也|yě} „is" az ige elé kerül, nem a szó mellé, mint a magyarban: {她也喜欢|tā yě xǐhuan} „ő is szereti".'
      ],
      examples: [
        { zh: '{我|wǒ}{很|hěn}{喜欢|xǐ·huan}{中国菜|Zhōng·guó·cài}。', hu: 'Nagyon szeretem a kínai ételeket.' },
        { zh: '{她|tā}{喜欢|xǐ·huan}{看|kàn}{书|shū}。', hu: 'Szeret olvasni.' },
        { zh: '{安娜|Ān·nà}{也|yě}{喜欢|xǐ·huan}{看|kàn}{电影|diàn·yǐng}。', hu: 'Anna is szeret moziba járni.' }
      ],
      mistakes: [
        { bad: '{也|yě}{安娜|Ān·nà}{喜欢|xǐ·huan}。', good: '{安娜|Ān·nà}{也|yě}{喜欢|xǐ·huan}。', why: 'Az {也|yě} az alany után, az ige előtt áll.' }
      ]
    }
  ],
  phrases: [
    { zh: '{喂|wéi}？', hu: 'Halló?' },
    { zh: '{你|nǐ}{在|zài}{做|zuò}{什么|shén·me}{呢|ne}？', hu: 'Mit csinálsz éppen?' },
    { zh: '{我|wǒ}{给|gěi}{你|nǐ}{打|dǎ}{电话|diàn·huà}。', hu: 'Felhívlak.' },
    { zh: '{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{吧|ba}！', hu: 'Menjünk együtt!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{喂|wéi}', pinyin: 'wéi', hu: 'halló (telefonon)' },
        { zh: '{也|yě}', pinyin: 'yě', hu: 'is' },
        { zh: '{学习|xué·xí}', pinyin: 'xuéxí', hu: 'tanulni' },
        { zh: '{上午|shàng·wǔ}', pinyin: 'shàngwǔ', hu: 'délelőtt' },
        { zh: '{睡觉|shuì·jiào}', pinyin: 'shuìjiào', hu: 'aludni' },
        { zh: '{电视|diàn·shì}', pinyin: 'diànshì', hu: 'televízió' },
        { zh: '{喜欢|xǐ·huan}', pinyin: 'xǐhuan', hu: 'szeretni, kedvelni' },
        { zh: '{给|gěi}', pinyin: 'gěi', hu: 'adni; -nak/-nek' },
        { zh: '{打电话|dǎ diàn·huà}', pinyin: 'dǎ diànhuà', hu: 'telefonálni' },
        { zh: '{吧|ba}', pinyin: 'ba', hu: 'javasló / feltevő szócska' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{一起|yì·qǐ}', pinyin: 'yìqǐ', hu: 'együtt' },
        { zh: '{跟|gēn}', pinyin: 'gēn', hu: '-val/-vel' },
        { zh: '{电话|diàn·huà}', pinyin: 'diànhuà', hu: 'telefon(szám)' }
      ] }
  ],
  culture: [
    { title: 'Telefonszámok és szerencse', text: 'A {八|bā} „nyolc" hangzása a {发|fā} „meggazdagodni" szóra emlékeztet, ezért a sok nyolcast tartalmazó telefonszámért és rendszámért sokat fizetnek. A {四|sì} „négy" kerülendő (a „halál" szóra hasonlít). A pekingi olimpia is 2008. augusztus 8-án, este 8 óra 8 perckor kezdődött.' },
    { title: 'Üzenetek hangban', text: 'A kínai fiatalok a hívás helyett gyakran hangüzenetet küldenek a csevegőalkalmazásban. Ennek oka részben a gépelés: kínaiul írni lassabb, mint beszélni. Ha kínai ismerősöd van, készülj rá, hogy sok hangüzenetet kapsz — ez remek hallásgyakorlat!' }
  ],
  reading: {
    title: '{星期六|xīng·qī·liù}{上午|shàng·wǔ}', titleHu: 'Szombat délelőtt',
    text: [
      { zh: '{今天|jīn·tiān}{星期六|xīng·qī·liù}，{我们|wǒ·men}{家|jiā}{的|de}{人|rén}{都|dōu}{在|zài}{家|jiā}。', hu: 'Ma szombat van, a családunk minden tagja otthon van.' },
      { zh: '{爸爸|bà·ba}{在|zài}{看|kàn}{电视|diàn·shì}，{妈妈|mā·ma}{在|zài}{做|zuò}{饭|fàn}。', hu: 'Apa tévét néz, anya főz.' },
      { zh: '{我|wǒ}{在|zài}{学习|xué·xí}{汉语|Hàn·yǔ}，{小猫|xiǎo māo}{在|zài}{睡觉|shuì·jiào}{呢|ne}。', hu: 'Én kínait tanulok, a cica alszik.', par: true },
      { zh: '{十|shí}{点|diǎn}，{我|wǒ}{的|de}{朋友|péng·you}{给|gěi}{我|wǒ}{打|dǎ}{电话|diàn·huà}：“{下午|xià·wǔ}{我们|wǒ·men}{去|qù}{商店|shāng·diàn}{吧|ba}！”', hu: 'Tízkor felhív a barátom: „Délután menjünk el a boltba!"' },
      { zh: '{我|wǒ}{很|hěn}{喜欢|xǐ·huan}{买|mǎi}{东西|dōng·xi}，{我|wǒ}{说|shuō}：“{好|hǎo}{啊|a}！”', hu: 'Nagyon szeretek vásárolni, azt mondom: „Jó!"', par: true }
    ],
    words: [ { zh: '{都|dōu}', hu: 'mind, mindnyájan' }, { zh: '{东西|dōng·xi}', hu: 'dolog, holmi' } ],
    questions: [
      { q: 'Mit csinál az apa?', a: 'tévét néz', wrong: ['főz', 'alszik', 'kínait tanul'], why: '{爸爸在看电视|bàba zài kàn diànshì}.' },
      { q: 'Ki alszik?', a: 'a cica', wrong: ['az apa', 'az anya', 'a szöveg írója'], why: '{小猫在睡觉呢|xiǎo māo zài shuìjiào ne}.' },
      { q: 'Mit javasol a barát?', a: 'hogy délután menjenek boltba', wrong: ['hogy menjenek moziba', 'hogy tanuljanak együtt', 'hogy ebédeljenek együtt'], why: '{下午我们去商店吧|xiàwǔ wǒmen qù shāngdiàn ba}！' },
      { q: 'Mit válaszol a szöveg írója?', a: 'elfogadja: szeret vásárolni', wrong: ['nemet mond, tanulnia kell', 'nem válaszol', 'azt mondja, majd visszahívja'], why: '{我很喜欢买东西，我说：“好啊！”|wǒ hěn xǐhuan mǎi dōngxi, wǒ shuō: "hǎo a!"}' }
    ]
  },
  quiz: [
    { q: '„Éppen tévét nézek."', a: '{我|wǒ}{在|zài}{看|kàn}{电视|diàn·shì}{呢|ne}。', wrong: ['{我|wǒ}{看|kàn}{在|zài}{电视|diàn·shì}{呢|ne}。', '{我|wǒ}{是|shì}{看|kàn}{电视|diàn·shì}。', '{在|zài}{我|wǒ}{看|kàn}{电视|diàn·shì}{吗|ma}。'], why: '{在|zài} + ige (+ {呢|ne}).', point: 1 },
    { q: 'Hogyan kérdezed: „Mit csinálsz éppen?"', a: '{你|nǐ}{在|zài}{做|zuò}{什么|shén·me}{呢|ne}？', wrong: ['{你|nǐ}{做|zuò}{在|zài}{什么|shén·me}？', '{你|nǐ}{在|zài}{哪儿|nǎr}{呢|ne}？', '{你|nǐ}{会|huì}{做|zuò}{什么|shén·me}？'], why: '{在|zài} + {做什么|zuò shénme} + {呢|ne}.', point: 1 },
    { q: 'Hogyan tagadod: {我在看电视|wǒ zài kàn diànshì}?', a: '{我|wǒ}{没|méi}{在|zài}{看|kàn}{电视|diàn·shì}。', wrong: ['{我|wǒ}{不|bú}{在|zài}{看|kàn}{电视|diàn·shì}。', '{我|wǒ}{在|zài}{不|bú}{看|kàn}{电视|diàn·shì}。', '{我|wǒ}{在|zài}{没|méi}{看|kàn}{电视|diàn·shì}。'], why: 'A folyamatos cselekvés tagadása {没(在)|méi (zài)}.', point: 1 },
    { q: 'Mit mondasz, amikor felveszed a telefont?', a: '{喂|wéi}？', wrong: ['{吧|ba}？', '{呢|ne}？', '{啊|a}？'], why: 'A telefonos „halló" {喂|wéi}.', point: 2 },
    { q: '„Felhívlak."', a: '{我|wǒ}{给|gěi}{你|nǐ}{打|dǎ}{电话|diàn·huà}。', wrong: ['{我|wǒ}{打|dǎ}{你|nǐ}{电话|diàn·huà}{给|gěi}。', '{我|wǒ}{电话|diàn·huà}{你|nǐ}。', '{给|gěi}{我|wǒ}{打|dǎ}{你|nǐ}{电话|diàn·huà}。'], why: '{给|gěi} + személy + {打电话|dǎ diànhuà}.', point: 3 },
    { q: 'Hogyan olvasnak egy telefonszámban 1-est?', a: 'yāo', wrong: ['yī', 'yí', 'yì'], why: 'Telefonszámban az {一|yī} = <i>yāo</i>, hogy ne keverjék a {七|qī}-vel.', point: 3 },
    { q: 'Mit jelent: {我们去看电影吧|wǒmen qù kàn diànyǐng ba}！', a: 'Menjünk moziba!', wrong: ['Moziba mentünk.', 'Moziba megyünk?', 'Nem megyünk moziba.'], why: 'Javaslat + {吧|ba}.', point: 4 },
    { q: 'Mit fejez ki a {你是安娜吧|nǐ shì Ānnà ba}？ kérdés?', a: '„Te Anna vagy, ugye?" — sejtett válasz', wrong: ['„Anna vagy?" — teljesen semleges kérdés', '„Legyél Anna!" — parancs', '„Te nem vagy Anna." — tagadás'], why: 'A {吧|ba}-s kérdés megerősítést kér.', point: 4 },
    { q: '„Szeretek filmet nézni."', a: '{我|wǒ}{喜欢|xǐ·huan}{看|kàn}{电影|diàn·yǐng}。', wrong: ['{我|wǒ}{看|kàn}{电影|diàn·yǐng}{喜欢|xǐ·huan}。', '{我|wǒ}{喜欢|xǐ·huan}{电影|diàn·yǐng}{看|kàn}。', '{喜欢|xǐ·huan}{我|wǒ}{看|kàn}{电影|diàn·yǐng}。'], why: '{喜欢|xǐhuan} + ige + tárgy.', point: 5 },
    { q: '„Anna is szereti."', a: '{安娜|Ān·nà}{也|yě}{喜欢|xǐ·huan}。', wrong: ['{也|yě}{安娜|Ān·nà}{喜欢|xǐ·huan}。', '{安娜|Ān·nà}{喜欢|xǐ·huan}{也|yě}。', '{安娜|Ān·nà}{喜欢|xǐ·huan}{吧|ba}{也|yě}。'], why: 'Az {也|yě} az ige előtt áll.', point: 5 },
    { q: 'Mit jelent a {睡觉|shuìjiào}?', a: 'aludni', wrong: ['felkelni', 'pihenni', 'enni'], why: '{他在睡觉|tā zài shuìjiào} „alszik".', point: 1 },
    { q: 'Mit jelent a {电视|diànshì}?', a: 'televízió', wrong: ['telefon', 'számítógép', 'mozi'], why: '{看电视|kàn diànshì} „tévét néz".' },
    { q: 'Mit jelent: {她在跟妈妈学做菜呢|tā zài gēn māma xué zuò cài ne}。', a: 'Éppen anyától tanul főzni.', wrong: ['Anyának főz.', 'Anyával eszik.', 'Anya tanítja meg magát főzni.'], why: '{跟|gēn}…{学|xué} „valakitől tanul" + {在|zài}…{呢|ne} folyamatos.', point: 1 },
    { q: 'Mit jelent a {给|gěi} önálló igeként?', a: 'adni', wrong: ['venni', 'hívni', 'kérni'], why: '{给我一本书|gěi wǒ yì běn shū} „adj nekem egy könyvet".', point: 3 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{看|kàn}{在|zài}{书|shū}{呢|ne}。', wrong: ['{我|wǒ}{在|zài}{看|kàn}{书|shū}{呢|ne}。', '{我|wǒ}{在|zài}{看|kàn}{书|shū}。', '{我|wǒ}{看|kàn}{书|shū}{呢|ne}。'], why: 'A {在|zài} az ige előtt áll, nem utána.', point: 1 },
    { q: 'Mit jelent a {一起|yìqǐ}?', a: 'együtt', wrong: ['egyszer', 'egyedül', 'először'], why: '{我们一起去|wǒmen yìqǐ qù} „együtt megyünk".', point: 4 }
  ]
},

/* ════════════════════════════════════════════════════
   14. LECKE — 了 (befejezett cselekvés), 没有, 都, 后
   ════════════════════════════════════════════════════ */
{
  id: 'l14', no: 14, kicker: 'HSK 1 · 14. lecke',
  title: 'Mit vettél? — ami megtörtént',
  lead: 'Elmondod, mit csináltál (我买了三个苹果), mit nem (我没买), és összefoglalod: mind (都). Megtanulod a 了 legfontosabb jelentését, és azt, mikor marad el.',
  cando: [
    'Befejezett cselekvést mondasz: ige + 了 + mennyiség + tárgy.',
    'Tagadod: 没(有) + ige — 了 nélkül.',
    'Összefoglalsz a 都 szóval: 这些都是我的.',
    'Kifejezed, mi után történik valami: 五分钟后.'
  ],
  intro: [
    'A kínai igének nincs múlt ideje. A {了|le} azt jelzi, hogy egy cselekvés <b>megtörtént, lezárult</b> — függetlenül attól, hogy múltban, jelenben vagy jövőben. {我买了三个苹果|wǒ mǎile sān ge píngguǒ} „vettem három almát".',
    'Két dologra kell vigyázni: a {了|le} mellé gyakran mennyiség kell a tárgyhoz (különben a mondat „lógva" marad), és a tagadásból <b>eltűnik</b>: „nem vettem" = {我没买|wǒ méi mǎi}, a {了|le} nélkül.'
  ],
  dialogue: {
    title: 'Hazaérkezés a vásárlásból',
    scene: 'Anna hazaér a szállásra, sok szatyorral. A szobatársa, Li Hua kíváncsi.',
    lines: [
      { who: 'Li Hua', zh: '{你|nǐ}{买|mǎi}{了|le}{什么|shén·me}？', hu: 'Mit vettél?' },
      { who: 'Anna', zh: '{我|wǒ}{买|mǎi}{了|le}{一些|yì·xiē}{水果|shuǐ·guǒ}{和|hé}{两|liǎng}{件|jiàn}{衣服|yī·fu}。', hu: 'Vettem egy kis gyümölcsöt és két ruhát.' },
      { who: 'Li Hua', zh: '{这些|zhè·xiē}{衣服|yī·fu}{都|dōu}{是|shì}{你|nǐ}{的|de}{吗|ma}？{太|tài}{漂亮|piào·liang}{了|le}！', hu: 'Ezek a ruhák mind a tieid? Nagyon szépek!' },
      { who: 'Anna', zh: '{不|bú}{是|shì}，{这|zhè}{件|jiàn}{是|shì}{我|wǒ}{妈妈|mā·ma}{的|de}，{我|wǒ}{买|mǎi}{了|le}{一|yí}{件|jiàn}{给|gěi}{她|tā}。', hu: 'Nem, ez itt anyukámé, vettem neki egyet.' },
      { who: 'Li Hua', zh: '{你|nǐ}{买|mǎi}{苹果|píng·guǒ}{了|le}{吗|ma}？', hu: 'Almát vettél?' },
      { who: 'Anna', zh: '{没|méi}{买|mǎi}。{商店|shāng·diàn}{的|de}{苹果|píng·guǒ}{太|tài}{贵|guì}{了|le}。', hu: 'Nem vettem. A boltban túl drága volt az alma.' },
      { who: 'Li Hua', zh: '{没|méi}{关系|guān·xi}，{我|wǒ}{有|yǒu}。{你|nǐ}{先|xiān}{休息|xiū·xi}，{十|shí}{分钟|fēn·zhōng}{后|hòu}{我们|wǒ·men}{吃|chī}{饭|fàn}。', hu: 'Semmi baj, nekem van. Pihenj egy kicsit, tíz perc múlva eszünk.' }
    ],
    notes: [
      'A {一些|yìxiē} „néhány, egy kevés": a {些|xiē} megszámlálhatatlan mennyiség jelölője.',
      'Ruhadarabok mérőszava a {件|jiàn}: {两件衣服|liǎng jiàn yīfu} „két ruha(darab)".',
      'A kérdés {了吗|le ma}-val: {你买苹果了吗|nǐ mǎi píngguǒ le ma}？ A nemleges válasz {没买|méi mǎi} vagy {没有|méiyǒu}.'
    ]
  },
  points: [
    {
      title: 'ige + {了|le}', sub: 'megtörtént, lezárult cselekvés',
      pattern: 'A + ige + {了|le} + mennyiség + tárgy',
      body: 'A közvetlenül az ige után álló {了|le} azt mondja: a cselekvés <b>megtörtént</b>. {我买了三个苹果|wǒ mǎile sān ge píngguǒ} „vettem három almát", {他喝了一杯茶|tā hēle yì bēi chá} „ivott egy csésze teát". Ha a tárgynak van mennyisége (szám + mérőszó, {一些|yìxiē}, {很多|hěn duō}), a {了|le} az ige után áll.',
      more: [
        'Ha a tárgy puszta főnév (mennyiség nélkül), a {了|le} inkább a mondat végére kerül: {我买苹果了|wǒ mǎi píngguǒ le} „almát vettem / vettem almát". A {*我买了苹果|wǒ mǎile píngguǒ} egymagában befejezetlennek hat („vettem almát, és…").',
        'A {了|le} nem múlt idő: {明天吃了饭我们去|míngtiān chīle fàn wǒmen qù} „holnap, miután ettünk, megyünk" — jövőbeli, de lezárt cselekvés.',
        'Szokásos, ismétlődő múltbeli cselekvéshez nem kell {了|le}: {以前我常常去|yǐqián wǒ chángcháng qù} „régen gyakran jártam oda".'
      ],
      examples: [
        { zh: '{我|wǒ}{买|mǎi}{了|le}{三|sān}{个|ge}{苹果|píng·guǒ}。', hu: 'Vettem három almát.' },
        { zh: '{她|tā}{买|mǎi}{了|le}{不少|bù shǎo}{衣服|yī·fu}。', hu: 'Elég sok ruhát vett.' },
        { zh: '{你|nǐ}{买|mǎi}{了|le}{什么|shén·me}？', hu: 'Mit vettél?' },
        { zh: '{我|wǒ}{喝|hē}{了|le}{一|yì}{杯|bēi}{茶|chá}。', hu: 'Megittam egy csésze teát.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{昨天|zuó·tiān}{买|mǎi}{三|sān}{个|ge}{苹果|píng·guǒ}。（lezárt vásárlás）', good: '{我|wǒ}{昨天|zuó·tiān}{买|mǎi}{了|le}{三|sān}{个|ge}{苹果|píng·guǒ}。', why: 'A megtörtént, lezárt cselekvés mellé {了|le} kell.' }
      ]
    },
    {
      title: '{没(有)|méi(yǒu)} + ige', sub: 'nem történt meg — {了|le} nélkül',
      pattern: 'A + {没|méi}（{有|yǒu}）+ ige (+ tárgy)',
      body: 'Ha egy cselekvés <b>nem történt meg</b>, a {没|méi} vagy {没有|méiyǒu} kerül az ige elé, és a {了|le} <b>eltűnik</b>: {我没买苹果|wǒ méi mǎi píngguǒ} „nem vettem almát", {他没来|tā méi lái} „nem jött el". A {不|bù} itt nem jó: az a szándékot, szokást tagadja ({我不买|wǒ bù mǎi} „nem veszem meg, nem akarom").',
      more: [
        'Kérdés: {你买苹果了吗|nǐ mǎi píngguǒ le ma}？ vagy {你买苹果了没有|nǐ mǎi píngguǒ le méiyǒu}？ Válasz: {买了|mǎi le} „igen, vettem" / {没买|méi mǎi} / {没有|méiyǒu} „nem".'
      ],
      tables: [
        { caption: '{了|le} és tagadása',
          head: ['', 'Példa', 'Jelentés'],
          rows: [
            ['megtörtént', '{我|wǒ}{买|mǎi}{了|le}{一|yí}{件|jiàn}{衣服|yī·fu}。', 'Vettem egy ruhát.'],
            ['nem történt meg', '{我|wǒ}{没|méi}{买|mǎi}{衣服|yī·fu}。', 'Nem vettem ruhát.'],
            ['nem akarja', '{我|wǒ}{不|bù}{买|mǎi}{衣服|yī·fu}。', 'Nem veszek ruhát.'],
            ['kérdés', '{你|nǐ}{买|mǎi}{衣服|yī·fu}{了|le}{吗|ma}？', 'Vettél ruhát?']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{没|méi}{买|mǎi}{苹果|píng·guǒ}。', hu: 'Nem vettem almát.' },
        { zh: '{他|tā}{今天|jīn·tiān}{没|méi}{来|lái}。', hu: 'Ma nem jött el.' },
        { zh: '{你|nǐ}{吃|chī}{饭|fàn}{了|le}{吗|ma}？—{没有|méi·yǒu}。', hu: 'Ettél már? — Nem.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{没|méi}{买|mǎi}{了|le}{苹果|píng·guǒ}。', good: '{我|wǒ}{没|méi}{买|mǎi}{苹果|píng·guǒ}。', why: 'A {没|méi} mellől a {了|le} elmarad.' },
        { bad: '{昨天|zuó·tiān}{我|wǒ}{不|bú}{去|qù}{学校|xué·xiào}。（= nem mentem）', good: '{昨天|zuó·tiān}{我|wǒ}{没|méi}{去|qù}{学校|xué·xiào}。', why: 'Meg nem történt múltbeli cselekvést a {没|méi} tagad.' }
      ]
    },
    {
      title: '{都|dōu}', sub: '„mind" — az ige előtt',
      pattern: 'A (többes) + {都|dōu} + ige / melléknév',
      body: 'A {都|dōu} „mind, mindnyájan" egy előtte álló többes számú dologra vonatkozik, és <b>az ige vagy a melléknév előtt</b> áll: {这些衣服都是我的|zhèxiē yīfu dōu shì wǒ de} „ezek a ruhák mind az enyémek", {我们都喜欢|wǒmen dōu xǐhuan} „mindannyian szeretjük". A magyar „mind" helye szabadabb; a kínai {都|dōu}-é kötött.',
      more: [
        'Az {也|yě} „is" és a {都|dōu} együtt: {我们也都去|wǒmen yě dōu qù} „mi is mindannyian megyünk" — az {也|yě} áll elöl.',
        'Tagadással: {都不|dōu bù} „egyik sem" ({我们都不去|wǒmen dōu bú qù} „egyikünk sem megy"), {不都|bù dōu} „nem mindegyik".'
      ],
      examples: [
        { zh: '{这些|zhè·xiē}{衣服|yī·fu}{都|dōu}{很|hěn}{漂亮|piào·liang}。', hu: 'Ezek a ruhák mind szépek.' },
        { zh: '{我们|wǒ·men}{都|dōu}{是|shì}{学生|xué·sheng}。', hu: 'Mindannyian diákok vagyunk.' },
        { zh: '{他们|tā·men}{都|dōu}{不|bú}{在|zài}{家|jiā}。', hu: 'Egyikük sincs otthon.' }
      ],
      mistakes: [
        { bad: '{都|dōu}{我们|wǒ·men}{是|shì}{学生|xué·sheng}。', good: '{我们|wǒ·men}{都|dōu}{是|shì}{学生|xué·sheng}。', why: 'A {都|dōu} az alany után, az ige előtt áll.' }
      ]
    },
    {
      title: '…{后|hòu}', sub: 'valami után, valamennyi idő múlva',
      pattern: 'időtartam / esemény + {后|hòu}',
      body: 'A {后|hòu} „után" a 11. leckében tanult {前|qián} „előtt" párja, és ugyanúgy a kifejezés <b>végére</b> kerül: {十分钟后|shí fēnzhōng hòu} „tíz perc múlva", {吃饭后|chī fàn hòu} „evés után". A mondatban az ige előtt áll, mint minden időhatározó.',
      more: [
        'Az {分钟|fēnzhōng} „perc" mint időtartam (tíz percig, tíz perc múlva); a {分|fēn} az óra perce (8:10). Hasonlóan: {小时|xiǎoshí} „óra (időtartam)" ↔ {点|diǎn} „óra (időpont)".',
        'Hosszabb alakja: {以后|yǐhòu} — {下课以后|xià kè yǐhòu} „óra után".'
      ],
      examples: [
        { zh: '{十|shí}{分钟|fēn·zhōng}{后|hòu}{我们|wǒ·men}{吃|chī}{饭|fàn}。', hu: 'Tíz perc múlva eszünk.' },
        { zh: '{吃|chī}{饭|fàn}{后|hòu}{我|wǒ}{去|qù}{商店|shāng·diàn}。', hu: 'Evés után boltba megyek.' }
      ]
    },
    {
      title: '{这些|zhèxiē} · {那些|nàxiē}', sub: 'ezek, azok',
      pattern: '{这些|zhè·xiē} / {那些|nà·xiē} + főnév',
      body: 'A {些|xiē} „néhány" a {这|zhè} / {那|nà} után többes számot ad: {这些衣服|zhèxiē yīfu} „ezek a ruhák", {那些人|nàxiē rén} „azok az emberek". Itt nem kell külön mérőszó. Az {一些|yìxiē} „néhány, egy kevés": {一些水果|yìxiē shuǐguǒ}.',
      examples: [
        { zh: '{这些|zhè·xiē}{苹果|píng·guǒ}{很|hěn}{好吃|hǎo·chī}。', hu: 'Ezek az almák finomak.' },
        { zh: '{我|wǒ}{买|mǎi}{了|le}{一些|yì·xiē}{东西|dōng·xi}。', hu: 'Vettem egy-két dolgot.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{买|mǎi}{了|le}{什么|shén·me}？', hu: 'Mit vettél?' },
    { zh: '{你|nǐ}{吃|chī}{饭|fàn}{了|le}{吗|ma}？', hu: 'Ettél már?' },
    { zh: '{没有|méi·yǒu}。', hu: 'Még nem. (Nem.)' },
    { zh: '{太|tài}{漂亮|piào·liang}{了|le}！', hu: 'Nagyon szép!' },
    { zh: '{十|shí}{分钟|fēn·zhōng}{后|hòu}{见|jiàn}！', hu: 'Tíz perc múlva találkozunk!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{东西|dōng·xi}', pinyin: 'dōngxi', hu: 'dolog, holmi' },
        { zh: '{苹果|píng·guǒ}', pinyin: 'píngguǒ', hu: 'alma' },
        { zh: '{看见|kàn·jiàn}', pinyin: 'kànjiàn', hu: 'meglátni' },
        { zh: '{开|kāi}', pinyin: 'kāi', hu: 'nyitni; vezetni (autót)' },
        { zh: '{车|chē}', pinyin: 'chē', hu: 'autó, jármű' },
        { zh: '{回来|huí·lai}', pinyin: 'huílai', hu: 'visszajönni' },
        { zh: '{分钟|fēn·zhōng}', pinyin: 'fēnzhōng', hu: 'perc (időtartam)' },
        { zh: '{后|hòu}', pinyin: 'hòu', hu: 'után' },
        { zh: '{衣服|yī·fu}', pinyin: 'yīfu', hu: 'ruha' },
        { zh: '{漂亮|piào·liang}', pinyin: 'piàoliang', hu: 'szép, csinos' },
        { zh: '{啊|a}', pinyin: 'a', hu: 'felkiáltó szócska' },
        { zh: '{少|shǎo}', pinyin: 'shǎo', hu: 'kevés' },
        { zh: '{这些|zhè·xiē}', pinyin: 'zhèxiē', hu: 'ezek' },
        { zh: '{都|dōu}', pinyin: 'dōu', hu: 'mind' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{件|jiàn}', pinyin: 'jiàn', hu: 'ruhadarab mérőszava' },
        { zh: '{贵|guì}', pinyin: 'guì', hu: 'drága' },
        { zh: '{休息|xiū·xi}', pinyin: 'xiūxi', hu: 'pihenni' },
        { zh: '{一些|yì·xiē}', pinyin: 'yìxiē', hu: 'néhány' }
      ] }
  ],
  culture: [
    { title: '„Ettél már?"', text: 'A {你吃饭了吗|nǐ chī fàn le ma}？ „Ettél már?" sokáig az egyik leggyakoribb kínai köszönés volt, főleg idősebbek között. Nem meghívás és nem kíváncsiság: annyit jelent, „hogy vagy?". Elég rá annyit felelni: {吃了|chī le} „ettem", és visszakérdezni.' },
    { title: 'Vásárlás telefonról', text: 'Kína a világ legnagyobb internetes piaca. Novemberben a „Szinglik napja" ({双十一|Shuāng Shíyī}, november 11.) a világ legnagyobb vásárlási napja. A csomagok sokszor még aznap megérkeznek, és a futár ({快递|kuàidì}) a városi élet mindennapos szereplője.' }
  ],
  reading: {
    title: '{买|mǎi}{东西|dōng·xi}', titleHu: 'Vásárlás',
    text: [
      { zh: '{昨天|zuó·tiān}{下午|xià·wǔ}，{我|wǒ}{和|hé}{妈妈|mā·ma}{去|qù}{商店|shāng·diàn}{买|mǎi}{东西|dōng·xi}。', hu: 'Tegnap délután anyával elmentünk vásárolni.' },
      { zh: '{妈妈|mā·ma}{买|mǎi}{了|le}{很|hěn}{多|duō}{水果|shuǐ·guǒ}，{我|wǒ}{买|mǎi}{了|le}{两|liǎng}{件|jiàn}{衣服|yī·fu}。', hu: 'Anya sok gyümölcsöt vett, én két ruhát.' },
      { zh: '{这|zhè}{两|liǎng}{件|jiàn}{衣服|yī·fu}{都|dōu}{很|hěn}{漂亮|piào·liang}，{也|yě}{不|bú}{贵|guì}。', hu: 'Mindkét ruha nagyon szép, és nem is drága.', par: true },
      { zh: '{我|wǒ}{想|xiǎng}{买|mǎi}{一个|yí ge}{杯子|bēi·zi}，{但是|dàn·shì}{没|méi}{买|mǎi}，{太|tài}{贵|guì}{了|le}。', hu: 'Egy bögrét is akartam venni, de nem vettem, túl drága volt.' },
      { zh: '{五|wǔ}{点|diǎn}{我们|wǒ·men}{回|huí}{家|jiā}，{二十|èr·shí}{分钟|fēn·zhōng}{后|hòu}{爸爸|bà·ba}{也|yě}{回来|huí·lai}{了|le}。', hu: 'Ötkor hazamentünk, húsz perc múlva apa is hazajött.', par: true }
    ],
    words: [ { zh: '{件|jiàn}', hu: 'ruhadarab mérőszava' }, { zh: '{但是|dàn·shì}', hu: 'de' } ],
    questions: [
      { q: 'Mit vett az anya?', a: 'sok gyümölcsöt', wrong: ['két ruhát', 'egy bögrét', 'semmit'], why: '{妈妈买了很多水果|māma mǎile hěn duō shuǐguǒ}.' },
      { q: 'Milyenek a ruhák?', a: 'szépek, és nem drágák', wrong: ['szépek, de drágák', 'csúnyák, de olcsók', 'túl nagyok'], why: '{都很漂亮，也不贵|dōu hěn piàoliang, yě bú guì}.' },
      { q: 'Miért nem vette meg a bögrét?', a: 'mert túl drága volt', wrong: ['mert nem tetszett neki', 'mert már van bögréje', 'mert elfogyott'], why: '{没买，太贵了|méi mǎi, tài guì le}.' },
      { q: 'Mikor jött haza az apa?', a: 'húsz perccel utánuk', wrong: ['ötkor, velük együtt', 'húsz perccel előttük', 'nem jött haza'], why: '{二十分钟后爸爸也回来了|èrshí fēnzhōng hòu bàba yě huílai le}.' }
    ]
  },
  quiz: [
    { q: '„Vettem három almát."', a: '{我|wǒ}{买|mǎi}{了|le}{三|sān}{个|ge}{苹果|píng·guǒ}。', wrong: ['{我|wǒ}{了|le}{买|mǎi}{三|sān}{个|ge}{苹果|píng·guǒ}。', '{我|wǒ}{买|mǎi}{三|sān}{个|ge}{了|le}{苹果|píng·guǒ}。', '{了|le}{我|wǒ}{买|mǎi}{三|sān}{个|ge}{苹果|píng·guǒ}。'], why: 'Ige + {了|le} + mennyiség + tárgy.', point: 1 },
    { q: 'Mit jelöl az ige utáni {了|le}?', a: 'hogy a cselekvés megtörtént, lezárult', wrong: ['a múlt időt, mint a magyar „-t" jel', 'a felszólítást, mint a {吧|ba} szócska', 'a többes számot, mint a {们|men}'], why: 'A {了|le} befejezettséget jelöl, nem igeidőt.', point: 1 },
    { q: 'Hogyan kérdezed: „Mit vettél?"', a: '{你|nǐ}{买|mǎi}{了|le}{什么|shén·me}？', wrong: ['{你|nǐ}{了|le}{买|mǎi}{什么|shén·me}？', '{你|nǐ}{买|mǎi}{什么|shén·me}{了|le}{吗|ma}？', '{什么|shén·me}{你|nǐ}{买|mǎi}{了|le}？'], why: 'Ige + {了|le} + {什么|shénme}.', point: 1 },
    { q: '„Nem vettem almát."', a: '{我|wǒ}{没|méi}{买|mǎi}{苹果|píng·guǒ}。', wrong: ['{我|wǒ}{没|méi}{买|mǎi}{了|le}{苹果|píng·guǒ}。', '{我|wǒ}{不|bù}{买|mǎi}{了|le}{苹果|píng·guǒ}。', '{我|wǒ}{买|mǎi}{没|méi}{苹果|píng·guǒ}。'], why: 'A {没|méi} mellől a {了|le} elmarad.', point: 2 },
    { q: 'Mi a különbség: {我没买|wǒ méi mǎi} / {我不买|wǒ bù mǎi}?', a: '„nem vettem meg" / „nem veszem meg, nem akarom"', wrong: ['„nem veszem meg" / „nem vettem meg"', 'semmi, a kettő pontosan ugyanazt jelenti', '„nincs pénzem" / „nincs kedvem"'], why: 'A {没|méi} meg nem történtet, a {不|bù} szándékot tagad.', point: 2 },
    { q: '{你吃饭了吗|nǐ chī fàn le ma}？ — nemleges válasz:', a: '{没有|méi·yǒu}。', wrong: ['{不|bù}{了|le}。', '{没|méi}{吃|chī}{了|le}。', '{不|bù}{吃|chī}{了|le}{吗|ma}。'], why: 'Rövid nemleges válasz: {没有|méiyǒu} / {没吃|méi chī}.', point: 2 },
    { q: '„Mindannyian diákok vagyunk."', a: '{我们|wǒ·men}{都|dōu}{是|shì}{学生|xué·sheng}。', wrong: ['{都|dōu}{我们|wǒ·men}{是|shì}{学生|xué·sheng}。', '{我们|wǒ·men}{是|shì}{都|dōu}{学生|xué·sheng}。', '{我们|wǒ·men}{是|shì}{学生|xué·sheng}{都|dōu}。'], why: 'A {都|dōu} az ige előtt áll.', point: 3 },
    { q: 'Mit jelent: {他们都不在家|tāmen dōu bú zài jiā}。', a: 'Egyikük sincs otthon.', wrong: ['Nem mindegyikük van otthon.', 'Mindannyian otthon vannak.', 'Nincs otthonuk.'], why: '{都不|dōu bù} „egyik sem".', point: 3 },
    { q: '„tíz perc múlva"', a: '{十|shí}{分钟|fēn·zhōng}{后|hòu}', wrong: ['{后|hòu}{十|shí}{分钟|fēn·zhōng}', '{十|shí}{分|fēn}{后面|hòu·miàn}', '{十|shí}{点|diǎn}{后|hòu}'], why: 'Időtartam + {后|hòu}; a {十点后|shí diǎn hòu} „tíz óra után".', point: 4 },
    { q: 'Mi a különbség a {分|fēn} és a {分钟|fēnzhōng} között?', a: '{分|fēn}: időpont perce (8:10) · {分钟|fēnzhōng}: időtartam', wrong: ['{分钟|fēnzhōng}: időpont perce · {分|fēn}: időtartam', 'a {分钟|fēnzhōng} az óra, a {分|fēn} a perc', 'nincs különbség, csak a hosszuk más'], why: '{八点十分|bā diǎn shí fēn} 8:10 · {十分钟|shí fēnzhōng} tíz perc.', point: 4 },
    { q: '„Ezek az almák finomak."', a: '{这些|zhè·xiē}{苹果|píng·guǒ}{很|hěn}{好吃|hǎo·chī}。', wrong: ['{这|zhè}{苹果|píng·guǒ}{些|xiē}{很|hěn}{好吃|hǎo·chī}。', '{这些|zhè·xiē}{个|ge}{苹果|píng·guǒ}{很|hěn}{好吃|hǎo·chī}。', '{些|xiē}{这|zhè}{苹果|píng·guǒ}{很|hěn}{好吃|hǎo·chī}。'], why: '{这些|zhèxiē} + főnév, külön mérőszó nélkül.', point: 5 },
    { q: 'Mit jelent a {衣服|yīfu}?', a: 'ruha', wrong: ['cipő', 'táska', 'szövet'], why: '{两件衣服|liǎng jiàn yīfu} „két ruha".' },
    { q: 'Mit jelent a {漂亮|piàoliang}?', a: 'szép, csinos', wrong: ['drága', 'új', 'nagy'], why: '{太漂亮了|tài piàoliang le}！ „Nagyon szép!"' },
    { q: 'Melyik mondat hibás?', a: '{昨天|zuó·tiān}{我|wǒ}{不|bú}{去|qù}{了|le}{学校|xué·xiào}。', wrong: ['{昨天|zuó·tiān}{我|wǒ}{没|méi}{去|qù}{学校|xué·xiào}。', '{昨天|zuó·tiān}{我|wǒ}{去|qù}{学校|xué·xiào}{了|le}。', '{我|wǒ}{买|mǎi}{了|le}{两|liǎng}{本|běn}{书|shū}。'], why: 'Meg nem történt cselekvés: {没去|méi qù}, {了|le} nélkül.', point: 2 },
    { q: 'Mit jelent: {你买苹果了吗|nǐ mǎi píngguǒ le ma}？', a: 'Vettél almát?', wrong: ['Veszel almát?', 'Szereted az almát?', 'Hol vetted az almát?'], why: '…{了吗|le ma}？ megtörténtre kérdez.', point: 1 },
    { q: 'Mit jelent a {回来|huílai}?', a: 'visszajönni (ide)', wrong: ['visszamenni (oda)', 'elmenni', 'megérkezni oda'], why: '{回|huí} „vissza" + {来|lái} „ide jönni".' }
  ]
},

/* ════════════════════════════════════════════════════
   15. LECKE — 是…的, év + hónap + nap, 认识, 一起
   ════════════════════════════════════════════════════ */
{
  id: 'l15', no: 15, kicker: 'HSK 1 · 15. lecke',
  title: 'Hogyan jöttél? — egy megtörtént dolog részletei',
  lead: 'Egy már megtörtént dolog részleteiről kérdezel és mesélsz: mikor, hol, kivel, mivel történt (我是坐飞机来的). Bemutatkozáskor elmondod, örülsz, hogy megismerted a másikat.',
  cando: [
    'Egy múltbeli esemény körülményét emeled ki: 是 + körülmény + ige + 的.',
    'Teljes dátumot mondasz évvel és nappal.',
    'Elmondod, mivel közlekedsz: 坐飞机, 坐出租车, 开车.',
    'Ismerkedéskor: 认识你很高兴, 我们一起去吧.'
  ],
  intro: [
    'Ha már tudjuk, hogy valami megtörtént, és csak a részletek érdekelnek — mikor, hogyan, kivel —, a kínai egy különleges keretet használ: a {是|shì}…{的|de} szerkezetet. {我是坐飞机来的|wǒ shì zuò fēijī lái de} „repülővel jöttem" (nem az a hír, hogy jöttem, hanem hogy repülővel).',
    'Ez az utolsó HSK 1 lecke. Ha végigértél rajta, az alapszavakkal már bemutatkozol, vásárolsz, időpontot egyeztetsz és a múltról is mesélsz.'
  ],
  dialogue: {
    title: 'Egy új ismerős',
    scene: 'Egy baráti vacsorán David bemutatja Annának egy régi barátját, Liu Fangot.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{这|zhè}{是|shì}{我|wǒ}{的|de}{朋友|péng·you}{刘|Liú}{芳|Fāng}。', hu: 'Anna, ő a barátom, Liu Fang.' },
      { who: 'Liu Fang', zh: '{你好|nǐ hǎo}！{认识|rèn·shi}{你|nǐ}{很|hěn}{高兴|gāo·xìng}。', hu: 'Szia! Örülök, hogy megismerhetlek.' },
      { who: 'Anna', zh: '{认识|rèn·shi}{你|nǐ}{我|wǒ}{也|yě}{很|hěn}{高兴|gāo·xìng}。{你们|nǐ·men}{是|shì}{什么|shén·me}{时候|shí·hou}{认识|rèn·shi}{的|de}？', hu: 'Én is örülök. Ti mikor ismerkedtetek meg?' },
      { who: 'Liu Fang', zh: '{我们|wǒ·men}{是|shì}{二〇一九年|èr líng yī jiǔ nián}{在|zài}{美国|Měi·guó}{认识|rèn·shi}{的|de}。', hu: '2019-ben ismerkedtünk meg, Amerikában.' },
      { who: 'Anna', zh: '{你|nǐ}{是|shì}{怎么|zěn·me}{来|lái}{的|de}？', hu: 'Te hogy jöttél ide?' },
      { who: 'Liu Fang', zh: '{我|wǒ}{是|shì}{坐|zuò}{出租车|chū·zū·chē}{来|lái}{的|de}。{大卫|Dà·wèi}{是|shì}{开|kāi}{车|chē}{来|lái}{的|de}。', hu: 'Taxival jöttem. David autóval jött.' },
      { who: 'David', zh: '{吃|chī}{饭|fàn}{后|hòu}，{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{喝|hē}{茶|chá}{吧|ba}！', hu: 'Evés után menjünk el együtt teázni!' }
    ],
    notes: [
      'A {认识你很高兴|rènshi nǐ hěn gāoxìng} „örülök, hogy megismertelek" a bemutatkozás szokásos zárása; a sorrend fordítva is jó: {很高兴认识你|hěn gāoxìng rènshi nǐ}.',
      'A {是|shì}…{的|de} keretben a {是|shì} rendszerint elhagyható a beszédben: {我坐出租车来的|wǒ zuò chūzūchē lái de}. A {的|de} viszont kell.',
      'A {这是|zhè shì}… „ez itt …" a bemutatás szokásos formája embereknél is.'
    ]
  },
  points: [
    {
      title: '{是|shì}…{的|de}', sub: 'egy megtörtént dolog körülménye',
      pattern: 'A + {是|shì} + mikor / hol / hogyan / kivel + ige + {的|de}',
      body: 'Ha <b>már tudott, megtörtént</b> eseménynek egy részletét emeled ki, a részlet a {是|shì} és az ige közé kerül, a mondat végére pedig {的|de}: {我是坐飞机来的|wǒ shì zuò fēijī lái de} „repülővel jöttem", {我们是在美国认识的|wǒmen shì zài Měiguó rènshi de} „Amerikában ismerkedtünk meg", {他是昨天来的|tā shì zuótiān lái de} „tegnap jött".',
      more: [
        'Mikor használd? Ha a beszélgetésből már tudjuk, hogy valaki eljött, megérkezett, megvette — és a kérdés csak az, <b>mikor, hol, hogyan</b>. „Eljöttél?" → {你来了吗|nǐ lái le ma}？ ({了|le}) · „Mivel jöttél?" → {你是怎么来的|nǐ shì zěnme lái de}？ ({是|shì}…{的|de}).',
        'Tagadva {不是|bú shì}…{的|de}: {我不是坐飞机来的|wǒ bú shì zuò fēijī lái de} „nem repülővel jöttem".'
      ],
      tables: [
        { caption: 'Mit emel ki?',
          head: ['Körülmény', 'Példa', 'Jelentés'],
          rows: [
            ['mikor', '{他|tā}{是|shì}{昨天|zuó·tiān}{来|lái}{的|de}。', 'Tegnap jött.'],
            ['hol', '{我们|wǒ·men}{是|shì}{在|zài}{北京|Běi·jīng}{认识|rèn·shi}{的|de}。', 'Pekingben ismerkedtünk meg.'],
            ['hogyan', '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', 'Repülővel jöttem.'],
            ['kivel', '{我|wǒ}{是|shì}{和|hé}{朋友|péng·you}{一起|yì·qǐ}{来|lái}{的|de}。', 'A barátommal jöttem.']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', hu: 'Repülővel jöttem.' },
        { zh: '{你|nǐ}{是|shì}{什么|shén·me}{时候|shí·hou}{来|lái}{中国|Zhōng·guó}{的|de}？', hu: 'Mikor jöttél Kínába?' },
        { zh: '{这|zhè}{件|jiàn}{衣服|yī·fu}{是|shì}{在|zài}{北京|Běi·jīng}{买|mǎi}{的|de}。', hu: 'Ezt a ruhát Pekingben vettem.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}。', good: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', why: 'A keret második fele, a {的|de} nem maradhat el.' },
        { bad: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{了|le}{的|de}。', good: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', why: 'A {是|shì}…{的|de} keretben nincs {了|le}.' }
      ]
    },
    {
      title: '{坐|zuò} + jármű', sub: 'közlekedés',
      pattern: '{坐|zuò} + {飞机|fēi·jī} / {出租车|chū·zū·chē} / {火车|huǒ·chē} · {开车|kāi chē}',
      body: 'A „valamivel utazik" kínaiul: {坐|zuò} „ül" + jármű — {坐飞机|zuò fēijī} „repülővel", {坐出租车|zuò chūzūchē} „taxival", {坐火车|zuò huǒchē} „vonattal". Ha te vezetsz: {开车|kāi chē} „autót vezet". A közlekedés módja a „menni/jönni" előtt áll: {坐火车去|zuò huǒchē qù} „vonattal megy".',
      tables: [
        { caption: 'Járművek',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{坐|zuò}{飞机|fēi·jī}', 'repülővel'], ['{坐|zuò}{火车|huǒ·chē}', 'vonattal'],
            ['{坐|zuò}{出租车|chū·zū·chē}', 'taxival'], ['{坐|zuò}{公共汽车|gōng·gòng·qì·chē}', 'busszal'],
            ['{开|kāi}{车|chē}', 'autóval (vezetve)'], ['{走|zǒu}{路|lù}', 'gyalog']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{坐|zuò}{出租车|chū·zū·chē}{去|qù}{饭店|fàn·diàn}。', hu: 'Taxival megyek a szállodába.' },
        { zh: '{他|tā}{每天|měi·tiān}{开|kāi}{车|chē}{去|qù}{工作|gōng·zuò}。', hu: 'Minden nap autóval megy dolgozni.' }
      ]
    },
    {
      title: '{年|nián}{月|yuè}{日|rì}{星期|xīngqī}', sub: 'a teljes dátum',
      pattern: 'év + {年|nián} · hónap + {月|yuè} · nap + {号|hào} · {星期|xīng·qī}…',
      body: 'A teljes dátum a nagyobbtól a kisebb felé halad, és a hét napja is a végére kerülhet: {二〇二六年十月十八号，星期天|èr líng èr liù nián shíyuè shíbā hào, xīngqītiān} „2026. október 18., vasárnap". Az évszámot számjegyenként olvasod.',
      more: [
        'Kérdés az évre: {你是哪年来的|nǐ shì nǎ nián lái de}？ „Melyik évben jöttél?", vagy {你是哪一年出生的|nǐ shì nǎ yì nián chūshēng de}？ „Melyik évben születtél?" — mindkettő {是|shì}…{的|de} szerkezet.'
      ],
      examples: [
        { zh: '{我|wǒ}{是|shì}{二〇〇五年|èr líng líng wǔ nián}{出生|chū·shēng}{的|de}。', hu: '2005-ben születtem.' },
        { zh: '{今天|jīn·tiān}{是|shì}{二〇二六年|èr líng èr liù nián}{十月|shí·yuè}{十八|shí·bā}{号|hào}。', hu: 'Ma 2026. október 18. van.' }
      ]
    },
    {
      title: '{认识|rènshi}', sub: 'ismerni (személyt), megismerkedni',
      pattern: 'A + {认识|rèn·shi} + B · {认识|rèn·shi}{你|nǐ}{很|hěn}{高兴|gāo·xìng}',
      body: 'A {认识|rènshi} embert (vagy helyet, írásjegyet) „ismer", „megismer": {我认识他|wǒ rènshi tā} „ismerem őt", {你认识这个字吗|nǐ rènshi zhège zì ma}？ „Ismered ezt az írásjegyet?" A bemutatkozás zárása: {认识你很高兴|rènshi nǐ hěn gāoxìng} „örülök, hogy megismertelek".',
      more: [
        'A tényt, információt nem a {认识|rènshi}, hanem a {知道|zhīdào} „tud valamiről" fejezi ki: {我知道他的名字|wǒ zhīdào tā de míngzi} „tudom a nevét".'
      ],
      examples: [
        { zh: '{认识|rèn·shi}{你|nǐ}{很|hěn}{高兴|gāo·xìng}。', hu: 'Örülök, hogy megismertelek.' },
        { zh: '{你|nǐ}{认识|rèn·shi}{王明|Wáng Míng}{吗|ma}？', hu: 'Ismered Wang Minget?' }
      ]
    },
    {
      title: '{一起|yìqǐ}', sub: 'együtt',
      pattern: 'A + ({和|hé} + B) + {一起|yì·qǐ} + ige',
      body: 'Az {一起|yìqǐ} „együtt" az ige előtt áll: {我们一起去吧|wǒmen yìqǐ qù ba} „menjünk együtt". Ha megmondod, kivel: {我和朋友一起来的|wǒ hé péngyou yìqǐ lái de} „a barátommal együtt jöttem" — a {和|hé} + személy az {一起|yìqǐ} elé kerül.',
      examples: [
        { zh: '{我们|wǒ·men}{一起|yì·qǐ}{吃|chī}{饭|fàn}{吧|ba}！', hu: 'Együnk együtt!' },
        { zh: '{我|wǒ}{和|hé}{妈妈|mā·ma}{一起|yì·qǐ}{去|qù}{商店|shāng·diàn}。', hu: 'Anyával megyek a boltba.' }
      ],
      mistakes: [
        { bad: '{我们|wǒ·men}{去|qù}{一起|yì·qǐ}。', good: '{我们|wǒ·men}{一起|yì·qǐ}{去|qù}。', why: 'Az {一起|yìqǐ} az ige előtt áll.' }
      ]
    }
  ],
  phrases: [
    { zh: '{认识|rèn·shi}{你|nǐ}{很|hěn}{高兴|gāo·xìng}。', hu: 'Örülök, hogy megismertelek.' },
    { zh: '{你|nǐ}{是|shì}{怎么|zěn·me}{来|lái}{的|de}？', hu: 'Hogyan jöttél?' },
    { zh: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', hu: 'Repülővel jöttem.' },
    { zh: '{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{吧|ba}！', hu: 'Menjünk együtt!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{认识|rèn·shi}', pinyin: 'rènshi', hu: 'ismerni (személyt)' },
        { zh: '{年|nián}', pinyin: 'nián', hu: 'év' },
        { zh: '{大学|dà·xué}', pinyin: 'dàxué', hu: 'egyetem' },
        { zh: '{饭店|fàn·diàn}', pinyin: 'fàndiàn', hu: 'szálloda; étterem' },
        { zh: '{出租车|chū·zū·chē}', pinyin: 'chūzūchē', hu: 'taxi' },
        { zh: '{一起|yì·qǐ}', pinyin: 'yìqǐ', hu: 'együtt' },
        { zh: '{高兴|gāo·xìng}', pinyin: 'gāoxìng', hu: 'boldog, örül' },
        { zh: '{听|tīng}', pinyin: 'tīng', hu: 'hallgatni' },
        { zh: '{飞机|fēi·jī}', pinyin: 'fēijī', hu: 'repülőgép' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{火车|huǒ·chē}', pinyin: 'huǒchē', hu: 'vonat' },
        { zh: '{开车|kāi chē}', pinyin: 'kāi chē', hu: 'autót vezetni' },
        { zh: '{出生|chū·shēng}', pinyin: 'chūshēng', hu: 'születni' },
        { zh: '{知道|zhī·dào}', pinyin: 'zhīdào', hu: 'tudni (valamiről)' }
      ] }
  ],
  culture: [
    { title: 'Telefon mindenre', text: 'Kínában a telefon a pénztárca, a személyi és a postaláda helyett is szolgál. A {微信|Wēixìn} (WeChat) csevegő, fizetőeszköz és közösségi oldal egyben: rajta fizetsz a piacon, rendelsz taxit, foglalsz orvost. Ismerkedéskor ezért nem telefonszámot cserélnek, hanem egymás QR-kódját olvassák be: {加个微信吧|jiā ge Wēixìn ba} „adjuk hozzá egymást WeChaten!"' },
    { title: 'Nagysebességű vasút', text: 'Kínában épült a világ legnagyobb nagysebességű vasúthálózata: Peking és Sanghaj között a {高铁|gāotiě} kb. négy és fél óra alatt viszi az utast, 300 km/óra fölötti sebességgel. Sokan a repülő helyett is inkább a vonatot választják.' }
  ],
  reading: {
    title: '{我|wǒ}{来|lái}{中国|Zhōng·guó}{了|le}', titleHu: 'Megérkeztem Kínába',
    text: [
      { zh: '{我|wǒ}{是|shì}{二〇二六年|èr líng èr liù nián}{九月|jiǔ·yuè}{一|yī}{号|hào}{来|lái}{中国|Zhōng·guó}{的|de}。', hu: '2026. szeptember 1-jén jöttem Kínába.' },
      { zh: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}，{和|hé}{我|wǒ}{的|de}{同学|tóng·xué}{一起|yì·qǐ}。', hu: 'Repülővel jöttem, az évfolyamtársammal együtt.' },
      { zh: '{在|zài}{北京|Běi·jīng}，{我们|wǒ·men}{坐|zuò}{出租车|chū·zū·chē}{去|qù}{了|le}{大学|dà·xué}。', hu: 'Pekingben taxival mentünk az egyetemre.', par: true },
      { zh: '{在|zài}{大学|dà·xué}{我|wǒ}{认识|rèn·shi}{了|le}{王明|Wáng Míng}，{他|tā}{是|shì}{我|wǒ}{的|de}{第一|dì·yī}{个|ge}{中国|Zhōng·guó}{朋友|péng·you}。', hu: 'Az egyetemen megismerkedtem Wang Minggel, ő az első kínai barátom.' },
      { zh: '{认识|rèn·shi}{他|tā}{我|wǒ}{很|hěn}{高兴|gāo·xìng}。', hu: 'Nagyon örülök, hogy megismertem.', par: true }
    ],
    words: [ { zh: '{第一|dì·yī}', hu: 'első' } ],
    questions: [
      { q: 'Mikor jött a szöveg írója Kínába?', a: '2026. szeptember 1-jén', wrong: ['2026. október 1-jén', '2025. szeptember 1-jén', 'nem derül ki'], why: '{二〇二六年九月一号|èr líng èr liù nián jiǔyuè yī hào}.' },
      { q: 'Hogyan és kivel jött?', a: 'repülővel, az évfolyamtársával', wrong: ['vonattal, egyedül', 'repülővel, a családjával', 'taxival, Wang Minggel'], why: '{坐飞机来的，和我的同学一起|zuò fēijī lái de, hé wǒ de tóngxué yìqǐ}.' },
      { q: 'Hogyan jutottak el az egyetemre?', a: 'taxival', wrong: ['busszal', 'gyalog', 'autóval, ő vezetett'], why: '{我们坐出租车去了大学|wǒmen zuò chūzūchē qùle dàxué}.' },
      { q: 'Ki Wang Ming a szövegben?', a: 'az író első kínai barátja', wrong: ['a tanára', 'az évfolyamtársa, akivel jött', 'a taxisofőr'], why: '{他是我的第一个中国朋友|tā shì wǒ de dì-yī ge Zhōngguó péngyou}.' }
    ]
  },
  quiz: [
    { q: '„Repülővel jöttem." (a jövetel tudott, a mód a hír)', a: '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', wrong: ['{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}。', '{我|wǒ}{坐|zuò}{飞机|fēi·jī}{是|shì}{来|lái}{的|de}。', '{我|wǒ}{是|shì}{来|lái}{的|de}{坐|zuò}{飞机|fēi·jī}。'], why: '{是|shì} + körülmény + ige + {的|de}.', point: 1 },
    { q: 'Mikor használod a {是|shì}…{的|de} szerkezetet?', a: 'ha egy megtörtént dolognak a körülményét (mikor, hol, hogyan) emeled ki', wrong: ['ha egy jövőbeli tervről, szándékról beszélsz valakinek', 'ha valakit udvariasan, tisztelettel szólítasz meg', 'ha egy cselekvés éppen most folyik a beszéd idején'], why: 'A tény ismert, a részlet a hír.', point: 1 },
    { q: 'Hogyan kérdezed: „Mikor jöttél Kínába?"', a: '{你|nǐ}{是|shì}{什么|shén·me}{时候|shí·hou}{来|lái}{中国|Zhōng·guó}{的|de}？', wrong: ['{你|nǐ}{什么|shén·me}{时候|shí·hou}{来|lái}{中国|Zhōng·guó}{了|le}{的|de}？', '{你|nǐ}{来|lái}{中国|Zhōng·guó}{是|shì}{什么|shén·me}{时候|shí·hou}？', '{什么|shén·me}{时候|shí·hou}{你|nǐ}{是|shì}{来|lái}？'], why: 'A {是|shì} és az ige közé kerül a kérdezett körülmény.', point: 1 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{是|shì}{昨天|zuó·tiān}{来|lái}{了|le}{的|de}。', wrong: ['{我|wǒ}{是|shì}{昨天|zuó·tiān}{来|lái}{的|de}。', '{我|wǒ}{昨天|zuó·tiān}{来|lái}{的|de}。', '{我|wǒ}{昨天|zuó·tiān}{来|lái}{了|le}。'], why: 'A {是|shì}…{的|de} keretben nincs {了|le}.', point: 1 },
    { q: 'Mit jelent: {我们是在美国认识的|wǒmen shì zài Měiguó rènshi de}。', a: 'Amerikában ismerkedtünk meg.', wrong: ['Amerikában fogunk megismerkedni.', 'Amerikát ismerjük.', 'Amerikaiak vagyunk, és ismerjük egymást.'], why: '{是|shì} + {在美国|zài Měiguó} (hely) + ige + {的|de}.', point: 1 },
    { q: '„taxival megy"', a: '{坐|zuò}{出租车|chū·zū·chē}{去|qù}', wrong: ['{去|qù}{出租车|chū·zū·chē}{坐|zuò}', '{开|kāi}{出租车|chū·zū·chē}{去|qù}', '{出租车|chū·zū·chē}{去|qù}{坐|zuò}'], why: '{坐|zuò} + jármű + {去|qù}.', point: 2 },
    { q: 'Mit jelent a {开车|kāi chē}?', a: 'autót vezetni', wrong: ['autóval utazni utasként', 'autót venni', 'kinyitni az autót'], why: 'A {开|kāi} itt „vezetni".', point: 2 },
    { q: 'Hogyan zárod a bemutatkozást?', a: '{认识|rèn·shi}{你|nǐ}{很|hěn}{高兴|gāo·xìng}。', wrong: ['{你|nǐ}{很|hěn}{高兴|gāo·xìng}{认识|rèn·shi}。', '{高兴|gāo·xìng}{你|nǐ}{认识|rèn·shi}。', '{认识|rèn·shi}{很|hěn}{高兴|gāo·xìng}{你|nǐ}{吗|ma}。'], why: '„Örülök, hogy megismertelek."', point: 4 },
    { q: '{认识|rènshi} vagy {知道|zhīdào}: „Ismerem Wang Minget."', a: '{我|wǒ}{认识|rèn·shi}{王明|Wáng Míng}。', wrong: ['{我|wǒ}{知道|zhī·dào}{王明|Wáng Míng}{了|le}。', '{我|wǒ}{是|shì}{认识|rèn·shi}{王明|Wáng Míng}。', '{我|wǒ}{会|huì}{王明|Wáng Míng}。'], why: 'Személyt a {认识|rènshi} „ismer".', point: 4 },
    { q: '„Menjünk együtt!"', a: '{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{吧|ba}！', wrong: ['{我们|wǒ·men}{去|qù}{一起|yì·qǐ}{吧|ba}！', '{一起|yì·qǐ}{去|qù}{我们|wǒ·men}{吧|ba}！', '{我们|wǒ·men}{吧|ba}{一起|yì·qǐ}{去|qù}！'], why: 'Az {一起|yìqǐ} az ige előtt.', point: 5 },
    { q: 'Hogyan olvasod: 2019{年|nián}?', a: '{二〇一九年|èr líng yī jiǔ nián}', wrong: ['{两千零一十九年|liǎngqiān líng yīshíjiǔ nián}', '{二十一九年|èrshíyī jiǔ nián}', '{一九二〇年|yī jiǔ èr líng nián}'], why: 'Számjegyenként: èr líng yī jiǔ.', point: 3 },
    { q: 'Mit jelent a {飞机|fēijī}?', a: 'repülőgép', wrong: ['vonat', 'taxi', 'hajó'], why: '{飞|fēi} „repülni" + {机|jī} „gép".' },
    { q: 'Mit jelent a {高兴|gāoxìng}?', a: 'boldog, örül', wrong: ['magas', 'fáradt', 'ideges'], why: '{很高兴|hěn gāoxìng} „nagyon örül".' },
    { q: '„A barátommal jöttem." (kivel — kiemelve)', a: '{我|wǒ}{是|shì}{和|hé}{朋友|péng·you}{一起|yì·qǐ}{来|lái}{的|de}。', wrong: ['{我|wǒ}{是|shì}{一起|yì·qǐ}{朋友|péng·you}{来|lái}{的|de}。', '{我|wǒ}{和|hé}{朋友|péng·you}{是|shì}{来|lái}{一起|yì·qǐ}。', '{我|wǒ}{来|lái}{的|de}{和|hé}{朋友|péng·you}{一起|yì·qǐ}。'], why: '{是|shì} + {和朋友一起|hé péngyou yìqǐ} + {来|lái} + {的|de}.', point: 1 },
    { q: 'Mit jelent a {饭店|fàndiàn}?', a: 'szálloda; étterem', wrong: ['bolt', 'konyha', 'egyetem'], why: 'A {饭店|fàndiàn} szállodát és éttermet is jelenthet.' },
    { q: 'Mit jelent: {你是怎么来的|nǐ shì zěnme lái de}？', a: 'Hogyan (mivel) jöttél?', wrong: ['Miért jöttél?', 'Mikor jössz?', 'Eljössz?'], why: '{是|shì} + {怎么|zěnme} + {来|lái} + {的|de}: a módra kérdez.', point: 1 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 1. LECKE — 要, 最, 觉得, 为什么, közelítő számok
   ════════════════════════════════════════════════════ */
{
  id: 'l16', no: 16, badge: '1', kicker: 'HSK 2 · 1. lecke', label: 'HSK 2 · 1. lecke',
  title: 'Mikor a legjobb utazni? — tervek és vélemény',
  lead: 'Elmondod, mit fogsz csinálni (我要去旅游), mi a legjobb szerinted (我觉得九月最好), megindokolod (因为…), és körülbelüli számokat mondasz (十几个, 二十多).',
  cando: [
    'Szándékot és tervet fejezel ki a 要 segédigével.',
    'A legjobbat, legszebbet mondod a 最 szóval.',
    'Véleményt mondasz: 我觉得… és rákérdezel: 为什么？',
    'Körülbelüli számot mondasz: 十几个人, 二十多岁.'
  ],
  intro: [
    'Üdv a HSK 2-ben! Az első szinten megtanultad az alapmondatokat. Most a mondatok gazdagabbak lesznek: véleményt mondasz, indokolsz, összehasonlítasz, és a cselekvések finomabb árnyalatait (befejezettség, tapasztalat, állapot) is kifejezed.',
    'Ebben a leckében egy utazás tervezése a téma. Három új eszköz kell hozzá: a {要|yào} „akar, fog", a {最|zuì} „leg-", és a {觉得|juéde} „úgy gondolja, úgy érzi" — ez utóbbi a kínai véleménynyilvánítás alapszava.'
  ],
  dialogue: {
    title: 'Utazási tervek',
    scene: 'Anna és Wang Ming a menzán ebédelnek. Anna szeretne Kínában utazni.',
    lines: [
      { who: 'Anna', zh: '{王明|Wáng Míng}，{我|wǒ}{要|yào}{去|qù}{旅游|lǚ·yóu}。{你|nǐ}{觉得|jué·de}{什么|shén·me}{时候|shí·hou}{去|qù}{西安|Xī\'ān}{最|zuì}{好|hǎo}？', hu: 'Wang Ming, utazni fogok. Szerinted mikor a legjobb Hszianba menni?' },
      { who: 'Wang Ming', zh: '{我|wǒ}{觉得|jué·de}{九月|jiǔ·yuè}{最|zuì}{好|hǎo}。', hu: 'Szerintem szeptemberben a legjobb.' },
      { who: 'Anna', zh: '{为什么|wèi·shén·me}？', hu: 'Miért?' },
      { who: 'Wang Ming', zh: '{因为|yīn·wèi}{九月|jiǔ·yuè}{不|bù}{冷|lěng}{也|yě}{不|bú}{热|rè}，{人|rén}{也|yě}{不|bù}{多|duō}。', hu: 'Mert szeptemberben nincs se hideg, se meleg, és nincsenek sokan.' },
      { who: 'Anna', zh: '{十月|shí·yuè}{呢|ne}？', hu: 'És októberben?' },
      { who: 'Wang Ming', zh: '{十月|shí·yuè}{一|yī}{号|hào}{以后|yǐ·hòu}{有|yǒu}{七|qī}{天|tiān}{假|jià}，{去|qù}{旅游|lǚ·yóu}{的|de}{人|rén}{太|tài}{多|duō}{了|le}！', hu: 'Október elseje után hét nap szünet van, túl sokan utaznak!' },
      { who: 'Anna', zh: '{好|hǎo}，{我|wǒ}{九月|jiǔ·yuè}{去|qù}。{我|wǒ}{要|yào}{去|qù}{西安|Xī\'ān}{和|hé}{成都|Chéng·dū}，{玩儿|wánr}{十几|shí jǐ}{天|tiān}！', hu: 'Rendben, szeptemberben megyek. Hsziant és Csengtut is megnézem, tíz-egynéhány napig utazgatok!' }
    ],
    notes: [
      'A {旅游|lǚyóu} „utazni, kirándulni (turistaként)". A {玩儿|wánr} „játszani, szórakozni" utazásnál „körülnézni, jól érezni magát" jelentésű.',
      'A {十几天|shí jǐ tiān} „tizen-egynéhány nap" — a {几|jǐ} itt nem kérdez, hanem „néhány"-at jelent.',
      'Az {以后|yǐhòu} „után": {十月一号以后|shíyuè yī hào yǐhòu} „október elseje után".'
    ]
  },
  points: [
    {
      title: '{要|yào}', sub: 'akar, fog — szándék és terv',
      pattern: 'A + {要|yào} + ige · tagadva: A + {不想|bù xiǎng} + ige',
      body: 'A {要|yào} segédigeként <b>szándékot, eltökélt tervet</b> fejez ki: {我要去旅游|wǒ yào qù lǚyóu} „utazni fogok / el akarok utazni". Erősebb, határozottabb, mint a {想|xiǎng} („szeretne"): a {想|xiǎng} vágy, a {要|yào} már döntés.',
      more: [
        '🔴 Tagadásra nem a {不要|bú yào}-t használjuk, mert az „ne …!" tiltást jelent ({不要去|bú yào qù} „ne menj!"). A „nem akarok menni" helyesen: {我不想去|wǒ bù xiǎng qù}.',
        'A {要|yào} önálló igeként „kér, akar valamit": {我要一杯咖啡|wǒ yào yì bēi kāfēi} „kérek egy kávét" — boltban, étteremben nagyon gyakori.'
      ],
      tables: [
        { caption: '{想|xiǎng} és {要|yào}',
          head: ['', '{想|xiǎng}', '{要|yào}'],
          rows: [
            ['jelentés', 'szeretne, kedve van', 'akar, fog (eltökélt)'],
            ['példa', '{我|wǒ}{想|xiǎng}{去|qù}{旅游|lǚ·yóu}。', '{我|wǒ}{要|yào}{去|qù}{旅游|lǚ·yóu}。'],
            ['tagadás', '{不想|bù xiǎng}', '{不想|bù xiǎng} (a {不要|bú yào} tiltás!)']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{要|yào}{去|qù}{旅游|lǚ·yóu}。', hu: 'Utazni fogok. (El akarok utazni.)' },
        { zh: '{明天|míng·tiān}{我|wǒ}{要|yào}{去|qù}{机场|jī·chǎng}。', hu: 'Holnap ki kell mennem / ki fogok menni a reptérre.' },
        { zh: '{我|wǒ}{要|yào}{一|yì}{杯|bēi}{咖啡|kā·fēi}。', hu: 'Kérek egy kávét.' },
        { zh: '{我|wǒ}{不|bù}{想|xiǎng}{去|qù}。', hu: 'Nem akarok menni.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{不|bú}{要|yào}{去|qù}。（= nem akarok menni）', good: '{我|wǒ}{不|bù}{想|xiǎng}{去|qù}。', why: 'A {不要|bú yào} + ige tiltás: „ne menj!"' }
      ]
    },
    {
      title: '{最|zuì}', sub: 'leg- — a felsőfok',
      pattern: '{最|zuì} + melléknév / ige',
      body: 'A {最|zuì} a melléknév vagy az érzést jelentő ige elé téve felsőfokot ad: {最好|zuì hǎo} „a legjobb", {最冷|zuì lěng} „a leghidegebb", {最喜欢|zuì xǐhuan} „a legjobban szeret". A magyar „leg-…-bb" ennek egyetlen szó felel meg, a melléknév nem változik.',
      more: [
        'Jelzőként: {最好的朋友|zuì hǎo de péngyou} „a legjobb barát" — a {的|de} köti a főnévhez.',
        'A {最好|zuì hǎo} mondat elején tanácsot is ad: {你最好九月去|nǐ zuì hǎo jiǔyuè qù} „legjobb, ha szeptemberben mész".'
      ],
      examples: [
        { zh: '{九月|jiǔ·yuè}{去|qù}{北京|Běi·jīng}{最|zuì}{好|hǎo}。', hu: 'Szeptemberben a legjobb Pekingbe menni.' },
        { zh: '{我|wǒ}{最|zuì}{喜欢|xǐ·huan}{吃|chī}{饺子|jiǎo·zi}。', hu: 'A legjobban a gombócot szeretem.' },
        { zh: '{他|tā}{是|shì}{我|wǒ}{最|zuì}{好|hǎo}{的|de}{朋友|péng·you}。', hu: 'Ő a legjobb barátom.' }
      ],
      mistakes: [
        { bad: '{好|hǎo}{最|zuì}', good: '{最|zuì}{好|hǎo}', why: 'A {最|zuì} a melléknév elé kerül.' }
      ]
    },
    {
      title: '{觉得|juéde}', sub: '„úgy gondolom, szerintem"',
      pattern: 'A + {觉得|jué·de} + vélemény (mondat)',
      body: 'A {觉得|juéde} „úgy érzi, úgy gondolja" utána egy egész mondatot vár: {我觉得九月最好|wǒ juéde jiǔyuè zuì hǎo} „szerintem szeptember a legjobb", {你觉得这个菜怎么样|nǐ juéde zhège cài zěnmeyàng}？ „Mit gondolsz, milyen ez az étel?" A kínai véleménynyilvánítás leggyakoribb kerete.',
      more: [
        'Testi érzésre is: {我觉得有点儿冷|wǒ juéde yǒudiǎnr lěng} „kicsit fázom (úgy érzem, kissé hideg van)".',
        'Tagadva gyakran a {觉得|juéde} elé kerül a {不|bù}: {我不觉得贵|wǒ bù juéde guì} „szerintem nem drága".'
      ],
      examples: [
        { zh: '{我|wǒ}{觉得|jué·de}{汉语|Hàn·yǔ}{不|bù}{难|nán}。', hu: 'Szerintem a kínai nem nehéz.' },
        { zh: '{你|nǐ}{觉得|jué·de}{这个|zhè·ge}{电影|diàn·yǐng}{怎么样|zěn·me·yàng}？', hu: 'Mit gondolsz, milyen ez a film?' },
        { zh: '{我|wǒ}{觉得|jué·de}{有点儿|yǒu·diǎnr}{冷|lěng}。', hu: 'Kicsit fázom.' }
      ]
    },
    {
      title: '{为什么|wèishénme} · {因为|yīnwèi}', sub: 'miért? — mert…',
      pattern: 'A + {为什么|wèi·shén·me} + ige？ → {因为|yīn·wèi} + ok',
      body: 'A {为什么|wèishénme} „miért" kérdőszó az ige előtt áll (vagy egymagában): {你为什么学汉语|nǐ wèishénme xué Hànyǔ}？ „Miért tanulsz kínaiul?" A válasz {因为|yīnwèi} „mert"-tel kezdődik: {因为我喜欢中国|yīnwèi wǒ xǐhuan Zhōngguó} „mert szeretem Kínát".',
      more: [
        'A {因为|yīnwèi} … {所以|suǒyǐ} … „mivel …, ezért …" párost a HSK 2 6. leckéjében tanulod részletesen.',
        'Az {为|wèi} itt 4. tónusú (nem a {为|wéi} „lenni"): <i>wèishénme</i>.'
      ],
      examples: [
        { zh: '{你|nǐ}{为什么|wèi·shén·me}{学|xué}{汉语|Hàn·yǔ}？', hu: 'Miért tanulsz kínaiul?' },
        { zh: '{因为|yīn·wèi}{我|wǒ}{想|xiǎng}{去|qù}{中国|Zhōng·guó}{工作|gōng·zuò}。', hu: 'Mert Kínában szeretnék dolgozni.' },
        { zh: '{他|tā}{为什么|wèi·shén·me}{没|méi}{来|lái}？', hu: 'Miért nem jött el?' }
      ],
      mistakes: [
        { bad: '{为什么|wèi·shén·me}{你|nǐ}{学|xué}{汉语|Hàn·yǔ}{吗|ma}？', good: '{你|nǐ}{为什么|wèi·shén·me}{学|xué}{汉语|Hàn·yǔ}？', why: 'Kérdőszóval nincs {吗|ma}, és a {为什么|wèishénme} az alany után a legtermészetesebb.' }
      ]
    },
    {
      title: '{十几|shí jǐ} · {二十多|èrshí duō}', sub: 'körülbelüli számok',
      pattern: '{十几|shí jǐ} + mérőszó (11–19) · tízes + {多|duō} + mérőszó (20-valahány)',
      body: 'Ha nem tudod vagy nem akarod pontosan megmondani a számot: a {几|jǐ} állításban „néhány": {十几个人|shí jǐ ge rén} „tizen-egynéhány ember", {几个朋友|jǐ ge péngyou} „néhány barát". A {多|duō} kerek szám után „-valahány, több mint": {二十多岁|èrshí duō suì} „húszas évei elején jár", {一百多块|yìbǎi duō kuài} „száz-egynéhány jüan".',
      more: [
        'A {几|jǐ} tehát kérdésben „hány?", állításban „néhány". A helyzetből és a hanghordozásból derül ki, melyik.',
        'A {多|duō} a kerek tízes és a mérőszó közé kerül: {二十多个|èrshí duō ge}, nem *{二十个多|èrshí ge duō}.',
        'Két szomszédos szám egymás után szintén becslés: {五六天|wǔ liù tiān} „öt-hat nap", {两三个人|liǎng sān ge rén} „két-három ember".'
      ],
      examples: [
        { zh: '{我|wǒ}{要|yào}{玩儿|wánr}{十几|shí jǐ}{天|tiān}。', hu: 'Tíz-egynéhány napig fogok utazgatni.' },
        { zh: '{他|tā}{二十|èr·shí}{多|duō}{岁|suì}。', hu: 'Húsz-egynéhány éves.' },
        { zh: '{我|wǒ}{有|yǒu}{几|jǐ}{个|ge}{中国|Zhōng·guó}{朋友|péng·you}。', hu: 'Van néhány kínai barátom.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{觉得|jué·de}{怎么样|zěn·me·yàng}？', hu: 'Mit gondolsz? Mit szólsz?' },
    { zh: '{为什么|wèi·shén·me}？', hu: 'Miért?' },
    { zh: '{我|wǒ}{觉得|jué·de}……{最|zuì}{好|hǎo}。', hu: 'Szerintem … a legjobb.' },
    { zh: '{我|wǒ}{要|yào}{一|yì}{杯|bēi}{咖啡|kā·fēi}。', hu: 'Kérek egy kávét.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{旅游|lǚ·yóu}', pinyin: 'lǚyóu', hu: 'utazni, turistáskodni' },
        { zh: '{觉得|jué·de}', pinyin: 'juéde', hu: 'úgy gondolja, úgy érzi' },
        { zh: '{最|zuì}', pinyin: 'zuì', hu: 'leg-' },
        { zh: '{为什么|wèi·shén·me}', pinyin: 'wèishénme', hu: 'miért' },
        { zh: '{因为|yīn·wèi}', pinyin: 'yīnwèi', hu: 'mert' },
        { zh: '{要|yào}', pinyin: 'yào', hu: 'akar, fog; kér' },
        { zh: '{玩儿|wánr}', pinyin: 'wánr', hu: 'játszani, szórakozni' },
        { zh: '{机场|jī·chǎng}', pinyin: 'jīchǎng', hu: 'repülőtér' },
        { zh: '{咖啡|kā·fēi}', pinyin: 'kāfēi', hu: 'kávé' },
        { zh: '{以后|yǐ·hòu}', pinyin: 'yǐhòu', hu: 'után; később' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{假|jià}', pinyin: 'jià', hu: 'szünet, szabadság' },
        { zh: '{饺子|jiǎo·zi}', pinyin: 'jiǎozi', hu: 'töltött gombóc' },
        { zh: '{有点儿|yǒu·diǎnr}', pinyin: 'yǒudiǎnr', hu: 'kissé, egy kicsit' }
      ] }
  ],
  culture: [
    { title: 'Mikor ne utazz Kínában?', text: 'A két nagy ünnepi hét — a tavaszünnep (január–február) és az október eleji „aranyhét" — idején százmilliók utaznak egyszerre. A vonatjegyek napok alatt elfogynak, a látnivalóknál tömeg áll. Ha teheted, ezeket kerüld: a tavasz (április–május) és az ősz eleje (szeptember) a legkellemesebb.' },
    { title: 'Mit visz haza egy kínai turista?', text: 'Utazásról hazatérve illik apró ajándékot hozni a családnak, a kollégáknak: helyi édességet, teát. Ennek neve {特产|tèchǎn} „helyi különlegesség" — minden városnak, tartománynak megvan a maga híres terméke, és a kínaiak szívesen beszélgetnek róluk.' }
  ],
  reading: {
    title: '{我|wǒ}{的|de}{旅游|lǚ·yóu}{计划|jì·huà}', titleHu: 'Az utazási tervem',
    text: [
      { zh: '{九月|jiǔ·yuè}{我|wǒ}{要|yào}{去|qù}{西安|Xī\'ān}{旅游|lǚ·yóu}。', hu: 'Szeptemberben Hszianba utazom.' },
      { zh: '{我|wǒ}{的|de}{朋友|péng·you}{王明|Wáng Míng}{觉得|jué·de}{九月|jiǔ·yuè}{最|zuì}{好|hǎo}，{因为|yīn·wèi}{天气|tiān·qì}{不|bù}{冷|lěng}{也|yě}{不|bú}{热|rè}。', hu: 'A barátom, Wang Ming szerint szeptember a legjobb, mert az idő se nem hideg, se nem meleg.' },
      { zh: '{我|wǒ}{要|yào}{在|zài}{西安|Xī\'ān}{玩儿|wánr}{五六|wǔ liù}{天|tiān}。', hu: 'Öt-hat napot fogok Hszianban tölteni.', par: true },
      { zh: '{西安|Xī\'ān}{有|yǒu}{很|hěn}{多|duō}{好|hǎo}{玩儿|wánr}{的|de}{地方|dì·fang}，{我|wǒ}{最|zuì}{想|xiǎng}{去|qù}{看|kàn}{兵马俑|Bīng·mǎ·yǒng}。', hu: 'Hszianban sok érdekes hely van, legjobban az agyaghadsereget szeretném megnézni.' },
      { zh: '{我|wǒ}{不|bù}{想|xiǎng}{十月|shí·yuè}{去|qù}，{因为|yīn·wèi}{那|nà}{时候|shí·hou}{人|rén}{太|tài}{多|duō}{了|le}。', hu: 'Októberben nem akarok menni, mert akkor túl sokan vannak.', par: true }
    ],
    words: [ { zh: '{计划|jì·huà}', hu: 'terv' }, { zh: '{地方|dì·fang}', hu: 'hely' }, { zh: '{兵马俑|Bīng·mǎ·yǒng}', hu: 'az agyaghadsereg' } ],
    questions: [
      { q: 'Mikor utazik a szöveg írója Hszianba?', a: 'szeptemberben', wrong: ['októberben', 'tavasszal', 'nem tudja még'], why: '{九月我要去西安旅游|jiǔyuè wǒ yào qù Xī\'ān lǚyóu}.' },
      { q: 'Miért szeptember a legjobb Wang Ming szerint?', a: 'mert se nem hideg, se nem meleg az idő', wrong: ['mert akkor van szünet', 'mert akkor olcsóbbak a jegyek', 'mert akkor van a születésnapja'], why: '{因为天气不冷也不热|yīnwèi tiānqì bù lěng yě bú rè}.' },
      { q: 'Mit szeretne a legjobban megnézni?', a: 'az agyaghadsereget', wrong: ['a Nagy Falat', 'a Tiltott Várost', 'a pandákat'], why: '{我最想去看兵马俑|wǒ zuì xiǎng qù kàn Bīngmǎyǒng}.' },
      { q: 'Miért nem akar októberben utazni?', a: 'mert akkor túl sokan vannak', wrong: ['mert akkor hideg van', 'mert akkor dolgoznia kell', 'mert akkor drága a szálloda'], why: '{那时候人太多了|nà shíhou rén tài duō le}.' }
    ]
  },
  quiz: [
    { q: '„Utazni fogok." (eltökélt terv)', a: '{我|wǒ}{要|yào}{去|qù}{旅游|lǚ·yóu}。', wrong: ['{我|wǒ}{旅游|lǚ·yóu}{要|yào}{去|qù}。', '{我|wǒ}{是|shì}{旅游|lǚ·yóu}{要|yào}。', '{要|yào}{我|wǒ}{去|qù}{旅游|lǚ·yóu}{吗|ma}。'], why: '{要|yào} + ige: szándék.', point: 1 },
    { q: '„Nem akarok menni." — melyik a helyes?', a: '{我|wǒ}{不|bù}{想|xiǎng}{去|qù}。', wrong: ['{我|wǒ}{不|bú}{要|yào}{去|qù}{了|le}{吗|ma}。', '{我|wǒ}{没|méi}{要|yào}{去|qù}。', '{我|wǒ}{要|yào}{不|bú}{去|qù}。'], why: 'A {不要|bú yào} „ne!" tiltás; a nem-akarás {不想|bù xiǎng}.', point: 1 },
    { q: 'Mit jelent: {不要去|bú yào qù}！', a: 'Ne menj!', wrong: ['Nem akarok menni.', 'Nem kell menni.', 'Nem fogok menni.'], why: '{不要|bú yào} + ige: tiltás.', point: 1 },
    { q: 'Mit jelent: {我要一杯茶|wǒ yào yì bēi chá}。', a: 'Kérek egy teát.', wrong: ['Iszom egy teát.', 'Egy teát akartam.', 'Van egy teám.'], why: 'Önálló igeként a {要|yào} „kér, akar valamit".', point: 1 },
    { q: '„a legjobb barátom"', a: '{我|wǒ}{最|zuì}{好|hǎo}{的|de}{朋友|péng·you}', wrong: ['{我|wǒ}{好|hǎo}{最|zuì}{的|de}{朋友|péng·you}', '{最|zuì}{我|wǒ}{的|de}{好|hǎo}{朋友|péng·you}', '{我|wǒ}{的|de}{朋友|péng·you}{最|zuì}'], why: '{最好的|zuì hǎo de} + főnév.', point: 2 },
    { q: '„A legjobban a teát szeretem."', a: '{我|wǒ}{最|zuì}{喜欢|xǐ·huan}{茶|chá}。', wrong: ['{我|wǒ}{喜欢|xǐ·huan}{最|zuì}{茶|chá}。', '{我|wǒ}{喜欢|xǐ·huan}{茶|chá}{最|zuì}。', '{最|zuì}{我|wǒ}{茶|chá}{喜欢|xǐ·huan}。'], why: 'A {最|zuì} az ige elé kerül.', point: 2 },
    { q: '„Szerintem a kínai nem nehéz."', a: '{我|wǒ}{觉得|jué·de}{汉语|Hàn·yǔ}{不|bù}{难|nán}。', wrong: ['{我|wǒ}{汉语|Hàn·yǔ}{觉得|jué·de}{不|bù}{难|nán}。', '{觉得|jué·de}{我|wǒ}{不|bù}{难|nán}{汉语|Hàn·yǔ}。', '{我|wǒ}{是|shì}{觉得|jué·de}{汉语|Hàn·yǔ}{不|bù}{是|shì}{难|nán}。'], why: '{觉得|juéde} + vélemény-mondat.', point: 3 },
    { q: 'Mit jelent: {你觉得这个菜怎么样|nǐ juéde zhège cài zěnmeyàng}？', a: 'Mit gondolsz, milyen ez az étel?', wrong: ['Érzed az étel illatát?', 'Hogyan kell ezt az ételt elkészíteni?', 'Ki főzte ezt az ételt?'], why: '{觉得|juéde} + {怎么样|zěnmeyàng}: véleményt kér.', point: 3 },
    { q: 'Hogyan kérdezed: „Miért tanulsz kínaiul?"', a: '{你|nǐ}{为什么|wèi·shén·me}{学|xué}{汉语|Hàn·yǔ}？', wrong: ['{你|nǐ}{学|xué}{汉语|Hàn·yǔ}{为什么|wèi·shén·me}{吗|ma}？', '{为什么|wèi·shén·me}{学|xué}{你|nǐ}{汉语|Hàn·yǔ}？', '{你|nǐ}{怎么样|zěn·me·yàng}{学|xué}{汉语|Hàn·yǔ}？'], why: 'A {为什么|wèishénme} az ige előtt áll.', point: 4 },
    { q: 'Mivel kezdődik a válasz a {为什么|wèishénme}-re?', a: '{因为|yīn·wèi}', wrong: ['{所以|suǒ·yǐ}', '{但是|dàn·shì}', '{如果|rú·guǒ}'], why: '{因为|yīnwèi} „mert".', point: 4 },
    { q: 'Mit jelent: {十几个人|shí jǐ ge rén}？', a: 'tizen-egynéhány ember', wrong: ['hány ember?', 'tíz-húsz ember', 'tizenkilenc ember'], why: 'Állításban a {几|jǐ} „néhány".', point: 5 },
    { q: '„húsz-egynéhány éves"', a: '{二十|èr·shí}{多|duō}{岁|suì}', wrong: ['{二十|èr·shí}{岁|suì}{多|duō}', '{多|duō}{二十|èr·shí}{岁|suì}', '{二|èr}{多|duō}{十|shí}{岁|suì}'], why: 'Kerek szám + {多|duō} + mérőszó.', point: 5 },
    { q: 'Mi a különbség a {想|xiǎng} és a {要|yào} között?', a: '{想|xiǎng}: vágy · {要|yào}: eltökélt szándék', wrong: ['{想|xiǎng}: eltökélt szándék · {要|yào}: vágy', '{想|xiǎng} múlt idejű, {要|yào} jelen idejű', 'nincs különbség, mindig felcserélhetők'], why: 'A {要|yào} határozottabb.', point: 1 },
    { q: 'Mit jelent a {旅游|lǚyóu}?', a: 'utazni, turistáskodni', wrong: ['dolgozni, ügyeket intézni', 'költözni, lakást váltani', 'tanulni, vizsgázni'], why: '{去旅游|qù lǚyóu} „utazni megy".' },
    { q: 'Mit jelent: {我觉得有点儿冷|wǒ juéde yǒudiǎnr lěng}。', a: 'Kicsit fázom.', wrong: ['Nagyon hideg van.', 'Nem fázom.', 'Hideg lesz holnap.'], why: '{觉得|juéde} testi érzésre is: „úgy érzem, kicsit hideg van".', point: 3 },
    { q: 'Melyik mondat hibás?', a: '{我|wǒ}{喜欢|xǐ·huan}{最|zuì}{北京|Běi·jīng}。', wrong: ['{我|wǒ}{最|zuì}{喜欢|xǐ·huan}{北京|Běi·jīng}。', '{九月|jiǔ·yuè}{最|zuì}{好|hǎo}。', '{这|zhè}{是|shì}{最|zuì}{好|hǎo}{的|de}{茶|chá}。'], why: 'A {最|zuì} az ige elé kerül: {最喜欢|zuì xǐhuan}.', point: 2 },
    { q: 'Mit jelent: {五六天|wǔ liù tiān}？', a: 'öt-hat nap', wrong: ['ötvenhat nap', 'öt vagy hat hét', 'a hónap 5–6. napja'], why: 'Két szomszédos szám egymás után: becslés.', point: 5 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 2. LECKE — 每, 是不是, 多 + melléknév, időtartam
   ════════════════════════════════════════════════════ */
{
  id: 'l17', no: 17, badge: '2', kicker: 'HSK 2 · 2. lecke', label: 'HSK 2 · 2. lecke',
  title: 'Minden nap hatkor kelek — szokások',
  lead: 'Elmondod a szokásaidat (我每天六点起床), hogy mennyi ideig csinálsz valamit (跑步跑半个小时), megerősítést kérsz (你是不是生病了？), és rákérdezel mértékekre (多高？多长时间？).',
  cando: [
    'Ismétlődő szokást írsz le a 每 + 都 szerkezettel.',
    'Megerősítő kérdést teszel fel: …是不是？',
    'Kifejezed, mennyi ideig tart valami: ige + időtartam.',
    'Mértékre kérdezel: 多 + melléknév (多高, 多远, 多长时间).'
  ],
  intro: [
    'Ebben a leckében a mindennapi rutinról beszélsz: mikor kelsz, mennyit sportolsz, hogy vagy. Az időpont (mikor) — ahogy a HSK 1-ben tanultad — az ige <b>előtt</b> áll. Az időtartam (mennyi ideig) viszont az ige <b>után</b> jön: ez a kínai egyik legfontosabb szórendi szabálya.',
    'Két új kérdéstípust is tanulsz: a {是不是|shì bu shì}-s kérdéssel a sejtésedet ellenőrzöd, a {多|duō} + melléknév kérdéssel mértékre kérdezel.'
  ],
  dialogue: {
    title: 'Reggeli futás',
    scene: 'Reggel hét óra. Anna a parkban fut, és összefut Davidtel, aki fáradtnak tűnik.',
    lines: [
      { who: 'Anna', zh: '{大卫|Dà·wèi}，{你|nǐ}{每天|měi·tiān}{都|dōu}{跑步|pǎo bù}{吗|ma}？', hu: 'David, te minden nap futsz?' },
      { who: 'David', zh: '{是|shì}，{我|wǒ}{每天|měi·tiān}{早上|zǎo·shang}{六|liù}{点|diǎn}{起床|qǐ chuáng}，{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。', hu: 'Igen, minden reggel hatkor kelek, és fél órát futok.' },
      { who: 'Anna', zh: '{你|nǐ}{今天|jīn·tiān}{怎么|zěn·me}{了|le}？{你|nǐ}{是|shì}{不|bu}{是|shì}{生病|shēng bìng}{了|le}？', hu: 'Mi van veled ma? Csak nem lettél beteg?' },
      { who: 'David', zh: '{没有|méi·yǒu}，{昨天|zuó·tiān}{晚上|wǎn·shang}{我|wǒ}{看|kàn}{电视|diàn·shì}{看|kàn}{到|dào}{十二|shí·èr}{点|diǎn}。', hu: 'Nem, csak tegnap este éjfélig tévéztem.' },
      { who: 'Anna', zh: '{你|nǐ}{每天|měi·tiān}{睡|shuì}{几|jǐ}{个|ge}{小时|xiǎo·shí}？', hu: 'Hány órát alszol naponta?' },
      { who: 'David', zh: '{六|liù}{个|ge}{小时|xiǎo·shí}{左右|zuǒ·yòu}。', hu: 'Körülbelül hat órát.' },
      { who: 'Anna', zh: '{太|tài}{少|shǎo}{了|le}！{为了|wèi·le}{身体|shēn·tǐ}，{你|nǐ}{要|yào}{多|duō}{睡|shuì}{一点儿|yì·diǎnr}。', hu: 'Az túl kevés! Az egészséged érdekében többet kell aludnod.' }
    ],
    notes: [
      'A {你怎么了|nǐ zěnme le}？ „mi van veled, mi történt?" — aggódó kérdés, ha valaki furcsán viselkedik vagy rosszul néz ki.',
      'A {看到十二点|kàn dào shí\'èr diǎn} „éjfélig nézte" — a {到|dào} „-ig" itt az ige után áll.',
      'A {多睡一点儿|duō shuì yìdiǎnr} „aludj többet": a {多|duō} az ige előtt „többet"; párja a {少|shǎo} „kevesebbet": {少吃一点儿|shǎo chī yìdiǎnr}.'
    ]
  },
  points: [
    {
      title: '{每|měi}…{都|dōu}', sub: 'minden — szokás, ismétlődés',
      pattern: '{每|měi} + (mérőszó) + főnév + {都|dōu} + ige',
      body: 'A {每|měi} „minden, mindegyik" egy főnév előtt áll, általában mérőszóval: {每个人|měi ge rén} „mindenki", {每本书|měi běn shū} „minden könyv". Időszavaknál a mérőszó elmarad: {每天|měitiān} „minden nap", {每年|měinián} „minden évben". Az ige elé szinte mindig {都|dōu} kerül: {我每天都跑步|wǒ měitiān dōu pǎo bù}.',
      more: [
        'A {都|dōu} a {每|měi}-vel együtt az ismétlődést, a kivételnélküliséget erősíti. Elhagyni is lehet, de a {每|měi} … {都|dōu} a természetes.',
        'A {每个星期|měi ge xīngqī} „minden héten" mérőszóval áll, a {每天|měitiān} nélküle.'
      ],
      examples: [
        { zh: '{我|wǒ}{每天|měi·tiān}{都|dōu}{跑步|pǎo bù}。', hu: 'Minden nap futok.' },
        { zh: '{每|měi}{个|ge}{人|rén}{都|dōu}{有|yǒu}{手机|shǒu·jī}。', hu: 'Mindenkinek van mobilja.' },
        { zh: '{他|tā}{每|měi}{个|ge}{星期|xīng·qī}{都|dōu}{给|gěi}{妈妈|mā·ma}{打|dǎ}{电话|diàn·huà}。', hu: 'Minden héten felhívja az anyját.' }
      ],
      mistakes: [
        { bad: '{每|měi}{人|rén}{都|dōu}{有|yǒu}{手机|shǒu·jī}。', good: '{每|měi}{个|ge}{人|rén}{都|dōu}{有|yǒu}{手机|shǒu·jī}。', why: 'A {每|měi} és a főnév közé mérőszó kell (az időszavak kivételek).' },
        { bad: '{我|wǒ}{跑步|pǎo bù}{每天|měi·tiān}。', good: '{我|wǒ}{每天|měi·tiān}{跑步|pǎo bù}。', why: 'A {每天|měitiān} időhatározó: az ige elé.' }
      ]
    },
    {
      title: '…{是不是|shì bu shì}？', sub: 'megerősítő kérdés: „ugye?", „csak nem…?"',
      pattern: 'A + {是不是|shì bu shì} + állítmány？ · állítás，{是不是|shì bu shì}？',
      body: 'Ha sejtesz valamit, és megerősítést kérsz, a {是不是|shì bu shì} „igaz-e, hogy" kerül az állítmány elé vagy a mondat végére: {你是不是生病了|nǐ shì bu shì shēng bìng le}？ „Csak nem lettél beteg?", {你是中国人，是不是|nǐ shì Zhōngguórén, shì bu shì}？ „Kínai vagy, ugye?"',
      more: [
        'Ez az „igen-nem" kérdés (ige + {不|bu} + ige) általános formájának egy esete. Bármely igével működik: {你去不去|nǐ qù bu qù}？ „Mész vagy nem?", {好不好|hǎo bu hǎo}？ „Jó vagy nem?" Ilyenkor nem kell {吗|ma}.',
        'A középső {不|bu} semleges tónusú: <i>shì bu shì</i>.'
      ],
      examples: [
        { zh: '{你|nǐ}{是|shì}{不|bu}{是|shì}{生病|shēng bìng}{了|le}？', hu: 'Csak nem lettél beteg?' },
        { zh: '{他|tā}{是|shì}{不|bu}{是|shì}{你|nǐ}{的|de}{哥哥|gē·ge}？', hu: 'Ő a bátyád, ugye?' },
        { zh: '{明天|míng·tiān}{你|nǐ}{去|qù}{不|bu}{去|qù}{学校|xué·xiào}？', hu: 'Holnap mész iskolába, vagy nem?' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{是|shì}{不|bu}{是|shì}{生病|shēng bìng}{了|le}{吗|ma}？', good: '{你|nǐ}{是|shì}{不|bu}{是|shì}{生病|shēng bìng}{了|le}？', why: 'Az „ige + {不|bu} + ige" kérdés mellé nem kell {吗|ma}.' }
      ]
    },
    {
      title: 'ige + időtartam', sub: 'mennyi ideig — az ige után',
      pattern: 'A + ige + időtartam · A + ige + tárgy + ige + időtartam',
      body: 'Az <b>időtartam</b> (mennyi ideig tart valami) az ige <b>után</b> áll: {我跑半个小时|wǒ pǎo bàn ge xiǎoshí} „fél órát futok", {我每天睡六个小时|wǒ měitiān shuì liù ge xiǎoshí} „naponta hat órát alszom". Ez ellentétes az időponttal, amely az ige előtt áll: {我六点起床|wǒ liù diǎn qǐ chuáng} „hatkor kelek".',
      more: [
        'Ha tárgy is van, az igét megismétlik: {我跑步跑半个小时|wǒ pǎo bù pǎo bàn ge xiǎoshí}, {他学汉语学了两年|tā xué Hànyǔ xuéle liǎng nián} „két évig tanult kínaiul". Másik megoldás: az időtartam a tárgy elé kerül {的|de}-vel: {学了两年的汉语|xuéle liǎng nián de Hànyǔ}.',
        'Időtartam-szavak: {一个小时|yí ge xiǎoshí} „egy óra (hosszat)", {半个小时|bàn ge xiǎoshí} „fél óra", {十分钟|shí fēnzhōng} „tíz perc", {两天|liǎng tiān} „két nap", {一年|yì nián} „egy év".'
      ],
      tables: [
        { caption: 'Időpont vagy időtartam?',
          head: ['', 'Hely a mondatban', 'Példa'],
          rows: [
            ['időpont (mikor)', 'az ige előtt', '{我|wǒ}{六|liù}{点|diǎn}{起床|qǐ chuáng}。'],
            ['időtartam (mennyi ideig)', 'az ige után', '{我|wǒ}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。'],
            ['mindkettő', 'előtte + utána', '{我|wǒ}{早上|zǎo·shang}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{每天|měi·tiān}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。', hu: 'Naponta fél órát futok.' },
        { zh: '{她|tā}{学|xué}{汉语|Hàn·yǔ}{学|xué}{了|le}{两|liǎng}{年|nián}。', hu: 'Két évig tanult kínaiul.' },
        { zh: '{我|wǒ}{等|děng}{了|le}{你|nǐ}{二十|èr·shí}{分钟|fēn·zhōng}。', hu: 'Húsz percet vártam rád.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{半|bàn}{个|ge}{小时|xiǎo·shí}{跑|pǎo}。', good: '{我|wǒ}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。', why: 'Az időtartam az ige után áll.' }
      ]
    },
    {
      title: '{多|duō} + melléknév', sub: 'mértékre kérdez: {多高|duō gāo}？{多远|duō yuǎn}？{多长时间|duō cháng shíjiān}？',
      pattern: '(A) + {多|duō} + melléknév？',
      body: 'A {多|duō} egy melléknév előtt „mennyire?" kérdést ad: {你多高|nǐ duō gāo}？ „Milyen magas vagy?", {机场多远|jīchǎng duō yuǎn}？ „Milyen messze van a reptér?", {多长时间|duō cháng shíjiān}？ „Mennyi ideig?" Az életkorra kérdező {多大|duō dà} (HSK 1) is ilyen.',
      more: [
        'A válaszban a {多|duō} helyére a mérték kerül: {我一米七|wǒ yì mǐ qī} „egy hetven vagyok", {走路十分钟|zǒu lù shí fēnzhōng} „gyalog tíz perc".',
        'Mindig a „nagy" irányú melléknévvel kérdezünk ({多高|duō gāo}, nem *{多矮|duō ǎi}), mint a magyarban is („milyen magas", nem „milyen alacsony").'
      ],
      examples: [
        { zh: '{你|nǐ}{每天|měi·tiān}{跑|pǎo}{多|duō}{长|cháng}{时间|shí·jiān}？', hu: 'Naponta mennyi ideig futsz?' },
        { zh: '{你|nǐ}{哥哥|gē·ge}{多|duō}{高|gāo}？', hu: 'Milyen magas a bátyád?' },
        { zh: '{你|nǐ}{家|jiā}{离|lí}{这儿|zhèr}{多|duō}{远|yuǎn}？', hu: 'Milyen messze laksz innen?' }
      ]
    },
    {
      title: '{起床|qǐ chuáng} · {跑步|pǎo bù}', sub: 'ige + tárgy összetételek',
      pattern: '{起|qǐ}+{床|chuáng} · {跑|pǎo}+{步|bù} · {睡|shuì}+{觉|jiào}',
      body: 'Sok kínai „ige" valójában <b>ige + tárgy</b> összetétel: {起床|qǐ chuáng} „felkel" (szó szerint „felkel az ágyból"), {跑步|pǎo bù} „fut" („lépést fut"), {睡觉|shuì jiào} „alszik", {生病|shēng bìng} „megbetegszik" („betegséget szül"). Ezeknél a két rész szétválhat: időtartam, {了|le} vagy jelző a kettő közé kerül.',
      more: [
        '{睡了八个小时的觉|shuìle bā ge xiǎoshí de jiào} „nyolc órát aludt", {生了一次病|shēngle yí cì bìng} „egyszer beteg volt". Kezdőként elég, ha az ige megismétlésével oldod meg: {跑步跑半个小时|pǎo bù pǎo bàn ge xiǎoshí}.'
      ],
      examples: [
        { zh: '{我|wǒ}{每天|měi·tiān}{六|liù}{点|diǎn}{起床|qǐ chuáng}。', hu: 'Minden nap hatkor kelek.' },
        { zh: '{他|tā}{生病|shēng bìng}{了|le}，{今天|jīn·tiān}{没|méi}{来|lái}。', hu: 'Megbetegedett, ma nem jött el.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{怎么|zěn·me}{了|le}？', hu: 'Mi van veled? Mi történt?' },
    { zh: '{你|nǐ}{是|shì}{不|bu}{是|shì}{生病|shēng bìng}{了|le}？', hu: 'Csak nem lettél beteg?' },
    { zh: '{多|duō}{长|cháng}{时间|shí·jiān}？', hu: 'Mennyi ideig?' },
    { zh: '{你|nǐ}{要|yào}{多|duō}{睡|shuì}{一点儿|yì·diǎnr}。', hu: 'Többet kell aludnod.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{每|měi}', pinyin: 'měi', hu: 'minden' },
        { zh: '{起床|qǐ chuáng}', pinyin: 'qǐ chuáng', hu: 'felkelni' },
        { zh: '{跑步|pǎo bù}', pinyin: 'pǎo bù', hu: 'futni' },
        { zh: '{早上|zǎo·shang}', pinyin: 'zǎoshang', hu: 'reggel' },
        { zh: '{小时|xiǎo·shí}', pinyin: 'xiǎoshí', hu: 'óra (időtartam)' },
        { zh: '{生病|shēng bìng}', pinyin: 'shēng bìng', hu: 'megbetegedni' },
        { zh: '{身体|shēn·tǐ}', pinyin: 'shēntǐ', hu: 'test, egészség' },
        { zh: '{时间|shí·jiān}', pinyin: 'shíjiān', hu: 'idő' },
        { zh: '{高|gāo}', pinyin: 'gāo', hu: 'magas' },
        { zh: '{长|cháng}', pinyin: 'cháng', hu: 'hosszú' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{左右|zuǒ·yòu}', pinyin: 'zuǒyòu', hu: 'körülbelül' },
        { zh: '{为了|wèi·le}', pinyin: 'wèile', hu: 'valamiért, érdekében' },
        { zh: '{等|děng}', pinyin: 'děng', hu: 'várni' },
        { zh: '{远|yuǎn}', pinyin: 'yuǎn', hu: 'messze' }
      ] }
  ],
  culture: [
    { title: 'Reggeli torna a parkban', text: 'Kínai városokban kora reggel a parkok megtelnek: idősebbek tajcsiznak ({太极拳|tàijíquán}), mások tánccsoportokban mozognak zenére, kalligráfiát gyakorolnak vízzel a járdára, vagy együtt énekelnek. Az esti „tér-tánc" ({广场舞|guǎngchǎngwǔ}) a középkorú asszonyok kedvelt közösségi programja.' },
    { title: 'Korán kelő ország', text: 'Kínában a nap korán kezdődik: sok iskolában fél nyolckor már tanítás van, az utcai reggelizőhelyek ({早点|zǎodiǎn}) hajnalban nyitnak. Reggelire gőzölt töltött zsemlét ({包子|bāozi}), rizskását ({粥|zhōu}) vagy sült tésztarudat ({油条|yóutiáo}) esznek, szójatejjel.' }
  ],
  reading: {
    title: '{大卫|Dà·wèi}{的|de}{一|yì}{天|tiān}', titleHu: 'David napja',
    text: [
      { zh: '{大卫|Dà·wèi}{每天|měi·tiān}{早上|zǎo·shang}{六|liù}{点|diǎn}{起床|qǐ chuáng}，{起床|qǐ chuáng}{以后|yǐ·hòu}{去|qù}{跑步|pǎo bù}。', hu: 'David minden reggel hatkor kel, felkelés után futni megy.' },
      { zh: '{他|tā}{每天|měi·tiān}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。', hu: 'Naponta fél órát fut.' },
      { zh: '{他|tā}{上午|shàng·wǔ}{学习|xué·xí}{三|sān}{个|ge}{小时|xiǎo·shí}{汉语|Hàn·yǔ}，{下午|xià·wǔ}{去|qù}{图书馆|tú·shū·guǎn}{看|kàn}{书|shū}。', hu: 'Délelőtt három órát tanul kínait, délután könyvtárba megy olvasni.', par: true },
      { zh: '{但是|dàn·shì}{他|tā}{晚上|wǎn·shang}{常常|cháng·cháng}{看|kàn}{电视|diàn·shì}{看|kàn}{到|dào}{十二|shí·èr}{点|diǎn}，{每天|měi·tiān}{只|zhǐ}{睡|shuì}{六|liù}{个|ge}{小时|xiǎo·shí}。', hu: 'De este gyakran éjfélig tévézik, és naponta csak hat órát alszik.' },
      { zh: '{安娜|Ān·nà}{觉得|jué·de}{这|zhè}{样|yàng}{对|duì}{身体|shēn·tǐ}{不|bù}{好|hǎo}。', hu: 'Anna szerint ez nem tesz jót az egészségének.', par: true }
    ],
    words: [ { zh: '{只|zhǐ}', hu: 'csak' }, { zh: '{这样|zhè·yàng}', hu: 'így, ez' }, { zh: '{对|duì}', hu: 'számára, -ra/-re' } ],
    questions: [
      { q: 'Mit csinál David felkelés után?', a: 'futni megy', wrong: ['tévét néz', 'könyvtárba megy', 'reggelizik'], why: '{起床以后去跑步|qǐ chuáng yǐhòu qù pǎo bù}.' },
      { q: 'Mennyi ideig tanul délelőtt kínait?', a: 'három órát', wrong: ['fél órát', 'hat órát', 'egy órát'], why: '{学习三个小时汉语|xuéxí sān ge xiǎoshí Hànyǔ}.' },
      { q: 'Miért alszik keveset?', a: 'mert este éjfélig tévézik', wrong: ['mert sokat tanul éjjel', 'mert beteg', 'mert korán kell dolgoznia'], why: '{晚上常常看电视看到十二点|wǎnshang chángcháng kàn diànshì kàn dào shí\'èr diǎn}.' },
      { q: 'Mit gondol erről Anna?', a: 'hogy nem tesz jót az egészségének', wrong: ['hogy így helyes', 'hogy többet kellene futnia', 'hogy kevesebbet kellene tanulnia'], why: '{这样对身体不好|zhèyàng duì shēntǐ bù hǎo}.' }
    ]
  },
  quiz: [
    { q: '„Minden nap futok."', a: '{我|wǒ}{每天|měi·tiān}{都|dōu}{跑步|pǎo bù}。', wrong: ['{我|wǒ}{跑步|pǎo bù}{每天|měi·tiān}{都|dōu}。', '{每|měi}{我|wǒ}{天|tiān}{跑步|pǎo bù}。', '{我|wǒ}{都|dōu}{跑步|pǎo bù}{每天|měi·tiān}。'], why: '{每天|měitiān} + {都|dōu} az ige előtt.', point: 1 },
    { q: '„Mindenkinek van mobilja."', a: '{每|měi}{个|ge}{人|rén}{都|dōu}{有|yǒu}{手机|shǒu·jī}。', wrong: ['{每|měi}{人|rén}{有|yǒu}{都|dōu}{手机|shǒu·jī}。', '{都|dōu}{每|měi}{个|ge}{人|rén}{有|yǒu}{手机|shǒu·jī}。', '{每|měi}{个|ge}{人|rén}{有|yǒu}{手机|shǒu·jī}{都|dōu}。'], why: '{每|měi} + mérőszó + főnév + {都|dōu} + ige.', point: 1 },
    { q: 'Mit jelent: {你是不是生病了|nǐ shì bu shì shēng bìng le}？', a: 'Csak nem lettél beteg?', wrong: ['Beteg voltál?', 'Mikor lettél beteg?', 'Nem vagy beteg.'], why: '{是不是|shì bu shì}: megerősítést kérő kérdés.', point: 2 },
    { q: 'Melyik kérdés hibás?', a: '{你|nǐ}{去|qù}{不|bu}{去|qù}{吗|ma}？', wrong: ['{你|nǐ}{去|qù}{不|bu}{去|qù}？', '{你|nǐ}{去|qù}{吗|ma}？', '{你|nǐ}{是|shì}{不|bu}{是|shì}{要|yào}{去|qù}？'], why: 'Az „ige + {不|bu} + ige" kérdés mellé nincs {吗|ma}.', point: 2 },
    { q: '„Fél órát futok."', a: '{我|wǒ}{跑|pǎo}{半|bàn}{个|ge}{小时|xiǎo·shí}。', wrong: ['{我|wǒ}{半|bàn}{个|ge}{小时|xiǎo·shí}{跑|pǎo}。', '{半|bàn}{个|ge}{小时|xiǎo·shí}{我|wǒ}{跑|pǎo}{了|le}{吗|ma}。', '{我|wǒ}{跑|pǎo}{小时|xiǎo·shí}{半|bàn}{个|ge}。'], why: 'Az időtartam az ige után áll.', point: 3 },
    { q: 'Hová kerül az időpont és hová az időtartam?', a: 'időpont az ige elé, időtartam az ige után', wrong: ['időpont az ige után, időtartam az ige elé', 'mindkettő az ige elé kerül', 'mindkettő a mondat legvégére kerül'], why: '{我六点起床|wǒ liù diǎn qǐ chuáng} · {我睡六个小时|wǒ shuì liù ge xiǎoshí}.', point: 3 },
    { q: '„Két évig tanult kínaiul."', a: '{她|tā}{学|xué}{汉语|Hàn·yǔ}{学|xué}{了|le}{两|liǎng}{年|nián}。', wrong: ['{她|tā}{两|liǎng}{年|nián}{学|xué}{了|le}{汉语|Hàn·yǔ}。', '{她|tā}{学|xué}{了|le}{汉语|Hàn·yǔ}{两|liǎng}{年|nián}{学|xué}。', '{她|tā}{学|xué}{两|liǎng}{年|nián}{了|le}{汉语|Hàn·yǔ}{学|xué}。'], why: 'Tárggyal: az igét megismétlik, az időtartam a második után.', point: 3 },
    { q: 'Hogyan kérdezed: „Milyen magas vagy?"', a: '{你|nǐ}{多|duō}{高|gāo}？', wrong: ['{你|nǐ}{高|gāo}{多|duō}？', '{你|nǐ}{多少|duō·shao}{高|gāo}？', '{你|nǐ}{是|shì}{高|gāo}{吗|ma}{多|duō}？'], why: '{多|duō} + melléknév.', point: 4 },
    { q: 'Mit jelent: {多长时间|duō cháng shíjiān}？', a: 'Mennyi ideig?', wrong: ['Hány óra van?', 'Milyen hosszú?', 'Mikor?'], why: '{多长时间|duō cháng shíjiān} „mennyi idő".', point: 4 },
    { q: 'Mit jelent a {起床|qǐ chuáng}?', a: 'felkelni (az ágyból)', wrong: ['lefeküdni', 'ágyat venni', 'korán kelni'], why: '{起|qǐ} „felkel" + {床|chuáng} „ágy".', point: 5 },
    { q: 'Mit jelent: {他生病了|tā shēng bìng le}。', a: 'Megbetegedett.', wrong: ['Meggyógyult.', 'Orvoshoz ment.', 'Egészséges.'], why: '{生病|shēng bìng} „megbetegszik".', point: 5 },
    { q: 'Mit jelent: {你怎么了|nǐ zěnme le}？', a: 'Mi van veled? Mi történt?', wrong: ['Hányadika van ma?', 'Hogyan csináltad ezt?', 'Hová mész most este?'], why: 'Aggódó kérdés, ha valami nincs rendben.' },
    { q: '„Aludj többet!"', a: '{你|nǐ}{要|yào}{多|duō}{睡|shuì}{一点儿|yì·diǎnr}。', wrong: ['{你|nǐ}{要|yào}{睡|shuì}{多|duō}{一点儿|yì·diǎnr}{了|le}。', '{你|nǐ}{多|duō}{睡|shuì}{要|yào}{一点儿|yì·diǎnr}。', '{一点儿|yì·diǎnr}{你|nǐ}{多|duō}{睡|shuì}{要|yào}。'], why: '{多|duō} + ige + {一点儿|yìdiǎnr} „többet ….".' },
    { q: 'Melyik mondat helyes?', a: '{他|tā}{每|měi}{个|ge}{星期|xīng·qī}{都|dōu}{给|gěi}{妈妈|mā·ma}{打|dǎ}{电话|diàn·huà}。', wrong: ['{他|tā}{每|měi}{星期|xīng·qī}{个|ge}{都|dōu}{打|dǎ}{电话|diàn·huà}。', '{他|tā}{给|gěi}{妈妈|mā·ma}{打|dǎ}{电话|diàn·huà}{每|měi}{个|ge}{星期|xīng·qī}。', '{每|měi}{他|tā}{个|ge}{星期|xīng·qī}{打|dǎ}{电话|diàn·huà}。'], why: '{每个星期|měi ge xīngqī} + {都|dōu} az ige előtt.', point: 1 },
    { q: 'Mit jelent a {小时|xiǎoshí}?', a: 'óra (időtartam)', wrong: ['óra (időpont)', 'perc', 'kis idő'], why: '{两个小时|liǎng ge xiǎoshí} „két órán át"; időpont: {两点|liǎng diǎn}.', point: 3 },
    { q: '{你明天去不去|nǐ míngtiān qù bu qù}？ — igenlő válasz:', a: '{去|qù}。', wrong: ['{不|bu}{去|qù}{吗|ma}。', '{是|shì}{不|bu}{是|shì}。', '{去|qù}{不|bu}{去|qù}。'], why: 'Az igenlő válasz az ige: {去|qù}.', point: 2 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 3. LECKE — 的-szerkezet, színek, 一下, oldalak
   ════════════════════════════════════════════════════ */
{
  id: 'l18', no: 18, badge: '3', kicker: 'HSK 2 · 3. lecke', label: 'HSK 2 · 3. lecke',
  title: 'A bal oldali piros az enyém — dolgok azonosítása',
  lead: 'Megmondod, melyik dolog kié (红色的是我的), elhelyezed jobbra-balra, színeket nevezel meg, és udvariasan, „egy kicsit" kérsz valamit (看一下).',
  cando: [
    'A 的 szerkezettel főnév nélkül utalsz egy dologra: 红色的, 我的, 新的.',
    'Színeket mondasz: 红色, 白色, 黑色.',
    'Oldalakat nevezel meg: 左边, 右边, 旁边.',
    'Rövid, udvarias cselekvést kérsz: ige + 一下.'
  ],
  intro: [
    'Ha sok egyforma dolog közül kell kiválasztani egyet — bőröndöket a reptéren, kabátokat a fogason —, nem ismételgeted a főnevet: „a piros", „az enyém", „a bal oldali". A kínai erre a {的|de} szerkezetet használja: {红色的|hóngsè de} „a piros (dolog)".',
    'A lecke másik hasznos eleme az {一下|yíxià}: az ige után téve a cselekvést rövidebbé és udvariasabbá teszi — {看一下|kàn yíxià} „nézd meg (egy pillanatra)".'
  ],
  dialogue: {
    title: 'A csomagszalagnál',
    scene: 'Anna és David a reptéren várják a bőröndjeiket. Sok egyforma bőrönd jön a szalagon.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{哪|nǎ}{个|ge}{是|shì}{你|nǐ}{的|de}{箱子|xiāng·zi}？', hu: 'Anna, melyik a bőröndöd?' },
      { who: 'Anna', zh: '{左边|zuǒ·bian}{那|nà}{个|ge}{红色|hóng·sè}{的|de}{是|shì}{我|wǒ}{的|de}。', hu: 'A bal oldali piros az enyém.' },
      { who: 'David', zh: '{这|zhè}{个|ge}{白色|bái·sè}{的|de}{呢|ne}？{是|shì}{不|bu}{是|shì}{你|nǐ}{的|de}？', hu: 'És ez a fehér? Az a tiéd?' },
      { who: 'Anna', zh: '{不|bú}{是|shì}，{那|nà}{是|shì}{别|bié}{人|rén}{的|de}。{你|nǐ}{的|de}{呢|ne}？', hu: 'Nem, az valaki másé. És a tiéd?' },
      { who: 'David', zh: '{我|wǒ}{的|de}{是|shì}{黑色|hēi·sè}{的|de}，{在|zài}{右边|yòu·bian}，{新|xīn}{的|de}{那|nà}{个|ge}。', hu: 'Az enyém fekete, jobbra van, az az új.' },
      { who: 'Anna', zh: '{你|nǐ}{等|děng}{一下|yí·xià}，{我|wǒ}{去|qù}{拿|ná}。', hu: 'Várj egy kicsit, megyek, leveszem.' },
      { who: 'David', zh: '{谢谢|xiè·xie}！{我|wǒ}{看|kàn}{一下|yí·xià}{手机|shǒu·jī}，{王明|Wáng Míng}{可能|kě·néng}{在|zài}{外边|wài·bian}{等|děng}{我们|wǒ·men}。', hu: 'Köszi! Megnézem gyorsan a telefonom, Wang Ming talán kint vár ránk.' }
    ],
    notes: [
      'A {别人|biérén} „más, mások": {别人的|biérén de} „másé".',
      'A {箱子|xiāngzi} „láda, bőrönd". A {拿|ná} „fog, visz, levesz (kézzel)".',
      'A {左边|zuǒbian} és a {右边|yòubian} második szótagja beszédben gyakran semleges: <i>zuǒbian</i>, <i>yòubian</i>.'
    ]
  },
  points: [
    {
      title: '…{的|de}', sub: '„a piros", „az enyém" — főnév nélkül',
      pattern: 'melléknév / névmás / főnév + {的|de}（+ elhagyott főnév）',
      body: 'Ha a helyzetből tudjuk, miről beszélünk, a {的|de} utáni főnév <b>elmaradhat</b>: {红色的(箱子)|hóngsè de (xiāngzi)} „a piros (bőrönd)", {我的(箱子)|wǒ de (xiāngzi)} „az enyém", {新的|xīn de} „az új". A magyar is ezt teszi: „a piros az enyém".',
      more: [
        'Bármilyen jelző után működik: {老师的|lǎoshī de} „a tanáré", {中国的|Zhōngguó de} „a kínai (gyártmányú)", {昨天买的|zuótiān mǎi de} „a tegnap vett".',
        'Kérdés: {哪个是你的|nǎge shì nǐ de}？ „Melyik a tiéd?" — válasz: {红色的是我的|hóngsè de shì wǒ de}.'
      ],
      examples: [
        { zh: '{红色|hóng·sè}{的|de}{是|shì}{我|wǒ}{的|de}。', hu: 'A piros az enyém.' },
        { zh: '{这|zhè}{本|běn}{书|shū}{是|shì}{老师|lǎo·shī}{的|de}。', hu: 'Ez a könyv a tanáré.' },
        { zh: '{我|wǒ}{不|bú}{要|yào}{大|dà}{的|de}，{我|wǒ}{要|yào}{小|xiǎo}{的|de}。', hu: 'Nem a nagyot kérem, hanem a kicsit.' }
      ],
      mistakes: [
        { bad: '{红色|hóng·sè}{是|shì}{我|wǒ}{的|de}。（= a piros az enyém）', good: '{红色|hóng·sè}{的|de}{是|shì}{我|wǒ}{的|de}。', why: 'A {的|de} nélkül a mondat azt jelentené: „a piros szín az enyém".' }
      ]
    },
    {
      title: '{红色|hóngsè} · {白色|báisè} · {黑色|hēisè}', sub: 'színek',
      pattern: 'szín + {色|sè} · {红色|hóng·sè}{的|de} + főnév',
      body: 'A színnevek egy írásjegyből és a {色|sè} „szín" szóból állnak: {红色|hóngsè} „piros", {白色|báisè} „fehér", {黑色|hēisè} „fekete". Jelzőként {的|de}-vel kötjük a főnévhez: {红色的箱子|hóngsè de xiāngzi} „piros bőrönd"; egy szótagú alakjuk közvetlenül is állhat: {红茶|hóngchá} „fekete tea" (szó szerint „vörös tea"!).',
      more: [
        'Kérdés: {什么颜色|shénme yánsè}？ „Milyen színű?" — {你喜欢什么颜色|nǐ xǐhuan shénme yánsè}？',
        'A piros Kínában a szerencse és az ünnep színe (esküvő, újév); a fehér hagyományosan a gyászé.'
      ],
      tables: [
        { caption: 'Színek',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{红色|hóng·sè}', 'piros'], ['{白色|bái·sè}', 'fehér'], ['{黑色|hēi·sè}', 'fekete'],
            ['{黄色|huáng·sè}', 'sárga'], ['{蓝色|lán·sè}', 'kék'], ['{绿色|lǜ·sè}', 'zöld']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{的|de}{箱子|xiāng·zi}{是|shì}{红色|hóng·sè}{的|de}。', hu: 'A bőröndöm piros.' },
        { zh: '{你|nǐ}{喜欢|xǐ·huan}{什么|shén·me}{颜色|yán·sè}？', hu: 'Milyen színt szeretsz?' },
        { zh: '{我|wǒ}{要|yào}{白色|bái·sè}{的|de}。', hu: 'A fehéret kérem.' }
      ]
    },
    {
      title: '{左边|zuǒbian} · {右边|yòubian} · {旁边|pángbiān}', sub: 'bal oldal, jobb oldal, mellett',
      pattern: '(főnév +) {左边|zuǒ·bian} / {右边|yòu·bian} / {旁边|páng·biān}',
      body: 'Az oldalakat a {边|biān} „szél, oldal" szóval képzett helyszavak adják: {左边|zuǒbian} „bal oldal", {右边|yòubian} „jobb oldal", {旁边|pángbiān} „mellett", {外边|wàibian} „kint", {里边|lǐbian} „bent". A HSK 1 helyszavaihoz hasonlóan a főnév után állnak: {银行旁边|yínháng pángbiān} „a bank mellett".',
      more: [
        'Jelzőként a {的|de} köti őket: {左边的箱子|zuǒbian de xiāngzi} „a bal oldali bőrönd", vagy mutató szóval: {左边那个|zuǒbian nàge} „az ott balra".',
        'A {边|biān} helyett {面|miàn} is állhat: {左面|zuǒmiàn}, {外面|wàimiàn} — jelentésük ugyanaz.'
      ],
      examples: [
        { zh: '{左边|zuǒ·bian}{那|nà}{个|ge}{是|shì}{我|wǒ}{的|de}。', hu: 'Az ott balra az enyém.' },
        { zh: '{医院|yī·yuàn}{在|zài}{学校|xué·xiào}{旁边|páng·biān}。', hu: 'A kórház az iskola mellett van.' },
        { zh: '{他|tā}{在|zài}{外边|wài·bian}{等|děng}{我们|wǒ·men}。', hu: 'Kint vár ránk.' }
      ]
    },
    {
      title: 'ige + {一下|yíxià}', sub: 'egy kicsit, egy pillanatra — udvariasan',
      pattern: 'ige + {一下|yí·xià} (+ tárgy)',
      body: 'Az {一下|yíxià} az ige után azt jelzi, hogy a cselekvés <b>rövid, könnyed</b>: {看一下|kàn yíxià} „megnéz egy pillanatra", {等一下|děng yíxià} „vár egy kicsit". Kérésben udvariassá, puhává teszi a mondatot: {你等一下|nǐ děng yíxià} „várj egy kicsit", {请介绍一下|qǐng jièshào yíxià} „kérem, mutassa be (röviden)".',
      more: [
        'Hasonló hatású az ige megkettőzése: {看看|kànkan} = {看一下|kàn yíxià}. Ezt a HSK 2 8. leckéjében veszed részletesen.',
        'Az {一|yī} itt <i>yí</i>, mert a {下|xià} 4. tónusú.'
      ],
      examples: [
        { zh: '{你|nǐ}{等|děng}{一下|yí·xià}。', hu: 'Várj egy kicsit.' },
        { zh: '{我|wǒ}{看|kàn}{一下|yí·xià}{手机|shǒu·jī}。', hu: 'Megnézem gyorsan a telefonom.' },
        { zh: '{请|qǐng}{你|nǐ}{介绍|jiè·shào}{一下|yí·xià}{你|nǐ}{自己|zì·jǐ}。', hu: 'Kérlek, mutatkozz be röviden.' }
      ],
      mistakes: [
        { bad: '{一下|yí·xià}{等|děng}', good: '{等|děng}{一下|yí·xià}', why: 'Az {一下|yíxià} az ige után áll.' }
      ]
    },
    {
      title: '{哪个|nǎge} · {这个|zhège} · {那个|nàge}', sub: 'választás: melyik?',
      pattern: '{哪|nǎ}（+ szám）+ mérőszó + (főnév)？',
      body: 'A {哪|nǎ} „melyik" mérőszóval egy csoportból kérdez rá egyre: {哪个是你的|nǎge shì nǐ de}？ „Melyik a tiéd?", {你要哪件|nǐ yào nǎ jiàn}？ „Melyik ruhát kéred?" A válaszban {这个|zhège} / {那个|nàge}, vagy jelzős {的|de}-szerkezet: {左边那个红色的|zuǒbian nàge hóngsè de} „az ott balra, a piros".',
      examples: [
        { zh: '{哪|nǎ}{个|ge}{是|shì}{你|nǐ}{的|de}{箱子|xiāng·zi}？', hu: 'Melyik a bőröndöd?' },
        { zh: '{你|nǐ}{喜欢|xǐ·huan}{哪|nǎ}{个|ge}？', hu: 'Melyik tetszik?' }
      ]
    }
  ],
  phrases: [
    { zh: '{哪|nǎ}{个|ge}{是|shì}{你|nǐ}{的|de}？', hu: 'Melyik a tiéd?' },
    { zh: '{红色|hóng·sè}{的|de}{是|shì}{我|wǒ}{的|de}。', hu: 'A piros az enyém.' },
    { zh: '{你|nǐ}{等|děng}{一下|yí·xià}。', hu: 'Várj egy kicsit.' },
    { zh: '{什么|shén·me}{颜色|yán·sè}？', hu: 'Milyen színű?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{左边|zuǒ·bian}', pinyin: 'zuǒbian', hu: 'bal oldal' },
        { zh: '{右边|yòu·bian}', pinyin: 'yòubian', hu: 'jobb oldal' },
        { zh: '{旁边|páng·biān}', pinyin: 'pángbiān', hu: 'mellett' },
        { zh: '{红色|hóng·sè}', pinyin: 'hóngsè', hu: 'piros' },
        { zh: '{白色|bái·sè}', pinyin: 'báisè', hu: 'fehér' },
        { zh: '{黑色|hēi·sè}', pinyin: 'hēisè', hu: 'fekete' },
        { zh: '{颜色|yán·sè}', pinyin: 'yánsè', hu: 'szín' },
        { zh: '{一下|yí·xià}', pinyin: 'yíxià', hu: 'egy kicsit (ige után)' },
        { zh: '{新|xīn}', pinyin: 'xīn', hu: 'új' },
        { zh: '{别人|bié·rén}', pinyin: 'biérén', hu: 'más(ok)' },
        { zh: '{可能|kě·néng}', pinyin: 'kěnéng', hu: 'talán, lehet' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{箱子|xiāng·zi}', pinyin: 'xiāngzi', hu: 'bőrönd, láda' },
        { zh: '{拿|ná}', pinyin: 'ná', hu: 'fog, visz' },
        { zh: '{外边|wài·bian}', pinyin: 'wàibian', hu: 'kint' },
        { zh: '{介绍|jiè·shào}', pinyin: 'jièshào', hu: 'bemutatni' }
      ] }
  ],
  culture: [
    { title: 'A piros szín', text: 'A piros Kínában a szerencse, az öröm és az ünnep színe. Újévkor piros papírra írt jókívánságokat ragasztanak az ajtóra, piros borítékban ({红包|hóngbāo}) adnak pénzt a gyerekeknek, és a menyasszony hagyományosan pirosban esküszik. A tőzsdei grafikonokon Kínában a piros jelzi az emelkedést, a zöld az esést — épp fordítva, mint nálunk.' },
    { title: 'Fekete tea = vörös tea', text: 'Amit mi „fekete teának" hívunk, az kínaiul {红茶|hóngchá} „vörös tea" — a főzet színéről kapta a nevét. A kínai {黑茶|hēichá} „fekete tea" egy másik, erjesztett teafajta (például a pu-erh). Teázóban ezért érdemes pontosan mondani, mit kérsz.' }
  ],
  reading: {
    title: '{在|zài}{机场|jī·chǎng}', titleHu: 'A reptéren',
    text: [
      { zh: '{今天|jīn·tiān}{我|wǒ}{和|hé}{大卫|Dà·wèi}{从|cóng}{上海|Shàng·hǎi}{回|huí}{北京|Běi·jīng}。', hu: 'Ma Daviddel Sanghajból jöttünk vissza Pekingbe.' },
      { zh: '{在|zài}{机场|jī·chǎng}，{有|yǒu}{很|hěn}{多|duō}{箱子|xiāng·zi}，{红色|hóng·sè}{的|de}、{白色|bái·sè}{的|de}、{黑色|hēi·sè}{的|de}……', hu: 'A reptéren rengeteg bőrönd volt: pirosak, fehérek, feketék…' },
      { zh: '{我|wǒ}{的|de}{箱子|xiāng·zi}{是|shì}{红色|hóng·sè}{的|de}，{大卫|Dà·wèi}{的|de}{是|shì}{黑色|hēi·sè}{的|de}。', hu: 'Az én bőröndöm piros, Davidé fekete.', par: true },
      { zh: '{大卫|Dà·wèi}{的|de}{箱子|xiāng·zi}{在|zài}{右边|yòu·bian}，{很|hěn}{新|xīn}，{是|shì}{他|tā}{在|zài}{上海|Shàng·hǎi}{买|mǎi}{的|de}。', hu: 'David bőröndje jobbra volt, egészen új, Sanghajban vette.' },
      { zh: '{王明|Wáng Míng}{在|zài}{外边|wài·bian}{等|děng}{我们|wǒ·men}，{他|tā}{旁边|páng·biān}{是|shì}{他|tā}{的|de}{新|xīn}{车|chē}。', hu: 'Wang Ming kint várt ránk, mellette volt az új autója.', par: true }
    ],
    words: [ { zh: '{从|cóng}', hu: '-ból/-ből, -tól/-től' } ],
    questions: [
      { q: 'Honnan jöttek vissza?', a: 'Sanghajból', wrong: ['Pekingből', 'Amerikából', 'Magyarországról'], why: '{从上海回北京|cóng Shànghǎi huí Běijīng}.' },
      { q: 'Milyen színű David bőröndje?', a: 'fekete', wrong: ['piros', 'fehér', 'kék'], why: '{大卫的是黑色的|Dàwèi de shì hēisè de}.' },
      { q: 'Hol vette David a bőröndjét?', a: 'Sanghajban', wrong: ['Pekingben', 'a reptéren', 'nem derül ki'], why: '{是他在上海买的|shì tā zài Shànghǎi mǎi de}.' },
      { q: 'Mi volt Wang Ming mellett?', a: 'az új autója', wrong: ['egy piros bőrönd', 'David', 'egy taxi'], why: '{他旁边是他的新车|tā pángbiān shì tā de xīn chē}.' }
    ]
  },
  quiz: [
    { q: '„A piros az enyém."', a: '{红色|hóng·sè}{的|de}{是|shì}{我|wǒ}{的|de}。', wrong: ['{红色|hóng·sè}{是|shì}{我|wǒ}{的|de}{的|de}。', '{我|wǒ}{的|de}{是|shì}{红色|hóng·sè}{吗|ma}。', '{的|de}{红色|hóng·sè}{是|shì}{我|wǒ}。'], why: 'Melléknév + {的|de}: „a piros (dolog)".', point: 1 },
    { q: 'Mit jelent: {这本书是老师的|zhè běn shū shì lǎoshī de}。', a: 'Ez a könyv a tanáré.', wrong: ['Ez a tanár könyve?', 'A tanár ezt a könyvet írta.', 'Ez a tanárnak szóló könyv.'], why: '{老师的|lǎoshī de} „a tanáré".', point: 1 },
    { q: '„Nem a nagyot kérem, hanem a kicsit."', a: '{我|wǒ}{不|bú}{要|yào}{大|dà}{的|de}，{我|wǒ}{要|yào}{小|xiǎo}{的|de}。', wrong: ['{我|wǒ}{不|bú}{要|yào}{大|dà}，{我|wǒ}{要|yào}{小|xiǎo}。', '{我|wǒ}{要|yào}{不|bú}{大|dà}{的|de}{小|xiǎo}{的|de}。', '{大|dà}{的|de}{我|wǒ}{不|bù}，{小|xiǎo}{的|de}{要|yào}。'], why: 'A főnév elhagyható, a {的|de} nem.', point: 1 },
    { q: 'Mit jelent a {黑色|hēisè}?', a: 'fekete', wrong: ['fehér', 'piros', 'sötétkék'], why: '{黑|hēi} „fekete" + {色|sè} „szín".', point: 2 },
    { q: 'Hogyan kérdezed: „Milyen színű?"', a: '{什么|shén·me}{颜色|yán·sè}？', wrong: ['{哪|nǎ}{色|sè}？', '{颜色|yán·sè}{怎么|zěn·me}？', '{多少|duō·shao}{颜色|yán·sè}？'], why: '{什么颜色|shénme yánsè}.', point: 2 },
    { q: 'Mit jelent kínaiul a {红茶|hóngchá}?', a: 'fekete tea (szó szerint „vörös tea")', wrong: ['vörösbor (szó szerint „piros ital")', 'zöld tea (szó szerint „piros levél")', 'gyümölcstea (szó szerint „piros gyümölcs")'], why: 'A főzet színéről kapta a nevét.', point: 2 },
    { q: '„a bank mellett"', a: '{银行|yín·háng}{旁边|páng·biān}', wrong: ['{旁边|páng·biān}{银行|yín·háng}', '{银行|yín·háng}{的|de}{旁|páng}', '{在|zài}{旁边|páng·biān}{的|de}{银行|yín·háng}{里|li}'], why: 'Főnév + helyszó.', point: 3 },
    { q: 'Mit jelent a {右边|yòubian}?', a: 'jobb oldal', wrong: ['bal oldal', 'mellett', 'kint'], why: '{左边|zuǒbian} bal · {右边|yòubian} jobb.', point: 3 },
    { q: '„az ott balra (az a bal oldali)"', a: '{左边|zuǒ·bian}{那|nà}{个|ge}', wrong: ['{那|nà}{个|ge}{左|zuǒ}', '{左|zuǒ}{那|nà}{边|biān}{个|ge}', '{边|biān}{左|zuǒ}{那|nà}{个|ge}'], why: 'Hely + mutató szó + mérőszó.', point: 3 },
    { q: '„Várj egy kicsit."', a: '{你|nǐ}{等|děng}{一下|yí·xià}。', wrong: ['{你|nǐ}{一下|yí·xià}{等|děng}。', '{等|děng}{你|nǐ}{一下|yí·xià}{吧|ba}{吗|ma}。', '{一下|yí·xià}{你|nǐ}{等|děng}。'], why: 'Ige + {一下|yíxià}.', point: 4 },
    { q: 'Mit tesz hozzá az {一下|yíxià} a {看一下|kàn yíxià} kifejezéshez?', a: 'rövidebbé, udvariasabbá teszi: „megnéz egy pillanatra"', wrong: ['múlt időt ad: „megnézte"', 'egyszeri alkalmat számol: „egyszer nézte"', 'tagadást ad: „nem nézi meg"'], why: 'Az {一下|yíxià} rövid, könnyed cselekvést jelöl.', point: 4 },
    { q: 'Hogyan ejted az {一|yī}-t az {一下|yíxià} kifejezésben?', a: 'yí', wrong: ['yī', 'yì', 'yǐ'], why: 'A {下|xià} 4. tónusú: előtte <i>yí</i>.', point: 4 },
    { q: '„Melyik a bőröndöd?"', a: '{哪|nǎ}{个|ge}{是|shì}{你|nǐ}{的|de}{箱子|xiāng·zi}？', wrong: ['{什么|shén·me}{是|shì}{你|nǐ}{的|de}{箱子|xiāng·zi}？', '{你|nǐ}{的|de}{箱子|xiāng·zi}{是|shì}{哪|nǎ}{吗|ma}？', '{哪|nǎ}{是|shì}{箱子|xiāng·zi}{你|nǐ}？'], why: '{哪|nǎ} + mérőszó: választásra kérdez.', point: 5 },
    { q: 'Mit jelent: {那是别人的|nà shì biérén de}。', a: 'Az valaki másé.', wrong: ['Az a te dolgod.', 'Az senkié.', 'Az mindenkié.'], why: '{别人|biérén} „más(ok)".', point: 1 },
    { q: 'Melyik mondat helyes?', a: '{我|wǒ}{的|de}{箱子|xiāng·zi}{是|shì}{红色|hóng·sè}{的|de}。', wrong: ['{我|wǒ}{的|de}{箱子|xiāng·zi}{很|hěn}{红色|hóng·sè}{的|de}。', '{我|wǒ}{的|de}{箱子|xiāng·zi}{红色|hóng·sè}{是|shì}。', '{我|wǒ}{箱子|xiāng·zi}{是|shì}{的|de}{红色|hóng·sè}。'], why: '„A bőröndöm piros" = „a bőröndöm piros-féle": {是红色的|shì hóngsè de}.', point: 2 },
    { q: 'Mit jelent a {可能|kěnéng}?', a: 'talán, lehet, hogy', wrong: ['biztosan', 'tud, képes', 'soha'], why: '{他可能在外边|tā kěnéng zài wàibian} „talán kint van".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 4. LECKE — 是…的 (ki?), …的时候, 已经…了, 帮, két tárgy
   ════════════════════════════════════════════════════ */
{
  id: 'l19', no: 19, badge: '4', kicker: 'HSK 2 · 4. lecke', label: 'HSK 2 · 4. lecke',
  title: 'Ki ajánlotta? — segítség és új munka',
  lead: 'Megmondod, ki tett valamit (是张老师介绍的), hogy valami már megtörtént (已经…了), mi volt, amikor… (…的时候), és két tárgyas igékkel beszélsz: 教他英语, 给我一本书.',
  cando: [
    'A 是…的 szerkezettel kiemeled, ki tett valamit.',
    'Időt adsz meg mellékmondattal: …的时候.',
    'Elmondod, hogy valami már megtörtént: 已经…了.',
    'Segítségről beszélsz (帮 + valaki + ige), és két tárgyas igéket használsz: 教, 给, 问, 送.'
  ],
  intro: [
    'Anna munkát talált: hetente angolt tanít egy kínai kisfiúnak. Liu Fang mindent tudni akar — ki segített, mikor kezdte, hogy megy. A beszélgetésből megtanulod, hogyan emeled ki a cselekvőt ({是|shì} … {的|de}), és hogyan mondod, hogy valami <b>már</b> megtörtént.',
    'Új szórendi minta is jön: a „tanít valakinek valamit" típusú igék után előbb a személy, aztán a dolog áll — a magyar ragokat a sorrend pótolja.'
  ],
  dialogue: {
    title: 'Az új munka',
    scene: 'Liu Fang és Anna a könyvtár előtt találkoznak. Liu Fang hallotta, hogy Annának munkája van.',
    lines: [
      { who: 'Liu Fang', zh: '{安娜|Ān·nà}，{听说|tīng·shuō}{你|nǐ}{有|yǒu}{新|xīn}{工作|gōng·zuò}{了|le}？', hu: 'Anna, hallom, új munkád van?' },
      { who: 'Anna', zh: '{对|duì}，{我|wǒ}{每|měi}{个|ge}{星期|xīng·qī}{教|jiāo}{一|yí}{个|ge}{孩子|hái·zi}{英语|Yīng·yǔ}。', hu: 'Igen, hetente angolt tanítok egy gyereknek.' },
      { who: 'Liu Fang', zh: '{这|zhè}{个|ge}{工作|gōng·zuò}{是|shì}{谁|shéi}{帮|bāng}{你|nǐ}{找|zhǎo}{的|de}？', hu: 'Ki segített megtalálni ezt a munkát?' },
      { who: 'Anna', zh: '{是|shì}{张|Zhāng}{老师|lǎo·shī}{介绍|jiè·shào}{的|de}。{孩子|hái·zi}{的|de}{妈妈|mā·ma}{是|shì}{她|tā}{的|de}{朋友|péng·you}。', hu: 'Zhang tanárnő ajánlott be. A gyerek anyja a barátnője.' },
      { who: 'Liu Fang', zh: '{你|nǐ}{是|shì}{什么|shén·me}{时候|shí·hou}{开始|kāi·shǐ}{的|de}？', hu: 'Mikor kezdted?' },
      { who: 'Anna', zh: '{上|shàng}{个|ge}{月|yuè}。{我|wǒ}{已经|yǐ·jīng}{去|qù}{了|le}{四|sì}{次|cì}{了|le}。', hu: 'Múlt hónapban. Már négyszer voltam ott.' },
      { who: 'Liu Fang', zh: '{孩子|hái·zi}{喜欢|xǐ·huan}{你|nǐ}{吗|ma}？', hu: 'Kedvel téged a gyerek?' },
      { who: 'Anna', zh: '{我|wǒ}{第一|dì·yī}{次|cì}{去|qù}{的|de}{时候|shí·hou}，{他|tā}{不|bù}{想|xiǎng}{说|shuō}{话|huà}。{现在|xiàn·zài}{我们|wǒ·men}{已经|yǐ·jīng}{是|shì}{好|hǎo}{朋友|péng·you}{了|le}！', hu: 'Amikor először mentem, nem akart beszélni. Most már jó barátok vagyunk!' }
    ],
    notes: [
      'A {听说|tīngshuō} „úgy hallottam" a mondat elején áll: {听说你有新工作了|tīngshuō nǐ yǒu xīn gōngzuò le} „hallom, új munkád van".',
      'A {次|cì} „alkalom, -szor": {四次|sì cì} „négyszer", {第一次|dì-yī cì} „első alkalommal, először".',
      'A {开始|kāishǐ} „kezd, elkezdődik": {我是上个月开始的|wǒ shì shàng ge yuè kāishǐ de} „a múlt hónapban kezdtem".'
    ]
  },
  points: [
    {
      title: '{是|shì} … {的|de}', sub: 'ki tette? — a cselekvő kiemelése',
      pattern: '(A +) {是|shì} + ki + ige + {的|de}',
      body: 'A HSK 1 15. leckéjében a {是|shì} … {的|de} egy már megtörtént dolog körülményeit emelte ki: mikor, hol, hogyan. Ugyanígy kiemelheted azt is, <b>ki</b> tette: {这个工作是张老师介绍的|zhège gōngzuò shì Zhāng lǎoshī jièshào de} „ezt a munkát Zhang tanárnő ajánlotta", {这个菜是我妈妈做的|zhège cài shì wǒ māma zuò de} „ezt az ételt anyám főzte".',
      more: [
        'Kérdés: {这是谁做的|zhè shì shéi zuò de}？ „Ki csinálta ezt?" Tagadás: {不是我做的|bú shì wǒ zuò de} „nem én csináltam".',
        'A {是|shì} élőszóban gyakran elmarad, a {的|de} viszont nem: {张老师介绍的|Zhāng lǎoshī jièshào de}.'
      ],
      tables: [
        { caption: 'Mit emel ki a {是|shì} … {的|de}?',
          head: ['Kérdés', 'Példa'],
          rows: [
            ['mikor?', '{我|wǒ}{是|shì}{上|shàng}{个|ge}{月|yuè}{开始|kāi·shǐ}{的|de}。'],
            ['hol?', '{这|zhè}{件|jiàn}{衣服|yī·fu}{是|shì}{在|zài}{上海|Shàng·hǎi}{买|mǎi}{的|de}。'],
            ['hogyan?', '{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。'],
            ['ki?', '{这|zhè}{个|ge}{菜|cài}{是|shì}{我|wǒ}{妈妈|mā·ma}{做|zuò}{的|de}。']
          ] }
      ],
      examples: [
        { zh: '{这|zhè}{个|ge}{工作|gōng·zuò}{是|shì}{张|Zhāng}{老师|lǎo·shī}{介绍|jiè·shào}{的|de}。', hu: 'Ezt a munkát Zhang tanárnő ajánlotta.' },
        { zh: '{这|zhè}{是|shì}{谁|shéi}{做|zuò}{的|de}？', hu: 'Ki csinálta ezt?' },
        { zh: '{不|bú}{是|shì}{我|wǒ}{说|shuō}{的|de}。', hu: 'Nem én mondtam.' }
      ],
      mistakes: [
        { bad: '{这|zhè}{个|ge}{菜|cài}{我|wǒ}{妈妈|mā·ma}{做|zuò}{的|de}{是|shì}。', good: '{这|zhè}{个|ge}{菜|cài}{是|shì}{我|wǒ}{妈妈|mā·ma}{做|zuò}{的|de}。', why: 'A {是|shì} a kiemelt rész elé, a {的|de} az ige után kerül.' }
      ]
    },
    {
      title: '…{的时候|de shíhou}', sub: 'amikor …',
      pattern: 'mellékmondat + {的时候|de shí·hou}，főmondat',
      body: 'A magyar „amikor" a mellékmondat elején áll; a kínai {的时候|de shíhou} (szó szerint „…-nak az ideje") a mellékmondat <b>végére</b> kerül, és az egész a főmondat <b>elé</b>: {我第一次去的时候，他不想说话|wǒ dì-yī cì qù de shíhou, tā bù xiǎng shuō huà} „amikor először mentem, nem akart beszélni".',
      more: [
        'Melléknévvel is: {我小的时候|wǒ xiǎo de shíhou} „kiskoromban", {忙的时候|máng de shíhou} „amikor sok a dolgom".',
        'Az alany előtte is állhat, utána is: {吃饭的时候，不要看手机|chī fàn de shíhou, bú yào kàn shǒujī} — itt mindenkire vonatkozik.'
      ],
      examples: [
        { zh: '{我|wǒ}{第一|dì·yī}{次|cì}{去|qù}{的|de}{时候|shí·hou}，{他|tā}{不|bù}{想|xiǎng}{说|shuō}{话|huà}。', hu: 'Amikor először mentem, nem akart beszélni.' },
        { zh: '{吃|chī}{饭|fàn}{的|de}{时候|shí·hou}，{不要|bú yào}{看|kàn}{手机|shǒu·jī}。', hu: 'Evés közben ne nézd a telefont!' },
        { zh: '{我|wǒ}{小|xiǎo}{的|de}{时候|shí·hou}，{很|hěn}{喜欢|xǐ·huan}{唱|chàng}{歌|gē}。', hu: 'Kiskoromban nagyon szerettem énekelni.' }
      ],
      mistakes: [
        { bad: '{的|de}{时候|shí·hou}{我|wǒ}{吃|chī}{饭|fàn}，……', good: '{我|wǒ}{吃|chī}{饭|fàn}{的|de}{时候|shí·hou}，……', why: 'A {的时候|de shíhou} a mellékmondat végére kerül.' }
      ]
    },
    {
      title: '{已经|yǐjīng} … {了|le}', sub: 'már — megtörtént, elérte',
      pattern: 'A + {已经|yǐ·jīng} + ige / állítmány + {了|le}',
      body: 'Az {已经|yǐjīng} „már" azt jelzi, hogy valami megtörtént, vagy elért egy pontot. A mondat végére szinte mindig {了|le} kerül: {我已经吃饭了|wǒ yǐjīng chī fàn le} „már ettem", {他已经二十岁了|tā yǐjīng èrshí suì le} „már húszéves", {我们已经是好朋友了|wǒmen yǐjīng shì hǎo péngyou le} „már jó barátok vagyunk".',
      more: [
        'Időtartammal vagy számmal: {我已经去了四次了|wǒ yǐjīng qùle sì cì le} „már négyszer voltam ott", {我已经学了两年了|wǒ yǐjīng xuéle liǎng nián le} „már két éve tanulom" — a két {了|le} azt jelzi, hogy a dolog még tart.',
        'A tagadó párja „még nem": {还没|hái méi} … {呢|ne} — ezt a HSK 2 14. leckéjében tanulod.'
      ],
      examples: [
        { zh: '{我|wǒ}{已经|yǐ·jīng}{去|qù}{了|le}{四|sì}{次|cì}{了|le}。', hu: 'Már négyszer voltam ott.' },
        { zh: '{他|tā}{已经|yǐ·jīng}{回|huí}{家|jiā}{了|le}。', hu: 'Már hazament.' },
        { zh: '{现在|xiàn·zài}{我们|wǒ·men}{已经|yǐ·jīng}{是|shì}{好|hǎo}{朋友|péng·you}{了|le}。', hu: 'Most már jó barátok vagyunk.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{已经|yǐ·jīng}{吃|chī}{饭|fàn}。', good: '{我|wǒ}{已经|yǐ·jīng}{吃|chī}{饭|fàn}{了|le}。', why: 'Az {已经|yǐjīng} mellé a mondat végére {了|le} kell.' }
      ]
    },
    {
      title: '{帮|bāng} + valaki + ige', sub: 'segít valakinek valamiben',
      pattern: 'A + {帮|bāng} + valaki + ige (+ tárgy)',
      body: 'A {帮|bāng} „segít" után az áll, akinek segítünk, majd az, amiben: {谁帮你找的|shéi bāng nǐ zhǎo de}？ „ki segített megtalálni?", {我帮你买吧|wǒ bāng nǐ mǎi ba} „majd én megveszem neked". Gyakran azt jelenti: „megteszem helyetted".',
      more: [
        'A {帮忙|bāng máng} „segít, besegít" tárgy nélkül áll: {你能帮忙吗|nǐ néng bāng máng ma}？ „Tudsz segíteni?" A {帮|bāng} után viszont mindig ott a személy.',
        'Nincs {给|gěi}: „segítek neked" = {我帮你|wǒ bāng nǐ}.'
      ],
      examples: [
        { zh: '{你|nǐ}{能|néng}{帮|bāng}{我|wǒ}{拿|ná}{一下|yí·xià}{箱子|xiāng·zi}{吗|ma}？', hu: 'Segítenél egy kicsit a bőrönddel?' },
        { zh: '{我|wǒ}{帮|bāng}{你|nǐ}{买|mǎi}{吧|ba}。', hu: 'Majd én megveszem neked.' },
        { zh: '{这|zhè}{个|ge}{工作|gōng·zuò}{是|shì}{张|Zhāng}{老师|lǎo·shī}{帮|bāng}{我|wǒ}{找|zhǎo}{的|de}。', hu: 'Ezt a munkát Zhang tanárnő segített megtalálni.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{给|gěi}{你|nǐ}{帮|bāng}。', good: '{我|wǒ}{帮|bāng}{你|nǐ}。', why: 'A {帮|bāng} közvetlenül a személy elé kerül.' }
      ]
    },
    {
      title: '{教|jiāo} · {给|gěi} · {问|wèn} · {送|sòng}', sub: 'két tárgy: kinek + mit',
      pattern: 'A + ige + személy + dolog',
      body: 'Néhány ige után két tárgy áll: előbb a <b>személy</b> (kinek, kitől), aztán a <b>dolog</b> (mit): {我教他英语|wǒ jiāo tā Yīngyǔ} „angolt tanítok neki", {他给我一本书|tā gěi wǒ yì běn shū} „ad nekem egy könyvet", {我问你一个问题|wǒ wèn nǐ yí ge wèntí} „kérdezek tőled valamit". A magyar ragokat (-nak, -tól) a sorrend pótolja.',
      more: [
        'A {介绍|jièshào} „bemutat" nem ilyen: a személy {给|gěi}-vel elé kerül: {我给你介绍一下|wǒ gěi nǐ jièshào yíxià} „hadd mutassak be neked valakit".',
        'A {送|sòng} „ajándékoz; elkísér": {她送我一个礼物|tā sòng wǒ yí ge lǐwù} „ajándékot adott nekem".'
      ],
      tables: [
        { caption: 'Két tárgy: kinek + mit',
          head: ['Ige', 'Példa', 'Jelentés'],
          rows: [
            ['{教|jiāo}', '{我|wǒ}{教|jiāo}{他|tā}{英语|Yīng·yǔ}。', 'Angolt tanítok neki.'],
            ['{给|gěi}', '{他|tā}{给|gěi}{我|wǒ}{一|yì}{本|běn}{书|shū}。', 'Ad nekem egy könyvet.'],
            ['{问|wèn}', '{我|wǒ}{问|wèn}{你|nǐ}{一|yí}{个|ge}{问题|wèn·tí}。', 'Kérdezek tőled valamit.'],
            ['{送|sòng}', '{她|tā}{送|sòng}{我|wǒ}{一|yí}{个|ge}{礼物|lǐ·wù}。', 'Ajándékot ad nekem.']
          ] }
      ],
      examples: [
        { zh: '{王|Wáng}{老师|lǎo·shī}{教|jiāo}{我们|wǒ·men}{汉语|Hàn·yǔ}。', hu: 'Wang tanár kínait tanít nekünk.' },
        { zh: '{我|wǒ}{给|gěi}{你|nǐ}{介绍|jiè·shào}{一下|yí·xià}，{这|zhè}{是|shì}{我|wǒ}{朋友|péng·you}{刘芳|Liú Fāng}。', hu: 'Hadd mutassam be: ő a barátnőm, Liu Fang.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{教|jiāo}{英语|Yīng·yǔ}{他|tā}。', good: '{我|wǒ}{教|jiāo}{他|tā}{英语|Yīng·yǔ}。', why: 'Előbb a személy, aztán a dolog.' }
      ]
    }
  ],
  phrases: [
    { zh: '{听说|tīng·shuō}……', hu: 'Úgy hallottam, …' },
    { zh: '{这|zhè}{是|shì}{谁|shéi}{做|zuò}{的|de}？', hu: 'Ki csinálta ezt?' },
    { zh: '{你|nǐ}{能|néng}{帮|bāng}{我|wǒ}{一下|yí·xià}{吗|ma}？', hu: 'Tudnál segíteni egy kicsit?' },
    { zh: '{我|wǒ}{给|gěi}{你|nǐ}{介绍|jiè·shào}{一下|yí·xià}。', hu: 'Hadd mutassak be (valakit).' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{听说|tīng·shuō}', pinyin: 'tīngshuō', hu: 'úgy hallottam' },
        { zh: '{教|jiāo}', pinyin: 'jiāo', hu: 'tanítani' },
        { zh: '{孩子|hái·zi}', pinyin: 'háizi', hu: 'gyerek' },
        { zh: '{英语|Yīng·yǔ}', pinyin: 'Yīngyǔ', hu: 'angol nyelv' },
        { zh: '{帮|bāng}', pinyin: 'bāng', hu: 'segíteni' },
        { zh: '{已经|yǐ·jīng}', pinyin: 'yǐjīng', hu: 'már' },
        { zh: '{开始|kāi·shǐ}', pinyin: 'kāishǐ', hu: 'kezdeni, kezdődik' },
        { zh: '{次|cì}', pinyin: 'cì', hu: 'alkalom, -szor' },
        { zh: '{问|wèn}', pinyin: 'wèn', hu: 'kérdezni' },
        { zh: '{问题|wèn·tí}', pinyin: 'wèntí', hu: 'kérdés, probléma' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{帮忙|bāng máng}', pinyin: 'bāng máng', hu: 'segíteni, besegíteni' },
        { zh: '{说话|shuō huà}', pinyin: 'shuō huà', hu: 'beszélni' },
        { zh: '{唱歌|chàng gē}', pinyin: 'chàng gē', hu: 'énekelni' },
        { zh: '{礼物|lǐ·wù}', pinyin: 'lǐwù', hu: 'ajándék' }
      ] }
  ],
  culture: [
    { title: 'Ismeretségek', text: 'Kínában sok minden ismeretségen keresztül megy: munkát, lakást, jó orvost gyakran egy barát vagy tanár ajánlásával talál az ember. Ezt a kapcsolati hálót {关系|guānxi} néven emlegetik. Aki segített, annak illik később viszonozni — egy vacsorával, egy szívességgel.' },
    { title: 'Magántanárok', text: 'A kínai szülők rengeteget áldoznak a gyerekek tanulására: hétvégén és este különórák, magántanárok ({家教|jiājiào}). Sok külföldi diák angolt tanít — így egy kínai családot közelről is megismerhet, és közben a kínai nyelvtudása is fejlődik.' }
  ],
  reading: {
    title: '{安娜|Ān·nà}{的|de}{新|xīn}{工作|gōng·zuò}', titleHu: 'Anna új munkája',
    text: [
      { zh: '{安娜|Ān·nà}{上|shàng}{个|ge}{月|yuè}{开始|kāi·shǐ}{教|jiāo}{一|yí}{个|ge}{中国|Zhōng·guó}{孩子|hái·zi}{英语|Yīng·yǔ}。', hu: 'Anna a múlt hónapban kezdett angolt tanítani egy kínai gyereknek.' },
      { zh: '{这|zhè}{个|ge}{工作|gōng·zuò}{是|shì}{张|Zhāng}{老师|lǎo·shī}{帮|bāng}{她|tā}{介绍|jiè·shào}{的|de}。{孩子|hái·zi}{叫|jiào}{乐乐|Lè·le}，{今年|jīn·nián}{八|bā}{岁|suì}。', hu: 'Ezt a munkát Zhang tanárnő közvetítette neki. A gyereket Lelének hívják, idén nyolcéves.' },
      { zh: '{安娜|Ān·nà}{第一|dì·yī}{次|cì}{去|qù}{他|tā}{家|jiā}{的|de}{时候|shí·hou}，{乐乐|Lè·le}{不|bù}{想|xiǎng}{说|shuō}{话|huà}。', hu: 'Amikor Anna először ment hozzájuk, Lele nem akart beszélni.', par: true },
      { zh: '{现在|xiàn·zài}{他|tā}{已经|yǐ·jīng}{会|huì}{说|shuō}{很|hěn}{多|duō}{英语|Yīng·yǔ}{了|le}。', hu: 'Most már sokat tud angolul.' },
      { zh: '{乐乐|Lè·le}{也|yě}{教|jiāo}{安娜|Ān·nà}{唱|chàng}{中国|Zhōng·guó}{歌|gē}。', hu: 'Lele pedig kínai dalokra tanítja Annát.', par: true }
    ],
    words: [ { zh: '{乐乐|Lè·le}', hu: 'Lele (becenév)' }, { zh: '{歌|gē}', hu: 'dal' } ],
    questions: [
      { q: 'Mit tanít Anna?', a: 'angolt egy kínai gyereknek', wrong: ['kínait egy magyar gyereknek', 'magyart egy kínai diáknak', 'zenét egy óvodában'], why: '{教一个中国孩子英语|jiāo yí ge Zhōngguó háizi Yīngyǔ}.' },
      { q: 'Ki közvetítette a munkát?', a: 'Zhang tanárnő', wrong: ['Wang Ming', 'Liu Fang', 'a gyerek apja'], why: '{是张老师帮她介绍的|shì Zhāng lǎoshī bāng tā jièshào de}.' },
      { q: 'Milyen volt Lele az első alkalommal?', a: 'nem akart beszélni', wrong: ['sokat nevetett', 'jól beszélt angolul', 'beteg volt'], why: '{乐乐不想说话|Lèle bù xiǎng shuō huà}.' },
      { q: 'Mire tanítja Lele Annát?', a: 'kínai dalokra', wrong: ['kínai írásjegyekre', 'főzni', 'kínai sakkra'], why: '{教安娜唱中国歌|jiāo Ān\'nà chàng Zhōngguó gē}.' }
    ]
  },
  quiz: [
    { q: '„Ezt az ételt anyám főzte."', a: '{这|zhè}{个|ge}{菜|cài}{是|shì}{我|wǒ}{妈妈|mā·ma}{做|zuò}{的|de}。', wrong: ['{这|zhè}{个|ge}{菜|cài}{我|wǒ}{妈妈|mā·ma}{是|shì}{做|zuò}{了|le}。', '{这|zhè}{个|ge}{菜|cài}{是|shì}{做|zuò}{我|wǒ}{妈妈|mā·ma}{的|de}。', '{我|wǒ}{妈妈|mā·ma}{的|de}{菜|cài}{是|shì}{做|zuò}{吗|ma}。'], why: '{是|shì} + ki + ige + {的|de}.', point: 1 },
    { q: 'Mit kérdez: {这是谁做的|zhè shì shéi zuò de}？', a: 'Ki csinálta ezt?', wrong: ['Mit csinálsz?', 'Mikor csináltad?', 'Kinek csinálod?'], why: '{谁|shéi} + {是|shì} … {的|de}: a cselekvőre kérdez.', point: 1 },
    { q: 'Melyik mondat emeli ki, hogy KI ajánlotta?', a: '{是|shì}{张|Zhāng}{老师|lǎo·shī}{介绍|jiè·shào}{的|de}。', wrong: ['{是|shì}{上|shàng}{个|ge}{月|yuè}{介绍|jiè·shào}{的|de}。', '{是|shì}{在|zài}{学校|xué·xiào}{介绍|jiè·shào}{的|de}。', '{是|shì}{打|dǎ}{电话|diàn·huà}{介绍|jiè·shào}{的|de}。'], why: 'A többi a mikor, hol, hogyan kérdésre felel.', point: 1 },
    { q: '„amikor először mentem"', a: '{我|wǒ}{第一|dì·yī}{次|cì}{去|qù}{的|de}{时候|shí·hou}', wrong: ['{的|de}{时候|shí·hou}{我|wǒ}{第一|dì·yī}{次|cì}{去|qù}', '{我|wǒ}{去|qù}{第一|dì·yī}{次|cì}{时候|shí·hou}{的|de}', '{时候|shí·hou}{我|wǒ}{去|qù}{的|de}{第一|dì·yī}{次|cì}'], why: 'A {的时候|de shíhou} a mellékmondat végére kerül.', point: 2 },
    { q: 'Mit jelent?', zh: '{吃|chī}{饭|fàn}{的|de}{时候|shí·hou}，{不要|bú yào}{看|kàn}{手机|shǒu·jī}。', a: 'Evés közben ne nézd a telefont!', wrong: ['Evés után nézd meg a telefonod!', 'Ne egyél, amikor telefonálsz!', 'Telefonon rendeltem ételt.'], why: '… {的时候|de shíhou} „amikor …".', point: 2 },
    { q: '„kiskoromban"', a: '{我|wǒ}{小|xiǎo}{的|de}{时候|shí·hou}', wrong: ['{的|de}{时候|shí·hou}{我|wǒ}{小|xiǎo}', '{我|wǒ}{时候|shí·hou}{小|xiǎo}{的|de}', '{小|xiǎo}{我|wǒ}{的|de}{时候|shí·hou}'], why: 'Melléknév + {的时候|de shíhou}.', point: 2 },
    { q: '„Már ettem."', a: '{我|wǒ}{已经|yǐ·jīng}{吃|chī}{饭|fàn}{了|le}。', wrong: ['{我|wǒ}{已经|yǐ·jīng}{吃|chī}{饭|fàn}{吗|ma}。', '{我|wǒ}{吃|chī}{饭|fàn}{已经|yǐ·jīng}{了|le}。', '{已经|yǐ·jīng}{了|le}{我|wǒ}{吃|chī}{饭|fàn}。'], why: '{已经|yǐjīng} + ige + {了|le}.', point: 3 },
    { q: 'Mit jelent: {他已经二十岁了|tā yǐjīng èrshí suì le}。', a: 'Már húszéves.', wrong: ['Húsz éve itt él.', 'Húszéves lesz.', 'Húszéves volt.'], why: '{已经|yǐjīng} … {了|le} „már".', point: 3 },
    { q: 'Mi kerül az {已经|yǐjīng}-es mondat végére?', a: '{了|le}', wrong: ['{吗|ma}', '{的|de}', '{呢|ne}'], why: '{已经|yǐjīng} … {了|le}.', point: 3 },
    { q: 'Mit jelent: {我已经去了四次了|wǒ yǐjīng qùle sì cì le}。', a: 'Már négyszer voltam ott.', wrong: ['Négy napja vagyok ott.', 'Négykor indulok oda.', 'Négy hónapig voltam ott.'], why: '{次|cì} „-szor, alkalom".', point: 3 },
    { q: '„Segítek neked."', a: '{我|wǒ}{帮|bāng}{你|nǐ}。', wrong: ['{我|wǒ}{给|gěi}{你|nǐ}{帮|bāng}。', '{我|wǒ}{帮|bāng}{给|gěi}{你|nǐ}。', '{你|nǐ}{帮|bāng}{我|wǒ}{给|gěi}。'], why: 'A {帮|bāng} után közvetlenül a személy áll.', point: 4 },
    { q: 'Mit jelent: {你能帮我拿一下吗|nǐ néng bāng wǒ ná yíxià ma}？', a: 'Megfognád nekem egy kicsit?', wrong: ['Odaadod nekem egy percre?', 'Megmutatod nekem egy kicsit?', 'Megvárnál itt egy kicsit?'], why: '{帮|bāng} + {我|wǒ} + {拿|ná}: „segíts fogni / vinni".', point: 4 },
    { q: '„Angolt tanítok neki."', a: '{我|wǒ}{教|jiāo}{他|tā}{英语|Yīng·yǔ}。', wrong: ['{我|wǒ}{教|jiāo}{英语|Yīng·yǔ}{他|tā}。', '{我|wǒ}{给|gěi}{他|tā}{英语|Yīng·yǔ}{教|jiāo}{了|le}。', '{他|tā}{英语|Yīng·yǔ}{我|wǒ}{教|jiāo}{吗|ma}。'], why: 'Ige + személy + dolog.', point: 5 },
    { q: '„Kérdezek tőled valamit."', a: '{我|wǒ}{问|wèn}{你|nǐ}{一|yí}{个|ge}{问题|wèn·tí}。', wrong: ['{我|wǒ}{问|wèn}{一|yí}{个|ge}{问题|wèn·tí}{你|nǐ}。', '{我|wǒ}{给|gěi}{你|nǐ}{问|wèn}{问题|wèn·tí}{一|yí}{个|ge}。', '{你|nǐ}{我|wǒ}{问|wèn}{一|yí}{个|ge}{问题|wèn·tí}。'], why: 'Ige + személy + dolog.', point: 5 },
    { q: '„Hadd mutassak be (neked valakit)."', a: '{我|wǒ}{给|gěi}{你|nǐ}{介绍|jiè·shào}{一下|yí·xià}。', wrong: ['{我|wǒ}{介绍|jiè·shào}{你|nǐ}{一下|yí·xià}{给|gěi}。', '{我|wǒ}{介绍|jiè·shào}{给|gěi}{一下|yí·xià}{你|nǐ}。', '{给|gěi}{我|wǒ}{介绍|jiè·shào}{你|nǐ}{一下|yí·xià}。'], why: 'A {介绍|jièshào} elé {给|gěi} + személy kerül.', point: 5 },
    { q: 'Mit jelent a {听说|tīngshuō}?', a: 'úgy hallottam, hogy', wrong: ['figyelj rám, kérlek', 'zenét hallgatni', 'hangosan beszélni'], why: '{听说你有新工作了|tīngshuō nǐ yǒu xīn gōngzuò le} „hallom, új munkád van".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 5. LECKE — 还, 就, 千, 有点儿 / 一点儿, 件 · 条 · 双
   ════════════════════════════════════════════════════ */
{
  id: 'l20', no: 20, badge: '5', kicker: 'HSK 2 · 5. lecke', label: 'HSK 2 · 5. lecke',
  title: 'Kicsit olcsóbban? — ruhavásárlás',
  lead: 'Ruhát veszel: árat kérdezel ezres nagyságrendben (一千二百块), alkudsz (能便宜一点儿吗？), panaszkodsz (有点儿贵), és még valamit kérsz (我还想买…).',
  cando: [
    'Még valamit kérsz vagy hozzáteszel: 还 + ige.',
    'Következményt vagy korai időpontot fejezel ki a 就 szóval.',
    'Ezres számokat mondasz: 一千二百, 一千零五十.',
    'Megkülönbözteted: 有点儿贵 (kissé drága) — 便宜一点儿 (kicsit olcsóbban).'
  ],
  intro: [
    'Közeleg a tél, Anna kabátot vesz egy ruhavásáron. Megtanulod, hogyan kérdezel árat, hogyan alkudsz udvariasan, és hogyan mondod az ezres összegeket.',
    'Két kis szó sokat dolgozik ebben a leckében: a {还|hái} „még, ráadásul" és a {就|jiù} „akkor; már". Mindkettő az ige (vagy a segédige) elé kerül.'
  ],
  dialogue: {
    title: 'A ruhavásáron',
    scene: 'Anna és Liu Fang egy ruhavásáron. Anna télikabátot keres.',
    lines: [
      { who: 'Eladó', zh: '{你|nǐ}{好|hǎo}，{你|nǐ}{想|xiǎng}{买|mǎi}{什么|shén·me}？', hu: 'Jó napot, mit szeretne venni?' },
      { who: 'Anna', zh: '{我|wǒ}{想|xiǎng}{买|mǎi}{一|yí}{件|jiàn}{大衣|dà·yī}。{这|zhè}{件|jiàn}{红色|hóng·sè}{的|de}{多少|duō·shao}{钱|qián}？', hu: 'Egy kabátot szeretnék venni. Mennyibe kerül ez a piros?' },
      { who: 'Eladó', zh: '{一千|yì·qiān}{二百|èr·bǎi}{块|kuài}。{你|nǐ}{可以|kě·yǐ}{试|shì}{一下|yí·xià}。', hu: 'Ezerkétszáz jüan. Felpróbálhatja.' },
      { who: 'Anna', zh: '{有点儿|yǒu·diǎnr}{贵|guì}。{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}{吗|ma}？', hu: 'Kicsit drága. Nem lehetne kicsit olcsóbban?' },
      { who: 'Eladó', zh: '{那|nà}{就|jiù}{一千|yì·qiān}{吧|ba}。', hu: 'Akkor legyen ezer.' },
      { who: 'Liu Fang', zh: '{安娜|Ān·nà}，{这|zhè}{件|jiàn}{很|hěn}{漂亮|piào·liang}，{你|nǐ}{喜欢|xǐ·huan}{就|jiù}{买|mǎi}{吧|ba}！', hu: 'Anna, ez nagyon szép, ha tetszik, vedd meg!' },
      { who: 'Anna', zh: '{好|hǎo}，{我|wǒ}{要|yào}{这|zhè}{件|jiàn}。{我|wǒ}{还|hái}{想|xiǎng}{买|mǎi}{一|yì}{双|shuāng}{鞋|xié}。', hu: 'Jó, ezt kérem. Még egy pár cipőt is szeretnék venni.' },
      { who: 'Eladó', zh: '{鞋|xié}{在|zài}{右边|yòu·bian}，{你们|nǐ·men}{去|qù}{看|kàn}{一下|yí·xià}{吧|ba}。', hu: 'A cipők jobbra vannak, nézzenek körül.' }
    ],
    notes: [
      'A {大衣|dàyī} „kabát (hosszabb, télikabát)". A {漂亮|piàoliang} „szép, csinos".',
      'A {那就|nà jiù} … {吧|ba} „akkor legyen …" az alku végén gyakori: a {就|jiù} itt „akkor".',
      'Az eladó felé a {你|nǐ} is teljesen rendben van; a {您|nín} idősebbeknek, hivatalos helyzetben jár.'
    ]
  },
  points: [
    {
      title: '{还|hái}', sub: 'még, ráadásul',
      pattern: 'A + {还|hái} + (segédige +) ige',
      body: 'A {还|hái} „még, ráadásul" azt jelzi, hogy ugyanaz a személy <b>még valamit</b> tesz, akar vagy tud: {我还想买一双鞋|wǒ hái xiǎng mǎi yì shuāng xié} „még egy pár cipőt is szeretnék venni", {我还要一杯茶|wǒ hái yào yì bēi chá} „kérek még egy teát". Mindig az ige (vagy a segédige) elé kerül.',
      more: [
        'Boltban, étteremben a szokásos kérdés: {你还要别的吗|nǐ hái yào biéde ma}？ „Kér még valami mást?"',
        'A {还|hái} „még mindig" jelentését a HSK 2 7. leckéjében tanulod.'
      ],
      tables: [
        { caption: '{也|yě} vagy {还|hái}?',
          head: ['', 'Jelentés', 'Példa'],
          rows: [
            ['{也|yě}', 'is (más is ugyanezt)', '{她|tā}{会|huì}{说|shuō}{英语|Yīng·yǔ}，{我|wǒ}{也|yě}{会|huì}。'],
            ['{还|hái}', 'ráadásul (ő még ezt is)', '{她|tā}{会|huì}{说|shuō}{英语|Yīng·yǔ}，{还|hái}{会|huì}{说|shuō}{法语|Fǎ·yǔ}。']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{还|hái}{要|yào}{一|yì}{杯|bēi}{茶|chá}。', hu: 'Kérek még egy teát.' },
        { zh: '{你|nǐ}{还|hái}{要|yào}{别|bié}{的|de}{吗|ma}？', hu: 'Kér még valami mást?' },
        { zh: '{他|tā}{会|huì}{说|shuō}{英语|Yīng·yǔ}，{还|hái}{会|huì}{说|shuō}{法语|Fǎ·yǔ}。', hu: 'Tud angolul, ráadásul franciául is.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{想|xiǎng}{买|mǎi}{还|hái}{一|yì}{双|shuāng}{鞋|xié}。', good: '{我|wǒ}{还|hái}{想|xiǎng}{买|mǎi}{一|yì}{双|shuāng}{鞋|xié}。', why: 'A {还|hái} a segédige és az ige elé kerül, nem a tárgy elé.' }
      ]
    },
    {
      title: '{就|jiù}', sub: 'akkor · már (korán) · rögtön',
      pattern: 'feltétel + {就|jiù} + ige · időpont + {就|jiù} + ige + {了|le}',
      body: 'A {就|jiù} mindig az ige előtt áll, és több dolgot jelenthet. (1) <b>Akkor</b>, egy feltétel után: {你喜欢就买吧|nǐ xǐhuan jiù mǎi ba} „ha tetszik, akkor vedd meg", {那就一千吧|nà jiù yìqiān ba} „akkor legyen ezer". (2) <b>Már</b> — korábban, gyorsabban a vártnál: {我七点就起床了|wǒ qī diǎn jiù qǐ chuáng le} „már hétkor felkeltem". (3) <b>Rögtön</b>: {我就来|wǒ jiù lái} „mindjárt jövök".',
      more: [
        'A „már (korán)" jelentésben a mondat végén {了|le} áll: {他八点就到了|tā bā diǎn jiù dào le} „már nyolckor odaért".',
        'A {就|jiù} az alany után kerül: {我就买|wǒ jiù mǎi}, nem *{就我买|jiù wǒ mǎi}.'
      ],
      examples: [
        { zh: '{你|nǐ}{喜欢|xǐ·huan}{就|jiù}{买|mǎi}{吧|ba}！', hu: 'Ha tetszik, vedd meg!' },
        { zh: '{我们|wǒ·men}{九|jiǔ}{点|diǎn}{就|jiù}{到|dào}{了|le}。', hu: 'Már kilenckor odaértünk.' },
        { zh: '{你|nǐ}{等|děng}{一下|yí·xià}，{我|wǒ}{就|jiù}{来|lái}！', hu: 'Várj egy kicsit, mindjárt jövök!' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{喜欢|xǐ·huan}{买|mǎi}{就|jiù}{吧|ba}。', good: '{你|nǐ}{喜欢|xǐ·huan}{就|jiù}{买|mǎi}{吧|ba}。', why: 'A {就|jiù} az ige elé kerül.' }
      ]
    },
    {
      title: '{百|bǎi} · {千|qiān} · {零|líng}', sub: 'számok tízezerig',
      pattern: 'szám + {千|qiān} + szám + {百|bǎi} + … · hiány: {零|líng}',
      body: 'A {百|bǎi} „száz" és a {千|qiān} „ezer" ugyanúgy épül, mint a tízesek: {一千二百|yìqiān èrbǎi} „1200", {三千五百|sānqiān wǔbǎi} „3500". A 2 a {百|bǎi} és a {千|qiān} előtt rendszerint {两|liǎng}: {两千|liǎng qiān} „2000". Ha egy helyiérték kimarad, {零|líng} „nulla" jelzi: {一千零五十|yìqiān líng wǔshí} „1050", {一千零五|yìqiān líng wǔ} „1005".',
      more: [
        'Rövidítés: ha a szám végén kerek érték áll, az utolsó egység elhagyható: {一千二|yìqiān èr} = 1200, {三百五|sānbǎi wǔ} = 350.',
        'Az {一|yī} a {百|bǎi} és a {千|qiān} előtt hangot vált: {一百|yìbǎi}, {一千|yìqiān}.'
      ],
      tables: [
        { caption: 'Nagyobb számok',
          head: ['Szám', 'Kínaiul'],
          rows: [
            ['300', '{三百|sān bǎi}'],
            ['1 200', '{一千二百|yì qiān èr bǎi}'],
            ['2 000', '{两千|liǎng qiān}'],
            ['1 050', '{一千零五十|yì qiān líng wǔ shí}'],
            ['1 005', '{一千零五|yì qiān líng wǔ}']
          ] }
      ],
      examples: [
        { zh: '{这|zhè}{件|jiàn}{大衣|dà·yī}{一千|yì·qiān}{二百|èr·bǎi}{块|kuài}。', hu: 'Ez a kabát ezerkétszáz jüan.' },
        { zh: '{我|wǒ}{的|de}{手机|shǒu·jī}{两千|liǎng qiān}{块|kuài}。', hu: 'A telefonom kétezer jüan volt.' }
      ],
      mistakes: [
        { bad: '{一千|yì·qiān}{五十|wǔ·shí}（= 1050）', good: '{一千|yì·qiān}{零|líng}{五十|wǔ·shí}', why: 'A kimaradt százas helyére {零|líng} kell; enélkül hibás, és könnyen 1500-nak értik.' }
      ]
    },
    {
      title: '{有点儿|yǒudiǎnr} vagy {一点儿|yìdiǎnr}?', sub: 'kissé drága — kicsit olcsóbban',
      pattern: '{有点儿|yǒu·diǎnr} + melléknév · melléknév + {一点儿|yì·diǎnr}',
      body: 'A kettő könnyen összekeverhető, pedig a helyük és a jelentésük is más. A {有点儿|yǒudiǎnr} a melléknév <b>előtt</b> áll, és általában elégedetlenséget fejez ki: {有点儿贵|yǒudiǎnr guì} „kicsit (túl) drága", {有点儿冷|yǒudiǎnr lěng} „kicsit hideg van". Az {一点儿|yìdiǎnr} a melléknév <b>után</b> áll, és összehasonlít vagy kér: {便宜一点儿|piányi yìdiǎnr} „kicsit olcsóbb(an)", {大一点儿的|dà yìdiǎnr de} „egy kicsit nagyobbat".',
      tables: [
        { caption: 'A két „kicsit"',
          head: ['', 'Hely', 'Jelentés', 'Példa'],
          rows: [
            ['{有点儿|yǒu·diǎnr}', 'mn. előtt', 'kissé (panasz)', '{有点儿|yǒu·diǎnr}{贵|guì}'],
            ['{一点儿|yì·diǎnr}', 'mn. után', 'kicsit -abb (kérés)', '{便宜|pián·yi}{一点儿|yì·diǎnr}']
          ] }
      ],
      examples: [
        { zh: '{这|zhè}{件|jiàn}{有点儿|yǒu·diǎnr}{贵|guì}。', hu: 'Ez kicsit drága.' },
        { zh: '{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}{吗|ma}？', hu: 'Nem lehetne kicsit olcsóbban?' },
        { zh: '{有|yǒu}{大|dà}{一点儿|yì·diǎnr}{的|de}{吗|ma}？', hu: 'Van egy kicsit nagyobb?' }
      ],
      mistakes: [
        { bad: '{这|zhè}{件|jiàn}{一点儿|yì·diǎnr}{贵|guì}。', good: '{这|zhè}{件|jiàn}{有点儿|yǒu·diǎnr}{贵|guì}。', why: 'A melléknév előtt {有点儿|yǒudiǎnr} áll.' },
        { bad: '{能|néng}{一点儿|yì·diǎnr}{便宜|pián·yi}{吗|ma}？', good: '{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}{吗|ma}？', why: 'Az {一点儿|yìdiǎnr} a melléknév után kerül.' }
      ]
    },
    {
      title: '{件|jiàn} · {条|tiáo} · {双|shuāng}', sub: 'ruhák mérőszavai, felpróbálás',
      pattern: 'szám + {件|jiàn} / {条|tiáo} / {双|shuāng} + ruhadarab',
      body: 'A ruhadaraboknak saját mérőszavuk van. A {件|jiàn} a felsőruháké: {一件大衣|yí jiàn dàyī} „egy kabát", {一件衣服|yí jiàn yīfu}. A {条|tiáo} a hosszú, keskeny dolgoké: {一条裤子|yì tiáo kùzi} „egy nadrág", {一条裙子|yì tiáo qúnzi} „egy szoknya". A {双|shuāng} „pár": {一双鞋|yì shuāng xié} „egy pár cipő", {一双筷子|yì shuāng kuàizi} „egy pár evőpálcika".',
      more: [
        'Felpróbálás: {我可以试一下吗|wǒ kěyǐ shì yíxià ma}？ „Felpróbálhatom?" — a {试|shì} „kipróbál".',
        'A {条|tiáo} más hosszú dolgokra is jó: {一条路|yì tiáo lù} „egy út", {一条鱼|yì tiáo yú} „egy hal".'
      ],
      tables: [
        { caption: 'Mérőszavak',
          head: ['Mérőszó', 'Mire', 'Példa'],
          rows: [
            ['{件|jiàn}', 'felsőruha', '{一|yí}{件|jiàn}{大衣|dà·yī}'],
            ['{条|tiáo}', 'nadrág, szoknya', '{一|yì}{条|tiáo}{裤子|kù·zi}'],
            ['{双|shuāng}', 'pár', '{一|yì}{双|shuāng}{鞋|xié}']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{还|hái}{想|xiǎng}{买|mǎi}{一|yì}{双|shuāng}{鞋|xié}。', hu: 'Még egy pár cipőt is szeretnék venni.' },
        { zh: '{我|wǒ}{可以|kě·yǐ}{试|shì}{一下|yí·xià}{吗|ma}？', hu: 'Felpróbálhatom?' }
      ]
    }
  ],
  phrases: [
    { zh: '{多少|duō·shao}{钱|qián}？', hu: 'Mennyibe kerül?' },
    { zh: '{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}{吗|ma}？', hu: 'Nem lehetne kicsit olcsóbban?' },
    { zh: '{我|wǒ}{可以|kě·yǐ}{试|shì}{一下|yí·xià}{吗|ma}？', hu: 'Felpróbálhatom?' },
    { zh: '{你|nǐ}{还|hái}{要|yào}{别|bié}{的|de}{吗|ma}？', hu: 'Kér még valami mást?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{还|hái}', pinyin: 'hái', hu: 'még, ráadásul' },
        { zh: '{就|jiù}', pinyin: 'jiù', hu: 'akkor; már; rögtön' },
        { zh: '{千|qiān}', pinyin: 'qiān', hu: 'ezer' },
        { zh: '{便宜|pián·yi}', pinyin: 'piányi', hu: 'olcsó' },
        { zh: '{试|shì}', pinyin: 'shì', hu: 'kipróbálni, felpróbálni' },
        { zh: '{双|shuāng}', pinyin: 'shuāng', hu: 'pár (mérőszó)' },
        { zh: '{条|tiáo}', pinyin: 'tiáo', hu: 'mérőszó hosszú dolgokra' },
        { zh: '{鞋|xié}', pinyin: 'xié', hu: 'cipő' },
        { zh: '{大衣|dà·yī}', pinyin: 'dàyī', hu: 'kabát' },
        { zh: '{漂亮|piào·liang}', pinyin: 'piàoliang', hu: 'szép, csinos' },
        { zh: '{别的|bié·de}', pinyin: 'biéde', hu: 'más, egyéb' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{裤子|kù·zi}', pinyin: 'kùzi', hu: 'nadrág' },
        { zh: '{裙子|qún·zi}', pinyin: 'qúnzi', hu: 'szoknya' },
        { zh: '{零|líng}', pinyin: 'líng', hu: 'nulla' },
        { zh: '{法语|Fǎ·yǔ}', pinyin: 'Fǎyǔ', hu: 'francia nyelv' }
      ] }
  ],
  culture: [
    { title: 'Alkudni szabad?', text: 'Piacokon, kis üzletekben és a turistáknak szóló vásárokon az alku ({讲价|jiǎng jià}) természetes: az első ár gyakran jóval magasabb a reálisnál. Áruházakban, szupermarketekben viszont fix árak vannak, ott nem illik alkudni. Egy mosollyal és néhány kínai mondattal sokat lehet elérni.' },
    { title: 'Fizetés telefonnal', text: 'Kínában szinte mindenhol mobillal fizetnek: a pénztárnál, a piacon, még az utcai árusnál is ki van téve egy QR-kód ({二维码|èrwéimǎ}), amelyet a telefonnal beolvasol. Készpénzt egyre kevesebben hordanak — külföldiként érdemes előre beállítani egy fizetős alkalmazást.' }
  ],
  reading: {
    title: '{买|mǎi}{大衣|dà·yī}', titleHu: 'Kabátvásárlás',
    text: [
      { zh: '{星期六|xīng·qī·liù}{我|wǒ}{和|hé}{刘芳|Liú Fāng}{去|qù}{买|mǎi}{衣服|yī·fu}，{我们|wǒ·men}{九|jiǔ}{点|diǎn}{就|jiù}{到|dào}{了|le}。', hu: 'Szombaton Liu Fanggal ruhát venni mentünk, már kilenckor odaértünk.' },
      { zh: '{我|wǒ}{看|kàn}{了|le}{一|yí}{件|jiàn}{红色|hóng·sè}{的|de}{大衣|dà·yī}，{一千|yì·qiān}{二百|èr·bǎi}{块|kuài}，{有点儿|yǒu·diǎnr}{贵|guì}。', hu: 'Megnéztem egy piros kabátot, ezerkétszáz jüan volt, kicsit drága.' },
      { zh: '{我|wǒ}{问|wèn}{能|néng}{不|bu}{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}，{最后|zuì·hòu}{一千|yì·qiān}{块|kuài}{买|mǎi}{了|le}。', hu: 'Megkérdeztem, lehetne-e kicsit olcsóbban; végül ezer jüanért megvettem.', par: true },
      { zh: '{我|wǒ}{还|hái}{买|mǎi}{了|le}{一|yì}{双|shuāng}{鞋|xié}，{三百|sān·bǎi}{块|kuài}。', hu: 'Vettem még egy pár cipőt is, háromszáz jüanért.' },
      { zh: '{刘芳|Liú Fāng}{买|mǎi}{了|le}{一|yì}{条|tiáo}{裙子|qún·zi}，{她|tā}{说|shuō}{很|hěn}{便宜|pián·yi}。', hu: 'Liu Fang egy szoknyát vett, azt mondta, nagyon olcsó volt.', par: true }
    ],
    words: [ { zh: '{最后|zuì·hòu}', hu: 'végül' } ],
    questions: [
      { q: 'Mikor értek oda?', a: 'már kilenckor', wrong: ['csak délben', 'tízkor', 'délután'], why: '{九点就到了|jiǔ diǎn jiù dào le}: a {就|jiù} itt „már (korán)".' },
      { q: 'Mennyiért vette meg Anna a kabátot?', a: 'ezer jüanért', wrong: ['ezerkétszáz jüanért', 'háromszáz jüanért', 'kétezer jüanért'], why: '{最后一千块买了|zuìhòu yìqiān kuài mǎi le}.' },
      { q: 'Mit vett még Anna?', a: 'egy pár cipőt', wrong: ['egy szoknyát', 'egy nadrágot', 'egy másik kabátot'], why: '{我还买了一双鞋|wǒ hái mǎile yì shuāng xié}.' },
      { q: 'Mit vett Liu Fang?', a: 'egy szoknyát', wrong: ['egy kabátot', 'egy pár cipőt', 'semmit'], why: '{刘芳买了一条裙子|Liú Fāng mǎile yì tiáo qúnzi}.' }
    ]
  },
  quiz: [
    { q: '„Kérek még egy teát."', a: '{我|wǒ}{还|hái}{要|yào}{一|yì}{杯|bēi}{茶|chá}。', wrong: ['{我|wǒ}{要|yào}{还|hái}{一|yì}{杯|bēi}{茶|chá}。', '{还|hái}{我|wǒ}{要|yào}{一|yì}{杯|bēi}{茶|chá}。', '{我|wǒ}{要|yào}{一|yì}{杯|bēi}{茶|chá}{还|hái}。'], why: 'A {还|hái} az ige elé kerül.', point: 1 },
    { q: 'Mit kérdez az eladó: {你还要别的吗|nǐ hái yào biéde ma}？', a: 'Kér még valami mást?', wrong: ['Kéri a blokkot is?', 'Kártyával fizet?', 'Becsomagoljam?'], why: '{还|hái} „még" + {别的|biéde} „más".', point: 1 },
    { q: 'Mi a különbség? {他也会说英语|tā yě huì shuō Yīngyǔ} · {他还会说英语|tā hái huì shuō Yīngyǔ}', a: '{也|yě}: ő is (mint más) · {还|hái}: ráadásul ezt is', wrong: ['{也|yě}: ráadásul ezt is · {还|hái}: ő is (mint más)', 'nincs különbség, a kettő mindig ugyanaz', '{也|yě}: múlt idejű · {还|hái}: jövő idejű'], why: 'A {还|hái} ugyanannak a személynek egy újabb tudását, tettét adja hozzá.', point: 1 },
    { q: '„Ha tetszik, (akkor) vedd meg!"', a: '{你|nǐ}{喜欢|xǐ·huan}{就|jiù}{买|mǎi}{吧|ba}！', wrong: ['{你|nǐ}{就|jiù}{喜欢|xǐ·huan}{买|mǎi}{吧|ba}！', '{就|jiù}{你|nǐ}{喜欢|xǐ·huan}{买|mǎi}{吧|ba}！', '{你|nǐ}{喜欢|xǐ·huan}{买|mǎi}{吧|ba}{就|jiù}！'], why: 'Feltétel + {就|jiù} + ige.', point: 2 },
    { q: 'Mit jelent: {我七点就起床了|wǒ qī diǎn jiù qǐ chuáng le}。', a: 'Már hétkor felkeltem.', wrong: ['Csak hétkor keltem fel.', 'Hétkor fogok felkelni.', 'Hét órát aludtam.'], why: 'Időpont + {就|jiù} + ige + {了|le}: korábban a vártnál.', point: 2 },
    { q: 'Mit jelent: {我就来|wǒ jiù lái}！', a: 'Mindjárt jövök!', wrong: ['Csak én jövök!', 'Már itt voltam!', 'Nem jövök!'], why: '{就|jiù} „rögtön".', point: 2 },
    { q: '„Akkor legyen ezer." (alkunál)', a: '{那|nà}{就|jiù}{一千|yì·qiān}{吧|ba}。', wrong: ['{那|nà}{一千|yì·qiān}{就|jiù}{吗|ma}。', '{就|jiù}{那|nà}{吧|ba}{一千|yì·qiān}。', '{一千|yì·qiān}{那|nà}{吧|ba}{就|jiù}。'], why: '{那就|nà jiù} … {吧|ba} „akkor legyen …".', point: 2 },
    { q: 'Hogyan mondod: 1200?', a: '{一千|yì·qiān}{二百|èr·bǎi}', wrong: ['{十二|shí·èr}{百|bǎi}', '{一|yì}{二|èr}{百|bǎi}{千|qiān}', '{一千|yì·qiān}{二十|èr·shí}'], why: '{一千|yìqiān} + {二百|èrbǎi}.', point: 3 },
    { q: 'Hogyan mondod: 1050?', a: '{一千|yì·qiān}{零|líng}{五十|wǔ·shí}', wrong: ['{一千|yì·qiān}{五十|wǔ·shí}{零|líng}', '{一千|yì·qiān}{五|wǔ}', '{十|shí}{零|líng}{五十|wǔ·shí}'], why: 'A kimaradt százas helyén {零|líng} áll.', point: 3 },
    { q: 'Mit jelent: {两千块|liǎng qiān kuài}？', a: '2000 jüan', wrong: ['200 jüan', '20 000 jüan', '2 jüan'], why: '{两|liǎng} + {千|qiān} „ezer".', point: 3 },
    { q: '„Kicsit drága." (panaszként)', a: '{有点儿|yǒu·diǎnr}{贵|guì}。', wrong: ['{贵|guì}{有点儿|yǒu·diǎnr}。', '{一点儿|yì·diǎnr}{贵|guì}。', '{贵|guì}{一|yì}{有点儿|yǒu·diǎnr}。'], why: 'Panasz: {有点儿|yǒudiǎnr} + melléknév.', point: 4 },
    { q: '„Nem lehetne kicsit olcsóbban?"', a: '{能|néng}{便宜|pián·yi}{一点儿|yì·diǎnr}{吗|ma}？', wrong: ['{能|néng}{一点儿|yì·diǎnr}{便宜|pián·yi}{吗|ma}？', '{能|néng}{有点儿|yǒu·diǎnr}{便宜|pián·yi}{吗|ma}？', '{便宜|pián·yi}{能|néng}{吗|ma}{一点儿|yì·diǎnr}？'], why: 'Kérés: melléknév + {一点儿|yìdiǎnr}.', point: 4 },
    { q: 'Melyik mérőszó illik? {一|yì} ___ {鞋|xié} (egy pár cipő)', a: '{双|shuāng}', wrong: ['{件|jiàn}', '{条|tiáo}', '{个|ge}'], why: '{双|shuāng} „pár".', point: 5 },
    { q: 'Melyik mérőszó illik? {一|yì} ___ {裤子|kù·zi} (egy nadrág)', a: '{条|tiáo}', wrong: ['{件|jiàn}', '{双|shuāng}', '{本|běn}'], why: 'A {条|tiáo} a hosszú, keskeny dolgoké.', point: 5 },
    { q: '„Felpróbálhatom?"', a: '{我|wǒ}{可以|kě·yǐ}{试|shì}{一下|yí·xià}{吗|ma}？', wrong: ['{我|wǒ}{试|shì}{可以|kě·yǐ}{一下|yí·xià}{吗|ma}？', '{我|wǒ}{一下|yí·xià}{试|shì}{可以|kě·yǐ}{吗|ma}？', '{可以|kě·yǐ}{一下|yí·xià}{我|wǒ}{试|shì}{吗|ma}？'], why: '{可以|kěyǐ} + {试一下|shì yíxià}.', point: 5 },
    { q: 'Mit jelent a {便宜|piányi}?', a: 'olcsó', wrong: ['drága', 'szép', 'új'], why: 'Párja a {贵|guì} „drága".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 6. LECKE — 怎么 (hogyhogy), 因为…所以, 了 (változás), 不…了, 可以
   ════════════════════════════════════════════════════ */
{
  id: 'l21', no: 21, badge: '6', kicker: 'HSK 2 · 6. lecke', label: 'HSK 2 · 6. lecke',
  title: 'Hogyhogy nem jöttél? — okok és változások',
  lead: 'Számon kérsz (你怎么没来？), okot és következményt mondasz (因为…，所以…), változást jelzel (我饿了, 下雨了), és megmondod, mit nem csinálsz már (我不去了).',
  cando: [
    'Meglepődve kérdezel: 怎么 + 没 / 不 + ige.',
    'Okot és következményt kötsz össze: 因为…，所以….',
    'Új helyzetet, változást jelzel a mondatvégi 了-lal.',
    'Kifejezed, hogy már nem, mégsem: 不…了; engedélyt kérsz: 可以吗？'
  ],
  intro: [
    'David tegnap nem ment el Wang Ming születésnapi vacsorájára. Ma magyarázkodik: miért nem, és mi történt vele. A lecke a magyarázkodás eszközeit adja: a számonkérő {怎么|zěnme}-t, az okot és következményt összekötő {因为|yīnwèi} … {所以|suǒyǐ} … párt, és a változást jelző mondatvégi {了|le}-t.',
    'A mondatvégi {了|le} a kínai egyik legfontosabb szava: nemcsak azt mondja, hogy valami megtörtént, hanem azt is, hogy <b>új helyzet</b> állt elő — „megéheztem", „esni kezdett", „már nem megyek".'
  ],
  dialogue: {
    title: 'Magyarázkodás',
    scene: 'Wang Ming és David a kollégium előtt. David tegnap este nem ment el Wang Ming születésnapi vacsorájára.',
    lines: [
      { who: 'Wang Ming', zh: '{大卫|Dà·wèi}，{你|nǐ}{昨天|zuó·tiān}{晚上|wǎn·shang}{怎么|zěn·me}{没|méi}{来|lái}？{我们|wǒ·men}{等|děng}{了|le}{你|nǐ}{半|bàn}{个|ge}{小时|xiǎo·shí}。', hu: 'David, hogyhogy nem jöttél tegnap este? Fél órát vártunk rád.' },
      { who: 'David', zh: '{对不起|duì·bu·qǐ}！{因为|yīn·wèi}{下午|xià·wǔ}{我|wǒ}{打|dǎ}{篮球|lán·qiú}，{太|tài}{累|lèi}{了|le}，{所以|suǒ·yǐ}{在|zài}{家|jiā}{睡|shuì}{着|zháo}{了|le}。', hu: 'Bocsánat! Délután kosaraztam, nagyon elfáradtam, ezért otthon elaludtam.', note: 'A {睡着|shuìzháo} „elalszik": a {着|zháo} azt jelzi, hogy az alvás „sikerült". Az ilyen eredményt jelölő tagokról a HSK 2 9. leckéjében lesz szó.' },
      { who: 'Wang Ming', zh: '{你|nǐ}{现在|xiàn·zài}{还|hái}{累|lèi}{吗|ma}？', hu: 'Most is fáradt vagy még?' },
      { who: 'David', zh: '{不|bú}{累|lèi}{了|le}，{但是|dàn·shì}{我|wǒ}{饿|è}{了|le}。{你|nǐ}{吃|chī}{饭|fàn}{了|le}{吗|ma}？', hu: 'Már nem vagyok fáradt, de megéheztem. Ettél már?' },
      { who: 'Wang Ming', zh: '{没有|méi·yǒu}。{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{食堂|shí·táng}{吧|ba}！', hu: 'Nem. Menjünk együtt a menzára!' },
      { who: 'David', zh: '{今天|jīn·tiān}{食堂|shí·táng}{人|rén}{太|tài}{多|duō}{了|le}，{我|wǒ}{不|bú}{去|qù}{食堂|shí·táng}{了|le}。{我们|wǒ·men}{去|qù}{外边|wài·bian}{吃|chī}，{可以|kě·yǐ}{吗|ma}？', hu: 'Ma túl sokan vannak a menzán, oda már nem megyek. Együnk inkább kint, jó?' },
      { who: 'Wang Ming', zh: '{可以|kě·yǐ}！{我|wǒ}{知道|zhī·dào}{一|yí}{个|ge}{饭馆儿|fàn·guǎnr}，{菜|cài}{很|hěn}{好吃|hǎo·chī}。', hu: 'Jó! Tudok egy éttermet, nagyon finom ott a koszt.' }
    ],
    notes: [
      'Az {对不起|duìbuqǐ} „bocsánat" a {不|bu} miatt semleges tónusú közepű szó.',
      'A {饭馆儿|fànguǎnr} „vendéglő, kifőzde"; nagyobb, elegánsabb étterem: {饭店|fàndiàn}.',
      'A {好吃|hǎochī} „finom (étel)"; italra: {好喝|hǎohē}.'
    ]
  },
  points: [
    {
      title: '{怎么|zěnme}', sub: 'hogyhogy? — meglepődés, számonkérés',
      pattern: 'A + {怎么|zěn·me} + {没|méi} / {不|bù} + ige？',
      body: 'A HSK 1-ben a {怎么|zěnme} + ige „hogyan?" volt: {你怎么去|nǐ zěnme qù}？ „Hogyan mész?" Ha viszont a {怎么|zěnme} egy tagadás vagy váratlan helyzet előtt áll, <b>meglepődést</b>, enyhe szemrehányást fejez ki: {你怎么没来|nǐ zěnme méi lái}？ „Hogyhogy nem jöttél?", {你怎么不吃了|nǐ zěnme bù chī le}？ „Hogyhogy nem eszel tovább?"',
      more: [
        'A {为什么|wèishénme} „miért" semleges kérdés, tényleg az okot kérdezi. A {怎么|zěnme} érzelmesebb: „ez meglep, magyarázd meg".',
        'A {怎么了|zěnme le}？ „mi történt, mi van veled?" is ebbe a családba tartozik.'
      ],
      tables: [
        { caption: 'A {怎么|zěnme} két arca',
          head: ['Példa', 'Jelentés'],
          rows: [
            ['{你|nǐ}{怎么|zěn·me}{去|qù}？', 'Hogyan mész? (mód)'],
            ['{你|nǐ}{怎么|zěn·me}{没|méi}{去|qù}？', 'Hogyhogy nem mentél? (meglepődés)']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{昨天|zuó·tiān}{怎么|zěn·me}{没|méi}{来|lái}？', hu: 'Hogyhogy nem jöttél tegnap?' },
        { zh: '{你|nǐ}{怎么|zěn·me}{不|bù}{吃|chī}{了|le}？', hu: 'Hogyhogy nem eszel tovább?' },
        { zh: '{他|tā}{怎么|zěn·me}{还|hái}{不|bù}{来|lái}？', hu: 'Hogyhogy még mindig nem jön?' }
      ]
    },
    {
      title: '{因为|yīnwèi} … {所以|suǒyǐ} …', sub: 'mivel …, ezért …',
      pattern: '{因为|yīn·wèi} + ok，{所以|suǒ·yǐ} + következmény',
      body: 'A kínai mondat rendszerint előbb az okot mondja, aztán a következményt: {因为太累了，所以我没去|yīnwèi tài lèi le, suǒyǐ wǒ méi qù} „mivel nagyon fáradt voltam, (ezért) nem mentem el". A {因为|yīnwèi} „mivel, mert" az okot, a {所以|suǒyǐ} „ezért" a következményt vezeti be.',
      more: [
        'Bármelyik el is maradhat: {太累了，所以没去|tài lèi le, suǒyǐ méi qù} vagy {因为太累了，我没去|yīnwèi tài lèi le, wǒ méi qù}.',
        'Ha előbb a következményt mondod, az ok {因为|yīnwèi}-vel utána jöhet — ahogy a {为什么|wèishénme}-re adott válaszban (HSK 2 1. lecke): {我没去，因为太累了|wǒ méi qù, yīnwèi tài lèi le}.'
      ],
      examples: [
        { zh: '{因为|yīn·wèi}{下|xià}{雨|yǔ}{了|le}，{所以|suǒ·yǐ}{我们|wǒ·men}{没|méi}{去|qù}{公园|gōng·yuán}。', hu: 'Mivel esni kezdett, nem mentünk a parkba.' },
        { zh: '{因为|yīn·wèi}{我|wǒ}{喜欢|xǐ·huan}{中国|Zhōng·guó}{菜|cài}，{所以|suǒ·yǐ}{学|xué}{了|le}{做|zuò}{饭|fàn}。', hu: 'Mivel szeretem a kínai konyhát, megtanultam főzni.' }
      ],
      mistakes: [
        { bad: '{所以|suǒ·yǐ}{太|tài}{累|lèi}{了|le}，{因为|yīn·wèi}{我|wǒ}{没|méi}{去|qù}。', good: '{因为|yīn·wèi}{太|tài}{累|lèi}{了|le}，{所以|suǒ·yǐ}{我|wǒ}{没|méi}{去|qù}。', why: 'A {所以|suǒyǐ} a következmény elé kerül, a {因为|yīnwèi} az ok elé.' }
      ]
    },
    {
      title: 'mondatvégi {了|le}', sub: 'változás, új helyzet',
      pattern: 'állítmány + {了|le}',
      body: 'A mondat végén álló {了|le} azt jelzi, hogy <b>új helyzet</b> állt elő, valami megváltozott: {我饿了|wǒ è le} „megéheztem", {我累了|wǒ lèi le} „elfáradtam", {下雨了|xià yǔ le} „esni kezdett (esik az eső)", {他二十岁了|tā èrshí suì le} „már húszéves", {秋天了|qiūtiān le} „ősz lett".',
      more: [
        'A HSK 1 14. leckéjében az ige utáni {了|le} a cselekvés befejezettségét jelölte ({我买了两件衣服|wǒ mǎile liǎng jiàn yīfu}). A mondatvégi {了|le} a helyzetről szól: „most már így van".',
        'Melléknév után nincs {很|hěn}, ha változást mondasz: {天黑了|tiān hēi le} „besötétedett".'
      ],
      examples: [
        { zh: '{我|wǒ}{饿|è}{了|le}，{我们|wǒ·men}{去|qù}{吃|chī}{饭|fàn}{吧|ba}。', hu: 'Megéheztem, menjünk enni.' },
        { zh: '{下|xià}{雨|yǔ}{了|le}！', hu: 'Esik az eső! (Esni kezdett.)' },
        { zh: '{我|wǒ}{妹妹|mèi·mei}{今年|jīn·nián}{十八|shí·bā}{岁|suì}{了|le}。', hu: 'A húgom idén (már) tizennyolc éves.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{很|hěn}{饿|è}{了|le}。（= megéheztem）', good: '{我|wǒ}{饿|è}{了|le}。', why: 'Változásnál a melléknév elé nem kell {很|hěn}.' }
      ]
    },
    {
      title: '{不|bù} … {了|le}', sub: 'már nem, mégsem',
      pattern: 'A + {不|bù} + ige / mn. + {了|le} · {没|méi} + főnév + {了|le}',
      body: 'A {不|bù} + {了|le} együtt azt jelenti, hogy valami <b>már nem</b> úgy van, vagy meggondoltad magad: {我不去了|wǒ bú qù le} „mégsem megyek", {我不累了|wǒ bú lèi le} „már nem vagyok fáradt", {他不在这儿工作了|tā bú zài zhèr gōngzuò le} „már nem itt dolgozik".',
      more: [
        'Főnévvel {没|méi}: {没钱了|méi qián le} „elfogyott a pénz", {没有了|méi yǒu le} „elfogyott, nincs több".',
        'Boltban, ha valamiből kifogytak: {对不起，没有了|duìbuqǐ, méi yǒu le} „sajnos elfogyott".'
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{人|rén}{太|tài}{多|duō}{了|le}，{我|wǒ}{不|bú}{去|qù}{了|le}。', hu: 'Ma túl sokan vannak, mégsem megyek.' },
        { zh: '{他|tā}{不|bú}{在|zài}{这儿|zhèr}{工作|gōng·zuò}{了|le}。', hu: 'Már nem itt dolgozik.' },
        { zh: '{我|wǒ}{没|méi}{钱|qián}{了|le}。', hu: 'Elfogyott a pénzem.' }
      ]
    },
    {
      title: '{可以|kěyǐ}', sub: 'szabad, lehet — engedély',
      pattern: 'A + {可以|kě·yǐ} + ige · …，{可以|kě·yǐ}{吗|ma}？',
      body: 'A {可以|kěyǐ} „szabad, lehet" engedélyt ad vagy kér: {你可以试一下|nǐ kěyǐ shì yíxià} „felpróbálhatja", {我可以坐这儿吗|wǒ kěyǐ zuò zhèr ma}？ „Leülhetek ide?" Javaslat után a …，{可以吗|kěyǐ ma}？ „…, jó így?" kérdés. Igenlő válasz: {可以|kěyǐ}.',
      more: [
        'Tiltásként a {不可以|bù kěyǐ} „nem szabad" kissé hivatalos; beszédben gyakoribb a {不能|bù néng} vagy a {别|bié} (HSK 2 10. lecke).',
        'A három „tud" összefoglalva: {会|huì} — megtanulta, {能|néng} — képes, módja van rá, {可以|kěyǐ} — szabad, megengedett.'
      ],
      tables: [
        { caption: '{会|huì}, {能|néng}, {可以|kěyǐ}',
          head: ['', 'Jelentés', 'Példa'],
          rows: [
            ['{会|huì}', 'tud (megtanulta)', '{我|wǒ}{会|huì}{游泳|yóu yǒng}。'],
            ['{能|néng}', 'képes, tud (körülmény)', '{今天|jīn·tiān}{我|wǒ}{不|bù}{能|néng}{去|qù}。'],
            ['{可以|kě·yǐ}', 'szabad, lehet', '{这儿|zhèr}{可以|kě·yǐ}{坐|zuò}{吗|ma}？']
          ] }
      ],
      examples: [
        { zh: '{我们|wǒ·men}{去|qù}{外边|wài·bian}{吃|chī}，{可以|kě·yǐ}{吗|ma}？', hu: 'Együnk kint, jó?' },
        { zh: '{这儿|zhèr}{不|bù}{可以|kě·yǐ}{抽|chōu}{烟|yān}。', hu: 'Itt nem szabad dohányozni.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{怎么|zěn·me}{没|méi}{来|lái}？', hu: 'Hogyhogy nem jöttél?' },
    { zh: '{对不起|duì·bu·qǐ}！', hu: 'Bocsánat!' },
    { zh: '{我|wǒ}{饿|è}{了|le}。', hu: 'Megéheztem.' },
    { zh: '{可以|kě·yǐ}{吗|ma}？', hu: 'Lehet? Jó így?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{所以|suǒ·yǐ}', pinyin: 'suǒyǐ', hu: 'ezért' },
        { zh: '{累|lèi}', pinyin: 'lèi', hu: 'fáradt' },
        { zh: '{饿|è}', pinyin: 'è', hu: 'éhes' },
        { zh: '{可以|kě·yǐ}', pinyin: 'kěyǐ', hu: 'szabad, lehet' },
        { zh: '{篮球|lán·qiú}', pinyin: 'lánqiú', hu: 'kosárlabda' },
        { zh: '{但是|dàn·shì}', pinyin: 'dànshì', hu: 'de' },
        { zh: '{食堂|shí·táng}', pinyin: 'shítáng', hu: 'menza' },
        { zh: '{饭馆儿|fàn·guǎnr}', pinyin: 'fànguǎnr', hu: 'vendéglő' },
        { zh: '{好吃|hǎo·chī}', pinyin: 'hǎochī', hu: 'finom (étel)' },
        { zh: '{对不起|duì·bu·qǐ}', pinyin: 'duìbuqǐ', hu: 'bocsánat' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{睡着|shuì·zháo}', pinyin: 'shuìzháo', hu: 'elaludni' },
        { zh: '{抽烟|chōu yān}', pinyin: 'chōu yān', hu: 'dohányozni' },
        { zh: '{一定|yí·dìng}', pinyin: 'yídìng', hu: 'biztosan, mindenképp' },
        { zh: '{没关系|méi guān·xi}', pinyin: 'méi guānxi', hu: 'semmi baj' }
      ] }
  ],
  culture: [
    { title: 'Kollégium és menza', text: 'A kínai egyetemisták többsége kollégiumban ({宿舍|sùshè}) lakik, gyakran négyen-hatan egy szobában. A menza ({食堂|shítáng}) olcsó és változatos: egy egyetemnek több menzája is lehet, emeletenként más-más konyhával. A külföldi diákoknak általában külön kollégiumuk van.' },
    { title: 'Kosárlabda és pingpong', text: 'A kosárlabda ({篮球|lánqiú}) a kínai fiatalok egyik legnépszerűbb sportja: minden egyetemen sorban állnak a pályák, és délutánonként tele vannak. A pingpong ({乒乓球|pīngpāngqiú}) és a tollaslabda ({羽毛球|yǔmáoqiú}) is nagyon kedvelt, ezekhez parkokban, lakótelepeken is van hely.' }
  ],
  reading: {
    title: '{大卫|Dà·wèi}{为什么|wèi·shén·me}{没|méi}{来|lái}？', titleHu: 'Miért nem jött David?',
    text: [
      { zh: '{昨天|zuó·tiān}{是|shì}{王明|Wáng Míng}{的|de}{生日|shēng·rì}，{晚上|wǎn·shang}{我们|wǒ·men}{在|zài}{饭馆儿|fàn·guǎnr}{吃|chī}{饭|fàn}。', hu: 'Tegnap volt Wang Ming születésnapja, este egy vendéglőben vacsoráztunk.' },
      { zh: '{大卫|Dà·wèi}{没|méi}{来|lái}，{我们|wǒ·men}{都|dōu}{觉得|jué·de}{很|hěn}{奇怪|qí·guài}。', hu: 'David nem jött el, mindannyian furcsállottuk.' },
      { zh: '{今天|jīn·tiān}{他|tā}{说|shuō}：“{因为|yīn·wèi}{我|wǒ}{打|dǎ}{篮球|lán·qiú}{打|dǎ}{了|le}{三|sān}{个|ge}{小时|xiǎo·shí}，{太|tài}{累|lèi}{了|le}，{所以|suǒ·yǐ}{睡|shuì}{着|zháo}{了|le}。”', hu: 'Ma azt mondta: „Három órát kosaraztam, nagyon elfáradtam, ezért elaludtam."', par: true },
      { zh: '{他|tā}{说|shuō}{以后|yǐ·hòu}{不|bú}{在|zài}{晚饭|wǎn·fàn}{以前|yǐ·qián}{打|dǎ}{篮球|lán·qiú}{了|le}。', hu: 'Azt mondta, ezentúl vacsora előtt már nem kosarazik.' },
      { zh: '{王明|Wáng Míng}{说|shuō}：“{没|méi}{关系|guān·xi}，{明年|míng·nián}{的|de}{生日|shēng·rì}{你|nǐ}{一定|yí·dìng}{要|yào}{来|lái}！”', hu: 'Wang Ming azt mondta: „Semmi baj, a jövő évi születésnapomra mindenképp gyere el!"', par: true }
    ],
    words: [ { zh: '{奇怪|qí·guài}', hu: 'furcsa' }, { zh: '{晚饭|wǎn·fàn}', hu: 'vacsora' }, { zh: '{以前|yǐ·qián}', hu: 'előtt' } ],
    questions: [
      { q: 'Mi volt tegnap?', a: 'Wang Ming születésnapja', wrong: ['egy kosárlabdameccs', 'David születésnapja', 'egy nehéz vizsga'], why: '{昨天是王明的生日|zuótiān shì Wáng Míng de shēngrì}.' },
      { q: 'Mennyi ideig kosarazott David?', a: 'három órát', wrong: ['fél órát', 'egész nap', 'egy órát'], why: '{打了三个小时|dǎle sān ge xiǎoshí}.' },
      { q: 'Miért nem ment el David?', a: 'mert elfáradt és elaludt', wrong: ['mert beteg lett', 'mert nem tudott róla', 'mert dolgoznia kellett'], why: '{太累了，所以睡着了|tài lèi le, suǒyǐ shuìzháo le}.' },
      { q: 'Mit kér Wang Ming?', a: 'hogy jövőre mindenképp jöjjön el', wrong: ['hogy kérjen tőle bocsánatot', 'hogy ne kosarazzon többet', 'hogy hívja fel holnap este'], why: '{明年的生日你一定要来|míngnián de shēngrì nǐ yídìng yào lái}.' }
    ]
  },
  quiz: [
    { q: '„Hogyhogy nem jöttél?"', a: '{你|nǐ}{怎么|zěn·me}{没|méi}{来|lái}？', wrong: ['{你|nǐ}{没|méi}{怎么|zěn·me}{来|lái}？', '{怎么|zěn·me}{你|nǐ}{来|lái}{没|méi}{吗|ma}？', '{你|nǐ}{来|lái}{怎么|zěn·me}{没|méi}？'], why: '{怎么|zěnme} + {没|méi} + ige: meglepődés.', point: 1 },
    { q: 'Mi a különbség? {你怎么去|nǐ zěnme qù}？ · {你怎么没去|nǐ zěnme méi qù}？', a: 'hogyan mész? · hogyhogy nem mentél?', wrong: ['miért mész? · hogyan nem mentél?', 'hová mész? · hová nem mentél?', 'nincs különbség, csak nyomaték'], why: 'Tagadással a {怎么|zěnme} meglepődést fejez ki.', point: 1 },
    { q: 'Mit jelent: {你怎么不吃了|nǐ zěnme bù chī le}？', a: 'Hogyhogy nem eszel tovább?', wrong: ['Miért nem ettél tegnap?', 'Hogyan kell ezt megenni?', 'Mit nem eszel meg?'], why: '{怎么|zěnme} + {不|bù} … {了|le}.', point: 1 },
    { q: '„Mivel fáradt voltam, nem mentem el."', a: '{因为|yīn·wèi}{太|tài}{累|lèi}{了|le}，{所以|suǒ·yǐ}{我|wǒ}{没|méi}{去|qù}。', wrong: ['{所以|suǒ·yǐ}{太|tài}{累|lèi}{了|le}，{因为|yīn·wèi}{我|wǒ}{没|méi}{去|qù}。', '{因为|yīn·wèi}{我|wǒ}{没|méi}{去|qù}，{所以|suǒ·yǐ}{太|tài}{累|lèi}{了|le}。', '{我|wǒ}{没|méi}{去|qù}{所以|suǒ·yǐ}，{因为|yīn·wèi}{太|tài}{累|lèi}{了|le}。'], why: '{因为|yīnwèi} + ok, {所以|suǒyǐ} + következmény.', point: 2 },
    { q: 'Mit jelent a {所以|suǒyǐ}?', a: 'ezért', wrong: ['mert', 'de', 'ha'], why: '{因为|yīnwèi} „mert" — {所以|suǒyǐ} „ezért".', point: 2 },
    { q: 'Mit jelent?', zh: '{因为|yīn·wèi}{下|xià}{雨|yǔ}{了|le}，{所以|suǒ·yǐ}{我们|wǒ·men}{不|bú}{去|qù}{了|le}。', a: 'Mivel esni kezdett, mégsem megyünk.', wrong: ['Mivel nem megyünk, esni kezdett.', 'Ha esik, akkor is megyünk.', 'Esett, de elmentünk.'], why: 'Ok ({因为|yīnwèi}) → következmény ({所以|suǒyǐ}).', point: 2 },
    { q: 'Mit jelent: {我饿了|wǒ è le}。', a: 'Megéheztem.', wrong: ['Ettem.', 'Nem vagyok éhes.', 'Éhes voltam tegnap.'], why: 'Mondatvégi {了|le}: új helyzet.', point: 3 },
    { q: 'Mit jelent: {下雨了|xià yǔ le}！', a: 'Esni kezdett!', wrong: ['Tegnap esett.', 'Esni fog.', 'Elállt az eső.'], why: 'Mondatvégi {了|le}: változás.', point: 3 },
    { q: 'Mit fejez ki a {了|le}? {他二十岁了|tā èrshí suì le}', a: 'változást: „már húszéves"', wrong: ['múltat: „húszéves volt"', 'kérdést: „húszéves?"', 'tagadást: „nem húszéves"'], why: 'A mondatvégi {了|le} új helyzetet jelez.', point: 3 },
    { q: '„Elfáradtam."', a: '{我|wǒ}{累|lèi}{了|le}。', wrong: ['{我|wǒ}{了|le}{累|lèi}。', '{我|wǒ}{是|shì}{累|lèi}{了|le}{吗|ma}。', '{累|lèi}{我|wǒ}{了|le}。'], why: 'Melléknév + {了|le}.', point: 3 },
    { q: '„Mégsem megyek."', a: '{我|wǒ}{不|bú}{去|qù}{了|le}。', wrong: ['{我|wǒ}{没|méi}{去|qù}{了|le}{吗|ma}。', '{我|wǒ}{了|le}{不|bú}{去|qù}。', '{我|wǒ}{不|bú}{了|le}{去|qù}。'], why: '{不|bù} + ige + {了|le}: meggondolta magát.', point: 4 },
    { q: 'Mit jelent: {他不在这儿工作了|tā bú zài zhèr gōngzuò le}。', a: 'Már nem itt dolgozik.', wrong: ['Soha nem dolgozott itt.', 'Ma nincs bent a munkahelyén.', 'Itt fog dolgozni.'], why: '{不|bù} … {了|le} „már nem".', point: 4 },
    { q: 'Mit jelent: {没钱了|méi qián le}。', a: 'Elfogyott a pénz.', wrong: ['Pénzt kapott.', 'Sok pénze van.', 'Pénzt váltott.'], why: '{没|méi} + főnév + {了|le}: elfogyott.', point: 4 },
    { q: '„Lehet? Jó így?" (javaslat után)', a: '{可以|kě·yǐ}{吗|ma}？', wrong: ['{会|huì}{吗|ma}？', '{要|yào}{吗|ma}？', '{想|xiǎng}{吗|ma}？'], why: '{可以|kěyǐ} „szabad, lehet".', point: 5 },
    { q: 'Melyik segédige kell? „Tud úszni." (megtanulta)', a: '{会|huì}', wrong: ['{可以|kě·yǐ}', '{要|yào}', '{想|xiǎng}'], why: 'Megtanult tudás: {会|huì}.', point: 5 },
    { q: 'Mit jelent: {这儿不可以抽烟|zhèr bù kěyǐ chōu yān}。', a: 'Itt nem szabad dohányozni.', wrong: ['Itt nem tudok dohányozni.', 'Itt nem akarok dohányozni.', 'Itt senki nem dohányzik.'], why: '{不可以|bù kěyǐ} „nem szabad".', point: 5 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 7. LECKE — 离, 从…到, 要 + időtartam, 还 (még mindig), 吧 (sejtés)
   ════════════════════════════════════════════════════ */
{
  id: 'l22', no: 22, badge: '7', kicker: 'HSK 2 · 7. lecke', label: 'HSK 2 · 7. lecke',
  title: 'Messze laksz? — távolság és közlekedés',
  lead: 'Megmondod, mi milyen messze van (我家离学校很远), honnan hová mész (从我家到学校), mennyi időbe telik (要五十分钟), és sejtésedre megerősítést kérsz (…吧？).',
  cando: [
    'Távolságot fejezel ki a 离 szóval: 离这儿很近.',
    'Kezdő- és végpontot adsz meg: 从…到….',
    'Elmondod, mennyi időbe telik az út: 坐公共汽车要五十分钟.',
    'Tartós állapotot jelzel a 还 szóval (még mindig), és sejtést a mondatvégi 吧-val.'
  ],
  intro: [
    'Wang Ming minden reggel majdnem egy órát buszozik az iskoláig, Anna tíz perc alatt odaér gyalog. Ebben a leckében a távolságról és az utazásról beszélsz: mi milyen messze van, honnan hová mész, mennyi időbe telik.',
    'Két ismerős szó új jelentést kap: a {要|yào} itt „kell, igényel (időt)", a {还|hái} pedig „még mindig". A mondatvégi {吧|ba} pedig nemcsak javasol, hanem sejtést is kifejez: „ugye…?"'
  ],
  dialogue: {
    title: 'Reggeli út',
    scene: 'Reggel nyolc óra. Wang Ming fáradtan ér be az órára; Anna kérdezi, honnan jön.',
    lines: [
      { who: 'Anna', zh: '{王明|Wáng Míng}，{你|nǐ}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{远|yuǎn}{吧|ba}？', hu: 'Wang Ming, ugye messze laksz az iskolától?' },
      { who: 'Wang Ming', zh: '{很|hěn}{远|yuǎn}。{从|cóng}{我|wǒ}{家|jiā}{到|dào}{学校|xué·xiào}，{坐|zuò}{公共汽车|gōng·gòng qì·chē}{要|yào}{五十|wǔ·shí}{分钟|fēn·zhōng}。', hu: 'Nagyon. A házunktól az iskoláig busszal ötven perc.' },
      { who: 'Anna', zh: '{你|nǐ}{每天|měi·tiān}{几|jǐ}{点|diǎn}{出|chū}{门|mén}？', hu: 'Hánykor indulsz el otthonról minden nap?' },
      { who: 'Wang Ming', zh: '{六|liù}{点|diǎn}{半|bàn}。{我|wǒ}{走|zǒu}{的|de}{时候|shí·hou}，{我|wǒ}{弟弟|dì·di}{还|hái}{在|zài}{睡|shuì}{觉|jiào}{呢|ne}。', hu: 'Fél hétkor. Amikor elindulok, az öcsém még alszik.' },
      { who: 'Anna', zh: '{我|wǒ}{住|zhù}{的|de}{地方|dì·fang}{离|lí}{这儿|zhèr}{很|hěn}{近|jìn}，{走|zǒu}{路|lù}{只|zhǐ}{要|yào}{十|shí}{分钟|fēn·zhōng}。', hu: 'Ahol én lakom, az nagyon közel van ide, gyalog csak tíz perc.' },
      { who: 'Wang Ming', zh: '{真|zhēn}{好|hǎo}！{离|lí}{考试|kǎo·shì}{还|hái}{有|yǒu}{两|liǎng}{个|ge}{星期|xīng·qī}，{我|wǒ}{想|xiǎng}{住|zhù}{在|zài}{学校|xué·xiào}{旁边|páng·biān}。', hu: 'Jó neked! Még két hét van a vizsgáig, szeretnék az iskola mellett lakni.' },
      { who: 'Anna', zh: '{我们|wǒ·men}{宿舍|sù·shè}{还|hái}{有|yǒu}{一|yí}{个|ge}{房间|fáng·jiān}，{你|nǐ}{去|qù}{问|wèn}{一下|yí·xià}{吧|ba}！', hu: 'A kollégiumunkban még van egy szabad szoba, kérdezz rá!' }
    ],
    notes: [
      'Az {出门|chū mén} „elindul otthonról, kimegy a házból" (szó szerint „kilép az ajtón").',
      'A {只|zhǐ} „csak" az ige elé kerül: {只要十分钟|zhǐ yào shí fēnzhōng} „csak tíz perc kell".',
      'A {宿舍|sùshè} „kollégium, szállás", a {房间|fángjiān} „szoba".'
    ]
  },
  points: [
    {
      title: '{离|lí}', sub: 'milyen messze? — távolság',
      pattern: 'A + {离|lí} + B + ({很|hěn}) {远|yuǎn} / {近|jìn}',
      body: 'A {离|lí} két hely távolságát viszonyítja: {我家离学校很远|wǒ jiā lí xuéxiào hěn yuǎn} „messze lakom az iskolától" (szó szerint: „a házam az iskolától nagyon messze"). Kérdés: {离这儿多远|lí zhèr duō yuǎn}？ „Milyen messze van innen?", vagy igen-nem kérdéssel: {银行离这儿远不远|yínháng lí zhèr yuǎn bu yuǎn}？',
      more: [
        'Időre is: {离考试还有两个星期|lí kǎoshì hái yǒu liǎng ge xīngqī} „még két hét van a vizsgáig".',
        'A {离|lí} a <b>távolságot</b> adja meg, a {从|cóng} a <b>kiindulópontot</b> (mozgásnál) — ld. a következő pontot.'
      ],
      examples: [
        { zh: '{我|wǒ}{住|zhù}{的|de}{地方|dì·fang}{离|lí}{这儿|zhèr}{很|hěn}{近|jìn}。', hu: 'Ahol lakom, az nagyon közel van ide.' },
        { zh: '{银行|yín·háng}{离|lí}{这儿|zhèr}{远|yuǎn}{不|bu}{远|yuǎn}？', hu: 'Messze van innen a bank?' },
        { zh: '{离|lí}{新年|xīn·nián}{还|hái}{有|yǒu}{十|shí}{天|tiān}。', hu: 'Még tíz nap van újévig.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{家|jiā}{从|cóng}{学校|xué·xiào}{很|hěn}{远|yuǎn}。', good: '{我|wǒ}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{远|yuǎn}。', why: 'Távolságnál {离|lí} kell, nem {从|cóng}.' }
      ]
    },
    {
      title: '{从|cóng} … {到|dào} …', sub: '-tól -ig — térben és időben',
      pattern: '{从|cóng} + A + {到|dào} + B + ige',
      body: 'Kiindulópont és végpont, térben és időben: {从我家到学校|cóng wǒ jiā dào xuéxiào} „a házamtól az iskoláig", {从八点到十二点|cóng bā diǎn dào shí\'èr diǎn} „nyolctól tizenkettőig". Az egész az ige <b>elé</b> kerül: {我们从星期一到星期五上课|wǒmen cóng xīngqīyī dào xīngqīwǔ shàng kè} „hétfőtől péntekig vannak óráink".',
      more: [
        'A {从|cóng} egymagában „-ból, -tól": {我从上海来|wǒ cóng Shànghǎi lái} „Sanghajból jövök", {你是从哪儿来的|nǐ shì cóng nǎr lái de}？ „Honnan jöttél?"'
      ],
      examples: [
        { zh: '{从|cóng}{我|wǒ}{家|jiā}{到|dào}{学校|xué·xiào}{要|yào}{五十|wǔ·shí}{分钟|fēn·zhōng}。', hu: 'A házunktól az iskoláig ötven perc.' },
        { zh: '{我们|wǒ·men}{从|cóng}{星期一|xīng·qī·yī}{到|dào}{星期五|xīng·qī·wǔ}{上|shàng}{课|kè}。', hu: 'Hétfőtől péntekig vannak óráink.' },
        { zh: '{你|nǐ}{是|shì}{从|cóng}{哪儿|nǎr}{来|lái}{的|de}？', hu: 'Honnan jöttél?' }
      ],
      mistakes: [
        { bad: '{我们|wǒ·men}{上|shàng}{课|kè}{从|cóng}{八|bā}{点|diǎn}{到|dào}{十二|shí·èr}{点|diǎn}。', good: '{我们|wǒ·men}{从|cóng}{八|bā}{点|diǎn}{到|dào}{十二|shí·èr}{点|diǎn}{上|shàng}{课|kè}。', why: 'Az időhatározó (a {从|cóng} … {到|dào} … is) az ige elé kerül.' }
      ]
    },
    {
      title: '{要|yào} + időtartam', sub: 'mennyi időbe telik?',
      pattern: '(út / jármű) + {要|yào} + időtartam',
      body: 'A {要|yào} itt azt jelenti: „kell, igényel (időt, pénzt)". {坐公共汽车要五十分钟|zuò gōnggòng qìchē yào wǔshí fēnzhōng} „busszal ötven perc (kell)", {走路只要十分钟|zǒu lù zhǐ yào shí fēnzhōng} „gyalog csak tíz perc". Kérdés: {要多长时间|yào duō cháng shíjiān}？ „Mennyi idő kell?"',
      more: [
        'A {只|zhǐ} „csak" a {要|yào} elé kerül.',
        'Pénzre is: {这个要多少钱|zhège yào duōshao qián}？ „Ez mennyibe kerül?"'
      ],
      tables: [
        { caption: 'Hogyan mész?',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{走|zǒu}{路|lù}', 'gyalog'],
            ['{坐|zuò}{公共汽车|gōng·gòng qì·chē}', 'busszal'],
            ['{坐|zuò}{地铁|dì·tiě}', 'metróval'],
            ['{坐|zuò}{出租车|chū·zū·chē}', 'taxival'],
            ['{骑|qí}{自行车|zì·xíng·chē}', 'biciklivel']
          ] }
      ],
      examples: [
        { zh: '{坐|zuò}{地铁|dì·tiě}{要|yào}{多|duō}{长|cháng}{时间|shí·jiān}？', hu: 'Metróval mennyi idő?' },
        { zh: '{走|zǒu}{路|lù}{只|zhǐ}{要|yào}{十|shí}{分钟|fēn·zhōng}。', hu: 'Gyalog csak tíz perc.' }
      ]
    },
    {
      title: '{还|hái}', sub: 'még mindig, még',
      pattern: 'A + {还|hái} + ige / melléknév (+ {呢|ne})',
      body: 'A {还|hái} (HSK 2 5. lecke: „még, ráadásul") másik jelentése: „<b>még mindig</b>" — egy állapot tart: {弟弟还在睡觉呢|dìdi hái zài shuì jiào ne} „az öcsém még alszik", {时间还早|shíjiān hái zǎo} „még korán van", {你还累吗|nǐ hái lèi ma}？ „Még mindig fáradt vagy?"',
      more: [
        'A mondatvégi {呢|ne} gyakran kíséri: az állapot most is tart.',
        'Mennyiséggel: {还有两个星期|hái yǒu liǎng ge xīngqī} „még két hét van", {还有一个房间|hái yǒu yí ge fángjiān} „még van egy szoba".'
      ],
      examples: [
        { zh: '{我|wǒ}{走|zǒu}{的|de}{时候|shí·hou}，{弟弟|dì·di}{还|hái}{在|zài}{睡|shuì}{觉|jiào}{呢|ne}。', hu: 'Amikor elindulok, az öcsém még alszik.' },
        { zh: '{时间|shí·jiān}{还|hái}{早|zǎo}，{我们|wǒ·men}{喝|hē}{杯|bēi}{茶|chá}{吧|ba}。', hu: 'Még korán van, igyunk meg egy teát.' },
        { zh: '{他|tā}{还|hái}{在|zài}{北京|Běi·jīng}{工作|gōng·zuò}。', hu: 'Még mindig Pekingben dolgozik.' }
      ]
    },
    {
      title: '…{吧|ba}？', sub: 'sejtés: „ugye…?"',
      pattern: 'állítás + {吧|ba}？',
      body: 'A HSK 1-ben a mondatvégi {吧|ba} javaslatot tett: {我们走吧|wǒmen zǒu ba} „menjünk". Kérdő hanglejtéssel viszont <b>sejtést</b> fejez ki, amelyre megerősítést vársz: {你家离学校很远吧|nǐ jiā lí xuéxiào hěn yuǎn ba}？ „Ugye messze laksz az iskolától?", {你是大卫吧|nǐ shì Dàwèi ba}？ „Te vagy David, ugye?"',
      tables: [
        { caption: 'Három kérdés',
          head: ['', 'Mit jelez?', 'Példa'],
          rows: [
            ['{吗|ma}', 'semleges kérdés', '{你|nǐ}{是|shì}{老师|lǎo·shī}{吗|ma}？'],
            ['{吧|ba}', 'sejtés: „ugye…?"', '{你|nǐ}{是|shì}{老师|lǎo·shī}{吧|ba}？'],
            ['{是不是|shì bu shì}', 'megerősítés: „igaz, hogy…?"', '{你|nǐ}{是|shì}{不|bu}{是|shì}{老师|lǎo·shī}？']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{远|yuǎn}{吧|ba}？', hu: 'Ugye messze laksz az iskolától?' },
        { zh: '{你|nǐ}{是|shì}{大卫|Dà·wèi}{吧|ba}？', hu: 'Te vagy David, ugye?' },
        { zh: '{你|nǐ}{饿|è}{了|le}{吧|ba}？', hu: 'Megéheztél, ugye?' }
      ]
    }
  ],
  phrases: [
    { zh: '{离|lí}{这儿|zhèr}{远|yuǎn}{吗|ma}？', hu: 'Messze van innen?' },
    { zh: '{要|yào}{多|duō}{长|cháng}{时间|shí·jiān}？', hu: 'Mennyi idő kell?' },
    { zh: '{走|zǒu}{路|lù}{十|shí}{分钟|fēn·zhōng}。', hu: 'Gyalog tíz perc.' },
    { zh: '{时间|shí·jiān}{还|hái}{早|zǎo}。', hu: 'Még korán van.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{离|lí}', pinyin: 'lí', hu: '-tól (távolság)' },
        { zh: '{近|jìn}', pinyin: 'jìn', hu: 'közel' },
        { zh: '{远|yuǎn}', pinyin: 'yuǎn', hu: 'messze' },
        { zh: '{从|cóng}', pinyin: 'cóng', hu: '-ból, -tól' },
        { zh: '{公共汽车|gōng·gòng qì·chē}', pinyin: 'gōnggòng qìchē', hu: 'busz' },
        { zh: '{分钟|fēn·zhōng}', pinyin: 'fēnzhōng', hu: 'perc (időtartam)' },
        { zh: '{走路|zǒu lù}', pinyin: 'zǒu lù', hu: 'gyalogolni' },
        { zh: '{只|zhǐ}', pinyin: 'zhǐ', hu: 'csak' },
        { zh: '{考试|kǎo·shì}', pinyin: 'kǎoshì', hu: 'vizsga, dolgozat' },
        { zh: '{房间|fáng·jiān}', pinyin: 'fángjiān', hu: 'szoba' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{出门|chū mén}', pinyin: 'chū mén', hu: 'elindulni otthonról' },
        { zh: '{宿舍|sù·shè}', pinyin: 'sùshè', hu: 'kollégium' },
        { zh: '{地铁|dì·tiě}', pinyin: 'dìtiě', hu: 'metró' },
        { zh: '{自行车|zì·xíng·chē}', pinyin: 'zìxíngchē', hu: 'kerékpár' }
      ] }
  ],
  culture: [
    { title: 'Ingázás a nagyvárosban', text: 'Peking és Sanghaj hatalmas városok: sokan napi egy-két órát töltenek utazással. A metróhálózat óriási és olcsó, de csúcsidőben zsúfolt — a peronon őrök terelik az utasokat. Ezért a fiatalok közül sokan a munkahelyük vagy az egyetem közelében bérelnek kis szobát, még ha drágább is.' },
    { title: 'Megosztott biciklik', text: 'A kínai városok utcáin mindenütt színes közösségi biciklik ({共享单车|gòngxiǎng dānchē}) állnak. A kormányon lévő QR-kódot beolvasod a telefonnal, és már indulhatsz is; a célnál bárhol letehető. Rövid utakra — a metrótól az egyetemig — ez a leggyorsabb és legolcsóbb megoldás.' }
  ],
  reading: {
    title: '{王明|Wáng Míng}{的|de}{早上|zǎo·shang}', titleHu: 'Wang Ming reggele',
    text: [
      { zh: '{王明|Wáng Míng}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{远|yuǎn}。', hu: 'Wang Ming messze lakik az iskolától.' },
      { zh: '{他|tā}{每天|měi·tiān}{六|liù}{点|diǎn}{半|bàn}{出|chū}{门|mén}，{那|nà}{时候|shí·hou}{他|tā}{弟弟|dì·di}{还|hái}{在|zài}{睡|shuì}{觉|jiào}。', hu: 'Minden nap fél hétkor indul el, akkor az öccse még alszik.' },
      { zh: '{从|cóng}{他|tā}{家|jiā}{到|dào}{学校|xué·xiào}，{坐|zuò}{公共汽车|gōng·gòng qì·chē}{要|yào}{五十|wǔ·shí}{分钟|fēn·zhōng}。', hu: 'A házuktól az iskoláig busszal ötven perc az út.', par: true },
      { zh: '{安娜|Ān·nà}{住|zhù}{的|de}{地方|dì·fang}{离|lí}{学校|xué·xiào}{很|hěn}{近|jìn}，{走|zǒu}{路|lù}{只|zhǐ}{要|yào}{十|shí}{分钟|fēn·zhōng}。', hu: 'Ahol Anna lakik, az nagyon közel van az iskolához, gyalog csak tíz perc.' },
      { zh: '{离|lí}{考试|kǎo·shì}{还|hái}{有|yǒu}{两|liǎng}{个|ge}{星期|xīng·qī}，{王明|Wáng Míng}{想|xiǎng}{住|zhù}{在|zài}{学校|xué·xiào}{的|de}{宿舍|sù·shè}。', hu: 'Még két hét van a vizsgáig, Wang Ming az iskola kollégiumában szeretne lakni.', par: true }
    ],
    words: [ { zh: '{宿舍|sù·shè}', hu: 'kollégium' } ],
    questions: [
      { q: 'Hánykor indul el otthonról Wang Ming?', a: 'fél hétkor', wrong: ['hatkor', 'hétkor', 'fél nyolckor'], why: '{六点半出门|liù diǎn bàn chū mén}.' },
      { q: 'Mit csinál ilyenkor az öccse?', a: 'még alszik', wrong: ['reggelizik', 'már iskolában van', 'busszal utazik'], why: '{还在睡觉|hái zài shuì jiào}.' },
      { q: 'Mennyi idő Wang Mingnak az út busszal?', a: 'ötven perc', wrong: ['tíz perc', 'egy óra', 'fél óra'], why: '{要五十分钟|yào wǔshí fēnzhōng}.' },
      { q: 'Mit szeretne Wang Ming?', a: 'az iskola kollégiumában lakni', wrong: ['Anna szomszédságában lakni', 'biciklivel járni iskolába', 'otthon tanulni a vizsgára'], why: '{想住在学校的宿舍|xiǎng zhù zài xuéxiào de sùshè}.' }
    ]
  },
  quiz: [
    { q: '„Messze lakom az iskolától."', a: '{我|wǒ}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{远|yuǎn}。', wrong: ['{我|wǒ}{家|jiā}{从|cóng}{学校|xué·xiào}{很|hěn}{远|yuǎn}。', '{我|wǒ}{家|jiā}{很|hěn}{远|yuǎn}{离|lí}{学校|xué·xiào}。', '{离|lí}{我|wǒ}{家|jiā}{学校|xué·xiào}{远|yuǎn}{很|hěn}。'], why: 'A + {离|lí} + B + {远|yuǎn}.', point: 1 },
    { q: '„Messze van innen a bank?"', a: '{银行|yín·háng}{离|lí}{这儿|zhèr}{远|yuǎn}{不|bu}{远|yuǎn}？', wrong: ['{银行|yín·háng}{从|cóng}{这儿|zhèr}{远|yuǎn}{吗|ma}{不|bu}？', '{这儿|zhèr}{离|lí}{远|yuǎn}{银行|yín·háng}{吗|ma}？', '{银行|yín·háng}{远|yuǎn}{离|lí}{这儿|zhèr}{不|bu}{远|yuǎn}？'], why: 'A + {离|lí} + B + {远不远|yuǎn bu yuǎn}.', point: 1 },
    { q: 'Mit jelent: {离考试还有两个星期|lí kǎoshì hái yǒu liǎng ge xīngqī}。', a: 'Még két hét van a vizsgáig.', wrong: ['Két hete volt a vizsga.', 'A vizsga két hétig tart.', 'Két hétig tanulok a vizsgára.'], why: '{离|lí} időre is: „-ig még …".', point: 1 },
    { q: 'Mit jelent a {近|jìn}?', a: 'közel', wrong: ['messze', 'gyors', 'lassú'], why: '{近|jìn} „közel" — {远|yuǎn} „messze".', point: 1 },
    { q: '„a házamtól az iskoláig"', a: '{从|cóng}{我|wǒ}{家|jiā}{到|dào}{学校|xué·xiào}', wrong: ['{离|lí}{我|wǒ}{家|jiā}{到|dào}{学校|xué·xiào}', '{到|dào}{我|wǒ}{家|jiā}{从|cóng}{学校|xué·xiào}', '{从|cóng}{学校|xué·xiào}{我|wǒ}{家|jiā}{到|dào}'], why: '{从|cóng} + kezdőpont + {到|dào} + végpont.', point: 2 },
    { q: '„Hétfőtől péntekig vannak óráink."', a: '{我们|wǒ·men}{从|cóng}{星期一|xīng·qī·yī}{到|dào}{星期五|xīng·qī·wǔ}{上|shàng}{课|kè}。', wrong: ['{我们|wǒ·men}{上|shàng}{课|kè}{从|cóng}{星期一|xīng·qī·yī}{星期五|xīng·qī·wǔ}{到|dào}。', '{从|cóng}{我们|wǒ·men}{星期一|xīng·qī·yī}{上|shàng}{课|kè}{到|dào}{星期五|xīng·qī·wǔ}。', '{我们|wǒ·men}{到|dào}{星期一|xīng·qī·yī}{从|cóng}{星期五|xīng·qī·wǔ}{上|shàng}{课|kè}。'], why: 'A {从|cóng} … {到|dào} … az ige elé kerül.', point: 2 },
    { q: 'Mit jelent: {你是从哪儿来的|nǐ shì cóng nǎr lái de}？', a: 'Honnan jöttél?', wrong: ['Hová mész?', 'Hol laksz?', 'Mikor jöttél?'], why: '{从|cóng} „-ból, -tól".', point: 2 },
    { q: '„Busszal ötven perc."', a: '{坐|zuò}{公共汽车|gōng·gòng qì·chē}{要|yào}{五十|wǔ·shí}{分钟|fēn·zhōng}。', wrong: ['{坐|zuò}{公共汽车|gōng·gòng qì·chē}{五十|wǔ·shí}{分钟|fēn·zhōng}{要|yào}。', '{要|yào}{五十|wǔ·shí}{分钟|fēn·zhōng}{坐|zuò}{的|de}{公共汽车|gōng·gòng qì·chē}。', '{公共汽车|gōng·gòng qì·chē}{坐|zuò}{要|yào}{分钟|fēn·zhōng}{五十|wǔ·shí}。'], why: 'Jármű + {要|yào} + időtartam.', point: 3 },
    { q: 'Mit jelent a {要|yào} itt: {走路只要十分钟|zǒu lù zhǐ yào shí fēnzhōng}?', a: 'kell, igényel (időt)', wrong: ['akar, szándékozik', 'kér valamit', 'fog (jövő idő)'], why: '{要|yào} + időtartam: ennyi idő kell.', point: 3 },
    { q: '„Mennyi idő kell?"', a: '{要|yào}{多|duō}{长|cháng}{时间|shí·jiān}？', wrong: ['{要|yào}{几|jǐ}{点|diǎn}？', '{要|yào}{什么|shén·me}{时候|shí·hou}？', '{时间|shí·jiān}{要|yào}{多|duō}{远|yuǎn}？'], why: '{多长时间|duō cháng shíjiān} „mennyi idő".', point: 3 },
    { q: '„Gyalog csak tíz perc."', a: '{走|zǒu}{路|lù}{只|zhǐ}{要|yào}{十|shí}{分钟|fēn·zhōng}。', wrong: ['{走|zǒu}{路|lù}{要|yào}{只|zhǐ}{十|shí}{分钟|fēn·zhōng}。', '{只|zhǐ}{走|zǒu}{路|lù}{十|shí}{分钟|fēn·zhōng}{要|yào}。', '{走|zǒu}{只|zhǐ}{路|lù}{十|shí}{要|yào}{分钟|fēn·zhōng}。'], why: 'A {只|zhǐ} a {要|yào} elé kerül.', point: 3 },
    { q: '„Még alszik."', a: '{他|tā}{还|hái}{在|zài}{睡|shuì}{觉|jiào}{呢|ne}。', wrong: ['{他|tā}{在|zài}{睡|shuì}{觉|jiào}{还|hái}{呢|ne}。', '{他|tā}{睡|shuì}{觉|jiào}{还|hái}{在|zài}{呢|ne}。', '{还|hái}{他|tā}{呢|ne}{在|zài}{睡|shuì}{觉|jiào}。'], why: '{还|hái} + {在|zài} + ige + {呢|ne}.', point: 4 },
    { q: 'Mit jelent: {时间还早|shíjiān hái zǎo}。', a: 'Még korán van.', wrong: ['Már késő van.', 'Nincs időm.', 'Korán keltem.'], why: '{还|hái} „még (mindig)".', point: 4 },
    { q: 'Mit jelent a {还|hái} itt: {你还累吗|nǐ hái lèi ma}？', a: 'még mindig', wrong: ['ráadásul', 'is', 'már'], why: 'Tartós állapot: „még mindig fáradt vagy?"', point: 4 },
    { q: '„Te vagy David, ugye?"', a: '{你|nǐ}{是|shì}{大卫|Dà·wèi}{吧|ba}？', wrong: ['{你|nǐ}{是|shì}{大卫|Dà·wèi}{呢|ne}？', '{你|nǐ}{吧|ba}{是|shì}{大卫|Dà·wèi}？', '{吧|ba}{你|nǐ}{是|shì}{大卫|Dà·wèi}？'], why: 'Mondatvégi {吧|ba}: sejtés.', point: 5 },
    { q: 'Mi a különbség? {你是老师吗|nǐ shì lǎoshī ma}？ · {你是老师吧|nǐ shì lǎoshī ba}？', a: 'semleges kérdés · sejtés: „ugye tanár vagy?"', wrong: ['sejtés · semleges kérdés: „tanár vagy?"', 'kérdés · felszólítás: „legyél tanár!"', 'nincs különbség, csak más a hangsúly'], why: 'A {吧|ba} azt jelzi: „szerintem így van".', point: 5 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 8. LECKE — 让, igekettőzés, 再 / 又, 告诉, 先…再…
   ════════════════════════════════════════════════════ */
{
  id: 'l23', no: 23, badge: '8', kicker: 'HSK 2 · 8. lecke', label: 'HSK 2 · 8. lecke',
  title: 'Hadd gondolkodjak — tanács és program',
  lead: 'Tanácsot kérsz és adsz: hagyod vagy kéred, hogy valaki tegyen valamit (让我想想), könnyedén javasolsz (看看, 休息休息), sorrendet adsz (先…再…), és megkérsz valakit, hogy mondja el még egyszer (再说一遍).',
  cando: [
    'Kifejezed, hogy valaki hagyja vagy kéri, hogy más tegyen valamit: 让 + személy + ige.',
    'Az ige megkettőzésével könnyed, rövid cselekvést mondasz: 看看, 想一想, 休息休息.',
    'Jövőbeli ismétlést (再) és múltbelit (又) megkülönböztetsz.',
    'Közölsz valamit valakivel (告诉), és sorrendet adsz meg: 先…再….'
  ],
  intro: [
    'Anna anyukája Pekingbe látogat, és Anna Zhang tanárnőtől kér tanácsot: hová vigye? A tanárnő gondolkodik, javasol, sorrendet ad. Közben megtanulod a {让|ràng} szót, amellyel azt mondod, hogy valaki <b>hagyja vagy kéri</b>, hogy más tegyen valamit.',
    'A kínai beszédet nagyon jellemzi az ige megkettőzése: {看看|kànkan}, {想想|xiǎngxiang}. Ettől a kérés, javaslat könnyedebb, barátságosabb lesz — „nézz csak körül", „gondold át egy kicsit".'
  ],
  dialogue: {
    title: 'Programterv',
    scene: 'Anna édesanyja jövő héten Pekingbe látogat. Anna óra után Zhang tanárnőtől kér tanácsot.',
    lines: [
      { who: 'Anna', zh: '{张|Zhāng}{老师|lǎo·shī}，{我|wǒ}{妈妈|mā·ma}{下|xià}{个|ge}{星期|xīng·qī}{来|lái}{北京|Běi·jīng}。{您|nín}{觉得|jué·de}{我|wǒ}{应该|yīng·gāi}{带|dài}{她|tā}{去|qù}{哪儿|nǎr}？', hu: 'Zhang tanárnő, anyukám jövő héten Pekingbe jön. Ön szerint hová vigyem?' },
      { who: 'Zhang tanárnő', zh: '{让|ràng}{我|wǒ}{想|xiǎng}{想|xiang}……{你|nǐ}{妈妈|mā·ma}{喜欢|xǐ·huan}{什么|shén·me}？', hu: 'Hadd gondolkodjak… Mit szeret az anyukád?' },
      { who: 'Anna', zh: '{她|tā}{喜欢|xǐ·huan}{喝|hē}{茶|chá}，{也|yě}{喜欢|xǐ·huan}{看|kàn}{老|lǎo}{房子|fáng·zi}。', hu: 'Szereti a teát, és szívesen nézi a régi házakat.' },
      { who: 'Zhang tanárnő', zh: '{那|nà}{你们|nǐ·men}{先|xiān}{去|qù}{胡同|hú·tòng}{看|kàn}{看|kan}，{再|zài}{去|qù}{茶馆|chá·guǎn}{喝|hē}{茶|chá}，{休息|xiū·xi}{休息|xiū·xi}。', hu: 'Akkor először nézzetek körül a hutongokban, aztán menjetek el egy teaházba, és pihenjetek egy kicsit.' },
      { who: 'Anna', zh: '{太|tài}{好|hǎo}{了|le}！{您|nín}{能|néng}{告诉|gào·su}{我|wǒ}{哪|nǎ}{个|ge}{茶馆|chá·guǎn}{好|hǎo}{吗|ma}？', hu: 'Nagyszerű! Meg tudná mondani, melyik teaház jó?' },
      { who: 'Zhang tanárnő', zh: '{我|wǒ}{一会儿|yí·huìr}{给|gěi}{你|nǐ}{发|fā}{一|yí}{个|ge}{地址|dì·zhǐ}。{你|nǐ}{妈妈|mā·ma}{来|lái}{了|le}{以后|yǐ·hòu}，{让|ràng}{她|tā}{也|yě}{来|lái}{学校|xué·xiào}{看|kàn}{看|kan}{吧|ba}！', hu: 'Mindjárt küldök egy címet. Ha az anyukád megérkezett, hozd el az iskolába is!' },
      { who: 'Anna', zh: '{好|hǎo}，{谢谢|xiè·xie}{您|nín}！{我|wǒ}{再|zài}{问|wèn}{问|wen}{她|tā}{想|xiǎng}{去|qù}{哪儿|nǎr}。', hu: 'Rendben, köszönöm! Majd megkérdezem tőle is, hová szeretne menni.' }
    ],
    notes: [
      'Az {应该|yīnggāi} „kell(ene), illik"; a {带|dài} „magával visz, elvisz".',
      'A {胡同|hútòng} a régi Peking keskeny sikátora; a {茶馆|cháguǎn} „teaház".',
      'Az {一会儿|yíhuìr} „egy kis idő (múlva)"; a {发|fā} „küld (üzenetet)", az {地址|dìzhǐ} „cím".'
    ]
  },
  points: [
    {
      title: '{让|ràng}', sub: 'hagy, kér, ráveszi, hogy …',
      pattern: 'A + {让|ràng} + B + ige',
      body: 'A {让|ràng} azt jelenti: A <b>hagyja, kéri vagy ráveszi</b> B-t, hogy tegyen valamit. {让我想想|ràng wǒ xiǎngxiang} „hadd gondolkodjak", {妈妈让我多穿衣服|māma ràng wǒ duō chuān yīfu} „anya azt mondja, öltözzek melegebben", {老师让我们写汉字|lǎoshī ràng wǒmen xiě Hànzì} „a tanár írásjegyeket írat velünk".',
      more: [
        'Engedélykérésként: {让我试试|ràng wǒ shìshi} „hadd próbáljam meg".',
        'A tagadás a {让|ràng} elé kerül: {妈妈不让我去|māma bú ràng wǒ qù} „anya nem enged el".'
      ],
      examples: [
        { zh: '{让|ràng}{我|wǒ}{想|xiǎng}{想|xiang}。', hu: 'Hadd gondolkodjak.' },
        { zh: '{老师|lǎo·shī}{让|ràng}{我们|wǒ·men}{写|xiě}{汉字|Hàn·zì}。', hu: 'A tanár írásjegyeket írat velünk.' },
        { zh: '{妈妈|mā·ma}{不|bú}{让|ràng}{我|wǒ}{喝|hē}{咖啡|kā·fēi}。', hu: 'Anya nem engedi, hogy kávét igyak.' }
      ],
      mistakes: [
        { bad: '{让|ràng}{想|xiǎng}{想|xiang}{我|wǒ}。', good: '{让|ràng}{我|wǒ}{想|xiǎng}{想|xiang}。', why: 'A {让|ràng} után előbb a személy, aztán az ige.' }
      ]
    },
    {
      title: 'Igekettőzés', sub: 'könnyed, rövid cselekvés',
      pattern: 'A + A · A + {一|yi} + A · AB + AB',
      body: 'Ha az igét megkettőzöd, a cselekvés <b>rövid, könnyed, próbálgató</b> lesz — hasonlóan az {一下|yíxià}-hez (HSK 2 3. lecke): {看看|kànkan} „nézz csak körül", {想想|xiǎngxiang} „gondold át", {试试|shìshi} „próbáld ki". Egy szótagú igénél közé {一|yi} is kerülhet: {想一想|xiǎng yi xiǎng}. Két szótagú igénél az egész szót ismételjük: {休息休息|xiūxi xiūxi} „pihenj egy kicsit", {介绍介绍|jièshào jièshào}.',
      more: [
        'A második tag (és a közbülső {一|yi}) semleges tónusú: <i>kànkan</i>, <i>xiǎng yi xiǎng</i>.',
        'Múltban {了|le} kerül a két tag közé: {他看了看|tā kànle kàn} „megnézte (röviden)".'
      ],
      tables: [
        { caption: 'Kettőzött igék',
          head: ['Alap', 'Kettőzve', 'Jelentés'],
          rows: [
            ['{看|kàn}', '{看|kàn}{看|kan}', 'nézz körül, nézd meg'],
            ['{想|xiǎng}', '{想|xiǎng}{一|yi}{想|xiang}', 'gondold át'],
            ['{休息|xiū·xi}', '{休息|xiū·xi}{休息|xiū·xi}', 'pihenj egy kicsit'],
            ['{介绍|jiè·shào}', '{介绍|jiè·shào}{介绍|jiè·shào}', 'mutasd be röviden']
          ] }
      ],
      examples: [
        { zh: '{你们|nǐ·men}{先|xiān}{去|qù}{胡同|hú·tòng}{看|kàn}{看|kan}。', hu: 'Először nézzetek körül a hutongokban.' },
        { zh: '{你|nǐ}{累|lèi}{了|le}，{休息|xiū·xi}{休息|xiū·xi}{吧|ba}。', hu: 'Elfáradtál, pihenj egy kicsit.' },
        { zh: '{这|zhè}{件|jiàn}{衣服|yī·fu}{你|nǐ}{试|shì}{试|shi}。', hu: 'Ezt a ruhát próbáld fel.' }
      ],
      mistakes: [
        { bad: '{休|xiū}{休|xiū}{息|xi}{息|xi}', good: '{休息|xiū·xi}{休息|xiū·xi}', why: 'Két szótagú igénél az egész szó ismétlődik: AB AB.' }
      ]
    },
    {
      title: '{再|zài} · {又|yòu}', sub: 'újra — a jövőben és a múltban',
      pattern: '{再|zài} + ige (jövő) · {又|yòu} + ige + {了|le} (múlt)',
      body: 'A {再|zài} „újra, még egyszer" <b>jövőbeli</b> ismétlés: {请再说一遍|qǐng zài shuō yí biàn} „kérem, mondja el még egyszer", {欢迎再来|huānyíng zài lái} „jöjjön máskor is". Jelentése „majd, (csak) később" is lehet: {明天再说|míngtiān zài shuō} „majd holnap megbeszéljük", {我再问问她|wǒ zài wènwen tā} „majd megkérdezem". A már <b>megtörtént</b> ismétlésre a {又|yòu} „megint" való: {他又来了|tā yòu lái le} „megint eljött".',
      more: [
        'A {遍|biàn} „egyszer (elejétől végéig)": {说一遍|shuō yí biàn} „elmondja egyszer", {再听一遍|zài tīng yí biàn} „meghallgatja még egyszer".'
      ],
      tables: [
        { caption: '{再|zài} vagy {又|yòu}?',
          head: ['', 'Idő', 'Példa'],
          rows: [
            ['{再|zài}', 'jövő', '{明天|míng·tiān}{再|zài}{来|lái}。'],
            ['{又|yòu}', 'múlt', '{他|tā}{昨天|zuó·tiān}{又|yòu}{来|lái}{了|le}。']
          ] }
      ],
      examples: [
        { zh: '{请|qǐng}{再|zài}{说|shuō}{一|yí}{遍|biàn}。', hu: 'Kérem, mondja el még egyszer.' },
        { zh: '{我|wǒ}{再|zài}{问|wèn}{问|wen}{她|tā}。', hu: 'Majd megkérdezem tőle.' },
        { zh: '{他|tā}{又|yòu}{没|méi}{来|lái}。', hu: 'Megint nem jött el.' }
      ],
      mistakes: [
        { bad: '{他|tā}{昨天|zuó·tiān}{再|zài}{来|lái}{了|le}。', good: '{他|tā}{昨天|zuó·tiān}{又|yòu}{来|lái}{了|le}。', why: 'Megtörtént ismétlés: {又|yòu}.' }
      ]
    },
    {
      title: '{告诉|gàosu}', sub: 'megmond, közöl valakivel',
      pattern: 'A + {告诉|gào·su} + személy + dolog',
      body: 'A {告诉|gàosu} „megmond, közöl" két tárgyas ige (HSK 2 4. lecke): előbb a személy, aztán az, amit közlünk — akár egy egész mondat. {请告诉我你的电话|qǐng gàosu wǒ nǐ de diànhuà} „mondd meg a telefonszámodat", {他告诉我他明天不来|tā gàosu wǒ tā míngtiān bù lái} „azt mondta nekem, hogy holnap nem jön".',
      more: [
        'A {说|shuō} „mond" után nem állhat közvetlenül a személy. „Megmondtam neki" = {我告诉他了|wǒ gàosu tā le} vagy {我跟他说了|wǒ gēn tā shuō le}.'
      ],
      examples: [
        { zh: '{您|nín}{能|néng}{告诉|gào·su}{我|wǒ}{哪|nǎ}{个|ge}{茶馆|chá·guǎn}{好|hǎo}{吗|ma}？', hu: 'Meg tudná mondani, melyik teaház jó?' },
        { zh: '{他|tā}{告诉|gào·su}{我|wǒ}{他|tā}{明天|míng·tiān}{不|bù}{来|lái}。', hu: 'Azt mondta nekem, hogy holnap nem jön.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{说|shuō}{他|tā}{了|le}。（= megmondtam neki）', good: '{我|wǒ}{告诉|gào·su}{他|tā}{了|le}。', why: 'Személy közvetlenül a {告诉|gàosu} után állhat, a {说|shuō} után nem.' }
      ]
    },
    {
      title: '{先|xiān} … {再|zài} …', sub: 'először …, aztán …',
      pattern: 'A + {先|xiān} + ige₁，{再|zài} + ige₂',
      body: 'Sorrend megadása: {先|xiān} „először, előbb", {再|zài} „aztán (majd)": {你们先去胡同看看，再去茶馆|nǐmen xiān qù hútòng kànkan, zài qù cháguǎn} „először nézzetek körül a hutongokban, aztán menjetek teaházba", {我先吃饭，再做作业|wǒ xiān chī fàn, zài zuò zuòyè} „előbb eszem, aztán leckét írok".',
      more: [
        'Megtörtént eseményeknél a második tag inkább {然后|ránhòu} „azután": {我先吃了饭，然后去了图书馆|wǒ xiān chīle fàn, ránhòu qùle túshūguǎn}.',
        'A {先|xiān} egymagában is gyakori: {你先走吧|nǐ xiān zǒu ba} „menj csak előre".'
      ],
      examples: [
        { zh: '{我|wǒ}{先|xiān}{吃|chī}{饭|fàn}，{再|zài}{做|zuò}{作业|zuò·yè}。', hu: 'Előbb eszem, aztán leckét írok.' },
        { zh: '{你|nǐ}{先|xiān}{走|zǒu}{吧|ba}，{我|wǒ}{一会儿|yí·huìr}{去|qù}。', hu: 'Menj csak előre, én kicsit később megyek.' }
      ]
    }
  ],
  phrases: [
    { zh: '{让|ràng}{我|wǒ}{想|xiǎng}{想|xiang}。', hu: 'Hadd gondolkodjak.' },
    { zh: '{请|qǐng}{再|zài}{说|shuō}{一|yí}{遍|biàn}。', hu: 'Kérem, mondja el még egyszer.' },
    { zh: '{你|nǐ}{能|néng}{告诉|gào·su}{我|wǒ}……{吗|ma}？', hu: 'Meg tudnád mondani, …?' },
    { zh: '{你|nǐ}{先|xiān}{休息|xiū·xi}{休息|xiū·xi}{吧|ba}。', hu: 'Pihenj előbb egy kicsit.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{让|ràng}', pinyin: 'ràng', hu: 'hagy, kér, ráveszi' },
        { zh: '{告诉|gào·su}', pinyin: 'gàosu', hu: 'megmondani, közölni' },
        { zh: '{再|zài}', pinyin: 'zài', hu: 'újra; majd' },
        { zh: '{又|yòu}', pinyin: 'yòu', hu: 'megint' },
        { zh: '{先|xiān}', pinyin: 'xiān', hu: 'először, előbb' },
        { zh: '{休息|xiū·xi}', pinyin: 'xiūxi', hu: 'pihenni' },
        { zh: '{应该|yīng·gāi}', pinyin: 'yīnggāi', hu: 'kell(ene), illik' },
        { zh: '{带|dài}', pinyin: 'dài', hu: 'magával vinni' },
        { zh: '{遍|biàn}', pinyin: 'biàn', hu: '-szor (elejétől végéig)' },
        { zh: '{一会儿|yí·huìr}', pinyin: 'yíhuìr', hu: 'egy kis idő' },
        { zh: '{房子|fáng·zi}', pinyin: 'fángzi', hu: 'ház' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{胡同|hú·tòng}', pinyin: 'hútòng', hu: 'pekingi sikátor' },
        { zh: '{茶馆|chá·guǎn}', pinyin: 'cháguǎn', hu: 'teaház' },
        { zh: '{地址|dì·zhǐ}', pinyin: 'dìzhǐ', hu: 'cím' },
        { zh: '{作业|zuò·yè}', pinyin: 'zuòyè', hu: 'házi feladat' }
      ] }
  ],
  culture: [
    { title: 'Hutongok', text: 'A {胡同|hútòng} a régi Peking keskeny sikátora, két oldalán zárt, belső udvaros házakkal ({四合院|sìhéyuàn}). Sok hutongot lebontottak, de a belváros több negyedében ma is állnak: kis boltok, kávézók, biciklik és szomszédok sakkozó csoportjai között az ember a régi városban sétálhat.' },
    { title: 'A teaház', text: 'A teaházban ({茶馆|cháguǎn}) nem sietnek: kis csészékből, többször felöntve isszák a teát, mellé magokat, aprósüteményt esznek. A tea töltésénél a fiatalabb tölt az idősebbnek; aki kap, két ujjal finoman megkocogtatja az asztalt — ez a „köszönöm" néma jele.' }
  ],
  reading: {
    title: '{妈妈|mā·ma}{来|lái}{北京|Běi·jīng}', titleHu: 'Anya Pekingbe jön',
    text: [
      { zh: '{下|xià}{个|ge}{星期|xīng·qī}{安娜|Ān·nà}{的|de}{妈妈|mā·ma}{要|yào}{来|lái}{北京|Běi·jīng}。', hu: 'Jövő héten Anna anyukája Pekingbe jön.' },
      { zh: '{张|Zhāng}{老师|lǎo·shī}{让|ràng}{安娜|Ān·nà}{先|xiān}{带|dài}{妈妈|mā·ma}{去|qù}{胡同|hú·tòng}{看|kàn}{看|kan}，{再|zài}{去|qù}{茶馆|chá·guǎn}{喝|hē}{茶|chá}。', hu: 'Zhang tanárnő azt tanácsolta, hogy Anna először vigye el az anyját a hutongokba, aztán egy teaházba.' },
      { zh: '{老师|lǎo·shī}{还|hái}{告诉|gào·su}{安娜|Ān·nà}{一|yí}{个|ge}{好|hǎo}{茶馆|chá·guǎn}{的|de}{地址|dì·zhǐ}。', hu: 'A tanárnő egy jó teaház címét is megadta Annának.', par: true },
      { zh: '{安娜|Ān·nà}{的|de}{妈妈|mā·ma}{不|bú}{会|huì}{说|shuō}{汉语|Hàn·yǔ}，{安娜|Ān·nà}{想|xiǎng}{教|jiāo}{她|tā}{几|jǐ}{句|jù}{简单|jiǎn·dān}{的|de}{话|huà}。', hu: 'Anna anyukája nem tud kínaiul, Anna megtanít neki néhány egyszerű mondatot.' },
      { zh: '{妈妈|mā·ma}{说|shuō}：“{我|wǒ}{先|xiān}{学|xué}‘{你好|nǐ hǎo}’{和|hé}‘{谢谢|xiè·xie}’，{别|bié}{的|de}{到|dào}{北京|Běi·jīng}{再|zài}{学|xué}！”', hu: 'Az anyukája azt mondta: „Előbb megtanulom a köszönést meg azt, hogy köszönöm, a többit majd Pekingben!"', par: true }
    ],
    words: [ { zh: '{句|jù}', hu: 'mondat (mérőszó)' }, { zh: '{简单|jiǎn·dān}', hu: 'egyszerű' } ],
    questions: [
      { q: 'Ki jön Pekingbe?', a: 'Anna anyukája', wrong: ['Zhang tanárnő anyja', 'Anna húga', 'Wang Ming anyukája'], why: '{安娜的妈妈要来北京|Ān\'nà de māma yào lái Běijīng}.' },
      { q: 'Hová menjenek először?', a: 'a hutongokba', wrong: ['egy teaházba', 'az iskolába', 'a Nagy Falhoz'], why: '{先带妈妈去胡同看看|xiān dài māma qù hútòng kànkan}.' },
      { q: 'Mit adott meg a tanárnő Annának?', a: 'egy teaház címét', wrong: ['a telefonszámát', 'egy szálloda címét', 'egy tankönyvet'], why: '{一个好茶馆的地址|yí ge hǎo cháguǎn de dìzhǐ}.' },
      { q: 'Mit tanul meg az anyukája először?', a: 'a köszönést és a „köszönömöt"', wrong: ['a számokat egytől tízig', 'néhány írásjegyet', 'a négy tónust'], why: '{我先学你好和谢谢|wǒ xiān xué nǐ hǎo hé xièxie}.' }
    ]
  },
  quiz: [
    { q: '„Hadd gondolkodjak."', a: '{让|ràng}{我|wǒ}{想|xiǎng}{想|xiang}。', wrong: ['{我|wǒ}{让|ràng}{想|xiǎng}{想|xiang}。', '{让|ràng}{想|xiǎng}{想|xiang}{我|wǒ}。', '{想|xiǎng}{想|xiang}{让|ràng}{我|wǒ}。'], why: '{让|ràng} + személy + ige.', point: 1 },
    { q: 'Mit jelent: {妈妈不让我去|māma bú ràng wǒ qù}。', a: 'Anya nem enged el.', wrong: ['Anya nem akar elmenni.', 'Anya nem jön velem.', 'Nem engedem el anyát.'], why: '{不让|bú ràng} „nem hagyja, nem engedi".', point: 1 },
    { q: 'Mit jelent: {老师让我们写汉字|lǎoshī ràng wǒmen xiě Hànzì}。', a: 'A tanár írásjegyeket írat velünk.', wrong: ['A tanár írásjegyeket ír nekünk.', 'Írásjegyeket írunk a tanárnak.', 'A tanár nem engedi, hogy írjunk.'], why: 'A + {让|ràng} + B + ige: A ráveszi B-t.', point: 1 },
    { q: 'Mit jelent: {让我试试|ràng wǒ shìshi}。', a: 'Hadd próbáljam meg.', wrong: ['Próbáld meg te!', 'Ne próbáld meg!', 'Már kipróbáltam.'], why: '{让我|ràng wǒ} … „hadd …".', point: 1 },
    { q: 'Mit fejez ki az igekettőzés: {看看|kànkan}?', a: 'rövid, könnyed cselekvést: „nézz körül"', wrong: ['többes számot: „sok nézelődés"', 'múlt időt: „körülnézett már"', 'tagadást: „ne nézz oda"'], why: 'A kettőzés lágyítja, rövidíti a cselekvést.', point: 2 },
    { q: '„Pihenj egy kicsit!"', a: '{你|nǐ}{休息|xiū·xi}{休息|xiū·xi}{吧|ba}！', wrong: ['{你|nǐ}{休|xiū}{休|xiū}{息|xi}{息|xi}{吧|ba}！', '{你|nǐ}{休息|xiū·xi}{息|xi}{吧|ba}！', '{你|nǐ}{休|xiū}{息|xi}{一|yi}{息|xi}{吧|ba}！'], why: 'Két szótagú igénél: AB AB.', point: 2 },
    { q: 'Melyik NEM helyes kettőzés?', a: '{想|xiǎng}{想|xiang}{一|yi}', wrong: ['{想|xiǎng}{想|xiang}', '{想|xiǎng}{一|yi}{想|xiang}', '{试|shì}{试|shi}'], why: 'A minták: AA vagy A {一|yi} A.', point: 2 },
    { q: '„Kérem, mondja el még egyszer."', a: '{请|qǐng}{再|zài}{说|shuō}{一|yí}{遍|biàn}。', wrong: ['{请|qǐng}{又|yòu}{说|shuō}{一|yí}{遍|biàn}。', '{请|qǐng}{说|shuō}{再|zài}{一|yí}{遍|biàn}。', '{再|zài}{请|qǐng}{一|yí}{遍|biàn}{说|shuō}。'], why: 'Jövőbeli ismétlés: {再|zài} + ige.', point: 3 },
    { q: '„Tegnap megint eljött." — melyik szó kell?', a: '{又|yòu}', wrong: ['{再|zài}', '{还|hái}', '{就|jiù}'], why: 'Megtörtént ismétlés: {又|yòu}.', point: 3 },
    { q: 'Mit jelent: {明天再说|míngtiān zài shuō}。', a: 'Majd holnap megbeszéljük.', wrong: ['Holnap újra elmondta.', 'Holnap is beszélt.', 'Holnap ne beszélj!'], why: '{再|zài} „majd, később".', point: 3 },
    { q: 'Mit jelent: {欢迎再来|huānyíng zài lái}！', a: 'Jöjjön máskor is!', wrong: ['Köszönjük, hogy itt volt!', 'Ne jöjjön többet!', 'Megint itt van?'], why: '{再来|zài lái} „újra eljön (a jövőben)".', point: 3 },
    { q: '„Mondd meg a telefonszámodat."', a: '{请|qǐng}{告诉|gào·su}{我|wǒ}{你|nǐ}{的|de}{电话|diàn·huà}。', wrong: ['{请|qǐng}{说|shuō}{我|wǒ}{你|nǐ}{的|de}{电话|diàn·huà}。', '{请|qǐng}{告诉|gào·su}{你|nǐ}{的|de}{电话|diàn·huà}{我|wǒ}。', '{请|qǐng}{我|wǒ}{告诉|gào·su}{你|nǐ}{的|de}{电话|diàn·huà}。'], why: '{告诉|gàosu} + személy + dolog.', point: 4 },
    { q: '„Megmondtam neki."', a: '{我|wǒ}{告诉|gào·su}{他|tā}{了|le}。', wrong: ['{我|wǒ}{说|shuō}{他|tā}{了|le}。', '{我|wǒ}{告诉|gào·su}{了|le}{给|gěi}{他|tā}。', '{他|tā}{我|wǒ}{告诉|gào·su}{了|le}。'], why: 'A {说|shuō} után nem állhat a személy.', point: 4 },
    { q: '„Előbb eszem, aztán leckét írok."', a: '{我|wǒ}{先|xiān}{吃|chī}{饭|fàn}，{再|zài}{做|zuò}{作业|zuò·yè}。', wrong: ['{我|wǒ}{再|zài}{吃|chī}{饭|fàn}，{先|xiān}{做|zuò}{作业|zuò·yè}。', '{先|xiān}{我|wǒ}{吃|chī}{饭|fàn}{再|zài}，{做|zuò}{作业|zuò·yè}。', '{我|wǒ}{吃|chī}{饭|fàn}{先|xiān}，{作业|zuò·yè}{再|zài}{做|zuò}。'], why: '{先|xiān} + ige₁, {再|zài} + ige₂.', point: 5 },
    { q: 'Mit jelent a {先|xiān}?', a: 'először, előbb', wrong: ['később, majd', 'már, máris', 'még mindig'], why: '{先|xiān} … {再|zài} … „először …, aztán …".', point: 5 },
    { q: 'Mit jelent az {应该|yīnggāi}?', a: 'kell(ene), illik', wrong: ['szabad, lehet', 'tud, képes', 'szeretne'], why: '{我应该带她去哪儿|wǒ yīnggāi dài tā qù nǎr}？ „Hová kellene vinnem?"' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 9. LECKE — eredménykiegészítők: 完, 懂, 见, 到, 好, 错, 对 · 没 + ige + kieg. · 第
   ════════════════════════════════════════════════════ */
{
  id: 'l24', no: 24, badge: '9', kicker: 'HSK 2 · 9. lecke', label: 'HSK 2 · 9. lecke',
  title: 'Megértetted? — a cselekvés eredménye',
  lead: 'Elmondod, mi lett a cselekvés eredménye: befejezted (做完了), megértetted (听懂了), megtaláltad (找到了), elrontottad (写错了) — vagy épp nem (没听懂), és sorszámot mondasz (第三题).',
  cando: [
    'Eredménykiegészítővel mondod a cselekvés eredményét: 做完, 听懂, 看见, 找到.',
    'Megkülönbözteted a cselekvést és az eredményt: 看 — 看见, 找 — 找到.',
    'Tagadod az eredményt: 没 + ige + kiegészítő (没听懂, 没找到).',
    'Sorszámot mondasz: 第一, 第三题, 第二次.'
  ],
  intro: [
    'A magyar igekötő („meg-, el-, végig-") megmutatja, hogy a cselekvésnek eredménye is lett: „olvas" — „kiolvas", „keres" — „megtalál". A kínai erre egy második szótagot tesz az ige mögé: ez az <b>eredménykiegészítő</b>. {做|zuò} „csinál" → {做完|zuòwán} „befejez", {找|zhǎo} „keres" → {找到|zhǎodào} „megtalál".',
    'David és Anna a könyvtárban tanulnak: van, amit már megcsináltak, van, amit nem értenek, és van, amit nem találnak. Közben a sorszámokat is megtanulod.'
  ],
  dialogue: {
    title: 'A könyvtárban',
    scene: 'Este a könyvtárban. David és Anna együtt készülnek a holnapi órára.',
    lines: [
      { who: 'David', zh: '{安娜|Ān·nà}，{今天|jīn·tiān}{的|de}{作业|zuò·yè}{你|nǐ}{做|zuò}{完|wán}{了|le}{吗|ma}？', hu: 'Anna, megcsináltad a mai leckét?' },
      { who: 'Anna', zh: '{还|hái}{没|méi}{做|zuò}{完|wán}。{第|dì}{三|sān}{题|tí}{我|wǒ}{没|méi}{看|kàn}{懂|dǒng}。', hu: 'Még nem fejeztem be. A harmadik feladatot nem értem.' },
      { who: 'David', zh: '{我|wǒ}{看|kàn}{看|kan}……{这|zhè}{个|ge}{字|zì}{你|nǐ}{看|kàn}{错|cuò}{了|le}，{不|bú}{是|shì}“{大|dà}”，{是|shì}“{太|tài}”。', hu: 'Hadd nézzem… Ezt az írásjegyet rosszul olvastad: nem a „nagy", hanem a „túl".' },
      { who: 'Anna', zh: '{哦|ò}，{我|wǒ}{懂|dǒng}{了|le}！{谢谢|xiè·xie}。{你|nǐ}{的|de}{汉语|Hàn·yǔ}{书|shū}{找|zhǎo}{到|dào}{了|le}{吗|ma}？', hu: 'Ó, már értem! Köszi. Megtaláltad a kínai könyvedet?' },
      { who: 'David', zh: '{没|méi}{找|zhǎo}{到|dào}。{我|wǒ}{今天|jīn·tiān}{去|qù}{书店|shū·diàn}，{也|yě}{没|méi}{买|mǎi}{到|dào}。', hu: 'Nem találtam meg. Ma elmentem a könyvesboltba, de ott sem kaptam.' },
      { who: 'Anna', zh: '{我|wǒ}{刚才|gāng·cái}{在|zài}{教室|jiào·shì}{看|kàn}{见|jiàn}{一|yì}{本|běn}，{是|shì}{不|bu}{是|shì}{你|nǐ}{的|de}？', hu: 'Az előbb láttam egyet a tanteremben, nem a tiéd?' },
      { who: 'David', zh: '{太|tài}{好|hǎo}{了|le}！{我|wǒ}{马上|mǎ·shàng}{去|qù}{拿|ná}！', hu: 'Nagyszerű! Rögtön megyek érte!' }
    ],
    notes: [
      'A {作业|zuòyè} „házi feladat", a {题|tí} „feladat, kérdés (dolgozatban)".',
      'A {刚才|gāngcái} „az előbb, épp most"; a {马上|mǎshàng} „azonnal, rögtön".',
      'A {还没|hái méi} … „még nem …" — részletesen a HSK 2 14. leckéjében.'
    ]
  },
  points: [
    {
      title: 'ige + {完|wán}', sub: 'befejez — az első eredménykiegészítő',
      pattern: 'ige + {完|wán} (+ tárgy) + {了|le}',
      body: 'A kínai ige gyakran csak a cselekvést nevezi meg; az <b>eredményt</b> egy második tag adja, amely közvetlenül az ige mögé kerül. A {完|wán} „vége, kész": {做完|zuòwán} „megcsinál, befejez", {吃完|chīwán} „megeszik (mindet)", {看完|kànwán} „végigolvas, végignéz". A magyar igekötő hasonló szerepű.',
      more: [
        'A tárgy a kiegészítő után jön: {我看完这本书了|wǒ kànwán zhè běn shū le} „kiolvastam ezt a könyvet" — vagy előre kerül témaként: {作业你做完了吗|zuòyè nǐ zuòwán le ma}？',
        'Az ige és a kiegészítő közé semmi nem kerülhet.'
      ],
      examples: [
        { zh: '{作业|zuò·yè}{你|nǐ}{做|zuò}{完|wán}{了|le}{吗|ma}？', hu: 'Megcsináltad a leckét?' },
        { zh: '{我|wǒ}{看|kàn}{完|wán}{这|zhè}{本|běn}{书|shū}{了|le}。', hu: 'Kiolvastam ezt a könyvet.' },
        { zh: '{吃|chī}{完|wán}{饭|fàn}{我们|wǒ·men}{去|qù}{散步|sàn bù}{吧|ba}。', hu: 'Ha megettük az ebédet, menjünk sétálni.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{做|zuò}{作业|zuò·yè}{完|wán}{了|le}。', good: '{我|wǒ}{做|zuò}{完|wán}{作业|zuò·yè}{了|le}。', why: 'A kiegészítő közvetlenül az ige mögé kerül, a tárgy utánuk.' }
      ]
    },
    {
      title: '{懂|dǒng} · {见|jiàn}', sub: 'megért, meghall, meglát',
      pattern: '{听|tīng} / {看|kàn} + {懂|dǒng} / {见|jiàn}',
      body: 'A {听|tīng} „hallgat" és a {看|kàn} „néz" csak a figyelmet jelenti — nem biztos, hogy eredménye is van. Ha <b>megvan</b> az eredmény: {听见|tīngjiàn} „meghall", {看见|kànjiàn} „meglát", {听懂|tīngdǒng} „(hallva) megért", {看懂|kàndǒng} „(olvasva) megért".',
      tables: [
        { caption: 'Cselekvés és eredmény',
          head: ['Cselekvés', 'Eredmény: érzékelés', 'Eredmény: megértés'],
          rows: [
            ['{听|tīng} hallgat', '{听|tīng}{见|jiàn} meghall', '{听|tīng}{懂|dǒng} megért'],
            ['{看|kàn} néz, olvas', '{看|kàn}{见|jiàn} meglát', '{看|kàn}{懂|dǒng} megért']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{听|tīng}{懂|dǒng}{了|le}{吗|ma}？', hu: 'Megértetted (amit hallottál)?' },
        { zh: '{我|wǒ}{刚才|gāng·cái}{在|zài}{教室|jiào·shì}{看|kàn}{见|jiàn}{他|tā}{了|le}。', hu: 'Az előbb láttam őt a tanteremben.' },
        { zh: '{这|zhè}{本|běn}{书|shū}{我|wǒ}{看|kàn}{懂|dǒng}{了|le}。', hu: 'Ezt a könyvet megértettem.' }
      ]
    },
    {
      title: '{到|dào} · {好|hǎo} · {错|cuò} · {对|duì}', sub: 'siker, elkészülés, hiba, helyesség',
      pattern: 'ige + {到|dào} / {好|hǎo} / {错|cuò} / {对|duì}',
      body: 'További gyakori kiegészítők. {到|dào} — <b>elérés, siker</b>: {找到|zhǎodào} „megtalál", {买到|mǎidào} „sikerül megvenni". {好|hǎo} — <b>rendben elkészült</b>: {做好|zuòhǎo} „elkészít", {准备好|zhǔnbèi hǎo} „felkészül". {错|cuò} — <b>rosszul</b>: {写错|xiěcuò} „elír", {看错|kàncuò} „rosszul olvas, félrenéz". {对|duì} — <b>helyesen</b>: {说对|shuōduì} „jól mond", {做对|zuòduì} „jól old meg".',
      more: [
        'A {找|zhǎo} „keres" és a {找到|zhǎodào} „megtalál" különbsége pontosan a magyar „keres" — „megtalál": {我找了很长时间，没找到|wǒ zhǎole hěn cháng shíjiān, méi zhǎodào} „sokáig kerestem, de nem találtam".'
      ],
      tables: [
        { caption: 'Kiegészítők',
          head: ['Kieg.', 'Jelentés', 'Példa'],
          rows: [
            ['{到|dào}', 'elérés, siker', '{找|zhǎo}{到|dào} megtalál'],
            ['{好|hǎo}', 'rendben kész', '{做|zuò}{好|hǎo} elkészít'],
            ['{错|cuò}', 'rosszul', '{写|xiě}{错|cuò} elír'],
            ['{对|duì}', 'helyesen', '{说|shuō}{对|duì} jól mond']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{的|de}{书|shū}{找|zhǎo}{到|dào}{了|le}{吗|ma}？', hu: 'Megtaláltad a könyvedet?' },
        { zh: '{这|zhè}{个|ge}{字|zì}{你|nǐ}{写|xiě}{错|cuò}{了|le}。', hu: 'Ezt az írásjegyet elírtad.' },
        { zh: '{饭|fàn}{做|zuò}{好|hǎo}{了|le}，{来|lái}{吃|chī}{吧|ba}！', hu: 'Kész az étel, gyertek enni!' }
      ]
    },
    {
      title: '{没|méi} + ige + kiegészítő', sub: 'az eredmény elmaradt',
      pattern: '{没|méi}({有|yǒu}) + ige + kiegészítő (nincs {了|le})',
      body: 'Ha az eredmény elmaradt, {没|méi} (vagy {没有|méiyǒu}) kerül az ige elé, és ilyenkor <b>nincs {了|le}</b>: {我没听懂|wǒ méi tīngdǒng} „nem értettem", {我没找到|wǒ méi zhǎodào} „nem találtam meg", {他没买到|tā méi mǎidào} „nem sikerült megvennie". Kérdés: … {了吗|le ma}？ vagy … {了没有|le méiyǒu}？',
      more: [
        'Válasz egy szóval: {找到了|zhǎodào le} „megvan" — {没找到|méi zhǎodào} „nincs meg".',
        'A „nem értem (nem tudom megérteni)" gyakori formája {听不懂|tīng bu dǒng}: a {不|bu} a két tag közé kerül. Ezt a lehetőséget kifejező alakot később tanulod részletesen.'
      ],
      examples: [
        { zh: '{我|wǒ}{没|méi}{听|tīng}{懂|dǒng}，{请|qǐng}{再|zài}{说|shuō}{一|yí}{遍|biàn}。', hu: 'Nem értettem, kérem, mondja el még egyszer.' },
        { zh: '{我|wǒ}{去|qù}{书店|shū·diàn}，{也|yě}{没|méi}{买|mǎi}{到|dào}。', hu: 'Elmentem a könyvesboltba, de ott sem kaptam.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{没|méi}{找|zhǎo}{到|dào}{了|le}。', good: '{我|wǒ}{没|méi}{找|zhǎo}{到|dào}。', why: 'Tagadásban nincs {了|le}.' },
        { bad: '{我|wǒ}{不|bù}{听|tīng}{懂|dǒng}。', good: '{我|wǒ}{没|méi}{听|tīng}{懂|dǒng}。', why: 'Az eredmény elmaradását {没|méi} tagadja.' }
      ]
    },
    {
      title: '{第|dì} + szám', sub: 'sorszámok: első, második, harmadik',
      pattern: '{第|dì} + szám + (mérőszó) + főnév',
      body: 'A sorszámnév a {第|dì} + szám: {第一|dì-yī} „első", {第三题|dì-sān tí} „a harmadik feladat", {第二课|dì-èr kè} „a második lecke", {第一次|dì-yī cì} „első alkalommal". A mérőszó a szám után jön: {第三个人|dì-sān ge rén} „a harmadik ember".',
      more: [
        'Dátumoknál és emeleteknél nem kell {第|dì}: {三月|sānyuè} „március", {三楼|sān lóu} „a harmadik szint". Figyelem: Kínában a földszint az {一楼|yī lóu}, így a {三楼|sān lóu} magyarul a második emelet!',
        'A {第二|dì-èr} „második": itt sosem {两|liǎng}.'
      ],
      examples: [
        { zh: '{第|dì}{三|sān}{题|tí}{我|wǒ}{没|méi}{看|kàn}{懂|dǒng}。', hu: 'A harmadik feladatot nem értem.' },
        { zh: '{这|zhè}{是|shì}{我|wǒ}{第一|dì·yī}{次|cì}{来|lái}{中国|Zhōng·guó}。', hu: 'Most vagyok először Kínában.' },
        { zh: '{我们|wǒ·men}{的|de}{教室|jiào·shì}{在|zài}{三|sān}{楼|lóu}。', hu: 'A tantermünk a harmadik szinten (magyarul: a második emeleten) van.' }
      ],
      mistakes: [
        { bad: '{三|sān}{第|dì}{题|tí}', good: '{第|dì}{三|sān}{题|tí}', why: 'A {第|dì} a szám elé kerül.' }
      ]
    }
  ],
  phrases: [
    { zh: '{我|wǒ}{听|tīng}{懂|dǒng}{了|le}。', hu: 'Értem. (Megértettem.)' },
    { zh: '{我|wǒ}{没|méi}{听|tīng}{懂|dǒng}。', hu: 'Nem értettem.' },
    { zh: '{你|nǐ}{找|zhǎo}{到|dào}{了|le}{吗|ma}？', hu: 'Megtaláltad?' },
    { zh: '{饭|fàn}{做|zuò}{好|hǎo}{了|le}！', hu: 'Kész az étel!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{完|wán}', pinyin: 'wán', hu: 'befejezni; vége' },
        { zh: '{懂|dǒng}', pinyin: 'dǒng', hu: 'érteni' },
        { zh: '{错|cuò}', pinyin: 'cuò', hu: 'hibás, rossz' },
        { zh: '{找到|zhǎo·dào}', pinyin: 'zhǎodào', hu: 'megtalálni' },
        { zh: '{看见|kàn·jiàn}', pinyin: 'kànjiàn', hu: 'meglátni' },
        { zh: '{第|dì}', pinyin: 'dì', hu: 'sorszám előtagja' },
        { zh: '{题|tí}', pinyin: 'tí', hu: 'feladat, kérdés' },
        { zh: '{准备|zhǔn·bèi}', pinyin: 'zhǔnbèi', hu: 'készülni, előkészít' },
        { zh: '{刚才|gāng·cái}', pinyin: 'gāngcái', hu: 'az előbb' },
        { zh: '{马上|mǎ·shàng}', pinyin: 'mǎshàng', hu: 'azonnal' },
        { zh: '{教室|jiào·shì}', pinyin: 'jiàoshì', hu: 'tanterem' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{书店|shū·diàn}', pinyin: 'shūdiàn', hu: 'könyvesbolt' },
        { zh: '{楼|lóu}', pinyin: 'lóu', hu: 'emelet; épület' },
        { zh: '{散步|sàn bù}', pinyin: 'sàn bù', hu: 'sétálni' },
        { zh: '{听见|tīng·jiàn}', pinyin: 'tīngjiàn', hu: 'meghallani' }
      ] }
  ],
  culture: [
    { title: 'Hogyan gépelnek kínaiul?', text: 'A kínaiak telefonon és számítógépen pinyinnel gépelnek: beírják a kiejtést (például „hanzi"), és a felkínált írásjegyek közül kiválasztják a helyeset. Mivel sok írásjegynek azonos a kiejtése, gyakori hiba, hogy valaki rossz írásjegyet választ — ilyenkor mondják: {打错字了|dǎcuò zì le} „elgépeltem".' },
    { title: 'Az emeletek számozása', text: 'Kínában az utcaszint az első emelet ({一楼|yī lóu}), a magyar „első emelet" tehát ott a {二楼|èr lóu}. Sok épületben hiányzik a 4. és a 14. emelet: a {四|sì} „négy" kiejtése hasonlít a {死|sǐ} „halál" szóéhoz, ezért szerencsétlen számnak tartják.' }
  ],
  reading: {
    title: '{第一|dì·yī}{次|cì}{考试|kǎo·shì}', titleHu: 'Az első dolgozat',
    text: [
      { zh: '{今天|jīn·tiān}{我们|wǒ·men}{有|yǒu}{第一|dì·yī}{次|cì}{汉语|Hàn·yǔ}{考试|kǎo·shì}。', hu: 'Ma volt az első kínai dolgozatunk.' },
      { zh: '{王|Wáng}{老师|lǎo·shī}{说|shuō}{的|de}{话|huà}，{我|wǒ}{都|dōu}{听|tīng}{懂|dǒng}{了|le}。', hu: 'Amit Wang tanár mondott, mindent megértettem.' },
      { zh: '{但是|dàn·shì}{第|dì}{五|wǔ}{题|tí}{我|wǒ}{写|xiě}{错|cuò}{了|le}{两|liǎng}{个|ge}{字|zì}。', hu: 'De az ötödik feladatban két írásjegyet elírtam.', par: true },
      { zh: '{大卫|Dà·wèi}{第一|dì·yī}{个|ge}{做|zuò}{完|wán}，{他|tā}{的|de}{题|tí}{都|dōu}{做|zuò}{对|duì}{了|le}。', hu: 'David végzett elsőként, és minden feladatot jól oldott meg.' },
      { zh: '{考试|kǎo·shì}{以后|yǐ·hòu}，{我|wǒ}{没|méi}{找|zhǎo}{到|dào}{我|wǒ}{的|de}{笔|bǐ}，{是|shì}{大卫|Dà·wèi}{帮|bāng}{我|wǒ}{找|zhǎo}{到|dào}{的|de}。', hu: 'A dolgozat után nem találtam a tollamat; David segített megtalálni.', par: true }
    ],
    words: [ { zh: '{笔|bǐ}', hu: 'toll' } ],
    questions: [
      { q: 'Mennyit értett meg Anna a tanár szavaiból?', a: 'mindent', wrong: ['semmit', 'a felét', 'csak a számokat'], why: '{我都听懂了|wǒ dōu tīngdǒng le}.' },
      { q: 'Mit rontott el Anna?', a: 'két írásjegyet az ötödik feladatban', wrong: ['két írásjegyet az első feladatban', 'öt írásjegyet a második feladatban', 'a harmadik feladatot egészében'], why: '{第五题我写错了两个字|dì-wǔ tí wǒ xiěcuò le liǎng ge zì}.' },
      { q: 'Hogy sikerült David dolgozata?', a: 'elsőként végzett, mindent jól csinált', wrong: ['utolsóként végzett, sok hibával', 'nem tudta időben befejezni', 'nem értette a feladatokat'], why: '{第一个做完，都做对了|dì-yī ge zuòwán, dōu zuòduì le}.' },
      { q: 'Ki segített megtalálni Anna tollát?', a: 'David', wrong: ['Wang tanár', 'Liu Fang', 'senki'], why: '{是大卫帮我找到的|shì Dàwèi bāng wǒ zhǎodào de}.' }
    ]
  },
  quiz: [
    { q: '„Megcsináltad a leckét?"', a: '{作业|zuò·yè}{你|nǐ}{做|zuò}{完|wán}{了|le}{吗|ma}？', wrong: ['{作业|zuò·yè}{你|nǐ}{完|wán}{做|zuò}{了|le}{吗|ma}？', '{你|nǐ}{做|zuò}{作业|zuò·yè}{完|wán}{吗|ma}{了|le}？', '{完|wán}{作业|zuò·yè}{你|nǐ}{做|zuò}{了|le}{吗|ma}？'], why: 'Ige + {完|wán} + {了|le}.', point: 1 },
    { q: '„Kiolvastam ezt a könyvet."', a: '{我|wǒ}{看|kàn}{完|wán}{这|zhè}{本|běn}{书|shū}{了|le}。', wrong: ['{我|wǒ}{看|kàn}{这|zhè}{本|běn}{书|shū}{完|wán}{了|le}。', '{我|wǒ}{完|wán}{看|kàn}{这|zhè}{本|běn}{书|shū}{了|le}。', '{这|zhè}{本|běn}{完|wán}{书|shū}{我|wǒ}{看|kàn}{了|le}。'], why: 'A kiegészítő az ige mögé, a tárgy utánuk kerül.', point: 1 },
    { q: 'Mi a különbség: {看|kàn} · {看见|kànjiàn}?', a: 'néz · meglát (eredmény)', wrong: ['meglát · néz (eredmény nélkül)', 'olvas · leír', 'néz · megért'], why: 'A {见|jiàn} az érzékelés eredménye.', point: 2 },
    { q: 'Mit jelent: {你听懂了吗|nǐ tīngdǒng le ma}？', a: 'Megértetted (amit hallottál)?', wrong: ['Meghallgattad már a felvételt?', 'Hallottad a zenét a szomszédban?', 'Hallasz engem, vagy halkan beszélek?'], why: '{听懂|tīngdǒng} „hallva megért".', point: 2 },
    { q: '„Megláttam őt."', a: '{我|wǒ}{看|kàn}{见|jiàn}{他|tā}{了|le}。', wrong: ['{我|wǒ}{看|kàn}{他|tā}{见|jiàn}{了|le}。', '{我|wǒ}{见|jiàn}{看|kàn}{他|tā}{了|le}。', '{他|tā}{我|wǒ}{看|kàn}{了|le}{见|jiàn}。'], why: '{看见|kànjiàn} együtt marad.', point: 2 },
    { q: 'Mit jelent a {找到|zhǎodào}?', a: 'megtalál', wrong: ['keres', 'elveszít', 'megérkezik'], why: '{找|zhǎo} „keres" + {到|dào} „elér".', point: 3 },
    { q: 'Mit jelent: {这个字你写错了|zhège zì nǐ xiěcuò le}。', a: 'Ezt az írásjegyet elírtad.', wrong: ['Ezt az írásjegyet jól írtad.', 'Ezt az írásjegyet nem írtad le.', 'Ezt az írásjegyet nem ismered.'], why: '{错|cuò} „rosszul".', point: 3 },
    { q: 'Melyik kiegészítő jelenti: „rendben elkészült"?', a: '{好|hǎo}', wrong: ['{错|cuò}', '{见|jiàn}', '{懂|dǒng}'], why: '{做好|zuòhǎo} „elkészít".', point: 3 },
    { q: '„Jól mondtad!"', a: '{你|nǐ}{说|shuō}{对|duì}{了|le}！', wrong: ['{你|nǐ}{对|duì}{说|shuō}{了|le}！', '{你|nǐ}{说|shuō}{错|cuò}{了|le}！', '{对|duì}{你|nǐ}{说|shuō}{了|le}！'], why: '{说对|shuōduì} „jól mond".', point: 3 },
    { q: '„Nem értettem." (amit hallottam)', a: '{我|wǒ}{没|méi}{听|tīng}{懂|dǒng}。', wrong: ['{我|wǒ}{不|bù}{听|tīng}{懂|dǒng}{了|le}。', '{我|wǒ}{没|méi}{听|tīng}{懂|dǒng}{了|le}。', '{我|wǒ}{听|tīng}{没|méi}{懂|dǒng}。'], why: '{没|méi} + ige + kiegészítő, {了|le} nélkül.', point: 4 },
    { q: '„Nem találtam meg."', a: '{我|wǒ}{没|méi}{找|zhǎo}{到|dào}。', wrong: ['{我|wǒ}{不|bù}{找|zhǎo}{到|dào}。', '{我|wǒ}{没|méi}{找|zhǎo}{到|dào}{了|le}。', '{我|wǒ}{找|zhǎo}{没|méi}{到|dào}。'], why: '{没|méi} + ige + kiegészítő.', point: 4 },
    { q: 'Miért hibás: {我没买到了|wǒ méi mǎidào le}?', a: 'tagadásban nem kell {了|le}', wrong: ['a {没|méi} helyett {不|bù} kell', 'a {到|dào} a {买|mǎi} elé kerül', 'nem hibás, ez a helyes alak'], why: '{我没买到|wǒ méi mǎidào}.', point: 4 },
    { q: '„a harmadik feladat"', a: '{第|dì}{三|sān}{题|tí}', wrong: ['{三|sān}{第|dì}{题|tí}', '{题|tí}{第|dì}{三|sān}', '{第|dì}{题|tí}{三|sān}'], why: '{第|dì} + szám + főnév.', point: 5 },
    { q: '„a harmadik ember"', a: '{第|dì}{三|sān}{个|ge}{人|rén}', wrong: ['{第|dì}{三|sān}{人|rén}{个|ge}', '{三|sān}{个|ge}{第|dì}{人|rén}', '{个|ge}{第|dì}{三|sān}{人|rén}'], why: '{第|dì} + szám + mérőszó + főnév.', point: 5 },
    { q: 'Kínában a {三楼|sān lóu} — magyar szóhasználattal melyik szint?', a: 'a második emelet', wrong: ['a harmadik emelet', 'a földszint', 'a negyedik emelet'], why: 'Kínában a földszint az {一楼|yī lóu}.', point: 5 },
    { q: 'Mit jelent a {马上|mǎshàng}?', a: 'azonnal, rögtön', wrong: ['lóháton, gyorsan', 'holnap reggel', 'az előbb'], why: 'Szó szerint „lóháton" — de jelentése „azonnal".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 10. LECKE — 别, 别…了, 正在…呢, testrész + 疼, gyakoriság
   ════════════════════════════════════════════════════ */
{
  id: 'l25', no: 25, badge: '10', kicker: 'HSK 2 · 10. lecke', label: 'HSK 2 · 10. lecke',
  title: 'Ne aggódj! — betegség és orvos',
  lead: 'Orvosnál elmondod, mi a bajod (我头疼, 我感冒了), megérted, hányszor kell bevenni a gyógyszert (一天三次), tiltasz és nyugtatsz (别担心, 别看手机了), és jelzed, hogy épp csinálsz valamit (我正在睡觉呢).',
  cando: [
    'Tiltasz vagy nyugtatsz: 别 + ige (别担心, 别着急).',
    'Megkéred valakit, hogy hagyja abba: 别…了.',
    'Kifejezed, hogy épp most csinálsz valamit: 正在…呢.',
    'Orvosnál elmondod, mi fáj, és megérted a gyakoriságot: 一天三次.'
  ],
  intro: [
    'Anna megbetegedett: fáj a feje, lázas. Liu Fang orvoshoz viszi, az orvos megvizsgálja és gyógyszert ír fel. Megtanulod, hogyan mondod el, mi a bajod, és hogyan érted meg az orvos utasításait.',
    'Nyelvtanilag a tiltásé a főszerep: a {别|bié} „ne!" — és a {别|bié} … {了|le}, amellyel azt kéred, hogy valaki hagyjon abba valamit, amit már csinál.'
  ],
  dialogue: {
    title: 'Orvosnál',
    scene: 'Reggel a kollégiumban Anna rosszul érzi magát; Liu Fang orvoshoz viszi. Este Wang Ming telefonál.',
    lines: [
      { who: 'Liu Fang', zh: '{安娜|Ān·nà}，{你|nǐ}{怎么|zěn·me}{了|le}？{哪儿|nǎr}{不|bù}{舒服|shū·fu}？', hu: 'Anna, mi van veled? Hol érzed rosszul magad?' },
      { who: 'Anna', zh: '{我|wǒ}{头|tóu}{疼|téng}，{好像|hǎo·xiàng}{发烧|fā shāo}{了|le}。', hu: 'Fáj a fejem, és mintha lázas lennék.' },
      { who: 'Liu Fang', zh: '{别|bié}{去|qù}{上|shàng}{课|kè}{了|le}，{我|wǒ}{带|dài}{你|nǐ}{去|qù}{医院|yī·yuàn}{看|kàn}{医生|yī·shēng}{吧|ba}。', hu: 'Ne menj órára, elviszlek orvoshoz.' },
      { who: 'Orvos', zh: '{你|nǐ}{感冒|gǎn·mào}{了|le}，{不|bú}{是|shì}{大|dà}{问题|wèn·tí}，{别|bié}{担心|dān·xīn}。', hu: 'Megfázott, nem nagy baj, ne aggódjon.' },
      { who: 'Anna', zh: '{医生|yī·shēng}，{我|wǒ}{要|yào}{吃|chī}{药|yào}{吗|ma}？', hu: 'Doktor úr, kell gyógyszert szednem?' },
      { who: 'Orvos', zh: '{这|zhè}{个|ge}{药|yào}{一|yì}{天|tiān}{吃|chī}{三|sān}{次|cì}，{一|yí}{次|cì}{两|liǎng}{片|piàn}。{多|duō}{喝|hē}{水|shuǐ}，{多|duō}{休息|xiū·xi}。', hu: 'Ebből naponta háromszor vegyen be, egyszerre két szemet. Igyon sokat, és pihenjen sokat.' },
      { who: 'Wang Ming', zh: '{喂|wèi}，{安娜|Ān·nà}，{你|nǐ}{在|zài}{做|zuò}{什么|shén·me}{呢|ne}？', hu: 'Halló, Anna, mit csinálsz?' },
      { who: 'Anna', zh: '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{呢|ne}……{别|bié}{给|gěi}{我|wǒ}{打|dǎ}{电话|diàn·huà}{了|le}，{明天|míng·tiān}{再|zài}{说|shuō}{吧|ba}！', hu: 'Épp alszom… Ne hívogass most, majd holnap beszélünk!' }
    ],
    notes: [
      'A {舒服|shūfu} „kényelmes, jó érzés"; a {不舒服|bù shūfu} „rosszul érzi magát".',
      'A {好像|hǎoxiàng} „mintha, úgy tűnik"; a {发烧|fā shāo} „lázas" (szó szerint „lázat ad ki").',
      'A {片|piàn} „szem, tabletta" (lapos dolgok mérőszava).'
    ]
  },
  points: [
    {
      title: '{别|bié} + ige', sub: 'ne …! — tiltás és nyugtatás',
      pattern: '({请|qǐng}) + {别|bié} + ige',
      body: 'A {别|bié} „ne!" tilt, vagy kéri, hogy valaki ne tegyen valamit: {别去|bié qù} „ne menj", {别担心|bié dānxīn} „ne aggódj", {别着急|bié zháojí} „ne izgulj, ráérünk". Ugyanezt jelenti a {不要|bú yào} (HSK 2 1. lecke), amely kicsit nyomatékosabb.',
      more: [
        'Udvariasabb, ha {请|qǐng} kerül elé: {请别在这儿抽烟|qǐng bié zài zhèr chōu yān} „kérem, ne dohányozzon itt".',
        'A {别|bié} mindig a másiknak szól. Magadról: {我不去|wǒ bú qù} „nem megyek".'
      ],
      examples: [
        { zh: '{别|bié}{担心|dān·xīn}，{不|bú}{是|shì}{大|dà}{问题|wèn·tí}。', hu: 'Ne aggódj, nem nagy baj.' },
        { zh: '{别|bié}{着急|zháo·jí}，{我们|wǒ·men}{还|hái}{有|yǒu}{时间|shí·jiān}。', hu: 'Ne izgulj, még van időnk.' },
        { zh: '{请|qǐng}{别|bié}{在|zài}{这儿|zhèr}{抽|chōu}{烟|yān}。', hu: 'Kérem, ne dohányozzon itt.' }
      ],
      mistakes: [
        { bad: '{你|nǐ}{没|méi}{去|qù}！（= ne menj!）', good: '{你|nǐ}{别|bié}{去|qù}！', why: 'Tiltásra {别|bié} vagy {不要|bú yào} kell; a {没|méi} múltbeli tagadás.' }
      ]
    },
    {
      title: '{别|bié} … {了|le}', sub: 'ne … tovább, hagyd abba',
      pattern: '{别|bié} + ige + {了|le}',
      body: 'Ha valaki <b>már csinál</b> valamit, és azt kéred, hagyja abba — vagy meggondoltatod vele —, a mondat végére {了|le} kerül: {别看手机了|bié kàn shǒujī le} „ne nézd már a telefont", {别说了|bié shuō le} „elég, ne mondd tovább", {别去上课了|bié qù shàng kè le} „inkább ne menj órára".',
      more: [
        'Ez a {不|bù} … {了|le} „már nem" (HSK 2 6. lecke) felszólító párja: a helyzet megváltoztatását kéri.',
        'Ugyanígy: {不要|bú yào} … {了|le}: {不要哭了|bú yào kū le} „ne sírj már".'
      ],
      tables: [
        { caption: '{别|bié} vagy {别|bié} … {了|le}?',
          head: ['', 'Jelentés'],
          rows: [
            ['{别|bié}{去|qù}！', 'Ne menj! (még nem indult el)'],
            ['{别|bié}{去|qù}{了|le}！', 'Inkább mégse menj! / Ne menj már!']
          ] }
      ],
      examples: [
        { zh: '{别|bié}{给|gěi}{我|wǒ}{打|dǎ}{电话|diàn·huà}{了|le}。', hu: 'Ne hívogass már.' },
        { zh: '{别|bié}{玩儿|wánr}{手机|shǒu·jī}{了|le}，{快|kuài}{睡|shuì}{觉|jiào}{吧|ba}。', hu: 'Elég a telefonozásból, aludj már!' }
      ]
    },
    {
      title: '{正在|zhèngzài} … {呢|ne}', sub: 'éppen most',
      pattern: 'A + {正在|zhèng·zài} + ige (+ {呢|ne})',
      body: 'A HSK 1 13. leckéjében a {在|zài} … {呢|ne} azt jelezte, hogy valami folyamatban van. A {正在|zhèngzài} még erősebben hangsúlyozza: <b>éppen most</b>, ebben a pillanatban: {我正在睡觉呢|wǒ zhèngzài shuì jiào ne} „épp alszom", {他们正在开会|tāmen zhèngzài kāi huì} „épp értekezleten vannak". Elég a {正|zhèng} is: {我正吃饭呢|wǒ zhèng chī fàn ne}.',
      more: [
        'Múltbeli pillanatra is: {你打电话的时候，我正在洗澡|nǐ dǎ diànhuà de shíhou, wǒ zhèngzài xǐ zǎo} „amikor telefonáltál, épp zuhanyoztam".',
        'Tagadás: {没在|méi zài} + ige: {我没在睡觉|wǒ méi zài shuì jiào} „nem alszom".'
      ],
      examples: [
        { zh: '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{呢|ne}。', hu: 'Épp alszom.' },
        { zh: '{你|nǐ}{来|lái}{的|de}{时候|shí·hou}，{我|wǒ}{正在|zhèng·zài}{做|zuò}{饭|fàn}。', hu: 'Amikor jöttél, épp főztem.' },
        { zh: '{老师|lǎo·shī}{正在|zhèng·zài}{上|shàng}{课|kè}，{你|nǐ}{等|děng}{一下|yí·xià}。', hu: 'A tanár épp órát tart, várj egy kicsit.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{了|le}。', good: '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{呢|ne}。', why: 'Folyamatban lévő cselekvés mellé {呢|ne} illik, nem {了|le}.' }
      ]
    },
    {
      title: 'testrész + {疼|téng}', sub: 'mi fáj? — orvosnál',
      pattern: '(A +) testrész + {疼|téng} · {哪儿不舒服|nǎr bù shū·fu}？',
      body: 'Az orvos első kérdése: {哪儿不舒服|nǎr bù shūfu}？ „Hol érzi rosszul magát?" A fájdalmat a testrész + {疼|téng} „fáj" fejezi ki: {我头疼|wǒ tóu téng} „fáj a fejem" (szó szerint: „nekem a fejem fáj" — téma-megjegyzés szerkezet, HSK 1 12. lecke), {肚子疼|dùzi téng} „fáj a hasam", {嗓子疼|sǎngzi téng} „fáj a torkom".',
      more: [
        'A {发烧|fā shāo} „lázas" és a {感冒|gǎnmào} „megfázik" után {了|le} jelzi, hogy most lett beteg: {我感冒了|wǒ gǎnmào le} „megfáztam".',
        'A gyógyszert kínaiul „eszik": {吃药|chī yào} „gyógyszert szed".'
      ],
      tables: [
        { caption: 'Mi fáj?',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{头|tóu}{疼|téng}', 'fáj a fej'],
            ['{肚子|dù·zi}{疼|téng}', 'fáj a has'],
            ['{嗓子|sǎng·zi}{疼|téng}', 'fáj a torok'],
            ['{牙|yá}{疼|téng}', 'fáj a fog'],
            ['{发烧|fā shāo}', 'lázas'],
            ['{感冒|gǎn·mào}', 'megfázott']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{头|tóu}{疼|téng}，{好像|hǎo·xiàng}{发烧|fā shāo}{了|le}。', hu: 'Fáj a fejem, mintha lázas lennék.' },
        { zh: '{你|nǐ}{哪儿|nǎr}{不|bù}{舒服|shū·fu}？', hu: 'Hol érzed rosszul magad?' }
      ]
    },
    {
      title: 'Gyakoriság: {一天三次|yì tiān sān cì}', sub: 'naponta háromszor',
      pattern: 'időegység + (ige) + szám + {次|cì}',
      body: '„Naponta háromszor": {一天三次|yì tiān sān cì} — előbb az időegység, aztán hányszor. Az ige a kettő közé kerül: {这个药一天吃三次|zhège yào yì tiān chī sān cì} „ebből a gyógyszerből naponta háromszor kell bevenni". Adag: {一次两片|yí cì liǎng piàn} „egyszerre két szemet".',
      more: [
        '{一个星期两次|yí ge xīngqī liǎng cì} „hetente kétszer", {一年一次|yì nián yí cì} „évente egyszer".'
      ],
      examples: [
        { zh: '{这|zhè}{个|ge}{药|yào}{一|yì}{天|tiān}{吃|chī}{三|sān}{次|cì}。', hu: 'Ebből a gyógyszerből naponta háromszor kell bevenni.' },
        { zh: '{我|wǒ}{一|yí}{个|ge}{星期|xīng·qī}{游|yóu}{两|liǎng}{次|cì}{泳|yǒng}。', hu: 'Hetente kétszer úszom.' }
      ],
      mistakes: [
        { bad: '{三|sān}{次|cì}{一|yì}{天|tiān}', good: '{一|yì}{天|tiān}{三|sān}{次|cì}', why: 'Előbb az időegység, aztán a szám + {次|cì}.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{哪儿|nǎr}{不|bù}{舒服|shū·fu}？', hu: 'Hol érzed rosszul magad?' },
    { zh: '{我|wǒ}{头|tóu}{疼|téng}。', hu: 'Fáj a fejem.' },
    { zh: '{别|bié}{担心|dān·xīn}！', hu: 'Ne aggódj!' },
    { zh: '{多|duō}{喝|hē}{水|shuǐ}，{多|duō}{休息|xiū·xi}。', hu: 'Igyál sokat, és pihenj sokat.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{别|bié}', pinyin: 'bié', hu: 'ne (tiltás)' },
        { zh: '{舒服|shū·fu}', pinyin: 'shūfu', hu: 'kényelmes, jól van' },
        { zh: '{疼|téng}', pinyin: 'téng', hu: 'fáj' },
        { zh: '{头|tóu}', pinyin: 'tóu', hu: 'fej' },
        { zh: '{发烧|fā shāo}', pinyin: 'fā shāo', hu: 'lázas' },
        { zh: '{感冒|gǎn·mào}', pinyin: 'gǎnmào', hu: 'megfázás; megfázik' },
        { zh: '{药|yào}', pinyin: 'yào', hu: 'gyógyszer' },
        { zh: '{担心|dān·xīn}', pinyin: 'dānxīn', hu: 'aggódni' },
        { zh: '{正在|zhèng·zài}', pinyin: 'zhèngzài', hu: 'éppen (most)' },
        { zh: '{医院|yī·yuàn}', pinyin: 'yīyuàn', hu: 'kórház' },
        { zh: '{好像|hǎo·xiàng}', pinyin: 'hǎoxiàng', hu: 'mintha, úgy tűnik' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{着急|zháo·jí}', pinyin: 'zháojí', hu: 'izgul, siet' },
        { zh: '{肚子|dù·zi}', pinyin: 'dùzi', hu: 'has' },
        { zh: '{嗓子|sǎng·zi}', pinyin: 'sǎngzi', hu: 'torok' },
        { zh: '{片|piàn}', pinyin: 'piàn', hu: 'szem (tabletta)' }
      ] }
  ],
  culture: [
    { title: 'Kínai és nyugati orvoslás', text: 'A kínai kórházakban rendszerint két irány működik egymás mellett: a nyugati orvoslás ({西医|xīyī}) és a hagyományos kínai orvoslás ({中医|zhōngyī}), amely gyógynövényekkel, akupunktúrával, köpölyözéssel dolgozik. Sokan náthára is gyógyteát vagy főzetet isznak, komolyabb bajra pedig nyugati orvoshoz fordulnak.' },
    { title: 'Igyál forró vizet!', text: 'Ha egy kínai barátodnak elmondod, hogy beteg vagy, szinte biztosan ezt tanácsolja: {多喝热水|duō hē rèshuǐ} „igyál sok forró vizet". Kínában a hideg italt sokan egészségtelennek tartják, betegen pedig különösen kerülik; az éttermekben is gyakran meleg vizet szolgálnak fel.' }
  ],
  reading: {
    title: '{安娜|Ān·nà}{感冒|gǎn·mào}{了|le}', titleHu: 'Anna megfázott',
    text: [
      { zh: '{昨天|zuó·tiān}{安娜|Ān·nà}{头|tóu}{疼|téng}，{还|hái}{发烧|fā shāo}{了|le}。', hu: 'Tegnap Annának fájt a feje, és lázas is volt.' },
      { zh: '{刘芳|Liú Fāng}{让|ràng}{她|tā}{别|bié}{去|qù}{上|shàng}{课|kè}，{带|dài}{她|tā}{去|qù}{了|le}{医院|yī·yuàn}。', hu: 'Liu Fang azt mondta, ne menjen órára, és elvitte a kórházba.' },
      { zh: '{医生|yī·shēng}{说|shuō}{她|tā}{感冒|gǎn·mào}{了|le}，{让|ràng}{她|tā}{一|yì}{天|tiān}{吃|chī}{三|sān}{次|cì}{药|yào}，{多|duō}{喝|hē}{热|rè}{水|shuǐ}。', hu: 'Az orvos azt mondta, megfázott; naponta háromszor vegyen be gyógyszert, és igyon sok meleg vizet.', par: true },
      { zh: '{晚上|wǎn·shang}{王明|Wáng Míng}{打|dǎ}{电话|diàn·huà}{的|de}{时候|shí·hou}，{安娜|Ān·nà}{正在|zhèng·zài}{睡|shuì}{觉|jiào}。', hu: 'Este, amikor Wang Ming telefonált, Anna épp aludt.' },
      { zh: '{今天|jīn·tiān}{她|tā}{已经|yǐ·jīng}{不|bù}{发烧|fā shāo}{了|le}，{但是|dàn·shì}{刘芳|Liú Fāng}{说|shuō}：“{别|bié}{着急|zháo·jí}，{再|zài}{休息|xiū·xi}{一|yì}{天|tiān}{吧|ba}！”', hu: 'Ma már nem lázas, de Liu Fang azt mondta: „Ne siess, pihenj még egy napot!"', par: true }
    ],
    words: [ { zh: '{热水|rè·shuǐ}', hu: 'meleg víz' } ],
    questions: [
      { q: 'Mi baja volt Annának tegnap?', a: 'fájt a feje és lázas volt', wrong: ['fájt a hasa és hányt', 'fájt a foga és a torka', 'eltörte a kezét'], why: '{头疼，还发烧了|tóu téng, hái fā shāo le}.' },
      { q: 'Mit mondott az orvos?', a: 'megfázott, igyon sok meleg vizet', wrong: ['semmi baja, mehet órára', 'kórházban kell maradnia', 'többet kell sportolnia'], why: '{她感冒了……多喝热水|tā gǎnmào le … duō hē rèshuǐ}.' },
      { q: 'Mit csinált Anna, amikor Wang Ming telefonált?', a: 'épp aludt', wrong: ['épp evett', 'épp tanult', 'épp orvosnál volt'], why: '{安娜正在睡觉|Ān\'nà zhèngzài shuì jiào}.' },
      { q: 'Mit tanácsol ma Liu Fang?', a: 'pihenjen még egy napot', wrong: ['menjen el órára', 'menjen újra orvoshoz', 'hívja fel Wang Minget'], why: '{再休息一天吧|zài xiūxi yì tiān ba}.' }
    ]
  },
  quiz: [
    { q: '„Ne aggódj!"', a: '{别|bié}{担心|dān·xīn}！', wrong: ['{没|méi}{担心|dān·xīn}！', '{担心|dān·xīn}{别|bié}！', '{不|bù}{担心|dān·xīn}{了|le}{吗|ma}！'], why: '{别|bié} + ige: tiltás, nyugtatás.', point: 1 },
    { q: 'Mit jelent: {别着急|bié zháojí}！', a: 'Ne izgulj, ráérünk!', wrong: ['Siess, késésben vagyunk!', 'Ne félj tőle!', 'Ne haragudj rám!'], why: '{着急|zháojí} „izgul, siet".', point: 1 },
    { q: '„Kérem, ne dohányozzon itt."', a: '{请|qǐng}{别|bié}{在|zài}{这儿|zhèr}{抽|chōu}{烟|yān}。', wrong: ['{请|qǐng}{在|zài}{这儿|zhèr}{别|bié}{抽|chōu}{烟|yān}{吗|ma}。', '{别|bié}{请|qǐng}{抽|chōu}{烟|yān}{在|zài}{这儿|zhèr}。', '{请|qǐng}{在|zài}{这儿|zhèr}{抽|chōu}{烟|yān}{别|bié}。'], why: '{请|qǐng} + {别|bié} + (hely) + ige.', point: 1 },
    { q: '„Ne menj!" — melyik NEM jó?', a: '{你|nǐ}{没|méi}{去|qù}！', wrong: ['{你|nǐ}{别|bié}{去|qù}！', '{你|nǐ}{不要|bú yào}{去|qù}！', '{别|bié}{去|qù}！'], why: 'A {没|méi} nem tilt, hanem múltat tagad.', point: 1 },
    { q: '„Ne nézd már a telefont!" (valaki épp nézi)', a: '{别|bié}{看|kàn}{手机|shǒu·jī}{了|le}！', wrong: ['{别|bié}{了|le}{看|kàn}{手机|shǒu·jī}！', '{看|kàn}{手机|shǒu·jī}{别|bié}{了|le}！', '{没|méi}{看|kàn}{手机|shǒu·jī}{了|le}！'], why: '{别|bié} + ige + {了|le}: hagyd abba.', point: 2 },
    { q: 'Mi a különbség? {别去|bié qù} · {别去了|bié qù le}', a: '„ne menj" · „inkább mégse menj"', wrong: ['„ne menj" · „nem mentél el"', '„mégse menj" · „ne menj"', 'nincs különbség, csak udvariasság'], why: 'A {了|le} a terv, a helyzet megváltoztatását kéri.', point: 2 },
    { q: 'Mit jelent: {别说了|bié shuō le}！', a: 'Elég, ne mondd tovább!', wrong: ['Ne mondd el senkinek!', 'Mondd el még egyszer!', 'Nem mondtam semmit!'], why: '{别|bié} … {了|le}: abbahagyásra kér.', point: 2 },
    { q: '„Épp alszom."', a: '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{呢|ne}。', wrong: ['{我|wǒ}{睡|shuì}{觉|jiào}{正在|zhèng·zài}{呢|ne}。', '{正在|zhèng·zài}{我|wǒ}{呢|ne}{睡|shuì}{觉|jiào}。', '{我|wǒ}{正在|zhèng·zài}{睡|shuì}{觉|jiào}{了|le}{吗|ma}。'], why: '{正在|zhèngzài} + ige + {呢|ne}.', point: 3 },
    { q: 'Mit jelent?', zh: '{你|nǐ}{打|dǎ}{电话|diàn·huà}{的|de}{时候|shí·hou}，{我|wǒ}{正在|zhèng·zài}{洗|xǐ}{澡|zǎo}。', a: 'Amikor telefonáltál, épp zuhanyoztam.', wrong: ['Amikor zuhanyoztam, felhívtalak.', 'Telefonálj, amikor zuhanyozom!', 'Zuhany után felhívlak.'], why: '{正在|zhèngzài} múltbeli pillanatra is.', point: 3 },
    { q: '„Fáj a fejem."', a: '{我|wǒ}{头|tóu}{疼|téng}。', wrong: ['{我|wǒ}{疼|téng}{头|tóu}。', '{头|tóu}{我|wǒ}{的|de}{疼|téng}{了|le}{吗|ma}。', '{疼|téng}{我|wǒ}{头|tóu}。'], why: '(Alany +) testrész + {疼|téng}.', point: 4 },
    { q: 'Mit kérdez az orvos: {哪儿不舒服|nǎr bù shūfu}？', a: 'Hol érzi rosszul magát?', wrong: ['Hol lakik most?', 'Mikor jött ide?', 'Mit evett ma?'], why: '{不舒服|bù shūfu} „rosszul érzi magát".', point: 4 },
    { q: 'Mit jelent: {我感冒了|wǒ gǎnmào le}。', a: 'Megfáztam.', wrong: ['Lázas vagyok.', 'Meggyógyultam.', 'Fáj a hasam.'], why: '{感冒|gǎnmào} „megfázik".', point: 4 },
    { q: 'Mit jelent a {舒服|shūfu}?', a: 'kényelmes, jól érzi magát', wrong: ['beteg, rosszul van', 'fáradt, álmos', 'éhes, szomjas'], why: '{不舒服|bù shūfu} „rosszul van".', point: 4 },
    { q: '„naponta háromszor"', a: '{一|yì}{天|tiān}{三|sān}{次|cì}', wrong: ['{三|sān}{次|cì}{一|yì}{天|tiān}', '{一|yí}{次|cì}{三|sān}{天|tiān}', '{天|tiān}{一|yí}{次|cì}{三|sān}'], why: 'Időegység + szám + {次|cì}.', point: 5 },
    { q: 'Mit jelent: {一次两片|yí cì liǎng piàn}。', a: 'egyszerre két szemet', wrong: ['naponta kétszer', 'két napig', 'két dobozzal'], why: '{一次|yí cì} „egy alkalommal" + {两片|liǎng piàn} „két szem".', point: 5 },
    { q: 'Hogyan mondják kínaiul: „beveszi a gyógyszert"?', a: '{吃|chī}{药|yào}', wrong: ['{买|mǎi}{药|yào}', '{拿|ná}{药|yào}', '{看|kàn}{药|yào}'], why: 'A gyógyszert kínaiul „eszik".', point: 5 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 11. LECKE — 比, különbség, 没有…那么, 更 / 还, 跟…一样
   ════════════════════════════════════════════════════ */
{
  id: 'l26', no: 26, badge: '11', kicker: 'HSK 2 · 11. lecke', label: 'HSK 2 · 11. lecke',
  title: 'Peking melegebb — összehasonlítás',
  lead: 'Összehasonlítasz: melyik nagyobb, melegebb, drágább (北京比布达佩斯热), mennyivel (热多了, 大三岁), mi nem olyan, mint a másik (没有北京那么热), és mi egyforma (跟…一样).',
  cando: [
    'Két dolgot összehasonlítasz: A 比 B + melléknév.',
    'Megmondod a különbséget: 大三岁, 便宜一点儿, 热多了.',
    'Tagadod az összehasonlítást: A 没有 B (那么) + melléknév.',
    'Fokozod (更, 还) és egyezést fejezel ki: 跟…一样.'
  ],
  intro: [
    'Nyár van, nagy a hőség Pekingben. Wang Ming kérdezi Annát: milyen a budapesti nyár, nagyobb-e Peking, hol hidegebb télen? A beszélgetés az összehasonlítás minden fontos eszközét felvonultatja.',
    'A kínai melléknévnek nincs középfoka („nagy — nagyobb"): a {比|bǐ} „-hoz képest" szó végzi az összehasonlítást, a melléknév pedig változatlan marad. Egy szabály a kezdetektől: a {比|bǐ}-s mondatban <b>nincs {很|hěn}</b>.'
  ],
  dialogue: {
    title: 'Fagylalt a hőségben',
    scene: 'Július, nagy hőség Pekingben. Anna és Wang Ming egy fagylaltozóban beszélgetnek.',
    lines: [
      { who: 'Wang Ming', zh: '{安娜|Ān·nà}，{布达佩斯|Bù·dá·pèi·sī}{的|de}{夏天|xià·tiān}{也|yě}{这么|zhè·me}{热|rè}{吗|ma}？', hu: 'Anna, Budapesten is ilyen meleg van nyáron?' },
      { who: 'Anna', zh: '{没有|méi·yǒu}{北京|Běi·jīng}{这么|zhè·me}{热|rè}。{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{热|rè}{多|duō}{了|le}！', hu: 'Nincs olyan meleg, mint Pekingben. Peking sokkal melegebb, mint Budapest!' },
      { who: 'Wang Ming', zh: '{北京|Běi·jīng}{也|yě}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{大|dà}{吧|ba}？', hu: 'És Peking nagyobb is Budapestnél, ugye?' },
      { who: 'Anna', zh: '{当然|dāng·rán}！{北京|Běi·jīng}{有|yǒu}{两千|liǎng qiān}{多|duō}{万|wàn}{人|rén}，{布达佩斯|Bù·dá·pèi·sī}{只|zhǐ}{有|yǒu}{一百七十|yì·bǎi qī·shí}{万|wàn}。', hu: 'Persze! Pekingben húsz-egynéhány millió ember él, Budapesten csak 1,7 millió.', note: 'A {万|wàn} „tízezer": {两千多万|liǎng qiān duō wàn} = 2000 × 10 000, azaz húsz-egynéhány millió; {一百七十万|yìbǎi qīshí wàn} = 1,7 millió.' },
      { who: 'Wang Ming', zh: '{冬天|dōng·tiān}{呢|ne}？{哪儿|nǎr}{更|gèng}{冷|lěng}？', hu: 'És télen? Hol hidegebb?' },
      { who: 'Anna', zh: '{差不多|chà·bu·duō}。{布达佩斯|Bù·dá·pèi·sī}{的|de}{冬天|dōng·tiān}{跟|gēn}{北京|Běi·jīng}{一样|yí·yàng}{冷|lěng}，{但是|dàn·shì}{雪|xuě}{比|bǐ}{北京|Běi·jīng}{多|duō}{一点儿|yì·diǎnr}。', hu: 'Nagyjából egyforma. A budapesti tél ugyanolyan hideg, mint a pekingi, de egy kicsit több a hó.' },
      { who: 'Wang Ming', zh: '{我|wǒ}{真|zhēn}{想|xiǎng}{去|qù}{看|kàn}{看|kan}！{明年|míng·nián}{冬天|dōng·tiān}{我|wǒ}{可能|kě·néng}{去|qù}{欧洲|Ōu·zhōu}{旅游|lǚ·yóu}。', hu: 'Nagyon szeretném megnézni! Jövő télen talán Európába utazom.' }
    ],
    notes: [
      'A {这么|zhème} „ennyire, ilyen"; párja a {那么|nàme} „annyira, olyan".',
      'A {当然|dāngrán} „persze, természetesen"; a {差不多|chàbuduō} „nagyjából ugyanaz, majdnem".',
      'Budapest kínaiul hangutánzó név: {布达佩斯|Bùdápèisī}.'
    ]
  },
  points: [
    {
      title: 'A {比|bǐ} B + melléknév', sub: 'nagyobb, melegebb, drágább',
      pattern: 'A + {比|bǐ} + B + melléknév',
      body: 'Az összehasonlítás alapmondata: {北京比布达佩斯大|Běijīng bǐ Bùdápèisī dà} „Peking nagyobb, mint Budapest" (szó szerint: „Peking Budapesthez képest nagy"). A melléknév nem változik, és <b>nem kap {很|hěn}-t</b>: {今天比昨天冷|jīntiān bǐ zuótiān lěng} „ma hidegebb van, mint tegnap".',
      more: [
        'B helyén gyakran {的|de}-s szerkezet áll, főnév nélkül: {我的手机比你的新|wǒ de shǒujī bǐ nǐ de xīn} „az én telefonom újabb, mint a tiéd".',
        'A {比|bǐ}-s mondatot ritkán tagadják {不比|bù bǐ}-vel; a szokásos tagadás a {没有|méiyǒu} (3. pont).'
      ],
      examples: [
        { zh: '{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{冷|lěng}。', hu: 'Ma hidegebb van, mint tegnap.' },
        { zh: '{我|wǒ}{哥哥|gē·ge}{比|bǐ}{我|wǒ}{高|gāo}。', hu: 'A bátyám magasabb nálam.' },
        { zh: '{这|zhè}{件|jiàn}{比|bǐ}{那|nà}{件|jiàn}{便宜|pián·yi}。', hu: 'Ez olcsóbb, mint az.' }
      ],
      mistakes: [
        { bad: '{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{很|hěn}{大|dà}。', good: '{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{大|dà}。', why: 'A {比|bǐ} után a melléknév elé nem kerül {很|hěn}.' }
      ]
    },
    {
      title: 'Mennyivel?', sub: 'sokkal, egy kicsit, három évvel',
      pattern: 'A + {比|bǐ} + B + melléknév + különbség',
      body: 'A különbség a melléknév <b>után</b> áll. „Sokkal": {热多了|rè duō le} vagy {热得多|rè de duō} „sokkal melegebb". „Egy kicsit": {大一点儿|dà yìdiǎnr} „egy kicsit nagyobb". Pontos mérték: {他比我大三岁|tā bǐ wǒ dà sān suì} „három évvel idősebb nálam", {高五厘米|gāo wǔ límǐ} „öt centivel magasabb".',
      more: [
        'A {很|hěn}, a {非常|fēicháng} „nagyon" itt nem állhat; a „sokkal" mindig {多了|duō le} vagy {得多|de duō}.'
      ],
      tables: [
        { caption: 'A különbség helye',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{北京|Běi·jīng}{比|bǐ}{这儿|zhèr}{热|rè}{多|duō}{了|le}。', 'Pekingben sokkal melegebb van, mint itt.'],
            ['{雪|xuě}{比|bǐ}{北京|Běi·jīng}{多|duō}{一点儿|yì·diǎnr}。', 'Egy kicsit több a hó, mint Pekingben.'],
            ['{他|tā}{比|bǐ}{我|wǒ}{大|dà}{三|sān}{岁|suì}。', 'Három évvel idősebb nálam.']
          ] }
      ],
      examples: [
        { zh: '{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{热|rè}{多|duō}{了|le}。', hu: 'Peking sokkal melegebb, mint Budapest.' },
        { zh: '{这|zhè}{件|jiàn}{比|bǐ}{那|nà}{件|jiàn}{便宜|pián·yi}{一点儿|yì·diǎnr}。', hu: 'Ez egy kicsit olcsóbb, mint az.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{比|bǐ}{他|tā}{三|sān}{岁|suì}{大|dà}。', good: '{我|wǒ}{比|bǐ}{他|tā}{大|dà}{三|sān}{岁|suì}。', why: 'A különbség a melléknév után kerül.' }
      ]
    },
    {
      title: 'A {没有|méiyǒu} B ({那么|nàme}) + melléknév', sub: 'nem olyan …, mint',
      pattern: 'A + {没有|méi·yǒu} + B + ({那么|nà·me} / {这么|zhè·me}) + melléknév',
      body: '„A nem olyan …, mint B": {布达佩斯没有北京那么热|Bùdápèisī méiyǒu Běijīng nàme rè} „Budapest nem olyan meleg, mint Peking". A {那么|nàme} „annyira" (vagy a beszélő helyére mutató {这么|zhème} „ennyire") el is hagyható: {我没有他高|wǒ méiyǒu tā gāo} „nem vagyok olyan magas, mint ő".',
      more: [
        'Ez a {比|bǐ}-s mondat szokásos tagadása: {北京比布达佩斯热|Běijīng bǐ Bùdápèisī rè} ↔ {布达佩斯没有北京热|Bùdápèisī méiyǒu Běijīng rè}.'
      ],
      examples: [
        { zh: '{布达佩斯|Bù·dá·pèi·sī}{没有|méi·yǒu}{北京|Běi·jīng}{那么|nà·me}{热|rè}。', hu: 'Budapest nem olyan meleg, mint Peking.' },
        { zh: '{我|wǒ}{的|de}{汉语|Hàn·yǔ}{没有|méi·yǒu}{你|nǐ}{的|de}{好|hǎo}。', hu: 'Az én kínaim nem olyan jó, mint a tiéd.' }
      ],
      mistakes: [
        { bad: '{布达佩斯|Bù·dá·pèi·sī}{比|bǐ}{北京|Běi·jīng}{没有|méi·yǒu}{热|rè}。', good: '{布达佩斯|Bù·dá·pèi·sī}{没有|méi·yǒu}{北京|Běi·jīng}{热|rè}。', why: 'A {没有|méiyǒu} a {比|bǐ} helyére kerül, nem mellé.' }
      ]
    },
    {
      title: '{更|gèng} · {还|hái}', sub: 'még inkább, még -abb',
      pattern: '{更|gèng} + mn. / ige · A + {比|bǐ} + B + {还|hái} / {更|gèng} + mn.',
      body: 'A {更|gèng} „még inkább, -abb" a nagyobb fokot jelzi két dolog közül: {哪儿更冷|nǎr gèng lěng}？ „Hol hidegebb?", {我更喜欢夏天|wǒ gèng xǐhuan xiàtiān} „a nyarat jobban szeretem". {比|bǐ}-s mondatban a {还|hái} vagy a {更|gèng} a melléknév elé kerül, és azt jelzi, hogy B sem kevés: {今天比昨天还冷|jīntiān bǐ zuótiān hái lěng} „ma még hidegebb van, mint tegnap (pedig tegnap is hideg volt)".',
      tables: [
        { caption: 'Három fok',
          head: ['Alapfok', 'Középfok', 'Felsőfok'],
          rows: [
            ['{好|hǎo}', '{更|gèng}{好|hǎo}', '{最|zuì}{好|hǎo}'],
            ['{冷|lěng}', '{更|gèng}{冷|lěng}', '{最|zuì}{冷|lěng}']
          ] }
      ],
      examples: [
        { zh: '{冬天|dōng·tiān}{哪儿|nǎr}{更|gèng}{冷|lěng}？', hu: 'Hol hidegebb télen?' },
        { zh: '{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{还|hái}{冷|lěng}。', hu: 'Ma még hidegebb van, mint tegnap.' },
        { zh: '{我|wǒ}{更|gèng}{喜欢|xǐ·huan}{喝|hē}{茶|chá}。', hu: 'Inkább a teát szeretem.' }
      ]
    },
    {
      title: 'A {跟|gēn} B {一样|yíyàng}', sub: 'ugyanolyan, mint',
      pattern: 'A + {跟|gēn} + B + {一样|yí·yàng} (+ melléknév)',
      body: 'Egyezés: A + {跟|gēn} + B + {一样|yíyàng} „A ugyanolyan, mint B": {我的手机跟你的一样|wǒ de shǒujī gēn nǐ de yíyàng} „a telefonom ugyanolyan, mint a tiéd". Melléknévvel: {布达佩斯的冬天跟北京一样冷|Bùdápèisī de dōngtiān gēn Běijīng yíyàng lěng} „a budapesti tél ugyanolyan hideg, mint a pekingi".',
      more: [
        'Tagadás: {不一样|bù yíyàng} „nem egyforma, más": {我们的想法不一样|wǒmen de xiǎngfǎ bù yíyàng} „másképp gondolkodunk".',
        'A {跟|gēn} helyett {和|hé} is állhat: {我和你一样|wǒ hé nǐ yíyàng}.'
      ],
      examples: [
        { zh: '{我|wǒ}{的|de}{手机|shǒu·jī}{跟|gēn}{你|nǐ}{的|de}{一样|yí·yàng}。', hu: 'A telefonom ugyanolyan, mint a tiéd.' },
        { zh: '{他|tā}{跟|gēn}{他|tā}{哥哥|gē·ge}{一样|yí·yàng}{高|gāo}。', hu: 'Ugyanolyan magas, mint a bátyja.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{的|de}{手机|shǒu·jī}{一样|yí·yàng}{跟|gēn}{你|nǐ}{的|de}。', good: '{我|wǒ}{的|de}{手机|shǒu·jī}{跟|gēn}{你|nǐ}{的|de}{一样|yí·yàng}。', why: 'Az {一样|yíyàng} a mondat végére, a B után kerül.' }
      ]
    }
  ],
  phrases: [
    { zh: '{哪|nǎ}{个|ge}{更|gèng}{好|hǎo}？', hu: 'Melyik a jobb?' },
    { zh: '{差不多|chà·bu·duō}。', hu: 'Nagyjából egyforma.' },
    { zh: '{一样|yí·yàng}{吗|ma}？', hu: 'Ugyanolyan?' },
    { zh: '{当然|dāng·rán}！', hu: 'Persze!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{比|bǐ}', pinyin: 'bǐ', hu: '-hoz képest (összehasonlítás)' },
        { zh: '{更|gèng}', pinyin: 'gèng', hu: 'még inkább, -abb' },
        { zh: '{跟|gēn}', pinyin: 'gēn', hu: '-val, -vel' },
        { zh: '{一样|yí·yàng}', pinyin: 'yíyàng', hu: 'ugyanolyan' },
        { zh: '{夏天|xià·tiān}', pinyin: 'xiàtiān', hu: 'nyár' },
        { zh: '{冬天|dōng·tiān}', pinyin: 'dōngtiān', hu: 'tél' },
        { zh: '{雪|xuě}', pinyin: 'xuě', hu: 'hó' },
        { zh: '{这么|zhè·me}', pinyin: 'zhème', hu: 'ennyire, ilyen' },
        { zh: '{那么|nà·me}', pinyin: 'nàme', hu: 'annyira, olyan' },
        { zh: '{当然|dāng·rán}', pinyin: 'dāngrán', hu: 'persze' },
        { zh: '{差不多|chà·bu·duō}', pinyin: 'chàbuduō', hu: 'majdnem, nagyjából' },
        { zh: '{万|wàn}', pinyin: 'wàn', hu: 'tízezer' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{欧洲|Ōu·zhōu}', pinyin: 'Ōuzhōu', hu: 'Európa' },
        { zh: '{非常|fēi·cháng}', pinyin: 'fēicháng', hu: 'nagyon, rendkívül' },
        { zh: '{厘米|lí·mǐ}', pinyin: 'límǐ', hu: 'centiméter' }
      ] }
  ],
  culture: [
    { title: 'Peking éghajlata', text: 'Pekingnek kontinentális éghajlata van: a nyár forró és párás, sokszor 35 fok fölött, a tél száraz és hideg, de kevés a hó. Tavasszal a Góbi felől érkező homokvihar ({沙尘暴|shāchénbào}) sárgára festheti az eget. A legkellemesebb évszak az ősz — a pekingiek szerint ilyenkor a legkékebb az ég.' },
    { title: 'Tízezres számolás', text: 'A kínai a nagy számokat tízezres egységekben ({万|wàn}) számolja: {一万|yí wàn} = 10 000, {十万|shí wàn} = 100 000, {一百万|yìbǎi wàn} = egymillió. A lakásárakat, fizetéseket is gyakran így mondják, ezért a magyar fülnek eleinte sok fejszámolást kíván — érdemes gyakorolni.' }
  ],
  reading: {
    title: '{北京|Běi·jīng}{和|hé}{布达佩斯|Bù·dá·pèi·sī}', titleHu: 'Peking és Budapest',
    text: [
      { zh: '{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{大|dà}{多|duō}{了|le}，{人|rén}{也|yě}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{多|duō}。', hu: 'Peking sokkal nagyobb, mint Budapest, és több ember is él ott.' },
      { zh: '{北京|Běi·jīng}{的|de}{夏天|xià·tiān}{很|hěn}{热|rè}，{布达佩斯|Bù·dá·pèi·sī}{没有|méi·yǒu}{北京|Běi·jīng}{那么|nà·me}{热|rè}。', hu: 'A pekingi nyár nagyon meleg, Budapesten nincs olyan meleg, mint Pekingben.' },
      { zh: '{冬天|dōng·tiān}{两|liǎng}{个|ge}{城市|chéng·shì}{差不多|chà·bu·duō}{一样|yí·yàng}{冷|lěng}，{但是|dàn·shì}{布达佩斯|Bù·dá·pèi·sī}{的|de}{雪|xuě}{更|gèng}{多|duō}。', hu: 'Télen a két város nagyjából egyformán hideg, de Budapesten több a hó.', par: true },
      { zh: '{安娜|Ān·nà}{觉得|jué·de}{北京|Běi·jīng}{的|de}{菜|cài}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{的|de}{便宜|pián·yi}，{也|yě}{更|gèng}{好吃|hǎo·chī}。', hu: 'Anna szerint a pekingi ételek olcsóbbak a budapestieknél, és finomabbak is.' },
      { zh: '{但是|dàn·shì}{她|tā}{说|shuō}，{布达佩斯|Bù·dá·pèi·sī}{的|de}{咖啡|kā·fēi}{比|bǐ}{北京|Běi·jīng}{的|de}{好|hǎo}{一点儿|yì·diǎnr}！', hu: 'De azt mondja, a budapesti kávé egy kicsit jobb a pekinginél!', par: true }
    ],
    words: [ { zh: '{城市|chéng·shì}', hu: 'város' } ],
    questions: [
      { q: 'Hol él több ember?', a: 'Pekingben', wrong: ['Budapesten', 'egyformán', 'nem derül ki'], why: '{人也比布达佩斯多|rén yě bǐ Bùdápèisī duō}.' },
      { q: 'Milyen a budapesti nyár?', a: 'nem olyan meleg, mint a pekingi', wrong: ['melegebb, mint a pekingi', 'ugyanolyan meleg, mint a pekingi', 'kifejezetten hideg és esős'], why: '{布达佩斯没有北京那么热|Bùdápèisī méiyǒu Běijīng nàme rè}.' },
      { q: 'Hol több a hó télen?', a: 'Budapesten', wrong: ['Pekingben', 'egyformán', 'sehol sincs hó'], why: '{布达佩斯的雪更多|Bùdápèisī de xuě gèng duō}.' },
      { q: 'Mi jobb Budapesten Anna szerint?', a: 'a kávé', wrong: ['az étel', 'az időjárás', 'a közlekedés'], why: '{布达佩斯的咖啡比北京的好一点儿|Bùdápèisī de kāfēi bǐ Běijīng de hǎo yìdiǎnr}.' }
    ]
  },
  quiz: [
    { q: '„Peking nagyobb, mint Budapest."', a: '{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{大|dà}。', wrong: ['{北京|Běi·jīng}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}{很|hěn}{大|dà}。', '{北京|Běi·jīng}{大|dà}{比|bǐ}{布达佩斯|Bù·dá·pèi·sī}。', '{比|bǐ}{北京|Běi·jīng}{布达佩斯|Bù·dá·pèi·sī}{大|dà}。'], why: 'A + {比|bǐ} + B + melléknév, {很|hěn} nélkül.', point: 1 },
    { q: 'Mit jelent: {今天比昨天冷|jīntiān bǐ zuótiān lěng}。', a: 'Ma hidegebb van, mint tegnap.', wrong: ['Tegnap hidegebb volt, mint ma.', 'Ma ugyanolyan hideg van, mint tegnap.', 'Ma nincs olyan hideg, mint tegnap.'], why: 'A ({今天|jīntiān}) + {比|bǐ} + B ({昨天|zuótiān}) + {冷|lěng}.', point: 1 },
    { q: 'Miért hibás: {我哥哥比我很高|wǒ gēge bǐ wǒ hěn gāo}?', a: 'a {比|bǐ}-s mondatban nem állhat {很|hěn}', wrong: ['a {比|bǐ} a mondat végére kerül', 'a {高|gāo} helyett {大|dà} kell', 'nem hibás, így helyes'], why: '{我哥哥比我高|wǒ gēge bǐ wǒ gāo}.', point: 1 },
    { q: '„Három évvel idősebb nálam."', a: '{他|tā}{比|bǐ}{我|wǒ}{大|dà}{三|sān}{岁|suì}。', wrong: ['{他|tā}{比|bǐ}{我|wǒ}{三|sān}{岁|suì}{大|dà}。', '{他|tā}{三|sān}{岁|suì}{比|bǐ}{我|wǒ}{大|dà}。', '{他|tā}{大|dà}{比|bǐ}{我|wǒ}{三|sān}{岁|suì}。'], why: 'A különbség a melléknév után.', point: 2 },
    { q: '„sokkal melegebb"', a: '{热|rè}{多|duō}{了|le}', wrong: ['{很|hěn}{多|duō}{热|rè}', '{多|duō}{热|rè}{了|le}', '{热|rè}{很|hěn}{多|duō}{了|le}'], why: 'Melléknév + {多了|duō le}.', point: 2 },
    { q: 'Mit jelent: {这件比那件便宜一点儿|zhè jiàn bǐ nà jiàn piányi yìdiǎnr}。', a: 'Ez egy kicsit olcsóbb, mint az.', wrong: ['Ez sokkal olcsóbb, mint az.', 'Ez ugyanolyan olcsó, mint az.', 'Ez nem olyan olcsó, mint az.'], why: '{一点儿|yìdiǎnr} „egy kicsit".', point: 2 },
    { q: '„Budapest nem olyan meleg, mint Peking."', a: '{布达佩斯|Bù·dá·pèi·sī}{没有|méi·yǒu}{北京|Běi·jīng}{那么|nà·me}{热|rè}。', wrong: ['{布达佩斯|Bù·dá·pèi·sī}{比|bǐ}{北京|Běi·jīng}{没有|méi·yǒu}{热|rè}。', '{布达佩斯|Bù·dá·pèi·sī}{没有|méi·yǒu}{热|rè}{北京|Běi·jīng}{那么|nà·me}。', '{北京|Běi·jīng}{没有|méi·yǒu}{布达佩斯|Bù·dá·pèi·sī}{那么|nà·me}{热|rè}。'], why: 'A + {没有|méiyǒu} + B + {那么|nàme} + melléknév.', point: 3 },
    { q: 'Hogyan tagadják leggyakrabban a {比|bǐ}-s mondatot?', a: 'A + {没有|méiyǒu} + B + melléknév', wrong: ['A + {比|bǐ} + B + {不|bù} + melléknév', 'A + {不|bù} + B + {比|bǐ} + melléknév', 'A + {比|bǐ} + {没|méi} + B + melléknév'], why: '{我没有他高|wǒ méiyǒu tā gāo}.', point: 3 },
    { q: '„Ma még hidegebb van, mint tegnap."', a: '{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{还|hái}{冷|lěng}。', wrong: ['{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{很|hěn}{冷|lěng}{还|hái}。', '{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{冷|lěng}{还|hái}。', '{还|hái}{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{冷|lěng}。'], why: '{比|bǐ} + B + {还|hái} + melléknév.', point: 4 },
    { q: '„A nyarat jobban szeretem."', a: '{我|wǒ}{更|gèng}{喜欢|xǐ·huan}{夏天|xià·tiān}。', wrong: ['{我|wǒ}{喜欢|xǐ·huan}{更|gèng}{夏天|xià·tiān}。', '{我|wǒ}{喜欢|xǐ·huan}{夏天|xià·tiān}{更|gèng}。', '{更|gèng}{我|wǒ}{夏天|xià·tiān}{喜欢|xǐ·huan}。'], why: 'A {更|gèng} az ige elé kerül.', point: 4 },
    { q: 'Melyik a helyes sor: jó → jobb → legjobb?', a: '{好|hǎo} → {更好|gèng hǎo} → {最好|zuì hǎo}', wrong: ['{好|hǎo} → {最好|zuì hǎo} → {更好|gèng hǎo}', '{更好|gèng hǎo} → {好|hǎo} → {最好|zuì hǎo}', '{很好|hěn hǎo} → {好|hǎo} → {更好|gèng hǎo}'], why: '{更|gèng} középfok, {最|zuì} felsőfok.', point: 4 },
    { q: '„A telefonom ugyanolyan, mint a tiéd."', a: '{我|wǒ}{的|de}{手机|shǒu·jī}{跟|gēn}{你|nǐ}{的|de}{一样|yí·yàng}。', wrong: ['{我|wǒ}{的|de}{手机|shǒu·jī}{一样|yí·yàng}{跟|gēn}{你|nǐ}{的|de}。', '{我|wǒ}{的|de}{手机|shǒu·jī}{比|bǐ}{你|nǐ}{的|de}{一样|yí·yàng}。', '{跟|gēn}{我|wǒ}{的|de}{手机|shǒu·jī}{你|nǐ}{的|de}{一样|yí·yàng}。'], why: 'A + {跟|gēn} + B + {一样|yíyàng}.', point: 5 },
    { q: 'Mit jelent: {不一样|bù yíyàng}？', a: 'nem egyforma, más', wrong: ['egyforma, azonos', 'nem egy darab', 'nem egyszer'], why: '{一样|yíyàng} „ugyanolyan" tagadva.', point: 5 },
    { q: 'Mit jelent a {差不多|chàbuduō}?', a: 'nagyjából ugyanaz, majdnem', wrong: ['nagyon különböző, más', 'egyáltalán nem, soha', 'sokkal több, rengeteg'], why: 'Szó szerint „nem sokban különbözik".', point: 5 },
    { q: 'Mit jelent a {万|wàn}?', a: 'tízezer', wrong: ['ezer', 'százezer', 'egymillió'], why: '{一百万|yìbǎi wàn} = egymillió.' },
    { q: 'Mit jelent: {明年我可能去欧洲|míngnián wǒ kěnéng qù Ōuzhōu}。', a: 'Jövőre talán Európába megyek.', wrong: ['Jövőre biztosan Európába megyek.', 'Jövőre nem mehetek Európába.', 'Tavaly Európában voltam.'], why: '{可能|kěnéng} „talán, lehet".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 12. LECKE — ige + 得 + melléknév, tárggyal, tagadás, 虽然…但是, dicséret
   ════════════════════════════════════════════════════ */
{
  id: 'l27', no: 27, badge: '12', kicker: 'HSK 2 · 12. lecke', label: 'HSK 2 · 12. lecke',
  title: 'Szépen énekelsz! — hogyan csinálod?',
  lead: 'Elmondod, hogyan, milyen jól csinál valaki valamit (你唱得真好, 他跑得很快), tárggyal is (她说汉语说得很好), összehasonlítasz (打得比我好), ellentétet fejezel ki (虽然…但是…), és szerényen fogadod a dicséretet (哪里哪里).',
  cando: [
    'Minősíted a cselekvést: ige + 得 + melléknév.',
    'Tárgyas igével is használod: 说汉语说得很好 / 汉语说得很好.',
    'Tagadsz és összehasonlítasz: 唱得不好, 打得比我好.',
    'Ellentétet fejezel ki: 虽然…，但是….'
  ],
  intro: [
    'Iskolai est volt, Anna kínai dalt énekelt. Liu Fang gratulál neki, Anna szerényen hárít — közben szóba kerül, ki milyen gyorsan beszél, ki kosarazik jobban.',
    'A lecke fő szerkezete az ige + {得|de} + minősítés: „szépen énekel", „gyorsan fut", „jól beszél kínaiul". A {得|de} semleges tónusú, ugyanúgy ejtjük, mint a {的|de}-t — de más írásjegy és más szerepű.'
  ],
  dialogue: {
    title: 'Az iskolai est után',
    scene: 'Iskolai est után. Liu Fang gratulál Annának, aki kínai dalt énekelt.',
    lines: [
      { who: 'Liu Fang', zh: '{安娜|Ān·nà}，{你|nǐ}{唱|chàng}{得|de}{真|zhēn}{好|hǎo}！', hu: 'Anna, nagyon szépen énekeltél!' },
      { who: 'Anna', zh: '{哪里|nǎ·li}{哪里|nǎ·li}。{我|wǒ}{唱|chàng}{得|de}{不|bú}{太|tài}{好|hǎo}，{有|yǒu}{几|jǐ}{个|ge}{字|zì}{唱|chàng}{错|cuò}{了|le}。', hu: 'Ugyan már. Nem énekeltem túl jól, néhány szót elrontottam.' },
      { who: 'Liu Fang', zh: '{你|nǐ}{汉语|Hàn·yǔ}{说|shuō}{得|de}{也|yě}{很|hěn}{好|hǎo}。{你|nǐ}{学|xué}{了|le}{多|duō}{长|cháng}{时间|shí·jiān}{了|le}？', hu: 'A kínaid is nagyon jó. Mióta tanulod?' },
      { who: 'Anna', zh: '{两|liǎng}{年|nián}{了|le}。{虽然|suī·rán}{我|wǒ}{每天|měi·tiān}{都|dōu}{学|xué}，{但是|dàn·shì}{我|wǒ}{说|shuō}{得|de}{很|hěn}{慢|màn}。', hu: 'Két éve. Bár minden nap tanulok, lassan beszélek.' },
      { who: 'Liu Fang', zh: '{慢|màn}{一点儿|yì·diǎnr}{没|méi}{关系|guān·xi}。{大卫|Dà·wèi}{说|shuō}{得|de}{很|hěn}{快|kuài}，{但是|dàn·shì}{常常|cháng·cháng}{说|shuō}{错|cuò}。', hu: 'Nem baj, ha kicsit lassabban. David gyorsan beszél, de gyakran hibázik.' },
      { who: 'Anna', zh: '{哈哈|hā·hā}，{但是|dàn·shì}{他|tā}{篮球|lán·qiú}{打|dǎ}{得|de}{比|bǐ}{我|wǒ}{好|hǎo}{多|duō}{了|le}！', hu: 'Haha, de kosárlabdában sokkal jobb nálam!' },
      { who: 'Liu Fang', zh: '{明天|míng·tiān}{的|de}{比赛|bǐ·sài}{你|nǐ}{去|qù}{看|kàn}{吗|ma}？{听说|tīng·shuō}{他|tā}{跑|pǎo}{得|de}{最|zuì}{快|kuài}。', hu: 'Eljössz holnap a meccsre? Azt mondják, ő fut a leggyorsabban.' }
    ],
    notes: [
      'A {哪里哪里|nǎli nǎli} „ugyan már" — szerény válasz dicséretre (szó szerint „hol? hol?").',
      'A {两年了|liǎng nián le} „két éve (már)": a mondatvégi {了|le} azt jelzi, hogy az állapot most is tart.',
      'A {比赛|bǐsài} „verseny, mérkőzés"; a {没关系|méi guānxi} „semmi baj".'
    ]
  },
  points: [
    {
      title: 'ige + {得|de} + melléknév', sub: 'hogyan, milyen jól?',
      pattern: 'A + ige + {得|de} + ({很|hěn} / {真|zhēn} …) + melléknév',
      body: 'Ha azt mondod, <b>hogyan, milyen jól</b> csinál valaki valamit, az ige után {得|de} áll, utána a minősítés: {你唱得真好|nǐ chàng de zhēn hǎo} „nagyon szépen énekelsz", {他跑得很快|tā pǎo de hěn kuài} „gyorsan fut", {你说得太快了|nǐ shuō de tài kuài le} „túl gyorsan beszélsz". A melléknév előtt rendszerint ott a {很|hěn} vagy más fokozó.',
      more: [
        'Kérdés: {他跑得快吗|tā pǎo de kuài ma}？ vagy {他跑得怎么样|tā pǎo de zěnmeyàng}？ „Hogy fut?"',
        'Három „de" van: {的|de} (birtok, jelző), {得|de} (ige után, minősítés) és {地|de} (határozó, az ige előtt — HSK 3). Kiejtésük azonos.'
      ],
      examples: [
        { zh: '{你|nǐ}{唱|chàng}{得|de}{真|zhēn}{好|hǎo}！', hu: 'Nagyon szépen énekelsz!' },
        { zh: '{他|tā}{跑|pǎo}{得|de}{很|hěn}{快|kuài}。', hu: 'Gyorsan fut.' },
        { zh: '{你|nǐ}{说|shuō}{得|de}{太|tài}{快|kuài}{了|le}，{请|qǐng}{慢|màn}{一点儿|yì·diǎnr}。', hu: 'Túl gyorsan beszélsz, kérlek, lassabban.' }
      ],
      mistakes: [
        { bad: '{他|tā}{跑|pǎo}{很|hěn}{快|kuài}。', good: '{他|tā}{跑|pǎo}{得|de}{很|hěn}{快|kuài}。', why: 'Az ige és a minősítés közé {得|de} kell.' }
      ]
    },
    {
      title: 'Tárggyal: {说汉语说得很好|shuō Hànyǔ shuō de hěn hǎo}', sub: 'az ige megismétlődik',
      pattern: 'A + ige + tárgy + ige + {得|de} + mn. · A + tárgy + ige + {得|de} + mn.',
      body: 'A {得|de}-nek közvetlenül az ige után kell állnia, ezért ha tárgy is van, az igét <b>megismétlik</b> — ugyanúgy, mint az időtartamnál (HSK 2 2. lecke): {她说汉语说得很好|tā shuō Hànyǔ shuō de hěn hǎo} „jól beszél kínaiul". Gyakoribb, rövidebb változat: az első ige elmarad, a tárgy előre kerül: {她汉语说得很好|tā Hànyǔ shuō de hěn hǎo}.',
      tables: [
        { caption: 'Ugyanaz háromféleképpen',
          head: ['Kínaiul', 'Megjegyzés'],
          rows: [
            ['{她|tā}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', 'tárgy nélkül'],
            ['{她|tā}{说|shuō}{汉语|Hàn·yǔ}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', 'az ige ismétlődik'],
            ['{她|tā}{汉语|Hàn·yǔ}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', 'a tárgy előre kerül']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{汉语|Hàn·yǔ}{说|shuō}{得|de}{也|yě}{很|hěn}{好|hǎo}。', hu: 'A kínaid is nagyon jó.' },
        { zh: '{他|tā}{打|dǎ}{篮球|lán·qiú}{打|dǎ}{得|de}{很|hěn}{好|hǎo}。', hu: 'Jól kosarazik.' }
      ],
      mistakes: [
        { bad: '{她|tā}{说|shuō}{汉语|Hàn·yǔ}{得|de}{很|hěn}{好|hǎo}。', good: '{她|tā}{说|shuō}{汉语|Hàn·yǔ}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', why: 'A {得|de} közvetlenül az ige után áll, ezért az ige ismétlődik.' }
      ]
    },
    {
      title: 'Tagadás és összehasonlítás', sub: 'nem jól · jobban, mint …',
      pattern: 'ige + {得|de} + {不|bù} + mn. · ige + {得|de} + {比|bǐ} + B + mn.',
      body: 'A tagadás a {得|de} <b>után</b> jön, a minősítés elé: {我唱得不好|wǒ chàng de bù hǎo} „nem éneklek jól", {他说得不太快|tā shuō de bú tài kuài} „nem beszél túl gyorsan". Összehasonlításnál a {比|bǐ} + B is a {得|de} után kerül: {他篮球打得比我好|tā lánqiú dǎ de bǐ wǒ hǎo} „jobban kosarazik, mint én". Felsőfok: {他跑得最快|tā pǎo de zuì kuài} „ő fut a leggyorsabban".',
      examples: [
        { zh: '{我|wǒ}{唱|chàng}{得|de}{不|bú}{太|tài}{好|hǎo}。', hu: 'Nem éneklek túl jól.' },
        { zh: '{他|tā}{篮球|lán·qiú}{打|dǎ}{得|de}{比|bǐ}{我|wǒ}{好|hǎo}{多|duō}{了|le}。', hu: 'Sokkal jobban kosarazik, mint én.' },
        { zh: '{听说|tīng·shuō}{他|tā}{跑|pǎo}{得|de}{最|zuì}{快|kuài}。', hu: 'Azt mondják, ő fut a leggyorsabban.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{不|bú}{唱|chàng}{得|de}{好|hǎo}。', good: '{我|wǒ}{唱|chàng}{得|de}{不|bù}{好|hǎo}。', why: 'A {不|bù} a {得|de} után, a minősítés elé kerül.' }
      ]
    },
    {
      title: '{虽然|suīrán} … {但是|dànshì} …', sub: 'bár …, (de) …',
      pattern: '{虽然|suī·rán} + ellentét，{但是|dàn·shì} / {可是|kě·shì} + mégis',
      body: '„Bár …": {虽然我每天都学，但是我说得很慢|suīrán wǒ měitiān dōu xué, dànshì wǒ shuō de hěn màn} „bár minden nap tanulok, lassan beszélek". A kínaiban a második rész elején akkor is ott a {但是|dànshì} vagy a {可是|kěshì} „de", ha a mondat {虽然|suīrán}-nal kezdődött — a magyarban a „de" ilyenkor elmarad.',
      more: [
        'A {虽然|suīrán} az alany előtt és után is állhat: {我虽然很累，但是很高兴|wǒ suīrán hěn lèi, dànshì hěn gāoxìng} „bár fáradt vagyok, örülök".',
        'Ne keverd: a {因为|yīnwèi} párja a {所以|suǒyǐ} (ok → következmény), a {虽然|suīrán} párja a {但是|dànshì} (ellentét).'
      ],
      examples: [
        { zh: '{虽然|suī·rán}{我|wǒ}{每天|měi·tiān}{都|dōu}{学|xué}，{但是|dàn·shì}{我|wǒ}{说|shuō}{得|de}{很|hěn}{慢|màn}。', hu: 'Bár minden nap tanulok, lassan beszélek.' },
        { zh: '{这|zhè}{件|jiàn}{衣服|yī·fu}{虽然|suī·rán}{很|hěn}{贵|guì}，{但是|dàn·shì}{很|hěn}{漂亮|piào·liang}。', hu: 'Ez a ruha ugyan drága, de nagyon szép.' }
      ],
      mistakes: [
        { bad: '{虽然|suī·rán}{很|hěn}{累|lèi}，{所以|suǒ·yǐ}{很|hěn}{高兴|gāo·xìng}。', good: '{虽然|suī·rán}{很|hěn}{累|lèi}，{但是|dàn·shì}{很|hěn}{高兴|gāo·xìng}。', why: 'A {虽然|suīrán} párja a {但是|dànshì}.' }
      ]
    },
    {
      title: 'Dicséret és szerénység', sub: 'hogyan fogadd a dicséretet?',
      pattern: '{真|zhēn} + melléknév！ · {哪里哪里|nǎ·li nǎ·li}',
      body: 'A {真|zhēn} „igazán" felkiáltásban erősít: {真好|zhēn hǎo}！ „de jó!", {你唱得真好|nǐ chàng de zhēn hǎo}！ Kínában a dicséretet illik szerényen hárítani: {哪里哪里|nǎli nǎli} „ugyan már" (szó szerint „hol? hol?"), {还可以|hái kěyǐ} „elmegy", {没有没有|méiyǒu méiyǒu} „dehogy". A fiatalok ma már gyakran egyszerűen {谢谢|xièxie}-t mondanak.',
      examples: [
        { zh: '{你|nǐ}{的|de}{汉语|Hàn·yǔ}{真|zhēn}{好|hǎo}！——{哪里|nǎ·li}{哪里|nǎ·li}。', hu: 'Milyen jó a kínaid! — Ugyan már.' },
        { zh: '{你|nǐ}{做|zuò}{的|de}{菜|cài}{真|zhēn}{好吃|hǎo·chī}！——{还|hái}{可以|kě·yǐ}{吧|ba}。', hu: 'Nagyon finom, amit főztél! — Elmegy.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{说|shuō}{得|de}{太|tài}{快|kuài}{了|le}。', hu: 'Túl gyorsan beszélsz.' },
    { zh: '{请|qǐng}{说|shuō}{得|de}{慢|màn}{一点儿|yì·diǎnr}。', hu: 'Kérlek, beszélj lassabban.' },
    { zh: '{哪里|nǎ·li}{哪里|nǎ·li}。', hu: 'Ugyan már.' },
    { zh: '{真|zhēn}{好|hǎo}！', hu: 'De jó!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{得|de}', pinyin: 'de', hu: 'minősítés jele (ige után)' },
        { zh: '{唱|chàng}', pinyin: 'chàng', hu: 'énekelni' },
        { zh: '{快|kuài}', pinyin: 'kuài', hu: 'gyors' },
        { zh: '{慢|màn}', pinyin: 'màn', hu: 'lassú' },
        { zh: '{虽然|suī·rán}', pinyin: 'suīrán', hu: 'bár, noha' },
        { zh: '{但是|dàn·shì}', pinyin: 'dànshì', hu: 'de' },
        { zh: '{比赛|bǐ·sài}', pinyin: 'bǐsài', hu: 'verseny, meccs' },
        { zh: '{真|zhēn}', pinyin: 'zhēn', hu: 'igazán, tényleg' },
        { zh: '{跳舞|tiào wǔ}', pinyin: 'tiào wǔ', hu: 'táncolni' },
        { zh: '{好听|hǎo·tīng}', pinyin: 'hǎotīng', hu: 'szép (hangzású)' },
        { zh: '{高兴|gāo·xìng}', pinyin: 'gāoxìng', hu: 'boldog, örül' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{可是|kě·shì}', pinyin: 'kěshì', hu: 'de, azonban' },
        { zh: '{哪里|nǎ·li}', pinyin: 'nǎli', hu: 'hol; ugyan már' },
        { zh: '{晚会|wǎn·huì}', pinyin: 'wǎnhuì', hu: 'esti rendezvény' },
        { zh: '{留学生|liú·xué·shēng}', pinyin: 'liúxuéshēng', hu: 'külföldi diák' }
      ] }
  ],
  culture: [
    { title: '„Milyen jól beszélsz kínaiul!"', text: 'Külföldiként Kínában gyakran megdicsérnek: {你的汉语说得真好|nǐ de Hànyǔ shuō de zhēn hǎo}！ — néha már egy {你好|nǐ hǎo} után is. Ez kedvesség és bátorítás, nem feltétlenül pontos értékelés. A legjobb válasz egy mosolygó {哪里哪里|nǎli nǎli} vagy {还差得远呢|hái chà de yuǎn ne} „még messze vagyok tőle".' },
    { title: 'Karaoke', text: 'A karaoke (kínaiul gyakran egyszerűen KTV) Kínában az egyik legnépszerűbb társasági program: baráti társaságok, kollégák külön kis termet bérelnek, és órákon át énekelnek. Ha meghívnak, érdemes egy kínai dalt megtanulni — nagy örömet szerez vele az ember.' }
  ],
  reading: {
    title: '{学校|xué·xiào}{的|de}{晚会|wǎn·huì}', titleHu: 'Az iskolai est',
    text: [
      { zh: '{昨天|zuó·tiān}{晚上|wǎn·shang}{学校|xué·xiào}{有|yǒu}{一|yí}{个|ge}{晚会|wǎn·huì}，{很|hěn}{多|duō}{留学生|liú·xué·shēng}{唱|chàng}{了|le}{中国|Zhōng·guó}{歌|gē}。', hu: 'Tegnap este iskolai est volt, sok külföldi diák kínai dalokat énekelt.' },
      { zh: '{安娜|Ān·nà}{唱|chàng}{得|de}{很|hěn}{好|hǎo}，{大家|dà·jiā}{都|dōu}{说|shuō}{好听|hǎo·tīng}。', hu: 'Anna nagyon szépen énekelt, mindenki azt mondta, gyönyörű volt.' },
      { zh: '{虽然|suī·rán}{她|tā}{唱|chàng}{错|cuò}{了|le}{几|jǐ}{个|ge}{字|zì}，{但是|dàn·shì}{大家|dà·jiā}{都|dōu}{很|hěn}{高兴|gāo·xìng}。', hu: 'Bár néhány szót elrontott, mindenki örült.', par: true },
      { zh: '{大卫|Dà·wèi}{跳|tiào}{舞|wǔ}{跳|tiào}{得|de}{不|bú}{太|tài}{好|hǎo}，{但是|dàn·shì}{大家|dà·jiā}{笑|xiào}{得|de}{很|hěn}{开心|kāi·xīn}。', hu: 'David nem táncolt túl jól, de mindenki jót nevetett.' },
      { zh: '{王明|Wáng Míng}{说|shuō}：“{明年|míng·nián}{我|wǒ}{也|yě}{要|yào}{唱|chàng}，{我|wǒ}{一定|yí·dìng}{唱|chàng}{得|de}{比|bǐ}{你们|nǐ·men}{都|dōu}{好|hǎo}！”', hu: 'Wang Ming azt mondta: „Jövőre én is énekelek, és biztosan mindenkinél jobban!"', par: true }
    ],
    words: [ { zh: '{大家|dà·jiā}', hu: 'mindenki' }, { zh: '{笑|xiào}', hu: 'nevetni' }, { zh: '{开心|kāi·xīn}', hu: 'vidám' } ],
    questions: [
      { q: 'Mit csinált sok külföldi diák az esten?', a: 'kínai dalokat énekelt', wrong: ['kosárlabdázott', 'kínai ételeket főzött', 'verseket olvasott fel'], why: '{很多留学生唱了中国歌|hěn duō liúxuéshēng chàngle Zhōngguó gē}.' },
      { q: 'Milyen volt Anna éneke?', a: 'szép, mindenkinek tetszett', wrong: ['rossz, senkinek sem tetszett', 'túl halk, nem hallották', 'túl gyors, nem értették'], why: '{唱得很好，大家都说好听|chàng de hěn hǎo, dàjiā dōu shuō hǎotīng}.' },
      { q: 'Hogyan táncolt David?', a: 'nem túl jól', wrong: ['nagyon jól', 'a legjobban', 'egyáltalán nem táncolt'], why: '{跳舞跳得不太好|tiào wǔ tiào de bú tài hǎo}.' },
      { q: 'Mit mond Wang Ming?', a: 'jövőre ő is énekel, mindenkinél jobban', wrong: ['jövőre táncolni fog a színpadon', 'soha többé nem megy ilyen estre', 'idén Anna énekelt a legjobban'], why: '{明年我也要唱……比你们都好|míngnián wǒ yě yào chàng … bǐ nǐmen dōu hǎo}.' }
    ]
  },
  quiz: [
    { q: '„Nagyon szépen énekelsz!"', a: '{你|nǐ}{唱|chàng}{得|de}{真|zhēn}{好|hǎo}！', wrong: ['{你|nǐ}{唱|chàng}{真|zhēn}{好|hǎo}{得|de}！', '{你|nǐ}{得|de}{唱|chàng}{真|zhēn}{好|hǎo}！', '{你|nǐ}{真|zhēn}{好|hǎo}{唱|chàng}{的|de}！'], why: 'Ige + {得|de} + minősítés.', point: 1 },
    { q: '„Gyorsan fut."', a: '{他|tā}{跑|pǎo}{得|de}{很|hěn}{快|kuài}。', wrong: ['{他|tā}{跑|pǎo}{很|hěn}{快|kuài}{得|de}。', '{他|tā}{得|de}{跑|pǎo}{很|hěn}{快|kuài}。', '{他|tā}{很|hěn}{快|kuài}{得|de}{跑|pǎo}。'], why: 'Ige + {得|de} + {很|hěn} + melléknév.', point: 1 },
    { q: 'Hogyan kérdezed: „Hogy fut?"', a: '{他|tā}{跑|pǎo}{得|de}{怎么样|zěn·me·yàng}？', wrong: ['{他|tā}{怎么样|zěn·me·yàng}{跑|pǎo}{得|de}？', '{他|tā}{跑|pǎo}{怎么样|zěn·me·yàng}{得|de}？', '{他|tā}{得|de}{跑|pǎo}{怎么|zěn·me}？'], why: 'Ige + {得|de} + {怎么样|zěnmeyàng}.', point: 1 },
    { q: 'Mit jelent: {你说得太快了|nǐ shuō de tài kuài le}。', a: 'Túl gyorsan beszélsz.', wrong: ['Túl sokat beszélsz.', 'Gyorsan mondd el!', 'Jól beszélsz.'], why: '{太|tài} … {了|le} „túl …".', point: 1 },
    { q: 'Melyik írásjegy kell? {他跑|tā pǎo} ___ {很快|hěn kuài}。', a: '{得|de}', wrong: ['{的|de}', '{地|de}', '{了|le}'], why: 'Ige utáni minősítés: {得|de}.', point: 1 },
    { q: '„Jól beszél kínaiul."', a: '{她|tā}{说|shuō}{汉语|Hàn·yǔ}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', wrong: ['{她|tā}{说|shuō}{汉语|Hàn·yǔ}{得|de}{很|hěn}{好|hǎo}。', '{她|tā}{说|shuō}{得|de}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}。', '{她|tā}{很|hěn}{好|hǎo}{说|shuō}{汉语|Hàn·yǔ}{得|de}。'], why: 'Tárggyal az ige ismétlődik.', point: 2 },
    { q: 'Melyik alak helyes még? (= jól beszél kínaiul)', a: '{她|tā}{汉语|Hàn·yǔ}{说|shuō}{得|de}{很|hěn}{好|hǎo}。', wrong: ['{她|tā}{说|shuō}{得|de}{很|hěn}{好|hǎo}{汉语|Hàn·yǔ}。', '{汉语|Hàn·yǔ}{她|tā}{得|de}{说|shuō}{很|hěn}{好|hǎo}。', '{她|tā}{说|shuō}{汉语|Hàn·yǔ}{很|hěn}{好|hǎo}{得|de}。'], why: 'A tárgy előre kerülhet, az első ige elmarad.', point: 2 },
    { q: '„Nem éneklek jól."', a: '{我|wǒ}{唱|chàng}{得|de}{不|bù}{好|hǎo}。', wrong: ['{我|wǒ}{不|bú}{唱|chàng}{得|de}{好|hǎo}。', '{我|wǒ}{唱|chàng}{不|bù}{得|de}{好|hǎo}。', '{我|wǒ}{没|méi}{唱|chàng}{得|de}{好|hǎo}。'], why: 'A {不|bù} a {得|de} után áll.', point: 3 },
    { q: '„Nem beszél túl gyorsan."', a: '{他|tā}{说|shuō}{得|de}{不|bú}{太|tài}{快|kuài}。', wrong: ['{他|tā}{不|bú}{太|tài}{说|shuō}{得|de}{快|kuài}。', '{他|tā}{说|shuō}{不|bú}{太|tài}{得|de}{快|kuài}。', '{他|tā}{不|bù}{说|shuō}{得|de}{太|tài}{快|kuài}。'], why: 'Ige + {得|de} + {不太|bú tài} + melléknév.', point: 3 },
    { q: '„Jobban kosarazik, mint én."', a: '{他|tā}{篮球|lán·qiú}{打|dǎ}{得|de}{比|bǐ}{我|wǒ}{好|hǎo}。', wrong: ['{他|tā}{篮球|lán·qiú}{打|dǎ}{比|bǐ}{我|wǒ}{得|de}{好|hǎo}。', '{他|tā}{比|bǐ}{我|wǒ}{篮球|lán·qiú}{好|hǎo}{打|dǎ}{得|de}。', '{他|tā}{打|dǎ}{篮球|lán·qiú}{得|de}{好|hǎo}{比|bǐ}{我|wǒ}。'], why: 'Ige + {得|de} + {比|bǐ} + B + melléknév.', point: 3 },
    { q: 'Mit jelent: {他跑得最快|tā pǎo de zuì kuài}。', a: 'Ő fut a leggyorsabban.', wrong: ['Ő is gyorsan fut.', 'Gyorsabban fut, mint én.', 'Nem fut gyorsan.'], why: '{最|zuì} „leg-".', point: 3 },
    { q: '„Bár fáradt vagyok, (de) örülök."', a: '{虽然|suī·rán}{我|wǒ}{很|hěn}{累|lèi}，{但是|dàn·shì}{很|hěn}{高兴|gāo·xìng}。', wrong: ['{虽然|suī·rán}{我|wǒ}{很|hěn}{累|lèi}，{所以|suǒ·yǐ}{很|hěn}{高兴|gāo·xìng}。', '{因为|yīn·wèi}{我|wǒ}{很|hěn}{累|lèi}，{但是|dàn·shì}{很|hěn}{高兴|gāo·xìng}。', '{但是|dàn·shì}{我|wǒ}{很|hěn}{累|lèi}，{虽然|suī·rán}{很|hěn}{高兴|gāo·xìng}。'], why: '{虽然|suīrán} … {但是|dànshì} ….', point: 4 },
    { q: 'Mi a {虽然|suīrán} párja a mondat második felében?', a: '{但是|dàn·shì}', wrong: ['{所以|suǒ·yǐ}', '{因为|yīn·wèi}', '{就|jiù}'], why: 'Ellentét: {虽然|suīrán} … {但是|dànshì} ….', point: 4 },
    { q: 'Mit jelent: {哪里哪里|nǎli nǎli}。', a: 'Ugyan már! (dicséretre)', wrong: ['Hol? Hol van, nem látom?', 'Mindenhol, ahol csak lehet!', 'Bárhová mehetsz, nem baj!'], why: 'Szerény válasz dicséretre.', point: 5 },
    { q: 'Mit jelent a {慢|màn}?', a: 'lassú', wrong: ['gyors', 'korai', 'késő'], why: '{快|kuài} „gyors" — {慢|màn} „lassú".' },
    { q: 'Mit jelent a {比赛|bǐsài}?', a: 'verseny, mérkőzés', wrong: ['összehasonlítás', 'edzés', 'belépőjegy'], why: '{明天的比赛|míngtiān de bǐsài} „a holnapi meccs".' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 13. LECKE — ige + 着, hely + ige + 着, ige₁ + 着 + ige₂, 往, 来 / 去 irány
   ════════════════════════════════════════════════════ */
{
  id: 'l28', no: 28, badge: '13', kicker: 'HSK 2 · 13. lecke', label: 'HSK 2 · 13. lecke',
  title: 'Fehér ruha van rajtam — állapot és irány',
  lead: 'Leírod, mi milyen állapotban van (门开着, 她穿着白衣服), mi hol van (桌子上放着一本书), hogyan csinál valaki valamit (笑着说), és útbaigazítasz (往左走, 进来).',
  cando: [
    'Tartós állapotot írsz le: ige + 着 (门开着, 穿着白衣服).',
    'Elmondod, mi hol van és hogyan: hely + ige + 着 + dolog.',
    'Két egyidejű cselekvést kötsz össze: 笑着说, 坐着吃.',
    'Irányt mutatsz (往左走) és jelzed a mozgás irányát: 进来, 出去, 过来.'
  ],
  intro: [
    'Anna egy kávézóban találkozik Liu Fang barátnőjével, Xiao Yuval, akit még sosem látott. Telefonon írják le egymásnak, hol ülnek, mi van rajtuk, mi van az asztalon — és Xiao Yu útbaigazítja Annát.',
    'A lecke kulcsszava a {着|zhe}: az ige után azt jelzi, hogy egy <b>állapot fennáll</b> — az ajtó nyitva van, a könyv az asztalon fekszik, valaki ül. Ez más, mint a {正在|zhèngzài}, amely egy épp zajló <b>cselekvést</b> jelöl.'
  ],
  dialogue: {
    title: 'A kávézóban',
    scene: 'Anna egy kávézó előtt áll, és felhívja Xiao Yut, akivel itt beszéltek meg találkozót.',
    lines: [
      { who: 'Anna', zh: '{喂|wèi}，{小雨|Xiǎo Yǔ}，{我|wǒ}{到|dào}{咖啡馆|kā·fēi·guǎn}{了|le}。{你|nǐ}{在|zài}{哪儿|nǎr}？', hu: 'Halló, Xiao Yu, megérkeztem a kávézóhoz. Hol vagy?' },
      { who: 'Xiao Yu', zh: '{我|wǒ}{在|zài}{里边|lǐ·bian}{坐|zuò}{着|zhe}{呢|ne}。{你|nǐ}{进|jìn}{来|lai}{吧|ba}，{往|wǎng}{左|zuǒ}{走|zǒu}。', hu: 'Bent ülök. Gyere be, és menj balra.' },
      { who: 'Anna', zh: '{好|hǎo}……{这儿|zhèr}{人|rén}{很|hěn}{多|duō}。{你|nǐ}{穿|chuān}{着|zhe}{什么|shén·me}{衣服|yī·fu}？', hu: 'Jó… Sokan vannak itt. Milyen ruha van rajtad?' },
      { who: 'Xiao Yu', zh: '{我|wǒ}{穿|chuān}{着|zhe}{白色|bái·sè}{的|de}{衣服|yī·fu}，{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{一|yì}{本|běn}{红色|hóng·sè}{的|de}{书|shū}。', hu: 'Fehér ruha van rajtam, és egy piros könyv van az asztalon.' },
      { who: 'Anna', zh: '{窗户|chuāng·hu}{旁边|páng·biān}{那|nà}{个|ge}{笑|xiào}{着|zhe}{看|kàn}{手机|shǒu·jī}{的|de}{人|rén}{是|shì}{你|nǐ}{吗|ma}？', hu: 'Az ott az ablak mellett, aki mosolyogva nézi a telefonját, te vagy?' },
      { who: 'Xiao Yu', zh: '{对|duì}！{我|wǒ}{看|kàn}{见|jiàn}{你|nǐ}{了|le}！{快|kuài}{过|guò}{来|lai}{吧|ba}！', hu: 'Igen! Már látlak! Gyere gyorsan ide!' },
      { who: 'Anna', zh: '{你好|nǐ hǎo}！{外边|wài·bian}{下|xià}{着|zhe}{雨|yǔ}，{我们|wǒ·men}{就|jiù}{在|zài}{这儿|zhèr}{聊|liáo}{聊|liao}{吧|ba}。', hu: 'Szia! Kint esik, beszélgessünk itt.' }
    ],
    notes: [
      'A {小雨|Xiǎo Yǔ} „Kis Eső" — becenév; a {小|xiǎo} gyakori a barátok nevei előtt.',
      'A {咖啡馆|kāfēiguǎn} „kávézó", a {桌子|zhuōzi} „asztal", a {窗户|chuānghu} „ablak".',
      'A {聊聊|liáoliao} „beszélgessünk egy kicsit": a {聊天|liáo tiān} „beszélget" igéből, kettőzve.'
    ]
  },
  points: [
    {
      title: 'ige + {着|zhe}', sub: 'tartós állapot',
      pattern: 'A + ige + {着|zhe} (+ tárgy)',
      body: 'A semleges tónusú {着|zhe} az ige után azt jelzi, hogy egy cselekvés eredményeként <b>állapot áll fenn</b>, és tart: {门开着|mén kāizhe} „az ajtó nyitva van", {她穿着白衣服|tā chuānzhe bái yīfu} „fehér ruha van rajta", {我在里边坐着呢|wǒ zài lǐbian zuòzhe ne} „bent ülök". A {正在|zhèngzài} egy zajló <b>cselekvést</b> mutat, a {着|zhe} az <b>állapotot</b>.',
      more: [
        'Tagadás: {没|méi} + ige + {着|zhe}: {门没开着|mén méi kāizhe} „az ajtó nincs nyitva".',
        'Időjárásra is: {外边下着雨|wàibian xiàzhe yǔ} „kint esik az eső".'
      ],
      tables: [
        { caption: '{正在|zhèngzài} vagy {着|zhe}?',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{他|tā}{正在|zhèng·zài}{穿|chuān}{衣服|yī·fu}。', 'Épp öltözik. (cselekvés)'],
            ['{他|tā}{穿|chuān}{着|zhe}{白|bái}{衣服|yī·fu}。', 'Fehér ruha van rajta. (állapot)']
          ] }
      ],
      examples: [
        { zh: '{门|mén}{开|kāi}{着|zhe}，{你|nǐ}{进|jìn}{来|lai}{吧|ba}。', hu: 'Nyitva az ajtó, gyere be.' },
        { zh: '{我|wǒ}{穿|chuān}{着|zhe}{白色|bái·sè}{的|de}{衣服|yī·fu}。', hu: 'Fehér ruha van rajtam.' },
        { zh: '{外边|wài·bian}{下|xià}{着|zhe}{雨|yǔ}。', hu: 'Kint esik az eső.' }
      ],
      mistakes: [
        { bad: '{门|mén}{不|bù}{开|kāi}{着|zhe}。', good: '{门|mén}{没|méi}{开|kāi}{着|zhe}。', why: 'A {着|zhe}-s állapotot {没|méi} tagadja.' }
      ]
    },
    {
      title: 'hely + ige + {着|zhe} + dolog', sub: 'mi hol van — és hogyan',
      pattern: 'hely + ige + {着|zhe} + (szám + mérőszó +) dolog',
      body: 'Leírásban gyakori: a mondat a <b>hellyel</b> kezdődik, a végén áll a dolog, közöttük az ige mondja meg, <b>hogyan</b> van ott: {桌子上放着一本书|zhuōzi shang fàngzhe yì běn shū} „az asztalon egy könyv fekszik", {墙上挂着一张画|qiáng shang guàzhe yì zhāng huà} „a falon egy kép lóg", {门口站着一个人|ménkǒu zhànzhe yí ge rén} „az ajtóban áll valaki".',
      more: [
        'A {有|yǒu} (HSK 1 10. lecke) csak azt mondja, hogy van ott valami ({桌子上有一本书|zhuōzi shang yǒu yì běn shū}); a {着|zhe}-s ige azt is, milyen módon.',
        'A dolog itt új információ, ezért gyakran számnév + mérőszó áll előtte.'
      ],
      examples: [
        { zh: '{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{一|yì}{本|běn}{红色|hóng·sè}{的|de}{书|shū}。', hu: 'Az asztalon egy piros könyv van.' },
        { zh: '{墙|qiáng}{上|shang}{挂|guà}{着|zhe}{一|yì}{张|zhāng}{照片|zhào·piàn}。', hu: 'A falon egy fénykép lóg.' },
        { zh: '{门口|mén·kǒu}{站|zhàn}{着|zhe}{一|yí}{个|ge}{人|rén}。', hu: 'Az ajtóban áll valaki.' }
      ],
      mistakes: [
        { bad: '{一|yì}{本|běn}{书|shū}{放|fàng}{着|zhe}{桌子|zhuō·zi}{上|shang}。', good: '{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{一|yì}{本|běn}{书|shū}。', why: 'Ebben a szerkezetben a hely kerül előre, a dolog a végére.' }
      ]
    },
    {
      title: 'ige₁ + {着|zhe} + ige₂', sub: 'mosolyogva mondja, ülve eszik',
      pattern: 'A + ige₁ + {着|zhe} + ige₂',
      body: 'Ha két cselekvés egyszerre zajlik, és az első a második <b>módját</b> adja meg, az első ige kapja a {着|zhe}-t: {笑着说|xiàozhe shuō} „mosolyogva mondja", {坐着吃|zuòzhe chī} „ülve eszik", {站着等|zhànzhe děng} „állva vár", {走着去|zǒuzhe qù} „gyalog megy". A magyarban ilyenkor „-va, -ve" határozói igenév áll.',
      examples: [
        { zh: '{她|tā}{笑|xiào}{着|zhe}{看|kàn}{手机|shǒu·jī}。', hu: 'Mosolyogva nézi a telefonját.' },
        { zh: '{我们|wǒ·men}{坐|zuò}{着|zhe}{聊|liáo}{吧|ba}。', hu: 'Üljünk le beszélgetni.' },
        { zh: '{不|bù}{远|yuǎn}，{我们|wǒ·men}{走|zǒu}{着|zhe}{去|qù}{吧|ba}。', hu: 'Nincs messze, menjünk gyalog.' }
      ]
    },
    {
      title: '{往|wǎng} + irány', sub: 'balra, előre — útbaigazítás',
      pattern: '{往|wǎng} + irány / hely + ige',
      body: 'A {往|wǎng} „felé, irányába" az ige <b>előtt</b> adja meg az irányt: {往左走|wǎng zuǒ zǒu} „menj balra", {往前走|wǎng qián zǒu} „menj előre", {往右拐|wǎng yòu guǎi} „fordulj jobbra", {往里走|wǎng lǐ zǒu} „menj beljebb". Útbaigazításban ez a leggyakoribb szerkezet.',
      more: [
        '{一直往前走|yìzhí wǎng qián zǒu} „menj egyenesen előre", {到了路口往右拐|dàole lùkǒu wǎng yòu guǎi} „a kereszteződésnél fordulj jobbra".'
      ],
      tables: [
        { caption: 'Irányok',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{往|wǎng}{前|qián}{走|zǒu}', 'menj előre'],
            ['{往|wǎng}{后|hòu}{看|kàn}', 'nézz hátra'],
            ['{往|wǎng}{左|zuǒ}{拐|guǎi}', 'fordulj balra'],
            ['{往|wǎng}{右|yòu}{拐|guǎi}', 'fordulj jobbra'],
            ['{往|wǎng}{里|lǐ}{走|zǒu}', 'menj beljebb']
          ] }
      ],
      examples: [
        { zh: '{你|nǐ}{进|jìn}{来|lai}{以后|yǐ·hòu}{往|wǎng}{左|zuǒ}{走|zǒu}。', hu: 'Ha bejöttél, menj balra.' },
        { zh: '{一直|yì·zhí}{往|wǎng}{前|qián}{走|zǒu}，{银行|yín·háng}{在|zài}{右边|yòu·bian}。', hu: 'Menj egyenesen előre, a bank jobbra van.' }
      ],
      mistakes: [
        { bad: '{走|zǒu}{往|wǎng}{左|zuǒ}。', good: '{往|wǎng}{左|zuǒ}{走|zǒu}。', why: 'A {往|wǎng} + irány az ige elé kerül.' }
      ]
    },
    {
      title: 'ige + {来|lai} / {去|qu}', sub: 'felém vagy tőlem el',
      pattern: '{进|jìn} / {出|chū} / {过|guò} / {回|huí} + {来|lai} / {去|qu}',
      body: 'A {来|lái} „jön" és a {去|qù} „megy" más igék után a mozgás <b>irányát</b> jelzi a beszélőhöz képest: {来|lai} — felém, {去|qu} — tőlem el. {进来|jìnlai} „bejön (ide)", {进去|jìnqu} „bemegy (oda)", {出来|chūlai} „kijön", {出去|chūqu} „kimegy", {过来|guòlai} „idejön (hozzám)", {回来|huílai} „visszajön".',
      more: [
        'Ha a beszélő bent van, ezt mondja: {请进来|qǐng jìnlai} — rövidebben {请进|qǐng jìn}！ „Tessék, jöjjön be!"',
        'A {来|lai} / {去|qu} ilyenkor semleges tónusú: <i>jìnlai</i>, <i>chūqu</i>.'
      ],
      tables: [
        { caption: 'Irány a beszélőhöz képest',
          head: ['', '+ {来|lai} (felém)', '+ {去|qu} (tőlem el)'],
          rows: [
            ['{进|jìn} be', '{进|jìn}{来|lai} bejön', '{进|jìn}{去|qu} bemegy'],
            ['{出|chū} ki', '{出|chū}{来|lai} kijön', '{出|chū}{去|qu} kimegy'],
            ['{回|huí} vissza', '{回|huí}{来|lai} visszajön', '{回|huí}{去|qu} visszamegy']
          ] }
      ],
      examples: [
        { zh: '{快|kuài}{过|guò}{来|lai}{吧|ba}！', hu: 'Gyere gyorsan ide!' },
        { zh: '{外边|wài·bian}{下|xià}{雨|yǔ}，{别|bié}{出|chū}{去|qu}{了|le}。', hu: 'Kint esik, ne menj ki.' },
        { zh: '{请|qǐng}{进|jìn}！', hu: 'Tessék, jöjjön be!' }
      ]
    }
  ],
  phrases: [
    { zh: '{请|qǐng}{进|jìn}！', hu: 'Tessék, jöjjön be!' },
    { zh: '{往|wǎng}{左|zuǒ}{走|zǒu}。', hu: 'Menj balra.' },
    { zh: '{快|kuài}{过|guò}{来|lai}{吧|ba}！', hu: 'Gyere gyorsan ide!' },
    { zh: '{我们|wǒ·men}{聊|liáo}{聊|liao}{吧|ba}。', hu: 'Beszélgessünk egy kicsit.' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{着|zhe}', pinyin: 'zhe', hu: 'tartós állapot jele' },
        { zh: '{往|wǎng}', pinyin: 'wǎng', hu: 'felé, irányába' },
        { zh: '{穿|chuān}', pinyin: 'chuān', hu: 'visel, felvesz (ruhát)' },
        { zh: '{放|fàng}', pinyin: 'fàng', hu: 'tesz, helyez' },
        { zh: '{站|zhàn}', pinyin: 'zhàn', hu: 'áll' },
        { zh: '{笑|xiào}', pinyin: 'xiào', hu: 'nevet, mosolyog' },
        { zh: '{进|jìn}', pinyin: 'jìn', hu: 'be(megy)' },
        { zh: '{出|chū}', pinyin: 'chū', hu: 'ki(megy)' },
        { zh: '{门|mén}', pinyin: 'mén', hu: 'ajtó' },
        { zh: '{开|kāi}', pinyin: 'kāi', hu: 'nyit; nyitva van' },
        { zh: '{桌子|zhuō·zi}', pinyin: 'zhuōzi', hu: 'asztal' },
        { zh: '{窗户|chuāng·hu}', pinyin: 'chuānghu', hu: 'ablak' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{咖啡馆|kā·fēi·guǎn}', pinyin: 'kāfēiguǎn', hu: 'kávézó' },
        { zh: '{拐|guǎi}', pinyin: 'guǎi', hu: 'befordul' },
        { zh: '{挂|guà}', pinyin: 'guà', hu: 'lóg, felakaszt' },
        { zh: '{聊天|liáo tiān}', pinyin: 'liáo tiān', hu: 'beszélgetni' }
      ] }
  ],
  culture: [
    { title: 'Útbaigazítás égtájakkal', text: 'Pekingben sokan nem jobbra-balra igazítanak útba, hanem égtájakkal: {往北走|wǎng běi zǒu} „menj észak felé", {在东边|zài dōngbian} „keleten van". A régi város utcái ugyanis pontosan észak–déli és kelet–nyugati irányúak. Érdemes megtanulni: {东|dōng} kelet, {南|nán} dél, {西|xī} nyugat, {北|běi} észak.' },
    { title: 'A kávé hódítása', text: 'A tea hazájában a fiatalok egyre több kávét isznak: a nagyvárosokban szinte minden sarkon van kávézó, és a hazai kávézóláncok gyorsan nőnek. Rendelni többnyire telefonos alkalmazással szokás, a kész kávét pedig a pultnál kell felvenni — vagy kiszállítják.' }
  ],
  reading: {
    title: '{一|yì}{张|zhāng}{照片|zhào·piàn}', titleHu: 'Egy fénykép',
    text: [
      { zh: '{这|zhè}{是|shì}{我|wǒ}{和|hé}{小雨|Xiǎo Yǔ}{在|zài}{咖啡馆|kā·fēi·guǎn}{的|de}{照片|zhào·piàn}。', hu: 'Ez egy fénykép rólam és Xiao Yuról a kávézóban.' },
      { zh: '{我们|wǒ·men}{坐|zuò}{在|zài}{窗户|chuāng·hu}{旁边|páng·biān}，{外边|wài·bian}{下|xià}{着|zhe}{雨|yǔ}。', hu: 'Az ablak mellett ülünk, kint esik az eső.' },
      { zh: '{小雨|Xiǎo Yǔ}{穿|chuān}{着|zhe}{白色|bái·sè}{的|de}{衣服|yī·fu}，{笑|xiào}{着|zhe}{看|kàn}{我|wǒ}。', hu: 'Xiao Yun fehér ruha van, és mosolyogva néz rám.', par: true },
      { zh: '{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{两|liǎng}{杯|bēi}{咖啡|kā·fēi}{和|hé}{一|yì}{本|běn}{红色|hóng·sè}{的|de}{书|shū}。', hu: 'Az asztalon két kávé és egy piros könyv van.' },
      { zh: '{墙|qiáng}{上|shang}{挂|guà}{着|zhe}{一|yì}{张|zhāng}{北京|Běi·jīng}{的|de}{老|lǎo}{照片|zhào·piàn}。', hu: 'A falon egy régi pekingi fénykép lóg.', par: true }
    ],
    words: [ { zh: '{照片|zhào·piàn}', hu: 'fénykép' }, { zh: '{墙|qiáng}', hu: 'fal' } ],
    questions: [
      { q: 'Hol ülnek?', a: 'az ablak mellett', wrong: ['az ajtó mellett', 'kint a teraszon', 'a pult előtt'], why: '{坐在窗户旁边|zuò zài chuānghu pángbiān}.' },
      { q: 'Milyen idő van kint?', a: 'esik az eső', wrong: ['süt a nap', 'havazik', 'fúj a szél'], why: '{外边下着雨|wàibian xiàzhe yǔ}.' },
      { q: 'Mi van az asztalon?', a: 'két kávé és egy piros könyv', wrong: ['két tea és egy telefon', 'egy kávé és két könyv', 'egy virág és egy fénykép'], why: '{放着两杯咖啡和一本红色的书|fàngzhe liǎng bēi kāfēi hé yì běn hóngsè de shū}.' },
      { q: 'Mi lóg a falon?', a: 'egy régi pekingi fénykép', wrong: ['egy nagy térkép', 'egy fali óra', 'egy kalligráfia'], why: '{挂着一张北京的老照片|guàzhe yì zhāng Běijīng de lǎo zhàopiàn}.' }
    ]
  },
  quiz: [
    { q: '„Az ajtó nyitva van."', a: '{门|mén}{开|kāi}{着|zhe}。', wrong: ['{门|mén}{着|zhe}{开|kāi}。', '{开|kāi}{着|zhe}{门|mén}{了|le}{吗|ma}。', '{门|mén}{正在|zhèng·zài}{开|kāi}{着|zhe}{了|le}。'], why: 'Ige + {着|zhe}: tartós állapot.', point: 1 },
    { q: 'Mit jelent: {他穿着白衣服|tā chuānzhe bái yīfu}。', a: 'Fehér ruha van rajta.', wrong: ['Épp felveszi a fehér ruhát.', 'Fehér ruhát vett.', 'Leveszi a fehér ruhát.'], why: 'A {着|zhe} állapotot jelöl.', point: 1 },
    { q: 'Mi a különbség? {他正在穿衣服|tā zhèngzài chuān yīfu} · {他穿着白衣服|tā chuānzhe bái yīfu}', a: 'épp öltözik · fehér ruha van rajta', wrong: ['fehér ruha van rajta · épp öltözik', 'ruhát vesz · ruhát mos', 'nincs különbség, csak a szórend'], why: '{正在|zhèngzài}: cselekvés · {着|zhe}: állapot.', point: 1 },
    { q: '„Az ajtó nincs nyitva."', a: '{门|mén}{没|méi}{开|kāi}{着|zhe}。', wrong: ['{门|mén}{不|bù}{开|kāi}{着|zhe}{了|le}。', '{门|mén}{开|kāi}{没|méi}{着|zhe}。', '{没|méi}{门|mén}{开|kāi}{着|zhe}。'], why: '{没|méi} + ige + {着|zhe}.', point: 1 },
    { q: 'Mit jelent: {外边下着雨|wàibian xiàzhe yǔ}。', a: 'Kint esik az eső.', wrong: ['Kint elállt az eső.', 'Kint esni fog.', 'Kint nem esik.'], why: '{下着雨|xiàzhe yǔ} „esik (tart az eső)".', point: 1 },
    { q: '„Az asztalon egy könyv fekszik."', a: '{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{一|yì}{本|běn}{书|shū}。', wrong: ['{一|yì}{本|běn}{书|shū}{放|fàng}{着|zhe}{桌子|zhuō·zi}{上|shang}。', '{桌子|zhuō·zi}{上|shang}{一|yì}{本|běn}{书|shū}{放|fàng}{着|zhe}。', '{放|fàng}{着|zhe}{桌子|zhuō·zi}{上|shang}{一|yì}{本|běn}{书|shū}。'], why: 'Hely + ige + {着|zhe} + dolog.', point: 2 },
    { q: 'Mit jelent: {门口站着一个人|ménkǒu zhànzhe yí ge rén}。', a: 'Az ajtóban áll valaki.', wrong: ['Valaki kiment az ajtón.', 'Valaki becsukta az ajtót.', 'Az ajtó előtt nincs senki.'], why: 'Hely + {站着|zhànzhe} + személy.', point: 2 },
    { q: '„Mosolyogva mondja."', a: '{笑|xiào}{着|zhe}{说|shuō}', wrong: ['{说|shuō}{着|zhe}{笑|xiào}', '{笑|xiào}{说|shuō}{着|zhe}', '{着|zhe}{笑|xiào}{说|shuō}'], why: 'Ige₁ + {着|zhe} + ige₂: az első a módot adja.', point: 3 },
    { q: 'Mit jelent: {我们走着去吧|wǒmen zǒuzhe qù ba}。', a: 'Menjünk gyalog.', wrong: ['Menjünk el most rögtön.', 'Menjünk busszal.', 'Ne menjünk sehová.'], why: '{走着|zǒuzhe} „gyalogolva".', point: 3 },
    { q: '„Menj balra!"', a: '{往|wǎng}{左|zuǒ}{走|zǒu}！', wrong: ['{走|zǒu}{往|wǎng}{左|zuǒ}！', '{左|zuǒ}{往|wǎng}{走|zǒu}！', '{往|wǎng}{走|zǒu}{左|zuǒ}！'], why: '{往|wǎng} + irány + ige.', point: 4 },
    { q: 'Mit jelent: {一直往前走|yìzhí wǎng qián zǒu}。', a: 'Menj egyenesen előre.', wrong: ['Fordulj vissza.', 'Menj mindig balra.', 'Várj itt egy kicsit.'], why: '{往前|wǎng qián} „előre".', point: 4 },
    { q: '„Fordulj jobbra!"', a: '{往|wǎng}{右|yòu}{拐|guǎi}！', wrong: ['{往|wǎng}{左|zuǒ}{拐|guǎi}！', '{往|wǎng}{前|qián}{走|zǒu}！', '{往|wǎng}{后|hòu}{看|kàn}！'], why: '{右|yòu} „jobb", {拐|guǎi} „befordul".', point: 4 },
    { q: 'Bent vagy a szobában, kopognak. Mit mondasz?', a: '{请|qǐng}{进|jìn}！', wrong: ['{请|qǐng}{出|chū}{去|qu}！', '{请|qǐng}{回|huí}{去|qu}！', '{请|qǐng}{下|xià}{去|qu}！'], why: '{请进|qǐng jìn} „tessék, jöjjön be".', point: 5 },
    { q: 'Mi a különbség: {进来|jìnlai} · {进去|jìnqu}?', a: 'bejön (felém) · bemegy (tőlem el)', wrong: ['bemegy (tőlem el) · bejön (felém)', 'kijön (felém) · kimegy (tőlem el)', 'nincs köztük semmi különbség'], why: '{来|lai}: a beszélő felé · {去|qu}: tőle el.', point: 5 },
    { q: 'Mit jelent: {快过来吧|kuài guòlai ba}！', a: 'Gyere gyorsan ide!', wrong: ['Menj gyorsan oda!', 'Gyere vissza holnap!', 'Menj el gyorsan!'], why: '{过来|guòlai} „idejön (hozzám)".', point: 5 },
    { q: 'Mit jelent a {放|fàng}?', a: 'tesz, helyez', wrong: ['vesz, emel', 'visz, hoz', 'lát, néz'], why: '{桌子上放着一本书|zhuōzi shang fàngzhe yì běn shū}.' }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 14. LECKE — ige + 过, 没 + ige + 过, 过 + szám + 次, 过 vagy 了, 还没…呢
   ════════════════════════════════════════════════════ */
{
  id: 'l29', no: 29, badge: '14', kicker: 'HSK 2 · 14. lecke', label: 'HSK 2 · 14. lecke',
  title: 'Voltál már a Nagy Falon? — tapasztalatok',
  lead: 'Tapasztalatról beszélsz: mit csináltál már valaha (我吃过北京烤鸭), mit még soha (没去过长城), hányszor (去过两次), és mi az, ami még nem történt meg, de várható (还没…呢).',
  cando: [
    'Tapasztalatot fejezel ki: ige + 过 (吃过, 去过).',
    'Tagadod: 没 + ige + 过 („még nem, soha").',
    'Megmondod, hányszor: 去过两次, 见过他一次.',
    'Megkülönbözteted a 过-t és a 了-t, és azt mondod: 还没…呢 („még nem").'
  ],
  intro: [
    'David már egy éve Pekingben él, de a Nagy Falon még nem járt. Wang Ming nem akar hinni a fülének — és elhatározza, hogy elviszi. A beszélgetésből megtanulod, hogyan beszélsz a tapasztalataidról.',
    'A {过|guo} (semleges tónusú) az ige után azt jelzi, hogy valami <b>valaha, az életed során</b> megtörtént. A magyar ezt a „már", „valaha", „volt már" szavakkal fejezi ki.'
  ],
  dialogue: {
    title: 'A Nagy Fal',
    scene: 'Wang Ming és David a menzán ebédelnek, és arról beszélgetnek, mit látott már David Kínában.',
    lines: [
      { who: 'Wang Ming', zh: '{大卫|Dà·wèi}，{你|nǐ}{吃|chī}{过|guo}{北京|Běi·jīng}{烤鸭|kǎo·yā}{吗|ma}？', hu: 'David, ettél már pekingi kacsát?' },
      { who: 'David', zh: '{吃|chī}{过|guo}，{我|wǒ}{吃|chī}{过|guo}{两|liǎng}{次|cì}。{但是|dàn·shì}{我|wǒ}{还|hái}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}{呢|ne}。', hu: 'Ettem, már kétszer. De a Nagy Falnál még nem jártam.' },
      { who: 'Wang Ming', zh: '{真|zhēn}{的|de}？{你|nǐ}{来|lái}{北京|Běi·jīng}{一|yì}{年|nián}{了|le}，{还|hái}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}？', hu: 'Tényleg? Egy éve vagy Pekingben, és még nem voltál a Nagy Falnál?' },
      { who: 'David', zh: '{没|méi}{去|qù}{过|guo}。{上|shàng}{个|ge}{月|yuè}{我|wǒ}{想|xiǎng}{去|qù}，{但是|dàn·shì}{那|nà}{天|tiān}{下|xià}{雨|yǔ}{了|le}。', hu: 'Nem. Múlt hónapban akartam menni, de aznap esett.' },
      { who: 'Wang Ming', zh: '{你|nǐ}{听|tīng}{过|guo}{这|zhè}{句|jù}{话|huà}{吗|ma}？“{不|bú}{到|dào}{长城|Cháng·chéng}{非|fēi}{好汉|hǎo·hàn}。”', hu: 'Hallottad már ezt a mondást? „Aki nem járt a Nagy Falon, nem igazi legény."' },
      { who: 'David', zh: '{听|tīng}{过|guo}！{那|nà}{我|wǒ}{这|zhè}{个|ge}{星期六|xīng·qī·liù}{就|jiù}{去|qù}。{你|nǐ}{去|qù}{过|guo}{几|jǐ}{次|cì}？', hu: 'Hallottam! Akkor ezen a szombaton megyek. Te hányszor voltál már?' },
      { who: 'Wang Ming', zh: '{我|wǒ}{去|qù}{过|guo}{很|hěn}{多|duō}{次|cì}{了|le}。{这|zhè}{次|cì}{我|wǒ}{带|dài}{你|nǐ}{去|qù}！', hu: 'Már sokszor. Most én viszlek el!' }
    ],
    notes: [
      'A {北京烤鸭|Běijīng kǎoyā} „pekingi kacsa" a város leghíresebb étele.',
      'A {不到长城非好汉|bú dào Chángchéng fēi hǎohàn} közismert mondás; a {非|fēi} „nem", a {好汉|hǎohàn} „derék legény, hős".',
      'A {这次|zhè cì} „ezúttal, most".'
    ]
  },
  points: [
    {
      title: 'ige + {过|guo}', sub: 'tapasztalat: valaha megtörtént',
      pattern: 'A + ige + {过|guo} (+ tárgy)',
      body: 'A {过|guo} az ige után azt jelzi, hogy valami <b>valaha megtörtént</b> — tapasztalat: {我吃过北京烤鸭|wǒ chīguo Běijīng kǎoyā} „ettem már pekingi kacsát", {你去过上海吗|nǐ qùguo Shànghǎi ma}？ „Voltál már Sanghajban?" Az ige és a {过|guo} közé semmi nem kerül; a tárgy utánuk jön.',
      more: [
        'Kérdés: … {过吗|guo ma}？ vagy … {过没有|guo méiyǒu}？ Rövid válasz: {吃过|chīguo} „ettem már" / {没吃过|méi chīguo} „még nem ettem".',
        'A {过|guò} 4. tónussal önálló ige is: „átmegy, eltölt (időt)": {过春节|guò Chūnjié} „megüli a tavaszünnepet".'
      ],
      examples: [
        { zh: '{我|wǒ}{吃|chī}{过|guo}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', hu: 'Ettem már pekingi kacsát.' },
        { zh: '{你|nǐ}{去|qù}{过|guo}{上海|Shàng·hǎi}{吗|ma}？', hu: 'Voltál már Sanghajban?' },
        { zh: '{你|nǐ}{听|tīng}{过|guo}{这|zhè}{句|jù}{话|huà}{吗|ma}？', hu: 'Hallottad már ezt a mondást?' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{吃|chī}{北京|Běi·jīng}{烤鸭|kǎo·yā}{过|guo}。', good: '{我|wǒ}{吃|chī}{过|guo}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', why: 'A {过|guo} közvetlenül az ige után áll, a tárgy előtt.' }
      ]
    },
    {
      title: '{没|méi} + ige + {过|guo}', sub: 'még nem, még soha',
      pattern: '{没|méi}({有|yǒu}) + ige + {过|guo}',
      body: 'Tagadás: {没|méi} + ige + {过|guo} „még nem (soha) …": {我没去过长城|wǒ méi qùguo Chángchéng} „még nem voltam a Nagy Falnál". Fontos: tagadásban a {过|guo} <b>megmarad</b> — szemben a {了|le}-lel, amely tagadásban eltűnik ({我没去|wǒ méi qù} „nem mentem el").',
      more: [
        '„Még soha": {从来没|cónglái méi} + ige + {过|guo}: {我从来没吃过|wǒ cónglái méi chīguo} „még soha nem ettem".'
      ],
      examples: [
        { zh: '{我|wǒ}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}。', hu: 'Még nem voltam a Nagy Falnál.' },
        { zh: '{我|wǒ}{从来|cóng·lái}{没|méi}{看|kàn}{过|guo}{熊猫|xióng·māo}。', hu: 'Még soha nem láttam pandát.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{不|bú}{去|qù}{过|guo}。', good: '{我|wǒ}{没|méi}{去|qù}{过|guo}。', why: 'A {过|guo}-t {没|méi} tagadja, nem {不|bù}.' }
      ]
    },
    {
      title: 'ige + {过|guo} + szám + {次|cì}', sub: 'hányszor?',
      pattern: 'ige + {过|guo} + szám + {次|cì} (+ tárgy)',
      body: 'Hogy hányszor történt meg: {我吃过两次|wǒ chīguo liǎng cì} „kétszer ettem már", {你去过几次|nǐ qùguo jǐ cì}？ „Hányszor voltál már?" Főnévi tárgy a {次|cì} után jön: {我去过两次上海|wǒ qùguo liǎng cì Shànghǎi}. Ha viszont a tárgy személy(névmás), az a {次|cì} elé kerül: {我见过他一次|wǒ jiànguo tā yí cì} „egyszer találkoztam vele".',
      more: [
        'A {次|cì} a gyakoriságnál (HSK 2 10. lecke) is szerepelt: {一天三次|yì tiān sān cì}.',
        'A {很多次|hěn duō cì} „sokszor", a {一次也没|yí cì yě méi} … „egyszer sem".'
      ],
      examples: [
        { zh: '{我|wǒ}{吃|chī}{过|guo}{两|liǎng}{次|cì}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', hu: 'Kétszer ettem már pekingi kacsát.' },
        { zh: '{我|wǒ}{见|jiàn}{过|guo}{他|tā}{一|yí}{次|cì}。', hu: 'Egyszer találkoztam vele.' },
        { zh: '{我|wǒ}{去|qù}{过|guo}{很|hěn}{多|duō}{次|cì}{了|le}。', hu: 'Már sokszor voltam ott.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{两|liǎng}{次|cì}{吃|chī}{过|guo}。', good: '{我|wǒ}{吃|chī}{过|guo}{两|liǎng}{次|cì}。', why: 'A szám + {次|cì} az ige után áll.' }
      ]
    },
    {
      title: '{过|guo} vagy {了|le}?', sub: 'tapasztalat vagy megtörtént esemény',
      pattern: 'ige + {过|guo}: valaha · ige + {了|le}: (akkor) megtörtént',
      body: 'Az ige utáni {了|le} egy <b>konkrét</b>, megtörtént cselekvést jelöl („elmentem", „megettem"). A {过|guo} azt, hogy valami <b>az életed során</b> előfordult, és ma már tapasztalatként van meg. {他去了上海|tā qùle Shànghǎi} „elment Sanghajba (lehet, hogy most is ott van)" — {他去过上海|tā qùguo Shànghǎi} „járt már Sanghajban (de már nincs ott)".',
      tables: [
        { caption: 'A kettő összevetve',
          head: ['', 'Jelentés', 'Tagadás'],
          rows: [
            ['{去|qù}{了|le}', 'elment (akkor, ott)', '{没|méi}{去|qù}'],
            ['{去|qù}{过|guo}', 'járt már ott (valaha)', '{没|méi}{去|qù}{过|guo}']
          ] }
      ],
      examples: [
        { zh: '{他|tā}{去|qù}{了|le}{上海|Shàng·hǎi}。', hu: 'Elment Sanghajba.' },
        { zh: '{他|tā}{去|qù}{过|guo}{上海|Shàng·hǎi}。', hu: 'Járt már Sanghajban.' }
      ]
    },
    {
      title: '{还没|hái méi} … {呢|ne}', sub: 'még nem — de majd igen',
      pattern: 'A + {还没|hái méi} + ige (+ {过|guo}) + {呢|ne}',
      body: 'A „még nem (de várhatóan majd megtörténik)" kifejezése: {我还没吃饭呢|wǒ hái méi chī fàn ne} „még nem ettem", {我还没去过长城呢|wǒ hái méi qùguo Chángchéng ne} „még nem jártam a Nagy Falnál". Ez az {已经|yǐjīng} … {了|le} „már" (HSK 2 4. lecke) tagadó párja.',
      more: [
        'Rövid válaszként: {吃饭了吗|chī fàn le ma}？ — {还没呢|hái méi ne}. „Ettél már? — Még nem."'
      ],
      tables: [
        { caption: 'Már — még nem',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{我|wǒ}{已经|yǐ·jīng}{吃|chī}{饭|fàn}{了|le}。', 'Már ettem.'],
            ['{我|wǒ}{还|hái}{没|méi}{吃|chī}{饭|fàn}{呢|ne}。', 'Még nem ettem.']
          ] }
      ],
      examples: [
        { zh: '{我|wǒ}{还|hái}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}{呢|ne}。', hu: 'Még nem jártam a Nagy Falnál.' },
        { zh: '{作业|zuò·yè}{你|nǐ}{做|zuò}{完|wán}{了|le}{吗|ma}？——{还|hái}{没|méi}{呢|ne}。', hu: 'Megcsináltad a leckét? — Még nem.' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{还|hái}{没|méi}{吃|chī}{饭|fàn}{了|le}。', good: '{我|wǒ}{还|hái}{没|méi}{吃|chī}{饭|fàn}{呢|ne}。', why: 'A {还没|hái méi} mellé {呢|ne} illik, {了|le} nem.' }
      ]
    }
  ],
  phrases: [
    { zh: '{你|nǐ}{去|qù}{过|guo}{吗|ma}？', hu: 'Voltál már ott?' },
    { zh: '{没|méi}{去|qù}{过|guo}。', hu: 'Még nem voltam.' },
    { zh: '{还|hái}{没|méi}{呢|ne}。', hu: 'Még nem.' },
    { zh: '{真|zhēn}{的|de}？', hu: 'Tényleg?' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{过|guo}', pinyin: 'guo', hu: 'tapasztalat jele (ige után)' },
        { zh: '{烤鸭|kǎo·yā}', pinyin: 'kǎoyā', hu: 'sült kacsa' },
        { zh: '{长城|Cháng·chéng}', pinyin: 'Chángchéng', hu: 'a Nagy Fal' },
        { zh: '{从来|cóng·lái}', pinyin: 'cónglái', hu: 'mindig (tagadva: soha)' },
        { zh: '{爬|pá}', pinyin: 'pá', hu: 'mászni' },
        { zh: '{句|jù}', pinyin: 'jù', hu: 'mondat (mérőszó)' },
        { zh: '{话|huà}', pinyin: 'huà', hu: 'beszéd, szavak' },
        { zh: '{见|jiàn}', pinyin: 'jiàn', hu: 'lát, találkozik' },
        { zh: '{真的|zhēn·de}', pinyin: 'zhēnde', hu: 'tényleg, igazán' },
        { zh: '{熊猫|xióng·māo}', pinyin: 'xióngmāo', hu: 'panda' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{好汉|hǎo·hàn}', pinyin: 'hǎohàn', hu: 'derék legény, hős' },
        { zh: '{春天|chūn·tiān}', pinyin: 'chūntiān', hu: 'tavasz' },
        { zh: '{机会|jī·huì}', pinyin: 'jīhuì', hu: 'alkalom, lehetőség' }
      ] }
  ],
  culture: [
    { title: 'A Nagy Fal', text: 'A {长城|Chángchéng} több ezer kilométer hosszan kanyarog hegyeken át. Pekinghez legközelebb a Badaling-szakasz van — ez a legzsúfoltabb —, a Mutianyu-szakasz csendesebb és szebb. A falra kínaiul „felmászni" szokás: {爬长城|pá Chángchéng}. Az a hiedelem, hogy az űrből szabad szemmel is látszik, csak mítosz.' },
    { title: 'A pekingi kacsa', text: 'A {北京烤鸭|Běijīng kǎoyā} ropogós bőrű, kemencében sült kacsa. A szakács az asztalnál szeleteli fel; vékony palacsintába tekerve eszik, édes szójaszósszal, újhagymával és uborkával. A hagyomány szerint a kacsa többi részéből levest főznek, így semmi nem vész kárba.' }
  ],
  reading: {
    title: '{我|wǒ}{去|qù}{过|guo}{的|de}{地方|dì·fang}', titleHu: 'Ahol már jártam',
    text: [
      { zh: '{我|wǒ}{来|lái}{中国|Zhōng·guó}{一|yì}{年|nián}{了|le}，{去|qù}{过|guo}{上海|Shàng·hǎi}{和|hé}{西安|Xī\'ān}。', hu: 'Egy éve vagyok Kínában, jártam már Sanghajban és Hszianban.' },
      { zh: '{北京|Běi·jīng}{烤鸭|kǎo·yā}{我|wǒ}{吃|chī}{过|guo}{两|liǎng}{次|cì}，{很|hěn}{好吃|hǎo·chī}。', hu: 'Pekingi kacsát kétszer ettem már, nagyon finom.' },
      { zh: '{但是|dàn·shì}{我|wǒ}{还|hái}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}{呢|ne}，{也|yě}{没|méi}{看|kàn}{过|guo}{熊猫|xióng·māo}。', hu: 'De a Nagy Falnál még nem jártam, és pandát sem láttam még.', par: true },
      { zh: '{这|zhè}{个|ge}{星期六|xīng·qī·liù}{王明|Wáng Míng}{带|dài}{我|wǒ}{去|qù}{爬|pá}{长城|Cháng·chéng}，{他|tā}{已经|yǐ·jīng}{去|qù}{过|guo}{很|hěn}{多|duō}{次|cì}{了|le}。', hu: 'Ezen a szombaton Wang Ming elvisz a Nagy Falra, ő már sokszor járt ott.' },
      { zh: '{明年|míng·nián}{春天|chūn·tiān}{我|wǒ}{想|xiǎng}{去|qù}{成都|Chéng·dū}{看|kàn}{熊猫|xióng·māo}！', hu: 'Jövő tavasszal Csengtuba szeretnék menni pandát nézni!', par: true }
    ],
    words: [ { zh: '{成都|Chéng·dū}', hu: 'Csengtu (város)' } ],
    questions: [
      { q: 'Mely városokban járt már David?', a: 'Sanghajban és Hszianban', wrong: ['Csengtuban és Sanghajban', 'csak Pekingben', 'Hszianban és Csengtuban'], why: '{去过上海和西安|qùguo Shànghǎi hé Xī\'ān}.' },
      { q: 'Hányszor evett pekingi kacsát?', a: 'kétszer', wrong: ['egyszer sem', 'egyszer', 'sokszor'], why: '{我吃过两次|wǒ chīguo liǎng cì}.' },
      { q: 'Mit nem látott még a Nagy Falon kívül?', a: 'pandát', wrong: ['tigrist', 'pekingi operát', 'tengert'], why: '{也没看过熊猫|yě méi kànguo xióngmāo}.' },
      { q: 'Hová szeretne menni jövő tavasszal?', a: 'Csengtuba, pandát nézni', wrong: ['Sanghajba, dolgozni', 'Hszianba, kacsát enni', 'haza, Amerikába'], why: '{我想去成都看熊猫|wǒ xiǎng qù Chéngdū kàn xióngmāo}.' }
    ]
  },
  quiz: [
    { q: '„Ettem már pekingi kacsát."', a: '{我|wǒ}{吃|chī}{过|guo}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', wrong: ['{我|wǒ}{过|guo}{吃|chī}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', '{我|wǒ}{吃|chī}{北京|Běi·jīng}{烤鸭|kǎo·yā}{过|guo}{了|le}{吗|ma}。', '{北京|Běi·jīng}{烤鸭|kǎo·yā}{过|guo}{我|wǒ}{吃|chī}。'], why: 'Ige + {过|guo} + tárgy.', point: 1 },
    { q: '„Voltál már Sanghajban?"', a: '{你|nǐ}{去|qù}{过|guo}{上海|Shàng·hǎi}{吗|ma}？', wrong: ['{你|nǐ}{过|guo}{去|qù}{上海|Shàng·hǎi}{吗|ma}？', '{你|nǐ}{去|qù}{上海|Shàng·hǎi}{过|guo}{呢|ne}？', '{上海|Shàng·hǎi}{你|nǐ}{过|guo}{吗|ma}{去|qù}？'], why: 'Ige + {过|guo} + hely + {吗|ma}.', point: 1 },
    { q: 'Mit fejez ki a {过|guo}?', a: 'tapasztalatot: valaha megtörtént', wrong: ['folyamatot: épp most történik', 'jövőt: majd megtörténik', 'tiltást: ne történjen meg'], why: '{我去过|wǒ qùguo} „jártam már ott".', point: 1 },
    { q: 'Mit jelent: {这句话你听过吗|zhè jù huà nǐ tīngguo ma}？', a: 'Hallottad már ezt a mondást?', wrong: ['Meghallgatod ezt a mondatot?', 'Érted ezt a mondatot?', 'Ki mondta ezt neked?'], why: '{听过|tīngguo} „hallott már".', point: 1 },
    { q: '„Még nem voltam a Nagy Falnál."', a: '{我|wǒ}{没|méi}{去|qù}{过|guo}{长城|Cháng·chéng}。', wrong: ['{我|wǒ}{不|bú}{去|qù}{过|guo}{长城|Cháng·chéng}。', '{我|wǒ}{没|méi}{去|qù}{长城|Cháng·chéng}{过|guo}。', '{我|wǒ}{去|qù}{没|méi}{过|guo}{长城|Cháng·chéng}。'], why: '{没|méi} + ige + {过|guo}.', point: 2 },
    { q: 'Mi marad meg tagadásban?', a: 'a {过|guo} (a {了|le} viszont eltűnik)', wrong: ['a {了|le} (a {过|guo} viszont eltűnik)', 'mindkettő megmarad', 'egyik sem marad meg'], why: '{没去过|méi qùguo} — de {没去|méi qù}.', point: 2 },
    { q: 'Mit jelent: {我从来没吃过|wǒ cónglái méi chīguo}。', a: 'Még soha nem ettem.', wrong: ['Mindig ezt eszem.', 'Már ettem belőle.', 'Nem akarok enni.'], why: '{从来没|cónglái méi} … {过|guo} „még soha".', point: 2 },
    { q: '„Kétszer ettem már."', a: '{我|wǒ}{吃|chī}{过|guo}{两|liǎng}{次|cì}。', wrong: ['{我|wǒ}{两|liǎng}{次|cì}{吃|chī}{过|guo}。', '{我|wǒ}{吃|chī}{两|liǎng}{过|guo}{次|cì}。', '{我|wǒ}{过|guo}{吃|chī}{两|liǎng}{次|cì}。'], why: 'Ige + {过|guo} + szám + {次|cì}.', point: 3 },
    { q: '„Hányszor voltál már ott?"', a: '{你|nǐ}{去|qù}{过|guo}{几|jǐ}{次|cì}？', wrong: ['{你|nǐ}{几|jǐ}{次|cì}{去|qù}{过|guo}？', '{你|nǐ}{去|qù}{几|jǐ}{过|guo}{次|cì}？', '{你|nǐ}{过|guo}{去|qù}{几|jǐ}{次|cì}？'], why: 'Ige + {过|guo} + {几次|jǐ cì}.', point: 3 },
    { q: '„Egyszer találkoztam vele."', a: '{我|wǒ}{见|jiàn}{过|guo}{他|tā}{一|yí}{次|cì}。', wrong: ['{我|wǒ}{见|jiàn}{过|guo}{一|yí}{次|cì}{他|tā}。', '{我|wǒ}{一|yí}{次|cì}{见|jiàn}{他|tā}{过|guo}。', '{我|wǒ}{见|jiàn}{他|tā}{过|guo}{一|yí}{次|cì}。'], why: 'A személyes névmás a {次|cì} elé kerül.', point: 3 },
    { q: 'Mi a különbség? {他去了上海|tā qùle Shànghǎi} · {他去过上海|tā qùguo Shànghǎi}', a: 'elment Sanghajba · járt már Sanghajban', wrong: ['járt már Sanghajban · elment Sanghajba', 'Sanghajba megy · Sanghajba ment', 'nincs köztük semmi különbség'], why: '{了|le}: konkrét esemény · {过|guo}: tapasztalat.', point: 4 },
    { q: '„Még nem ettem."', a: '{我|wǒ}{还|hái}{没|méi}{吃|chī}{饭|fàn}{呢|ne}。', wrong: ['{我|wǒ}{还|hái}{不|bù}{吃|chī}{饭|fàn}{了|le}。', '{我|wǒ}{已经|yǐ·jīng}{没|méi}{吃|chī}{饭|fàn}{了|le}。', '{我|wǒ}{没|méi}{还|hái}{吃|chī}{饭|fàn}{呢|ne}。'], why: '{还没|hái méi} + ige + {呢|ne}.', point: 5 },
    { q: '{你吃饭了吗|nǐ chī fàn le ma}？ — „Még nem."', a: '{还|hái}{没|méi}{呢|ne}。', wrong: ['{已经|yǐ·jīng}{了|le}。', '{不|bù}{吃|chī}{了|le}。', '{没|méi}{过|guo}{呢|ne}。'], why: 'Rövid válasz: {还没呢|hái méi ne}.', point: 5 },
    { q: 'Mi az {已经|yǐjīng} … {了|le} „már" tagadó párja?', a: '{还没|hái méi} … {呢|ne} „még nem"', wrong: ['{不|bù} … {了|le} „már nem"', '{别|bié} … {了|le} „ne már"', '{没|méi} … {过|guo} „soha"'], why: '{已经吃了|yǐjīng chī le} ↔ {还没吃呢|hái méi chī ne}.', point: 5 },
    { q: 'Mit jelent a {爬|pá}?', a: 'mászni, felmászni', wrong: ['repülni', 'úszni', 'futni'], why: '{爬长城|pá Chángchéng} „felmászik a Nagy Falra".' },
    { q: 'Mit jelent: {这次我带你去|zhè cì wǒ dài nǐ qù}！', a: 'Most én viszlek el!', wrong: ['Most te viszel el engem!', 'Most nem mehetünk.', 'Legközelebb majd elviszlek.'], why: '{这次|zhè cì} „ezúttal", {带|dài} „magával visz".', point: 3 }
  ]
},

/* ════════════════════════════════════════════════════
   HSK 2 · 15. LECKE — (快 / 就)要…了, 都…了, 祝, 送, ünnepek
   ════════════════════════════════════════════════════ */
{
  id: 'l30', no: 30, badge: '15', kicker: 'HSK 2 · 15. lecke', label: 'HSK 2 · 15. lecke',
  title: 'Boldog új évet! — búcsú és jókívánságok',
  lead: 'Jelzed, hogy valami hamarosan bekövetkezik (新年快要到了, 我明天就要走了), meglepődve mondod, hogy már mennyi idő telt el (都一年了), jókívánságot mondasz (祝你新年快乐), és ajándékot adsz (送你一盒茶).',
  cando: [
    'Közeli jövőt fejezel ki: 要…了, 快要…了, 就要…了.',
    'Nyomatékosan mondod, hogy „már": 都…了.',
    'Jókívánságot mondasz: 祝你 + kívánság.',
    'Ajándékot adsz (送 + személy + dolog), és megnevezed a fő ünnepeket.'
  ],
  intro: [
    'A HSK 2 utolsó leckéje: december vége van, Anna hazautazik Budapestre az ünnepekre. Wang Ming és Liu Fang elbúcsúznak tőle, ajándékot adnak, jó utat és boldog új évet kívánnak.',
    'Megtanulod, hogyan mondod, hogy valami <b>mindjárt</b> bekövetkezik ({快要|kuài yào} … {了|le}), és hogyan fogalmazol meg jókívánságokat. Gratulálunk: ezzel a leckével a HSK 2 teljes nyelvtanát végigvetted!'
  ],
  dialogue: {
    title: 'Búcsú',
    scene: 'December vége. Holnap kezdődik a téli szünet, Anna hazautazik Budapestre. Wang Ming és Liu Fang elbúcsúznak tőle.',
    lines: [
      { who: 'Wang Ming', zh: '{安娜|Ān·nà}，{新年|xīn·nián}{快要|kuài yào}{到|dào}{了|le}，{你|nǐ}{回|huí}{国|guó}{吗|ma}？', hu: 'Anna, mindjárt itt az újév — hazautazol?' },
      { who: 'Anna', zh: '{对|duì}，{我|wǒ}{明天|míng·tiān}{就|jiù}{要|yào}{走|zǒu}{了|le}。{飞机|fēi·jī}{是|shì}{早上|zǎo·shang}{八|bā}{点|diǎn}{的|de}。', hu: 'Igen, holnap már indulok. Reggel nyolckor megy a gépem.' },
      { who: 'Liu Fang', zh: '{时间|shí·jiān}{过|guò}{得|de}{真|zhēn}{快|kuài}！{你|nǐ}{来|lái}{中国|Zhōng·guó}{都|dōu}{一|yì}{年|nián}{了|le}。', hu: 'Milyen gyorsan repül az idő! Már egy éve vagy Kínában.' },
      { who: 'Wang Ming', zh: '{这|zhè}{是|shì}{我们|wǒ·men}{送|sòng}{你|nǐ}{的|de}{新年|xīn·nián}{礼物|lǐ·wù}，{一|yì}{盒|hé}{中国|Zhōng·guó}{茶|chá}。', hu: 'Ez az újévi ajándékunk neked: egy doboz kínai tea.' },
      { who: 'Anna', zh: '{太|tài}{谢谢|xiè·xie}{你们|nǐ·men}{了|le}！{我|wǒ}{妈妈|mā·ma}{最|zuì}{喜欢|xǐ·huan}{喝|hē}{茶|chá}。', hu: 'Nagyon szépen köszönöm! Anyukám imádja a teát.' },
      { who: 'Liu Fang', zh: '{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}，{一路|yí·lù}{平安|píng\'ān}！', hu: 'Boldog új évet, és jó utat!' },
      { who: 'Anna', zh: '{也|yě}{祝|zhù}{你们|nǐ·men}{新年|xīn·nián}{快乐|kuài·lè}！{二月|èr·yuè}{我|wǒ}{就|jiù}{回|huí}{来|lai}，{到|dào}{时候|shí·hou}{见|jiàn}！', hu: 'Nektek is boldog új évet! Februárban visszajövök, akkor találkozunk!' }
    ],
    notes: [
      'A {回国|huí guó} „hazautazik (a saját országába)"; a {盒|hé} „doboz".',
      'Az {一路平安|yílù píng\'ān} „jó utat" (szó szerint „az egész út legyen békés").',
      'A {到时候|dào shíhou} „akkor (majd, ha eljön az ideje)".'
    ]
  },
  points: [
    {
      title: '({快|kuài} / {就|jiù}) {要|yào} … {了|le}', sub: 'mindjárt, hamarosan',
      pattern: '({快|kuài} / {就|jiù}) + {要|yào} + ige + {了|le}',
      body: 'Ha valami <b>hamarosan</b> bekövetkezik, az ige elé {要|yào}, a mondat végére {了|le} kerül: {要下雨了|yào xià yǔ le} „mindjárt esni fog". A {快要|kuài yào} még közelebbit jelez: {新年快要到了|xīnnián kuài yào dào le} „mindjárt itt az újév". A {就要|jiù yào} mellé konkrét időpont is állhat: {我明天就要走了|wǒ míngtiān jiù yào zǒu le} „holnap már indulok".',
      more: [
        '🔴 A {快要|kuài yào} … {了|le} mellé nem kerülhet időpont: *{明天快要走了|míngtiān kuài yào zǒu le} helytelen — időponttal {就要|jiù yào} kell.',
        'Elég a {快|kuài} … {了|le} is: {快到了|kuài dào le} „mindjárt odaérünk".'
      ],
      tables: [
        { caption: 'Közeli jövő',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{要|yào}{下|xià}{雨|yǔ}{了|le}。', 'Mindjárt esni fog.'],
            ['{新年|xīn·nián}{快要|kuài yào}{到|dào}{了|le}。', 'Mindjárt itt az újév.'],
            ['{我|wǒ}{明天|míng·tiān}{就要|jiù yào}{走|zǒu}{了|le}。', 'Holnap már indulok.']
          ] }
      ],
      examples: [
        { zh: '{新年|xīn·nián}{快要|kuài yào}{到|dào}{了|le}。', hu: 'Mindjárt itt az újév.' },
        { zh: '{我|wǒ}{明天|míng·tiān}{就|jiù}{要|yào}{走|zǒu}{了|le}。', hu: 'Holnap már indulok.' },
        { zh: '{快|kuài}{到|dào}{了|le}，{你|nǐ}{准备|zhǔn·bèi}{一下|yí·xià}。', hu: 'Mindjárt ott vagyunk, készülj.' }
      ],
      mistakes: [
        { bad: '{明天|míng·tiān}{快要|kuài yào}{走|zǒu}{了|le}。', good: '{明天|míng·tiān}{就要|jiù yào}{走|zǒu}{了|le}。', why: 'Időponttal {就要|jiù yào} kell, nem {快要|kuài yào}.' }
      ]
    },
    {
      title: '{都|dōu} … {了|le}', sub: '„már!" — nyomatékkal',
      pattern: '{都|dōu} + idő / mennyiség + {了|le}',
      body: 'A {都|dōu} itt nem „mind", hanem „<b>már</b>" — meglepődést, nyomatékot fejez ki: {你来中国都一年了|nǐ lái Zhōngguó dōu yì nián le} „már egy éve vagy Kínában!", {都十二点了|dōu shí\'èr diǎn le} „már éjfél van!", {都八点了，快起床|dōu bā diǎn le, kuài qǐ chuáng} „már nyolc óra, kelj fel!"',
      more: [
        'Az {已经|yǐjīng} … {了|le} semleges „már"; a {都|dōu} … {了|le} érzelmesebb: „már ennyi!"',
        'A {时间过得真快|shíjiān guò de zhēn kuài} „milyen gyorsan repül az idő" (szó szerint „az idő nagyon gyorsan telik") — a {过|guò} itt ige.'
      ],
      examples: [
        { zh: '{你|nǐ}{来|lái}{中国|Zhōng·guó}{都|dōu}{一|yì}{年|nián}{了|le}。', hu: 'Már egy éve vagy Kínában!' },
        { zh: '{都|dōu}{十二|shí·èr}{点|diǎn}{了|le}，{快|kuài}{睡|shuì}{觉|jiào}{吧|ba}！', hu: 'Már éjfél van, aludj már!' }
      ]
    },
    {
      title: '{祝|zhù} + jókívánság', sub: 'boldog új évet, jó utat',
      pattern: '{祝|zhù} + (személy +) jókívánság',
      body: 'A {祝|zhù} „kíván" után a személy, aztán a jókívánság áll: {祝你新年快乐|zhù nǐ xīnnián kuàilè} „boldog új évet (kívánok)", {祝你生日快乐|zhù nǐ shēngrì kuàilè} „boldog születésnapot", {祝你一路平安|zhù nǐ yílù píng\'ān} „jó utat". A {快乐|kuàilè} „boldog, vidám" az ünnepi jókívánságok szokásos szava. Válasz: {也祝你|yě zhù nǐ} … „neked is …".',
      tables: [
        { caption: 'Jókívánságok',
          head: ['Kínaiul', 'Magyarul'],
          rows: [
            ['{新年|xīn·nián}{快乐|kuài·lè}', 'boldog új évet'],
            ['{生日|shēng·rì}{快乐|kuài·lè}', 'boldog születésnapot'],
            ['{一路|yí·lù}{平安|píng\'ān}', 'jó utat'],
            ['{身体|shēn·tǐ}{健康|jiàn·kāng}', 'jó egészséget'],
            ['{工作|gōng·zuò}{顺利|shùn·lì}', 'sikeres munkát']
          ] }
      ],
      examples: [
        { zh: '{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}！', hu: 'Boldog új évet!' },
        { zh: '{也|yě}{祝|zhù}{你们|nǐ·men}{新年|xīn·nián}{快乐|kuài·lè}！', hu: 'Nektek is boldog új évet!' }
      ],
      mistakes: [
        { bad: '{我|wǒ}{祝|zhù}{新年|xīn·nián}{你|nǐ}{快乐|kuài·lè}。', good: '{我|wǒ}{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}。', why: 'A {祝|zhù} után előbb a személy jön.' }
      ]
    },
    {
      title: '{送|sòng}', sub: 'ajándékoz; elkísér',
      pattern: '{送|sòng} + személy + dolog · {送|sòng}{给|gěi} + személy',
      body: 'A {送|sòng} „ajándékoz" két tárgyas ige (HSK 2 4. lecke): {我们送你一盒茶|wǒmen sòng nǐ yì hé chá} „egy doboz teát ajándékozunk neked". Jelzőként: {这是我们送你的礼物|zhè shì wǒmen sòng nǐ de lǐwù} „ez a mi ajándékunk neked". Ha a dolog már ismert, gyakori a {送给|sònggěi} + személy: {我想送给妈妈|wǒ xiǎng sònggěi māma} „anyának szeretném adni (ezt)".',
      more: [
        'A {送|sòng} másik jelentése „elkísér": {我送你去机场|wǒ sòng nǐ qù jīchǎng} „kikísérlek a reptérre".'
      ],
      examples: [
        { zh: '{这|zhè}{是|shì}{我们|wǒ·men}{送|sòng}{你|nǐ}{的|de}{新年|xīn·nián}{礼物|lǐ·wù}。', hu: 'Ez az újévi ajándékunk neked.' },
        { zh: '{明天|míng·tiān}{我|wǒ}{送|sòng}{你|nǐ}{去|qù}{机场|jī·chǎng}。', hu: 'Holnap kikísérlek a reptérre.' }
      ]
    },
    {
      title: 'Ünnepek: …{节|jié}', sub: 'tavaszünnep, holdünnep, nemzeti ünnep',
      pattern: 'név + {节|jié} · ünnep + {快|kuài}({要|yào}) + {到|dào} + {了|le}',
      body: 'Az ünnepnevek gyakori utótagja a {节|jié} „ünnep": {春节|Chūnjié} „tavaszünnep (kínai újév)", {中秋节|Zhōngqiūjié} „holdünnep", {国庆节|Guóqìngjié} „nemzeti ünnep (október 1.)". A {新年|xīnnián} „újév" a január elsejét jelenti. Az ünnep közeledtét a lecke szerkezetével mondod: {春节快到了|Chūnjié kuài dào le} „közeleg a tavaszünnep". Az ünneplés igéje a {过|guò}: {过春节|guò Chūnjié} „megüli a tavaszünnepet".',
      tables: [
        { caption: 'Fő ünnepek',
          head: ['Kínaiul', 'Magyarul', 'Mikor?'],
          rows: [
            ['{新年|xīn·nián}', 'újév', 'január 1.'],
            ['{春节|Chūn·jié}', 'tavaszünnep', 'január–február (holdnaptár)'],
            ['{中秋节|Zhōng·qiū·jié}', 'holdünnep', 'szeptember–október'],
            ['{国庆节|Guó·qìng·jié}', 'nemzeti ünnep', 'október 1.']
          ] }
      ],
      examples: [
        { zh: '{春节|Chūn·jié}{快|kuài}{到|dào}{了|le}，{我|wǒ}{要|yào}{回|huí}{家|jiā}。', hu: 'Közeleg a tavaszünnep, hazamegyek.' },
        { zh: '{你|nǐ}{在|zài}{中国|Zhōng·guó}{过|guò}{过|guo}{春节|Chūn·jié}{吗|ma}？', hu: 'Ünnepelted már a tavaszünnepet Kínában?' }
      ]
    }
  ],
  phrases: [
    { zh: '{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}！', hu: 'Boldog új évet!' },
    { zh: '{一路|yí·lù}{平安|píng\'ān}！', hu: 'Jó utat!' },
    { zh: '{时间|shí·jiān}{过|guò}{得|de}{真|zhēn}{快|kuài}！', hu: 'Milyen gyorsan repül az idő!' },
    { zh: '{到|dào}{时候|shí·hou}{见|jiàn}！', hu: 'Akkor találkozunk!' }
  ],
  words: [
    { title: 'Szavak',
      items: [
        { zh: '{快要|kuài yào}', pinyin: 'kuài yào', hu: 'mindjárt, hamarosan' },
        { zh: '{祝|zhù}', pinyin: 'zhù', hu: 'kívánni' },
        { zh: '{快乐|kuài·lè}', pinyin: 'kuàilè', hu: 'boldog, vidám' },
        { zh: '{送|sòng}', pinyin: 'sòng', hu: 'ajándékoz; elkísér' },
        { zh: '{礼物|lǐ·wù}', pinyin: 'lǐwù', hu: 'ajándék' },
        { zh: '{新年|xīn·nián}', pinyin: 'xīnnián', hu: 'újév' },
        { zh: '{春节|Chūn·jié}', pinyin: 'Chūnjié', hu: 'tavaszünnep' },
        { zh: '{节|jié}', pinyin: 'jié', hu: 'ünnep' },
        { zh: '{回国|huí guó}', pinyin: 'huí guó', hu: 'hazautazik' },
        { zh: '{盒|hé}', pinyin: 'hé', hu: 'doboz' },
        { zh: '{平安|píng\'ān}', pinyin: 'píng\'ān', hu: 'békés, biztonságos' }
      ] },
    { title: 'Ráadás',
      items: [
        { zh: '{健康|jiàn·kāng}', pinyin: 'jiànkāng', hu: 'egészség, egészséges' },
        { zh: '{顺利|shùn·lì}', pinyin: 'shùnlì', hu: 'zökkenőmentes, sikeres' },
        { zh: '{到时候|dào shí·hou}', pinyin: 'dào shíhou', hu: 'akkor (majd)' },
        { zh: '{中秋节|Zhōng·qiū·jié}', pinyin: 'Zhōngqiūjié', hu: 'holdünnep' }
      ] }
  ],
  culture: [
    { title: 'A tavaszünnep', text: 'A {春节|Chūnjié} Kína legnagyobb ünnepe: a holdnaptár szerinti újév, január vége és február közepe között. A családok összegyűlnek, szilveszterkor közös vacsorát esznek ({年夜饭|niányèfàn}), a gyerekek piros borítékban pénzt kapnak, éjfélkor tűzijáték szól. Az ünnep előtti hetekben százmilliók utaznak haza — ez a világ legnagyobb éves népvándorlása.' },
    { title: 'Ajándékozás illemtana', text: 'Órát ({钟|zhōng}) nem illik ajándékozni: a {送钟|sòng zhōng} „órát ad" úgy hangzik, mint a {送终|sòngzhōng} „utolsó útjára kísér". Párnak nem adnak körtét ({梨|lí}), mert a {离|lí} „elválik" szóra emlékeztet. Az ajándékot a kínaiak gyakran nem bontják ki az ajándékozó előtt, és udvariasságból először el is hárítják.' }
  ],
  reading: {
    title: '{再见|zài·jiàn}，{北京|Běi·jīng}！', titleHu: 'Viszlát, Peking!',
    text: [
      { zh: '{明天|míng·tiān}{我|wǒ}{就|jiù}{要|yào}{回|huí}{国|guó}{了|le}。{我|wǒ}{来|lái}{北京|Běi·jīng}{都|dōu}{一|yì}{年|nián}{了|le}！', hu: 'Holnap már hazautazom. Már egy éve vagyok Pekingben!' },
      { zh: '{这|zhè}{一|yì}{年|nián}，{我|wǒ}{认识|rèn·shi}{了|le}{很|hěn}{多|duō}{朋友|péng·you}，{汉语|Hàn·yǔ}{也|yě}{说|shuō}{得|de}{比|bǐ}{以前|yǐ·qián}{好|hǎo}{多|duō}{了|le}。', hu: 'Ebben az évben sok barátot szereztem, és sokkal jobban beszélek kínaiul, mint korábban.' },
      { zh: '{王明|Wáng Míng}{和|hé}{刘芳|Liú Fāng}{送|sòng}{了|le}{我|wǒ}{一|yì}{盒|hé}{中国|Zhōng·guó}{茶|chá}，{我|wǒ}{想|xiǎng}{送|sòng}{给|gěi}{妈妈|mā·ma}。', hu: 'Wang Ming és Liu Fang egy doboz kínai teát adott nekem, anyukámnak szeretném adni.', par: true },
      { zh: '{春节|Chūn·jié}{快|kuài}{到|dào}{了|le}，{二月|èr·yuè}{我|wǒ}{就|jiù}{回|huí}{来|lai}，{和|hé}{朋友|péng·you}{们|men}{一起|yì·qǐ}{过|guò}{春节|Chūn·jié}。', hu: 'Közeleg a tavaszünnep: februárban visszajövök, és a barátaimmal együtt ünnepelem.' },
      { zh: '{祝|zhù}{我|wǒ}{的|de}{中国|Zhōng·guó}{朋友|péng·you}{们|men}{新年|xīn·nián}{快乐|kuài·lè}！', hu: 'Boldog új évet kívánok a kínai barátaimnak!', par: true }
    ],
    words: [ { zh: '{以前|yǐ·qián}', hu: 'korábban, régen' }, { zh: '{朋友们|péng·you·men}', hu: 'barátok' } ],
    questions: [
      { q: 'Mióta van Anna Pekingben?', a: 'már egy éve', wrong: ['két éve', 'egy hónapja', 'fél éve'], why: '{我来北京都一年了|wǒ lái Běijīng dōu yì nián le}.' },
      { q: 'Mit kapott ajándékba?', a: 'egy doboz kínai teát', wrong: ['egy kínai könyvet', 'egy piros kabátot', 'egy fényképalbumot'], why: '{送了我一盒中国茶|sòngle wǒ yì hé Zhōngguó chá}.' },
      { q: 'Kinek akarja adni az ajándékot?', a: 'az anyukájának', wrong: ['Zhang tanárnőnek', 'Davidnek', 'a húgának'], why: '{我想送给妈妈|wǒ xiǎng sònggěi māma}.' },
      { q: 'Mikor jön vissza?', a: 'februárban, a tavaszünnepre', wrong: ['jövő nyáron, a szünetben', 'csak jövő ősszel', 'jövő decemberben'], why: '{二月我就回来，和朋友们一起过春节|èryuè wǒ jiù huílai, hé péngyoumen yìqǐ guò Chūnjié}.' }
    ]
  },
  quiz: [
    { q: '„Mindjárt esni fog."', a: '{要|yào}{下|xià}{雨|yǔ}{了|le}。', wrong: ['{下|xià}{雨|yǔ}{要|yào}{了|le}。', '{要|yào}{了|le}{下|xià}{雨|yǔ}。', '{下|xià}{要|yào}{雨|yǔ}{了|le}。'], why: '{要|yào} + ige + {了|le}: közeli jövő.', point: 1 },
    { q: '„Mindjárt itt az újév."', a: '{新年|xīn·nián}{快要|kuài yào}{到|dào}{了|le}。', wrong: ['{新年|xīn·nián}{到|dào}{快要|kuài yào}{了|le}。', '{快要|kuài yào}{新年|xīn·nián}{了|le}{到|dào}。', '{新年|xīn·nián}{快要|kuài yào}{到|dào}{吗|ma}。'], why: '{快要|kuài yào} + ige + {了|le}.', point: 1 },
    { q: '„Holnap már indulok." — melyik helyes?', a: '{我|wǒ}{明天|míng·tiān}{就|jiù}{要|yào}{走|zǒu}{了|le}。', wrong: ['{我|wǒ}{明天|míng·tiān}{快要|kuài yào}{走|zǒu}{了|le}。', '{我|wǒ}{就|jiù}{要|yào}{明天|míng·tiān}{走|zǒu}{了|le}。', '{我|wǒ}{明天|míng·tiān}{要|yào}{就|jiù}{走|zǒu}{了|le}。'], why: 'Időponttal {就要|jiù yào} … {了|le}.', point: 1 },
    { q: 'Miért hibás: {明天快要走了|míngtiān kuài yào zǒu le}?', a: 'a {快要|kuài yào} mellé nem állhat időpont', wrong: ['a {了|le} helyett {过|guo} kell', 'a {明天|míngtiān} a mondat végére kerül', 'nem hibás, így helyes'], why: 'Időponttal: {明天就要走了|míngtiān jiù yào zǒu le}.', point: 1 },
    { q: 'Mit jelent: {都十二点了|dōu shí\'èr diǎn le}！', a: 'Már éjfél van!', wrong: ['Mind a tizenkét óra!', 'Tizenkettőkor találkozunk!', 'Még csak tizenkettő van.'], why: '{都|dōu} … {了|le} „már!"', point: 2 },
    { q: 'Mit fejez ki a {都|dōu}: {你来中国都一年了|nǐ lái Zhōngguó dōu yì nián le}?', a: '„már" (nyomatékkal, meglepődve)', wrong: ['„mind, mindenki" (az összes)', '„is, szintén" (más is)', '„még nem" (várható)'], why: 'Itt a {都|dōu} nem „mind", hanem „már".', point: 2 },
    { q: 'Mit jelent: {时间过得真快|shíjiān guò de zhēn kuài}！', a: 'Milyen gyorsan repül az idő!', wrong: ['Nincs elég időm!', 'Siess, késésben vagyunk!', 'Az óra siet!'], why: '{过|guò} „telik" + {得真快|de zhēn kuài}.', point: 2 },
    { q: '„Boldog új évet!"', a: '{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}！', wrong: ['{你|nǐ}{祝|zhù}{新年|xīn·nián}{快乐|kuài·lè}{了|le}！', '{新年|xīn·nián}{祝|zhù}{快乐|kuài·lè}{你|nǐ}！', '{祝|zhù}{新年|xīn·nián}{你|nǐ}{快乐|kuài·lè}{吗|ma}！'], why: '{祝|zhù} + személy + jókívánság.', point: 3 },
    { q: 'Mit jelent: {一路平安|yílù píng\'ān}！', a: 'Jó utat!', wrong: ['Isten hozott!', 'Jó étvágyat!', 'Jó éjszakát!'], why: 'Szó szerint „az egész út legyen békés".', point: 3 },
    { q: 'Mit válaszolsz: {祝你新年快乐|zhù nǐ xīnnián kuàilè}！', a: '{也|yě}{祝|zhù}{你|nǐ}{新年|xīn·nián}{快乐|kuài·lè}！', wrong: ['{不客气|bú kè·qi}，{新年|xīn·nián}{快乐|kuài·lè}{吗|ma}？', '{对不起|duì·bu·qǐ}，{新年|xīn·nián}！', '{新年|xīn·nián}{我|wǒ}{不|bù}{快乐|kuài·lè}。'], why: '{也祝你|yě zhù nǐ} … „neked is …".', point: 3 },
    { q: 'Mit jelent a {快乐|kuàilè}?', a: 'boldog, vidám', wrong: ['gyors, sietős', 'fáradt, álmos', 'gazdag, sikeres'], why: '{新年快乐|xīnnián kuàilè} „boldog új évet".', point: 3 },
    { q: '„Egy doboz teát ajándékozunk neked."', a: '{我们|wǒ·men}{送|sòng}{你|nǐ}{一|yì}{盒|hé}{茶|chá}。', wrong: ['{我们|wǒ·men}{送|sòng}{一|yì}{盒|hé}{茶|chá}{你|nǐ}。', '{我们|wǒ·men}{给|gěi}{你|nǐ}{送|sòng}{了|le}{吗|ma}{茶|chá}。', '{你|nǐ}{我们|wǒ·men}{送|sòng}{一|yì}{盒|hé}{茶|chá}。'], why: '{送|sòng} + személy + dolog.', point: 4 },
    { q: 'Mit jelent: {我送你去机场|wǒ sòng nǐ qù jīchǎng}。', a: 'Kikísérlek a reptérre.', wrong: ['Elküldelek a reptérre.', 'Ajándékot viszek a reptérre.', 'Elviszem a csomagodat.'], why: '{送|sòng} „elkísér".', point: 4 },
    { q: 'Mit jelent: {这是我们送你的礼物|zhè shì wǒmen sòng nǐ de lǐwù}。', a: 'Ez a mi ajándékunk neked.', wrong: ['Ez az ajándék, amit tőled kaptunk.', 'Ezt az ajándékot küldtük el.', 'Ez a te ajándékod nekünk.'], why: '{我们送你的|wǒmen sòng nǐ de} „amit mi adunk neked".', point: 4 },
    { q: 'Mit jelent a {春节|Chūnjié}?', a: 'a tavaszünnep (kínai újév)', wrong: ['a holdünnep (ősszel)', 'a nemzeti ünnep (októberben)', 'január elseje, az újév napja'], why: 'A holdnaptár szerinti újév.', point: 5 },
    { q: 'Mi az ünnepnevek gyakori utótagja?', a: '{节|jié}', wrong: ['{年|nián}', '{天|tiān}', '{月|yuè}'], why: '{春节|Chūnjié}, {中秋节|Zhōngqiūjié}, {国庆节|Guóqìngjié}.', point: 5 }
  ]
}

];
