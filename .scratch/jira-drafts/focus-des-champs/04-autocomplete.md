# Aligner Autocomplete sur la bordure de focus

**Publication Jira :** [ALV-44](https://captive-team.atlassian.net/browse/ALV-44)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Faire adopter la bordure de focus commune aux variantes simple, multiple et
adresse d'Autocomplete. La recherche, l'ouverture des résultats et la création
éventuelle d'une option conservent leur comportement actuel.

## Acceptance criteria

- [ ] Toutes les variantes d'Autocomplete consomment la définition commune fournie par le thème.
- [ ] Le contrôle actif colore sa bordure de 1 px sans outline, anneau ou box-shadow extérieur.
- [ ] Le comportement visuel est cohérent au clavier, au clic et au toucher, sur web et natif.
- [ ] Le focus est prioritaire sur erreur et succès; les couleurs de validation réapparaissent au blur ou à la fermeture.
- [ ] Les états désactivé et non modifiable ne prennent pas l'apparence de focus.
- [ ] La recherche, la navigation dans les résultats, la sélection et la création d'option restent inchangées.
- [ ] Des tests d'intégration couvrent les variantes simple, multiple et adresse aux points réellement distincts.

## Blocked by

- [ALV-41](https://captive-team.atlassian.net/browse/ALV-41) — Porter le focus par la bordure de la famille FormControl.
