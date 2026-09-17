import { act, renderNative, within } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press } from '@/__tests__/helpers/selectHarness';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select', () => {
  it('affiche le placeholder tant qu’aucune option n’est sélectionnée', async () => {
    const { getByTestId } = await renderNative(
      <Select label="Sélection" placeholder="Choisir..." options={OPTIONS} value={null} />,
    );

    expect(within(getByTestId('select-trigger')).getByText('Choisir...')).toBeTruthy();
  });

  it('affiche le libellé de l’option sélectionnée', async () => {
    const { getByTestId } = await renderNative(<Select label="Sélection" options={OPTIONS} value="b" />);

    expect(within(getByTestId('select-trigger')).getByText('Option B')).toBeTruthy();
  });

  it('n’ouvre le panneau qu’au press du champ', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} />,
    );

    expect(queryByTestId('select-option-a')).toBeNull();

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeTruthy();
    expect(queryByTestId('select-option-c')).toBeTruthy();
  });

  it('remonte la valeur choisie puis referme le panneau', async () => {
    const onChange = jest.fn();
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-c'));

    expect(onChange).toHaveBeenCalledWith('c');
    expect(queryByTestId('select-option-c')).toBeNull();
  });

  it('signale l’ouverture et la fermeture', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} onFocus={onFocus} onBlur={onBlur} />,
    );

    await press(getByTestId('select-trigger'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();

    await press(getByTestId('select-option-a'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('remonte null depuis l’entrée « Effacer »', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value="a" clearable onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-clear'));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('n’expose pas « Effacer » quand la sélection est déjà vide', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} clearable />,
    );

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-clear')).toBeNull();
  });

  it('ignore le press sur une option désactivée', async () => {
    const onChange = jest.fn();
    const options: SelectOption[] = [...OPTIONS, { label: 'Option D', value: 'd', disabled: true }];
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={options} value={null} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-d'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('n’ouvre pas le panneau quand il est désactivé', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} disabled />,
    );

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeNull();
  });

  it('affiche un en-tête par groupe', async () => {
    const options: SelectOption[] = [
      { label: 'Option A', value: 'a', group: 'Contrats' },
      { label: 'Option B', value: 'b', group: 'Contrats' },
      { label: 'Option C', value: 'c', group: 'Documents' },
    ];
    const { getByTestId, getAllByText } = await renderNative(
      <Select label="Sélection" options={options} value={null} />,
    );

    await press(getByTestId('select-trigger'));

    expect(getAllByText('Contrats')).toHaveLength(1);
    expect(getAllByText('Documents')).toHaveLength(1);
  });

  it('reflète un changement de value venant du parent', async () => {
    const { getByTestId, rerender } = await renderNative(<Select label="Sélection" options={OPTIONS} value="a" />);

    expect(within(getByTestId('select-trigger')).getByText('Option A')).toBeTruthy();

    await act(async () => {
      rerender(<Select label="Sélection" options={OPTIONS} value="c" />);
    });

    expect(within(getByTestId('select-trigger')).getByText('Option C')).toBeTruthy();
    expect(within(getByTestId('select-trigger')).queryByText('Option A')).toBeNull();
  });
});
