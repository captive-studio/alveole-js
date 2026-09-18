---
status: accepted
area: button
---

# Les états de survol et d'appui restent définis au cas par cas

Plutôt qu'une règle systématique (« le survol assombrit toujours le variant d'un
cran de sa propre couleur »), chaque variant garde des états de survol et
d'appui définis individuellement, comme aujourd'hui.

Le choix est délibéré : il préserve la latitude de traiter un variant
différemment quand le design l'exige, au prix de la garantie qu'une règle
unique aurait apportée.

## Conséquences

- Aucune règle ne rattrape automatiquement un état incohérent : chaque variant
  doit être vérifié pour lui-même.
- Le survol de `danger` est **laissé en l'état pour le moment**, décision prise
  en connaissance de cause. Son fond passe du rouge plein au gris clair et son
  texte du blanc au rouge : le signal d'intention s'éteint au moment où
  l'utilisateur survole une action destructive, et le bouton prend l'apparence
  d'un `secondary` au repos, puisqu'il emprunte le même `default-grey`. À noter
  que l'état d'appui, lui, suit déjà la logique de renforcement
  (`alpha(background['action-high-error'], 0.8)`) : seul le survol en sort. Le
  sujet est identifié, pas tranché : ne pas le « corriger » sans arbitrage.
- Les deux corrections associées ne dépendent pas de ce choix et restent
  attendues : `transitionProperty` ciblé sur `background-color`,
  `border-color` et `box-shadow` au lieu de `all`, et une élévation au repos
  sur les variants pleins, que `Button` n'utilise pas alors que le thème
  définit `Elevations`.
