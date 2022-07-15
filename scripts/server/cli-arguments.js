/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { resolve } = require('path');

// Helpers
const { trimQuotes } = require('../helpers/trim-quotes');
const { PATHS } = require('../helpers/constants');

/**
 * Get CLI arguments for server initialization and remove them from process.argv array.
 *
 * @param {string} rootPath - Absolute root path.
 * @returns {object} - Processed properties from CLI arguments.
 */
const getCLIArguments = (rootPath = PATHS.ROOT) => (
  process.argv.slice(2).reduce((accumulator, argument, index) => ({
    ...accumulator,

    // Server port
    ...(['--port', '-p'].some(extension => argument.includes(extension))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        port: trimQuotes(argument.split('=')[1]),
        matchedIndex: accumulator.matchedIndex - 1
      } : {}),

    // Server files directory
    ...(['--dir', '-d'].some(exclude => argument.includes(exclude))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        directory: resolve(rootPath, trimQuotes(argument.split('=')[1])),
        matchedIndex: accumulator.matchedIndex - 1
      } : {})
  }), {
    directory: './dist',
    matchedIndex: 2,
    port: '3000'
  })
);

module.exports = {
  getCLIArguments
};
