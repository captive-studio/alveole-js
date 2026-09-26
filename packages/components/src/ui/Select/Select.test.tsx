import { renderNative } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press } from '@/__tests__/helpers/selectHarness';
import { FormControl } from '../FormControl';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select dans un FormControl', () => {
  it('annonce le libellé du FormControl sur le champ', async () => {
    const { getByTestId } = await renderNative(
      <FormControl label="Pays">
        <Select options={OPTIONS} value={null} />
      </FormControl>,
    );

    expect(getByTestId('select-trigger').props.accessibilityLabel).toBe('Pays');
  });

  it('titre le panneau du libellé du FormControl', async () => {
    const { getByTestId, getAllByText } = await renderNative(
      <FormControl label="Pays">
        <Select options={OPTIONS} value={null} />
      </FormControl>,
    );

    await press(getByTestId('select-trigger'));

    // Une fois pour le libellé du FormControl, une fois pour le titre du panneau.
    expect(getAllByText('Pays')).toHaveLength(2);
  });
});

describe('Select', () => {
  it('laisse le FormControl seul afficher le message d’erreur', async () => {
    const { getAllByText } = await renderNative(
      <FormControl label="Pays" error="Ce champ est requis">
        <Select options={OPTIONS} value={null} error="Ce champ est requis" />
      </FormControl>,
    );

    expect(getAllByText('Ce champ est requis')).toHaveLength(1);
  });

  it('n’ouvre le panneau qu’au press du champ', async () => {
    const { getByTestId, queryByTestId } = await renderNative(<Select options={OPTIONS} value={null} />);

    expect(queryByTestId('select-option-a')).toBeNull();

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeTruthy();
    expect(queryByTestId('select-option-c')).toBeTruthy();
  });

  it('remonte la valeur choisie puis referme le panneau', async () => {
    const onChange = jest.fn();
    const { getByTestId, queryByTestId } = await renderNative(
      <Select options={OPTIONS} value={null} onChange={onChange} />,
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
      <Select options={OPTIONS} value={null} onFocus={onFocus} onBlur={onBlur} />,
    );

    await press(getByTestId('select-trigger'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();

    await press(getByTestId('select-option-a'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('ignore le press sur une option désactivée', async () => {
    const onChange = jest.fn();
    const options: SelectOption[] = [...OPTIONS, { label: 'Option D', value: 'd', disabled: true }];
    const { getByTestId } = await renderNative(<Select options={options} value={null} onChange={onChange} />);

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-d'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('n’ouvre pas le panneau quand il est désactivé', async () => {
    const { getByTestId, queryByTestId } = await renderNative(<Select options={OPTIONS} value={null} disabled />);

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeNull();
  });
});
