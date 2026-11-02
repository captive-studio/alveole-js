---
status: accepted
area: quality
---

# Un cliché par démonstration (amende l'ADR 0011)

Recherche préalable :
[regression-visuelle-par-composant](../research/regression-visuelle-par-composant.md).

## Le problème

L'ADR [0011](0011-regression-visuelle-greffee-sur-l-audit.md) capture le repère
`<main>` de chaque fiche. Ce repère contient la documentation : titre, résumé,
titre et description de chaque exemple, et la source affichée sous chaque
démonstration. Une phrase retouchée ou une ligne de code ajoutée change
l'image, et décale tout ce qui suit. La CI passe au rouge sur un changement qui
n'a rien de visuel, et la différence à juger couvre une fiche entière au lieu
d'un exemple.

L'ADR 0011 avait prévu ce moment : « le grain plus fin s'ajoutera si les
différences se révèlent illisibles ». Elles le sont.

## Ce qui est capturé

La démonstration de chaque exemple, ciblée par un locator dans la fiche que
l'audit vient de charger. Le titre, la description et la source restent hors du
cadre : un changement de documentation ne change aucun cliché.

Les pages du thème qui rendent ses valeurs (`tokens-semantiques`, `nuances`,
`typographies`) gardent un cliché de page : elles n'ont pas de démonstration, et
leur image est la seule preuve d'une valeur de thème ou du barré d'un token
déprécié. Les pages de texte (`css-variables`, l'index `/components`) n'ont plus
de cliché ; leur audit d'accessibilité reste.

## Pourquoi dans la fiche et pas sur une route isolée

Primer capture chaque story dans une iframe isolée, Atlassian des exemples
écrits pour le test. Aucune des deux ne masque la documentation : elle n'est
jamais dans la surface capturée. Une route par exemple reproduirait ce modèle,
mais ajouterait près de 300 pages à exporter et à hydrater, et sortirait la
capture du job d'audit, ce que 0011 avait écarté pour la mémoire d'`expo export`.

Capturer dans la fiche garde la greffe sur l'audit : la page est déjà attendue
jusqu'à ses images, la capture ne coûte que la capture.

Le prix est celui que Base Web a payé : un menu ou une couche qui déborde de sa
démonstration est coupé. Quatre fiches ont une couche ouverte au départ
(`ActionMenu`, `Button`, `DataTable`, `Spinner`) ; elles se traitent au cas par
cas plutôt que de payer une route isolée pour tout le catalogue.

## Conséquences

- Environ 295 clichés au lieu de 76, plus petits chacun. Le poids et le temps
  CI se sont mesurés sur Badge avant la généralisation à tout le catalogue,
  hors les quatre fiches à couche ouverte.
- La démonstration reçoit un repère ciblable dans `@alveole/storybook`, ce que
  0011 refusait comme du code de catalogue modifié pour le test. Le coût est
  accepté : c'est lui qui retire la documentation du cadre.
- Restent de 0011 : la greffe sur l'audit, le masquage zone par zone sans
  tolérance globale, les clichés versionnés, la régénération par
  `catalogue-screenshots.yml`, l'échec de CI sur toute différence.
