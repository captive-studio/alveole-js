# Alveole

Design system publié en paquets npm (`@alveole/*`) et consommé par les applications
clientes de Captive. Ce fichier fixe le vocabulaire du dépôt ; il ne décrit ni
l'architecture ni les choix techniques, qui relèvent de [docs/adr/](./docs/adr/).

## Langage

### Périmètre

**Application cliente** :
Une application de Captive qui installe les paquets `@alveole/*` et s'en sert
pour construire ses écrans. C'est le destinataire de tout ce que le dépôt
produit.
_Éviter_ : projet cible, application hôte, consommateur. « Projet cible » décrit
la mécanique du script `publish:local`, qui copie des fichiers vers une cible,
et non l'objet dont on parle.

### Catalogue

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

**Module de stories** :
Le fichier `*.stories.tsx` d'un composant : une fiche en export par défaut et
ses exemples en exports nommés.
_Éviter_ : story file.

### Navigation

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

### Qualité

**Cliquet** :
Une borne chiffrée qui enregistre l'état mesuré du dépôt et refuse qu'il se
dégrade, sans prétendre être un objectif de qualité. Le franchir dans le bon
sens oblige à resserrer la borne. Employé pour la couverture de tests et pour
les violations d'accessibilité.
_Éviter_ : seuil, quota, budget.

**Violation** :
Un manquement d'accessibilité relevé par axe sur une page du catalogue, compté
par élément fautif et non par règle.
_Éviter_ : erreur, problème a11y.
