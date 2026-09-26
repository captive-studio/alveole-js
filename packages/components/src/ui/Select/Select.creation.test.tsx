import { within } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press, renderSelect, search } from '@/__tests__/helpers/selectHarness';
import type { ReactElement } from 'react';
import { Select } from './Select';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/tamaguiSheetMock').mockTamaguiSheet());

/** Ouvre le panneau puis saisit une recherche : le point de départ de chaque cas. */
const openWithQuery = async (element: ReactElement, query: string) => {
  const view = await renderSelect(element);
  await press(view.getByTestId('select-trigger'));
  await search(view.getByTestId('select-search'), query);
  return view;
};

describe('Select avec création d’option', () => {
  it('ne propose jamais la création sans l’avoir demandée', async () => {
    const { queryByTestId } = await openWithQuery(
      <Select options={OPTIONS} value={null} searchable />,
      'Nouvelle option',
    );

    expect(queryByTestId('select-create')).toBeNull();
  });

  it('propose la création quand aucune option ne porte ce libellé', async () => {
    const { getByTestId } = await openWithQuery(
      <Select options={OPTIONS} value={null} searchable creatable />,
      'Nouvelle option',
    );

    expect(within(getByTestId('select-create')).getByText('Ajouter « Nouvelle option »')).toBeTruthy();
  });

  it('ne propose pas la création quand un libellé identique existe', async () => {
    const { queryByTestId } = await openWithQuery(
      <Select options={OPTIONS} value={null} searchable creatable />,
      'option a',
    );

    expect(queryByTestId('select-create')).toBeNull();
  });

  it('remonte la saisie débarrassée de ses espaces', async () => {
    const onCreateOption = jest.fn();
    const { getByTestId } = await openWithQuery(
      <Select options={OPTIONS} value={null} searchable creatable onCreateOption={onCreateOption} />,
      '  Nouvelle option  ',
    );

    await press(getByTestId('select-create'));

    expect(onCreateOption).toHaveBeenCalledWith('Nouvelle option');
  });
});
