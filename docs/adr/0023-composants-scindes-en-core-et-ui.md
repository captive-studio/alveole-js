---
status: accepted
---

# Les composants sont scindés en core et ui

`@alveole/components` range chaque composant dans l'un de deux dossiers, et sa fiche porte le
tag correspondant (`tags: ['core']` ou `tags: ['ui']`) :

- `src/core/` : les composants bruts, qui ne produisent pas ou peu de rendu propre et ne sont pas
  dessinés dans Figma (`Box`, `Typography`, `ThemeProvider`, `Page`, `AppUpdateProvider`…). Ils
  sont les briques des autres.
- `src/ui/` : les composants à rendu visuel, en général issus d'une maquette Figma (`Button`,
  `Tag`, `Select`, `Sidebar`…). Ils s'appuient sur les composants core.

Le sens de dépendance n'est pas imposé : certains composants core importent aujourd'hui des
composants ui (`Image`, `PdfViewer`, `UpdateRequired`, `AnchorHeading`…).

## Pourquoi

La frontière sépare ce qui suit la maquette (et change quand Figma change) de ce qui n'en
dépend pas. Elle dit aussi au lecteur du catalogue où chercher une brique réutilisable plutôt
qu'un composant fini.

## Conséquences

La catégorie ui grossit vite (plus de 70 composants) et devrait être éclatée à terme, par
exemple par famille (champs de formulaire, navigation, retours). Ce découpage n'est pas encore
tranché : tant qu'il ne l'est pas, tout composant à rendu visuel va dans `ui/`.
