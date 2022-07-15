/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { satisfies } = require('semver');

// Get NodeJS engines version
const {
  engines: {
    node: version
  }
} = require('../../package.json');

/**
 * Verify that process NodeJS version is matched under the engines rules in package.json.
 *
 * @returns {string} - Satisfy message.
 */
const checkNodeProcessVersion = async () => {
  if (!satisfies(process.version, version)) {
    throw new Error(`The current node process version ${process.version}, does not satisfy
    the required node engines versions scope ${version}.`);
  }

  return 'Process node version was matched with engine.';
};

module.exports = {
  checkNodeProcessVersion
};
