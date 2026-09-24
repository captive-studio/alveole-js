---
status: accepted
area: quality
---

# Chaque assertion va au niveau de test qui sait la prouver

Un test se range dans l'un des trois **niveaux de test**, choisi d'après ce que
l'assertion affirme et non d'après le composant qu'elle concerne :

| niveau              | ce qu'il prouve                                                                                          | où il vit                                                                     | ce qu'il ne contient pas                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1. logique pure     | une entrée donne une sortie : style par état, calcul, transformation de données                          | modules de style par état (ADR 0025), fonctions et hooks extraits, sans rendu | aucun rendu de composant                                                       |
| 2. contrat en jsdom | le **contrat** du composant : rôle, nom accessible, états ARIA, clavier, callbacks                       | `*.test.tsx` et `*.test.web.tsx`, avec les helpers de rendu existants         | aucune dimension, bordure, couleur ni style calculé                            |
| 3. navigateur réel  | ce que seul un moteur de rendu sait établir : hauteurs, alignements, bordures, bague de focus, audit axe | la suite Playwright d'`apps/docs/e2e`, sur les pages du catalogue             | aucune assertion nouvelle : il ne reçoit que des assertions venues du niveau 2 |

Aucune nouvelle frontière de test n'est créée : les trois niveaux existent déjà
dans le dépôt, la décision fixe ce qui va où.

## Pourquoi

jsdom n'a pas de moteur de mise en page. Une hauteur, une bordure ou une bague
de focus y valent ce que le style déclaré dit qu'elles valent : un test vert n'y
prouve pas que le rendu est correct. Ces assertions coûtent pourtant cher : un
composant complet (Tamagui, react-native-web, thème) rendu dans jsdom coûte en
moyenne plus de deux secondes par suite, contre un quart de seconde pour une
suite sans rendu. Elles cumulent donc le coût le plus élevé et la valeur de
preuve la plus faible.

Ranger chaque assertion au niveau qui sait la prouver rend la boucle rapide
sans rien retirer : la logique descend au niveau 1, le contrat reste au niveau
2, le visuel monte au niveau 3, où il devient enfin une preuve.

## Un nouveau test

Un nouveau test s'écrit directement au bon niveau, en partant du plus bas
possible. Une logique qui ne serait testable que par rendu est d'abord extraite
dans un module pur, puis testée au niveau 1. Le rendu jsdom n'est pas le niveau
par défaut : il est réservé au contrat.

## L'accessibilité aux trois endroits

La migration ne retire aucune vérification d'accessibilité, elle la répartit :

- **ESLint** vérifie le statique (attributs, rôles déclarés) à chaque lint.
- **Le niveau 2** vérifie le contrat accessible : rôle, nom accessible, états
  ARIA, prise de focus et interactions au clavier. Ces assertions ne quittent
  jamais jsdom.
- **Le niveau 3** fait tourner l'audit axe sur tout le catalogue, à zéro
  violation, inchangé (ADR 0006).

## Ordre de migration

Une assertion visuelle quitte jsdom seulement **une fois son équivalent au
niveau 3 vert en CI**. L'ordre est le même que pour une exigence (ADR 0021) :
le remplaçant précède le retrait, pour qu'aucune garantie ne manque, même le
temps d'une PR.

## Traçabilité d'un test retiré

Chaque test ou assertion retiré d'une suite jsdom est tracé dans sa PR vers
l'assertion qui le remplace : fichier et nom du test au niveau 1 ou 3, ou
mention qu'il était redondant avec une assertion restée au niveau 2. Le
relecteur vérifie ainsi qu'aucune garantie n'a été perdue. Le cliquet de
couverture (ADR 0021) sert de filet : une logique oubliée en route fait baisser
la couverture et échouer la CI.

## Conséquences

Le niveau 3 ne s'étend pas au-delà des assertions déplacées : les clichés de
régression visuelle (ADR 0011) restent un chantier distinct, et le job e2e ne
grandit que du coût de ce qu'il reçoit.

La section tests de l'ADR 0025 renvoie à cet ADR.
