---
status: accepted
area: theme
---

# La bague de focus vient d'une règle CSS, portée par une marque du kit

`@alveole/theme` émet une troisième forme de CSS, en plus de l'`@import` des
polices et du bloc `:root` : une règle `:focus-visible` qui dessine la bague de
focus. Elle ne s'applique qu'aux éléments portant l'attribut
`data-alveole-focus`, que les composants du kit posent eux-mêmes via
`focusRingProps()`.

Cet ADR **étend** le 0008 sans le superséder : le design system continue de ne
rien imposer à l'application cliente. Un `<a>` ou un `<button>` écrit par
l'application ne porte pas la marque et n'est pas repeint.

## Ce qui a déclenché la décision

La bague était posée par un state React branché sur `onFocus`, en style inline.
Le commentaire qui l'expliquait, dans `Tabs.tsx`, disait la vraie raison :

> `focusStyle` … se compile en classe CSS `:focus` : jsdom ne résout pas ce
> pseudo-sélecteur dans `getComputedStyle`. […] le focus est tracké via un state
> React réel, appliqué en style inline.

Une limite de l'environnement de test dictait donc le comportement en
production. Et elle ne pouvait pas donner le bon résultat : le `Pressable` de
react-native-web n'expose qu'un `focused` brut, sans notion de modalité. Mesuré
en navigateur, `Button` et `Tabs` affichaient la bague **au clic à la souris**,
là où `Checkbox`, `Switch` et `RadioGroup` ne la montraient qu'au clavier.

Trois autres écarts, constatés au même moment :

- `ButtonIcon`, `Accordion` et la primitive de lien `A` n'avaient aucun
  traitement : ils tombaient sur le contour par défaut du navigateur.
- L'anneau prenait `BleuCaptive['main-525']` (#0379EF) et la bordure de focus
  des champs `Colors.Focus[525]` (#0A76F6) : deux bleus voisins pour un même
  état, alors que le ramp `Focus` existait déjà.
- Les champs cachés d'`OtpField` montraient le contour de Chrome par-dessus des
  cellules dont la bordure disait déjà le focus.

## Ce que font les références

Les trois s'accordent sur `:focus-visible`, jamais `:focus`, et sur 2 px avec un
token de couleur unique : Primer (`focus.outline-width: 2px`,
`focus.outline-color`), `@atlaskit/focus-ring` (`--ds-border-width-focused`,
`--ds-border-focused`), Base (`:focus-visible` seul, anneau bi-ton en
`box-shadow`). Aucune ne passe par un state JS.

Le triptyque de sélecteurs est repris d'`@atlaskit/focus-ring` :

```css
[data-alveole-focus]:focus-visible {
  /* la bague */
}
[data-alveole-focus]:focus:not(:focus-visible) {
  outline: none;
}
[data-alveole-focus='inset']:focus-visible {
  outline-offset: -2px;
}
```

L'opt-in par marque est également le modèle d'Atlassian, où chaque composant
demande sa bague. Primer applique la sienne globalement : ce choix-là est fermé
par l'ADR 0008.

## Tamagui fait exception, et cette exception est structurelle

`Checkbox`, `Switch` et `RadioGroup` gardent la prop `focusVisibleStyle` de
Tamagui **en plus** de la marque. Tamagui injecte sa propre règle :

```css
:root:root:root:root ._outlineColor-0focus-visible-… :focus-visible {
  outline-color: var(--outlineColor) !important;
}
```

Aucune feuille de style ne bat `!important` derrière quatre `:root`. Sans la
prop, c'est le gris translucide de Tamagui qui s'affiche - constaté en navigateur
après l'avoir retirée. La valeur passée à la prop vient de `focusRing()`, qui
lit les mêmes constantes que la règle CSS : deux chemins d'application, une
seule source de vérité.

Pour la même raison, la règle CSS porte elle-même `!important` : Tamagui laisse
un `outline: none` en **style inline** sur certains conteneurs, et un style
inline bat toute feuille de style. C'est sans danger parce que la règle ne
touche que ce qui a explicitement demandé la bague : un champ, qui éteint son
contour au profit de sa bordure (ADR 0016), ne porte pas la marque.

## Les champs gagnent un anneau encastré (amende l'ADR 0016)

Le champ signalait son focus par un seul trait de 1 px recoloré. Une fois le
reste du kit passé à une bague nette de 2 px, il est devenu le point faible
visuel de l'ensemble - constaté à l'écran, pas déduit.

Deux références sur trois ont pu être lues sur ce point précis, et elles
s'accordent sur le fond tout en divergeant sur le moyen :

- **Primer** (`TextInputWrapper.module.css`) : `border-color: accent` **et**
  `outline: var(--borderWidth-thick) solid accent` avec `outline-offset: -1px`.
- **Base** (`src/input/styled-components.ts`) : bordure de **2 px en
  permanence**, au repos comme au focus ; le focus la recolore, sans anneau.
- **Atlassian** : non vérifiable. `@atlaskit/textfield` est compilé en classes
  atomiques dont les valeurs ne sont pas dans le paquet.

C'est la voie de Primer qui est retenue : celle de Base imposerait 2 px de
bordure **au repos** sur tous les champs du kit, donc un changement de leur
apparence permanente, là où Primer laisse le repos intact et n'épaissit qu'au
focus. Le plus petit changement pour le même gain.

L'anneau vit dans `focusBorder()`, que tous les champs consomment déjà : un seul
endroit, et `Select`, `SelectMultiple` (supprimé depuis, ADR 0026), `PriceInput` et
`OtpField` suivent sans être touchés. Il est encastré (`outline-offset` négatif), ce qui préserve le
motif d'origine de l'ADR 0016 : rien ne pousse la mise en page.

## Un arrêt clavier invisible est pire qu'une bague laide

`Tabs.List` portait `tabIndex=0` sans rien afficher : la tabulation s'y arrêtait
sans que rien ne l'indique. La retirer de l'ordre de tabulation a été essayé et
rend le composant **entièrement inatteignable** : Tamagui donne `tabIndex=-1` à
tous les onglets et fait de la liste le point d'entrée, les flèches circulant
ensuite entre eux. Mesuré en navigateur : zéro onglet atteint sur 160 `Tab`.

C'était donc la bague qui manquait, pas l'arrêt qui était de trop. Même chose
pour le panneau de contenu (`Tabs.Content`), focalisable par le motif ARIA.

La règle se généralise : tout élément que le kit rend focalisable doit porter la
marque. `Highlight` rend sa zone de code focalisable exprès (règle
`scrollable-region-focusable` d'axe) et n'affichait que le contour du navigateur ;
l'ancre de section d'`AnchorHeading` est `opacity: 0` hors survol, et la
tabulation s'y arrêtait sur un lien **entièrement invisible** - elle apparaît
désormais au focus, par un state React, ce qui est ici inoffensif puisque le but
est précisément de la montrer quelle que soit la provenance du focus.

## Conséquences

- Le test gardien de l'ADR 0008 admet une troisième forme : un morceau peut
  commencer par `[data-alveole-focus`. L'invariant reste sous sa forme positive,
  et un générateur qui poserait un style d'élément non marqué le fait toujours
  échouer.
- `focusRing('emphasis')` n'a aucun consommateur et n'en a jamais eu. Avec un
  décalage extérieur de 2 px, la bague se pose sur le fond de page et non sur le
  bouton : la variante « fond plein » n'a pas d'objet. Son retrait est un
  changement d'API publique, laissé à une décision séparée.
- Les composants qui passent par `Box onPress` (items de `Sidebar` et
  d'`ActionMenu`, lignes et cellules de `DataTable`, `ListItem`) ne sont pas
  atteignables au clavier du tout : la marque n'y changerait rien. Les rendre
  focalisables modifie l'ordre de tabulation et relève d'un chantier distinct.
