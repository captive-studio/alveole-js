/* global jest */

jest.mock('expo-application', () => ({
  nativeBuildVersion: '42',
}));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      version: '1.2.3',
    },
  },
}));
