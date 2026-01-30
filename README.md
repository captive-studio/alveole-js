# Alveole

## Packages

- `@alveole-js/theme` — thème partagé (tokens, typographies, helpers). Voir `packages/theme/README.md`.

## Déployer (publication npm)

La publication passe par le script du repo.

### Pré-requis

- Avoir un token npm valide qui contourne la 2FA (token d'automatisation), puis l'exporter : `export NPM_TOKEN="npm_xxx"`.
- Être à la racine du repo.

### Étapes

```bash
./scripts/publish-package
```

Le script :

- configure le token npm,
- propose la liste des packages,
- demande le package (ex: `theme`) et le type de version (`patch/minor/major`),
- build puis publie le package.
