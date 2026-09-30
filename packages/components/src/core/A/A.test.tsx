import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { openBrowserAsync } from 'expo-web-browser';
import { Text } from 'react-native';
import { A } from './A';

jest.mock('expo-web-browser', () => ({ openBrowserAsync: jest.fn() }));

beforeEach(() => jest.mocked(openBrowserAsync).mockClear());

// En natif, pas d'onglet : `target="_blank"` sur une URL externe ouvre le navigateur integre.
test('ouvre une URL externe dans le navigateur integre avec target="_blank"', async () => {
  await renderNative(
    <A href="https://example.com" target="_blank">
      <Text>Aller</Text>
    </A>,
  );

  await fireEvent.press(screen.getByRole('link'));
  expect(openBrowserAsync).toHaveBeenCalledWith('https://example.com');
});

test("garde la navigation de l'app pour une route interne", async () => {
  await renderNative(
    <A href="/quelque-part" target="_blank">
      <Text>Aller</Text>
    </A>,
  );

  await fireEvent.press(screen.getByRole('link'));
  expect(openBrowserAsync).not.toHaveBeenCalled();
});
