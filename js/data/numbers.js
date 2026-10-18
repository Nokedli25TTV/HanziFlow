/* ====================================================
   HanziFlow — a „Dátum, idő, pénz" modul adatai (pages/numbers.html)
   ----------------------------------------------------
   Saját szöveg. A számok, időpontok, dátumok és árak kínai alakját az app.js generátora
   állítja elő (initNumbersPage → NUM), itt csak az alapelemek és a magyarázatok állnak.

   digits     0–9 írásjegye és pinyinje
   periods    napszakok: [ettől, eddig (óra), [írásjegy, pinyin] szótagonként, magyar]
   months     a hónapok magyar neve · days  a hét napjai magyarul (0 = vasárnap, mint a Date.getDay())
   tabs       a „Tudnivalók" fülei: { id, title, try (a „Próbáld ki" mező felirata) }
   rules      témánként: [cím, szöveg, [példák]] — a szövegben {汉字|pīn·yīn} jelölés lehet
              példa: ['n', 105] szám · ['t', óra, perc, változat?] időpont · ['d', év|0, hó, nap, hét napja?]
                     ['m', fillér (100 = 1 jüan), változat?] ár · ['raw', jelölés, magyar] kézzel írt példa
   ==================================================== */

const HANZIFLOW_NM = {
  digits: [['零', 'líng'], ['一', 'yī'], ['二', 'èr'], ['三', 'sān'], ['四', 'sì'],
           ['五', 'wǔ'], ['六', 'liù'], ['七', 'qī'], ['八', 'bā'], ['九', 'jiǔ']],

  periods: [
    [0, 4,   [['夜', 'yè'], ['里', 'li']],         'éjjel'],
    [5, 8,   [['早', 'zǎo'], ['上', 'shang']],     'reggel'],
    [9, 11,  [['上', 'shàng'], ['午', 'wǔ']],      'délelőtt'],
    [12, 12, [['中', 'zhōng'], ['午', 'wǔ']],      'délben'],
    [13, 17, [['下', 'xià'], ['午', 'wǔ']],        'délután'],
    [18, 23, [['晚', 'wǎn'], ['上', 'shang']],     'este']
  ],

  months: ['január', 'február', 'március', 'április', 'május', 'június',
           'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
  days: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],

  tabs: [
    { id: 'num',   title: 'Számok', try: 'Írj be egy számot (0–99 999 999)' },
    { id: 'date',  title: 'Dátum',  try: 'Válassz egy napot' },
    { id: 'time',  title: 'Idő',    try: 'Válassz egy időpontot' },
    { id: 'money', title: 'Pénz',   try: 'Írj be egy árat jüanban (pl. 12,50)' }
  ],

  rules: {
    num: [
      ['1-től 99-ig: tízesekből építkezik',
       'A 11 „tíz-egy", a 20 „két-tíz", a 21 „két-tíz-egy". 10 és 19 között a {十|shí} elé nem kerül {一|yī}.',
       [['n', 11], ['n', 20], ['n', 99]]],
      ['百, 千, 万: a kínai tízezrenként számol',
       'Száz {百|bǎi}, ezer {千|qiān}, tízezer {万|wàn}. A 100 000 nem „száz-ezer", hanem „tíz-tízezer": {十万|shí wàn}.',
       [['n', 100], ['n', 1500], ['n', 10000], ['n', 100000]]],
      ['零: ha kimarad egy helyiérték',
       'Ha a szám közepén nulla áll, {零|líng} jelzi; több nulla egymás után is csak egy {零|líng}. A végén álló nullát nem mondjuk ki.',
       [['n', 105], ['n', 1050], ['n', 2006]]],
      ['二 vagy 两?',
       'Számolásban {二|èr}: {一|yī}, {二|èr}, {三|sān}. Mérőszó előtt {两|liǎng}: {两个|liǎng ge}. A {百|bǎi} előtt mindkettő jó ({二百|èr bǎi}, {两百|liǎng bǎi}), a {千|qiān} és a {万|wàn} előtt inkább {两|liǎng}.',
       [['n', 200], ['n', 2000], ['n', 22]]],
      ['Az 一 tónusa',
       'Önállóan és a szám végén {一|yī}. A {百|bǎi} és a {千|qiān} előtt {一|yì}, a {万|wàn} előtt {一|yí}.',
       [['n', 111], ['n', 1000], ['n', 10000]]],
      ['Évszám, telefonszám: számjegyenként',
       'Az évszámot, a telefonszámot és a szobaszámot számjegyenként olvassuk: {二〇二六年|èr líng èr liù nián}. A telefonszámban az egyest gyakran {幺|yāo}-nak mondják, hogy ne keveredjen a hetessel.',
       [['raw', '{二|èr}{〇|líng}{二|èr}{六|liù}{年|nián}', '2026'], ['raw', '{我|wǒ}{住|zhù}{三|sān}{〇|líng}{八|bā}。', 'A 308-asban lakom.']]]
    ],
    date: [
      ['Nagyról kicsire: év, hónap, nap',
       'A dátum sorrendje: év → hónap → nap → a hét napja, akárcsak a magyarban.',
       [['d', 2026, 10, 18, true], ['d', 0, 3, 15, false]]],
      ['Az évszám számjegyenként',
       'Az évet nem mennyiségként, hanem számjegyenként mondjuk, utána {年|nián}: {一九九八年|yī jiǔ jiǔ bā nián}. A {两千零二十六年|liǎng qiān líng èr shí liù nián} hibás.',
       [['d', 1998, 0, 0, false], ['d', 2010, 0, 0, false]]],
      ['A hónapok: szám + 月',
       'Január {一月|yī yuè}, február {二月|èr yuè} … december {十二月|shí èr yuè}. Itt {二|èr} áll: a {两个月|liǎng ge yuè} két hónapot jelent (időtartam).',
       [['d', 0, 2, 0, false], ['d', 0, 12, 0, false], ['raw', '{两|liǎng}{个|ge}{月|yuè}', 'két hónap (időtartam)']]],
      ['A nap: 号 vagy 日',
       'Beszédben {号|hào}, írásban {日|rì}: {十月十八号|shí yuè shí bā hào}, írva {十月十八日|shí yuè shí bā rì}.',
       [['d', 0, 10, 18, false], ['raw', '{十|shí}{月|yuè}{十|shí}{八|bā}{日|rì}', 'október 18. (írásban)']]],
      ['A hét napjai: 星期 + szám',
       'Hétfő {星期一|xīng qī yī}, kedd {星期二|xīng qī èr} … szombat {星期六|xīng qī liù}. Vasárnap {星期天|xīng qī tiān} vagy {星期日|xīng qī rì} — {星期七|xīng qī qī} nincs.',
       [['raw', '{星期一|xīng qī yī}', 'hétfő'], ['raw', '{星期天|xīng qī tiān}', 'vasárnap']]],
      ['Hogyan kérdezzük?',
       '{今天几月几号|jīn tiān jǐ yuè jǐ hào}？ (Hányadika van ma?) {今天星期几|jīn tiān xīng qī jǐ}？ (Milyen nap van ma?) A kérdőszó a szám helyére kerül.',
       [['raw', '{今天|jīn·tiān}{几|jǐ}{月|yuè}{几|jǐ}{号|hào}？', 'Hányadika van ma?'], ['raw', '{今天|jīn·tiān}{星期|xīng·qī}{几|jǐ}？', 'Milyen nap van ma?']]]
    ],
    time: [
      ['点 óra, 分 perc',
       'Előbb az óra, aztán a perc: {八点十分|bā diǎn shí fēn} (8:10). Ha a perc egyjegyű, {零|líng} kerül elé: {八点零五分|bā diǎn líng wǔ fēn}.',
       [['t', 8, 10], ['t', 8, 5]]],
      ['A napszak az óra előtt',
       '{早上|zǎo shang} reggel, {上午|shàng wǔ} délelőtt, {中午|zhōng wǔ} délben, {下午|xià wǔ} délután, {晚上|wǎn shang} este. A 15:00 tehát „délután 3": {下午三点|xià wǔ sān diǎn}.',
       [['t', 15, 0], ['t', 20, 0]]],
      ['两点, nem 二点',
       'Két óra: {两点|liǎng diǎn}. A tizenkettő viszont {十二点|shí èr diǎn}, mert ott a {二|èr} egy nagyobb szám vége.',
       [['t', 14, 0], ['t', 12, 0]]],
      ['半: az óra után, és hozzáad',
       '{三点半|sān diǎn bàn} = 3:30. Vigyázz: a magyar „fél négy" kínaiul „három óra fél" — a {半|bàn} a kimondott órához ad hozzá fél órát.',
       [['t', 15, 30], ['t', 9, 30]]],
      ['刻 negyed, 差 hiányzik',
       '{一刻|yí kè} = 15 perc, {三刻|sān kè} = 45 perc: {八点一刻|bā diǎn yí kè} (8:15). A {差|chà} azt mondja meg, mennyi hiányzik: {差五分九点|chà wǔ fēn jiǔ diǎn} (5 perc múlva 9, azaz 8:55).',
       [['t', 8, 15, 'ke'], ['t', 8, 55, 'cha']]],
      ['Az időpont az ige előtt áll',
       'Mint minden időhatározó: {我早上七点起床|wǒ zǎo shang qī diǎn qǐ chuáng}. (Reggel hétkor kelek.) Kérdés: {现在几点|xiàn zài jǐ diǎn}？',
       [['raw', '{我|wǒ}{早上|zǎo·shang}{七|qī}{点|diǎn}{起床|qǐ·chuáng}。', 'Reggel hétkor kelek.'], ['raw', '{现在|xiàn·zài}{几|jǐ}{点|diǎn}？', 'Hány óra van?']]]
    ],
    money: [
      ['块 · 毛 · 分',
       'Beszédben {块|kuài} (jüan), {毛|máo} (tized jüan) és {分|fēn} (század jüan). Írásban és az árcédulán {元|yuán}, {角|jiǎo}, {分|fēn}. 1 {块|kuài} = 10 {毛|máo} = 100 {分|fēn}.',
       [['m', 1250], ['m', 1250, 'written']]],
      ['Az utolsó egység elmaradhat',
       '{三块五|sān kuài wǔ} = 3,50: ha a {毛|máo} az utolsó, gyakran nem mondjuk ki. A kerek összeg után sokszor {钱|qián} áll: {十块钱|shí kuài qián}.',
       [['m', 350, 'short'], ['m', 1000, 'qian']]],
      ['两块, 两毛',
       'A {块|kuài} és a {毛|máo} mérőszóként viselkedik: előttük a kettő {两|liǎng}. A {十二块|shí èr kuài} és a {二十块|èr shí kuài} viszont {二|èr}-vel áll.',
       [['m', 200], ['m', 20], ['m', 1200]]],
      ['零, ha kimarad a 毛',
       'Ha a {毛|máo} helye üres, {零|líng} jelzi: {一块零五分|yí kuài líng wǔ fēn} = 1,05.',
       [['m', 105], ['m', 2008]]],
      ['Hogyan kérdezzük?',
       '{多少钱|duō shao qián}？ (Mennyibe kerül?) {这个多少钱|zhè ge duō shao qián}？ {一共多少钱|yí gòng duō shao qián}？ (Mennyi lesz összesen?)',
       [['raw', '{这|zhè}{个|ge}{多少|duō·shao}{钱|qián}？', 'Ez mennyibe kerül?'], ['raw', '{一共|yí·gòng}{多少|duō·shao}{钱|qián}？', 'Mennyi lesz összesen?']]]
    ]
  }
};
