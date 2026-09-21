# @alveole/eslint-config

Configuration ESLint partagée (flat config) pour les projets Alveole.

## Usage

Dans un workspace:

```js
// eslint.config.js
module.exports = require('@alveole/eslint-config');
```

## Seuils de complexité et gel fermé

Les règles de complexité sont posées au niveau visé, pas au niveau constaté. La dette
existante a été gelée le temps de l'absorber, dans le `eslint-suppressions.json` de chaque
workspace. **Les quatre workspaces sont désormais à zéro, et le gel est fermé** : la CI
échoue si un `eslint-suppressions.json` retient la moindre offense.

```sh
pnpm run check:suppressions
```

Conséquence pour qui écrit du code ici : une violation se corrige, elle ne se gèle plus.
`--suppress-all` et `--suppress-rule` ne sont plus une issue, et un `eslint-disable` inline
est une décision de revue, pas un réflexe.

Si une règle s'avère mal calibrée, c'est la règle qui se discute, dans ce paquet, pour tout
le monde à la fois. Geler une exception au cas par cas revenait à la discuter nulle part.
