import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderOnDesktop, screen } from '@/__tests__/helpers/renderWeb';
import { Typography } from '../../core/Typography';
import { FormControl } from './FormControl';
import { TextInput } from './TextInput';

test('associe son libellé au contrôle qu il enveloppe', () => {
  renderOnDesktop(
    <FormControl label="Nom">
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByLabelText('Nom')).toBeTruthy();
});

test('affiche son indice', () => {
  renderOnDesktop(
    <FormControl hint="Tel qu il figure sur la pièce d identité">
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByText('Tel qu il figure sur la pièce d identité')).toBeTruthy();
});

test('affiche son message d erreur', () => {
  renderOnDesktop(
    <FormControl error="Le nom est obligatoire">
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByText('Le nom est obligatoire')).toBeTruthy();
});

test('affiche son message de succès', () => {
  renderOnDesktop(
    <FormControl success="Nom disponible">
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByText('Nom disponible')).toBeTruthy();
});

// Comme chez Base, l'erreur l'emporte : le texte l'affichait déjà, pas l'icône.
test('fait primer l erreur sur le succès, icône comprise', () => {
  const { container } = renderOnDesktop(
    <FormControl error="Nom déjà pris" success="Nom disponible">
      <TextInput />
    </FormControl>,
  );

  expect(container.querySelector('.lucide-octagon-x')).toBeTruthy();
});

test('affiche l accessoire placé à droite de son libellé', () => {
  renderOnDesktop(
    <FormControl label="Mot de passe" labelRight={<Typography>Oublié ?</Typography>}>
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByText('Oublié ?')).toBeTruthy();
});

// Comme chez Primer, Atlassian et Base : l'enveloppe transmet la désactivation à son contrôle.
test('désactive le contrôle qu il enveloppe', () => {
  renderOnDesktop(
    <FormControl label="Nom" disabled>
      <TextInput />
    </FormControl>,
  );

  expect(elementDuType(screen.getByLabelText('Nom'), HTMLInputElement).disabled).toBe(true);
});

// Comme chez Primer, Atlassian et Base : seul le champ requis est marqué.
test('ne marque pas son libellé quand son contrôle n est pas requis', () => {
  renderOnDesktop(
    <FormControl label="Surnom">
      <TextInput />
    </FormControl>,
  );

  expect(screen.queryByText('(optionnel)')).toBeNull();
});

test('annonce son contrôle comme requis', () => {
  renderOnDesktop(
    <FormControl label="Nom" required>
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByLabelText('Nom').getAttribute('aria-required')).toBe('true');
});

// Comme chez Primer et Atlassian : l'astérisque est visuel, aria-required porte l'annonce.
test('marque son libellé d un astérisque quand son contrôle est requis', () => {
  renderOnDesktop(
    <FormControl label="Nom" required>
      <TextInput />
    </FormControl>,
  );

  expect(screen.getByText('*').getAttribute('aria-hidden')).toBe('true');
});
