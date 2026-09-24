import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { NumberField } from './NumberField';

test('associe le libellé au champ', () => {
  renderWeb(<NumberField label="Quantité" />);

  expect(screen.getByLabelText('Quantité')).toBeTruthy();
});

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderWeb(<NumberField label="Libellé" hint="Indice" error="Erreur" />);

  expect(screen.getByText('Libellé')).toBeTruthy();
  expect(screen.getByText('Indice')).toBeTruthy();
  expect(screen.getByText('Erreur')).toBeTruthy();
});

// L'input est un element DOM brut : React y lit une hauteur de ligne sans unite comme un
// multiple de la taille de police (20 x 14 = 280px), la ou react-native-web ajoute `px`.
test('pose la hauteur de ligne du champ en pixels', () => {
  renderWeb(<NumberField label="Quantité" />);

  expect((screen.getByLabelText('Quantité') as HTMLInputElement).style.lineHeight).toBe('20px');
});

// Le navigateur pose 1px de retrait vertical sur un input nombre, qui s'ajoute a la ligne.
test('retire le retrait vertical que le navigateur pose sur le champ saisi', () => {
  renderWeb(<NumberField label="Quantité" />);
  const { paddingTop, paddingBottom } = (screen.getByLabelText('Quantité') as HTMLInputElement).style;

  expect({ paddingTop, paddingBottom }).toEqual({ paddingTop: '0px', paddingBottom: '0px' });
});
