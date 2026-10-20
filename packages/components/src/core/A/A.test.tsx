import { fireEvent, renderNative, screen, userEvent } from '@/__tests__/helpers/renderNative';
import { linkTo } from 'expo-router/build/global-state/routing';
import { openBrowserAsync } from 'expo-web-browser';
import { Text } from 'react-native';
import { Box } from '../Box';
import { A } from './A';

jest.mock('expo-web-browser', () => ({ openBrowserAsync: jest.fn() }));
jest.mock('expo-router/build/global-state/routing', () => ({
  ...jest.requireActual('expo-router/build/global-state/routing'),
  linkTo: jest.fn(),
}));

beforeEach(() => {
  jest.mocked(openBrowserAsync).mockClear();
  jest.mocked(linkTo).mockClear();
});

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

test.each([undefined, { hover: '#eee' }])(
  "garde la navigation de l'app pour une route interne (%j)",
  async backgroundColor => {
    await renderNative(
      <A href="/quelque-part" target="_blank" backgroundColor={backgroundColor}>
        <Text>Aller</Text>
      </A>,
    );

    await userEvent.setup().press(screen.getByText('Aller'));
    expect(openBrowserAsync).not.toHaveBeenCalled();
    expect(linkTo).toHaveBeenCalledWith('/quelque-part', expect.objectContaining({ event: 'PUSH' }));
  },
);

test('navigue au toucher du libellé malgré le survol des descendants', async () => {
  await renderNative(
    <A href="/components/Button">
      <Box backgroundColor={{ default: '#fff', hover: '#eee' }}>
        <Text>Button</Text>
      </Box>
    </A>,
  );

  await userEvent.setup().press(screen.getByText('Button'));
  expect(linkTo).toHaveBeenCalledWith('/components/Button', expect.objectContaining({ event: 'PUSH' }));
});

test('annonce l\'ouverture dans le navigateur avec target="_blank"', async () => {
  await renderNative(
    <A href="https://example.com" target="_blank">
      <Text>Aller</Text>
    </A>,
  );

  expect(screen.getByRole('link').props.accessibilityHint).toBe('Ouvre dans le navigateur');
});
