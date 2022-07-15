/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { AssertOptions, PrimitivesStatus } from '../interfaces';
import { comparePrimitiveValues } from './primitives';

/**
 * Compare if two arrays are equal.
 *
 * @param item1 - First item for comparison.
 * @param item2 - Second item to compare with.
 * @param results - Assertion results.
 * @returns Updated assertion results.
 */
export const arrayComparison = (
  item1: unknown[],
  item2: unknown & Record<string, unknown>,
  results: AssertOptions
): AssertOptions => {

  // Placeholder for updating the results
  let updatedResults = { ...results };

  // Iterate over array
  item1.some((item1Value, index) => {

    // Update current prop depth path
    updatedResults = {
      ...updatedResults,
      currentPropDepth: `${results.currentPropDepth || ''}[${index}]`
    };

    // Next compare primitive values
    const {
      updatedResults: primitiveComparisonResults,
      shouldStopIteration
    }: PrimitivesStatus = comparePrimitiveValues({
      results: updatedResults,
      item1Key: index,
      item1Value,
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
