/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');

// Helpers
const { babelCJS, REPLACE, EXTENSIONS } = require('../assemble/babel');

// Constants
const { PATHS } = require('../helpers/constants');

/**
 * Transpile source paths into CommonJS formatting system for better Jest tests performance.
 *
 * @param {object} options - Function argument options.
 * @param {Array} options.sourcePaths - List of absolute paths of the folders to include into transpilation.
 * @param {string} options.buildCJSPath - Absolute path of the destination files.
 * @param {Array} options.extensions - List of supported file extensions for transpilation.
 * @param {Array} options.exclude - List of files and extensions to exclude.
 * @param {object} options.replace - Replace key value pair during transpilation process.
 * @returns {Promise<object>} - Compilation summary.
 */
const transpileCJS = async ({
  sourcePaths,
  buildCJSPath = PATHS.TESTS,
  extensions = [],
  exclude = [],
  replace = {}
}) => babelCJS({
  babelConfigPath: join(PATHS.ROOT, './babel.config.js'),
  extensions: [...EXTENSIONS, ...extensions],
  rootPath: PATHS.ROOT,
  sourceMaps: 'inline',
  shouldCompare: true,
  buildCJSPath,
  sourcePaths,
  exclude: [
    '.interface.js',
    '.interface.ts',
    '.interfaces.js',
    '.interfaces.ts',
    '.d.ts',
    '.eslintrc.js',
    'examples',
    'generated.js',
    ...exclude
  ],
  replace: {
    ...REPLACE,
    ...replace
  }
});

module.exports = {
  transpileCJS
};
