module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  testPathIgnorePatterns: [
    '.*\\.acceptance\\.(test|spec)\\.(ts|tsx|js)$'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['jest-extended/all']
};