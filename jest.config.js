export default {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/unit/**/*.unit.test.js']
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/integration/**/*.integration.test.js']
    }
  ]
};
