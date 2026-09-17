import { act, fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press, search } from '@/__tests__/helpers/selectHarness';
import { Select } from './Select';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select avec recherche locale', () => {
  it('n’affiche un champ de recherche que lorsqu’il est demandé', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} />,
    );

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-search')).toBeNull();
  });

  it('filtre les options sur la saisie', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} searchable />,
    );

    await press(getByTestId('select-trigger'));
    await search(getByTestId('select-search'), 'Option C');

    expect(queryByTestId('select-option-c')).toBeTruthy();
    expect(queryByTestId('select-option-a')).toBeNull();
  });

  it('ne filtre aucune option quand le filtrage local est coupé', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} searchable localFilter={false} />,
    );

    await press(getByTestId('select-trigger'));
    await search(getByTestId('select-search'), 'aucune correspondance');

    expect(queryByTestId('select-option-a')).toBeTruthy();
  });

  it('affiche le message de liste vide quand la recherche ne ramène rien', async () => {
    const { getByTestId, getByText } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} searchable emptyMessage="Rien à afficher" />,
    );

    await press(getByTestId('select-trigger'));
    await search(getByTestId('select-search'), 'zzz');

    expect(getByText('Rien à afficher')).toBeTruthy();
  });

  it('remplace le message de liste vide par celui du chargement', async () => {
    const { getByTestId, getByText } = await renderNative(
      <Select label="Sélection" options={[]} value={null} searchable loading loadingMessage="Recherche en cours" />,
    );

    await press(getByTestId('select-trigger'));

    expect(getByText('Recherche en cours')).toBeTruthy();
  });
});

describe('Select avec recherche distante', () => {
  it('n’émet la recherche qu’une fois la saisie stabilisée, et jamais au montage', async () => {
    jest.useFakeTimers();
    try {
      const onSearchChange = jest.fn();
      const { getByTestId } = await renderNative(
        <Select label="Sélection" options={OPTIONS} value={null} searchable onSearchChange={onSearchChange} />,
      );

      await press(getByTestId('select-trigger'));
      expect(onSearchChange).not.toHaveBeenCalled();

      await act(async () => {
        fireEvent.changeText(getByTestId('select-search'), 'Op');
        fireEvent.changeText(getByTestId('select-search'), 'Opt');
      });
      expect(onSearchChange).not.toHaveBeenCalled();

      await act(async () => {
        jest.runOnlyPendingTimers();
      });
      expect(onSearchChange).toHaveBeenCalledTimes(1);
      expect(onSearchChange).toHaveBeenCalledWith('Opt');
    } finally {
      jest.useRealTimers();
    }
  });

  it('repart d’une recherche vide à chaque ouverture', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} searchable />,
    );

    await press(getByTestId('select-trigger'));
    await search(getByTestId('select-search'), 'Option C');
    await press(getByTestId('select-option-c'));
    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeTruthy();
  });
});
