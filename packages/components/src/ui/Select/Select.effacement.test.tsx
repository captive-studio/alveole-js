import { renderNative } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press } from '@/__tests__/helpers/selectHarness';
import { Select } from './Select';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select, effacement de la sélection', () => {
  it('remonte null depuis l’entrée « Effacer »', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderNative(<Select options={OPTIONS} value="a" clearable onChange={onChange} />);

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-clear'));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('n’expose pas « Effacer » quand la sélection est déjà vide', async () => {
    const { getByTestId, queryByTestId } = await renderNative(<Select options={OPTIONS} value={null} clearable />);

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-clear')).toBeNull();
  });
});
