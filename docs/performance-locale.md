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

## Priorité du prochain diagnostic

La suite des composants est le coût récurrent dominant parmi les commandes de
développement mesurées. La couverture ajoute du travail, mais sa suppression
laisse encore près de 50 secondes pour 103 tests. Un test ciblé réduit déjà le
délai à environ 7 secondes.

Prochaine comparaison utile : profiler l'initialisation d'une suite web et d'une
suite native, puis distinguer le chargement des modules, la préparation des
providers et l'exécution des assertions. Comparer chaque modification sur les
mêmes suites, avec caches identiques et plusieurs essais alternés. Les présents
chiffres ne justifient pas encore de modifier les mocks ou de réduire la
couverture.
