import { act, within } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press, renderSelect } from '@/__tests__/helpers/selectHarness';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/tamaguiSheetMock').mockTamaguiSheet());

describe('Select, affichage de la sélection', () => {
  it('affiche le placeholder tant qu’aucune option n’est sélectionnée', async () => {
    const { getByTestId } = await renderSelect(<Select placeholder="Choisir..." options={OPTIONS} value={null} />);

    expect(within(getByTestId('select-trigger')).getByText('Choisir...')).toBeTruthy();
  });

  it('affiche le libellé de l’option sélectionnée', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value="b" />);

    expect(within(getByTestId('select-trigger')).getByText('Option B')).toBeTruthy();
  });

  // Comme chez Primer, une coche en tête de ligne dit la sélection, et non un fond.
  it('coche l’option sélectionnée dans le panneau', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value="b" />);

    await press(getByTestId('select-trigger'));

    expect(within(getByTestId('select-option-b')).getByTestId('select-item-coche')).toBeTruthy();
  });

  // Primer garde la place de la coche vide sur les autres options : les libelles restent alignes.
  it('réserve la place de la coche sur une option non sélectionnée', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value="b" />);

    await press(getByTestId('select-trigger'));

    expect(within(getByTestId('select-option-a')).getByTestId('select-item-place-coche')).toBeTruthy();
  });

  // La coche suffit : Primer reserve sa barre a l'option active au clavier, que react-select
  // ne distingue pas de l'option survolee.
  it('ne marque plus l’option sélectionnée par une barre', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value="b" />);

    await press(getByTestId('select-trigger'));

    expect(within(getByTestId('select-option-b')).queryByTestId('select-item-barre')).toBeNull();
  });

  it('affiche un en-tête par groupe', async () => {
    const options: SelectOption[] = [
      { label: 'Option A', value: 'a', group: 'Contrats' },
      { label: 'Option B', value: 'b', group: 'Contrats' },
      { label: 'Option C', value: 'c', group: 'Documents' },
    ];
    const { getByTestId, getAllByText } = await renderSelect(<Select options={options} value={null} />);

    await press(getByTestId('select-trigger'));

    expect(getAllByText('Contrats')).toHaveLength(1);
    expect(getAllByText('Documents')).toHaveLength(1);
  });

  it('reflète un changement de value venant du parent', async () => {
    const { getByTestId, rerender } = await renderSelect(<Select options={OPTIONS} value="a" />);

    expect(within(getByTestId('select-trigger')).getByText('Option A')).toBeTruthy();

    await act(async () => {
      rerender(<Select options={OPTIONS} value="c" />);
    });

    expect(within(getByTestId('select-trigger')).getByText('Option C')).toBeTruthy();
    expect(within(getByTestId('select-trigger')).queryByText('Option A')).toBeNull();
  });
});
