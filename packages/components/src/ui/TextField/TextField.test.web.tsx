import { renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { Button } from '../Button';
import { TextField } from './TextField';

test('associe le libellé au champ', () => {
  renderOnDesktop(<TextField label="Nom" />);

  expect(screen.getByLabelText('Nom')).toBeTruthy();
});

// Le bouton est passe a `control('md').height` (32px) ; le champ etait reste a 42px en dur.
// Un bouton pose a cote d'un champ ne s'alignait plus. Voir plan harmonise/champs-boutons.
test('aligne la hauteur du champ sur celle du bouton md', () => {
  const { container } = renderOnDesktop(
    <>
      <TextField label="Nom" />
      <Button variant="primary" title="Enregistrer" />
    </>,
  );

  const champ = container.querySelector('form-control-text-input-inner');
  const bouton = screen.getByRole('button');

  expect(getComputedStyle(champ as Element).minHeight).toBe(getComputedStyle(bouton).height);
});
