# Étiquettes

**Étiquette** :
La pastille grise que rend le composant `Tag` : elle qualifie l'élément qui la
porte, sans annoncer d'état ni de quantité. Elle n'a qu'une couleur, et son seul
contraste vient du survol et de la sélection. Elle peut recevoir une icône avant
son libellé et une croix de suppression.
Une **valeur choisie dans un champ à sélection multiple est une étiquette**, et
non un objet à part : c'est la même pastille, sélectionnée et fermable. Primer et
Base font de même, leur champ à jetons rendant leur `Token` et leur `Tag`. Il n'y
a donc qu'un seul composant, et aucune variante à choisir.
_Éviter_ : badge, chip, token, label. « Token » est le nom du composant de
Primer dont l'étiquette s'inspire, pas le nôtre, et il désigne déjà chez nous
une variable de design.

**Badge** :
La pastille que rend le composant `Badge` : elle annonce un statut, et ses six
variantes sémantiques (`info`, `success`, `error`, `warning`, `new`, `default`)
portent chacune une couleur qui veut dire quelque chose. C'est cette charge
sémantique qui la sépare de l'étiquette.
_Éviter_ : tag, étiquette. Un badge sans variante n'existe pas.

**Compteur** :
Le nombre que rend le composant `Counter`, accolé à un libellé de navigation :
un onglet, une entrée de barre latérale. Il compte, il ne qualifie pas.
_Éviter_ : badge, pastille de notification, étiquette.

**Sélectionné** :
L'état d'une étiquette que l'application a marquée comme active, porté par la
prop `selected`. C'est un état du modèle, pas du pointeur : il survit au départ
de la souris.
_Éviter_ : actif, coché, survolé.

**Survolé** :
L'état d'une étiquette que le pointeur recouvre. Signal du pointeur et rien
d'autre : il ne dit jamais qu'une étiquette est sélectionnée, et une étiquette
sélectionnée ne se survole pas d'elle-même. Les deux signaux se combinent sans
se confondre, ce que fixe l'ADR
[0020](../adr/0020-tag-survol-et-selection-independants.md). Seule une étiquette
manipulable le porte (ADR
[0019](../adr/0019-le-survol-ne-va-qu-aux-etiquettes-manipulables.md)).

**Manipulable** :
Se dit d'une étiquette sur laquelle on peut agir : la fermer (`closable`), ou la
choisir dans un groupe (`interactive`). C'est ce qui lui vaut un retour au survol.
Une étiquette qui n'est ni l'un ni l'autre est descriptive, et reste inerte. À ne
pas confondre avec **sélectionné**, qui décrit un état et ne déclare rien : une
valeur retenue dans un champ désactivé est sélectionnée sans être manipulable.
_Éviter_ : interactif, cliquable. L'étiquette entière ne se clique jamais ; seule
sa croix est actionnable.
_Éviter_ : actif, sélectionné, focus. Le focus est un troisième état, celui du
clavier, porté par une bague CSS (ADR 0017).
