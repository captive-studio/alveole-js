---
status: accepted
area: quality
---

# La qualité du code se tient par des exigences, pas par une note agrégée

Le dépôt mesure sa qualité structurelle par des bornes ESLint posées au niveau
voulu : complexité cyclomatique, complexité cognitive, profondeur
d'imbrication, nombre de paramètres, taille des fonctions et des fichiers. Le
glossaire les nomme **exigences** pour les distinguer des **cliquets**, qui
enregistrent l'état mesuré et refusent seulement qu'il se dégrade.

Il n'existe volontairement **aucune note agrégée** du type RubyCritic, qui note
un projet Ruby sur 100 à partir du Flog moyen par méthode.

## Pourquoi pas de note

L'équivalent JavaScript de RubyCritic a été cherché avant d'être écarté. Toute
la famille historique (`plato`, `escomplex`, `complexity-report`,
`typhonjs-escomplex`) est abandonnée depuis sept à dix ans et ne parse pas
TypeScript. Restent SonarQube, qui demande un serveur, et le fait-maison, qui
est presque gratuit : la règle `complexity` d'ESLint rapporte la valeur mesurée
dans son message dès qu'on pose `max: 0`, JSX compris, et une trentaine de
lignes suffisent à reproduire la formule.

Le coût n'est donc pas l'argument. Les deux vrais sont ailleurs.

**Une note se dilue.** Elle est une moyenne, et le dépôt compte des dizaines de
petits fichiers de tokens dans `@alveole/theme` qui la tirent vers le haut sans
rien dire du code qui pose problème. La mesure faite avant cette décision le
montre : sur 1214 fonctions de production, la complexité cyclomatique moyenne
est de **2,24**, la médiane de **1**, et la complexité cognitive moyenne de
**0,74** pour une médiane de **0**. Une note aurait affiché un score excellent
et n'aurait rien fait remonter. Le problème n'est pas le corps de la
distribution, il est dans sa queue : dix-huit fonctions collées au plafond.

**Une note se manipule.** Le score RubyCritic dépend du nombre de fichiers, ce
qui rend rentable l'éclatement d'une classe en plusieurs fichiers sans
découplage réel. La pratique est proscrite sur les projets de l'auteur, et
l'équivalent JavaScript serait encore plus facile. Une exigence ne se dilue ni
ne se contourne par le volume : elle désigne un fichier et une ligne, et
déplacer la complexité ailleurs la fait retomber sous la même borne.

## Comment une exigence se durcit

Une exigence ne bouge jamais toute seule, et surtout jamais vers le haut parce
que le code ne passe pas. Pour la descendre, **le chantier de correction
précède la baisse** : on corrige les offenses au niveau visé, puis on inscrit
la nouvelle valeur. Le gel ESLint reste fermé et vide, et
`scripts/check-suppressions.mjs` fait échouer la CI si un
`eslint-suppressions.json` retient la moindre offense.

Cet ordre est le seul compatible avec le gel fermé. Les trois autres voies ont
été écartées : rouvrir le gel le temps d'absorber rendrait au gel la fonction
qu'on venait de lui retirer ; n'appliquer l'exigence qu'aux fichiers touchés par
une PR demanderait deux passes de lint et une définition du diff ; un cliquet
sur le nombre d'offenses ne dirait pas où elles sont.

## Les niveaux, et pourquoi ceux-là

Ce tableau donne les niveaux **visés**. Ils sont atteints lot par lot, chacun
précédé de son chantier de correction ; jusqu'à ce qu'un lot passe, la config
porte encore la valeur précédente.

| exigence                       | valeur | ce qui l'arrête là                                                                                                                                      |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `complexity`                   | 6      | le p90 du dépôt est à 5 ; poser 5 mettrait 10 % du code en infraction permanente, ce qui signale une borne mal calibrée et non un code mauvais          |
| `max-lines-per-function`       | 50     | à 40, 72 des 83 offenses sont des corps de rendu JSX, où la métrique compte des balises ; descendre inciterait à éclater des composants pour le chiffre |
| `sonarjs/cognitive-complexity` | 10     | la fonction la plus lourde du dépôt est à 10 pile ; l'ancienne valeur de 15 ne pouvait déclencher sur rien                                              |
| `max-depth`                    | 2      |                                                                                                                                                         |
| `max-params`                   | 3      |                                                                                                                                                         |
| `max-lines`                    | 250    |                                                                                                                                                         |

La complexité cognitive prime sur la cyclomatique pour juger du JSX : elle
pénalise l'imbrication et non le rendu conditionnel.

## Ce qui complète les exigences

La duplication est couverte par `sonarjs/no-identical-functions`,
`no-duplicated-branches`, `no-all-duplicated-branches` et
`no-identical-expressions`, l'équivalent du Flay, plus `jscpd` sur l'ensemble
du dépôt.

La couverture de tests reste un **cliquet** et non une exigence, mais son
relevage cesse de dépendre de la discipline :
`scripts/check-coverage-ratchet.mjs` fait échouer la CI quand la couverture
mesurée dépasse le cliquet enregistré de plus de deux points. Un gain non
reporté dans `coverageThreshold` n'est protégé par rien, et le script le
réclame plutôt que d'y compter.

Enfin, `scripts/` et `tools/` sont soumis aux mêmes exigences via une config
ESLint à la racine. Le code qui porte les garde-fous ne peut pas être le seul à
leur échapper.
