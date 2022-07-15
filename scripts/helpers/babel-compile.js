/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { dirname } = require('path');
const { promises: { writeFile, mkdir } } = require('fs');
const { transformFileAsync } = require('@babel/core');

// Helpers
const { replaceAll } = require('./replace-all');

/**
 * Compile the absolute file path using babel and write the transpiled code into the destination path.
 *
 * @param {object} options - Function argument options.
 * @param {RegExp} options.replaceRegex - Regular expression for search and replace.
 * @param {boolean | string} options.sourceMaps - Generate source maps during transpilation.
 * @param {string} options.babelConfigPath - Babel configuration absolute path.
 * @param {string} options.pathToCompile - Absolute file path needed to be transpiled.
 * @param {object} options.replace - Replace key value pair during transpilation process.
 * @param {string} options.buildPath - Absolute destination path.
 * @returns {Promise<void>}
 */
const babelCompileWrite = async ({
  // eslint-disable-next-line prefer-regex-literals
  replaceRegex = new RegExp('require\\("(.*)interfaces?"\\);', 'gi'),
  sourceMaps = false,
  babelConfigPath,
  pathToCompile,
  replace = {},
  buildPath
}) => {

  // Transpile the file from the matched path
  const { code: transpiledCode } = await transformFileAsync(pathToCompile, {
    configFile: babelConfigPath,
    sourceMaps
  });

  // Try to write transpiled code into the destination path
  try {
    await mkdir(dirname(buildPath), { recursive: true });
    await writeFile(
      buildPath,
      replaceAll(
        transpiledCode.replace(replaceRegex, '{};'),
        replace
      )
    );
  } catch (writeError) {
    console.error(writeError);
  }
};

module.exports = {
  babelCompileWrite
};
