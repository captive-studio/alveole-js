---
status: accepted
---

# La couleur de texte par défaut est portée par `Typography`

`Typography` déclare la couleur de texte par défaut du design system,
`light.text['default-grey']` (`#373A3F`), sous la forme d'une prop `color` que
l'appelant peut surcharger. Aucune règle ne la pose sur `body` ni sur `html`.

## Ce qui a déclenché la décision

Le texte du catalogue s'affichait en quasi noir au lieu du gris de la palette.
La chaîne était vide de bout en bout : `Typography` ne déclarait aucune couleur,
`A` ne fait que propager avec `color: inherit`, `@alveole/theme` n'émet que
l'`@import` des polices et le bloc `:root` depuis
[l'ADR 0008](./0008-aucun-style-global-depuis-le-design-system.md), et
`apps/docs` ne pose aucune couleur sur `body`. Faute de valeur, le rendu
retombait sur le `$color` du thème tamagui v3.

Ce n'était pas une régression du retrait du `font-smoothing` global : ce bloc ne
portait aucune couleur. Le défaut n'avait simplement jamais été branché.

## Pourquoi le composant plutôt que `body`

Une règle `body { color: var(--text-default-grey) }` dans `apps/docs` aurait
corrigé la vitrine et laissé les applications clientes en noir. Le catalogue est
un consommateur du design system comme un autre : ce qui y manque manque partout.

L'ADR 0008 interdit au paquet de thème d'émettre un style d'élément. Le défaut
devait donc vivre là où le design system décide déjà du rendu : dans le composant
qui porte tout le texte.

## Pourquoi une prop `color` et non le `style`

Le défaut est passé en prop, pas fusionné dans `style`. C'est ce qui garantit
qu'aucun composant existant ne change d'apparence : sur les 88 usages internes de
`Typography`, tous passent leur couleur par `style`, qui l'emporte sur la prop.
Le seul à passer `color` est `FormControlCaption`, et il le fait explicitement,
donc il l'emporte aussi sur le défaut. Vérifié dans
l'application en marche, après le changement : le texte d'un `Button` primaire
reste `rgb(242, 249, 255)`, un secondaire `rgb(21, 22, 23)`, un désactivé
`rgb(141, 151, 172)`, pendant que le texte nu d'un lien passe à
`rgb(55, 58, 63)`.

## Conséquences

- La valeur est lue dans le thème au travers de `makeStyles`, pas figée à
  l'import : un thème personnalisé la déplace sans toucher au composant.
- `Typography` devient un composant qui consomme le thème, donc qui exige un
  `ThemeProvider` au dessus de lui. C'était déjà le cas de tous les composants
  qui utilisent `makeStyles`.
- Le défaut ne touche que le texte qui ne déclare aucune couleur. Les titres
  posent déjà la leur : le `h1` d'une page du catalogue mesure
  `rgb(21, 22, 23)`, soit `light.text['title-grey']`, avant comme après.
- Le jour où un autre défaut de rendu manquera (interlignage, famille de police),
  il se posera au même endroit et de la même façon, pas dans une règle globale.
