# @alveole/eslint-config

Configuration ESLint partagée (flat config) pour les projets Alveole.

## Usage

Dans un workspace:

```js
// eslint.config.js
module.exports = require('@alveole/eslint-config');
```

## Seuils de complexité et dette gelée

Les règles de complexité sont posées au niveau visé, pas au niveau constaté. La dette
existante est gelée dans le `eslint-suppressions.json` de chaque workspace, versionné.
Conséquences : toute nouvelle violation fait échouer le lint, y compris dans un fichier
déjà en dette, et une entrée devenue inutile le fait échouer aussi. Le fichier ne peut
donc que rétrécir.

Après avoir assaini un fichier :

```sh
npx eslint . --prune-suppressions
```

Geler une dette supplémentaire demande une raison explicite :

```sh
npx eslint . --suppress-rule <regle>
```
