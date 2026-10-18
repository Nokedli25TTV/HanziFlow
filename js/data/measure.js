/* ====================================================
   HanziFlow — a Mérőszavak modul adatai (pages/measure.html)
   ----------------------------------------------------
   Saját szöveg. A kínai szövegben {汉字|pīn·yīn} jelölés áll (mint a leckékben).

   HANZIFLOW_MW_GROUPS   a tábla fülei: { id, title, sub }
   HANZIFLOW_MEASURES    mérőszavak:
     mw, py          az írásjegy és a pinyinje (szótárban)
     pyIn            ha szókapcsolatban másképp ejtjük (个 → ge)
     level           1 = HSK 1, 2 = HSK 2, 3 = HSK 3
     group           HANZIFLOW_MW_GROUPS id
     short, rule     rövid címke és magyarázat (a rule-ban lehet jelölés)
     nouns           [írásjegy, pinyin, magyar egység, más jó mérőszavak?]
                     a magyar egység a szám után áll: „két" + „csésze tea"
                     a 些-nél [egyes szám, többes szám]: néhány gyümölcs · ezek a gyümölcsök
     pre             mely szavak állhatnak elötte a Párosítás-kártyán (alap: 一 两 三 这 那 几)
     huPre           ha a magyarban a szám másként kapcsolódik (种: kétféle)
     any             szinte bármelyik főnévhez illik (些, 种): nem kerül a rossz válaszok közé, és mellette a 个 sem
     free            sok főnévvel helyes lehet (口, az edények): nem kerül a rossz válaszok közé
     noCount         a Számolás módból kimarad
     verbal, ex      igei mérőszó (hányszor?); ex: [jelölés, magyar] a táblához
   HANZIFLOW_MW_SENTENCES  [mondat ＿ hellyel, mérőszó, magyar, más jó mérőszavak?, szint?]
   HANZIFLOW_MW_RULES      [cím, szöveg] — a „Szabályok" rész
   ==================================================== */

const HANZIFLOW_MW_GROUPS = [
  { id: 'gen',    title: 'Általános',       sub: 'Ezek a legtöbb főnévvel összeállnak.' },
  { id: 'people', title: 'Emberek',         sub: 'A 个 mellett van udvariasabb és családi mérőszó is.' },
  { id: 'shape',  title: 'Forma szerint',   sub: 'A tárgy alakja dönt: lapos, hosszú, fogós vagy egy darab.' },
  { id: 'living', title: 'Állat, ruha, pár', sub: 'Kisebb állatok, felsőruhák és a párban járó dolgok.' },
  { id: 'text',   title: 'Könyv és szöveg', sub: 'Könyvek, írások, mondatok és példányok.' },
  { id: 'vessel', title: 'Edények',         sub: 'Az edény maga a mértékegység: egy csésze tea, egy tál rizs.' },
  { id: 'place',  title: 'Gépek és helyek', sub: 'Gépek, járművek, üzletek és intézmények.' },
  { id: 'action', title: 'Alkalmak',        sub: 'Hányszor? Az igei mérőszó az ige után áll.' }
];

const HANZIFLOW_MEASURES = [
  /* ── Általános ── */
  { mw: '个', py: 'gè', pyIn: 'ge', level: 1, group: 'gen', short: 'általános',
    rule: 'Emberek, gyümölcsök, időszakok és sok elvont dolog. Ha egy főnévnek nincs saját mérőszava, ez illik hozzá.',
    nouns: [['人', 'rén', 'ember', ['口', '家']], ['苹果', 'píng·guǒ', 'alma', ['块']], ['问题', 'wèn·tí', 'kérdés'], ['朋友', 'péng·you', 'barát', ['位']],
            ['星期', 'xīng·qī', 'hét'], ['字', 'zì', 'írásjegy'], ['学生', 'xué·sheng', 'diák', ['位']]] },
  { mw: '些', py: 'xiē', level: 1, group: 'gen', short: 'néhány', any: true, noCount: true, pre: ['一', '这', '那'],
    huPre: { '一': 'néhány', '这': 'ezek a', '那': 'azok a' },
    rule: 'Meg nem számolt mennyiség: {一些|yì xiē} (néhány, egy kis), {这些|zhè xiē} (ezek), {那些|nà xiē} (azok). Számmal nem áll együtt.',
    nouns: [['水果', 'shuǐ·guǒ', ['gyümölcs', 'gyümölcsök']], ['东西', 'dōng·xi', ['holmi', 'holmik']], ['衣服', 'yī·fu', ['ruha', 'ruhák']],
            ['问题', 'wèn·tí', ['kérdés', 'kérdések']], ['朋友', 'péng·you', ['barát', 'barátok']]] },
  { mw: '种', py: 'zhǒng', level: 3, group: 'gen', short: 'fajta', any: true, noCount: true, pre: ['一', '两', '三', '这', '几'],
    huPre: { '一': 'egyfajta', '两': 'kétféle', '三': 'háromféle', '这': 'ez a fajta', '几': 'hányféle' },
    rule: 'Fajta, féle: {这种茶|zhè zhǒng chá} (ez a fajta tea), {三种颜色|sān zhǒng yán sè} (háromféle szín). Szinte bármelyik főnév elé kerülhet, ha fajtáról beszélünk.',
    nouns: [['茶', 'chá', 'tea'], ['水果', 'shuǐ·guǒ', 'gyümölcs'], ['颜色', 'yán·sè', 'szín'], ['方法', 'fāng·fǎ', 'módszer'], ['语言', 'yǔ·yán', 'nyelv']] },

  /* ── Emberek ── */
  { mw: '位', py: 'wèi', level: 2, group: 'people', short: 'udvarias',
    rule: 'Emberekhez, tisztelettel: tanár, vendég, orvos. Magunkra és a saját családunkra nem mondjuk. Az étteremben így kérdezik: {您几位|nín jǐ wèi}？ (Hányan lesznek?)',
    nouns: [['老师', 'lǎo·shī', 'tanár', ['个']], ['客人', 'kè·rén', 'vendég', ['个']], ['医生', 'yī·shēng', 'orvos', ['个']], ['先生', 'xiān·sheng', 'úr', ['个']]] },
  { mw: '口', py: 'kǒu', level: 1, group: 'people', short: 'családtag, falat', free: true, pre: ['两', '三', '几'],
    rule: 'A család létszámához: {我家有三口人|wǒ jiā yǒu sān kǒu rén} (hárman vagyunk otthon). Egy kortyot, falatot is így mérünk: {一口水|yì kǒu shuǐ}.',
    nouns: [['人', 'rén', 'családtag', ['个', '家']], ['水', 'shuǐ', 'korty víz'], ['饭', 'fàn', 'falat étel', ['份']]] },

  /* ── Forma szerint ── */
  { mw: '张', py: 'zhāng', level: 1, group: 'shape', short: 'lapos',
    rule: 'Lapos, nagy felületű dolgok: papír, jegy, fénykép, térkép, asztal, ágy.',
    nouns: [['纸', 'zhǐ', 'papírlap', ['块']], ['桌子', 'zhuō·zi', 'asztal', ['个']], ['床', 'chuáng', 'ágy', ['个']], ['票', 'piào', 'jegy'],
            ['照片', 'zhào·piàn', 'fénykép'], ['地图', 'dì·tú', 'térkép', ['本', '份']]] },
  { mw: '条', py: 'tiáo', level: 2, group: 'shape', short: 'hosszú, hajlékony',
    rule: 'Hosszú, keskeny, hajlékony dolgok: út, folyó, hal, kutya, nadrág, szoknya.',
    nouns: [['鱼', 'yú', 'hal', ['块']], ['路', 'lù', 'út'], ['河', 'hé', 'folyó'], ['裤子', 'kù·zi', 'nadrág', ['件']], ['裙子', 'qún·zi', 'szoknya', ['件']], ['狗', 'gǒu', 'kutya']] },
  { mw: '把', py: 'bǎ', level: 1, group: 'shape', short: 'fogantyús',
    rule: 'Aminek fogója van, amit kézbe veszel: szék, esernyő, kulcs, kés.',
    nouns: [['椅子', 'yǐ·zi', 'szék', ['个', '张']], ['伞', 'sǎn', 'esernyő', ['个']], ['钥匙', 'yào·shi', 'kulcs'], ['刀', 'dāo', 'kés']] },
  { mw: '块', py: 'kuài', level: 1, group: 'shape', short: 'darab, jüan',
    rule: 'Egy darab, egy szelet: {一块蛋糕|yí kuài dàn gāo}, {一块手表|yí kuài shǒu biǎo}. A pénznél is ez áll: {三块钱|sān kuài qián} (három jüan, a beszélt nyelvben).',
    nouns: [['钱', 'qián', 'jüan', ['张']], ['蛋糕', 'dàn·gāo', 'szelet torta', ['个']], ['手表', 'shǒu·biǎo', 'karóra', ['个', '只']], ['糖', 'táng', 'cukorka', ['个']]] },

  /* ── Állat, ruha, pár ── */
  { mw: '只', py: 'zhī', level: 1, group: 'living', short: 'kisebb állat',
    rule: 'Kisebb állatok és madarak, és a pár egyik tagja: {一只手|yì zhī shǒu} (az egyik kéz).',
    nouns: [['猫', 'māo', 'macska'], ['鸟', 'niǎo', 'madár'], ['狗', 'gǒu', 'kutya'], ['手', 'shǒu', 'kéz', ['双']]] },
  { mw: '件', py: 'jiàn', level: 1, group: 'living', short: 'felsőruha, ügy',
    rule: 'Felsőruhák (ing, kabát, ruha), és az ügyek, dolgok: {一件事|yí jiàn shì} (egy ügy, egy dolog).',
    nouns: [['衣服', 'yī·fu', 'ruha'], ['衬衫', 'chèn·shān', 'ing'], ['大衣', 'dà·yī', 'kabát'], ['事', 'shì', 'ügy', ['个']]] },
  { mw: '双', py: 'shuāng', level: 2, group: 'living', short: 'pár',
    rule: 'Ami párban jár: cipő, zokni, evőpálcika.',
    nouns: [['鞋', 'xié', 'pár cipő', ['只']], ['筷子', 'kuài·zi', 'pár evőpálcika', ['只']], ['袜子', 'wà·zi', 'pár zokni', ['只']]] },

  /* ── Könyv és szöveg ── */
  { mw: '本', py: 'běn', level: 1, group: 'text', short: 'könyv',
    rule: 'Kötött, lapozható dolgok: könyv, szótár, regény, folyóirat.',
    nouns: [['书', 'shū', 'könyv'], ['词典', 'cí·diǎn', 'szótár'], ['小说', 'xiǎo·shuō', 'regény', ['篇']], ['杂志', 'zá·zhì', 'folyóirat', ['份']]] },
  { mw: '句', py: 'jù', level: 2, group: 'text', short: 'mondat',
    rule: 'Mondatok, kimondott szavak: {一句话|yí jù huà} (egy mondat), {这句话|zhè jù huà} (ez a mondat).',
    nouns: [['话', 'huà', 'mondat']] },
  { mw: '篇', py: 'piān', level: 3, group: 'text', short: 'írás, cikk',
    rule: 'Hosszabb, egybefüggő írások: cikk, fogalmazás, naplóbejegyzés.',
    nouns: [['文章', 'wén·zhāng', 'cikk'], ['作文', 'zuò·wén', 'fogalmazás'], ['日记', 'rì·jì', 'naplóbejegyzés', ['本']]] },
  { mw: '份', py: 'fèn', level: 3, group: 'text', short: 'példány, adag',
    rule: 'Példány, adag, állás: {一份报纸|yí fèn bào zhǐ} (egy újság), {一份工作|yí fèn gōng zuò} (egy állás), {一份礼物|yí fèn lǐ wù} (egy ajándék).',
    nouns: [['报纸', 'bào·zhǐ', 'újság', ['张']], ['工作', 'gōng·zuò', 'állás', ['个']], ['礼物', 'lǐ·wù', 'ajándék', ['个', '件']]] },

  /* ── Edények ── */
  { mw: '杯', py: 'bēi', level: 1, group: 'vessel', short: 'csésze, pohár', free: true,
    rule: 'Ami csészében, pohárban van: tea, kávé, víz, tej. A pohár mint tárgy viszont {一个杯子|yí ge bēi zi}.',
    nouns: [['茶', 'chá', 'csésze tea'], ['咖啡', 'kā·fēi', 'csésze kávé'], ['水', 'shuǐ', 'pohár víz'], ['牛奶', 'niú·nǎi', 'pohár tej']] },
  { mw: '盒', py: 'hé', level: 2, group: 'vessel', short: 'doboz', free: true,
    rule: 'Ami dobozban van: tea, keksz, csokoládé.',
    nouns: [['茶', 'chá', 'doboz tea'], ['饼干', 'bǐng·gān', 'doboz keksz', ['块', '个']], ['巧克力', 'qiǎo·kè·lì', 'doboz csokoládé', ['块', '个']]] },
  { mw: '瓶', py: 'píng', level: 3, group: 'vessel', short: 'üveg, palack', free: true,
    rule: 'Ami üvegben, palackban van: víz, sör, tej, kóla.',
    nouns: [['水', 'shuǐ', 'palack víz'], ['啤酒', 'pí·jiǔ', 'üveg sör'], ['牛奶', 'niú·nǎi', 'üveg tej'], ['可乐', 'kě·lè', 'üveg kóla']] },
  { mw: '碗', py: 'wǎn', level: 3, group: 'vessel', short: 'tál', free: true,
    rule: 'Ami tálban van: rizs, tészta, leves.',
    nouns: [['米饭', 'mǐ·fàn', 'tál rizs'], ['面条', 'miàn·tiáo', 'tál tészta'], ['汤', 'tāng', 'tál leves']] },

  /* ── Gépek és helyek ── */
  { mw: '台', py: 'tái', level: 3, group: 'place', short: 'gép',
    rule: 'Gépek, készülékek: számítógép, tévé, légkondi, mosógép.',
    nouns: [['电脑', 'diàn·nǎo', 'számítógép', ['个']], ['电视', 'diàn·shì', 'tévé', ['个']], ['空调', 'kōng·tiáo', 'légkondi'], ['洗衣机', 'xǐ·yī·jī', 'mosógép']] },
  { mw: '辆', py: 'liàng', level: 3, group: 'place', short: 'jármű',
    rule: 'Kerekes járművek: autó, bicikli, taxi, busz.',
    nouns: [['车', 'chē', 'autó', ['台']], ['自行车', 'zì·xíng·chē', 'bicikli'], ['出租车', 'chū·zū·chē', 'taxi'], ['公共汽车', 'gōng·gòng·qì·chē', 'busz']] },
  { mw: '家', py: 'jiā', level: 3, group: 'place', short: 'üzlet, cég',
    rule: 'Ahol vállalkozás működik: bolt, étterem, cég, bank.',
    nouns: [['商店', 'shāng·diàn', 'bolt', ['个']], ['饭馆', 'fàn·guǎn', 'étterem', ['个']], ['公司', 'gōng·sī', 'cég', ['个']],
            ['银行', 'yín·háng', 'bank', ['个']], ['书店', 'shū·diàn', 'könyvesbolt', ['个']]] },
  { mw: '所', py: 'suǒ', level: 3, group: 'place', short: 'iskola, intézmény',
    rule: 'Épülettel együtt értett intézmények: iskola, egyetem, kórház.',
    nouns: [['学校', 'xué·xiào', 'iskola', ['个', '家']], ['大学', 'dà·xué', 'egyetem', ['个']], ['医院', 'yī·yuàn', 'kórház', ['个', '家']]] },

  /* ── Alkalmak ── */
  { mw: '次', py: 'cì', level: 2, group: 'action', short: 'alkalom', verbal: true,
    rule: 'Hányszor történt valami: {去过两次|qù guo liǎng cì} (kétszer járt már ott), {第一次|dì yī cì} (az első alkalom).',
    ex: [['{去过|qù·guo}{两次|liǎng cì}', 'kétszer járt már ott'], ['{第一次|dì yī cì}', 'az első alkalom'], ['{一个星期两次|yí ge xīng qī liǎng cì}', 'hetente kétszer']] },
  { mw: '遍', py: 'biàn', level: 2, group: 'action', short: 'végig, újra', verbal: true,
    rule: 'Egy teljes alkalom az elejétől a végéig: {再说一遍|zài shuō yí biàn} (mondd el még egyszer), {看了两遍|kàn le liǎng biàn} (kétszer végigolvasta).',
    ex: [['{再说一遍|zài shuō yí biàn}', 'mondd el még egyszer'], ['{看了两遍|kàn le liǎng biàn}', 'kétszer végigolvasta']] },
  { mw: '趟', py: 'tàng', level: 3, group: 'action', short: 'oda-vissza út', verbal: true,
    rule: 'Egy út valahová és vissza: {去一趟银行|qù yí tàng yín háng} (elugrik a bankba).',
    ex: [['{去一趟|qù yí tàng}', 'elugrik valahová'], ['{跑了两趟|pǎo le liǎng tàng}', 'kétszer is megjárta']] },
  { mw: '顿', py: 'dùn', level: 3, group: 'action', short: 'étkezés', pre: ['一', '两', '三', '这'],
    rule: 'Étkezések: {一顿饭|yí dùn fàn} (egy étkezés), {一天三顿饭|yì tiān sān dùn fàn} (napi három étkezés).',
    nouns: [['饭', 'fàn', 'étkezés', ['碗', '盒', '份']]] },
  { mw: '节', py: 'jié', level: 3, group: 'action', short: 'tanóra', pre: ['一', '两', '三', '这', '几'],
    rule: 'Tanórák: {一节课|yì jié kè} (egy tanóra), {今天有四节课|jīn tiān yǒu sì jié kè} (ma négy órám van).',
    nouns: [['课', 'kè', 'tanóra']] }
];

const HANZIFLOW_MW_SENTENCES = [
  /* HSK 1 */
  ['{一|yì}{年|nián}{有|yǒu}{十二|shí·èr}＿{月|yuè}。', '个', 'Egy évben tizenkét hónap van.'],
  ['{我|wǒ}{有|yǒu}{两|liǎng}＿{哥哥|gē·ge}。', '个', 'Két bátyám van.', ['位']],
  ['{教室|jiào·shì}{里|li}{有|yǒu}{二十|èr·shí}＿{学生|xué·sheng}。', '个', 'A tanteremben húsz diák van.', ['位']],
  ['{你|nǐ}{家|jiā}{有|yǒu}{几|jǐ}＿{人|rén}？', '口', 'Hányan vagytok otthon?', ['个']],
  ['{我|wǒ}{买|mǎi}{了|le}{两|liǎng}＿{汉语|Hàn·yǔ}{书|shū}。', '本', 'Vettem két kínai nyelvkönyvet.'],
  ['{这|zhè}＿{词典|cí·diǎn}{是|shì}{谁|shéi}{的|de}？', '本', 'Kié ez a szótár?', ['个']],
  ['{我|wǒ}{要|yào}{一|yì}＿{咖啡|kā·fēi}。', '杯', 'Egy csésze kávét kérek.', ['瓶', '盒', '个', '份']],
  ['{你|nǐ}{喝|hē}{了|le}{几|jǐ}＿{茶|chá}？', '杯', 'Hány csésze teát ittál?', ['瓶', '口']],
  ['{桌子|zhuō·zi}{上|shang}{有|yǒu}{一|yì}＿{地图|dì·tú}。', '张', 'Az asztalon van egy térkép.', ['本', '份']],
  ['{我|wǒ}{给|gěi}{你|nǐ}{看|kàn}{一|yì}＿{照片|zhào·piàn}。', '张', 'Mutatok neked egy fényképet.', ['本']],
  ['{房间|fáng·jiān}{里|li}{有|yǒu}{两|liǎng}＿{椅子|yǐ·zi}。', '把', 'A szobában két szék van.', ['个', '张']],
  ['{我|wǒ}{家|jiā}{有|yǒu}{一|yì}＿{小|xiǎo}{猫|māo}。', '只', 'Van egy kiscicánk.', ['个']],
  ['{这|zhè}＿{衣服|yī·fu}{很|hěn}{漂亮|piào·liang}。', '件', 'Ez a ruha nagyon szép.'],
  ['{我|wǒ}{有|yǒu}{一|yí}＿{事|shì}{想|xiǎng}{问|wèn}{你|nǐ}。', '件', 'Szeretnék kérdezni tőled valamit.', ['个']],
  ['{这|zhè}{个|ge}{苹果|píng·guǒ}{三|sān}＿{钱|qián}。', '块', 'Ez az alma három jüan.', ['张']],
  ['{我|wǒ}{买|mǎi}{了|le}{一|yì}＿{水果|shuǐ·guǒ}。', '些', 'Vettem egy kis gyümölcsöt.', ['个', '种', '盒', '份']],
  /* HSK 2 */
  ['{我|wǒ}{想|xiǎng}{买|mǎi}{一|yì}＿{运动鞋|yùn·dòng·xié}。', '双', 'Szeretnék venni egy pár sportcipőt.', ['只']],
  ['{请|qǐng}{给|gěi}{我|wǒ}{一|yì}＿{筷子|kuài·zi}。', '双', 'Kérek egy pár evőpálcikát.', ['只']],
  ['{这|zhè}＿{裙子|qún·zi}{太|tài}{长|cháng}{了|le}。', '条', 'Ez a szoknya túl hosszú.', ['件']],
  ['{这|zhè}＿{路|lù}{很|hěn}{安静|ān·jìng}。', '条', 'Ez az utca nagyon csendes.'],
  ['{树|shù}{上|shang}{有|yǒu}{三|sān}＿{鸟|niǎo}。', '只', 'Három madár ül a fán.'],
  ['{我|wǒ}{想|xiǎng}{买|mǎi}{两|liǎng}＿{去|qù}{上海|Shàng·hǎi}{的|de}{票|piào}。', '张', 'Két jegyet szeretnék venni Sanghajba.'],
  ['{今天|jīn·tiān}{有|yǒu}{两|liǎng}＿{客人|kè·rén}{来|lái}{我|wǒ}{家|jiā}。', '位', 'Ma két vendég jön hozzánk.', ['个']],
  ['{这|zhè}＿{老师|lǎo·shī}{姓|xìng}{王|Wáng}。', '位', 'Ennek a tanárnak Wang a vezetékneve.', ['个']],
  ['{这|zhè}＿{话|huà}{是|shì}{什么|shén·me}{意思|yì·si}？', '句', 'Mit jelent ez a mondat?'],
  ['{我|wǒ}{给|gěi}{妈妈|mā·ma}{买|mǎi}{了|le}{一|yì}＿{茶|chá}。', '盒', 'Vettem anyának egy doboz teát.', ['杯', '瓶']],
  ['{这|zhè}{是|shì}{我|wǒ}{第一|dì·yī}＿{来|lái}{北京|Běi·jīng}。', '次', 'Most vagyok először Pekingben.', ['趟']],
  ['{你|nǐ}{一个|yí ge}{星期|xīng·qī}{游|yóu}{几|jǐ}＿{泳|yǒng}？', '次', 'Hetente hányszor úszol?', ['趟']],
  ['{我|wǒ}{去过|qù·guo}{两|liǎng}＿{上海|Shàng·hǎi}。', '次', 'Kétszer jártam már Sanghajban.', ['趟']],
  ['{请|qǐng}{你|nǐ}{再|zài}{说|shuō}{一|yí}＿。', '遍', 'Kérlek, mondd el még egyszer.', ['次']],
  ['{这|zhè}{本|běn}{书|shū}{我|wǒ}{看|kàn}{了|le}{两|liǎng}＿。', '遍', 'Ezt a könyvet kétszer olvastam végig.', ['次']],
  /* HSK 3 */
  ['{请|qǐng}{给|gěi}{我们|wǒ·men}{两|liǎng}＿{啤酒|pí·jiǔ}。', '瓶', 'Kérünk két üveg sört.', ['杯']],
  ['{他|tā}{吃|chī}{了|le}{两|liǎng}＿{米饭|mǐ·fàn}。', '碗', 'Két tál rizst evett meg.', ['口', '盒', '份']],
  ['{我|wǒ}{下午|xià·wǔ}{得|děi}{去|qù}{一|yí}＿{银行|yín·háng}。', '趟', 'Délután el kell ugranom a bankba.', ['次']],
  ['{我们|wǒ·men}{一起|yì·qǐ}{吃|chī}{一|yí}＿{饭|fàn}{吧|ba}。', '顿', 'Együnk egyszer együtt!', ['次', '碗', '盒']],
  ['{今天|jīn·tiān}{上午|shàng·wǔ}{我|wǒ}{有|yǒu}{四|sì}＿{课|kè}。', '节', 'Ma délelőtt négy órám van.', ['次']],
  ['{这|zhè}＿{饭馆|fàn·guǎn}{的|de}{菜|cài}{很|hěn}{好吃|hǎo·chī}。', '家', 'Ebben az étteremben nagyon finom az étel.', ['个']],
  ['{他|tā}{在|zài}{一|yì}＿{大|dà}{公司|gōng·sī}{工作|gōng·zuò}。', '家', 'Egy nagy cégnél dolgozik.', ['个']],
  ['{这|zhè}＿{大学|dà·xué}{很|hěn}{有名|yǒu·míng}。', '所', 'Ez az egyetem nagyon híres.', ['个']],
  ['{楼|lóu}{下|xià}{停|tíng}{着|zhe}{一|yí}＿{红色|hóng·sè}{的|de}{车|chē}。', '辆', 'A ház előtt egy piros autó áll.', ['台']],
  ['{我|wǒ}{想|xiǎng}{买|mǎi}{一|yì}＿{新|xīn}{电脑|diàn·nǎo}。', '台', 'Szeretnék venni egy új számítógépet.', ['个']],
  ['{老师|lǎo·shī}{让|ràng}{我们|wǒ·men}{写|xiě}{一|yì}＿{作文|zuò·wén}。', '篇', 'A tanár egy fogalmazást írat velünk.'],
  ['{他|tā}{找到|zhǎo·dào}{了|le}{一|yí}＿{新|xīn}{工作|gōng·zuò}。', '份', 'Talált egy új állást.', ['个']],
  ['{这|zhè}{家|jiā}{商店|shāng·diàn}{有|yǒu}{很多|hěn duō}＿{茶|chá}。', '种', 'Ebben a boltban sokféle tea van.', ['杯', '盒', '瓶']],
  ['{我|wǒ}{钓|diào}{到|dào}{了|le}{一|yì}＿{大|dà}{鱼|yú}。', '条', 'Fogtam egy nagy halat.', null, 3],
  ['{我|wǒ}{吃|chī}{了|le}{一|yí}＿{蛋糕|dàn·gāo}。', '块', 'Ettem egy szelet tortát.', ['个', '份'], 2],
  ['{出门|chū·mén}{别|bié}{忘|wàng}{了|le}{带|dài}{一|yì}＿{伞|sǎn}。', '把', 'Ha elindulsz, ne felejts el esernyőt vinni!', ['个'], 3]
];

const HANZIFLOW_MW_RULES = [
  ['Szám + mérőszó + főnév',
   '{三本书|sān běn shū} (három könyv). A kínaiban a szám nem kerülhet közvetlenül a főnév elé: a {三书|sān shū} hibás.'],
  ['这, 那, 哪, 几 után is',
   'A mutató- és kérdőszó után is kell mérőszó: {这本书|zhè běn shū}, {那个人|nà ge rén}, {哪件衣服|nǎ jiàn yī fu}？, {几个人|jǐ ge rén}？'],
  ['两, és nem 二',
   'Mérőszó előtt a „kettő" {两|liǎng}: {两个人|liǎng ge rén}. A {二|èr} a számolásban, a sorszámban és a hosszabb számok végén marad: {第二|dì èr}, {十二个月|shí èr ge yuè}.'],
  ['Sorrend: 这 + szám + mérőszó + főnév',
   '{这两本书|zhè liǎng běn shū} (ez a két könyv), {那三个人|nà sān ge rén} (az a három ember).'],
  ['A 个 a „mindenes"',
   'Emberekhez, gyümölcsökhöz, időszakokhoz és sok elvont szóhoz a {个|gè} illik. Beszédben olykor ott is hallod, ahol a pontos mérőszó más (asztal, szék) — ha a saját mérőszót tanulod meg, mindig jó lesz.'],
  ['Edény vagy tárgy?',
   '{一杯茶|yì bēi chá}: egy csésze tea (a csésze a mértékegység). {一个杯子|yí ge bēi zi}: egy csésze, mint tárgy.'],
  ['Az 一 tónusa',
   'Negyedik tónusú mérőszó (és a {个|gè}) előtt {一|yí}: {一个|yí ge}, {一件|yí jiàn}. A többi előtt {一|yì}: {一本|yì běn}, {一张|yì zhāng}.'],
  ['Ha már tudjuk, miről van szó',
   'A főnév elmaradhat, a mérőszó marad: {你要几个|nǐ yào jǐ ge}？ — {我要两个|wǒ yào liǎng ge}。 (Hányat kérsz? — Kettőt.)'],
  ['Igei mérőszó az ige után',
   '{我去过两次|wǒ qù guo liǎng cì}。 (Kétszer jártam már ott.) A {遍|biàn} az egész alkalmat számolja az elejétől a végéig: {再说一遍|zài shuō yí biàn} (mondd el még egyszer).']
];
