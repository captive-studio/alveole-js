# Porter le focus par la bordure de la famille FormControl

**Publication Jira :** [ALV-41](https://captive-team.atlassian.net/browse/ALV-41)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Parent

[ALV-40](https://captive-team.atlassian.net/browse/ALV-40)

## What to build

Fournir dans le thème la définition commune de la bordure de focus des champs,
puis l'appliquer à la famille FormControl et à tous ses champs dérivés. Un
champ actif conserve sa bordure de 1 px, colorée avec le token de focus, sans
anneau, contour ou ombre extérieur.

La même règle s'applique au clic, au toucher et au clavier, sur le web comme
sur natif. Le focus prend temporairement le pas sur les couleurs d'erreur et de
succès. Les champs désactivés ou en lecture seule conservent leur apparence.

## Acceptance criteria

- [ ] La définition commune de bordure de focus vit dans le thème et utilise le token de focus existant.
- [ ] Les champs texte, multiligne, email, téléphone, mot de passe, date, heure, durée, nombre et prix consomment cette définition par leur base partagée.
- [ ] La bordure reste épaisse de 1 px pendant le focus et aucun outline, anneau ou box-shadow extérieur n'est rendu.
- [ ] Le focus obtenu au clavier, au clic ou au toucher produit le même état visuel.
- [ ] Le blur restaure la bordure de repos, d'erreur ou de succès appropriée.
- [ ] La bordure de focus est prioritaire sur erreur et succès tant que le champ reste actif.
- [ ] Les champs désactivés et en lecture seule ne prennent pas l'apparence de focus.
- [ ] Les tests couvrent ces comportements sur web et natif au point partagé le plus haut.

## Blocked by

None (can start immediately).
