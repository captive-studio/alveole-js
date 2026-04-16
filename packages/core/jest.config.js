const path = require('path');

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/.expo/', '/coverage/'],
  // eslint-disable-next-line no-undef
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  collectCoverage: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
