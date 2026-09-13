---
status: accepted
---

# La famille Button repose sur des composants distincts, pas sur un composant polymorphe

`Button` couvre l'action avec libellé. Le bouton icône seule reste un composant
séparé plutôt qu'un mode de `Button`, et la navigation passe par un
`LinkButton` plutôt que par une prop `href` polymorphe.

Pour l'icône seule, la raison est le nom accessible : un composant dédié peut
rendre `label` obligatoire dans sa signature, ce qu'un `Button` unifié ne peut
faire proprement (il faudrait une union discriminée sur l'absence de `title`,
aux erreurs TypeScript illisibles, et qui laisserait passer `title=""`). Le kit
comptait huit appels de `ButtonIcon` sans aucun nom accessible : la contrainte
de typage transforme cette dette en erreurs de compilation.

Pour la navigation, `core/A` porte déjà `expo-router` et surtout
`LinkAccessContext`, qui masque un lien selon les droits métier. Un `href` sur
`Button` obligerait à dupliquer cette logique ; un `LinkButton` qui compose `A`
en hérite sans code.

## Conséquences

- `ButtonIcon` est réécrit plutôt que supprimé : il doit partager la table de
  styles, les tokens et l'échelle `control.*` de `Button`, et cesser d'avoir ses
  propres variants, sa prop `style` restreinte, sa branche `variant === 'link'`
  morte et son `icon: number` qui déguise un compteur.
- Le variant `link` est **conservé**, contrairement à ce que suggérait sa
  dépréciation dans les stories. Un bouton d'apparence lien qui déclenche une
  action est un besoin réel, présent chez Primer (`link`) comme chez Atlassian
  (`subtle-link`) ; il ne fait pas doublon avec `LinkButton`, qui relève de la
  navigation. Son implémentation, elle, est à refaire : elle lit des tokens
  dépréciés et son état de survol a la même couleur que son état au repos.
