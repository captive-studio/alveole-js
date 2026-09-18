# Aligner OTP sur la bordure de focus

**Publication Jira :** [ALV-45](https://captive-team.atlassian.net/browse/ALV-45)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Faire adopter au champ OTP la convention commune : la cellule active signale
le focus par sa bordure de 1 px, sans contour extérieur, tout en conservant la
saisie et le déplacement entre cellules.

## Acceptance criteria

- [ ] OTP consomme la définition commune fournie par le thème.
- [ ] La cellule active utilise le token de focus sur sa bordure de 1 px sans outline, anneau ou box-shadow extérieur.
- [ ] Le comportement est cohérent au clavier et au toucher, sur web et natif.
- [ ] Les états désactivé, erreur et succès respectent les priorités définies dans la spec.
- [ ] La saisie, le collage et le déplacement automatique entre cellules restent inchangés.
- [ ] Des tests d'intégration couvrent le focus et les états concurrents à la frontière de la bibliothèque OTP.

## Blocked by

- [ALV-41](https://captive-team.atlassian.net/browse/ALV-41) — Porter le focus par la bordure de la famille FormControl.
