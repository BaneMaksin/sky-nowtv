/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Helpers
const { trimQuotes } = require('./trim-quotes');

/**
 * Process CLI array arguments into the array instance.
 * Example sky-jest --babel-extensions="js,ts" will returns ['js','ts'].
 *
 * @param {string} argument - CLI argument.
 * @param {boolean} checkDot - Flag for checking and appending dot to the array items.
 * @returns {Array} - Processed argument array or an empty array.
 */
const processArrayArgs = (argument, checkDot = false) => {
  const argumentValue = argument.split('=')[1];

  // Check for matching arguments and arguments value
  if (!argumentValue) {
    return [];
  }

  // Process the argument value and return the new value array
  return trimQuotes(argumentValue)
    .split(',')
    .map(item => {
      const trimmedItem = item.trim();

      // Check for appending dot to the array item
      if (checkDot) {
        return trimmedItem.startsWith('.') ? trimmedItem : `.${trimmedItem}`;
      }

      // Return the trimmed item
      return trimmedItem;
    });
};

module.exports = {
  processArrayArgs
};
