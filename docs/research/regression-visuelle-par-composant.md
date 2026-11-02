# Recherche : capturer les composants plutôt que les pages du catalogue

Date : 2026-11-02. Sources primaires uniquement : code d'Alveole (`main` au commit `d55783255`),
code source des références lu sur GitHub (API `gh`, `raw.githubusercontent.com`) et sur le miroir
Bitbucket d'Atlassian, documentation officielle des outils.

- Primer React, `main` : https://github.com/primer/react (`e2e/`, `playwright.config.ts`,
  `.github/workflows/vrt.yml`, `.github/workflows/vrt-reports.yml`, `contributor-docs/testing.md`)
- Atlassian : miroir public https://bitbucket.org/atlassian/atlassian-frontend-mirror
  (`design-system/button/src/__tests__/vr-tests/`)
- Base Web, `main` : https://github.com/uber/baseweb (billet officiel
  `documentation-site/pages/blog/visual-regression-testing/index.mdx`, daté du 16 décembre 2019)
- Playwright : https://playwright.dev/docs/api/class-locatorassertions ,
  https://playwright.dev/docs/test-snapshots
- Storybook : https://storybook.js.org/docs/writing-tests/visual-testing
- Argos : https://argos-ci.com/docs/playwright
- Lost Pixel : https://docs.lost-pixel.com/user-docs

## Résumé

Aujourd'hui un cliché couvre le repère `<main>` d'une fiche entière : en-tête, description,
titres et descriptions d'exemples, blocs de code source, plus les rendus. Tout texte de doc
fait donc changer l'image. Les trois références capturent **un rendu isolé du composant**,
jamais une page de documentation : Primer capture l'iframe d'une story Storybook, Atlassian
capture des exemples dédiés au test (`*.vr.ap`), Base Web capturait des « scenarios » servis
chacun sur sa propre page. Le découplage du texte de doc ne passe chez aucun d'eux par un
masque : il vient de ce que la surface capturée ne contient pas de doc. L'hypothèse
« capturer les composants, pas les pages » est donc celle de toutes les références, avec une
nuance : elles capturent une **page dédiée** à un exemple (story, exemple VR), pas un élément
découpé dans la page de doc. Le prix est un nombre de clichés bien plus grand (Primer : 7 776
PNG, 4 à 8 runners en parallèle).

## 1. Alveole : comment ça marche aujourd'hui

### Faits

- **Une seule suite, greffée sur l'audit axe.** `apps/docs/e2e/accessibility.spec.ts` boucle sur
  `auditedRoutes()` ; pour chaque route, audit axe (assertion souple) puis
  `expect(main).toHaveScreenshot(snapshotName(route), { mask })` sur `page.getByRole('main')`
  (lignes 15-31). C'est le seul `toHaveScreenshot` du dépôt.
- **Les pages viennent du sitemap** du build : `/components`, chaque `/components/<Fiche>` et les
  pages `/theme/*` (`apps/docs/e2e/pages.ts:15-38`). Aucune liste tenue à la main.
- **76 clichés** mesurés dans `apps/docs/e2e/__screenshots__` (20 Mo sur disque, jusqu'à 2,3 Mo
  par PNG), nommés comme la route (`components/Button.png`, `apps/docs/e2e/cliches.ts:8-15`).
- **Déterminisme** (`apps/docs/e2e/cliches.ts`) : horloge figée à `2026-01-15T10:00:00Z`
  (`FROZEN_TIME`), masque du `canvas` sur la seule fiche Lottie (`ANIMATED_ZONES`), fenêtre
  agrandie de la hauteur que le conteneur de défilement cache (`revealWhole`), tiers bloqués
  (`blockThirdParties`, `beforeEach` de la spec). Animations CSS figées par le défaut de
  Playwright. Aucune tolérance (`maxDiffPixels`, `threshold`) n'est configurée.
- **Config Playwright** (`apps/docs/playwright.config.ts`) : un projet Desktop Chrome,
  `ignoreSnapshots: !process.env.CI` (jamais de comparaison en local),
  `snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}'`, site statique `expo export`
  servi par `serve`, timeout 90 s par test.
- **Comparaison** : job `web` de `.github/workflows/ci.yml` (lignes 146-196), étape
  « Run catalogue audit (axe + screenshots) », `pnpm run test:a11y`, dans le conteneur épinglé
  par digest `ghcr.io/captive-studio/node-ci-chromium:24.22.2@sha256:895ed…`.
- **Régénération** : `.github/workflows/catalogue-screenshots.yml`, `workflow_dispatch` interdit
  sur `main`. Même conteneur, rebuild complet, `rm -rf e2e/__screenshots__` puis
  `--update-snapshots=all`, contrôle « un cliché par page », commit `📸` poussé par le bot, puis
  relance de `ci.yml`. Le déclenchement vaut validation (ADR 0011).
- **Ce que contient `<main>`** : `StoryDetailScreen` (`packages/storybook/src/screens/StoryDetailScreen.tsx:41-77`)
  rend titre, résumé, `EnTeteDeFiche`, onglets, puis `ExemplesDeLaStory`
  (`packages/storybook/src/components/ExemplesDeLaStory.tsx`) : pour chaque exemple, un titre
  ancré, une description Markdown, puis `ExampleBlock` (`packages/storybook/src/components/ExampleBlock.tsx`)
  qui contient la **scène** (`Scene`, le rendu du composant) et la **source** (barre + code,
  12 lignes visibles). Le rendu du composant n'est donc qu'une partie de l'image.
- **Grain des exemples** : 72 fichiers `*.stories.tsx` dans `packages/`, environ 295
  `export const` (compte grossier par `grep`, qui inclut d'éventuels exports qui ne sont pas des
  exemples).
- **Fréquence** : 41 commits ont touché les clichés depuis le 2026-08-01 (`git log -- apps/docs/e2e/__screenshots__`),
  dont un retour arrière « ⏪ Remet le cliché de Form, changé par un artefact de rendu »
  (`f62bf1c16`).

### Ce que disent les ADR

- **0011** (`docs/adr/0011-regression-visuelle-greffee-sur-l-audit.md`) : greffe sur l'audit pour
  ne pas payer un second `expo export` (2,47 Gio de RSS, risque OOM sur le pool) ; `<main>` retenu
  contre la page entière. Le cliché **par exemple** avait été envisagé et écarté : « plusieurs
  centaines de clichés et un `testID` à poser dans `StoryDetailScreen` ». « Le grain plus fin
  s'ajoutera si les différences se révèlent illisibles, pas avant. » Masques un par un, pas de
  tolérance globale ; clichés versionnés dans git, LFS écarté pour l'instant.
- **0012** (`docs/adr/0012-la-colonne-auditee-une-fois.md`) : précédent de découpage du périmètre
  (la colonne auditée une fois) ; la piste « plusieurs fiches dans un même document » a été
  écartée, le démarrage ne pesant que 598 ms sur 1 750.
- **0006** (`docs/adr/0006-audit-accessibilite-en-cliquet.md`) : pages issues du build, refus
  d'écarter globalement ce qui ne pose problème qu'à un endroit.
- **0027** (`docs/adr/0027-chaque-assertion-au-niveau-qui-sait-la-prouver.md`) : le visuel vit au
  niveau 3 (Playwright, pages du catalogue). Toute option qui change la surface capturée reste
  dans ce niveau.

### Lecture

Le défaut constaté découle directement du choix de 0011 : `<main>` coupe le gabarit, pas la doc.
Un changement de description, de titre d'exemple ou de source affichée (`sourceDeLExemple`)
modifie le cliché, et un changement de hauteur décale tout ce qui suit dans l'image.

## 2. Les références

### Primer React (GitHub)

- **Surface** : l'iframe isolée d'une story, pas la doc. `visit()` ouvre
  `${STORYBOOK_URL}/iframe?id=<story>&viewMode=story` avec des `globals` (thème)
  (`e2e/test-helpers/storybook.ts`, fonction `visit`).
- **Capture** : `await expect(page).toHaveScreenshot(\`Button.${story.title}.${theme}.png\`)`, une
capture de la fenêtre et non d'un locator, par story et par thème
(`e2e/components/Button.test.ts:179-194`). Neuf thèmes (`e2e/test-helpers/themes.ts`).
- **Déterminisme** : attente de `#storybook-root > *`, de `document.fonts.ready` et des images ;
  avatars distants remplacés par une image locale (`page.route('https://github.com/*.png', …)`,
  `storybook.ts`). Config : `reducedMotion: 'reduce'`, `animations: 'disabled'`, `caret: 'hide'`,
  fenêtre fixe 1012×768, `retries: 2` en CI (`playwright.config.ts`). Pas de seuil configuré.
- **Volume et coût** : 78 fichiers de test dans `e2e/components`, 7 776 PNG sous
  `.playwright/snapshots` (arbre git de `main`). La comparaison tourne sur 8 shards
  (`vrt-reports.yml`, `matrix.shard: [1..8]`), la régénération sur 4 shards déclenchée par le
  label de PR `update snapshots` (`vrt.yml`), dans `mcr.microsoft.com/playwright:v1.60.0-jammy`.
  La doc contributeur précise que le job « is broken up into several runners to speed up »
  (`contributor-docs/testing.md:240-242`).
- **Tag** : seuls les tests marqués `@vrt` sont des clichés (`--grep @vrt`) ; les mêmes fichiers
  portent des assertions `toHaveCSS` sans image (`Button.test.ts:112-150`).
- **Web seulement** : Primer React est une bibliothèque web.

### Atlassian Design System

- **Surface** : des exemples **dédiés au test visuel**, suffixés `.vr`, distincts du test :
  `snapshot(ButtonExample, …)` importe `../../../examples/05-button.vr.ap`
  (`design-system/button/src/__tests__/vr-tests/button.vr.tsx`).
- **États et variantes déclarés** : `description: 'Hovered'`,
  `states: [{ state: 'hovered', selector: { byTestId: 'the-button' } }]`, `variants: themeVariants`
  (deux variantes : défaut et `colorScheme: 'light'`, `vr-tests/utils.tsx`). Un PNG par
  description et variante : `resting--default.png`, `hovered--light.png`…
  (`vr-tests/__snapshots__/button/`). 21 dossiers de clichés pour Button.
- **Désactivation ciblée** : `snapshot.skip(AppearancesExample, …)` avec un ticket de réactivation
  (`vr-tests/appearances.vr.tsx`).
- **Non vérifié** : l'outil `@af/visual-regression` n'est pas publié sur npm (404 sur le registre)
  et son code n'a pas été lu ; moteur de capture, cadrage, seuils, environnement et coût CI
  restent inconnus. On ne sait pas non plus si les exemples `.vr` apparaissent dans la doc
  publique. La recherche web n'a renvoyé aucune doc officielle sur le sujet.

### Base Web (Uber)

- **Surface** : chaque « Storybook scenario » servi sur sa propre page ; « We take one snapshot of
  a component at desktop size, one snapshot for mobile, one for our dark theme »
  (billet, ligne 152). Toute scenario devient un test sans configuration (ligne 230).
- **Cadrage** : capturer seulement l'élément racine a été **abandonné** : les éléments
  positionnés en absolu (modale, menu) ne comptent pas dans sa taille, et la largeur variait ;
  remplacé par un `clip` à largeur fixe sur toute la hauteur (lignes 261-275).
- **Déterminisme** : Docker comme « environment of truth » (ligne 180), CSS qui coupe animations
  et transitions (lignes 294-305), attentes sur assertions plutôt que `waitForTimeout`
  (lignes 312-339).
- **Coût** : « over half a million snapshots a month » sur chaque commit de PR, raison du refus
  des SaaS facturés au cliché (ligne 120 environ) ; 5 à 8 min de CI (ligne 373).
- **Flux** : en cas de différence, la CI pousse une branche et ouvre une PR de clichés vers la PR
  d'origine (lignes 160-165), proche de notre `catalogue-screenshots.yml`.
- **À signaler** : ce dispositif date de 2019. Sur `main` aujourd'hui, `toMatchImageSnapshot`
  n'apparaît plus que dans le billet (recherche de code GitHub) et aucun dossier `vrt` n'existe :
  le système semble retiré, sans qu'on ait trouvé quand ni pourquoi.

### Synthèse des références

| question                  | Primer                | Atlassian               | Base Web (2019)            |
| ------------------------- | --------------------- | ----------------------- | -------------------------- |
| surface                   | iframe de story       | exemple `.vr` dédié     | page par scenario          |
| capture                   | fenêtre (`page`)      | non vérifié             | `clip` largeur fixe        |
| texte de doc dans l'image | non                   | non                     | non                        |
| états (survol, focus)     | stories dédiées       | `states` déclaratifs    | « interactions » en config |
| thèmes / largeurs         | 9 thèmes, une largeur | 2 variantes             | bureau, mobile, sombre     |
| volume                    | 7 776 PNG, 8 shards   | 21 dossiers pour Button | 500 000 clichés/mois       |
| natif                     | non                   | non vérifié             | non (web)                  |

## 3. Les outils

- **Playwright `toHaveScreenshot`** (https://playwright.dev/docs/api/class-locatorassertions) :
  existe sur `page` et sur un **locator** ; attend deux captures consécutives identiques avant de
  comparer. Défauts : `animations: "disabled"`, `caret: "hide"`, `threshold: 0.2` (tolérance de
  couleur par pixel), `maskColor: #FF00FF` ; `maxDiffPixels` et `maxDiffPixelRatio` n'ont pas de
  valeur imposée hors `expect` de la config. `stylePath` injecte une feuille de style avant la
  capture, l'exemple officiel masque les `iframe` (https://playwright.dev/docs/test-snapshots).
  Même page : « Browser rendering can vary based on the host OS, version, settings, hardware »,
  et il faut comparer dans l'environnement qui a produit la référence.
- **Storybook / Chromatic** (https://storybook.js.org/docs/writing-tests/visual-testing) : « every
  story is automatically turned into a test », comparaison des pixels de chaque story. Service
  cloud. Les pages Docs/MDX ne sont pas évoquées. **Non vérifié** : tarif, TurboSnap.
  Alveole n'utilise pas Storybook : `packages/storybook` est un catalogue maison, et aucune
  dépendance `@storybook/*` n'apparaît dans les `package.json`.
- **Argos** (https://argos-ci.com/docs/playwright) : `argosScreenshot(page, name)`, accepte un
  locator ; stabilisation par défaut (polices, images, `aria-busy`, `animations: "disabled"`) ;
  attributs `data-visual-test="transparent"` / `"removed"` pour exclure une zone en gardant ou non
  sa place. Comparaison et revue côté service. **Non vérifié** : tarif, hébergement des images.
- **Lost Pixel** (https://docs.lost-pixel.com/user-docs) : moteur open source plus plateforme
  SaaS ; modes Storybook, Ladle, Histoire, pages et captures personnalisées (Playwright).
  **Non vérifié** : stockage des références en mode open source, Docker.
- **Natif** : aucune des sources lues ne capture un rendu React Native natif ; toutes capturent du
  web. Rien n'a été vérifié côté outils natifs (non demandé dans les sources ci-dessus).

## 4. Options pour Alveole

Sans arbitrage : chaque option est décrite avec ce qu'elle coûte.

### A. Garder `<main>` et neutraliser la doc par masque ou `stylePath`

Masquer (`mask`) ou rendre invisible (`stylePath` avec `visibility: hidden`) les descriptions,
titres et blocs de source dans la capture actuelle.

- Pour : changement minime, un cliché par page, 76 PNG, aucun coût CI.
- Contre : un texte plus long reste visible par la hauteur qu'il prend, donc décale les rendus
  et change l'image. `visibility: hidden` garde la place, `display: none` changerait la mise en
  page capturée. Les masques sont des rectangles roses dans la référence. Contraire à l'esprit de
  0011 (masquer l'instable, pas le contenu), mais ici le masque vise la doc, pas une animation.

### B. Un cliché par scène d'exemple, dans la page de fiche actuelle

Boucler sur les scènes d'`ExampleBlock` d'une fiche déjà chargée et appeler
`toHaveScreenshot` sur chaque scène (locator).

- Pour : aucune nouvelle page, aucun build en plus, garde la greffe sur l'audit (0011) et son
  attente de chargement. La capture d'un locator ignore ce qui l'entoure, donc texte et code
  disparaissent de l'image sans masque. L'échec nomme la fiche et l'exemple.
- Contre : environ 295 clichés au lieu de 76 (compte à confirmer) ; il faut un sélecteur stable
  pour la scène, donc un repère dans `ExampleBlock` (le « `testID` dans `StoryDetailScreen` »
  écarté par 0011). Limite relevée par Base Web : un élément en position absolue (menu, toast,
  modale) qui déborde de la scène est coupé. La scène porte la trame et le padding du catalogue :
  un changement de catalogue change tous les clichés. Temps : 0,2 à 0,5 s par capture selon 0011,
  soit de l'ordre de 1 à 2,5 min ajoutées, **non mesuré**.

### C. Une page de rendu isolé par exemple (modèle Primer / Base Web)

Exporter une route sans gabarit ni doc, par exemple `/render/<Fiche>/<Exemple>`, et capturer la
page ou son contenu.

- Pour : surface identique aux références ; rien ne dépend du gabarit ni de la scène ; une
  modale ou un menu qui débordent restent visibles avec un `clip` de largeur fixe (Base Web).
  Ouvre la porte aux états (survol, focus) et aux thèmes comme Atlassian.
- Contre : nouvelles routes dans l'export statique (temps de build et sitemap, non mesurés),
  hydratation payée par exemple (environ 0,6 s de démarrage par page d'après 0012) : sur ~295
  pages, plusieurs minutes de chemin critique, à mesurer, peut-être du sharding. Découple la
  capture de l'audit axe, qui reste sur les fiches.

### D. Exemples dédiés au test visuel (modèle Atlassian)

Des exemples `*.vr` écrits pour le test, séparés des exemples de doc, capturés par B ou C.

- Pour : les exemples de doc deviennent libres de changer ; on choisit les états couverts
  (survol, focus, désactivé) au lieu d'hériter de ce que la doc montre.
- Contre : une seconde collection d'exemples à maintenir par composant ; la couverture dépend de
  la discipline à les écrire, alors qu'aujourd'hui toute fiche est capturée sans rien déclarer
  (0006, 0011).

### E. Outil tiers (Chromatic, Argos, Lost Pixel)

- Pour : revue visuelle hébergée, stabilisation fournie (Argos), plus de PNG dans git.
- Contre : Chromatic suppose Storybook, absent ici ; facturation au cliché qui grandit avec B, C,
  D (argument de Base Web) ; dépendance externe, alors que 0011 a choisi git pour la revue dans la
  PR. Tarifs non vérifiés.

### Points transverses à trancher

- Grain : page, scène, exemple dédié.
- Seuil : aucun aujourd'hui ; Primer n'en configure pas non plus. Le retour arrière `f62bf1c16`
  (« artefact de rendu ») est le seul indice de bruit relevé.
- Volume dans git : 20 Mo pour 76 PNG ; des clichés de scène seraient plus petits mais plus
  nombreux, poids total **non mesuré**.
- Natif : aucune référence ne le fait ; rester web seulement ou non.
- Coexistence : garder ou non un cliché de fiche en plus des clichés de composant pour surveiller
  le catalogue lui-même.

## Non vérifié

- Atlassian : moteur, cadrage, seuils, CI de `@af/visual-regression` (code non public).
- Base Web : date et raison du retrait apparent du dispositif.
- Tarifs Chromatic, Argos, Lost Pixel ; stockage des références de Lost Pixel en open source.
- Temps réel des options B et C sur notre CI, poids des clichés de scène, nombre exact d'exemples
  (295 est un comptage `grep`).
