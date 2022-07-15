/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Helpers
const { processObjectArgs } = require('../helpers/object-arguments');
const { processArrayArgs } = require('../helpers/array-arguments');
const { trimQuotes } = require('../helpers/trim-quotes');

/**
 * Get CLI arguments for Babel transpilation and remove them from process.argv array.
 *
 * @returns {object} - Processed properties from CLI arguments.
 */
const getCLIArguments = () => (
  process.argv.slice(2).reduce((accumulator, argument, index) => ({
    ...accumulator,

    // Babel extension for transpilation
    ...(['--babel-extensions', '--bext'].some(extension => argument.includes(extension))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        extensions: processArrayArgs(argument, true),
        matchedIndex: accumulator.matchedIndex - 1
      } : {}),

    // Babel exclude from transpilation
    ...(['--babel-exclude', '--bexc'].some(exclude => argument.includes(exclude))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        exclude: processArrayArgs(argument)
      } : {}),

    // Babel include in transpilation
    ...(['--babel-include', '--binc'].some(exclude => argument.includes(exclude))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        include: processArrayArgs(argument)
      } : {}),

    // Babel replace during transpilation
    ...(['--babel-replace', '--br'].some(replace => argument.includes(replace))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        replace: processObjectArgs(argument)
      } : {}),

    // Copy assets include
    ...(['--copy-include', '--cpi'].some(replace => argument.includes(replace))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        copyInclude: processArrayArgs(argument)
      } : {}),

    // Copy assets include
    ...(['--copy-extensions', '--cpe'].some(replace => argument.includes(replace))
    && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        copyExtensions: processArrayArgs(argument)
      } : {}),

    // Force removal of the entire .tests folder
    ...(argument === '--delete' && process.argv.splice(index + accumulator.matchedIndex, 1).length ? {
      matchedIndex: accumulator.matchedIndex - 1,
      shouldDelete: true
    } : {}),

    // Only build the .tests folder
    ...(argument === '--only-build'
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        isOnlyBuild: true
      } : {}),

    // Open generated coverage report
    ...(['--open-report', '--or'].some(replace => argument.includes(replace))
      && process.argv.splice(index + accumulator.matchedIndex, 1).length
      ? {
        matchedIndex: accumulator.matchedIndex - 1,
        shouldOpenReport: true
      } : {}),

    // Create or run parallel
    ...(argument.includes('--parallel') && process.argv.splice(index + accumulator.matchedIndex, 1).length ? {
      matchedIndex: accumulator.matchedIndex - 1,
      parallelMode: trimQuotes(argument.split('=')[1])
    } : {}),

    // Watch for changes in the source folders and also put Jest into watch mode
    ...(argument === '--watch' ? {
      isWatch: true
    } : {}),

    // Watch for changes in the source folders and also put Jest into watch mode
    ...(argument === '--ci' ? {
      isCi: true
    } : {}),

    // Watch for changes in the source folders and also put Jest into watch mode
    ...(argument === '--runInBand' ? {
      runInBand: true
    } : {})
  }), {
    shouldOpenReport: false,
    shouldDelete: false,
    copyExtensions: [],
    isOnlyBuild: false,
    parallelMode: '',
    runInBand: false,
    matchedIndex: 2,
    copyInclude: [],
    extensions: [],
    isWatch: false,
    exclude: [],
    replace: {},
    include: [],
    isCi: false
  })
);

module.exports = {
  getCLIArguments
};
