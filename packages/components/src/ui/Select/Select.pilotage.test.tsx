import { act, renderNative } from '@/__tests__/helpers/renderNative';
import { OPTIONS } from '@/__tests__/helpers/selectHarness';
import React from 'react';
import { Select } from './Select';
import type { SelectRef } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

// Le formulaire appelant pilote le selecteur par sa poignee imperative, comme il le ferait
// d'un champ de saisie : c'est par la qu'il porte le focus sur le premier champ en erreur.
describe('Select, pilotage par la référence', () => {
  it('ouvre le panneau sur open() et le referme sur close()', async () => {
    const ref = React.createRef<SelectRef>();
    const { queryByTestId } = await renderNative(<Select ref={ref} label="Sélection" options={OPTIONS} value={null} />);

    await act(async () => ref.current?.open());
    expect(queryByTestId('select-option-a')).toBeTruthy();

    await act(async () => ref.current?.close());
    expect(queryByTestId('select-option-a')).toBeNull();
  });

  it('ouvre le panneau sur focus() et le referme sur blur()', async () => {
    const ref = React.createRef<SelectRef>();
    const { queryByTestId } = await renderNative(<Select ref={ref} label="Sélection" options={OPTIONS} value={null} />);

    await act(async () => ref.current?.focus());
    expect(queryByTestId('select-option-a')).toBeTruthy();

    await act(async () => ref.current?.blur());
    expect(queryByTestId('select-option-a')).toBeNull();
  });

  it('reste ferme quand le selecteur est desactive', async () => {
    const ref = React.createRef<SelectRef>();
    const { queryByTestId } = await renderNative(
      <Select ref={ref} label="Sélection" options={OPTIONS} value={null} disabled />,
    );

    await act(async () => ref.current?.open());

    expect(queryByTestId('select-option-a')).toBeNull();
  });
});
