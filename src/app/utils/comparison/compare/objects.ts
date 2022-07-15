/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { isPlainObject, getStringRepresentingObject } from '../../helpers';
import { AssertOptions } from '../interfaces';
import { OPTIONS } from '../constants';
import { plainObjectsComparison } from './plain-objects';
import { arrayComparison } from './arrays';

/**
 * Compare two objects types.
 *
 * @param item1 - First item for comparison.
 * @param item2 - Second item to compare with.
 * @param results - Assertion results.
 * @returns Updated assertion results.
 */
export function compareObjects(
  item1: unknown,
  item2: unknown & Record<string, unknown>,
  results = OPTIONS
): AssertOptions {
  return (isPlainObject(item1) && plainObjectsComparison(item1, item2, results)) // Check if item1 is plain object type
    || (Array.isArray(item1) && arrayComparison(item1, item2, results)) // It's not an object, let's check for array
    || { // We are dealing with object type that we don't support assertion right now (e.g. Map, Set...)
      ...results,
      notSupported: `object type "${getStringRepresentingObject(item1)}" is not currently supported!`
    };
}
