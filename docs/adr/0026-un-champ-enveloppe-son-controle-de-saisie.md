---
status: accepted
area: forms
---

# Un champ enveloppe son contrôle de saisie

Le kit construisait un champ de deux façons. `Select` et `DateInput` recevaient `label`,
`hint` et `error` et s'habillaient eux-mêmes via `FieldFrame`. Les autres existaient en
double : un `*Input` pour le cadre, un `*Field` qui recopiait l'étiquette, l'aide et la
validation autour. S'y ajoutaient des composants sans comportement propre (`EmailInput`,
`EmailField`, `PasswordField`) là où Primer, Atlassian et Base passent un `type` à leur
champ texte, et un `SelectMultiple` qui doublait `Select multiple` malgré l'ADR 0014 (sur
natif, il n'affichait que `JSON.stringify(value)`).

## Décision

- **Composition, à la Base** : le contrôle de saisie est nu et public, et un enveloppant
  unique, `FormControl`, reçoit `label`, `hint` et `error` en props :
  `<FormControl label="Nom" error={e}><TextInput /></FormControl>`. L'enveloppant relie
  l'étiquette et les messages au contrôle par un contexte (id partagé), sans que le
  contrôle reçoive ces props.
- **Plus aucun contrôle ne s'habille lui-même** : les `*Field` disparaissent, et `Select`
  comme `DateInput` perdent leurs props `label`, `hint` et `error`.
- **L'étiquette ne prend pas la couleur de l'état** : seule la légende passe en erreur
  ou en succès, et l'erreur l'emporte sur le succès (texte et icône). L'étiquette ne se
  grise que pour un champ désactivé. C'est le choix de Primer (`InputLabel`), d'Atlassian
  et de Base (`Label` ne lit que `$disabled`) : une étiquette rouge répétait ce que la
  légende et la bordure disent déjà.
- **Un composant dédié seulement pour un comportement propre** (sélecteur, masque, format,
  cases, liste). Sinon, un `type` sur `TextInput` : `type="email"`, et `type="password"`
  qui intègre l'œil d'affichage, comme chez Base.
- **Suffixe `Input` partout**, sauf `Select` : il reste `TextInput`, `NumberInput`,
  `PhoneInput`, `TextareaInput`, `OtpInput`, `FileInput`.
- **`SelectMultiple` disparaît** au profit de `<Select multiple>`.

## Options écartées

- **Étiquette en props sur le contrôle** (`<TextInput label="Nom" />`), retenue dans une
  première version de cet ADR : la migration se réduisait à un renommage, mais Primer,
  Atlassian et Base gardent tous trois un contrôle nu public et placent l'habillage dans
  un composant distinct. S'en écarter donnait au nom court un sens inverse du leur et
  forçait à cacher la brique nue sous un autre nom.
- **Contrôle qui s'habille seulement s'il reçoit une étiquette** : une structure DOM qui
  change selon les props. Aucune des trois références ne le fait.
- **Sous-composants à la Primer** (`FormControl.Label`, `FormControl.Caption`) : plus
  souple pour placer l'étiquette, ce que personne ne fait chez nous, et plus verbeux à
  chaque champ. **Render prop à la Atlassian** (`children({ fieldProps })`) : oblige à
  étaler les props à la main.

## Conséquences

- Breaking change de l'API publique, livré dans la prochaine version majeure, sans alias
  dépréciés : elle regroupe déjà d'autres changements cassants, et une version mineure
  de transition ne ferait que les étaler.
- Migration dans cae, groove et dashboard : envelopper chaque `*Field` dans `FormControl`
  en y déplaçant `label`, `hint` et `error`, et remplacer `SelectMultiple`. Relevé du
  2026-09-24 : `TextField` dans 40 fichiers (35 dans cae), `SelectMultiple` dans 12,
  `PhoneField` 7, `TextareaField` 2, `NumberField` 1.
- Ordre retenu : d'abord l'harmonisation des hauteurs sur l'ossature commune (faite),
  puis la composition.
- Les tailles ne changent pas : une taille par densité (ADR 0013).
