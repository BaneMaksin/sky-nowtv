/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { promises: { readdir, lstat } } = require('fs');
const { resolve, join } = require('path');

/**
 * Get all files from the path folder.
 *
 * @param {object} options - Get files configuration options properties.
 * @param {string} options.path - Resolved build folder path.
 * @param {Array} options.extensions - List of files extensions to match.
 * @param {Array} options.exclude - List of files and directories to exclude from match.
 * @param {boolean} options.withMtime - Should the matched return the file mtime as well.
 * @returns {Promise<string[]>} - Promise that will resolve in a absolute paths list
 * of all matched files within the path folder.
 */
const getFiles = async ({
  path = '',
  extensions = [],
  exclude = [],
  withMtime = false
}) => {
  let files = [];
  let dirents = [];

  // Check for empty path
  if (!path) {
    throw new Error('Missing directory path.');
  }

  // Try to read the directory
  try {
    dirents = await readdir(path, { withFileTypes: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(error);
    }
  }

  // Recursively read the entire directory
  if (dirents.length) {
    files = await Promise.all(dirents.map(async dirent => {
      const filePath = join(path, dirent.name);

      // Check for exclude list
      if (exclude.includes(dirent.name) || exclude.some(exc => dirent.name.endsWith(exc) || filePath.endsWith(exc))) {
        return [];
      }

      // Check if dirent object describes a file system directory
      if (dirent.isDirectory()) {
        return getFiles({
          path: resolve(path, dirent.name),
          extensions,
          exclude,
          withMtime
        });
      }

      // Finally check does dirent object file name match with the list of supported extensions
      if (extensions.some(extension => dirent.name.endsWith(extension))) {
        const fileAbsolutePath = resolve(path, dirent.name);
        return withMtime ? {
          path: fileAbsolutePath,
          mtime: (await lstat(fileAbsolutePath)).mtime
        } : fileAbsolutePath;
      }

      return [];
    }));
  }

  // Flatten the array since Promise will have it own set of files list
  return files.flat();
};

module.exports = {
  getFiles
};
