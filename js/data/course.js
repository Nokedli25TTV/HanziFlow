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
}

];
