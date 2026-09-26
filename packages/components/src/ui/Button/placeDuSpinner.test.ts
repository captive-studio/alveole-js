import { placeDuSpinner } from './placeDuSpinner';

// Le spinner prend la place de quelque chose, il ne s'ajoute jamais : c'est la regle commune
// aux trois references, et ce qui garde au bouton sa largeur. Primer masque le libelle en
// `visibility: hidden` - donc sans le retirer du flux - et centre le spinner dans la zone du
// texte. La largeur constante, elle, se verifie en navigateur (apps/docs/e2e/button.spec.ts).
test('recouvre le libelle, faute d icone a remplacer', () => {
  expect(placeDuSpinner(true)).toBe('libelle');
});

// L'autre moitie de la regle de Primer : des qu'il y a une icone, c'est elle que le spinner
// remplace, et le libelle reste lisible.
test('remplace l icone de tete avant celle de fin', () => {
  expect([placeDuSpinner(true, 'Plus', 'ChevronDown'), placeDuSpinner(true, undefined, 'ChevronDown')]).toEqual([
    'tete',
    'fin',
  ]);
});

test('ne prend aucune place tant qu il n est pas visible', () => {
  expect(placeDuSpinner(false, 'Plus')).toBeNull();
});
