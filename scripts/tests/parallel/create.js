/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Helpers
const { saveChunksFile } = require('./save');

// Jest test files suffixes
const JEST_SUFFIXES = [
  '.test.js',
  '.test.jsx',
  '.test.ts',
  '.test.tsx'
];

// Cypress test files suffixes
const CYPRESS_SUFFIXES = [
  '.spec.js',
  '.spec.jsx',
  '.test.ts',
  '.test.tsx'
];

/**
 * Create parallel blocks for usage during CI parallel jobs run.
 *
 * @param {Array} transpiledCJS - List of transpiled and copied files paths.
 * @param {object} transpiledCJS.0 - Compiled and deleted files paths.
 * @returns {Promise<null|undefined>} - Promise that will be resolved when parallel blocks has been created.
 */
const createParallelBlocks = async ([{ compiled: compiledFilesPaths }]) => {

  // Map compiled files list to Cypress and Jest files
  const { cypressPaths, jestPaths } = compiledFilesPaths.reduce((accumulator, compiledFilesPath) => ({
    cypressPaths: [
      ...accumulator.cypressPaths,
      ...(CYPRESS_SUFFIXES.some(cypressSuffix => compiledFilesPath.endsWith(cypressSuffix))
        ? [compiledFilesPath]
        : [])
    ],
    jestPaths: [
      ...accumulator.jestPaths,
      ...(JEST_SUFFIXES.some(jestSuffix => compiledFilesPath.endsWith(jestSuffix))
        ? [compiledFilesPath]
        : [])
    ]
  }), {
    cypressPaths: [],
    jestPaths: []
  });

  // Save Cypress parallel chunks
  await saveChunksFile(cypressPaths, 'cypress');

  // Save Jest parallel chunks
  return saveChunksFile(jestPaths, 'jest');
};

module.exports = {
  createParallelBlocks
};
