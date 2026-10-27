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
2. `pnpm run check` vert, puis commiter en français avec gitmoji, en stageant
   des fichiers explicites (jamais `git add .` ni `-A`).
3. `git push -u origin <branche>`, puis `gh pr create` avec un corps rédigé
   via `/pr`. Pas de draft.
4. Rendu du catalogue touché : régénérer les clichés par
   `gh workflow run catalogue-screenshots.yml --ref <branche>`, attendre son
   commit 📸, puis vérifier que seules les pages attendues changent de rendu.
5. Attendre le run `pull_request` de `ci.yml` sur le dernier SHA de la branche
   (`gh run list --workflow ci.yml --branch <branche> --event pull_request`,
   puis `gh run watch <id> --exit-status`). `gh pr checks --watch` rend vert
   tant que ce run n'est pas encore attaché à la PR. Si elle est rouge,
   corriger, pousser, attendre de nouveau.
6. CI verte : `gh pr merge <n> --rebase --delete-branch`.
7. Commenter le ticket Jira ALV avec le lien de la PR mergée, puis le fermer :
   `acli jira workitem transition --key ALV-<n> --status "15. Done" --yes`.
8. Supprimer le worktree s'il figure encore dans `git worktree list`.

S'arrêter et demander dans ces cas :

- la CI échoue deux fois de suite sur la même cause ;
- `/code-review` remonte un point bloquant ;
- le changement exige un bump de version, une publication ou une modification
  de pin de dépendance ;
- le ticket ne passe pas en `15. Done`.

### Domain docs

Le dépôt utilise une documentation de domaine single-context. Voir
`docs/agents/domain.md`.
