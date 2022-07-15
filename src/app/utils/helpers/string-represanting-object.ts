/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Get string representing the object abstraction.
 *
 * @param item - Value to be get the string representing the object.
 * @returns String representing the object.
 */
export const getStringRepresentingObject = (item: unknown): string => Object.prototype.toString.call(item);
