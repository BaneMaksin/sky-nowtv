/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Flush promises.
 *
 * @returns {Promise<any>} - Promise that will be resolve immediately.
 */
module.exports = () => {
  const msWait = 1;

  // Not 'lock' on the "await"
  Promise.resolve().then(() => jest.advanceTimersByTime(msWait));

  // Resolve promise on next tick
  // return new Promise(resolve => setTimeout(() => resolve(), msWait)); // Fallback
  return new Promise(process.nextTick);
};
