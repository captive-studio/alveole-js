---
status: accepted
area: theme
---

# Le design system n'applique aucun style global

Le CSS que `@alveole/theme` émet sur le web se limite à deux choses : l'`@import`
des polices et un bloc `:root` de variables. Il ne cible ni `body`, ni `html`, ni
aucun autre élément. Le rendu du texte et les réglages de page appartiennent à
la plateforme et à l'application cliente ; le design system fournit des valeurs,
il n'impose pas de rendu.

## Ce qui a déclenché la décision

Le paquet posait sur `body` :

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

`-webkit-font-smoothing: antialiased` désactive le rendu sous-pixel de macOS. Le
sous-pixel exploite les trois composantes de chaque pixel et triple la résolution
effective du lissage : le désactiver amincit les glyphes et leur fait perdre en
définition, surtout en texte sombre sur fond clair, qui est le cas courant du
design system. La différence a été constatée dans Chrome avant le retrait, pas
seulement déduite.

`text-rendering: optimizeLegibility` était un passager clandestin : il ne touche
pas au lissage mais au crénage et aux ligatures, n'apporte rien sur les
navigateurs actuels, et coûte en calcul de mise en page sur les longs textes.

Les deux références les plus proches confirment la lecture :
[Atlassian](https://atlassian.design/foundations/typography) n'émet aucun
`font-smoothing` dans `@atlaskit/css-reset`, et Primer n'en pose pas sur `body` :
il ne l'applique que sur `Heading` et `Text` sous `[data-color-mode='dark']`.
Aucun des deux n'en fait une règle globale.

## Ce que la règle n'interdit pas

Elle porte sur la portée, pas sur l'antialiasing lui-même. Un composant garde le
droit de déclarer `-webkit-font-smoothing: antialiased` pour lui-même quand son
propre fond le justifie : sur un texte clair sur fond sombre, un `Button` plein
par exemple, le sous-pixel épaissit et bave, et l'antialiasing est alors le bon
choix. C'est exactement ce que fait Primer sur son `Tooltip`.

Un tel réglage est une **décision locale, motivée par un contraste
clair-sur-sombre, et jamais un réflexe**. Aucun composant n'en déclare
aujourd'hui.

## Conséquences

- `generateFontSmoothingCSS` est supprimée, sans déprécation. Elle était exportée
  publiquement par `@alveole/theme`, mais c'était un détail d'implémentation
  injecté par `ThemeProvider` : une application cliente n'a aucune raison de
  l'appeler. Le retrait est un changement d'API assumé.
- Les morceaux de CSS du paquet passent par `generateThemeCSSParts`, consommée à
  la fois par le `<style>` de `WebThemeStyles` et par le `dist/default.css` du
  script de build. La liste n'est plus tenue en phase à la main dans deux
  fichiers.
- Un test vérifie que chaque morceau émis est soit l'`@import` des polices, soit
  le bloc `:root`. C'est l'invariant sous sa forme positive : un nouveau
  générateur qui poserait un style d'élément le fait échouer sans qu'il faille
  penser à étendre le test.
- Le jour où un style global deviendra vraiment nécessaire, il faudra un ADR qui
  supersède celui-ci, pas une ligne glissée dans un utilitaire.
