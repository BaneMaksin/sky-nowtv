/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { sep } = require('path');

// Constants
const { PATHS } = require('../../scripts/helpers/constants');

// Snapshot resolver
module.exports = {

  /**
   * Test snapshot file path resolver.
   *
   * @param {string} testPath - Absolute path of the test file.
   * @param {string} snapshotExtension - Snapshot file extension.
   * @returns {string} - Absolute path of the snapshot file.
   */
  resolveSnapshotPath: (testPath, snapshotExtension) => `${testPath
    .replace(PATHS.TESTS, PATHS.ROOT)
    .replace('__tests__', `__tests__${sep}__snapshots__`)
  }${snapshotExtension}`,

  /**
   * Test file path resolver.
   *
   * @param {string} snapshotFilePath - Absolute path of the snapshot file.
   * @param {string} snapshotExtension - Snapshot file extension.
   * @returns {string} - Absolute path of the test file.
   */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => snapshotFilePath
    .replace(PATHS.ROOT, PATHS.TESTS)
    .replace(`__tests__${sep}__snapshots__`, '__tests__')
    .slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'src/app/shared/copyright/__tests__/copyright.test.js'
};
