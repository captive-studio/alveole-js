---
status: accepted
area: forms
---

# Le focus des champs et sélecteurs est porté par leur bordure

Les champs de saisie et les sélecteurs signalent leur focus en colorant leur
bordure existante avec le token de focus, sans ajouter d'anneau extérieur. Cette
règle vaut au clic comme au clavier, sur le web comme sur natif : elle garde
l'état actif visible sans superposer un second contour au cadre du champ.

La bordure de focus reste épaisse de 1 px et prend temporairement le pas sur les
couleurs d'erreur et de succès, qui réapparaissent à la perte du focus. Les
champs désactivés ou en lecture seule ne prennent pas cet état.

Les autres contrôles interactifs, notamment les boutons, liens, cases à cocher
et radios, conservent leur anneau de focus. La distinction est centralisée dans
le thème afin que les composants ne définissent pas chacun leur propre
convention.
