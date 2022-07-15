/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { resolve } = require('path');

// Constants
const { PATHS } = require('../helpers/constants');

// Helpers
const { copyFileCompare } = require('../helpers/copy-file-compare');
const { transpileCJS } = require('./transpile-cjs');

/**
 * Wrapper around tests transpilation and copy of static files with compare functionality
 * (only files that were changed will be transoiled).
 *
 * @param {Array} sourcePaths - List of source paths to transpile and copy.
 * @param {Array} extensions - List of the supported extensions.
 * @param {Array} exclude - List of excluded absolute paths.
 * @param {object} replace - Key value pair for search and replace during transpilation.
 * @param {Array} copyInclude - Paths to be included into the static copy.
 * @param {Array} copyExtensions - List of extensions to support during copy.
 * @returns {Promise<Array>} - Promise that will resolve when transpilation and copy process has finished.
 */
const transpileCjsCopyCompare = (
  sourcePaths,
  extensions,
  exclude,
  replace,
  copyInclude,
  copyExtensions
) => (
  Promise.all([
    transpileCJS({
      sourcePaths,
      extensions,
      exclude,
      replace
    }),
    copyFileCompare({
      includes: [
        ...copyInclude.map(copyInc => (copyInc.includes(PATHS.ROOT)
          ? copyInc
          : resolve(PATHS.ROOT, copyInc)
        ))
      ],
      extensions: [...copyExtensions, '.json'],
      exclude: ['examples'],
      sourcePaths
    })
  ])
);

module.exports = {
  transpileCjsCopyCompare
};
