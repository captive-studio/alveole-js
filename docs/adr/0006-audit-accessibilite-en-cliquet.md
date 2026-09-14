---
status: accepted
---

# L'audit d'accessibilité fige les violations connues plutôt que d'exiger le zéro

Chaque page du catalogue de documentation est auditée par axe dans un vrai
navigateur, et le résultat est comparé à une référence versionnée,
`apps/docs/e2e/a11y-baseline.json`. Une violation nouvelle fait échouer la CI ;
une violation déjà connue la laisse passer. C'est le même cliquet que les
seuils de couverture : un garde-fou contre l'érosion, pas un objectif de
qualité.

Le premier audit a relevé 1001 violations sur les 77 pages, aucune page
propre. Exiger le zéro avant de brancher la CI revenait à corriger une
vingtaine de composants publiés avant d'avoir le moindre garde-fou en place, et
donc à laisser le champ libre aux régressions pendant tout ce temps.

## Ce qui est audité, et ce qui ne l'est pas

Les pages auditées sont celles que `expo export` a réellement produites, pas une
liste tenue à la main : une story ajoutée est auditée sans rien déclarer. En
contrepartie, un export incomplet ne produirait aucun test et donc une CI verte
à tort, d'où le refus explicite d'un build sans page de composant.

Quatre règles sont désactivées : `region`, `landmark-one-main`,
`page-has-heading-one`, `landmark-unique`. Elles portent sur la structure du
document qui héberge un composant — un unique `<main>`, un `<h1>`, tout le
contenu dans une région — ce qui est la responsabilité de l'application qui
consomme le design system, pas celle des composants publiés. Elles pesaient 800
des 1001 violations : les garder actives aurait noyé le signal réel sous le
bruit du catalogue.

Le trafic sortant du serveur local est coupé pendant l'audit. axe descend dans
les iframes, et les stories qui en embarquent une vers un service tiers
faisaient auditer du HTML distant : des violations qui ne sont pas les nôtres,
et intermittentes selon que le chargement distant avait abouti avant le scan.
Les règles portant sur l'élément `<iframe>` lui-même, celui que le design
system produit, restent évaluées.

## Ce que la référence enregistre

Un nombre d'occurrences par page et par règle, pas la liste des éléments
fautifs. Les sélecteurs produits par Tamagui
(`._bbrr-radius-lg._btrr-radius-lg:nth-child(3) > box`) changent au moindre
ajustement de style : une référence bâtie dessus se serait invalidée en
permanence sans qu'aucun problème d'accessibilité n'ait bougé.

Le prix de ce choix : la référence ne dit pas _quel_ élément est fautif. Le
message d'échec le donne, lui, à partir de l'audit courant.

## Conséquences

- Le cliquet joue dans les deux sens. Une violation corrigée mais non retirée de
  la référence fait aussi échouer la CI, avec la consigne de resserrer. Sans
  cette seconde moitié, la référence ne redescendrait jamais.
- La référence se regénère avec `npm run test:a11y:baseline --workspace=apps/docs`,
  jamais à la main. Le script pilote un seul navigateur en série, là où les
  tests s'exécutent en parallèle et écriraient tous dans le même fichier.
- Les 199 violations figées au départ ne sont pas un acquis : 33 `label` et
  5 `select-name` disent que les champs de formulaire du design system
  n'associent pas leur libellé à leur champ, ce qui les rend inutilisables au
  lecteur d'écran. Les 147 `link-name` viennent des ancres de section du
  catalogue, donc d'un seul endroit à corriger.
- Les règles ESLint d'accessibilité restent complémentaires et non redondantes :
  elles voient le code source, axe voit le DOM rendu. Aucune des 199 violations
  relevées ici n'est détectable statiquement.
