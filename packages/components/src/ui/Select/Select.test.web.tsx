import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from '../FormControl';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

const OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

/** react-select n'ouvre pas son menu au clic : il écoute le clavier sur le combobox. */
const openMenu = () => fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

test('associe le libellé du FormControl au champ', () => {
  renderWeb(
    <FormControl label="Pays">
      <Select value={null} options={[{ value: 'fr', label: 'France' }]} />
    </FormControl>,
  );

  expect(screen.getByRole('combobox', { name: 'Pays' })).toBeTruthy();
});

test('interdit la saisie tant que la recherche n’est pas demandée', () => {
  renderWeb(<Select value={null} options={OPTIONS} />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBe('true');
});

test('autorise la saisie quand la recherche est demandée', () => {
  renderWeb(<Select value={null} options={OPTIONS} searchable />);

  expect(screen.getByRole('combobox').getAttribute('aria-readonly')).toBeNull();
});

test('remonte la valeur choisie en mono-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select value={null} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option C'));

  expect(onChange).toHaveBeenCalledWith('c');
});

// La croix d'effacement est `aria-hidden` : au clavier, react-select efface la
// sélection au Retour arrière.
test('remonte null quand la sélection mono est effacée', () => {
  const onChange = jest.fn();
  renderWeb(<Select value="a" options={OPTIONS} clearable onChange={onChange} />);

  fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });

  expect(onChange).toHaveBeenCalledWith(null);
});

test('remonte un tableau de valeurs en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select multiple value={['a']} options={OPTIONS} onChange={onChange} />);

  openMenu();
  fireEvent.click(screen.getByText('Option B'));

  expect(onChange).toHaveBeenCalledWith(['a', 'b']);
});

// react-select pose `role="option"` sur chaque option : en multi-sélection, la ligne affiche une
// case à cocher et doit s'annoncer comme telle.
test('annonce chaque option comme une case à cocher en multi-sélection', () => {
  const options: SelectOption[] = [...OPTIONS, { value: 'd', label: 'Option D', disabled: true }];
  renderWeb(<Select multiple value={['a']} options={options} />);

  openMenu();

  expect(screen.queryAllByRole('option')).toHaveLength(0);
  const cases = screen.getAllByRole('checkbox');
  expect(cases.map(c => [c.textContent, c.getAttribute('aria-checked'), c.getAttribute('aria-disabled')])).toEqual([
    ['Option A', 'true', 'false'],
    ['Option B', 'false', 'false'],
    ['Option C', 'false', 'false'],
    ['Option D', 'false', 'true'],
  ]);
  expect(cases[0].hasAttribute('aria-selected')).toBe(false);
});

test('garde le rôle option en mono-sélection', () => {
  renderWeb(<Select value="a" options={OPTIONS} />);

  openMenu();

  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  expect(screen.getAllByRole('option')).toHaveLength(3);
});

test('rend une puce retirable par valeur en multi-sélection', () => {
  const onChange = jest.fn();
  renderWeb(<Select multiple value={['a', 'c']} options={OPTIONS} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Retirer Option A'));

  expect(onChange).toHaveBeenCalledWith(['c']);
});

test('ne filtre pas localement quand le filtrage local est coupé', () => {
  renderWeb(<Select value={null} options={OPTIONS} searchable localFilter={false} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'aucune correspondance' } });

  expect(screen.getByText('Option A')).toBeTruthy();
});

test('propose la création d’une option absente de la liste', () => {
  const onCreateOption = jest.fn();
  renderWeb(<Select value={null} options={OPTIONS} searchable creatable onCreateOption={onCreateOption} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Andorre' } });
  fireEvent.click(screen.getByText('Ajouter « Andorre »'));

  expect(onCreateOption).toHaveBeenCalledWith('Andorre');
});
