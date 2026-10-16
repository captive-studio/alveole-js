---
status: proposed
area: forms
---

# Le PriceInput filtre sa saisie dans un champ texte

Sur le web, le PriceInput rend un `<input type="text" inputMode="decimal">`, avec le
symbole de devise posé à côté du champ. À la frappe, il ne garde que des chiffres, un seul
séparateur décimal (virgule ou point) et au plus deux décimales. `onChange` reçoit
toujours un `number | null` : `12,5` donne `12.5`.

## Pourquoi

Le champ `type="number"` acceptait `e`, ignorait `max` pendant la frappe, perdait la
virgule française sans rien signaler, et changeait la valeur à la molette. Taper `12,5e3`
puis douze chiffres produisait `123456789012125e3`, avec un « € » rejeté hors de la carte
(mesuré dans Chromium le 2026-10-16).

Les références tranchent dans le même sens, constaté dans leur code :

- Primer (`TextInput`), Atlassian (`@atlaskit/textfield`) et Base (`Input`) n'ont pas
  de champ montant. Ils posent la devise dans un emplacement
  (`trailingVisual`, `elemAfterInput`, `endEnhancer`) à côté d'un champ texte générique,
  et laissent le contrôle de la saisie à l'application.
- Polaris rend son `TextField type="currency"` en `type="text"`, et accepte
  `inputMode="decimal"`.
- GOV.UK : « Do not use `<input type="number">` », et `inputmode="decimal"` pour les
  décimales.

Le filtrage à la frappe est le seul point qu'on ajoute au-delà de ces références. Leurs
champs sont génériques, alors que le nôtre ne saisit que des montants. Aucune ne gère la
virgule française, qu'on doit donc normaliser nous-mêmes.

## Ce qu'on a écarté

- Des montants entiers seulement : un prix a des centimes.
- Garder `type="number"` et valider après coup : le `e`, la molette et la virgule perdue
  resteraient.
- Formater au blur (séparateurs de milliers, `,00`) : aucune référence ne le fait, et
  le champ changerait sous les doigts de l'utilisateur.
- Faire remonter la chaîne saisie dans `onChange` : les apps qui utilisent Alveole
  consomment un `number | null`.
