# Composants

**Contenu de tête** :
L'emplacement placé avant le libellé d'un composant (bouton, onglet, élément de
liste, étiquette, notification…). Il reçoit soit le nom d'une icône, cas le plus
courant, soit un élément quelconque : avatar, icône de réseau social. Sa taille est
fixe et égale à celle de l'icône que le composant afficherait ; un élément plus grand
déborde sans changer la hauteur du composant, l'appelant choisit sa taille.
Le composant ne lui impose pas de couleur.
_Éviter_ : icône de début, start icon, adornment.

**Contenu de fin** :
Le pendant du contenu de tête, placé après le libellé. Seul le bouton l'expose ;
les chevrons des autres composants leur appartiennent et ne sont pas un contenu de fin.
_Éviter_ : icône de fin, end icon.

**Lien externe** :
Un lien qui s'ouvre hors de la navigation de l'application : dans un nouvel onglet
sur le web, dans le navigateur intégré sur mobile. C'est le développeur qui le
déclare externe ; la forme de l'URL ne suffit pas, puisqu'une adresse absolue vers
l'application elle-même reste un lien interne.
_Éviter_ : lien sortant, URL externe (pour parler du lien).
