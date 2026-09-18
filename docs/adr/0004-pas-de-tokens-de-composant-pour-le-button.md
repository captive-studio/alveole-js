---
status: accepted
area: button
---

# Pas de couche de tokens de composant pour le Button

Primer interpose entre ses tokens sémantiques et ses composants une couche par
composant, une variable par variant et par état
(`--button-primary-bgColor-rest / -hover / -active / -disabled`). Cette couche
n'est pas introduite dans Alveole : le `Button` continue de lire directement les
tokens sémantiques (`light.background['action-high-primary']`).

La raison est le périmètre, pas le désaccord : la couche ouvrirait un chantier
de tokens à part entière, alors que le chantier en cours porte sur le composant.

## Conséquences

- Le bénéfice perdu est la surcharge fine par les apps clientes : elles ne
  pourront pas retoucher l'état de survol des boutons sans toucher à la palette.
- Le bénéfice **conservé** est la suppression des cascades `if`. La table de
  styles `variant × état` ne dépend pas de cette couche : elle peut lire les
  tokens sémantiques actuels. Les cinq fonctions de `Button.tsx` qui répètent
  chacune la même chaîne `if (variant === ...)` sont remplacées par une table,
  indépendamment de cette décision.
- Sur web, les tokens sémantiques sont déjà émis en variables CSS par
  `toCSSVarPalette`. Un mode sombre web reste donc atteignable en réémettant ce
  bloc sous un sélecteur, sans modifier les composants. Sur natif, où la
  résolution est statique, le sujet reste entier.
