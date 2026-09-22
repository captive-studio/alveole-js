import { renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { FileField } from './FileField';

test('entoure le champ de son libellé, de son indice et de son message d erreur', () => {
  renderOnDesktop(<FileField label="Libellé" hint="Indice" error="Erreur" value={null} onChange={() => {}} />);

  expect(screen.getByText('Libellé')).toBeTruthy();
  expect(screen.getByText('Indice')).toBeTruthy();
  expect(screen.getByText('Erreur')).toBeTruthy();
});
