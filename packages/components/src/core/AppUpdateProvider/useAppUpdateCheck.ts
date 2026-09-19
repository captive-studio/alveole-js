import * as Application from 'expo-application';
import Constants from 'expo-constants';
import React from 'react';
import { AppState, Linking, Platform } from 'react-native';

const importExpoInAppUpdates = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('expo-in-app-updates') as typeof import('expo-in-app-updates');
  } catch {
    return null;
  }
};

export const THROTTLE_MS = 12 * 60 * 60 * 1000; // 12h

export const shouldRunCheck = (lastCheckedAt: number, now: number): boolean => now - lastCheckedAt >= THROTTLE_MS;

export const urlMagasinApplication = (
  platform: string,
  iosAppId: string,
  androidPackageId: string | undefined,
  applicationId: string | null,
): string => {
  if (platform === 'ios') {
    return `https://apps.apple.com/app/id${iosAppId}`;
  }
  const pkg = androidPackageId ?? applicationId ?? '';
  return `market://details?id=${pkg}`;
};

type State = { isChecking: boolean; isUpdateRequired: boolean };
type Action = { type: 'CHECK_COMPLETE' } | { type: 'UPDATE_REQUIRED' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHECK_COMPLETE':
      return { ...state, isChecking: false };
    case 'UPDATE_REQUIRED':
      return { isChecking: false, isUpdateRequired: true };
  }
};

type UseAppUpdateCheckProps = { iosAppId: string; androidPackageId?: string };

export const useAppUpdateCheck = ({ iosAppId, androidPackageId }: UseAppUpdateCheckProps) => {
  // expo-in-app-updates requires a real store client — skip in Expo Go and web
  const isNativeStoreClient = Platform.OS !== 'web' && Constants.executionEnvironment !== 'storeClient';

  const [{ isChecking, isUpdateRequired }, dispatch] = React.useReducer(reducer, {
    isChecking: isNativeStoreClient,
    isUpdateRequired: false,
  });
  const lastCheckedAt = React.useRef<number>(0);

  const openStore = React.useCallback(() => {
    Linking.openURL(urlMagasinApplication(Platform.OS, iosAppId, androidPackageId, Application.applicationId));
  }, [iosAppId, androidPackageId]);

  const runCheck = React.useCallback(
    async (isInitial = false) => {
      const now = Date.now();
      if (!isInitial && !shouldRunCheck(lastCheckedAt.current, now)) return;
      lastCheckedAt.current = now;

      try {
        const ExpoInAppUpdates = importExpoInAppUpdates();
        if (!ExpoInAppUpdates) {
          dispatch({ type: 'CHECK_COMPLETE' });
          return;
        }
        const { updateAvailable } = await ExpoInAppUpdates.checkForUpdate();
        if (updateAvailable) {
          if (Platform.OS === 'android') {
            await ExpoInAppUpdates.startUpdate(true);
            // If we reach here the immediate update was cancelled or failed → fallback to screen
          }
          dispatch({ type: 'UPDATE_REQUIRED' });
        }
      } catch {
        // Check failed: don't block the user
      } finally {
        dispatch({ type: 'CHECK_COMPLETE' });
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!isNativeStoreClient) return;
    runCheck(true);
  }, [runCheck, isNativeStoreClient]);

  React.useEffect(() => {
    if (!isNativeStoreClient) return;
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') runCheck(false);
    });
    return () => subscription.remove();
  }, [runCheck, isNativeStoreClient]);

  return { isChecking, isUpdateRequired, openStore };
};
