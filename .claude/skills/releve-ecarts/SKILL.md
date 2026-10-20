---
name: releve-ecarts
description: Relève les écarts de maquette d'un composant (ADR 0030) en comparant son nœud Figma aux valeurs calculées du catalogue, puis ouvre le ticket Jira ALV des écarts. Utiliser quand l'utilisateur demande de relever un composant, de comparer un composant à Figma, ou lance /releve-ecarts <Composant>.
---

# Relevé des écarts de maquette

Lancé sur un composant nommé (`/releve-ecarts Button`). Ne tourne jamais en CI (ADR 0030).
Vocabulaire : `docs/context/catalogue.md` (fiche, exemple d'axe).

## 1. Trouver le nœud

- Lire le `figmaURL` de la fiche (`packages/components/src/ui/<Composant>/<Composant>.stories.tsx`).
- Absent, ou pointant vers une page plutôt qu'un ensemble de composants (`COMPONENT_SET`) :
  demander le lien de l'ensemble à l'utilisateur, puis le fixer dans la fiche. Une page peut
  contenir d'anciens ensembles, que le relevé confondrait avec le bon.
- Un composant compagnon présenté dans la même fiche (ex. `ButtonIcon` dans la fiche `Button`)
  a son propre ensemble : demander son lien s'il n'est pas connu. Connus : `ButtonIcon` 3993:7863.

## 2. Lire Figma

Par le MCP Figma, en lecture seule (`use_figma`, après le skill `figma-use`). Pour chaque
variante de l'ensemble, relever : hauteur, marges intérieures, police (famille, taille, style de
texte), graisse, couleur du texte et du fond, rayon, bordure, et **le nom de la variable liée** à
chaque valeur. Relever aussi `componentPropertyDefinitions` de l'ensemble : ce sont les axes.

## 3. Contrôler les axes

Avant toute mesure, signaler et lister :

- un axe Figma mal nommé : il doit porter le nom de la prop du code, en minuscules, en anglais
  (`variant`, `size`, `leading`), plus `state` pour les états interactifs ;
- une valeur d'axe Figma sans exemple d'axe dans la fiche (le bouton de l'exemple porte le nom de
  la valeur avec une majuscule : `Secondary`, `Lg`, `Disabled`) ;
- à titre d'information, un exemple d'axe du code sans valeur Figma.

`state=hover` n'a pas d'exemple propre : il se mesure en survolant l'exemple `Default`.
Une valeur qui n'existe que pour une variante dans Figma (ex. `selected` en `secondary`) se
compare à cette variante.

## 4. Mesurer le catalogue

`releverExemple(page, { fiche, exemple, survol })` (`apps/docs/e2e/releve.ts`) rend les sept
propriétés calculées d'un exemple d'axe. L'appeler depuis un spec Playwright jetable dans
`apps/docs/e2e/`, qui écrit le résultat en JSON dans le scratchpad, puis supprimer le spec :

```bash
pnpm run build:packages && (cd apps/docs && pnpm run build)
cd apps/docs && OUT=<scratchpad>/releve.json npx playwright test e2e/<spec-jetable>.spec.ts
```

Mesurer à la densité que Figma dessine (ADR 0013) : si les hauteurs Figma suivent l'échelle
`mobile` de `packages/theme/src/constants/Control.ts`, passer le spec en viewport mobile
(`test.use({ viewport: { width: 390, height: 844 } })`). Une échelle du code absente de Figma est
elle-même un écart.

## 5. Présenter

Un tableau par exemple d'axe : propriété / Figma / code, seulement les lignes qui diffèrent, avec
pour chacune un **sens de correction proposé** (corriger le code, ou aligner Figma sur une
décision du code, en citant l'ADR qui l'a prise). Isoler les **écarts de variable** : même nom de
variable, valeurs différentes entre Figma et le thème, ou variable de mauvaise famille liée dans
Figma (ex. une variable `border/…` sur un texte). Les variables ne se comparent jamais au thème en
bloc.

Aucun écart n'est accepté : chacun finit dans le ticket.

## 6. Ouvrir le ticket

Un ticket ALV par composant, intitulé « Écarts de maquette : <Composant> », avec Contexte,
Critères d'acceptation, et les écarts en checklist ADF cochable (`taskList` / `taskItem`,
`contentFormat: "adf"`), un `taskItem` par écart avec son sens de correction. Citer dans le
Contexte la fiche, les nœuds Figma relevés et la densité de mesure.

## 7. Corriger

Ne modifier ni Figma ni le code avant que l'utilisateur ait validé l'écart et son sens. Une fois
validé, c'est l'agent qui modifie Figma (skill `figma-use`) ou le code (TDD), puis coche l'écart.
