# Ajouter le support d'une icône avant le libellé du Tag

**Publication Jira :** à créer
**Projet :** `ALV`
**Label à appliquer :** `ready-for-agent`

## Parent

spec.md (épic "Faire évoluer le composant Tag : fermeture, icône et état sélectionné")

## What to build

Ajouter au `Tag` la possibilité d'afficher une icône avant le libellé (`leadingVisual`
dans la maquette Figma), en réutilisant le composant `LucideIcon` déjà présent dans le
design system.

- Nouvelle prop sur `Tag` : `icon?: LucideIconProps['name']`.
- Quand `icon` est fourni, l'icône s'affiche avant le libellé, taille 16px en `sm`
  (d'après la maquette), avec un espacement de 4px entre l'icône et le texte.
- Quand `icon` est absent, le rendu est strictement identique à la version actuelle
  du composant.
- La maquette Figma ne couvre aujourd'hui que la combinaison icône + état par défaut
  non sélectionné pour la taille `sm` ; les combinaisons icône + sélectionné, icône +
  fermable, et la taille `md` ne sont pas détaillées dans Figma au moment de la
  rédaction de ce ticket. L'implémentation applique le même traitement (taille et
  espacement proportionnels) à ces combinaisons, à valider visuellement avec le
  design avant publication finale (cf. ticket de vérification transversale).

## Acceptance criteria

- [ ] Le composant `Tag` accepte une prop `icon?: LucideIconProps['name']`.
- [ ] Quand `icon` est absent, le rendu est identique à la version actuelle du
      composant.
- [ ] Quand `icon` est fourni, elle s'affiche avant le libellé, à 16px, avec 4px
      d'espacement avant le texte, en taille `sm`.
- [ ] L'icône est également supportée en taille `md`, avec une taille et un
      espacement proportionnels.
- [ ] L'icône peut être combinée avec `closable` (icône avant le libellé, croix après)
      et avec `selected`, sans conflit de mise en page.
- [ ] Un test unitaire vérifie : absence d'icône par défaut, présence et bon nom
      d'icône quand `icon` est fourni.
- [ ] Une nouvelle story Storybook illustre un tag avec icône, sans et avec fermeture.

## Blocked by

Ajouter l'état sélectionné (actif) au Tag et Ajouter le bouton de fermeture (croix)
au Tag — pour vérifier la combinaison des trois props sans régression de mise en
page.
