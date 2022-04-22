const COVERAGE_EXPECTATION = process.env.NODE_ENV === 'CI' ? 70 : 0;

export default {
  roots: ['<rootDir>/app'],
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
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
