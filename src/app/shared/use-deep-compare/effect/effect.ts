/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { DependencyList, EffectCallback, useEffect } from 'react';

import { useDeepCompareMemoize } from '../memoize';

/**
 * Deep compare effect hook.
 *
 * @param callback - Hook callback.
 * @param dependencies - List of dependencies.
 */
export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList
): void {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}
