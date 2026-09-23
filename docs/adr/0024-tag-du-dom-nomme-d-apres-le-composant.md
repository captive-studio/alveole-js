---
status: accepted
---

# Le `tag` du DOM est nommé d'après le composant

Les composants se construisent d'abord avec `Box` et `Typography`. Chaque `Box` ou `Typography`
posé par un composant reçoit une prop `tag` en kebab-case, préfixée par le nom du composant et
suffixée par la partie qu'elle représente : `tag="tag"`, `tag="sidebar-item"`,
`tag="sidebar-item-indicator"`, `tag="drag-and-drop-file-hint"`. Sans `tag`, `Box` et
`Typography` retombent sur `box` et `typography`.

## Pourquoi

Tous les composants partagent les mêmes primitives : sans `tag`, l'inspecteur du navigateur
n'affiche qu'une pile de `box` indiscernables. Le `tag` permet de retrouver, depuis le DOM, quel
composant et quelle partie a produit un nœud, sans source map ni outil de debug React.

## Ce qu'on a écarté

- Des éléments HTML sémantiques propres à chaque partie : impossible en React Native, où tout
  est `View`/`Text`.
- Un `testID` ou une classe CSS : le premier sert aux tests et n'a pas vocation à décrire la
  structure, la seconde ferait croire à un point d'accroche de style (voir ADR 0008).
