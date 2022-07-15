/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { isPrimitive } from '../../helpers';
import { PrimitivesOptions, PrimitivesStatus } from '../interfaces';
import { compareObjects } from './objects';

/**
 * Compare primitive values. If values turn out to be non-primitive, recursively call objects comparison.
 *
 * @param item1Value - First item value in the current iteration.
 * @param item1Key - First item property key or array index in the current iteration.
 * @param item2 - Second item to compare with.
 * @param results - Assertion results.
 * @returns Updated assertion results.
 */
export const comparePrimitiveValues = ({
  item1Value,
  item1Key,
  results,
  item2
}: PrimitivesOptions): PrimitivesStatus => {
  const isItemPrimitive = isPrimitive(item1Value);

  // Placeholder for updating the results
  let updatedResults = { ...results };

  // Next compare primitive value
  if (isItemPrimitive && item1Value !== item2[item1Key]) {
    updatedResults = {
      ...updatedResults,
      notEqual: {
        found: item2[item1Key],
        searched: item1Value
      }
    };

    // Stop iteration
    return {
      shouldStopIteration: true,
      updatedResults
    };
  }

  // Recursion
  if (!isItemPrimitive) {
    updatedResults = {
      ...compareObjects(item1Value, <Record<string, unknown>>item2[item1Key], updatedResults)
    };
  }

  // Stop or continue iteration
  return {
    shouldStopIteration: !!(
      updatedResults.isMissingCurrentProp
      || updatedResults?.notEqual
      || updatedResults?.notSupported
    ),
    updatedResults
  };
};
