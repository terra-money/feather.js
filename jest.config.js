module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  coverageReporters: ['text', 'cobertura'],
  roots: ['<rootDir>/src'],
  testTimeout: 10000,
};
