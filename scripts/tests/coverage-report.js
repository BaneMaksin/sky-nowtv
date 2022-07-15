/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Import dependencies
const { exec } = require('child_process');
const { promisify } = require('util');
const { platform } = require('os');
const {
  constants: { F_OK, R_OK },
  promises: { access }
} = require('fs');

// Paths
const { PATHS } = require('../helpers/constants');

/**
 * Open the Jest coverage report.
 *
 * @returns {Promise<void>} - Promise that will be resolved when coverage repo has been opened.
 */
const openCoverageReport = async () => {

  // Check does the directory exist and try to create it if not
  try {
    await access(PATHS.COVERAGE_REPORT, F_OK | R_OK);
    await promisify(exec)(`${platform() === 'win32' ? 'start' : 'open'} ${PATHS.COVERAGE_REPORT}`);
    process.exit(); // Default exit code is 0, success
  } catch (error) {
    throw Error(`Missing coverage file report at "${PATHS.COVERAGE_REPORT}"`);
  }
};

module.exports = {
  openCoverageReport
};
