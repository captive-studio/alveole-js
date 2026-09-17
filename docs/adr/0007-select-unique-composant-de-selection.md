---
status: accepted
---

# `Select` absorbe `Autocomplete` et devient l'unique composant de sélection

Deux familles couvraient le même besoin — choisir une ou plusieurs options dans
une liste. `Select` portait la maquette (bande arrondie, barre indicatrice,
groupes, bottom sheet natif) mais refusait la recherche : `isSearchable={false}`
était écrit en dur. `Autocomplete` portait la recherche, le multi et la création
mais avec deux implémentations indépendantes qui avaient divergé : la création
d'option n'existait que sur natif, alors que `AutocompleteAddress` reposait
dessus ; le debounce valait 500 ms sur natif contre 300 ms sur web ; le web
émettait `onSearchChange('')` au montage. Onze tests couvraient `Select`, un
seul couvrait `Autocomplete`.

`Select` reçoit donc `searchable`, `localFilter`, `onSearchChange`, `loading`,
`multiple` et `creatable`. `Autocomplete`, `AutocompleteChip` et
`AutocompleteAddress` disparaissent. Ce dernier n'appelait aucune API d'adresse :
c'était un préréglage (mono + filtrage local coupé + création), qui se recompose
en une dizaine de lignes et vit désormais comme exemple dans la fiche.

Le mode est porté par une **union discriminée** sur `multiple`, et non par un
générique `<M extends boolean>`. `forwardRef` ne préserve pas les génériques sans
cast — ce qui casserait `component: Select` dans le module de stories — et
`multiple` omis inférerait `boolean` plutôt que `false`. En contrepartie, les
implémentations ne peuvent pas déstructurer `multiple`, `value` ni `onChange` :
TypeScript ne narrowe que sur l'objet `props` entier.

La création d'option ne fabrique plus l'option elle-même. `onCreateOption` reçoit
la saisie ; c'est l'appelant qui insère l'option puis met `value` à jour. Le
mécanisme `__created` / `createOptionValue` d'`Autocomplete` n'existait que parce
que ce composant gardait un état interne : `Select` est strictement contrôlé.

## Conséquences

- Rupture d'API pour les apps clientes : `Autocomplete`, `AutocompleteAddress`,
  `AutocompleteChip` et leurs types ne sont plus exposés par
  `@alveole/components`. Livré en version majeure, table de correspondance dans
  la fiche du catalogue.
- Le second argument `meta` d'`onChange` (`added`, `removed`, `created`)
  disparaît sans remplaçant : aucun usage connu ne s'en servait.
- Une app qui ne remettait pas `value` à jour dans `onChange` verra son champ
  figé, là où `Autocomplete` compensait par son état interne.
- `SelectMultiple` devient redondant. Il reste exporté le temps que les apps
  migrent ; sa suppression fera l'objet d'un changement distinct.
- `BottomSheet` gagne une prop `moveOnKeyboardChange`, nécessaire pour que le
  panneau natif reste lisible quand le clavier s'ouvre sur le champ de recherche.
