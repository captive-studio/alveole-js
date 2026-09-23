---
status: accepted
---

# Anatomie d'un dossier de composant

Un composant vit dans son dossier `src/{core,ui}/<Composant>/` et y rassemble :

- `<Composant>.tsx` : la structure et le comportement, sans style en dur.
- `<Composant>.styles.ts` : les styles, déclarés avec `makeStyles` de `@alveole/theme` et lus
  par un hook `useStyles`. Un style qui dépend d'un état (taille, survol, sélection) se calcule
  dans un module dédié (`tagStyling.ts`, `buttonStyling.ts`), pas dans le composant.
- `<Composant>.stories.tsx` : le module de stories, qui démontre les différents usages du
  composant (variants, tailles, états, cas limites) plutôt qu'un exemple unique. C'est la
  documentation du composant dans le catalogue.
- Des tests (`*.test.tsx`, `*.test.web.tsx`) ciblés sur les cas particuliers qui ont déjà
  régressé ou qui risquent de le faire, pas une couverture exhaustive.

## Pourquoi

Séparer le style du composant garde le `.tsx` lisible et concentre dans un seul fichier ce qui
change quand la maquette change. Le module de stories sert à la fois de documentation et de
banc visuel (l'audit d'accessibilité et la régression visuelle passent par les exemples, voir
ADR 0006 et 0011) : un usage absent des stories n'est ni documenté ni audité. Les tests visent
les régressions, parce que le rendu courant est déjà couvert par les stories.

## Conséquences

Le fichier `.styles.ts` est la norme, pas une obligation : un composant qui n'a presque rien à
styler (un simple assemblage d'autres composants, un style réduit à une ou deux propriétés) peut
s'en passer. Dès que le style grossit ou dépend du thème, il part dans son fichier.
