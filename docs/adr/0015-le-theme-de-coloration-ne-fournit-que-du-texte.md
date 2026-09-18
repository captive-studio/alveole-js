---
status: accepted
area: code
---

# Un thème de coloration syntaxique ne fournit que des couleurs de texte

`Highlight` importe un thème tiers pour colorer les jetons de code, et n'en
retient que ce qui touche au texte : couleur, graisse, italique. Tout ce que le
thème déclare comme surface, fond du bloc et fonds de jetons, est écarté. La
surface, le rayon, l'espacement et la bordure viennent des tokens du design
system.

## Ce qui a déclenché la décision

`Highlight` n'avait pas un coloriseur mais deux, choisis sur la langue : Prism en
`vscDarkPlus` pour le `tsx`, highlight.js en `monokai` pour tout le reste. Dans
une même fiche du catalogue, l'onglet des exemples et l'onglet des styles
s'affichaient donc dans deux palettes et sur deux fonds différents, et le `json`
ne posait aucune surface du tout.

En unifiant sur un seul moteur, il a fallu choisir un thème. Et en passant au
clair, le fond du bloc est devenu une vraie question : jusque-là un aplat noir
tranchait sur tout, quel que soit ce qu'il y avait derrière.

## Pourquoi la surface n'appartient pas au thème

Un thème de coloration est écrit pour un éditeur de code, pas pour un design
system. Il décide d'un fond, d'un contraste, parfois de surlignages sur certains
jetons, et ces choix sont propres à son auteur. Les laisser passer revient à
confier une couleur de surface du design system à un paquet tiers, et à voir
cette surface changer le jour où l'on change de thème.

Le constat s'est fait à la première capture après le passage à `a11yOneLight` :
la moitié du code est apparue surlignée en vert. Le convertisseur avait été écrit
pour les sélecteurs de `vscDarkPlus`, et les fonds de jetons du nouveau thème se
recopiaient sur le texte. Écarter les surfaces à la conversion ne corrige pas un
thème en particulier, ça rend le composant indifférent au thème choisi.

## Pourquoi une bordure plutôt qu'un fond contrasté

Le bloc est désormais sur `background['alt-grey']`. Posé dans une carte du même
gris, il disparaissait. Le réflexe aurait été de lui donner un fond plus marqué,
ou de restructurer la page autour pour qu'il tombe toujours sur du blanc.

La bordure a été préférée parce qu'elle ne suppose rien de ce qu'il y a derrière.
Une application cliente pose ce bloc où elle veut, sur la surface qu'elle veut :
un composant qui ne se délimite que par contraste de fond dépend de son contexte,
un composant bordé non. C'est aussi ce que font Primer et Atlassian.

## Conséquences

- Changer de thème de coloration ne change plus que des couleurs de texte. Le
  bloc garde sa surface, son rayon, son espacement et sa bordure.
- Les surlignages qu'un thème pose sur certains jetons, les `inserted` et
  `deleted` d'un diff par exemple, sont perdus. Aucun usage ne les demandait, et
  les récupérer supposerait de décider dans la palette à quoi ressemble un ajout
  et une suppression, ce qui est une autre décision.
- Un test garde la règle : aucun nœud de texte du bloc ne porte de fond.
- La variante sombre n'est pas livrée. `CustomPalette.dark` ne contient que trois
  tokens dépréciés : il n'existe aucune surface sombre à laquelle rattacher un
  bloc de code sombre. La question se posera avec le thème sombre, pas avant.
