# Remplacer l'anneau de focus des champs par une bordure

**Publication Jira :** [ALV-40](https://captive-team.atlassian.net/browse/ALV-40)  
**Projet :** `ALV`  
**Label à appliquer :** `ready-for-agent`

## Problem Statement

Les champs de saisie et les sélecteurs d'Alveole superposent actuellement un
anneau extérieur à leur bordure lorsqu'ils reçoivent le focus. Ce traitement
alourdit visuellement le contrôle et varie selon les familles de composants et
les plateformes. Les applications clientes ne disposent donc pas d'un état de
focus homogène pour leurs formulaires.

## Solution

Tous les champs de saisie et sélecteurs signalent leur focus en colorant leur
bordure existante de 1 px avec le token de focus commun. Aucun anneau, contour
ou ombre extérieur ne s'ajoute au cadre du champ. La règle s'applique au clic,
au toucher et au clavier, sur le web comme sur natif.

Pendant le focus, cette bordure prend le pas sur les couleurs d'erreur et de
succès. À la perte du focus, l'état de validation réapparaît. Les champs
désactivés ou en lecture seule ne prennent pas l'apparence de focus.

## User Stories

1. En tant qu'utilisateur d'une application cliente, je veux identifier le champ actif sans double contour, afin que le formulaire reste lisible.
2. En tant qu'utilisateur au clavier, je veux voir quel champ de saisie possède le focus, afin de naviguer sans souris.
3. En tant qu'utilisateur à la souris, je veux retrouver le même état actif après un clic, afin que l'interaction reste cohérente.
4. En tant qu'utilisateur sur appareil tactile, je veux que le champ actif soit signalé par sa bordure, afin de comprendre où ma saisie sera appliquée.
5. En tant qu'utilisateur, je veux que la bordure conserve une épaisseur de 1 px au focus, afin que le contenu ne se déplace pas.
6. En tant qu'utilisateur, je veux que le focus soit prioritaire sur les couleurs d'erreur et de succès pendant ma saisie, afin d'identifier sans ambiguïté le contrôle actif.
7. En tant qu'utilisateur, je veux retrouver l'état d'erreur ou de succès après avoir quitté le champ, afin de conserver le retour de validation.
8. En tant qu'utilisateur, je veux qu'un champ en lecture seule ne paraisse pas modifiable lorsqu'il reçoit le focus, afin de comprendre son état.
9. En tant qu'utilisateur, je veux qu'un champ désactivé conserve son apparence désactivée, afin de ne pas le confondre avec un contrôle actif.
10. En tant qu'utilisateur, je veux le même traitement sur les champs texte, multiligne, email, téléphone et mot de passe, afin que tous les formulaires aient une convention commune.
11. En tant qu'utilisateur, je veux le même traitement sur les champs de date, heure, durée, nombre et prix, afin que leur technologie sous-jacente ne change pas l'expérience.
12. En tant qu'utilisateur, je veux que le sélecteur simple signale son focus par sa bordure, afin qu'il se comporte comme les autres champs.
13. En tant qu'utilisateur, je veux que le sélecteur multiple signale son focus par sa bordure, afin que l'ajout de plusieurs valeurs reste cohérent.
14. En tant qu'utilisateur, je veux que l'autocomplétion simple, multiple ou d'adresse utilise la même bordure, afin que la recherche d'une option ne crée pas un autre langage visuel.
15. En tant qu'utilisateur, je veux que le champ OTP utilise la même convention, afin que la saisie d'un code reste cohérente avec le reste du formulaire.
16. En tant que développeur d'une application cliente, je veux un comportement identique sur web et natif, afin de ne pas compenser le design system dans l'application.
17. En tant que mainteneur d'Alveole, je veux une définition centrale de la bordure de focus, afin d'éviter les variantes locales et les régressions.
18. En tant que mainteneur d'Alveole, je veux des tests sur chaque intégration distincte, afin qu'un contour extérieur ou une mauvaise priorité d'état ne puisse pas réapparaître.
19. En tant que designer ou développeur consultant le catalogue, je veux vérifier la convention sur toutes les familles concernées, afin de valider une livraison cohérente.

## Implementation Decisions

- Le thème fournit une définition commune de la bordure de focus, distincte de l'anneau utilisé par les autres contrôles interactifs.
- La bordure de focus utilise le token de focus existant, conserve une épaisseur de 1 px et n'ajoute ni contour extérieur ni ombre.
- L'état s'applique dès que le contrôle possède le focus, quelle que soit la méthode d'interaction.
- La priorité visuelle est : désactivé ou lecture seule sans focus; sinon focus; sinon erreur ou succès; sinon repos.
- La famille FormControl et tous ses champs dérivés consomment la définition commune.
- Select, SelectMultiple, Autocomplete et OTP consomment la même définition sur le web et sur natif.
- Les variantes simple, multiple et adresse d'Autocomplete appartiennent au périmètre.
- Les interfaces publiques des composants ne changent pas.
- Les boutons, liens, cases à cocher, radios et autres contrôles non assimilés à un champ conservent leur anneau de focus.
- Toutes les migrations sont livrées ensemble, même si elles sont réalisées dans des tickets parallèles.
- La décision est consignée dans l'ADR 0012.

## Testing Decisions

- Les tests portent sur le comportement observable : la bordure rendue au focus et au blur, et l'absence de contour extérieur.
- Le thème vérifie que la définition commune conserve une bordure de 1 px avec le token attendu sans produire d'outline ou d'ombre.
- La famille FormControl est testée au point partagé déjà utilisé par les tests de TextInput, sur web et natif.
- Les tests couvrent le focus, le blur, les états désactivé et lecture seule, ainsi que la priorité sur erreur et succès.
- Select, SelectMultiple et Autocomplete sont testés à leur intégration avec React Select, car cette bibliothèque possède son propre système de styles.
- OTP est testé à son intégration avec sa bibliothèque de saisie, séparément de FormControl.
- Une vérification transversale dans le catalogue confirme que toutes les fiches de champs et sélecteurs suivent la convention et que les contrôles hors périmètre restent inchangés.
- Les tests existants de TextInput constituent le précédent pour les transitions focus/blur et la lecture seule; les tests web existants des sélecteurs constituent le point de départ pour leurs intégrations.

## Out of Scope

- Modifier l'ordre de tabulation, le déplacement programmatique du focus ou les interactions clavier propres aux listes d'options.
- Modifier la palette ou créer une nouvelle couleur de focus.
- Modifier les styles de survol, d'appui, d'erreur ou de succès en dehors de leur priorité face au focus.
- Modifier l'anneau de focus des boutons, liens, cases à cocher, radios ou autres contrôles interactifs.
- Changer les API publiques des composants.

## Further Notes

- Référence visuelle : https://atlassian.design/components/select/examples
- L'ADR 0002 place déjà les primitives de focus dans le thème.
- L'ADR 0012 précise la distinction entre la bordure des champs et l'anneau des autres contrôles.
