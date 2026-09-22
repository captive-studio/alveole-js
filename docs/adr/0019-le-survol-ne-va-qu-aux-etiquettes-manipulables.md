---
status: accepted
---

# Le survol ne va qu'aux étiquettes manipulables

Une étiquette ne fonce au survol que si on peut agir dessus : soit elle porte une
croix de suppression (`closable`), soit elle se déclare `interactive`, c'est-à-dire
membre d'un groupe où l'on choisit. Une étiquette purement descriptive ne réagit
pas au pointeur.

## Pourquoi

L'ADR [0020](./0020-tag-survol-et-selection-independants.md) décrit ce que fait
le survol, pas à qui il s'adresse. Appliqué sans condition, il donnait un retour
visuel à des étiquettes inertes : dans le catalogue, « Composant » et « Figma »
sont de la métadonnée, et pourtant elles fonçaient sous le pointeur. Un retour
au survol est une promesse d'interaction ; quand rien ne suit, l'utilisateur
essaie de cliquer et il ne se passe rien.

C'est la règle de Primer. Son `Token` descriptif est un `span` inerte ; il ne
prend ses styles de survol que rendu en `button` ou en `a`, ou doté d'un
`onRemove`. Le survol y suit la capacité réelle d'agir, pas l'apparence.

La capacité d'agir se déclare donc explicitement. `closable` dit qu'on peut
retirer l'étiquette. `interactive` dit qu'elle est l'une des options d'un groupe
où l'on choisit. Le mot est celui de Primer, dont `isTokenInteractive` commande
exactement le même retour au survol.

`selected` ne déclare rien : il décrit un état. Une valeur retenue dans un champ
désactivé est sélectionnée sans être manipulable, et elle ne doit pas répondre au
pointeur.

## Ce qu'on a écarté

Déduire la capacité d'agir de la présence de la prop `selected`, y compris à
`false`. C'était la première version de cette décision, et elle tenait sur une
subtilité indéfendable : `'selected' in props` teste la présence de la clé, pas
sa valeur. Une étiquette construite par diffusion d'objet (`<Tag {...options} />`)
gagnait ou perdait son survol selon la forme de l'objet, sans que rien ne se voie
à la lecture de l'appel.

Conditionner le survol au seul `closable` : un groupe de filtres non fermables
aurait perdu le survol que l'ADR 0020 lui prévoit.
