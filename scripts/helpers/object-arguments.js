/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Helpers
const { trimQuotes } = require('./trim-quotes');

/**
 * Process CLI object arguments into the object instance.
 * Example sky-jest --babel-replace=".js.flow":".js" will returns {'.js.flow': '.js'}.
 *
 * @param {string} argument - CLI argument.
 * @returns {object} - Processed argument object or an empty object.
 */
const processObjectArgs = argument => {
  const argumentValue = argument.split('=')[1];

  // Check for matching arguments and arguments value
  if (!argumentValue || !argumentValue.includes(':')) {
    return {};
  }

  // Process the argument value and return the new value array
  return argumentValue.split(',').reduce((accumulator, value) => {
    const [searchKey, replaceValue] = value.split(':');
    return {
      ...accumulator,
      [trimQuotes(searchKey)]: trimQuotes(replaceValue)
    };
  }, {});
};

module.exports = {
  processObjectArgs
};
