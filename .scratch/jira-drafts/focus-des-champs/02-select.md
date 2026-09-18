# Aligner Select sur la bordure de focus

**Publication Jira :** [ALV-42](https://captive-team.atlassian.net/browse/ALV-42)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Faire adopter au sélecteur simple la bordure de focus commune sur le web et
sur natif. Le contrôle actif change uniquement la couleur de sa bordure de
1 px et ne rend plus de contour extérieur.

## Acceptance criteria

- [ ] Select consomme la définition commune fournie par le thème.
- [ ] Le focus au clavier, au clic ou au toucher colore la bordure sans outline, anneau ou box-shadow extérieur.
- [ ] Le comportement est cohérent entre le sélecteur web et le sélecteur natif.
- [ ] Le focus est prioritaire sur erreur et succès; ces états réapparaissent à la fermeture ou au blur.
- [ ] Le sélecteur désactivé conserve son apparence et ne prend pas l'état de focus.
- [ ] Les interactions clavier, l'ouverture de la liste et la sélection d'une option restent inchangées.
- [ ] Des tests d'intégration couvrent le focus, le blur ou la fermeture, la validation et l'état désactivé.

## Blocked by

- [ALV-41](https://captive-team.atlassian.net/browse/ALV-41) — Porter le focus par la bordure de la famille FormControl.
