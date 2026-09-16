// Le catalogue importe `@alveole/components` par son index, qui charge tous les composants,
// y compris ceux qui exigent un module natif absent d'un environnement de test. Les écrans
// testés ici n'en rendent aucun : une doublure suffit à les laisser se charger.
//
// Le proxy répond à n'importe quel nom d'export, pour ne pas écrire une doublure par paquet
// ni la corriger à chaque export que le paquet ajoute.
const Doublure = () => null;

module.exports = new Proxy(Doublure, {
  get: (cible, nom) => {
    if (nom === '__esModule') return true;
    if (nom === 'default') return Doublure;

    return cible[nom] ?? Doublure;
  },
});
