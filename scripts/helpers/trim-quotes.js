/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Trim single and double quotes from string.
 *
 * @param {string} value - String value.
 * @returns {string} - Formatted string.
 */
const trimQuotes = value => {

  // Check do we have any value fro trimming
  if (!value) {
    return value;
  }

  // Trim the string
  const trimmedValue = value.trim();

  // Check if the quotes are present
  return trimmedValue.startsWith('"') || trimmedValue.startsWith('\'')
    ? trimmedValue.substring(1, value.length - 1)
    : trimmedValue;
};

module.exports = {
  trimQuotes
};
