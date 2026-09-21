---
status: accepted
---

# L'état sélectionné du Tag ne dépend d'aucun survol réel

Le Tag distingue un état par défaut et un état sélectionné (`selected`) qui
assombrit sa bordure (`border/contrast-grey`) et son texte
(`text/default-grey`). Ce changement est piloté uniquement par la prop
`selected` : aucune interaction de survol, réelle ou simulée, ne doit
déclencher ce rendu.

La maquette Figma range ce rendu sous des noms de variante différents selon la
taille : en SM sous le slot `État=Hover`, en MD sous le slot `État=Défaut`
(MD n'a pas de variante Hover). Cette différence reflète uniquement
l'organisation du fichier Figma au moment de sa finalisation, pas une exigence
produit — les deux tailles doivent se comporter à l'identique côté code,
sans traitement `:hover` ni équivalent natif.

Le bouton de fermeture du Tag (`Tag/Close`) suit une règle séparée mais liée :
sa croix garde une position strictement identique entre son état par défaut et
son état de survol réel (celui du bouton lui-même, pas du tag). Seul le fond
du cercle change ; la position de l'icône est centrée par un mécanisme
automatique plutôt que des offsets calculés à la main par état, pour éviter
tout décalage visuel au survol.

La typographie du Tag (SM comme MD) correspond aux styles de texte publiés de
la bibliothèque Figma « Alveole - Fondamentaux » (`Corps de texte/XS - Bold` en
SM, `Corps de texte/SM - Bold` en MD), liés plutôt que copiés, afin de rester
synchronisée si ces styles évoluent.
