/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { sep, resolve } = require('path');
const { watch, promises: { access } } = require('fs');

// Constants
const { PATHS } = require('../helpers/constants');

// Helpers
const { checkNodeProcessVersion } = require('../helpers/satisfy-version');
const { asyncForEach } = require('../helpers/async-foreach');
const { delDir } = require('../helpers/delete');
const { createParallelBlocks, runParallel } = require('./parallel');
const { transpileCjsCopyCompare } = require('./transpile-copy');
const { openCoverageReport } = require('./coverage-report');
const { includeModules } = require('./include-modules');
const { getCLIArguments } = require('./get-arguments');

// Get CLI arguments for Babel transpilation and remove them from process.argv array
const {
  shouldOpenReport,
  copyExtensions,
  shouldDelete,
  parallelMode,
  copyInclude,
  isOnlyBuild,
  extensions,
  exclude,
  replace,
  include,
  isWatch,
  isCi
} = getCLIArguments();

// Set source paths
const SOURCE_PATHS = [
  ...include.map(includeRootPath => resolve(PATHS.ROOT, includeRootPath)),
  ...includeModules(['crypto-es']),
  `${PATHS.ROOT}${sep}__mocks__`,
  `${PATHS.ROOT}${sep}vendors`,
  `${PATHS.ROOT}${sep}src`
];

// Log that build will start
if (!isCi) {
  console.info('Building unit tests', '\n');
}

// Transpile code base for Jest initialization
checkNodeProcessVersion()
  .then(() => shouldOpenReport && openCoverageReport())
  .then(() => shouldDelete && delDir(PATHS.TESTS, { ignore: ['setup'] }))
  .then(() => !isCi && transpileCjsCopyCompare(SOURCE_PATHS, extensions, exclude, replace, copyInclude, copyExtensions))
  .then((...args) => (
    isOnlyBuild
    && parallelMode === 'create'
    && process.env.PARALLEL_CHUNKS
    && createParallelBlocks(...args)
  ))
  .then(() => (
    parallelMode === 'run'
    && process.env.CI_NODE_INDEX
    && runParallel()
  ))
  .then(() => {

    // Initiate Jest
    if (!isOnlyBuild) {
      console.info('Running unit tests', '\n');
      require('jest/bin/jest');
    }
  })
  .then(async () => isWatch && asyncForEach(SOURCE_PATHS, async sourcePath => {

    // Check does watched source path exist
    try {
      if (!await access(sourcePath)) {
        watch(sourcePath, { recursive: true }, (eventType, filename) => (
          eventType === 'change' && filename
            && transpileCjsCopyCompare(SOURCE_PATHS, extensions, exclude, replace, copyInclude, copyExtensions)
        ));
      }
      // Silently fallback
    } catch {} // eslint-disable-line no-empty

  }))
  .catch(console.error); // Log any encountered errors
