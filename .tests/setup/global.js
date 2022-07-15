/*
 * Date: 7/15/22, 9:31 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { sep } = require('path');
const { getFiles } = require('../../scripts/helpers/get-files');

// Constants
const { PATHS } = require('../../scripts/helpers/constants');

/**
 * Async function to run only once before all tests suits.
 *
 * @returns {Promise<void>}
 */
module.exports = async () => {

  // Set the system separator to environment variable
  process.env.__OS_SEPARATOR__ = sep;

  // Get all the store files
  const matchedStoreFilesPaths = await getFiles({
    path: PATHS.STORE,
    extensions: [
      '.js'
    ],
    exclude: [
      '__mocks__',
      '__test__'
    ]
  });

  // Filter the store reducers files paths
  const reducersFilesPaths = matchedStoreFilesPaths.reduce((accumulator, matchedFile) => ({
    ...accumulator,
    ...(matchedFile.includes(`${sep}reducers${sep}`) ? {
      reducers: [ ...accumulator.reducers, matchedFile]
    } : {})
  }), {
    reducers: []
  });

  // Set the store reducers files paths to environment variable
  process.env.STORE_REDUCERS_PATHS = JSON.stringify(reducersFilesPaths);
}
