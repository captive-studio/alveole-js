import { press, OPTIONS, renderSelect } from '@/__tests__/helpers/selectHarness';
import React from 'react';
import { Select } from './Select';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/tamaguiSheetMock').mockTamaguiSheet());

// Capture les props reçues par BottomSheet pour vérifier points / fitContent.
const bottomSheetProps: Record<string, unknown>[] = [];
jest.mock('@/src/ui/BottomSheet', () => {
  const { View } = jest.requireActual('react-native');
  const ReactActual = jest.requireActual('react');
  return {
    BottomSheet: (props: Record<string, unknown>) => {
      bottomSheetProps.push(props);
      return props.open ? ReactActual.createElement(View, null, props.children as React.ReactNode) : null;
    },
  };
});

describe('Select, sheetSnapPoints', () => {
  beforeEach(() => {
    bottomSheetProps.length = 0;
  });

  it('passe fitContent au BottomSheet par défaut', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value={null} />);

    await press(getByTestId('select-trigger'));

    const lastProps = bottomSheetProps.at(-1);
    expect(lastProps?.fitContent).toBe(true);
    expect(lastProps?.points).toBeUndefined();
  });

  it('passe points au BottomSheet quand sheetSnapPoints est fourni', async () => {
    const { getByTestId } = await renderSelect(<Select options={OPTIONS} value={null} sheetSnapPoints={[50]} />);

    await press(getByTestId('select-trigger'));

    const lastProps = bottomSheetProps.at(-1);
    expect(lastProps?.points).toEqual([50]);
    expect(lastProps?.fitContent).toBeUndefined();
  });
});
