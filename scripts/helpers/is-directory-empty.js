/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { promises: { opendir } } = require('fs');

/**
 * Check if directory is empty by creating the iterator for the directory.
 * This will remove the need to read all the files and avoid the potential memory & time overhead.
 *
 * @param {string} dirPath - Absolute path of the directory to check.
 * @returns {Promise<boolean>} - Promise that will be resolved with the boolean value.
 */
const isDirEmpty = async dirPath => {
  const dirIter = await opendir(dirPath);
  const { done } = await dirIter[Symbol.asyncIterator]().next();

  // The async iterator for the dir object will close the dir automatically when the iteration finishes
  // Source: https://github.com/nodejs/node/blob/master/lib/internal/fs/dir.js#L199
  // We are simply closing it manually here because of the NodeJS open handler warning
  try {
    await dirIter.close();
  } catch (error) {
    if (error.code !== 'ERR_DIR_CLOSED') {
      throw new Error(error);
    }
  }

  return done;
};

module.exports = {
  isDirEmpty
};
