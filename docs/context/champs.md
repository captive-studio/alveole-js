# Champs

Vocabulaire des composants de saisie de formulaire.

## Termes

**Contrôle de saisie** :
Le cadre dans lequel l'utilisateur saisit ou choisit une valeur, sans rien autour
(`TextInput`, `Select`, `DateInput`...). Tous les contrôles de saisie ont la même
hauteur à densité égale.
_À éviter_ : input (ambigu entre le cadre et l'élément HTML), champ.

**Champ** :
L'assemblage d'un contrôle de saisie avec son étiquette, son aide et son message de
validation. Cet habillage est défini une seule fois, pour tous les contrôles.
_À éviter_ : field quand on ne parle que du cadre.

## Relations

- Un **Champ** contient exactement un **Contrôle de saisie**.
- Un **Contrôle de saisie** devient un **Champ** dès qu'il reçoit une étiquette, une
  aide ou un message de validation ; sans eux, il s'utilise seul.
