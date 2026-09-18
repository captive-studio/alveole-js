# Vérifier la cohérence du focus des champs dans le catalogue

**Publication Jira :** [ALV-46](https://captive-team.atlassian.net/browse/ALV-46)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Vérifier dans le catalogue que toutes les fiches de champs et sélecteurs
présentent la même bordure de focus, compléter les cas de démonstration ou les
tests manquants et confirmer qu'aucun ancien contour extérieur ne subsiste dans
le périmètre. Cette vérification constitue le point de convergence de la
livraison.

## Acceptance criteria

- [ ] Toutes les fiches de champs, sélecteurs, autocomplétions et OTP permettent de vérifier la convention de focus.
- [ ] Aucun composant du périmètre ne rend d'outline, anneau ou box-shadow extérieur au focus.
- [ ] Tous les composants utilisent le même token et conservent une bordure de 1 px.
- [ ] Les états erreur, succès, désactivé et lecture seule respectent les priorités définies dans la spec.
- [ ] Les boutons, liens, cases à cocher et radios conservent leur anneau de focus existant.
- [ ] Les contrôles passent les vérifications unitaires, de types, de lint, d'accessibilité et de catalogue pertinentes.
- [ ] L'ensemble est livrable en une fois sans coexistence des deux conventions visuelles.

## Blocked by

- [ALV-42](https://captive-team.atlassian.net/browse/ALV-42) — Aligner Select sur la bordure de focus.
- [ALV-43](https://captive-team.atlassian.net/browse/ALV-43) — Aligner SelectMultiple sur la bordure de focus.
- [ALV-44](https://captive-team.atlassian.net/browse/ALV-44) — Aligner Autocomplete sur la bordure de focus.
- [ALV-45](https://captive-team.atlassian.net/browse/ALV-45) — Aligner OTP sur la bordure de focus.
