/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { dirname, resolve } = require('path');

// Helpers
const { PATHS } = require('./constants');

/**
 * Get TypeScript configuration and destruct needed properties.
 *
 * @param {string} tsConfigPath - Absolute TS configuration path.
 * @returns {object} - Destructed configuration properties.
 */
const getTSConfig = (tsConfigPath = PATHS.TSCONFIG) => {

  // Get TS configurations properties
  try {
    const {
      extends: extendConfigPath,
      include,
      exclude,
      compilerOptions: { baseUrl, paths } = {
        baseUrl: undefined,
        paths: undefined
      }
    } = require(tsConfigPath);

    // Return destructed properties from TS configuration
    return {
      ...(extendConfigPath ? getTSConfig(resolve(dirname(tsConfigPath), extendConfigPath)) : {}),
      ...(baseUrl ? { baseUrl } : {}),
      ...(paths ? { paths } : {}),
      ...(include ? { include } : {}),
      ...(exclude ? { exclude } : {})
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getTSConfig
};
