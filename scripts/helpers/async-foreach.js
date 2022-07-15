/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Async for each method.
 *
 * @param {Array} array - Iterable list.
 * @param {Function} callback - Callback function.
 * @returns {Promise<void>} - Promise that will iterate over array and resolve when all array item has been processed.
 */
const asyncForEach = async (array, callback) => {
  const results = [];

  // Iterate over array and add each item to Promise all
  for (let index = 0; index < array.length; index += 1) {
    results.push(callback(array[index], index, array));
  }

  await Promise.all(results);
};

module.exports = {
  asyncForEach
};
