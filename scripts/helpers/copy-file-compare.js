/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const {
  promises: {
    mkdir,
    copyFile,
    unlink,
    lstat
  }
} = require('fs');
const {
  relative,
  dirname,
  join,
  resolve
} = require('path');

// Constants
const { PATHS } = require('./constants');

// Helpers
const { deleteEmptyDirectories } = require('./delete-empty');
const { asyncForEach } = require('./async-foreach');
const { getFiles } = require('./get-files');

/**
 * Copy only the changed files in the source .
 *
 * @param {object} options - Function argument options.
 * @param {string} options.rootPath - Top level project root path.
 * @param {Array} options.sourcePaths - List of sources directories paths.
 * @param {Array} options.includes - Additional include paths.
 * @param {Array} options.extensions - List of files extensions to match.
 * @param {Array} options.exclude - List of files and directories to exclude from match.
 * @returns {Promise<void>}
 */
const copyFileCompare = ({
  rootPath = PATHS.ROOT,
  includes = [],
  exclude = [],
  sourcePaths,
  extensions
}) => {

  // Check do we have all the options
  if (!sourcePaths || !sourcePaths.length || !extensions || !extensions.length) {
    throw new Error('Missing required function arguments options');
  }

  // Iterate over source directories and compare files at destinations
  return asyncForEach(sourcePaths, async sourcePath => Promise.all([

    // Get source files related to the current source iteration
    getFiles({
      path: sourcePath,
      withMtime: true,
      extensions,
      exclude
    }),

    // Get destination files related to the current source iteration
    getFiles({
      path: resolve(PATHS.TESTS, relative(rootPath, sourcePath)),
      withMtime: true,
      extensions,
      exclude
    }),

    // Get modified time of includes files
    await Promise.all(includes.map(async include => ({
      path: include,
      mtime: (await lstat(include)).mtime
    })))

  ]).then(async ([matchedSourcePaths, matchedCopiedPaths, processedIncludes]) => {
    let matchedCopiedFiles = matchedCopiedPaths || [];

    // Now iterate over matched source files
    await asyncForEach([...matchedSourcePaths, ...processedIncludes], async ({ path: matchedSourcePath, mtime }) => {

      // Flag should the source file path be compiled or not
      let shouldCopy = true;

      // Prepare copied paths
      const buildPath = join(PATHS.TESTS, matchedSourcePath.replace(rootPath, ''));

      // Iterate over matched copied files list and reduce it if the copied file path
      // in the current iteration can't be matched with the relative source file path.
      matchedCopiedFiles = matchedCopiedFiles.reduce((accumulator, matchedCopiedFile) => {

        // Try to match matched copied file path with the formatted source file path
        if (matchedCopiedFile.path === buildPath) {

          // When the match has been found, compare the copied file path modified time and mark the source file
          // not to be compiled if copied file have a greater modified time compare to source file
          if (matchedCopiedFile.mtime > mtime) {
            shouldCopy = false;
          }

          return accumulator;
        }

        // If no build CJS file path has been matched, update accumulation for the next source file path iteration
        return [
          ...accumulator,
          matchedCopiedFile
        ];

      }, []);

      // Compile the matched source file and write the traspiled code into the destination file
      if (shouldCopy) {
        await mkdir(dirname(buildPath), { recursive: true });
        await copyFile(matchedSourcePath, buildPath);
      }
    });

    // Finally check do we need to delete obsolete copied files
    return asyncForEach(matchedCopiedFiles, async ({ path }) => {

      // Delete obsolete file
      unlink(path);

      // Check if directory is empty and delete if it is
      await deleteEmptyDirectories(dirname(path));
    });
  }));
};

module.exports = {
  copyFileCompare
};
