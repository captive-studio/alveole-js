---
status: accepted
area: code
---

# Les pseudo-états suivent la syntaxe par clauses de Tamagui v3

Tamagui v3 supprime `hoverStyle`, `pressStyle`, `focusStyle`,
`focusVisibleStyle`, `enterStyle`, `exitStyle`, `disabledStyle` et les props
`$media`, au profit de clauses (`hover:`, `press:`, `focus-visible:`…). Le
runtime n'applique plus les anciennes props et se contente d'un avertissement en
développement (`getSplitStyles`, voir `docs/research/tamagui-v3-migration.md`).

Alveole expose ces clauses telles quelles dans son API publique : `Box`,
`Typography` et les autres composants perdent `hoverStyle` et ses voisins, et
les applications réécrivent leurs usages en clauses.

## Options écartées

Garder `hoverStyle` dans l'API d'Alveole et le traduire en clause en interne,
comme on a gardé `tag` lors de la migration v2 (ALV-110, ADR 0024). On ne l'a
pas fait ici parce que :

- la montée en Tamagui v3 est de toute façon un changement cassant pour les
  applications, qui embarquent la majeure Alveole 2.0 ;
- cae et groove utilisent aussi `hoverStyle` sur des composants Tamagui
  directs, qu'elles doivent réécrire en clauses : un seul vocabulaire vaut
  mieux que deux ;
- un traducteur interne serait du code à maintenir à chaque montée de Tamagui,
  et la documentation officielle ne s'appliquerait plus telle quelle.

`tag` reste traduit : il porte un contrat DOM (ADR 0024) que les feuilles de
style des applications ciblent, alors qu'un pseudo-état n'est qu'une syntaxe de
style.

## Conséquences

Une clause ne vit que sur la prop qui porte aussi la valeur de repos : Tamagui
v3 abandonne la clause d'une propriété que `style` pose aussi (mesuré en jsdom
à ALV-128, conforme au guide officiel : « the base value and every conditional
clause for a style live on that style's single property »). Un composant qui
survole une propriété la sort donc de son `style` et la passe en
`{ default, hover }` sur sa prop.

La suppression ne peut pas se préparer sur `main` tant qu'Alveole est en
Tamagui v2, qui n'a pas de clauses : elle tombe dans le ticket de bascule. Le
guide `docs/migrations/tamagui-v3.md` liste la réécriture prop par prop.
