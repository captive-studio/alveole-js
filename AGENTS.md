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

### Mode autonome

Sous `/implement`, l'agent mène le ticket jusqu'au bout sans demander de
validation, ce qui vaut demande explicite au sens des règles globales :

1. Créer la branche `ALV-<n>-<slug>` dans un worktree frère.
2. Commiter en français avec gitmoji, en stageant des fichiers explicites
   (jamais `git add .` ni `-A`).
3. `git push -u origin <branche>`, puis `gh pr create` avec un corps rédigé
   via `/pr`. Pas de draft.
4. Attendre la CI : `gh pr checks <n> --watch --fail-fast`. Si elle est rouge,
   corriger, pousser, attendre de nouveau.
5. CI verte : `gh pr merge <n> --merge --delete-branch`.
6. Commenter le ticket Jira ALV avec le lien de la PR mergée, puis le
   transitionner vers « Terminé ».
7. Supprimer le worktree.

S'arrêter et demander dans ces cas :

- la CI échoue deux fois de suite sur la même cause ;
- `/code-review` remonte un point bloquant ;
- le changement exige un bump de version, une publication ou une modification
  de pin de dépendance ;
- le ticket ne se ferme pas faute de transition « Terminé ».

### Domain docs

Le dépôt utilise une documentation de domaine single-context. Voir
`docs/agents/domain.md`.
