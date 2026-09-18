# Navigation

**Rubrique** :
L'une des grandes entrées du catalogue : Composants, Couleurs, Typographies,
Variables CSS, Constantes, Philosophie. C'est le niveau 1 de la navigation.
_Éviter_ : section. `Section` est un composant publié de `@alveole/components`,
manipulé dans les mêmes fichiers, et la collision se relit mal.

**Barre** :
La navigation horizontale collante en haut du catalogue. Elle porte l'identité
et les rubriques. Rendue par `UIKitTopBar`.
_Éviter_ : header, top bar, nav. `Header` désigne le composant publié sur lequel
la barre est bâtie, pas la barre elle-même.

**Colonne** :
La navigation verticale posée sous la barre, qui liste le contenu de la rubrique
courante : les fiches sur Composants, les pages sur Thème. C'est le niveau 2.
Rendue par le composant `Sidebar`, sans se confondre avec lui : `Sidebar` est
aussi le squelette d'une application cliente, où il porte le logo et n'a aucune
barre au-dessus.
_Éviter_ : menu latéral, sidebar, sommaire. « Sommaire » est réservé à la table
des matières d'une page, qui est un autre objet.
