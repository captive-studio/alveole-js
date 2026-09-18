# Vérifier la conformité du Tag dans le catalogue et avec la maquette Figma

**Publication Jira :** à créer
**Projet :** `ALV`
**Label à appliquer :** `ready-for-agent`

## Parent

spec.md (épic "Faire évoluer le composant Tag : fermeture, icône et état sélectionné")

## What to build

Une fois l'état sélectionné, le bouton de fermeture et l'icône livrés, vérifier de
façon transversale que le composant `Tag` correspond à la maquette Figma
(`Tag/SM`, `Tag/MD`, `Tag/Close`) et que le catalogue Storybook reflète fidèlement
toutes les combinaisons de props supportées.

- Comparer chaque variante rendue (Storybook ou capture) à la maquette Figma :
  couleurs, tailles de croix (18px en `sm`, 20px en `md`), tailles d'icône,
  espacements.
- Vérifier que les stories existantes (`Colors`, `Sizes`) n'ont pas régressé
  visuellement.
- Vérifier que la description Storybook du composant mentionne les nouvelles props
  (`selected`, `closable`, `onClose`, `icon`) et que le lien Figma de la story reste à
  jour.
- Documenter les écarts restants avec la maquette Figma (notamment les combinaisons
  icône + sélectionné/survol et la taille `md`, identifiées comme non finalisées côté
  design au moment de la rédaction de l'épic) et les faire remonter au design pour
  clôturer les variantes manquantes.

## Acceptance criteria

- [ ] Chaque variante du Tag testée (défaut, sélectionné, fermable, avec icône, et
      leurs combinaisons) correspond visuellement à la maquette Figma disponible.
- [ ] Les stories `Colors` et `Sizes` existantes n'ont pas changé de rendu.
- [ ] De nouvelles stories couvrent : tag sélectionné, tag fermable, tag avec icône,
      et au moins une combinaison des trois.
- [ ] La description du composant dans Storybook (`Tag.stories.tsx`) documente les
      nouvelles props.
- [ ] Un écart ou une combinaison non spécifiée dans Figma est explicitement noté
      (commentaire de ticket ou ticket de suivi dédié), plutôt que silencieusement
      implémenté sans validation design.

## Blocked by

Ajouter l'état sélectionné (actif) au Tag, Ajouter le bouton de fermeture (croix) au
Tag, Ajouter le support d'une icône avant le libellé du Tag.
