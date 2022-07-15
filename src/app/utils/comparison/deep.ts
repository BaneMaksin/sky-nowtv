/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { getStringRepresentingObject } from '../helpers/string-represanting-object';
import { isPrimitive } from '../helpers/is-primitive';
import { AssertOptions, Equal } from './interfaces';
import { compareObjects } from './compare/objects';

/**
 * Deep compare if two items are equal.
 *
 * @param item1 - First item for comparison.
 * @param item2 - Second item to compare with.
 * @returns Object containing assertion results.
 */
export const compareValues = (item1: unknown, item2: unknown): Equal => {

  // First check for items types
  const item1Type = getStringRepresentingObject(item1);
  const item2Type = getStringRepresentingObject(item2);
  if (item1Type !== item2Type) {
    return {
      searched: `type ${item1Type.slice(8, -1)}`,
      found: `but found type ${item2Type.slice(8, -1)}`,
      isEqual: false
    };
  }

  // Second check for primitive values and do a strict equal comparison
  if (isPrimitive(item1) && item1 !== item2) {
    return {
      searched: `"${item1}"`,
      found: `found "${item2}"`,
      isEqual: false
    };
  }

  // Next check for array type length
  if (Array.isArray(item1) && Array.isArray(item2) && item1.length !== item2.length) {
    return {
      searched: `array length ${item1.length}`,
      found: `but found ${item2.length}`,
      isEqual: false
    };
  }

  // We are dealing with complex type (objects), let's run a deep comparison
  if (item1 !== null && typeof item1 === 'object') {
    const {
      isMissingCurrentProp,
      currentPropDepth,
      notSupported,
      notEqual
    }: AssertOptions = compareObjects(item1, <Record<string, unknown>>item2);

    // Check for not equal values
    if (currentPropDepth && notEqual) {
      return {
        searched: `${currentPropDepth} "${notEqual?.searched}"`,
        found: `but found "${notEqual?.found}"`,
        isEqual: false
      };
    }

    // Check for missing property
    if (currentPropDepth && isMissingCurrentProp) {
      return {
        searched: `${currentPropDepth}`,
        found: 'but was not found',
        isEqual: false
      };
    }

    // Encountered object type we currently don't support in this version of assertion
    if (notSupported) {
      return {
        searched: `${notSupported}`,
        found: '',
        isEqual: false
      };
    }
  }

  // Last things to check is function instance
  if (typeof item1 === 'function') {
    const item1FunctionAsString = item1.toString();
    const item2FunctionAsString = item2.toString();

    if (item1FunctionAsString !== item2FunctionAsString) {
      return {
        searched: `"${item1}"`,
        found: `but found "${item2}"`,
        isEqual: false
      };
    }
  }

  // Return empty object properties for parent destructuring assignment if none of the assertion has failed
  return {
    searched: null,
    isEqual: true,
    found: null
  };
};
