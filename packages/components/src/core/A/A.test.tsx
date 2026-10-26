import { paletteDuTheme } from '@/__tests__/helpers/paletteDuTheme';
import { fireEvent, renderNative, renderNativeInRouter, screen, userEvent } from '@/__tests__/helpers/renderNative';
import { openBrowserAsync } from 'expo-web-browser';
import { Text } from 'react-native';
import { Box } from '../Box';
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

const { background } = paletteDuTheme;

test.each([undefined, { hover: background['alt-grey'] }])(
  "garde la navigation de l'app pour une route interne (%j)",
  async backgroundColor => {
    const router = await renderNativeInRouter(
      <A href="/quelque-part" target="_blank" backgroundColor={backgroundColor}>
        <Text>Aller</Text>
      </A>,
      '/quelque-part',
    );

    await userEvent.setup().press(screen.getByText('Aller'));
    expect(openBrowserAsync).not.toHaveBeenCalled();
    expect(router.getPathname()).toBe('/quelque-part');
  },
);

test('navigue au toucher du libellé malgré le survol des descendants', async () => {
  const router = await renderNativeInRouter(
    <A href="/components/Button">
      <Box backgroundColor={{ default: background['default-grey'], hover: background['alt-grey'] }}>
        <Text>Button</Text>
      </Box>
    </A>,
    '/components/Button',
  );

  await userEvent.setup().press(screen.getByText('Button'));
  expect(router.getPathname()).toBe('/components/Button');
});

test('annonce l\'ouverture dans le navigateur avec target="_blank"', async () => {
  await renderNative(
    <A href="https://example.com" target="_blank">
      <Text>Aller</Text>
    </A>,
  );

  expect(screen.getByRole('link').props.accessibilityHint).toBe('Ouvre dans le navigateur');
});
