import { renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { PhoneField } from './PhoneField';

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderOnDesktop(<PhoneField label="Libellé" hint="Indice" error="Erreur" />);

  expect(screen.getByText('Libellé')).toBeTruthy();
  expect(screen.getByText('Indice')).toBeTruthy();
  expect(screen.getByText('Erreur')).toBeTruthy();
});
