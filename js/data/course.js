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
    { title: 'Egyszerűsített és hagyományos írás', text: 'Az 1950-es években Kínában sok írásjegyet leegyszerűsítettek: a „ló" hagyományosan 馬, egyszerűsítve 马. A HanziFlow az <b>egyszerűsített</b> írást tanítja, mert ezt használják Kínában és a HSK-vizsgán. A hagyományos írás Tajvanon és Hongkongban él tovább.' }
  ],
  quiz: [
    { q: 'Melyik három részből áll egy kínai szótag?', a: 'kezdőhang, véghang és tónus', wrong: ['magánhangzó, mássalhangzó, hangsúly', 'írásjegy, pinyin és jelentés', 'gyök, toldalék és tónus'], why: 'Például {妈|mā}: <i>m</i> (kezdőhang) + <i>a</i> (véghang) + 1. tónus.', point: 1 },
    { q: 'Mi a pinyin?', a: 'a kínai kiejtés hivatalos latin betűs átírása', wrong: ['a kínai írásjegyek egyszerűsített formája', 'egy kínai nyelvjárás', 'a tónusok neve'], why: 'A pinyin a szótárakban, a tankönyvekben és a telefonos gépelésben is ott van.', point: 1 },
    { q: 'Mi a különbség a pinyin b és p között?', a: 'a p után erős levegőfújás jön, a b után nem', wrong: ['a b zöngés, a p zöngétlen, mint a magyarban', 'a p hosszabb, mint a b', 'nincs különbség, csak az írás más'], why: 'A kínai b olyan, mint a magyar p; a kínai p ehhez képest még egy fuvallatot kap.', point: 2 },
    { q: 'Melyik hanghoz hasonlít leginkább a pinyin q?', a: 'egy levegős „cs"-hez', wrong: ['a magyar k-hoz', 'a magyar kv-hez', 'a magyar g-hez'], why: '{七|qī} „hét": a nyelv hegye lent van, és erős levegő jön ki.', point: 2 },
    { q: 'Hogyan ejtsd a pinyin x hangot?', a: 'a „sz" és az „s" közötti lágy sziszegésként', wrong: ['„ksz"-ként, mint a magyarban', 'mint a magyar „zs"-t', 'mint a német „ch"-t'], why: '{谢谢|xiè·xie}: lágy, a nyelv hegye az alsó fogaknál.', point: 2 },
    { q: 'Melyik hangpár között NEM a levegőfújás a különbség?', a: 's – sh', wrong: ['d – t', 'z – c', 'g – k'], why: 'Az <i>s</i> és az <i>sh</i> a nyelv helyzetében különbözik (az <i>sh</i>-nál a nyelv hegye hátrahajlik).', point: 2 },
    { q: 'Hogyan hangzik a pinyin ian (pl. {天|tiān})?', a: '„jen"', wrong: ['„ján"', '„ion"', '„ien" két szótagban'], why: 'Az <i>i</i> és az <i>n</i> között az <i>a</i> „e"-vé zárul.', point: 3 },
    { q: 'Mit jelöl a j, q, x után írt u (pl. qu, xue)?', a: 'valójában ü-t', wrong: ['valódi u-t', 'hosszú ú-t', 'semleges tónust'], why: 'A <i>j, q, x</i> után sosem állhat <i>u</i>, ezért az ü pontjait elhagyják: <i>qu</i> = „csü".', point: 3 },
    { q: 'Milyen a 4. tónus dallama?', a: 'fentről határozottan leeső', wrong: ['magas, egyenletes', 'középről emelkedő', 'mélyre lebukó'], why: '{四|sì} „négy", {是|shì} „lenni": kurta, eső dallam.', point: 4 },
    { q: 'Melyik a 3. tónus jele?', a: 'ǎ', wrong: ['ā', 'á', 'à'], why: 'A 3. tónus jele egy kis „pipa" (ˇ): {马|mǎ} „ló".', point: 4 },
    { q: '{马|mǎ} — mit jelent?', a: 'ló', wrong: ['anya', 'kender', 'szidni'], why: '{妈|mā} anya · {麻|má} kender · {马|mǎ} ló · {骂|mà} szidni.', point: 4 },
    { q: 'Melyik magánhangzó kapja a tónusjelet a hǎo szótagban?', a: 'az a', wrong: ['az o', 'a h', 'mindkét magánhangzó'], why: 'Ha van <i>a</i> a szótagban, mindig az kapja a jelet.', point: 4 },
    { q: 'Mit jelent, ha egy szótagon nincs tónusjel (pl. {妈妈|mā·ma} második fele)?', a: 'semleges tónusú: röviden, hangsúly nélkül ejted', wrong: ['1. tónusú', 'tetszőleges tónussal ejthető', 'nem kell kiejteni'], why: 'A semleges tónus rövid és gyenge: <i>mā-ma</i>.', point: 5 },
    { q: 'Melyik írásmódot tanítja a HanziFlow?', a: 'az egyszerűsítettet, ahogy Kínában írnak', wrong: ['a hagyományosat, ahogy Tajvanon írnak', 'mindkettőt egyszerre', 'csak a pinyint, írásjegyek nélkül'], why: 'Kínában és a HSK-vizsgán az egyszerűsített írás az alap.' },
    { q: 'Hogyan ejtsd az e véghangot (pl. {喝|hē})?', a: 'mint egy széthúzott szájjal ejtett „ö"-t', wrong: ['mint a magyar „e"-t', 'mint a magyar „é"-t', 'mint a magyar „i"-t'], why: 'Az önálló <i>e</i> hátul képzett, ajakkerekítés nélküli hang.', point: 3 },
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
    { q: 'Egy egész osztályt köszöntesz. Mit mondasz?', a: '{你们好|nǐ·men hǎo}！', wrong: ['{您好|nín hǎo}！', '{你好|nǐ hǎo}们！', '{对不起|duì·bu·qǐ}！'], why: 'A {你们|nǐ·men} „ti": több embert köszöntesz vele.', point: 3 },
    { q: 'Mit jelent a {们|men} a {我们|wǒ·men} szóban?', a: 'többes számot: „én" → „mi"', wrong: ['udvariasságot', 'kérdést', 'múlt időt'], why: 'A {们|men} a névmás többes száma: {我|wǒ} → {我们|wǒ·men}.', point: 3 },
    { q: 'Valaki azt mondja: {对不起|duì·bu·qǐ}！ Mit válaszolsz?', a: '{没关系|méi guān·xi}。', wrong: ['{你好|nǐ hǎo}。', '{您好|nín hǎo}。', '{你们|nǐ·men}。'], why: 'A bocsánatkérésre a válasz: {没关系|méi guān·xi} „semmi baj".', point: 4 },
    { q: 'Mit jelent: {对不起|duì·bu·qǐ}?', a: 'Elnézést! Bocsánat!', wrong: ['Köszönöm!', 'Semmi baj.', 'Viszontlátásra!'], why: 'A {对不起|duì·bu·qǐ} bocsánatkérés.', point: 4 },
    { q: 'Hogyan hangzik ténylegesen a {你好|nǐ hǎo}?', a: 'ní hǎo (az első szótag emelkedő)', wrong: ['nǐ hǎo, mindkettő mély', 'nì hào, mindkettő eső', 'nī hāo, mindkettő magas'], why: 'Két 3. tónus egymás után: az első 2. tónusúvá válik.', point: 5 },
    { q: 'Melyik szóban érvényes a „3 + 3 → 2 + 3" szabály?', a: '{很好|hěn hǎo}', wrong: ['{你们|nǐ·men}', '{老师|lǎo·shī}', '{您好|nín hǎo}'], why: 'A {很|hěn} és a {好|hǎo} is 3. tónusú, ezért „hén hǎo".', point: 5 },
    { q: 'Változik-e a pinyin írása a „3 + 3" szabály miatt?', a: 'nem, csak a kiejtés változik', wrong: ['igen, az első szótagra 2. tónusjel kerül', 'igen, mindkét jel eltűnik', 'csak a tankönyvekben'], why: 'A pinyin <i>nǐ hǎo</i> marad; a „ní" csak a kiejtésben van.', point: 5 },
    { q: 'Melyik NEM helyes köszönés?', a: '{您们好|nín·men hǎo}！', wrong: ['{你好|nǐ hǎo}！', '{您好|nín hǎo}！', '{老师好|lǎo·shī hǎo}！'], why: 'A {您|nín}-nek nincs többes száma.', point: 2 },
    { q: 'Mit jelent: {老师好|lǎo·shī hǎo}！', a: 'Jó napot, tanár úr / tanárnő!', wrong: ['A tanár jó.', 'Szia, tanár!', 'Elnézést, tanárnő!'], why: 'Megszólítás + {好|hǎo}: a megszólítottnak szóló köszönés.', point: 1 },
    { q: 'A {你好|nǐ hǎo} szó szerint…', a: '„te jó"', wrong: ['„jó reggelt"', '„hogy vagy?"', '„én jól"'], why: '{你|nǐ} „te" + {好|hǎo} „jó".', point: 1 },
    { q: 'Napszakhoz kötött-e a {你好|nǐ hǎo}?', a: 'nem, reggel, délben és este is használható', wrong: ['igen, csak reggel', 'igen, csak délután', 'csak telefonon használják'], why: 'A {你好|nǐ hǎo} egész nap jó.', point: 1 },
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
    { q: 'Melyik kifejezésben marad bù a 不?', a: '{不好|bù hǎo}', wrong: ['{不是|bú shì}', '{不客气|bú kè·qi}', '{不对|bú duì}'], why: 'A {好|hǎo} 3. tónusú: előtte a {不|bù} nem változik.', point: 3 },
    { q: 'Mi a {不|bù} tónusváltásának szabálya?', a: '4. tónus előtt 2. tónusú lesz', wrong: ['3. tónus előtt 2. tónusú lesz', 'mindig semleges', 'mondat végén 1. tónusú lesz'], why: 'bù + 4. tónus → bú.', point: 3 },
    { q: 'Mit jelent: {再见|zài·jiàn}?', a: 'Viszlát!', wrong: ['Köszönöm!', 'Szia!', 'Szívesen!'], why: 'A {再|zài} „újra", a {见|jiàn} „látni": viszontlátásra.', point: 4 },
    { q: 'Hogyan mondod: „Holnap találkozunk!"?', a: '{明天见|míng·tiān jiàn}！', wrong: ['{再见明天|zài·jiàn míng·tiān}！', '{明天再|míng·tiān zài}！', '{见明天|jiàn míng·tiān}！'], why: 'Időpont + {见|jiàn}: {明天见|míng·tiān jiàn}.', point: 4 },
    { q: 'Melyik szótag semleges tónusú a {谢谢|xiè·xie} szóban?', a: 'a második', wrong: ['az első', 'mindkettő', 'egyik sem'], why: '<i>xiè-xie</i>: a megkettőzött szó második fele semleges.', point: 5 },
    { q: 'Melyik szó áll két egyforma szótagból, semleges második szótaggal?', a: '{爸爸|bà·ba}', wrong: ['{再见|zài·jiàn}', '{老师|lǎo·shī}', '{不是|bú shì}'], why: '{爸爸|bà·ba} „apa": <i>bà-ba</i>.', point: 5 },
    { q: 'Hogyan köszönöd meg udvariasan egy tanárnak?', a: '{谢谢您|xiè·xie nín}！', wrong: ['{谢谢你们|xiè·xie nǐ·men}！', '{您谢谢|nín xiè·xie}！', '{不客气您|bú kè·qi nín}！'], why: 'A köszönet után a megszólított: {谢谢您|xiè·xie nín}.', point: 1 },
    { q: 'Mit mondasz, ha elköszönsz a tanártól?', a: '{老师|lǎo·shī}，{再见|zài·jiàn}！', wrong: ['{老师|lǎo·shī}，{不客气|bú kè·qi}！', '{老师|lǎo·shī}，{对不起|duì·bu·qǐ}！', '{老师|lǎo·shī}，{没关系|méi guān·xi}！'], why: 'Búcsúzáskor: {再见|zài·jiàn}.', point: 4 },
    { q: 'Mit jelent: {不谢|bú xiè}?', a: 'Nincs mit (megköszönni).', wrong: ['Nem köszönöm.', 'Ne haragudj.', 'Nem látom.'], why: 'Rövid válasz a köszönetre, mint a {不客气|bú kè·qi}.', point: 2 },
    { q: 'Miért ejted bú-nak a 不-t a {不客气|bú kè·qi}-ben?', a: 'mert a {客|kè} 4. tónusú', wrong: ['mert a mondat elején áll', 'mert semleges tónusú', 'mert udvarias kifejezés'], why: 'A {客|kè} 4. tónusú, előtte a {不|bù} → bú.', point: 3 },
    { q: 'A {谢谢|xiè·xie} után mit mondasz, ha a köszönet több embernek szól?', a: '{你们|nǐ·men}', wrong: ['{您|nín}', '{您们|nín·men}', '{我们|wǒ·men}'], why: '{谢谢你们|xiè·xie nǐ·men} „köszönöm nektek".', point: 1 },
    { q: 'Mit jelent a {见|jiàn} a {再见|zài·jiàn}-ben?', a: 'látni, találkozni', wrong: ['újra', 'jó', 'holnap'], why: 'A {再|zài} „újra", a {见|jiàn} „látni".', point: 4 }
  ]
}

];
