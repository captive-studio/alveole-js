---
status: accepted
area: quality
---

# L'audit d'accessibilité avance par cliquet, aujourd'hui posé sur zéro

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

**La référence est depuis descendue à zéro, et aucune règle axe n'est plus
écartée.** Le mécanisme n'a pas changé, son plancher si : toute violation, sur
n'importe quelle page, fait désormais échouer la CI. Le cliquet garde son
intérêt, puisqu'il reste la seule chose qui empêche de replâtrer une régression
en l'inscrivant discrètement dans la référence : un ajout y est visible en
revue.

## Ce qui est audité, et ce qui ne l'est pas

Les pages auditées sont celles que `expo export` a réellement produites, pas une
liste tenue à la main : une story ajoutée est auditée sans rien déclarer. En
contrepartie, un export incomplet ne produirait aucun test et donc une CI verte
à tort, d'où le refus explicite d'un build sans page de composant.

Quatre règles ont d'abord été désactivées : `region`, `landmark-one-main`,
`page-has-heading-one`, `landmark-unique`. Elles portent sur la structure du
document qui héberge un composant : un unique `<main>`, un `<h1>`, tout le
contenu dans un repère. Le motif invoqué était que cela relève de l'application
qui consomme le design system, pas des composants publiés.

**Ce motif était mal visé.** La structure des pages du catalogue est la
responsabilité du catalogue, ce qui n'est pas la même chose que hors de notre
portée. Remises en service, ces règles relevaient 1057 violations, dont 1055
pour la seule `region` : non pas mille problèmes distincts, mais un gabarit sans
repère principal. Deux lignes les ont réglées, un `main` autour du contenu des
écrans et un `footer` autour du pied de page. Le reliquat a été absorbé par le
rôle `dialog` du panneau glissant, puis par la correction d'une boucle de rendu
qui empêchait purement et simplement une fiche de s'afficher. **Aucune règle
n'est plus écartée aujourd'hui.**

La leçon vaut au-delà de ce cas : écarter une règle parce qu'elle produit
beaucoup de bruit, c'est parfois écarter un défaut unique répété partout.

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
- La référence à zéro se lit `{}`. Une page qui réapparaît dans le fichier est
  une régression à corriger, jamais à entériner.
- Les 199 violations figées au départ n'étaient pas un acquis, et ne sont plus.
  Elles disaient un défaut réel : les champs de formulaire n'associaient pas
  leur libellé à leur champ. `FormControl` fournit désormais un identifiant
  partagé que le libellé consomme pour son `htmlFor` et le champ pour son `id`,
  ce qui vaut mieux qu'un `aria-label` puisque cliquer le libellé donne le focus
  au champ. Là où le champ appartient à une bibliothèque tierce, faute de prise
  sur son rendu, c'est `aria-label` qui nomme le contrôle.
- Les règles ESLint d'accessibilité restent complémentaires et non redondantes :
  elles voient le code source, axe voit le DOM rendu. Aucune des violations
  relevées ici n'était détectable statiquement, à commencer par la boucle de
  rendu qui vidait une fiche entière.
