import { renderNative, waitFor } from '@/__tests__/helpers/renderNative';
import { act, fireEvent } from '@testing-library/react-native';
import { checkForUpdate, startUpdate } from 'expo-in-app-updates';
import React from 'react';
import { AppState, Linking, Platform, Text } from 'react-native';
import { AppUpdateProvider, shouldRunCheck, THROTTLE_MS } from './AppUpdateProvider';

jest.mock('expo-in-app-updates', () => ({
  checkForUpdate: jest.fn(),
  startUpdate: jest.fn(),
}));

jest.mock('../UpdateRequired', () => ({
  UpdateRequired: ({ buttonLabel, onUpdate }: { buttonLabel: string; onUpdate: () => void }) => {
    const { Text, Pressable } = require('react-native');
    return (
      <Pressable onPress={onUpdate} testID="update-required">
        <Text>{buttonLabel}</Text>
      </Pressable>
    );
  },
}));

const mockCheckForUpdate = checkForUpdate as jest.MockedFunction<typeof checkForUpdate>;
const mockStartUpdate = startUpdate as jest.MockedFunction<typeof startUpdate>;

const Wrapper = (props: Omit<React.ComponentProps<typeof AppUpdateProvider>, 'iosAppId'>) => (
  <AppUpdateProvider iosAppId="6759812160" {...props} />
);

describe('shouldRunCheck', () => {
  it('retourne true si aucun check précédent', () => {
    expect(shouldRunCheck(0, THROTTLE_MS)).toBe(true);
  });

  it('retourne true si ≥ 12h depuis le dernier check', () => {
    const last = 1000;
    expect(shouldRunCheck(last, last + THROTTLE_MS)).toBe(true);
  });

  it('retourne false si < 12h depuis le dernier check', () => {
    const last = 1000;
    expect(shouldRunCheck(last, last + THROTTLE_MS - 1)).toBe(false);
  });
});

const originalOS = Platform.OS;

// Partagé entre les describe `AppUpdateProvider - *` ci-dessous : évite de dupliquer le
// beforeEach/afterEach de plateforme dans chacun.
const configurerPlateformeIOS = () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(Platform, 'OS', { value: 'ios', writable: true, configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(Platform, 'OS', { value: originalOS, writable: true, configurable: true });
  });
};

describe("AppUpdateProvider - quand aucune mise à jour n'est nécessaire", () => {
  configurerPlateformeIOS();

  it("affiche les enfants si aucune mise à jour n'est disponible", async () => {
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: false, storeVersion: '2.0.0' });

    const { getByText } = await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    await waitFor(() => expect(getByText('Contenu')).toBeTruthy());
  });

  it('affiche les enfants si le check échoue', async () => {
    mockCheckForUpdate.mockRejectedValue(new Error('network error'));

    const { getByText } = await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    await waitFor(() => expect(getByText('Contenu')).toBeTruthy());
  });
});

describe('AppUpdateProvider - quand une mise à jour est disponible', () => {
  configurerPlateformeIOS();

  it('affiche UpdateRequired si une mise à jour est disponible sur iOS', async () => {
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: true, storeVersion: '2.0.0' });

    const { getByText } = await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    await waitFor(() => expect(getByText('Mettre à jour')).toBeTruthy());
  });

  it('appelle startUpdate sur Android si une mise à jour est disponible', async () => {
    Object.defineProperty(Platform, 'OS', { value: 'android', writable: true, configurable: true });
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: true, storeVersion: '2.0.0' });
    mockStartUpdate.mockResolvedValue(true);

    await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    await waitFor(() => expect(mockStartUpdate).toHaveBeenCalledWith(true));
  });

  it('ouvre le store iOS en appuyant sur le bouton Mettre à jour', async () => {
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: true, storeVersion: '2.0.0' });
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

    const { getByText } = await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    await waitFor(() => expect(getByText('Mettre à jour')).toBeTruthy());
    fireEvent.press(getByText('Mettre à jour'));

    expect(openURL).toHaveBeenCalledWith('https://apps.apple.com/app/id6759812160');
  });
});

describe('AppUpdateProvider - sur web', () => {
  configurerPlateformeIOS();

  it('affiche les enfants immédiatement sur web sans appeler checkForUpdate', async () => {
    Object.defineProperty(Platform, 'OS', { value: 'web', writable: true, configurable: true });

    const { getByText } = await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );

    expect(mockCheckForUpdate).not.toHaveBeenCalled();
    expect(getByText('Contenu')).toBeTruthy();
  });
});

describe('AppUpdateProvider - retour en foreground', () => {
  configurerPlateformeIOS();

  it('relance le check au retour en foreground si ≥ 12h', async () => {
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: false, storeVersion: '2.0.0' });

    let appStateListener: ((state: string) => void) | null = null;
    jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, handler) => {
      appStateListener = handler as (state: string) => void;
      return { remove: jest.fn() };
    });

    await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );
    await waitFor(() => expect(mockCheckForUpdate).toHaveBeenCalledTimes(1));

    // Simule un retour en foreground après 12h
    jest.spyOn(Date, 'now').mockReturnValue(Date.now() + THROTTLE_MS);
    await act(async () => {
      appStateListener?.('active');
    });

    expect(mockCheckForUpdate).toHaveBeenCalledTimes(2);
  });

  it('ne relance pas le check au retour en foreground si < 12h', async () => {
    mockCheckForUpdate.mockResolvedValue({ updateAvailable: false, storeVersion: '2.0.0' });

    let appStateListener: ((state: string) => void) | null = null;
    jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, handler) => {
      appStateListener = handler as (state: string) => void;
      return { remove: jest.fn() };
    });

    await renderNative(
      <Wrapper>
        <Text>Contenu</Text>
      </Wrapper>,
    );
    await waitFor(() => expect(mockCheckForUpdate).toHaveBeenCalledTimes(1));

    await act(async () => {
      appStateListener?.('active');
    });

    expect(mockCheckForUpdate).toHaveBeenCalledTimes(1);
  });
});
