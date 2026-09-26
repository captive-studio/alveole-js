import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { act } from '@testing-library/react';
import React from 'react';
import { Select } from './Select';
import type { SelectOption, SelectRef } from './Select.types';

const OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const monter = () => {
  const ref = React.createRef<SelectRef>();
  renderWeb(<Select ref={ref} value={null} options={OPTIONS} />);

  return ref;
};

// Le formulaire appelant pilote le selecteur par sa poignee imperative, comme il le ferait d'un
// champ de saisie : c'est par la qu'il porte le focus sur le premier champ en erreur. Les deux
// plateformes doivent y repondre pareil, alors qu'elles l'implementent chacune a leur facon.
test('donne le focus au champ sur focus() et le retire sur blur()', () => {
  const ref = monter();

  act(() => ref.current?.focus());
  expect(document.activeElement).toBe(screen.getByRole('combobox'));

  act(() => ref.current?.blur());
  expect(document.activeElement).not.toBe(screen.getByRole('combobox'));
});

// `close()` rend la main au formulaire plutot que de replier la liste : c'est react-select qui
// decide de son menu, et il le garde ouvert tant qu'il n'a pas recu de choix.
test('déroule la liste des options sur open() et rend la main sur close()', () => {
  const ref = monter();

  act(() => ref.current?.open());
  expect(screen.getByText('Option A')).toBeTruthy();

  act(() => ref.current?.close());
  expect(document.activeElement).not.toBe(screen.getByRole('combobox'));
});
