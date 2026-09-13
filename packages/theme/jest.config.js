/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript', tsx: true } } }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  watchman: false,
};
