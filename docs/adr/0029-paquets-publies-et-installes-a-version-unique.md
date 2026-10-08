---
status: accepted
area: distribution
---

# Les paquets Alveole sont publiés et installés à une version unique

`@alveole/components`, `core`, `theme`, `storybook` et `eslint-config` sortent
ensemble : `scripts/publish-package` lit la version du premier paquet et la
réécrit dans tous les autres. Une application les installe donc tous au même
numéro, en version exacte, sans `^` ni `~` — y compris dans la clé
`allowScripts` qui autorise le `postinstall` de `@alveole/components`.

On a préféré cette version unique à un semver par paquet. Les paquets ne sont
pas indépendants : `components` lit les jetons de `theme`, `storybook` rend les
stories de `components`, et `eslint-config` connaît les conventions des
composants. Une version par paquet obligerait à tenir une matrice de
compatibilité que personne ne relirait ; une seule version la remplace par une
règle qu'on vérifie d'un coup d'œil dans `package.json`.

## Conséquences

Entre eux, les paquets se déclarent en `peerDependencies: "*"` : npm n'empêche
donc pas une application de mélanger les versions. La règle n'est tenue que par
la documentation — la page Installation du catalogue la pose en deuxième étape —
et par la discipline de monter tous les paquets d'un coup. Les écarts se voient
pourtant : lors de la rédaction de cette page, la clé `allowScripts` de groove
était restée en 1.8.4 alors que les paquets étaient en 1.10.0, ce qui désactive
silencieusement la copie des fichiers PDF.

Un paquet inchangé change quand même de version à chaque sortie. C'est le prix
accepté.
