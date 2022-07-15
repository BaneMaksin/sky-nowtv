/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { AssertOptions } from '../interfaces';
import { comparePrimitiveValues } from './primitives';

/**
 * Compare if two plain objects are equal.
 *
 * @param item1 - First item for comparison.
 * @param item2 - Second item to compare with.
 * @param results - Assertion results.
 * @returns Updated assertion results.
 */
export const plainObjectsComparison = (
  item1: unknown,
  item2: unknown & Record<string, unknown>,
  results: AssertOptions
): AssertOptions => {

  // Placeholder for updating the results
  let updatedResults = { ...results };

  // Iterate over object properties
  Object.entries(item1).some(([item1Key, item1Value]) => {

    // Update current prop depth path
    updatedResults = {
      ...updatedResults,
      currentPropDepth: `${results.currentPropDepth ? `${results.currentPropDepth}.` : ''}${item1Key}`
    };

    // Check does item2 contain the same property as item1
    // Not using Object.prototype method 'hasOwnProperty' from target object directly
    // https://eslint.org/docs/rules/no-prototype-builtins
    if (!item2 || !Object.prototype.hasOwnProperty.call(item2, item1Key)) {
      updatedResults = {
        ...updatedResults,
        isMissingCurrentProp: true
      };

      // Stop iteration
      return true;
    }

    // Next compare primitive values
    const {
      updatedResults: primitiveComparisonResults,
      shouldStopIteration
    } = comparePrimitiveValues({
      results: updatedResults,
      item1Value,
      item1Key,
      item2
    });

    // Update results from comparison
    updatedResults = { ...primitiveComparisonResults };

    // If true, will stop iteration
    return shouldStopIteration;
  });

  // Return updated results
  return updatedResults;
};
