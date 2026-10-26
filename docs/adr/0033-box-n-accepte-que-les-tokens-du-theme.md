---
status: accepted
area: code
---

# Box n'accepte que les tokens du thème

Box est le composant le plus réutilisé d'Alveole (46 dépendants directs). Ses props
d'espacement, de couleur et de rayon n'acceptent que les clés du thème : les clés V/W de
`SpacingKey` (les anciennes clés numériques sont dépréciées), les couleurs du thème et
`'transparent'`, `RadiusKey`. Les marges gardent `'auto'` et les pourcentages. Les autres
props de style de Tamagui passent telles quelles (ADR 0031) : Box ne réinterprète que les
props qui portent une dimension du thème.

La palette se type en `string` : rien ne distingue `'#fff'` d'une couleur du thème. Les
couleurs lues dans le thème portent donc une marque, `ThemeColor`, et `alpha()` la conserve.
Une palette fournie par une app reste en couleurs écrites en dur (`PaletteSource`) ; le thème
la marque à la construction, par `enCouleursDuTheme`, le seul point de passage.

Une couleur à pseudo-état passe en clause objet (`{ default, hover }`), jamais en clause
chaîne (`'x hover:y'`) : une chaîne interpolée perd la marque, et le type laisserait alors
passer `'#f00 hover:#0f0'`. Une valeur qui vient de l'appareil et non du thème, comme les
marges de la zone sûre, passe par `style`.

## Pourquoi

Box acceptait les nombres et les couleurs bruts à côté des tokens. Les apps sortaient de
l'échelle sans le voir : une centaine de nombres bruts dans cae, groove et Alveole, alors que
presque tous égalaient déjà une valeur de `Spacings`. Un nombre brut ne suit ni une évolution
de l'échelle ni le mode sombre, et rien ne le signale.

Atlassian ferme ses primitives aux tokens pour la même raison.

## Ce qu'on a écarté

- Garder l'API ouverte et signaler les valeurs brutes par une règle de lint : la règle
  s'ignore, le type ne s'ignore pas.
- Fermer toutes les props de style, y compris `cursor` ou `position` : elles n'ont pas
  d'échelle dans le thème, et l'ADR 0031 fait passer la doc de Tamagui sans traduction.
- Un codemod de migration : une centaine d'occurrences dans trois apps ne justifie pas un
  outil à maintenir. Un guide de migration suffit.
