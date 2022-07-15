/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { posix: { relative } } = require('path');

// Helpers
const { getTSConfig } = require('./get-ts-config');

/**
 * Get paths aliases from TypeScript configuration.
 *
 * @param {object} paths - Project local paths constants.
 * @param {boolean} shouldUpdateRootAliases - Flag for updating the root aliases paths.
 * @returns {object} - Transformed aliases paths.
 */
const getAliases = (paths, shouldUpdateRootAliases = false) => {

  // Get the SRC folder form the absolute SRC path
  const srcPathPrefix = paths.SRC.replace(paths.ROOT, '').replace(/\\/g, '/');

  // Process the aliases from the TS configuration
  return paths.TSCONFIG
    ? Object.entries(getTSConfig(paths.TSCONFIG).paths).reduce((accumulator, [key, [path]]) => {
      let alias = {};

      // Process the alias if the path doesn't contain types definitions
      if (!path.includes('.d.ts')) {

        // Prepare alias path
        const aliasPath = path.slice(-2) === '/*'
          ? path.slice(0, -2)
          : path;

        // Check should the alias path be updated
        const shouldUpdate = shouldUpdateRootAliases
          && !aliasPath.startsWith(`.${srcPathPrefix}`)
          && !aliasPath.startsWith('./node_modules');

        // Assign the alias for accumulation
        alias = {
          [key.slice(-2) === '/*' ? key.slice(0, -2) : key]: shouldUpdate
            ? relative(paths.SRC, aliasPath)
            : aliasPath
        };
      }

      return {
        ...accumulator,
        ...alias
      };
    }, {})
    : {};
};

module.exports = {
  getAliases
};
