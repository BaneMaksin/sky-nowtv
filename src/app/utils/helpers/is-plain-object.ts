/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { getStringRepresentingObject } from './string-represanting-object';

/**
 * Check if object is instance of a plain object.
 *
 * @param value - Object instance to check.
 * @returns Boolean value if argument is instance of a plain object.
 */
export const isPlainObject = (value: unknown): boolean => (
  typeof value === 'object' // separate from primitives
  && value !== null // null is also type of object
  && (<Record<string, unknown>>value).constructor === Object // separate instances (Array, DOM, ...)
  && getStringRepresentingObject(value) === '[object Object]' // separate build-in like Math
);
