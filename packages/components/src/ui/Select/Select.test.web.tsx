import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

const OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

/** react-select n'ouvre pas son menu au clic : il écoute le clavier sur le combobox. */
const openMenu = () => fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<Select label="Pays" value={null} options={[{ value: 'fr', label: 'France' }]} />);

  expect(screen.getByRole('combobox', { name: 'Pays' })).toBeTruthy();
});

test('interdit la saisie tant que la recherche n’est pas demandée', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBe('true');
});

test('autorise la saisie quand la recherche est demandée', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} searchable />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBeNull();
});

test('remonte la valeur choisie en mono-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option C'));

  expect(onChange).toHaveBeenCalledWith('c');
});

// La croix d'effacement est `aria-hidden` : au clavier, react-select efface la
// sélection au Retour arrière.
test('remonte null quand la sélection mono est effacée', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" value="a" options={OPTIONS} clearable onChange={onChange} />);

  fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });

  expect(onChange).toHaveBeenCalledWith(null);
});

test('remonte un tableau de valeurs en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" multiple value={['a']} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option B'));

  expect(onChange).toHaveBeenCalledWith(['a', 'b']);
});

test('rend une puce retirable par valeur en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select label="Pays" multiple value={['a', 'c']} options={OPTIONS} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer Option A'));

  expect(onChange).toHaveBeenCalledWith(['c']);
});

test('ne filtre pas localement quand le filtrage local est coupé', () => {
  renderWeb(<Select label="Pays" value={null} options={OPTIONS} searchable localFilter={false} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'aucune correspondance' } });

  expect(screen.getByText('Option A')).toBeTruthy();
});

test('propose la création d’une option absente de la liste', () => {
  const onCreateOption = jest.fn();
  renderWeb(
    <Select label="Pays" value={null} options={OPTIONS} searchable creatable onCreateOption={onCreateOption} />,
  );

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Andorre' } });
  fireEvent.click(screen.getByText('Ajouter « Andorre »'));

  expect(onCreateOption).toHaveBeenCalledWith('Andorre');
});
