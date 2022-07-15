/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Check if value is one of the 7 primitive data types: string, number, bigint, boolean, undefined, symbol, and null.
 *
 * @param value - Value to be checked.
 * @returns Flag is the value primitive type or not.
 */
export const isPrimitive = (value: unknown): boolean => value !== Object(value);
