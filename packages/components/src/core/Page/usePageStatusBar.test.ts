import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'react-native';
import { applyStatusBar } from './usePageStatusBar';

jest.mock('expo-system-ui', () => ({
  setBackgroundColorAsync: jest.fn(),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

test('applique le style de barre demandé', () => {
  const setBarStyle = jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});

  applyStatusBar({ barStyle: 'light-content', backgroundColor: 'black' });

  expect(setBarStyle).toHaveBeenCalledWith('light-content');
});

test('applique la couleur de fond système', () => {
  jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});

  applyStatusBar({ barStyle: 'dark-content', backgroundColor: 'white' });

  expect(SystemUI.setBackgroundColorAsync).toHaveBeenCalledWith('white');
});
