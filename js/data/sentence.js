/* ====================================================
   HanziFlow — a Mondat-Mester modul adatai (pages/sentence.html)
   ----------------------------------------------------
   Saját szöveg. A kínai szövegben {汉字|pīn·yīn} jelölés áll (mint a leckékben).

   HANZIFLOW_SM_RULES     szabályok: { id, key, level, title, text, ex: [[jelölés, magyar], …] }
                          key = rövid név a statisztikához; a text-ben lehet jelölés
   HANZIFLOW_SM_FORMULA   a szórend-képlet a lap tetején: [kérdés, jelölés]
   HANZIFLOW_SM_PARTICLES a szócskák: { zh, py, level, family, rule, short }
                          family: q (mondatvégi), de (的 / 得 / 地), asp (了 / 过 / 着)
   HANZIFLOW_SM_BUILD     Sorba rakás: [magyar, [kártyák a helyes sorrendben], írásjel, szabály, szint, [más jó sorrendek]?]
                          a más jó sorrend a kártyák sorszámaiból áll: '1 0 2 3'
   HANZIFLOW_SM_FILL      Szócskák: [mondat ＿ hellyel, szócska, magyar, [más jó szócskák]?, szabály, szint]
                          a „más jó" szócska nyelvtanilag is helyes lenne → nem kerül a rossz válaszok közé
   ==================================================== */

const HANZIFLOW_SM_RULES = [
  /* HSK 1 */
  { id: 'time', key: 'Idő', level: 1, title: 'Az idő az ige előtt áll',
    text: 'A magyarban a „holnap" bárhová kerülhet, a kínaiban az idő az ige elé megy: az alany elé vagy mögé. A mondat végére soha.',
    ex: [['{我|wǒ}{明天|míng·tiān}{去|qù}{北京|Běi·jīng}。', 'Holnap Pekingbe megyek.'], ['{明天|míng·tiān}{我|wǒ}{去|qù}{北京|Běi·jīng}。', 'Holnap Pekingbe megyek.']] },
  { id: 'place', key: 'Hely', level: 1, title: 'A hely (在 + hely) is az ige elé kerül',
    text: 'Ahol a cselekvés történik, az a {在|zài} után az ige elé áll: {我在家看书|wǒ zài jiā kàn shū}. A {我看书在家|wǒ kàn shū zài jiā} hibás.',
    ex: [['{我|wǒ}{妹妹|mèi·mei}{在|zài}{家|jiā}{看|kàn}{电视|diàn·shì}。', 'A húgom otthon tévét néz.']] },
  { id: 'tp', key: 'Idő + hely', level: 1, title: 'Előbb az idő, aztán a hely',
    text: 'Ha mindkettő van: alany + idő + hely + ige. Kérdezd végig magadban: ki? mikor? hol? mit csinál?',
    ex: [['{我|wǒ}{明天|míng·tiān}{下午|xià·wǔ}{在|zài}{图书馆|tú·shū·guǎn}{学习|xué·xí}。', 'Holnap délután a könyvtárban tanulok.']] },
  { id: 'adv', key: 'Határozószó', level: 1, title: '也, 都, 不, 没: közvetlenül az ige előtt',
    text: 'Ezek a szavak az alany után, az ige (vagy a {在|zài}, {跟|gēn}) elé kerülnek. Ha több is van, a sorrend: {也|yě} → {都|dōu} → {不|bù}.',
    ex: [['{我们|wǒ·men}{也|yě}{都|dōu}{是|shì}{学生|xué·sheng}。', 'Mi is mindannyian diákok vagyunk.'], ['{他|tā}{今天|jīn·tiān}{不|bù}{来|lái}。', 'Ő ma nem jön.']] },
  { id: 'manner', key: 'Kivel, mivel', level: 1, title: 'Kivel? Mivel? — ez is az ige előtt',
    text: 'A társ ({和|hé} / {跟|gēn} + valaki + {一起|yì·qǐ}) és az eszköz ({坐|zuò} + jármű) az ige előtt áll: előbb mondod, hogyan, aztán hogy mit csinálsz.',
    ex: [['{我|wǒ}{每天|měi tiān}{坐|zuò}{地铁|dì·tiě}{去|qù}{上班|shàng·bān}。', 'Minden nap metróval járok dolgozni.'], ['{我|wǒ}{和|hé}{朋友|péng·you}{一起|yì·qǐ}{吃饭|chī fàn}。', 'A barátommal együtt eszem.']] },
  { id: 'q', key: 'Kérdés', level: 1, title: 'Kérdés: 吗 a végén, vagy kérdőszó a válasz helyén',
    text: 'Eldöntendő kérdés: a kijelentés végére {吗|ma} kerül. Kérdőszóval ({什么|shén·me}, {哪儿|nǎr}, {几|jǐ}) nem kell {吗|ma}: a kérdőszó oda áll, ahol a válaszban a felelet lesz.',
    ex: [['{你|nǐ}{是|shì}{学生|xué·sheng}{吗|ma}？', 'Diák vagy?'], ['{你|nǐ}{去|qù}{哪儿|nǎr}？— {我|wǒ}{去|qù}{北京|Běi·jīng}。', 'Hová mész? — Pekingbe.']] },
  { id: 'de', key: '的', level: 1, title: '的: a jelző mindig elöl áll',
    text: 'Ami a főnevet leírja, az elé kerül, és {的|de} köti hozzá: {我的书|wǒ de shū} (az én könyvem), {很漂亮的衣服|hěn piào·liang de yī·fu} (nagyon szép ruha). Egész mondat is lehet jelző: {我昨天买的书|wǒ zuó·tiān mǎi de shū} (a könyv, amit tegnap vettem).',
    ex: [['{这|zhè}{是|shì}{我|wǒ}{老师|lǎo·shī}{的|de}{书|shū}。', 'Ez a tanárom könyve.']] },
  { id: 'shide', key: '是…的', level: 1, title: '是 … 的: mikor, hogyan, honnan történt?',
    text: 'Ha már tudjuk, hogy valami megtörtént, és a körülménye érdekel, a körülményt {是|shì} és {的|de} közé fogjuk.',
    ex: [['{我|wǒ}{是|shì}{去年|qù·nián}{来|lái}{中国|Zhōng·guó}{的|de}。', 'Tavaly jöttem Kínába.'], ['{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}{的|de}。', 'Repülővel jöttem.']] },
  { id: 'le', key: '了', level: 1, title: '了: megtörtént, vagy megváltozott',
    text: 'Az ige után: a cselekvés megtörtént ({我买了一本书|wǒ mǎi le yì běn shū}). A mondat végén: új helyzet állt elő ({下雨了|xià yǔ le}, elkezdett esni; {我不去了|wǒ bú qù le}, mégsem megyek).',
    ex: [['{我|wǒ}{昨天|zuó·tiān}{买|mǎi}{了|le}{两|liǎng}{个|ge}{苹果|píng·guǒ}。', 'Tegnap vettem két almát.'], ['{他|tā}{已经|yǐ·jīng}{走|zǒu}{了|le}。', 'Már elment.']] },
  { id: 'ne', key: '呢', level: 1, title: '呢: „és te?", és „éppen most"',
    text: 'Visszakérdezésnél elég a név vagy névmás és {呢|ne}: {我很好|wǒ hěn hǎo}，{你呢|nǐ ne}？ Folyamatban lévő cselekvésnél a mondat végére is kerülhet: {他在看书呢|tā zài kàn shū ne}.',
    ex: [['{我|wǒ}{很|hěn}{好|hǎo}，{你|nǐ}{呢|ne}？', 'Jól vagyok, és te?'], ['{妈妈|mā·ma}{正在|zhèng·zài}{做|zuò}{晚饭|wǎn·fàn}{呢|ne}。', 'Anya éppen vacsorát főz.']] },
  { id: 'ba_', key: '吧', level: 1, title: '吧: javaslat, vagy „ugye"',
    text: 'Javaslatnál: {我们走吧|wǒ·men zǒu ba} (menjünk). Kérdés végén azt jelzi, hogy szinte biztos vagy a válaszban: {你是安娜吧|nǐ shì Ān·nà ba}？ (Ugye te vagy Anna?)',
    ex: [['{我们|wǒ·men}{一起|yì·qǐ}{去|qù}{看|kàn}{电影|diàn·yǐng}{吧|ba}！', 'Menjünk együtt moziba!']] },
  /* HSK 2 */
  { id: 'dur', key: 'Időtartam', level: 2, title: 'Meddig? — az időtartam az ige után',
    text: 'A pontos idő az ige elé kerül, az időtartam viszont mögé: {我学了两年汉语|wǒ xué le liǎng nián Hàn·yǔ}. Ha a tárgy névmás, az időtartam elé áll: {我等了你半个小时|wǒ děng le nǐ bàn ge xiǎo·shí}.',
    ex: [['{我|wǒ}{学|xué}{了|le}{两|liǎng}{年|nián}{汉语|Hàn·yǔ}。', 'Két évig tanultam kínait.']] },
  { id: 'bi', key: '比', level: 2, title: 'Összehasonlítás: A 比 B + melléknév',
    text: 'A melléknév elé ilyenkor nem kerül {很|hěn}. A különbség a melléknév után áll: {一点儿|yì diǎnr} (egy kicsit), {多了|duō le} (sokkal).',
    ex: [['{我|wǒ}{哥哥|gē·ge}{比|bǐ}{我|wǒ}{高|gāo}。', 'A bátyám magasabb nálam.'], ['{今天|jīn·tiān}{比|bǐ}{昨天|zuó·tiān}{冷|lěng}{一点儿|yì diǎnr}。', 'Ma egy kicsit hidegebb van, mint tegnap.']] },
  { id: 'deg', key: '得', level: 2, title: '得: milyen jól, milyen gyorsan?',
    text: 'Ige + {得|de} + értékelés: {他说得很好|tā shuō de hěn hǎo}. Ha tárgy is van, az ige kétszer szerepel: {他说汉语说得很好|tā shuō Hàn·yǔ shuō de hěn hǎo}.',
    ex: [['{她|tā}{唱歌|chàng gē}{唱|chàng}{得|de}{很|hěn}{好听|hǎo·tīng}。', 'Nagyon szépen énekel.']] },
  { id: 'guo', key: '过', level: 2, title: '过: csináltam már valaha',
    text: 'Az ige után álló {过|guo} tapasztalatot jelez. Tagadva: {没|méi} + ige + {过|guo}: {我没去过|wǒ méi qù guo} (még nem jártam ott).',
    ex: [['{我|wǒ}{没|méi}{吃|chī}{过|guo}{北京|Běi·jīng}{烤鸭|kǎo·yā}。', 'Még sosem ettem pekingi kacsát.']] },
  { id: 'zhe', key: '着', level: 2, title: '着: valami úgy van, tartósan',
    text: 'Az ige után álló {着|zhe} állapotot ír le: {门开着|mén kāi zhe} (nyitva van az ajtó). Hely + ige + {着|zhe} + dolog: {桌子上放着一本书|zhuō·zi shang fàng zhe yì běn shū}.',
    ex: [['{桌子|zhuō·zi}{上|shang}{放|fàng}{着|zhe}{一|yì}{本|běn}{书|shū}。', 'Az asztalon egy könyv fekszik.']] },
  { id: 'li', key: '离 · 从', level: 2, title: '离 és 从 … 到: hely és távolság az ige előtt',
    text: 'A {离|lí} (valamitől) és a {从|cóng} … {到|dào} (-tól -ig) a melléknév vagy az ige elé kerül: {我家离学校很近|wǒ jiā lí xué·xiào hěn jìn}.',
    ex: [['{我|wǒ}{家|jiā}{离|lí}{学校|xué·xiào}{很|hěn}{近|jìn}。', 'A lakásunk közel van az iskolához.']] },
  { id: 'pair', key: 'Párban járó szavak', level: 2, title: 'Párban járó szavak',
    text: 'Egyes szavak párban állnak, és mindkét fél a saját helyén: {先|xiān} … {再|zài} … (előbb … aztán), {虽然|suī·rán} … {但是|dàn·shì} … (bár … de), {一边|yì·biān} … {一边|yì·biān} … (közben), {如果|rú·guǒ} … {就|jiù} … (ha … akkor), {连|lián} … {都|dōu} … (még … is).',
    ex: [['{我们|wǒ·men}{先|xiān}{吃饭|chī fàn}{再|zài}{去|qù}。', 'Előbb eszünk, aztán megyünk.']] },
  /* HSK 3 */
  { id: 'ba', key: '把', level: 3, title: '把: a tárgy az ige elé kerül',
    text: 'Ha azt mondod el, mi történik a tárggyal (hová kerül, mivé lesz), a tárgy {把|bǎ} után az ige elé áll, az ige után pedig ott a kimenetel: {把书放在桌子上|bǎ shū fàng zài zhuō·zi shang}.',
    ex: [['{请|qǐng}{把|bǎ}{书|shū}{放|fàng}{在|zài}{桌子|zhuō·zi}{上|shang}。', 'Kérlek, tedd a könyvet az asztalra.']] },
  { id: 'bei', key: '被', level: 3, title: '被: szenvedő mondat',
    text: 'Az elszenvedő áll elöl, utána {被|bèi} + aki csinálta + ige + kimenetel. Gyakran kellemetlen történésnél használjuk.',
    ex: [['{我|wǒ}{的|de}{自行车|zì·xíng·chē}{被|bèi}{朋友|péng·you}{骑|qí}{走|zǒu}{了|le}。', 'A biciklimet elvitte a barátom.']] },
  { id: 'di', key: '地', level: 3, title: '地: hogyan csinálja?',
    text: 'Ha egy melléknév azt írja le, hogyan történik a cselekvés, {地|de} köti az igéhez, és az ige elé kerül: {高兴地说|gāo·xìng de shuō} (örömmel mondta).',
    ex: [['{我们|wǒ·men}{慢慢|màn màn}{地|de}{走|zǒu}{回|huí}{家|jiā}。', 'Lassan sétáltunk haza.']] },
  /* HSK 4 */
  { id: 'conjpos', key: 'Kötőszó helye', level: 4, title: 'Kötőszó-párok: az alany előtt vagy után?',
    text: 'Ha a két tagmondat alanya ugyanaz, az első kötőszó ({不仅|bù jǐn}, {虽然|suī·rán}, {即使|jí·shǐ}, {既然|jì·rán}) általában az alany után áll: {他不仅会说|tā bù jǐn huì shuō}，{而且会写|ér·qiě huì xiě}. Ha az alanyok különböznek, az alany elé kerül: {不仅他去|bù jǐn tā qù}，{我也去|wǒ yě qù}.',
    ex: [['{他|tā}{不仅|bù jǐn}{会|huì}{说|shuō}{汉语|Hàn·yǔ}，{而且|ér·qiě}{会|huì}{写|xiě}{汉字|Hàn·zì}。', 'Nemcsak beszél kínaiul, hanem írni is tud.'], ['{即使|jí·shǐ}{下|xià}{雨|yǔ}，{我们|wǒ·men}{也|yě}{要|yào}{去|qù}。', 'Még ha esik is, elmegyünk.']] },
  { id: 'advconj', key: '却 · 就 · 否则', level: 4, title: 'Határozószó az alany után, kötőszó a tagmondat elején',
    text: 'A {却|què}, {就|jiù}, {也|yě}, {还|hái} határozószó: mindig az alany után, közvetlenül az állítmány előtt áll — a {他却不知道|tā què bù zhī·dào} jó, a {却他不知道|què tā bù zhī·dào} hibás. A {但是|dàn·shì}, {而且|ér·qiě}, {所以|suǒ·yǐ}, {否则|fǒu·zé} kötőszó: a tagmondat elejére kerül.',
    ex: [['{天气|tiān·qì}{很|hěn}{冷|lěng}，{他|tā}{却|què}{只|zhǐ}{穿|chuān}{了|le}{一|yí}{件|jiàn}{衬衫|chèn·shān}。', 'Hideg van, ő mégis csak egy inget vett fel.'], ['{快|kuài}{走|zǒu}{吧|ba}，{否则|fǒu·zé}{就|jiù}{要|yào}{迟到|chí dào}{了|le}。', 'Siessünk, különben elkésünk.']] },
  { id: 'advorder', key: 'Határozók sorrendje', level: 4, title: 'Több határozó az ige előtt: idő → határozószó → segédige → kivel, hol',
    text: 'Ha sok minden áll az ige előtt, a szokásos sorrend: idő ({明天|míng·tiān}) → határozószó ({也|yě}, {都|dōu}, {已经|yǐ·jīng}) → segédige ({要|yào}, {想|xiǎng}, {能|néng}) → társ vagy hely ({跟他|gēn tā}, {在家|zài jiā}) → ige.',
    ex: [['{我|wǒ}{明天|míng·tiān}{也|yě}{想|xiǎng}{跟|gēn}{他|tā}{一起|yì·qǐ}{去|qù}。', 'Holnap én is el akarok menni vele.']] },
  { id: 'dircompl', key: 'Irány + tárgy', level: 4, title: 'Irányhatározó és tárgy: a tárgy a 来 / 去 elé kerül',
    text: 'Ha az összetett irányhatározós igének ({下起来|xià qǐ·lai}, {拿出来|ná chū·lai}, {走进去|zǒu jìn·qu}) tárgya vagy helyhatározója van, az a {来|lái} / {去|qù} elé ékelődik: {下起雨来|xià qǐ yǔ lái} (eleredt az eső), {走进教室去|zǒu jìn jiào·shì qù} (bement a tanterembe). Helyhatározó után a {来|lái} / {去|qù} csak a végén állhat.',
    ex: [['{突然|tū·rán}{下|xià}{起|qǐ}{雨|yǔ}{来|lái}{了|le}。', 'Hirtelen eleredt az eső.'], ['{他|tā}{从|cóng}{包|bāo}{里|li}{拿|ná}{出|chū}{一|yì}{本|běn}{书|shū}{来|lái}。', 'Elővett egy könyvet a táskájából.']] },
  { id: 'rhet', key: 'Szónoki kérdés', level: 4, title: 'Szónoki kérdés: 难道 … 吗？ · 不是 … 吗？',
    text: 'A {难道|nán·dào} az alany elé vagy mögé kerül, a mondat végére {吗|ma}: {难道你忘了吗|nán·dào nǐ wàng le ma}？ A {不是|bú shì} az alany után áll, és a végén szintén {吗|ma}: {你不是说今天来吗|nǐ bú shì shuō jīn·tiān lái ma}？',
    ex: [['{难道|nán·dào}{你|nǐ}{不|bù}{知道|zhī·dào}{吗|ma}？', 'Csak nem tudod?'], ['{你|nǐ}{不是|bú shì}{去|qù}{过|guo}{北京|Běi·jīng}{吗|ma}？', 'Hát nem jártál már Pekingben?']] },
  { id: 'cause', key: '使 · 让', level: 4, title: '使 / 让: ami hat, akire hat, és ami történik vele',
    text: 'A + {使|shǐ} / {让|ràng} + B + ige vagy melléknév: előbb az ok, aztán akire hat, végül a hatás. {这件事让我很感动|zhè jiàn shì ràng wǒ hěn gǎn·dòng} (ez nagyon meghatott). A B nem maradhat el.',
    ex: [['{老师|lǎo·shī}{的|de}{话|huà}{让|ràng}{大家|dà·jiā}{很|hěn}{感动|gǎn·dòng}。', 'A tanár szavai mindenkit meghatottak.']] }
];

const HANZIFLOW_SM_FORMULA = [
  ['Ki?', '{我|wǒ}'], ['Mikor?', '{明天|míng·tiān}'], ['Hol?', '{在家|zài jiā}'],
  ['Kivel?', '{跟朋友|gēn péng·you}'], ['Mit csinál?', '{看|kàn}'], ['Mit?', '{电影|diàn·yǐng}']
];

const HANZIFLOW_SM_PARTICLES = [
  { zh: '吗', py: 'ma',  level: 1, family: 'q',   rule: 'q',     short: 'eldöntendő kérdés a mondat végén' },
  { zh: '呢', py: 'ne',  level: 1, family: 'q',   rule: 'ne',    short: '„és te?", illetve „éppen most"' },
  { zh: '吧', py: 'ba',  level: 1, family: 'q',   rule: 'ba_',   short: 'javaslat, vagy „ugye"' },
  { zh: '的', py: 'de',  level: 1, family: 'de',  rule: 'de',    short: 'jelző + 的 + főnév' },
  { zh: '了', py: 'le',  level: 1, family: 'asp', rule: 'le',    short: 'megtörtént, vagy megváltozott' },
  { zh: '过', py: 'guo', level: 2, family: 'asp', rule: 'guo',   short: 'tapasztalat: csináltam már' },
  { zh: '着', py: 'zhe', level: 2, family: 'asp', rule: 'zhe',   short: 'tartós állapot' },
  { zh: '得', py: 'de',  level: 2, family: 'de',  rule: 'deg',   short: 'ige + 得 + milyen jól' },
  { zh: '地', py: 'de',  level: 3, family: 'de',  rule: 'di',    short: 'hogyan + 地 + ige' }
];

const HANZIFLOW_SM_BUILD = [
  /* HSK 1 */
  ['Holnap Pekingbe megyek.', ['{我|wǒ}', '{明天|míng·tiān}', '{去|qù}', '{北京|Běi·jīng}'], '。', 'time', 1, ['1 0 2 3']],
  ['Nyolckor megyek iskolába.', ['{我|wǒ}', '{八点|bā diǎn}', '{去|qù}', '{学校|xué·xiào}'], '。', 'time', 1, ['1 0 2 3']],
  ['Ő ma nem jön.', ['{他|tā}', '{今天|jīn·tiān}', '{不|bù}', '{来|lái}'], '。', 'adv', 1, ['1 0 2 3']],
  ['A húgom otthon tévét néz.', ['{我|wǒ}{妹妹|mèi·mei}', '{在|zài}{家|jiā}', '{看|kàn}', '{电视|diàn·shì}'], '。', 'place', 1],
  ['A szüleim mindketten Sanghajban dolgoznak.', ['{我|wǒ}{爸爸|bà·ba}{妈妈|mā·ma}', '{都|dōu}', '{在|zài}{上海|Shàng·hǎi}', '{工作|gōng·zuò}'], '。', 'adv', 1],
  ['Holnap délután a könyvtárban tanulok.', ['{我|wǒ}', '{明天|míng·tiān}{下午|xià·wǔ}', '{在|zài}{图书馆|tú·shū·guǎn}', '{学习|xué·xí}'], '。', 'tp', 1, ['1 0 2 3']],
  ['Ma este otthon vacsorázunk.', ['{我们|wǒ·men}', '{今天|jīn·tiān}{晚上|wǎn·shang}', '{在|zài}{家|jiā}', '{吃|chī}{晚饭|wǎn·fàn}'], '。', 'tp', 1, ['1 0 2 3']],
  ['Mi is mindannyian diákok vagyunk.', ['{我们|wǒ·men}', '{也|yě}', '{都|dōu}', '{是|shì}', '{学生|xué·sheng}'], '。', 'adv', 1],
  ['Minden nap metróval járok dolgozni.', ['{我|wǒ}', '{每天|měi tiān}', '{坐|zuò}{地铁|dì·tiě}', '{去|qù}{上班|shàng·bān}'], '。', 'manner', 1, ['1 0 2 3']],
  ['A barátommal együtt eszem.', ['{我|wǒ}', '{和|hé}{朋友|péng·you}', '{一起|yì·qǐ}', '{吃饭|chī fàn}'], '。', 'manner', 1],
  ['Diák vagy?', ['{你|nǐ}', '{是|shì}', '{学生|xué·sheng}', '{吗|ma}'], '？', 'q', 1],
  ['Hová mész holnap?', ['{你|nǐ}', '{明天|míng·tiān}', '{去|qù}', '{哪儿|nǎr}'], '？', 'q', 1, ['1 0 2 3']],
  ['Mit szeretnél inni?', ['{你|nǐ}', '{想|xiǎng}', '{喝|hē}', '{什么|shén·me}'], '？', 'q', 1],
  ['Minden nap hánykor kelsz?', ['{你|nǐ}', '{每天|měi tiān}', '{几点|jǐ diǎn}', '{起床|qǐ·chuáng}'], '？', 'q', 1, ['1 0 2 3']],
  ['Ez a tanárom könyve.', ['{这|zhè}', '{是|shì}', '{我|wǒ}{老师|lǎo·shī}', '{的|de}', '{书|shū}'], '。', 'de', 1],
  ['Tavaly jöttem Kínába.', ['{我|wǒ}', '{是|shì}', '{去年|qù·nián}', '{来|lái}', '{中国|Zhōng·guó}', '{的|de}'], '。', 'shide', 1, ['0 1 2 3 5 4']],
  ['Tegnap vettem két almát.', ['{我|wǒ}', '{昨天|zuó·tiān}', '{买|mǎi}{了|le}', '{两|liǎng}{个|ge}', '{苹果|píng·guǒ}'], '。', 'le', 1, ['1 0 2 3 4']],
  ['Menjünk együtt moziba!', ['{我们|wǒ·men}', '{一起|yì·qǐ}', '{去|qù}', '{看|kàn}{电影|diàn·yǐng}', '{吧|ba}'], '！', 'ba_', 1],
  /* HSK 2 */
  ['Két évig tanultam kínait.', ['{我|wǒ}', '{学|xué}{了|le}', '{两|liǎng}{年|nián}', '{汉语|Hàn·yǔ}'], '。', 'dur', 2, ['0 3 1 2']],
  ['Fél órát vártam rád.', ['{我|wǒ}', '{等|děng}{了|le}', '{你|nǐ}', '{半|bàn}{个|ge}{小时|xiǎo·shí}'], '。', 'dur', 2],
  ['A bátyám magasabb nálam.', ['{我|wǒ}{哥哥|gē·ge}', '{比|bǐ}', '{我|wǒ}', '{高|gāo}'], '。', 'bi', 2],
  ['Ma egy kicsit hidegebb van, mint tegnap.', ['{今天|jīn·tiān}', '{比|bǐ}', '{昨天|zuó·tiān}', '{冷|lěng}', '{一点儿|yì diǎnr}'], '。', 'bi', 2],
  ['Nagyon szépen énekel.', ['{她|tā}', '{唱歌|chàng gē}', '{唱|chàng}{得|de}', '{很|hěn}{好听|hǎo·tīng}'], '。', 'deg', 2],
  ['Ma korán keltem.', ['{我|wǒ}', '{今天|jīn·tiān}', '{起|qǐ}{得|de}', '{很|hěn}{早|zǎo}'], '。', 'deg', 2, ['1 0 2 3']],
  ['Még sosem ettem pekingi kacsát.', ['{我|wǒ}', '{没|méi}', '{吃|chī}{过|guo}', '{北京|Běi·jīng}{烤鸭|kǎo·yā}'], '。', 'guo', 2, ['0 3 1 2', '3 0 1 2']],
  ['Az asztalon egy könyv fekszik.', ['{桌子|zhuō·zi}{上|shang}', '{放|fàng}{着|zhe}', '{一|yì}{本|běn}', '{书|shū}'], '。', 'zhe', 2],
  ['Már nyolc óra van.', ['{现在|xiàn·zài}', '{已经|yǐ·jīng}', '{八点|bā diǎn}', '{了|le}'], '。', 'le', 2],
  ['A lakásunk közel van az iskolához.', ['{我|wǒ}{家|jiā}', '{离|lí}', '{学校|xué·xiào}', '{很|hěn}{近|jìn}'], '。', 'li', 2],
  ['Előbb eszünk, aztán megyünk.', ['{我们|wǒ·men}', '{先|xiān}', '{吃饭|chī fàn}', '{再|zài}', '{去|qù}'], '。', 'pair', 2],
  ['Ez a ruha drága ugyan, de nagyon szép.', ['{这|zhè}{件|jiàn}{衣服|yī·fu}', '{虽然|suī·rán}', '{很|hěn}{贵|guì}', '{但是|dàn·shì}', '{很|hěn}{漂亮|piào·liang}'], '。', 'pair', 2, ['1 0 2 3 4']],
  ['Anya éppen vacsorát főz.', ['{妈妈|mā·ma}', '{正在|zhèng·zài}', '{做|zuò}', '{晚饭|wǎn·fàn}', '{呢|ne}'], '。', 'ne', 2],
  ['Tetszik a ruha, amit tegnap vettem?', ['{你|nǐ}', '{喜欢|xǐ·huan}', '{我|wǒ}{昨天|zuó·tiān}{买|mǎi}', '{的|de}', '{衣服|yī·fu}', '{吗|ma}'], '？', 'de', 2],
  ['Jövő héten repülővel megyek Sanghajba.', ['{我|wǒ}', '{下|xià}{个|ge}{星期|xīng·qī}', '{坐|zuò}{飞机|fēi·jī}', '{去|qù}{上海|Shàng·hǎi}'], '。', 'manner', 2, ['1 0 2 3']],
  /* HSK 3 */
  ['Kérlek, tedd a könyvet az asztalra.', ['{请|qǐng}', '{把|bǎ}', '{书|shū}', '{放|fàng}{在|zài}', '{桌子|zhuō·zi}{上|shang}'], '。', 'ba', 3],
  ['Ezt a könyvet már kiolvastam.', ['{我|wǒ}', '{已经|yǐ·jīng}', '{把|bǎ}', '{这|zhè}{本|běn}{书|shū}', '{看|kàn}{完|wán}{了|le}'], '。', 'ba', 3],
  ['A biciklimet elvitte a barátom.', ['{我|wǒ}{的|de}{自行车|zì·xíng·chē}', '{被|bèi}', '{朋友|péng·you}', '{骑|qí}{走|zǒu}{了|le}'], '。', 'bei', 3],
  ['Lassan sétáltunk haza.', ['{我们|wǒ·men}', '{慢慢|màn màn}{地|de}', '{走|zǒu}', '{回|huí}{家|jiā}'], '。', 'di', 3],
  ['Zenét hallgat, és közben a házi feladatát írja.', ['{他|tā}', '{一边|yì·biān}', '{听|tīng}{音乐|yīn·yuè}', '{一边|yì·biān}', '{写|xiě}{作业|zuò·yè}'], '。', 'pair', 3, ['0 1 4 3 2']],
  ['Egyre melegebb az idő.', ['{天气|tiān·qì}', '{越来越|yuè lái yuè}', '{热|rè}', '{了|le}'], '。', 'pair', 3],
  ['Ha holnap esik, nem megyek.', ['{如果|rú·guǒ}', '{明天|míng·tiān}{下雨|xià yǔ}', '{我|wǒ}', '{就|jiù}', '{不|bú}{去|qù}{了|le}'], '。', 'pair', 3],
  ['Még a nevét sem tudom.', ['{我|wǒ}', '{连|lián}', '{他|tā}{的|de}{名字|míng·zi}', '{都|dōu}', '{不|bù}{知道|zhī·dào}'], '。', 'pair', 3, ['1 2 0 3 4']],
  /* HSK 4 */
  ['Nemcsak kínaiul beszél, hanem írni is tud.', ['{他|tā}', '{不仅|bù jǐn}', '{会|huì}{说|shuō}{汉语|Hàn·yǔ}', '{而且|ér·qiě}', '{会|huì}{写|xiě}{汉字|Hàn·zì}'], '。', 'conjpos', 4],
  ['Még ha esik is, elmegyünk.', ['{即使|jí·shǐ}', '{下|xià}{雨|yǔ}', '{我们|wǒ·men}', '{也|yě}', '{要|yào}{去|qù}'], '。', 'conjpos', 4],
  ['Hideg van, ő mégis csak egy inget vett fel.', ['{天气|tiān·qì}{很|hěn}{冷|lěng}', '{他|tā}', '{却|què}', '{只|zhǐ}{穿|chuān}{了|le}{一|yí}{件|jiàn}{衬衫|chèn·shān}'], '。', 'advconj', 4],
  ['Siess, különben elkésel.', ['{你|nǐ}{快|kuài}{点儿|diǎnr}{走|zǒu}', '{否则|fǒu·zé}', '{就|jiù}', '{要|yào}{迟到|chí dào}{了|le}'], '。', 'advconj', 4],
  ['Ha már eljöttél, vacsorázz itt, és csak aztán menj.', ['{既然|jì·rán}', '{来|lái}{了|le}', '{就|jiù}', '{吃|chī}{了|le}{晚饭|wǎn fàn}', '{再|zài}{走|zǒu}{吧|ba}'], '。', 'advconj', 4],
  ['Holnap én is el akarok menni vele.', ['{我|wǒ}', '{明天|míng·tiān}', '{也|yě}', '{想|xiǎng}', '{跟|gēn}{他|tā}{一起|yì·qǐ}{去|qù}'], '。', 'advorder', 4, ['1 0 2 3 4']],
  ['Már mindannyian megérkeztek a tárgyalóba.', ['{他们|tā·men}', '{都|dōu}', '{已经|yǐ·jīng}', '{到|dào}{会议室|huì yì shì}{了|le}'], '。', 'advorder', 4, ['0 2 1 3']],
  ['Holnap nem tudok veled moziba menni.', ['{我|wǒ}', '{明天|míng·tiān}', '{不|bù}{能|néng}', '{跟|gēn}{你|nǐ}', '{去|qù}{看|kàn}{电影|diàn·yǐng}'], '。', 'advorder', 4, ['1 0 2 3 4']],
  ['Hirtelen eleredt az eső.', ['{突然|tū·rán}', '{下|xià}{起|qǐ}', '{雨|yǔ}', '{来|lái}{了|le}'], '。', 'dircompl', 4],
  ['Elővett egy könyvet a táskájából.', ['{他|tā}', '{从|cóng}{包|bāo}{里|li}', '{拿|ná}{出|chū}', '{一|yì}{本|běn}{书|shū}', '{来|lái}'], '。', 'dircompl', 4, ['0 1 2 4 3']],
  ['Csak nem felejtetted el?', ['{你|nǐ}', '{难道|nán·dào}', '{忘|wàng}{了|le}', '{吗|ma}'], '？', 'rhet', 4, ['1 0 2 3']],
  ['Nem azt mondtad, hogy ma eljössz?', ['{你|nǐ}', '{不是|bú shì}', '{说|shuō}{今天|jīn·tiān}{来|lái}', '{吗|ma}'], '？', 'rhet', 4],
  ['A tanár szavai mindenkit meghatottak.', ['{老师|lǎo·shī}{的|de}{话|huà}', '{让|ràng}', '{大家|dà·jiā}', '{很|hěn}{感动|gǎn·dòng}'], '。', 'cause', 4],
  ['A szelektív gyűjtés tisztábbá tette a várost.', ['{垃圾|lā·jī}{分类|fēn lèi}', '{使|shǐ}', '{城市|chéng·shì}', '{变|biàn}{得|de}{更|gèng}{干净|gān·jìng}{了|le}'], '。', 'cause', 4]
];

const HANZIFLOW_SM_FILL = [
  /* 吗 */
  ['{你|nǐ}{是|shì}{老师|lǎo·shī}＿？', '吗', 'Tanár vagy?', ['吧', '了'], 'q', 1],
  ['{你|nǐ}{喜欢|xǐ·huan}{喝|hē}{茶|chá}＿？', '吗', 'Szereted a teát?', ['吧', '了'], 'q', 1],
  ['{这|zhè}{是|shì}{你|nǐ}{的|de}{书|shū}＿？', '吗', 'Ez a te könyved?', ['吧', '了'], 'q', 1],
  /* 呢 */
  ['{我|wǒ}{很|hěn}{好|hǎo}，{你|nǐ}＿？', '呢', 'Jól vagyok, és te?', ['吧'], 'ne', 1],
  ['{我|wǒ}{的|de}{手机|shǒu·jī}{在|zài}{哪儿|nǎr}＿？', '呢', 'Hol van a telefonom?', ['了'], 'ne', 1],
  ['{他|tā}{在|zài}{看|kàn}{书|shū}＿。', '呢', 'Éppen olvas.', ['了', '吧'], 'ne', 1],
  /* 吧 */
  ['{我们|wǒ·men}{一起|yì·qǐ}{去|qù}＿！', '吧', 'Menjünk együtt!', ['了', '的'], 'ba_', 1],
  ['{你|nǐ}{是|shì}{安娜|Ān·nà}＿？', '吧', 'Ugye te vagy Anna?', ['吗'], 'ba_', 1],
  ['{太|tài}{晚|wǎn}{了|le}，{我们|wǒ·men}{回|huí}{家|jiā}＿。', '吧', 'Késő van, menjünk haza.', ['了'], 'ba_', 1],
  /* 的 */
  ['{这|zhè}{是|shì}{我|wǒ}＿{朋友|péng·you}。', '的', 'Ő a barátom.', [], 'de', 1],
  ['{那|nà}{是|shì}{谁|shéi}＿{手机|shǒu·jī}？', '的', 'Kinek a telefonja az?', [], 'de', 1],
  ['{她|tā}{穿|chuān}{了|le}{一|yí}{件|jiàn}{很|hěn}{漂亮|piào·liang}＿{衣服|yī·fu}。', '的', 'Egy nagyon szép ruhát vett fel.', [], 'de', 1],
  ['{我|wǒ}{是|shì}{坐|zuò}{飞机|fēi·jī}{来|lái}＿。', '的', 'Repülővel jöttem.', [], 'shide', 1],
  ['{我|wǒ}{昨天|zuó·tiān}{买|mǎi}＿{书|shū}{很|hěn}{有意思|yǒu yì·si}。', '的', 'A könyv, amit tegnap vettem, nagyon érdekes.', ['了'], 'de', 2],
  /* 了 */
  ['{我|wǒ}{昨天|zuó·tiān}{买|mǎi}＿{一|yì}{本|běn}{书|shū}。', '了', 'Tegnap vettem egy könyvet.', ['过'], 'le', 1],
  ['{他|tā}{已经|yǐ·jīng}{走|zǒu}＿。', '了', 'Már elment.', ['过'], 'le', 1],
  ['{我|wǒ}{不|bú}{去|qù}＿，{我|wǒ}{太|tài}{累|lèi}{了|le}。', '了', 'Mégsem megyek, túl fáradt vagyok.', ['吧', '呢', '的'], 'le', 1],
  /* 过 */
  ['{我|wǒ}{从来|cóng·lái}{没|méi}{看|kàn}＿{这|zhè}{个|ge}{电影|diàn·yǐng}。', '过', 'Ezt a filmet még sosem láttam.', [], 'guo', 2],
  ['{我|wǒ}{去|qù}＿{中国|Zhōng·guó}，{那儿|nàr}{很|hěn}{漂亮|piào·liang}。', '过', 'Jártam már Kínában, nagyon szép.', ['了'], 'guo', 2],
  /* 着 */
  ['{门|mén}{开|kāi}＿{呢|ne}。', '着', 'Nyitva van az ajtó.', ['了'], 'zhe', 2],
  ['{墙|qiáng}{上|shang}{挂|guà}＿{一|yì}{张|zhāng}{地图|dì·tú}。', '着', 'A falon egy térkép lóg.', ['了', '过'], 'zhe', 2],
  ['{他|tā}{笑|xiào}＿{说|shuō}：“{没|méi}{关系|guān·xi}。”', '着', 'Mosolyogva mondta: „Semmi baj."', [], 'zhe', 2],
  /* 得 */
  ['{他|tā}{说|shuō}{汉语|Hàn·yǔ}{说|shuō}＿{很|hěn}{好|hǎo}。', '得', 'Nagyon jól beszél kínaiul.', [], 'deg', 2],
  ['{你|nǐ}{今天|jīn·tiān}{起|qǐ}＿{很|hěn}{早|zǎo}。', '得', 'Ma nagyon korán keltél.', [], 'deg', 2],
  ['{她|tā}{跑|pǎo}＿{比|bǐ}{我|wǒ}{快|kuài}。', '得', 'Gyorsabban fut nálam.', [], 'deg', 2],
  /* 地 */
  ['{他|tā}{高兴|gāo·xìng}＿{说|shuō}：“{太|tài}{好|hǎo}{了|le}！”', '地', 'Örömmel mondta: „Nagyszerű!"', [], 'di', 3],
  ['{请|qǐng}{你|nǐ}{慢慢|màn màn}＿{说|shuō}。', '地', 'Kérlek, mondd lassan.', [], 'di', 3],
  ['{孩子们|hái·zi·men}{认真|rèn·zhēn}＿{听|tīng}{老师|lǎo·shī}{讲|jiǎng}{故事|gù·shi}。', '地', 'A gyerekek figyelmesen hallgatják a tanár meséjét.', [], 'di', 3],
  /* HSK 4 */
  ['{他|tā}{认真|rèn·zhēn}＿{检查|jiǎn chá}{了|le}{一|yí}{遍|biàn}。', '地', 'Alaposan átnézte még egyszer.', [], 'di', 4],
  ['{孩子们|hái·zi·men}{高高兴兴|gāo gāo xìng xìng}＿{回|huí}{家|jiā}{了|le}。', '地', 'A gyerekek vidáman hazamentek.', ['的'], 'di', 4],
  ['{他|tā}{累|lèi}＿{一|yí}{句|jù}{话|huà}{也|yě}{不|bù}{想|xiǎng}{说|shuō}。', '得', 'Annyira fáradt, hogy egy szót sem akar szólni.', ['了'], 'deg', 4],
  ['{这|zhè}{是|shì}{我|wǒ}{在|zài}{上海|Shàng·hǎi}{工作|gōng·zuò}{时|shí}{认识|rèn·shi}＿{朋友|péng·you}。', '的', 'Ő egy barátom, akit a sanghaji munkám idején ismertem meg.', [], 'de', 4],
  ['{你|nǐ}{去|qù}＿{西安|Xī·ān}{吗|ma}？{那儿|nàr}{的|de}{小吃|xiǎo chī}{怎么样|zěn·me·yàng}？', '过', 'Jártál már Hszianban? Milyenek ott a harapnivalók?', ['了'], 'guo', 4],
  ['{我|wǒ}{从来|cóng·lái}{没|méi}{见|jiàn}＿{这么|zhè·me}{漂亮|piào·liang}{的|de}{地方|dì·fang}。', '过', 'Ilyen szép helyet még sosem láttam.', [], 'guo', 4],
  ['{他|tā}{穿|chuān}＿{一|yí}{件|jiàn}{白|bái}{衬衫|chèn·shān}{去|qù}{面试|miàn shì}{了|le}。', '着', 'Fehér ingben ment el az interjúra.', ['了'], 'zhe', 4],
  ['{窗户|chuāng·hu}{一直|yì zhí}{开|kāi}＿，{难怪|nán·guài}{这么|zhè·me}{冷|lěng}。', '着', 'Végig nyitva volt az ablak, nem csoda, hogy ilyen hideg van.', ['了'], 'zhe', 4],
  ['{他|tā}{一下子|yí xià·zi}{就|jiù}{把|bǎ}{蛋糕|dàn gāo}{吃|chī}{完|wán}＿。', '了', 'Egy szempillantás alatt megette a tortát.', [], 'le', 4],
  ['{难道|nán·dào}{你|nǐ}{不|bù}{知道|zhī·dào}＿？', '吗', 'Csak nem tudod?', ['呢'], 'rhet', 4],
  ['{你|nǐ}{不是|bú shì}{说|shuō}{今天|jīn·tiān}{有|yǒu}{空|kòng}＿？', '吗', 'Nem azt mondtad, hogy ma ráérsz?', ['呢', '了'], 'rhet', 4],
  ['{既然|jì·rán}{大家|dà·jiā}{都|dōu}{同意|tóng yì}{了|le}，{我们|wǒ·men}{就|jiù}{这么|zhè·me}{办|bàn}＿。', '吧', 'Ha már mindenki egyetért, csináljuk így.', ['了'], 'ba_', 4]
];
