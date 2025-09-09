module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/tests/**/*.acceptance.test.+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globalSetup: '<rootDir>/tests/setup/global-setup.ts',
  globalTeardown: '<rootDir>/tests/setup/global-teardown.ts',
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/tests/setup/jest.setup.ts'],
  testTimeout: 60000
};