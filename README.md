# Alveole

## Packages

- `@alveole/theme` — thème partagé (tokens, typographies, helpers). Voir `packages/theme/README.md`.
- `@alveole/eslint-config` — configuration ESLint partagée (flat config). Voir `packages/eslint-config/README.md`.

## Déployer (publication npm)

La publication passe par le script du repo.

### Pré-requis

- Avoir un token npm valide qui contourne la 2FA (token d'automatisation), puis l'exporter : `export NPM_TOKEN="npm_xxx"`.
- Être à la racine du repo.

### Étapes

```bash
npm run publish:package
```

Le script :

- configure le token npm,
- propose la liste des packages,
- demande le package (ex: `theme`) et le type de version (`patch/minor/major`),
- build puis publie le package.
