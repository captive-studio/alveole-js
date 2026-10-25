---
status: proposed
area: code
---

# Box n'accepte que les tokens du thème

Box est le composant le plus réutilisé d'Alveole (46 dépendants directs). Ses props
d'espacement, de couleur et de rayon n'acceptent que les clés du thème : `SpacingKey`, les
couleurs du thème, `RadiusKey`. Les marges gardent `'auto'` et les pourcentages. Les autres
props de style de Tamagui passent telles quelles (ADR 0031) : Box ne réinterprète que les
props qui portent une dimension du thème.

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
