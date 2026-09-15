# Temps de travail en local

Mesures du 16 septembre 2026 sur `main` au commit `40c1c83b`, après les
optimisations des imports date-fns et Prism (#317).

## Conditions

- macOS, Node 24.21.0, worktree `/private/tmp/alveole-catalogue-bundle`.
- Dépendances déjà installées, fichiers compilés et caches existants. Aucun
  nettoyage des caches : ces résultats ne décrivent pas une installation neuve.
- Commandes chronométrées successivement, sorties redirigées vers des fichiers.
  D'autres worktrees exécutaient des tests et Spotlight était actif : les temps
  absolus et les écarts entre essais restent indicatifs.
- Deux workers Jest ; export du catalogue limité à deux workers Metro.

## Résultats

| Opération                                                                    | Durée observée                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `npm run build:packages`, trois essais sans modification                     | 7,70 / 10,62 / 14,29 s                          |
| `npm run test:dev -- --runTestsByPath src/core/Highlight/Highlight.test.tsx` | 7,43 s au total, dont 4,54 s Jest ; 5 tests     |
| `npm run test:dev`, tous les composants sans couverture                      | 50,65 s au total, dont 48,22 s Jest ; 103 tests |
| `npm run test:unit`, tous les packages avec couverture                       | 90,93 s au total ; 152 tests                    |
| Part des composants dans la suite avec couverture                            | 68,14 s Jest ; les mêmes 103 tests              |
| Export de production du catalogue, cache existant                            | 31,82 s ; 117 routes                            |
| Démarrage normal jusqu'à réception du premier bundle web                     | 13,47 / 6,48 s                                  |
| Serveur HTTP disponible pendant ces démarrages                               | 10,73 / 3,76 s                                  |

Tous les tests passent. Les différences entre les essais ne suffisent pas à
établir un gain causal, compte tenu de la charge concurrente et des caches.

### Démarrage

Commande : `EXPO_OFFLINE=1 BROWSER=none npm run start:ui-kit -- --port 8096`.
Le chronomètre démarre à la création du processus npm, attend la réponse HTML,
puis télécharge le script `.bundle` référencé par la page. La surveillance des
fichiers est activée et le cache est conservé entre les deux processus.

La durée s'arrête à la réception du JavaScript : elle n'inclut ni son exécution
dans le navigateur, ni le rendu de la première fiche. Le bundle reçu pèse
18 449 371 octets, non compressés.

### Build incrémental

Une décomposition supplémentaire, sans lancer les étapes en parallèle, donne :

| Étape                             | Durée  |
| --------------------------------- | ------ |
| TypeScript core                   | 0,50 s |
| TypeScript theme                  | 0,55 s |
| Génération des sources d'exemples | 0,35 s |
| Génération de la version          | 0,04 s |
| TypeScript components             | 1,76 s |
| Copie CSS et préparation PDF      | 0,09 s |
| TypeScript du catalogue           | 1,55 s |

`tsc --extendedDiagnostics` confirme la réutilisation du cache : aucun temps de
vérification de types ou d'émission n'est rapporté pour ces compilations sans
modification. Le total de cette mesure séparée est de 4,84 s ; sa différence avec
les commandes npm précédentes ne permet pas d'attribuer tout l'écart à npm.

### Export de production

Commande :

```sh
EXPO_OFFLINE=1 npm run build --workspace=apps/docs -- \
  --output-dir /tmp/alveole-timing-export --max-workers 2
```

L'export réussit en 31,82 s et produit 117 routes. Metro rapporte 5,43 s pour le
bundle web et 5,55 s pour le bundle serveur ; ces étapes peuvent se chevaucher et
ne doivent pas être additionnées pour expliquer le temps total. Il s'agit d'un
export avec cache existant, sans mesure à froid ni comparaison du nombre de
workers.

## Boucle complète de validation locale

Le démarrage et les tests ciblés ne représentent pas toute la boucle de travail :
`typecheck`, la suite complète, `lint` et `format` sont aussi des commandes
fréquentes. Le diagnostic doit conserver leur périmètre.

| Commande                            | Premier essai | Relance sans modification     |
| ----------------------------------- | ------------- | ----------------------------- |
| `npm run typecheck`                 | 18,46 s       | 18,15 s                       |
| `npm run lint`                      | 83,29 s       | 11,15 s                       |
| `npm run format:check`, avant cache | 27,99 s       | 19,35 s                       |
| `npm run test:unit`                 | 90,93 s       | Non remesuré dans cette série |

La suite avec couverture passe avec 152 tests. Typecheck et format passent ;
le lint passe avec des avertissements existants. Le cache du lint réduit déjà
fortement les relances. Le typecheck reste coûteux malgré l'incrémental.

### Cache de format

`format` et `format:check` utilisent désormais le même cache Prettier par contenu.
La première vérification prend 15,43 s, puis les relances 2,89 et 2,74 s.
Le temps du premier passage varie avec la charge ; le gain recherché concerne
les relances, qui ne réorganisent plus les imports des fichiers inchangés.

Prettier tient compte du contenu, de ses options et de ses propres versions
(Node compris). Le script ajoute une empreinte du lockfile et des tsconfig à la
racine et dans les workspaces : le plugin d'organisation des imports dépend
également de TypeScript et de la configuration JSX. Un changement de ces entrées
sélectionne un nouveau cache. Les caches restent dans `node_modules/.cache` et
sont donc supprimés par `npm ci`. `npm run format:check -- --no-cache` permet un
contrôle sans cache.

Vérification sur une fixture : un fichier modifié et mal formaté est refusé,
`--write` le corrige, `--check` partage le résultat ; changer `jsx: react` en
`react-jsx` fait bien retirer l'import React devenu inutile. Un changement des
options Prettier est également pris en compte.

## Suite du diagnostic

Profiler le typecheck et l'initialisation des suites Jest pour réduire le temps
de la validation complète. La couverture ajoute du travail, mais les mêmes
103 tests de composants coûtent encore 48 s dans Jest sans couverture : elle
n'explique pas seule le coût de la suite. Comparer les changements sur des
périmètres identiques, avec plusieurs essais alternés ; ne pas substituer les
tests ciblés à la suite complète dans les mesures.

## Transformations Jest de Tamagui

Un nouveau relevé de la suite complète, avant cette modification, donne 17,64 s
avec les caches présents, dont 13,18 s pour les composants. L'écart avec les
90,93 s du relevé initial confirme que la charge concurrente et l'état des caches
empêchent de comparer directement deux sessions.

Les fichiers CommonJS publiés par Tamagui sont déjà compilés pour chaque
plateforme. Les exclure de la transformation Babel de Jest évite un traitement
supplémentaire lors de leur chargement. Les résolutions web, iOS et Android ainsi
que les tests et les règles de couverture sont conservés.

Comparaison des 32 suites / 103 tests des composants avec couverture, deux workers,
avec deux répertoires de cache distincts et des essais alternés :

| État du cache | Avant   | Après   |
| ------------- | ------- | ------- |
| Vide          | 32,24 s | 25,98 s |
| Rempli        | 16,24 s | 13,19 s |

Les résumés de couverture sont identiques pour chaque fichier. Un premier essai
hors de cette comparaison a subi un crash V8 (`SIGSEGV` dans le ramasse-miettes) ;
il n'a pas été reproduit dans les essais comparatifs et n'est pas compté dans
les temps ci-dessus. Ces mesures ne constituent pas un diagnostic de ce crash.

Après modification, la commande complète `npm run test:unit` passe avec 152 tests
en 17,09 s, dont 12,81 s pour les composants. Face aux 17,64 s mesurées avant
avec les caches existants, cet écart est trop faible pour revendiquer un gain
stable sur toute la commande à chaud. Le bénéfice le plus net reste celui du
parcours avec un cache de transformations vide.

Le typecheck complet repasse aussi en 5,00 s, sans modification de sa commande.
Les 18 s de la session précédente ne justifient donc pas à elles seules d'ajouter
un ordonnanceur parallèle. Les prochains changements doivent être comparés
à charge et état de cache similaires.
