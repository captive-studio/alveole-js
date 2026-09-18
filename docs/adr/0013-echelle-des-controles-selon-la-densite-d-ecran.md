---
status: accepted
area: controls
---

# L'échelle des contrôles dépend de la densité d'écran, pas d'une valeur unique

Révise la partie « échelle » de [ADR 0002](./0002-primitives-de-controle-partagees.md).
La couche `control.*` et le token de focus qu'il institue restent valides ; seul le choix
d'une échelle unique alignée sur Primer est abandonné.

`control.md` vaut **32 px sur desktop** et **40 px sur mobile et tablette**, piloté par le
`variant` que `useThemeBuilder` calcule déjà à partir de la largeur de fenêtre
(`breakpointToVariant` : Mobile < 768, Desktop >= 992).

## Pourquoi ce n'est pas une échelle unique

Le diagnostic initial, « tout est trop gros », était mesuré contre Primer seul. Or Primer
et Atlassian outillent des produits **professionnels**, où la compacité est une qualité,
tandis que Base sert un produit **grand public** et tactile. Leurs défauts divergent en
conséquence : Primer 32 px, Base 44 px. Alveole, à 40 px, se situait entre les deux.

Chez Captive, le web relève de l'esprit pro (le dashboard), alors que le natif mobile
relève de l'usage au doigt. Une valeur unique tranchait donc arbitrairement en faveur
d'un des deux usages.

Vérifié dans le code : Primer ne concilie pas compacité et tactile, il ignore le sujet
(aucun `pointer: coarse`, aucun agrandissement de zone tactile dans son CSS de bouton).
Il n'y avait donc rien à lui emprunter sur ce point.

L'arbitrage repose sur la largeur de fenêtre plutôt que sur `Platform.OS` : un téléphone
natif est toujours `mobile`, le dashboard sur desktop toujours `desktop`, et le rendu web
de `cae` ou `groove` sur téléphone retombe du bon côté, ce qu'un test de plateforme aurait
manqué. Le thème fait déjà varier une mesure de cette façon (`externalPadding`), ce n'est
donc pas un mécanisme nouveau.

## Conséquences

- Le breaking change se réduit fortement. Mesuré sur les trois consommateurs
  ([[consommateurs-alveole]]) : `dashboard` (25 boutons, web pro) gagne la compacité
  recherchée, tandis que `cae` et `groove` (57 boutons, majoritairement natifs) ne bougent
  pas en usage téléphone. Seuls leurs écrans larges changent.
- La conséquence de l'ADR 0002 sur la cible tactile tombe : à 40 px sur mobile, on ne
  passe plus sous les 44 px de la HIG que de 4 px, contre 12 px avec une échelle à 32 px
  partout. Un `hitSlop` reste souhaitable, il n'est plus indispensable.
- `tablet` est classé avec `mobile` : un iPad en paysage est tactile, et le compter comme
  desktop lui imposerait une densité d'outil pro.
- Coût accepté : deux jeux de valeurs à maintenir, et une hauteur qui change au
  redimensionnement d'une fenêtre, visible surtout en développement.
- Restent à corriger indépendamment de l'échelle, car réellement cassés : `xs` à 36 px
  plus grand que `sm` à 32 px, les trois tailles d'icône seule qui rendent toutes 30 px,
  et le bouton `md` à 40 px face au champ de saisie à 42 px.
