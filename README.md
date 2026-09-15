# Alveole

[![Npm package version](https://badgen.net/npm/v/@alveole/components)](https://npmjs.com/package/@alveole/components)

**Documentation** : [alveole.captive.fr](https://alveole.captive.fr)

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

- détecte les packages `@alveole/*` déjà installés dans le `node_modules` de l'application cliente
- build les packages locaux dans l'ordre des dépendances
- génère un tarball avec `npm pack` pour respecter le contenu réellement publiable
- remplace le contenu des packages correspondants dans le `node_modules` de l'application cliente

### Pré-requis

- lancer la commande depuis la racine de ce repo
- passer un chemin absolu vers un projet local existant
- l'application cliente doit déjà avoir ses `node_modules` installés

### Notes

- le script doit être lancé après chaque modification d'alveole, les changements ne sont pas écoutés
- les modifications poussées doivent repasser par un lancement de Metro ; il faut couper l'application cliente puis la relancer avec `npm run start:dev`
- le script ne modifie pas le `package.json` ni le lockfile de l'application cliente
- pour remettre les versions publiées dans le `node_modules` de l'application cliente, relancer une installation des dépendances avec `npm i`
- les modifications poussées avec `publish:local` sont temporaires et locales ; pour les persister durablement dans les applications clientes, il faut publier une nouvelle version d'Alveole puis réinstaller ou mettre à jour les dépendances de l'application cliente

## Duplication

`npm run check:duplication` mesure la duplication de code avec
[jscpd](https://github.com/kucherenko/jscpd), sur les sources des packages hors stories et
tests. Le job CI `Detect duplication` échoue si le taux dépasse le seuil de `.jscpd.json`,
posé juste au-dessus du taux mesuré : la duplication ne peut donc que baisser.

Cette mesure complète `sonarjs/no-identical-functions`, qui ne compare qu'à l'intérieur d'un
même fichier. Seul jscpd voit la duplication entre fichiers et entre packages.

Une part de ce qu'il signale est assumée : les variantes de plateforme (`Composant.tsx` et
`Composant.web.tsx`) se ressemblent par construction. Si un nouveau composant à variantes fait
sauter le seuil, relever celui-ci est légitime, à condition de le dire dans le message de commit.

## Accessibilité

Chaque page du catalogue est auditée par [axe](https://github.com/dequelabs/axe-core) dans un
navigateur, sur le site de documentation compilé. La CI échoue dès qu'une violation nouvelle
apparaît : les violations déjà connues sont figées dans `apps/docs/e2e/a11y-baseline.json`.
Le raisonnement derrière ce cliquet est dans [l'ADR 0006](./docs/adr/0006-audit-accessibilite-en-cliquet.md).

```bash
npm run build --workspace=apps/docs   # le site auditable
npm run test:a11y --workspace=apps/docs
```

Après avoir corrigé une violation, resserrer la référence, sinon la CI signale l'écart :

```bash
npm run test:a11y:baseline --workspace=apps/docs   # serveur sur http://localhost:4173 requis
```

Parcourir les 77 pages coûte près de deux minutes. Un motif facultatif restreint l'audit
aux pages dont le nom le contient, les autres gardant leur relevé précédent :

```bash
npm run test:a11y:baseline --workspace=apps/docs -- Select   # Select et SelectMultiple
```

## Déployer (publication npm)

La publication passe par le script du repo, puis la CI prends le relai

### Étapes

- Être à la racine du repo.
- Exécuter la commande :

```bash
npm run publish:package
```
