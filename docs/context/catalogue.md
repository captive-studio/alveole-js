# Catalogue

**Catalogue** :
Le site qui présente le design system, publié sur alveole.captive.fr. Une page
par composant, plus les pages de thème et de constantes.
_Éviter_ : Storybook, doc, showcase. Le dépôt contient un paquet nommé
`@alveole/storybook`, mais c'est le catalogue maison, sans lien avec l'outil
Storybook.

**Fiche** :
La description d'un composant dans le catalogue : titre, tags, description,
lien Figma, drapeaux de plateforme. Une fiche par composant.
_Éviter_ : meta. Le type s'appelle `StoryMeta`, et son alias `Story` prête à
confusion : `Story` désigne la fiche, jamais un exemple.

**Exemple** :
Un cas d'usage affichable d'un composant, rendu dans sa fiche. Un composant en
présente plusieurs (variants, tailles, états).
_Éviter_ : story, cas, démo. Le type est `StoryExample`.

**Bloc d'exemple** :
Le cadre qui présente un exemple dans une fiche : la démonstration, puis une
barre de commandes, puis sa source. Un seul cadre par exemple. Le titre et la
description de l'exemple lui restent extérieurs, dans le flux de la page.
_Éviter_ : carte, encart, démo.

**Source** :
Le code d'un exemple, tel qu'il est écrit dans son module de stories. Une source
est entière : quand la fiche n'en montre que les premières lignes, c'est un état
d'affichage, pas un autre objet.
_Éviter_ : extrait, snippet, code. « Extrait » laisserait croire à un second
objet là où il n'y a qu'une source montrée en partie.

**Module de stories** :
Le fichier `*.stories.tsx` d'un composant : une fiche en export par défaut et
ses exemples en exports nommés.
_Éviter_ : story file.

**Ancre** :
Un identifiant compatible URL, calculé depuis un texte visible (un titre, le
libellé d'un onglet), qui permet de lier directement vers cet endroit. Posée
par `AnchorHeading`, reprise par `Tabs` (voir l'ADR
[0022](../adr/0022-anchor-sync-web-natif-diverge.md)) pour qu'une fiche
retrouve son onglet actif au rechargement.
_Éviter_ : hash, id, slug.
