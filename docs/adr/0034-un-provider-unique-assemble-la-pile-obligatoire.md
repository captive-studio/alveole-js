---
status: accepted
area: distribution
---

# Un provider unique assemble la pile obligatoire

`AlveoleProvider` (`@alveole/components`) monte, dans cet ordre, les providers
sans lesquels un composant Alveole ne fonctionne pas : `SafeAreaProvider` ›
`ThemeProvider` › `TamaguiProvider` › `KeyboardProvider` › `Toasts`. Il prend
la config Tamagui de l'application (`tamaguiConfig`, obligatoire, car le
`declare module 'tamagui'` qui la type vit dans l'application), la palette
(`palette`) et transmet `loader`, `onReady` et `staticCSS` au `ThemeProvider`.

Le motif n'est pas d'économiser des lignes mais de tenir un ordre que la
documentation ne savait plus transmettre : le Sheet de Tamagui v3 lit ses
retraits dans `SafeAreaProvider`, qui doit envelopper `TamaguiProvider`. Lors de
cette décision, le guide d'installation plaçait `ThemeProvider` au-dessus de
`SafeAreaProvider` et omettait `KeyboardProvider`, à l'inverse du catalogue.

`AppUpdateProvider`, `LinkAccessContext` et `PageMetaProvider` restent hors du
provider : ils portent la logique de l'application (écran bloquant, droits
d'accès, balises `<meta>`). Les y mettre ne casserait rien, mais ferait grossir
ses props à chaque besoin applicatif et figerait leur position dans l'arbre.

## Conséquences

Les briques restent exportées pour les tests et les cas particuliers. Le
catalogue monte lui-même `AlveoleProvider`, et le guide d'installation ne montre
que lui. `KeyboardProvider` peut être désactivé (`keyboardProvider={false}`) par
une application qui monte déjà le sien ; sinon le provider le plus interne masque
le sien et son `setEnabled` n'agit plus sur les composants Alveole.
