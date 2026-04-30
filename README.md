# Alveole

## Packages

- `@alveole/theme` — thème partagé (tokens, typographies, helpers). Voir [packages/theme/README.md](./packages/theme/).
- `@alveole/core` — Core des différents packages. Voir [packages/core/README.md](./packages/core/).
- `@alveole/eslint-config` — configuration ESLint partagée (flat config). Voir [packages/eslint-config/README.md](./packages/eslint-config/).
- `@alveole/components` — composants de l'ui-kit. Voir [packages/components/README.md](./packages/components/).

## Développement local

Pour itérer localement sur les packages sans publier de version npm, le repo expose un script `publish:local`.

Pour lancer l'ui-kit en local sans passer par un autre projet :
`npm run start:ui-kit` (Il est nécessaire de lancer un npm run build pour appliquer les changements venant des packages, sans avoir besoin de couper le serveur de l'ui-kit)

### Exemple

```bash
npm run publish:local -- /absolute/path/to/local-project
```

### Ce que fait le script

- détecte les packages `@alveole/*` déjà installés dans le `node_modules` du projet cible
- build les packages locaux dans l'ordre des dépendances
- génère un tarball avec `npm pack` pour respecter le contenu réellement publiable
- remplace le contenu des packages correspondants dans le `node_modules` du projet cible

### Pré-requis

- lancer la commande depuis la racine de ce repo
- passer un chemin absolu vers un projet local existant
- le projet cible doit déjà avoir ses `node_modules` installés

### Notes

- le script doit être lancé après chaque modification d'alveole, les changements ne sont pas écoutés
- les modifications poussées doivent repasser par un lancement de Metro ; il faut couper le projet cible puis le relancer avec `npm run start:dev`
- le script ne modifie pas le `package.json` ni le lockfile du projet cible
- pour remettre les versions publiées dans le `node_modules` du projet cible, relancer une installation des dépendances avec `npm i`
- les modifications poussées avec `publish:local` sont temporaires et locales ; pour les persister durablement dans les projets ciblés, il faut publier une nouvelle version d'Alveole puis réinstaller ou mettre à jour les dépendances du projet cible

## Déployer (publication npm)

La publication passe par le script du repo, puis la CI prends le relai

### Étapes

- Être à la racine du repo.
- Exécuter la commande :

```bash
npm run publish:package
```
