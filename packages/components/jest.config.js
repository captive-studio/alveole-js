const path = require('path');
const expoPreset = require('../../node_modules/jest-expo/ios/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
  ...expoPreset,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: [...(expoPreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@testing-library/react-native|@tamagui/.*|tamagui|react-native-svg)',
  ],
  testPathIgnorePatterns: [...(expoPreset.testPathIgnorePatterns ?? []), '/dist/', '/build/', '/.expo/', '/coverage/'],
  // eslint-disable-next-line no-undef
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  collectCoverage: false,
  watchman: false,
  moduleNameMapper: {
    ...(expoPreset.moduleNameMapper ?? {}),
    '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
    '^@/(.*)$': '<rootDir>/$1',
  },
};
