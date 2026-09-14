# Alveole

Design system publié en paquets npm (`@alveole/*`) et consommé par les applications
clientes de Captive. Ce fichier fixe le vocabulaire du dépôt ; il ne décrit ni
l'architecture ni les choix techniques, qui relèvent de [docs/adr/](./docs/adr/).

## Langage

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
