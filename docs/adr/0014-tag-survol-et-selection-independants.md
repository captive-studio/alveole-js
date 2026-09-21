---
status: accepted
---

# Le survol et la sélection du Tag foncent le texte indépendamment

Le Tag distingue quatre combinaisons d'état, à l'image du composant Token de
Primer qui sert de référence pour cette évolution : par défaut, survolé,
sélectionné, et survolé + sélectionné. Le survol seul fonce déjà le texte
(`text/default-grey`) sans toucher à la bordure, qui reste
`border/default-grey` tant que le tag n'est pas sélectionné. La sélection
fonce le texte et la bordure (`border/contrast-grey`) ; le survol d'un tag déjà
sélectionné ne change rien de plus, puisque le texte est déjà au maximum de
contraste.

Ce comportement est piloté par deux signaux indépendants, la prop `selected`
et l'état de survol natif de la plateforme (`:hover` sur web, retour tactile
équivalent sur natif) — contrairement à une première version simplifiée de ce
composant qui couplait les deux et supprimait le survol seul. Cette version a
été abandonnée car elle divergeait du comportement réel de Primer, où le
survol fonce le texte indépendamment de la sélection (vérifié directement sur
le fichier Figma communautaire de Primer, interactions de survol natives
comprises).

Le bouton de fermeture du Tag (`Tag/Close`) suit une règle séparée mais liée :
sa croix garde une position strictement identique entre son état par défaut et
son état de survol réel (celui du bouton lui-même). Seul le fond du cercle
change ; la position de l'icône est centrée par un mécanisme automatique
plutôt que des offsets calculés à la main par état, pour éviter tout décalage
visuel au survol.

La typographie du Tag (SM comme MD) correspond aux styles de texte publiés de
la bibliothèque Figma « Alveole - Fondamentaux » (`Corps de texte/XS - Bold` en
SM, `Corps de texte/SM - Bold` en MD), liés plutôt que copiés, afin de rester
synchronisée si ces styles évoluent.
