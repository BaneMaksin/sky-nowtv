/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { compareValues } from './deep';

/**
 * Wrapper function around deep compare assertion method.
 *
 * @param item1 - First item for comparison.
 * @param item2 - Second item to compare with.
 * @returns Equality flag.
 */
export function deepCompare(item1: unknown, item2: unknown): boolean {
  const { isEqual } = compareValues(item1, item2);
  return isEqual;
}
