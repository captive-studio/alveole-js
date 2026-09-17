# Issue tracker: Jira

Les tickets et les spécifications de ce dépôt sont suivis dans Jira :

- Instance : `https://captive-team.atlassian.net`
- Projet : `ALV`
- Tableau : `514`
- URL : `https://captive-team.atlassian.net/jira/software/c/projects/ALV/boards/514`

## Conventions

- Identifier les tickets sous la forme `ALV-<numéro>`.
- Utiliser une intégration Jira disponible pour lire, créer, commenter,
  étiqueter, faire transiter et fermer les tickets.
- Avant toute modification, vérifier le projet, la clé du ticket et son état
  courant.
- Si aucune intégration Jira n'est disponible, préparer l'opération exacte et
  son contenu sans prétendre l'avoir exécutée.

## Quand un skill demande de publier dans l'issue tracker

Créer un ticket dans le projet Jira `ALV` et renvoyer sa clé et son URL.

## Quand un skill demande de récupérer le ticket pertinent

Lire le ticket `ALV-<numéro>`, y compris sa description, son statut, ses labels,
ses liens et ses commentaires.

## Wayfinding

Pour `/wayfinder`, utiliser un ticket Jira parent comme carte et des tickets liés
comme enfants. Représenter les blocages avec les liens Jira natifs lorsqu'ils
sont disponibles. Un ticket ne peut être pris que lorsqu'il est ouvert, non
assigné et que tous ses blocages sont résolus.
