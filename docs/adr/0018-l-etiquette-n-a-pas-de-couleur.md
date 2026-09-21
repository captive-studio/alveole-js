---
status: accepted
---

# L'étiquette n'a pas de couleur

Le composant `Tag` ne prend plus de prop `color`. Il rend une seule apparence :
fond `background/contrast-grey`, bordure `border/default-grey`, libellé
`text/mention-grey`. Ses seules variations sont le cran de taille et les deux
signaux d'état que fixe l'ADR
[0014](./0014-tag-survol-et-selection-independants.md).

## Pourquoi

`color` proposait deux valeurs, `default` et `action`. La maquette refaite de
l'étiquette n'en décrit qu'une : elle est grise, et son contraste vient du
survol et de la sélection, pas d'une teinte d'accent. Garder `action` aurait
voulu dire maintenir une variante que le design ne spécifie plus, dans les
seize combinaisons d'état × sélection × fermeture × icône.

La mesure a tranché. Dans les trois applications qui consomment
`@alveole/components`, `action` n'avait qu'un usage : le compteur de la barre
latérale de Groove. Ce n'était pas une étiquette. Un compteur accolé à un
libellé de navigation, c'est `Counter`, qui existe déjà et que les onglets
utilisent pour exactement ça. Groove a basculé dessus avant que la prop ne
disparaisse.

Ce qui restait à couvrir, c'est le besoin de couleur porteuse de sens. Il est
déjà couvert : `Badge` a six variantes sémantiques et c'est son rôle. Une
étiquette qui aurait pu être rouge ou verte serait devenue un second badge, avec
deux composants à maintenir pour une seule intention.

## Ce que ça coûte

C'est un changement cassant de l'API publique. Trois appels ont dû être repris
chez les consommateurs. Une future demande de tag coloré n'aura pas de réponse
directe : elle devra passer par `Badge`, ou rouvrir cette décision avec le
design.

## Ce qu'on a écarté

Garder `color` avec `'default'` pour seule valeur : une prop à une valeur est
du bruit, elle oblige chaque appelant à écrire un choix qui n'en est pas un.

Garder `action` en le rendant identique à `default` : l'API aurait menti, et la
variante serait revenue par la fenêtre au premier besoin de contraste.
