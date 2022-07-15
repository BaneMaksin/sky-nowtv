/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Replace all matched instances with key value pairs,
 * where the key is a searched string in a regex and the value is substring to replace the searched key with.
 *
 * @param {string} value - String to search and replace key value pairs.
 * @param {object} mapObj - Key value pairs to use in regex and replace method.
 * @returns {string} - Updated string with replaced substrings.
 */
const replaceAll = (value, mapObj) => {
  const regex = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  return value.replace(regex, matched => mapObj[matched.toLowerCase()]);
};

module.exports = {
  replaceAll
};
