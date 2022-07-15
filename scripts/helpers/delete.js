/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join, extname } = require('path');
const {
  promises: {
    readdir,
    unlink,
    rmdir,
    lstat
  }
} = require('fs');

// Helpers
const { asyncForEach } = require('./async-foreach');
const { isDirEmpty } = require('./is-directory-empty');

/**
 * Delete directory recursively.
 *
 * Usage: await rmdir('some/path') or await rmdir('some/path', { (optionsDescribedBelow) }).
 *
 * @param {string} dirPath - Resolved directory path.
 * @param {object} options - Options with properties described below.
 * @param {object} options.removeContentOnly - Allow deletion of only folder's content.
 * @param {object} options.drillDownSymlinks - Allow drilling symbolic links down.
 * @param {Array} options.extensions - If the file extensions list is populated,
 * delete only files that matches those extensions. E.g. ['.d.ts', '.js'].
 * @param {Array} options.ignore - List of paths to exclude from deletion. E.g. ['globals.d.ts', 'src/typings'].
 * (by default it just deletes a symlink, not its content).
 * @returns {Promise<void>} - Promise that will be resolved when directory was recursively deleted.
 */
const delDir = async (dirPath, options = {}) => {
  let files;

  // Options
  const {
    removeContentOnly = false,
    drillDownSymlinks = false,
    extensions = [],
    ignore = []
  } = options;

  // Try to read the directory
  try {
    files = await readdir(dirPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(error);
    }
  }

  // Check does directory have any files
  if (files && files.length) {
    await asyncForEach([...files], async fileName => {
      const filePath = join(dirPath, fileName);
      const fileStat = await lstat(filePath);

      // Check for directory
      if (fileStat.isDirectory() || (fileStat.isSymbolicLink() && drillDownSymlinks)) {
        await delDir(filePath, options);
      } else if (!ignore.some(ignoreItem => fileName === ignoreItem || filePath.includes(ignoreItem))) {

        // Check for included extensions
        if (extensions.length) {
          if (extensions.includes(extname(fileName).toLowerCase())
            || extensions.some(extension => fileName.split(extension).pop() === '')
          ) {
            await unlink(filePath); // Delete the file
          }
        } else {
          await unlink(filePath); // Delete the file
        }
      }
    });
  }

  // Last check do we need to only remove the directory content (files)
  if (files && !removeContentOnly && await isDirEmpty(dirPath)) {
    await rmdir(dirPath);
  }
};

module.exports = {
  delDir
};
