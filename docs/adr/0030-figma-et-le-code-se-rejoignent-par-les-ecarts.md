---
status: accepted
area: design
---

# Figma et le code se rejoignent par les écarts de maquette

Ni Figma ni le code ne fait foi. On compare un composant à son nœud Figma, propriété
par propriété (hauteur, marges intérieures, police, graisse, couleur, rayon, bordure),
à partir des valeurs relevées dans le catalogue en navigateur réel. Chaque différence
est un écart de maquette, et un écart n'est jamais accepté : il se règle soit en
corrigeant le code, soit en alignant Figma sur une décision prise dans le code. Le
relevé s'exécute à la demande, composant par composant, et c'est l'agent qui modifie
Figma une fois la correction validée.

Pour que le relevé apparie une variante Figma à un rendu du code sans traduction, les
axes de variante Figma portent les noms des props du code (`variant=secondary`,
`size=lg`, `leading`), plus un axe `state` propre à Figma pour les états interactifs.
Chaque valeur d'axe a un exemple d'axe dans la fiche du composant, qui sert de point de
mesure.

## Pourquoi

Les écarts se relevaient jusqu'ici à la main, au cas par cas (voir le tableau de l'ADR
0010), puis restaient sans suite côté Figma. Une source unique de tokens, comme chez
Primer ou Atlassian, aurait demandé un pipeline d'export qu'on n'est pas prêt à tenir.
Les noms alignés reprennent la pratique de Primer, dont les propriétés Figma du Button
portent les noms des props React (`packages/react/src/Button/Button.figma.tsx`).

## Ce qu'on a écarté

- Une liste d'écarts acceptés par composant : elle aurait installé à demeure les
  décisions prises dans le code sans jamais les reporter dans Figma.
- Une table de correspondance entre noms Figma et props : elle aurait figé la
  désynchro de vocabulaire au lieu de la régler.
- Une superposition d'images : un pourcentage de pixels ne dit pas quoi corriger, et
  il réagit au rendu des polices.
- Un relevé en CI : sans source qui fait foi, et avec un fichier Figma qui n'est pas
  versionné avec le code, une PR échouerait sur un désaccord qu'elle n'a pas créé.
- Une grille complète de combinaisons : une story par valeur d'axe suffit, comme les
  stories `features` de Primer.

## Conséquences

Les noms de Figma changent : axes en minuscules, en anglais, calqués sur l'API. Les
variantes `Icône=Seule` sortent vers le composant `ButtonIcon`. Code Connect reste
possible plus tard, sans être nécessaire au relevé.

## Mise en œuvre

- Le relevé est un skill d'agent : il lit le nœud par le MCP Figma et mesure le
  catalogue par un helper Playwright versionné (styles calculés par exemple d'axe).
  Lire Figma hors agent demanderait un jeton d'API REST à gérer.
- Le nœud est trouvé par le `figmaURL` de la fiche. Code Connect est écarté pour
  l'instant : il exige un plan Figma Organization, qu'on n'a pas. Un `figmaURL`
  manquant s'ajoute au moment de relever le composant, jamais en masse.
- Les variables Figma ne sont pas comparées au thème en bloc : leurs écarts
  remontent par les composants qui les utilisent.
- Chaque relevé ouvre un ticket Jira ALV par composant, ses écarts en checklist,
  pour qu'ils ne restent pas sans suite.
- Pilote : `Button`, après vérification que ses axes Figma portent les noms de
  l'API.
