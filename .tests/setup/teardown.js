/*
 * Date: 7/15/22, 9:31 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Async function to run after all tests suits.
 *
 * @returns {Promise<*>}
 */
module.exports = async () => {
  delete process.env.STORE_REDUCERS_PATHS;
  return delete process.env.__OS_SEPARATOR__;
};
