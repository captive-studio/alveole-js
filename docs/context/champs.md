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

**Fichier enregistré** :
Un fichier d'un contrôle de fichier qui existe déjà côté serveur, identifié par son
`id`. Le retirer ne l'efface pas de la valeur : il y reste marqué `removed`, pour que
le formulaire sache quoi supprimer à l'envoi.
_À éviter_ : fichier persisté, `_persisted`.

**Fichier ajouté** :
Un fichier choisi ou déposé pendant la saisie, pas encore envoyé. Le retirer l'enlève
de la valeur.

## Relations

- Un **Champ** contient exactement un **Contrôle de saisie**.
- Un **Champ** enveloppe son **Contrôle de saisie** : le contrôle ne porte jamais
  lui-même d'étiquette, d'aide ni de message de validation. Sans eux, il s'utilise seul.
