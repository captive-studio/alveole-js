import { apparenceDuSwitch } from './Switch.apparence';

// Table de styles reduite au strict necessaire : la vraie vient du theme, et ce qu'on verifie
// ici c'est l'ordre d'empilement des couches, pas leur contenu.
const styles = {
  switchButton: { a: 'base' },
  switchButtonChecked: { a: 'coche' },
  switchButtonDisabled: { a: 'desactive' },
  switchThumb: { b: 'base' },
  switchThumbChecked: { b: 'coche' },
  switchThumbDisabled: { b: 'desactive' },
  switchLabel: { marginRight: 60, padding: 8 },
  switchLabelChecked: {},
  switchLabelDisabled: {},
};

// Un interrupteur coche et desactive porte les deux etats a la fois : c'est le desactive qui
// doit l'emporter, sans quoi un interrupteur grise garde la couleur de l'actif.
test('empile le desactive par-dessus le coche sur le bouton', () => {
  const { bouton } = apparenceDuSwitch(styles, { value: true, disabled: true });

  expect(bouton).toEqual({ a: 'desactive' });
});

// Le style passe en prop habille l'interrupteur lui-meme : le pouce garde les siens, sinon une
// simple marge appliquee au composant deplacerait aussi la pastille a l'interieur.
test('laisse le pouce hors du style passe en prop', () => {
  const { pouce } = apparenceDuSwitch(styles, { value: true, style: { margin: 4 } });

  expect(pouce).toEqual({ b: 'coche' });
});

// Le libelle reserve 60px a sa droite pour tenir dans une colonne de formulaire. `noPadding`
// sert justement aux mises en page qui gerent elles-memes cet espace : il doit annuler la
// reservation, pas s'y ajouter.
test('annule les retraits du libelle avec noPadding', () => {
  const { libelle } = apparenceDuSwitch(styles, { value: false, noPadding: true });

  expect(libelle).toEqual({ marginRight: 0, padding: 0 });
});
