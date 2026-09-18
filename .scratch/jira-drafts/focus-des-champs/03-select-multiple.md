# Aligner SelectMultiple sur la bordure de focus

**Publication Jira :** [ALV-43](https://captive-team.atlassian.net/browse/ALV-43)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Faire adopter au sélecteur multiple la bordure de focus commune sans modifier
la sélection, la suppression ou l'affichage de ses valeurs. Le contrôle actif
change uniquement la couleur de sa bordure de 1 px.

## Acceptance criteria

- [ ] SelectMultiple consomme la définition commune fournie par le thème.
- [ ] Le focus au clavier, au clic ou au toucher colore la bordure sans outline, anneau ou box-shadow extérieur.
- [ ] La bordure de focus est prioritaire sur les états de validation puis restitue leur couleur au blur.
- [ ] L'état désactivé conserve son apparence sans bordure de focus.
- [ ] La sélection, la navigation et la suppression de plusieurs valeurs restent inchangées.
- [ ] Des tests d'intégration couvrent le focus, le blur, la validation et l'état désactivé.

## Blocked by

- [ALV-41](https://captive-team.atlassian.net/browse/ALV-41) — Porter le focus par la bordure de la famille FormControl.
