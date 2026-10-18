# Prototype ALV-122 : la bague de focus de Tamagui v3

Banc jetable, sur la branche de la PR #647 (`tamagui@3.0.3`, config `@tamagui/config/v5`).
Le kit ne compile pas encore en v3 : le banc monte les composants Tamagui nus, sans Alveole.

```sh
node prototype/bague-focus/build.mjs
npx playwright test -c prototype/bague-focus/playwright.config.ts --workers=1
```

Chaque cas relève le style calculé de l'élément au repos, focalisé au clavier (Shift+Tab puis
Tab) et cliqué à la souris, avec les règles CSS `:focus*` qui le touchent.

## Relevé (Chromium headless, 2026-10-18)

| Cas                                      | Clavier                                             | Souris      | Règles qui s'appliquent au clavier                                              |
| ---------------------------------------- | --------------------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `Switch` nu                              | `solid 2px rgb(0, 95, 204)`                         | `none`      | `._os-…:where(:focus-visible){outline-style:solid}`, idem `outline-width:2px`   |
| `Checkbox` nu                            | `solid 2px rgb(0, 95, 204)`                         | `none`      | idem                                                                            |
| `Switch` + clause `focus-visible:`       | `solid 2px rgb(10, 118, 246)`                       | transparent | `._oc-…:where(:focus-visible){outline-color:rgb(10,118,246)}` + style + largeur |
| `Checkbox` + clause `focus-visible:`     | `solid 2px rgb(10, 118, 246)`                       | transparent | idem                                                                            |
| `Switch` marqué, règle sans `!important` | `solid 2px rgb(10, 118, 246) offset 2px`            | `none`      | les deux règles Tamagui **et** `[data-alveole-focus]:focus-visible`, qui gagne  |
| `Checkbox` marqué, idem                  | `solid 2px rgb(10, 118, 246) offset 2px`            | `none`      | idem                                                                            |
| `RadioGroup.Item` (nu, clause, marqué)   | aucune bague visible : `:focus-visible` jamais vrai | aucune      | aucune ; l'élément matche `:focus:not(:focus-visible)`                          |

Constats :

1. **Plus aucun `!important`.** La v3 pose encore une bague par défaut sur `Switch` et
   `Checkbox`, mais en `:where(:focus-visible)` (spécificité d'une seule classe) et sans
   couleur : `rgb(0, 95, 204)` est la couleur par défaut du navigateur, pas un gris Tamagui.
2. **La clause `focus-visible:` fonctionne** et ne bat rien, puisqu'il n'y a plus rien à battre.
3. **La règle marquée de l'ADR 0017 gagne seule, sans `!important`** : `[attr]:focus-visible`
   (0,2,0) l'emporte sur `.classe:where(…)` (0,1,0). Aucun style inline n'a été relevé sur ces
   éléments.
4. **`RadioGroup.Item` ne prend jamais `:focus-visible` à l'entrée par Tab.**
   `RovingFocusGroup` y redirige le focus par `candidate.focus({ focusVisible: false })`
   (`@tamagui/roving-focus/dist/esm/RovingFocusGroup.mjs` l. 76) ; seule la navigation aux
   flèches passe `focusVisible: true` (l. 153). Aucune règle CSS `:focus-visible`, clause
   Tamagui comprise, ne peut donc montrer la bague à l'arrivée sur le groupe. Les flèches,
   elles, n'ont déplacé le focus dans aucun essai du banc : non mesuré, à reprendre dans le
   kit réel.

Hors banc, noté en chemin : sur la PR, `packages/components/node_modules` résout encore
`@tamagui/*` en 2.7.7 (plages peer `^2.7.7 || ^3.0.0`) à côté du 3.0.3 hoisté à la racine.
