module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  roots: ['<rootDir>/src'],
};
