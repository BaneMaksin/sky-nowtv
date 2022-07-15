/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Constants
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PATHS } = require('./scripts/helpers/constants');

// Check if this is a standalone or NPM module instance
const IS_NPM_MODULE = __dirname.includes('node_modules');

// Assign absolute setup directory path based on NPM module flag
const setupDir = `${IS_NPM_MODULE ? `${__dirname}/.tests` : '<rootDir>'}/setup`;

// Jest configuration
module.exports = {

  // Set the root directory
  rootDir: PATHS.TESTS,
  /* roots: [
    PATHS.ROOT,
    PATHS.TESTS
  ],*/

  // Since node environment is significantly faster then JSDom,
  // in the future we should mock some of the DOM instances like window and document
  // testEnvironment: 'jsdom',
  testEnvironment: '<rootDir>/setup/environment.js',
  globalTeardown: '<rootDir>/setup/teardown.js',
  globalSetup: '<rootDir>/setup/global.js',

  transform: {
    // '\\.(js|jsx|ts|tsx|js.flow)$': 'babel-jest'
  },

  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',

  testMatch: [
    '**/__tests__/**/*.test.js'
  ],

  testPathIgnorePatterns: [
    '<rootDir>/setup/'
  ],

  modulePaths: [
    `${PATHS.ROOT}/node_modules/`
  ],

  moduleNameMapper: {
    // eslint-disable-next-line max-len
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${setupDir}/file-mock.js`,
    '\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy'
  },

  globals: {
    STORE_REDUCERS_PATHS: {}
  },

  // Jest v28.x
  fakeTimers: {
    enableGlobally: true
  },

  clearMocks: true,

  // Try to avoid adding any setup files since they will be executed on each test suite
  // and slow down the tests execution time
  setupFilesAfterEnv: [],

  // Transform and transpilation should be avoided since it'll affect .tests performance significantly
  transformIgnorePatterns: [],

  // We could safely ignore serializer if we are using testing library
  snapshotSerializers: [],

  // Resolve snapshot next to the source files
  snapshotResolver: `${setupDir}/snapshot-resolver.js`,

  // Impacting performance
  collectCoverage: false,

  coveragePathIgnorePatterns: [
    'node_modules',
    'vendors',
    'index'
  ],

  collectCoverageFrom: [],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }

  /* reporters: [
    'default'
  ]*/
};
