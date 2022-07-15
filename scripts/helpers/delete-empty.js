/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { promises: { rmdir } } = require('fs');
const { dirname } = require('path');

// Helpers
const { isDirEmpty } = require('./is-directory-empty');

/**
 * Delete all empty parent directories.
 *
 * @param {string} pathDirectory - Directory absolute path.
 * @returns {Promise<void>}
 */
const deleteEmptyDirectories = async pathDirectory => {

  // Check if directory is empty
  if (await isDirEmpty(pathDirectory)) {

    // If it's delete the directory
    await rmdir(pathDirectory);

    // Check parent recursively
    await deleteEmptyDirectories(dirname(pathDirectory));
  }
};

module.exports = {
  deleteEmptyDirectories
};
