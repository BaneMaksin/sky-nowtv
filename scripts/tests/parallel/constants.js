/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');

// Base constants
const { PATHS } = require('../../helpers/constants');

module.exports = {
  cypressChunksPath: join(PATHS.TESTS, './cypress-parallel.json'),
  jestChunksPath: join(PATHS.TESTS, './jest-parallel.json')
};
