import * as SystemUI from 'expo-system-ui';
import { Platform, StatusBar } from 'react-native';
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

test('pose la couleur de fond de la barre sur Android', () => {
  jest.replaceProperty(Platform, 'OS', 'android');
  jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});
  const setBackgroundColor = jest.spyOn(StatusBar, 'setBackgroundColor').mockImplementation(() => {});

  applyStatusBar({ barStyle: 'dark-content', backgroundColor: 'black' });

  expect(setBackgroundColor).toHaveBeenCalledWith('black');
});

test('ne touche pas à la couleur de fond de la barre hors Android', () => {
  jest.replaceProperty(Platform, 'OS', 'ios');
  jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});
  const setBackgroundColor = jest.spyOn(StatusBar, 'setBackgroundColor').mockImplementation(() => {});

  applyStatusBar({ barStyle: 'dark-content', backgroundColor: 'black' });

  expect(setBackgroundColor).not.toHaveBeenCalled();
});

test('applique la couleur de fond système', () => {
  jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});

  applyStatusBar({ barStyle: 'dark-content', backgroundColor: 'white' });

  expect(SystemUI.setBackgroundColorAsync).toHaveBeenCalledWith('white');
});
