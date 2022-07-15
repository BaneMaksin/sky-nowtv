/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { dirname } = require('path');

/**
 * Include installed NPM ES modules into tests transpilation process.
 *
 * @param {Array} modulesList - List of NPM modules to include into the tests transpilation.
 * @returns {string[]} - List of resolved modules with their directories absolute paths from package main field.
 */
const includeModules = (modulesList = []) => modulesList.map(module => {
  try {
    return dirname(require.resolve(module));
  } catch (error) {
    return '';
  }
}).filter(String);

module.exports = {
  includeModules
};
