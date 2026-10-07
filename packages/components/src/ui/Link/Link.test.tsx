import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { openBrowserAsync } from 'expo-web-browser';
import { Link } from './Link';

jest.mock('expo-web-browser', () => ({ openBrowserAsync: jest.fn() }));

beforeEach(() => jest.mocked(openBrowserAsync).mockClear());

test('ouvre un lien externe dans le navigateur intégré avec target="_blank"', async () => {
  await renderNative(
    <Link href="https://www.captive.fr" target="_blank">
      Site de Captive
    </Link>,
  );

  await fireEvent.press(screen.getByRole('link'));
  expect(openBrowserAsync).toHaveBeenCalledWith('https://www.captive.fr');
  expect(screen.getByRole('link').props.accessibilityHint).toBe('Ouvre dans le navigateur');
});

test("garde la navigation de l'app pour une route interne", async () => {
  await renderNative(
    <Link href="/quelque-part" target="_blank">
      Aller
    </Link>,
  );

  await fireEvent.press(screen.getByRole('link'));
  expect(openBrowserAsync).not.toHaveBeenCalled();
});
