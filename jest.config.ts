const COVERAGE_EXPECTATION = process.env.CI ? 70 : 0;

export default {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/app/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'cobertura', 'lcov'],
  coverageThreshold: {
    global: {
      branches: COVERAGE_EXPECTATION,
      functions: COVERAGE_EXPECTATION,
      lines: COVERAGE_EXPECTATION,
      statements: COVERAGE_EXPECTATION,
    },
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/app/$1',
  },
};
