/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { resolve } = require('path');

// Base constants
module.exports = {
  PROJECT_NAME: require(resolve(__dirname, '../../package.json')).name,
  PATHS: {
    COVERAGE_REPORT: resolve(__dirname, '../../.tests/coverage/lcov-report/index.html'),
    BABEL_CONFIG: resolve(__dirname, '../../babel.config.ts'),
    STORE: resolve(__dirname, '../../.tests/src/app/store'),
    TEMPLATES: resolve(__dirname, '../../src/templates'),
    TSCONFIG: resolve(__dirname, '../../tsconfig.json'),
    CYPRESS: resolve(__dirname, '../../cypress'),
    STYLE: resolve(__dirname, '../../src/style'),
    TESTS: resolve(__dirname, '../../.tests'),
    DIST: resolve(__dirname, '../../dist'),
    SRC: resolve(__dirname, '../../src'),
    ROOT: resolve(__dirname, '../..')
  }
};
