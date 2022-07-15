/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useRef, useMemo } from 'react';

import { deepCompare } from '@utils';

/**
 * Deep compare for memoized hook.
 *
 * @param value - The value to be memoized (usually a dependency list).
 * @returns a memoized version of the value as long as it remains deeply equal.
 */
export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0);

  if (!deepCompare(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current]);
}
