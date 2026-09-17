import { renderNative, within } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press } from '@/__tests__/helpers/selectHarness';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select en multi-sélection', () => {
  it('coche l’option pressée sans refermer le panneau', async () => {
    const onChange = jest.fn();
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={[]} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-a'));

    expect(onChange).toHaveBeenCalledWith(['a']);
    expect(queryByTestId('select-option-b')).toBeTruthy();
  });

  it('ajoute la valeur à celles déjà retenues', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a']} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-c'));

    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('retire une valeur déjà retenue', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a', 'c']} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-a'));

    expect(onChange).toHaveBeenCalledWith(['c']);
  });

  it('referme le panneau au bouton de validation', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a']} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-validate'));

    expect(queryByTestId('select-option-a')).toBeNull();
  });

  it('vide la sélection depuis l’entrée d’effacement', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a', 'b']} clearable onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-clear'));

    expect(onChange).toHaveBeenCalledWith([]);
  });
});

describe('Select en multi-sélection, champ fermé', () => {
  it('affiche une puce par valeur dans le champ fermé', async () => {
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a', 'c']} />,
    );

    const trigger = within(getByTestId('select-trigger'));

    expect(trigger.getByText('Option A')).toBeTruthy();
    expect(trigger.getByText('Option C')).toBeTruthy();
  });

  it('retire la valeur au press de la croix d’une puce', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = await renderNative(
      <Select label="Sélection" options={OPTIONS} multiple value={['a', 'c']} onChange={onChange} />,
    );

    await press(getByLabelText('Retirer Option A'));

    expect(onChange).toHaveBeenCalledWith(['c']);
  });

  it('résume les valeurs au-delà de trois puces', async () => {
    const options: SelectOption[] = [...OPTIONS, { label: 'Option D', value: 'd' }];
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={options} multiple value={['a', 'b', 'c', 'd']} />,
    );

    const trigger = within(getByTestId('select-trigger'));

    expect(trigger.getByText('+1')).toBeTruthy();
    expect(trigger.queryByText('Option D')).toBeNull();
  });
});
