/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { promises: { writeFile } } = require('fs');

// Constants
const constants = require('./constants');

/**
 * Save chunks file for CI parallel run.
 *
 * @param {Array} testsPaths - List of transpiled tests absolute paths.
 * @param {string} type - Chunks type, Jest or Cypress.
 * @returns {Promise<null|undefined>} - Promise that will be resolved when chunks file has been saved.
 */
const saveChunksFile = async (testsPaths, type) => {
  const parallelJobs = parseInt(process.env.PARALLEL_CHUNKS, 10);

  // Check tests paths list
  if (!testsPaths.length) {
    return null;
  }

  // Split tests by parallel chunks
  const jestChunks = [...Array(parallelJobs).keys()].reduce((accumulator, parallelJob) => ({
    ...accumulator,
    [parallelJob + 1]: testsPaths.splice(0, parallelJobs)
  }), {});

  // Save parallel chunks
  return writeFile(
    constants[`${type.toLowerCase()}ChunksPath`],
    JSON.stringify(jestChunks, null, 2)
  );
};

module.exports = {
  saveChunksFile
};
