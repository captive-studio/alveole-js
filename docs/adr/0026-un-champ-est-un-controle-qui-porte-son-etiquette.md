---
status: accepted
area: forms
---

# Un champ est un contrôle de saisie qui porte son étiquette

Le kit construisait un champ de deux façons. `Select` et `DateInput` recevaient `label`,
`hint` et `error` et s'habillaient eux-mêmes via `FieldFrame`. Les autres existaient en
double : un `*Input` pour le cadre, un `*Field` qui recopiait l'étiquette, l'aide et la
validation autour. S'y ajoutaient des composants sans comportement propre (`EmailInput`,
`EmailField`, `PasswordField`) là où Primer, Atlassian et Base passent un `type` à leur
champ texte, et un `SelectMultiple` qui doublait `Select multiple` malgré l'ADR 0014 (sur
natif, il n'affichait que `JSON.stringify(value)`).

## Décision

- **Un seul composant par contrôle de saisie**, qui reçoit `label`, `hint` et `error` en
  props et s'habille via l'habillage commun. Pas de composition à la Primer
  (`FormControl.Label` + contrôle) : c'est déjà le chemin de nos contrôles récents, et la
  migration se réduit à un renommage, les props restant les mêmes. On renonce à placer
  l'étiquette librement, ce que personne ne faisait.
- **Un composant dédié seulement pour un comportement propre** (sélecteur, masque, format,
  cases, liste). Sinon, un `type` sur `TextInput` : `type="email"`, et `type="password"`
  qui intègre l'œil d'affichage, comme chez Base.
- **Suffixe `Input` partout**, sauf `Select` : `TextField` → `TextInput`, `NumberField` →
  `NumberInput`, `PhoneField` → `PhoneInput`, `TextareaField` → `TextareaInput`,
  `OtpField` → `OtpInput`, `FileField` → `FileInput`.
- **`SelectMultiple` disparaît** au profit de `<Select multiple>`.

## Conséquences

- Breaking change de l'API publique : anciens noms gardés en alias dépréciés, puis
  retirés dans une version ultérieure, une fois cae, groove et dashboard migrés. Usages à
  chiffrer dans ces trois apps avant de commencer.
- Ordre retenu : d'abord l'harmonisation des hauteurs sur l'ossature commune (utile aux
  composants fusionnés, rien n'est jeté), puis la fusion, puis le retrait des alias.
- Les tailles ne changent pas : une taille par densité (ADR 0013).
