---
status: proposed
area: button
---

# Variants du Button nommés par rang, renommage par rôle reporté

Le `Button` d'Alveole nomme ses variants par rang hiérarchique (`primary`,
`secondary`, `tertiary`), là où Primer (`primary`, `default`, `invisible`) et
Atlassian (`primary`, `default`, `subtle`) les nomment par rôle. Le nommage par
rôle est jugé plus clair : il dit ce que le bouton est dans l'interface, pas son
numéro d'ordre, et il évite de laisser croire qu'un `tertiary` serait un
`secondary` en moins important.

Le renommage est accepté sur le fond mais reporté : `variant` est une prop
publique de `@alveole/components`, et la migration toucherait tous les appels
dans toutes les apps clientes. Il sera repris au moment d'un changement majeur
déjà porteur d'autres ruptures, pour n'imposer qu'une seule migration.

## Conséquences

- Tant que ce report tient, la divergence de vocabulaire avec Primer et
  Atlassian est délibérée : ne pas la « corriger » au coup par coup.
- Le sujet réellement bloquant n'est pas le vocabulaire mais l'absence d'une
  intensité discrète pour `danger` : aucune action destructive en ligne
  (une ligne de tableau, par exemple) ne peut aujourd'hui signaler son
  intention sans un bouton rouge plein. Ce manque peut être comblé sans
  attendre le renommage.
