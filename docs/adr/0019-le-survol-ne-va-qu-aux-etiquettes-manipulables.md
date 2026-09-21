---
status: accepted
---

# Le survol ne va qu'aux étiquettes manipulables

Une étiquette ne fonce au survol que si on peut agir dessus : soit elle porte une
croix de suppression (`closable`), soit elle appartient à un groupe de sélection,
ce qu'elle déclare en recevant la prop `selected` — y compris à `false`. Une
étiquette purement descriptive ne réagit pas au pointeur.

## Pourquoi

L'ADR [0014](./0014-tag-survol-et-selection-independants.md) décrit ce que fait
le survol, pas à qui il s'adresse. Appliqué sans condition, il donnait un retour
visuel à des étiquettes inertes : dans le catalogue, « Composant » et « Figma »
sont de la métadonnée, et pourtant elles fonçaient sous le pointeur. Un retour
au survol est une promesse d'interaction ; quand rien ne suit, l'utilisateur
essaie de cliquer et il ne se passe rien.

C'est la règle de Primer. Son `Token` descriptif est un `span` inerte ; il ne
prend ses styles de survol que rendu en `button` ou en `a`, ou doté d'un
`onRemove`. Le survol y suit la capacité réelle d'agir, pas l'apparence.

La capacité d'agir est déjà déclarée par les props existantes, il n'y avait donc
pas de prop à ajouter. `closable` dit qu'on peut retirer l'étiquette. `selected`
dit qu'elle est l'une des options d'un groupe où l'on choisit — et c'est le fait
de la passer qui le dit, pas sa valeur : une option non retenue reste une option.

## Ce que ça coûte

`selected={false}` cesse d'être équivalent à ne rien passer. C'est une subtilité,
et c'est la raison d'être de cette ADR : sans elle, le premier lecteur qui
trouvera un `selected={false}` « inutile » le supprimera et retirera le survol
d'un groupe de filtres sans s'en apercevoir.

## Ce qu'on a écarté

Une prop `interactive` explicite : elle aurait dit une troisième fois ce que
`closable` et `selected` disent déjà, et rien n'aurait empêché de la poser sur
une étiquette qui n'offre rien.

Conditionner le survol au seul `closable` : un groupe de filtres non fermables
aurait perdu le survol que l'ADR 0014 lui prévoit.
