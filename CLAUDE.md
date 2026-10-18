# HanziFlow — Claude projekt-kontextus

> Rövid, aktuális leírás: mi a projekt, hol mi van, milyen szabályok szerint dolgozunk.
> Utoljára rendbe téve: 2026-10-18.

## 1. Mi a projekt

**HanziFlow** — magyar nyelvű kínai (mandarin) nyelvtanuló webapp kezdőknek. A kezdőlapon vezetett
**tanulási út** áll (előkészítő fejezet: pinyin és tónusok, utána a HSK 1–3 szint témái leckénként),
mellette **gyakorló modulok**, **időzített ismétlés** és **statisztika**.

- **Alap:** a NihonCore (japán testvér-app) váza — kör-keret, lobbi, tanulási út, lecke-oldal, ismétlés-ütemező,
  statisztika, szinkron, PWA —, a japán-specifikus részek nélkül, **saját arculattal**.
- **Stack:** sima HTML / CSS / JS, nincs keretrendszer, nincs build. Élesítés: GitHub Pages a `main` ágról
  (`github.com/Nokedli25TTV/HanziFlow`).
- **Fiók:** ugyanaz a Firebase-projekt, mint a NihonCore-é (egy belépés mindkettőhöz). A HanziFlow a
  `users/{uid}/apps/hanziflow` dokumentumba ír — a Firestore-szabályokban ezt a helyet engedélyezni kell.
- **A user nyelve magyar: válaszolj magyarul**, a felület magyar.
- **Írás:** egyszerűsített (简体). **Cél:** HSK 1–2 kész, a HSK 3 készül.

## 2. Munkaszabályok (user-döntések)

- **Minden commit után push a GitHubra, kérdés nélkül** (user-kérés, 2026-10-17).
- **A forrásokból csak ötletet merítünk**: a `Tananyagok/` könyveiből legfeljebb a leckék címeit, témáit és
  sorrendjét nézzük meg; **minden magyarázat, párbeszéd és példamondat saját szöveg**. A `Tananyagok/` soha
  nem kerülhet a repóba (`.gitignore`).
- **Pinyin-motor nincs** (user-kérés): a pinyin a szövegben áll, `{汉字|hànzì}` jelöléssel.
- Ellenőrzés **szerver nélkül**: fej nélküli Chrome a helyi fájlokon (`file://`), `node --check`.
  Ne indíts localhostot, ne hozz létre `.claude/launch.json`-t.
- Kiadásnál a `sw.js` `CACHE_VERSION`-jét léptetni kell. A Service Worker csak a `hanziflow-` kezdetű
  tárakat törli (a NihonCore ugyanazon a címen fut).

## 3. Fájlszerkezet

```
index.html            kezdőlap: szintválasztó / „Folytatás", napi cél, ismétlés, a tanulási út térképe
pages/lesson.html     lecke (?id=l0…l36 · l1–l15 HSK 1, l16–l30 HSK 2, l31-től HSK 3 · &round=listen | read · ?review=1 = napi ismétlés)
pages/tones.html      Tónus-tréner (hallás után · jelölés · szópárok)
pages/modules.html    a modulok kártyái („Szabad gyakorlás")
pages/stats.html      statisztika · login.html · register.html
css/style.css         a teljes stíluslap (tokenek → váz → kezdőlap → kör-keret → statisztika → lecke → tónusok)
css/auth.css          a belépő oldalak kiegészítése
js/app.js             minden logika: közös részek + oldalanként egy init…Page()
js/auth.js · sync.js  HanziFlowAuth (Firebase Auth) · HanziFlowSync (Firestore)
js/data/core.js       HANZIFLOW_PATH + HANZIFLOW_PATH_UNITS (a tanulási út)
js/data/course.js     HANZIFLOW_COURSE (a leckék; a séma a fájl elején)
js/data/tones.js      a Tónus-tréner adatai
sw.js · manifest.webmanifest · img/ (ikonok)
```

Oldal-felismerő (`initCurrentPage`, az `app.js` végén) a `<main>` azonosítója szerint: `statsMain`,
`tonesMain`, `lessonMain`, `.auth-card`, `homeMain`.

## 4. Kínai szöveg a leckékben

- Jelölés: `{我|wǒ}{是|shì}{学生|xué·sheng}。` — a hanzi fölé a pinyin kerül. Ha a pinyin szótagjai
  (szóköz vagy `·`) annyian vannak, ahány írásjegy, **írásjegyenként** áll fölötte; a `·` a kiírt
  pinyinből eltűnik (xuésheng). A felolvasás az írásjegyeket kapja (Google TTS `zh-CN`, tartalék: a böngésző hangja).
- Minden kínai szöveg `lang="zh-CN"` (különben japán írásjegy-változat jelenhet meg). Betű: Noto Sans SC.
- A `不` és `一` tónusváltását a pinyin a ténylegesen ejtett tónussal írja (bú kèqi), a 3+3 változást nem (nǐ hǎo).
- 🔴 A lecke `quiz` tömbjének sorrendje azonosító (ismétlés-ütemező kulcs: `lesson:<id>:<sorszám>`): új kérdés a végére.

## 5. Tárolás (localStorage, minden kulcs `hanziflow_` előtagú)

Szinkronizált: `sessions_v1` (munkamenet-napló), `srs_v1` (ismétlés), `path_v1` (út), `goal_v1` (napi cél),
`tones_profile_v1`, `tones_settings_v1`. Eszköz-helyi: `theme`, `helpers_*`, `audio_on`, `toc_v1`, `lesson_pos_v1` stb.
Új szinkronizálandó kulcs → a `sync.js` `EXACT_KEYS` listájára.

## 6. Design (style.css `:root`)

Meleg rizspapír alap (`--paper`), tus szöveg (`--ink*`), **jáde fő szín** (`--brand*`: gomb, kijelölés, haladás),
**cinóber pecsét** kiemelés (`--seal*`: címkék, logó, a lépés jele), külön visszajelzés-színek (`--ok*`, `--err*`,
`--amber*`), tónus-színek (`--tone1…4`). Felületek: tömör papír-kártyák (`.glass-panel` néven, a JS miatt),
**nincs elmosás**. A térkép csomópontjai írásgyakorló négyzetek (米字格). Sötét téma: `html.theme-ink`.
Színt csak tokenből; 12 px alatt nincs szöveg; érintési célpont ≥ 44 px; nincs dőlt és talpas betű.

## 7. Nyitott

- [x] HSK 1: előkészítő + mind a 15 lecke (párbeszéd, 5 nyelvtani pont, olvasmány, 16–19 kérdés leckénként).
- [x] HSK 2: mind a 15 lecke (l16–l30; kicker és jelvény a HSK 2-n belüli sorszámot mutatja, a kereszthivatkozások „HSK 2 N. lecke" alakúak).
- [ ] HSK 3 leckék (l31–l50, 20 lecke; kész: 1–6. = l31–l36).
- [ ] Modulok: Pinyin-tábla, Mérőszavak, Mondat-Mester, Dátum/idő/pénz, dolgozatok, HSK 1–2 próbavizsga.
- Élő oldal: https://nokedli25ttv.github.io/HanziFlow/ (GitHub Pages, main ág, 2026-10-18 óta).
- [ ] A NihonCore `sw.js`-ében a cache-törlést a saját előtagra kell szűkíteni (különben a HanziFlow offline-tárát is törli).
- [ ] Firestore-szabály a `users/{uid}/apps/{app}` helyre (a user Firebase-konzolján).
- [ ] A kínai mondatokat és a pinyint anyanyelvi lektor nem látta; a hangot valódi telefonon kell kipróbálni.
