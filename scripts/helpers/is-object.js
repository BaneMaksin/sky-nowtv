/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Check if object an instance of plain object.
 *
 * @param {object} obj - Object to check.
 * @param {boolean} checkConstructor - Should we check the object constructor.
 * @returns {boolean} - Boolean value if argument is instance of the plain object.
 */
const isPlainObject = (obj, checkConstructor = true) => (
  typeof obj === 'object' // separate from primitives
    && obj !== null
    // In some strange cases in node environment this will equal false for plain objects
    // e.g. for some reason [Function: Object] !== [Function: Object]
    && ((checkConstructor && obj.constructor === Object) || true) // separate instances (Array, DOM, ...)
    && Object.prototype.toString.call(obj) === '[object Object]' // separate build-in like Math
);

module.exports = {
  isPlainObject
};
