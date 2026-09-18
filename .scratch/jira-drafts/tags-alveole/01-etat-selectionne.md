# Ajouter l'état sélectionné (actif) au Tag

**Publication Jira :** à créer
**Projet :** `ALV`
**Label à appliquer :** `ready-for-agent`

## Parent

spec.md (épic "Faire évoluer le composant Tag : fermeture, icône et état sélectionné")

## What to build

Ajouter une prop `selected?: boolean` (défaut `false`) au composant `Tag`
(`packages/components/src/ui/Tag/`), qui fait basculer sa bordure et la couleur de
son texte, pour représenter un tag actif dans un groupe de filtres — sur les deux
tailles `sm` et `md`.

- Non sélectionné (comportement actuel, inchangé) : bordure 1px
  `border/default-grey` (`#dee3ec`), texte `text/mention-grey` (`#5f6571`).
- Sélectionné : bordure 1px `border/contrast-grey` (`#8d97ac`), texte
  `text/default-grey` (`#373a3f`).
- Le fond du tag (`background/contrast-grey`, `#eff1f6`) ne change pas selon l'état
  sélectionné.
- Cette évolution est purement additive : un `Tag` sans la prop `selected` (ou avec
  `selected={false}`) doit rendre exactement le même résultat qu'aujourd'hui.

## Acceptance criteria

- [ ] Le composant `Tag` accepte une prop `selected?: boolean`, par défaut `false`.
- [ ] Quand `selected` est `true`, la bordure du tag passe à `border/contrast-grey`.
- [ ] Quand `selected` est `true`, la couleur du texte passe à `text/default-grey`.
- [ ] Quand `selected` est `false` ou absent, le rendu est strictement identique à la
      version actuelle du composant (mêmes couleurs de bordure et de texte).
- [ ] Le comportement est identique sur les tailles `sm` et `md`.
- [ ] Le comportement est identique sur les deux couleurs existantes (`default`,
      `action`).
- [ ] Un test unitaire (nouveau fichier `Tag.test.tsx`, sur le modèle de
      `Button.test.tsx`) couvre le rendu par défaut et le rendu sélectionné.
- [ ] Une nouvelle story Storybook illustre les deux états côte à côte.

## Blocked by

None (peut démarrer immédiatement — fondation des tickets suivants).
