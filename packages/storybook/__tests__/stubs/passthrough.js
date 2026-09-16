// Doublure transparente : rend ses enfants et rien d'autre. Elle remplace les paquets qui
// enveloppent le contenu de la page et dépendent d'un appareil réel. Une doublure vide
// supprimerait tout ce que l'écran affiche, et c'est justement ce qu'on vient vérifier.
const Transparent = ({ children }) => children ?? null;

module.exports = new Proxy(Transparent, {
  get: (cible, nom) => {
    if (nom === '__esModule') return true;
    if (nom === 'default') return Transparent;

    return cible[nom] ?? Transparent;
  },
});
