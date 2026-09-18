---
status: accepted
area: quality
---

# La colonne est auditée une fois, pas soixante-seize

L'audit d'accessibilité parcourt 76 pages : la page d'index des composants et
une fiche par composant. Chacune était auditée entière, document compris. Sur
`/components/Divider`, une fiche parmi les plus simples, ce document compte 590
éléments, dont **390 pour la seule colonne de navigation** et 114 pour la fiche
elle-même. Les deux tiers de ce qu'axe relisait à chaque page étaient la même
liste de 75 entrées, inchangée d'une fiche à l'autre.

Personne n'avait décidé de cette couverture. Elle découlait de ce qu'un
`page.goto` rend : le document complet. Auditer la colonne 76 fois n'était pas
un choix de qualité, c'était un effet de bord du découpage en routes.

L'audit d'une fiche exclut donc désormais la colonne, et un test dédié l'audite
à part.

## Ce que ce n'est pas

Ce n'est pas l'écartement d'une règle. L'[ADR 0006](./0006-audit-accessibilite-en-cliquet.md)
retient la leçon inverse, et elle tient : écarter une règle parce qu'elle
produit beaucoup de bruit, c'est parfois écarter un défaut unique répété
partout. Ici aucune règle n'est désactivée, et aucune zone du catalogue n'est
soustraite à l'audit. Une zone cesse d'être relue soixante-seize fois.

La distinction est vérifiable : si la colonne portait une violation, l'audit
continuerait de la signaler, une fois au lieu de soixante-seize. C'est ce que
`scope.spec.ts` établit, en plantant une image sans alternative textuelle dans
la colonne : l'audit d'une fiche l'ignore, celui de la colonne la voit.

## Pourquoi depuis une fiche, et non depuis l'index

La colonne n'est pas tout à fait identique partout : elle marque l'entrée de la
page courante. Ce marquage est précisément le genre de chose qui s'exprime mal
— un état signalé par la seule couleur, un `aria-current` absent. L'auditer
depuis la page d'index, où aucune fiche n'est courante, l'aurait manqué.

La fiche retenue est la première du sitemap, et non un nom écrit en dur : un
composant renommé ou retiré ferait autrement disparaître ce test en silence.

## Conséquences

- La colonne a sa propre entrée dans la référence, sous la clé `colonne`. Ce
  n'est pas une route, et aucun sitemap n'en produira jamais une qui la
  percute.
- Le générateur de référence relève cette clé comme les autres, faute de quoi
  une violation apparue dans la colonne aurait été impossible à figer.
- `auditRoute` se décompose en `openRoute` et `auditPage`. Cette coupure n'est
  pas cosmétique : elle est ce qui rend le périmètre testable, en séparant
  l'arrivée sur une page du choix de ce qu'on y regarde.
- Le gain mesuré en local, essais alternés sur l'audit complet, est de 47,5 s à
  38,7 s. Sur une fiche simple prise isolément, l'analyse axe passe de 847 ms à
  385 ms. Ce gain vient d'un DOM plus court, pas d'une règle plus permissive.
- La piste voisine, et écartée : auditer plusieurs fiches dans un même document
  en naviguant côté client, pour amortir le démarrage de l'application. La
  décomposition par phase l'a démentie. Le démarrage complet — téléchargement,
  parse, exécution, hydratation — vaut 598 ms sur 1750, quand l'analyse axe en
  vaut 1124. On aurait sacrifié l'isolation des tests et la fidélité au
  chargement d'un vrai visiteur pour un tiers du travail au mieux.
