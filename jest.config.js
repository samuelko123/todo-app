const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  maxWorkers: "50%",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    "<rootDir>/__tests__/**/*.test.js"
  ],
}

module.exports = createJestConfig(customJestConfig)