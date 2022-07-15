/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const {
  dirname,
  join,
  basename,
  extname,
  resolve,
  relative
} = require('path');
const { promises: { unlink } } = require('fs');

// Constants
const { PATHS } = require('../helpers/constants');

// Helpers
const { deleteEmptyDirectories } = require('../helpers/delete-empty');
const { babelCompileWrite } = require('../helpers/babel-compile');
const { asyncForEach } = require('../helpers/async-foreach');
const { getFiles } = require('../helpers/get-files');

// Supported file extensions
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Excluded files and directories
const EXCLUDE = [
  '.spec.js',
  '.test.js',
  '.spec.jsx',
  '.test.jsx',
  '.d.ts',
  '.test.ts',
  '.spec.ts',
  '.test.tsx',
  '.spec.tsx',
  '.interface.js',
  '.interface.ts',
  '.interfaces.js',
  '.interfaces.ts',
  '.stories.js',
  '.stories.jsx',
  '.stories.ts',
  '.stories.tsx',
  '.eslintrc.js',
  'development',
  'examples',
  'generated.js'
];

// Replace key value pairs
const REPLACE = {
  'lodash-es': 'lodash',
  'build/esm': 'build/cjs'
};

/**
 * Build CommonJS version of the package for usage in Jest unit .tests.
 *
 * @param {object} options - Function argument options.
 * @param {Array} options.sourcePaths - List of absolute paths of the folders to include into transpilation.
 * @param {string} options.buildCJSPath - Absolute path of the build CJS folder.
 * @param {string} options.babelConfigPath - Absolute path of the Babel configuration file.
 * @param {Array} options.extensions - List of supported file extensions for transpilation.
 * @param {Array} options.exclude - List of files and extensions to exclude.
 * @param {object} options.replace - Replace key value pair during transpilation process.
 * @param {object} options.shouldCompare - Flag should the Babel only transpile changed files.
 * @param {boolean | string} options.sourceMaps - Generate source maps during transpilation.
 * @param {string} options.rootPath - Absolute root path of the project.
 * @returns {Promise<object>} - Promise that will be resolved when the CJS has been built.
 */
const babelCJS = async ({
  sourcePaths = [PATHS.SRC, PATHS.VENDORS],
  babelConfigPath = PATHS.BABEL_CONFIG,
  buildCJSPath = PATHS.BUILD.CJS,
  extensions = EXTENSIONS,
  shouldCompare = false,
  sourceMaps = false,
  replace = REPLACE,
  exclude = EXCLUDE,
  rootPath = ''
} = {}) => {

  // Set the flag for Babel CLI build
  process.env.BABEL_ENV = 'buildCJS';

  // List of transpiled and deleted files
  const compilationFilesPaths = {
    compiled: [],
    deleted: []
  };

  // Transpile all matched files and write them into build CJS folder
  await asyncForEach(sourcePaths, async sourcePath => getFiles({
    withMtime: shouldCompare,
    path: sourcePath,
    extensions,
    exclude
  }).then(async matchedSourcePaths => {
    let matchedBuildCJSFiles = [];

    // Get destination files related to the current source iteration
    if (shouldCompare) {
      matchedBuildCJSFiles = await getFiles({
        path: resolve(buildCJSPath, rootPath ? relative(rootPath, sourcePath) : sourcePath),
        withMtime: shouldCompare,
        extensions: ['.js'],
        exclude
      });
    }

    // Now iterate over matched source files
    await asyncForEach(matchedSourcePaths, async matchedSourcePath => {
      const sourceFilePath = shouldCompare ? matchedSourcePath.path : matchedSourcePath;

      // Flag should the source file path be compiled or not
      let shouldCompile = true;

      // Prepare build paths
      const buildPath = join(buildCJSPath, sourceFilePath.replace(rootPath || sourcePath, ''));
      const fileName = basename(buildPath, extname(buildPath));
      const buildPathWithExtension = join(dirname(buildPath), `${fileName}${fileName.endsWith('.js') ? '' : '.js'}`);

      // Iterate over matched build CJS files list and reduce it if the build file path
      // in the current iteration can't be matched with the relative source file path.
      if (shouldCompare) {
        const { mtime } = matchedSourcePath;
        matchedBuildCJSFiles = matchedBuildCJSFiles.reduce((accumulator, matchedBuildCJSFile) => {

          // Try to match matched build CJS file path with the formatted build source file path
          if (matchedBuildCJSFile.path === buildPathWithExtension) {

            // When the match has been found, compare the build CJS file path modified time and
            // mark the source file not to be compiled if build CJS file have a greater modified time
            // compared to source file
            if (matchedBuildCJSFile.mtime > mtime) {
              shouldCompile = false;
            }

            return accumulator;
          }

          // If no build CJS file path has been matched, update accumulation for the next
          // source file path iteration
          return [
            ...accumulator,
            matchedBuildCJSFile
          ];

        }, []);
      }

      // Compile the matched source file and write the traspiled code into the destination file
      if (shouldCompile) {
        await babelCompileWrite({
          buildPath: buildPathWithExtension,
          pathToCompile: sourceFilePath,
          babelConfigPath,
          sourceMaps,
          replace
        });

        // Add compiled file path to the compilation list
        compilationFilesPaths.compiled.push(buildPathWithExtension);
      }
    });

    // Finally, check do we need to delete obsolete build CJS files
    return asyncForEach(matchedBuildCJSFiles, async ({ path }) => {

      // Delete obsolete file
      await unlink(path);

      // Check if directory is empty and delete if it is
      await deleteEmptyDirectories(dirname(path));

      // Add deleted file path to the compilation list
      compilationFilesPaths.deleted.push(path);
    });
  })).finally(() => delete process.env.BABEL_ENV);

  // Return compilation summary
  return compilationFilesPaths;
};

module.exports = {
  babelCJS,
  EXTENSIONS,
  EXCLUDE,
  REPLACE
};
