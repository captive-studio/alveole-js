---
status: accepted
area: code
---

# Le préfixe d'Alvéole est `alv`

## Le problème

Certains noms qu'Alvéole écrit sortent de son code et cohabitent avec ceux d'une
application : les classes CSS que `@alveole/email` pose sur ses composants pour
ses règles `@media`, par exemple. Sans préfixe, `.carte` ou `.conteneur`
entreraient en collision avec les classes d'un mail ou d'une page. Le premier
préfixe essayé, `al-`, était trop court : il ne désigne pas Alvéole et se lit
comme un mot (« al »).

## La décision

Tout nom qu'Alvéole publie dans un espace partagé avec l'application porte le
préfixe `alv` : `alv-` pour une classe CSS (`alv-conteneur`, `alv-carte-contenu`),
et de même pour tout nouvel identifiant de ce genre (attribut, variable CSS,
clé de stockage).

Les variables CSS existantes du thème (`--spacing-…`, `--radius-…`) ne sont pas
renommées ici : les changer casserait les applications qui les lisent, et
demande sa propre migration.
