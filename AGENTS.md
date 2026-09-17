# AGENTS.md

## Agent skills

### Ticket workflow

Avant de créer ou rédiger des tickets d'implémentation, toujours exécuter
`$to-spec` : explorer le dépôt, faire valider les points de test, rédiger la
spec parent et la publier dans l'issue tracker avec le label
`ready-for-agent`. Utiliser ensuite cette spec comme source de `$to-tickets`.
Si la publication est impossible, préparer le contenu exact, le marquer
explicitement comme non publié, puis seulement proposer le découpage.

### Issue tracker

Les tickets et spécifications sont suivis dans le projet Jira ALV, tableau 514.
Voir `docs/agents/issue-tracker.md`.

### Triage labels

Le dépôt utilise les cinq labels de triage standards. Voir
`docs/agents/triage-labels.md`.

### Domain docs

Le dépôt utilise une documentation de domaine single-context. Voir
`docs/agents/domain.md`.
