/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { renderHook, act } from '@testing-library/react';
import { expect } from '@jest/globals';

import { useLoadMoreMessages } from '../use-load-more';

describe('Shared load more hook', () => {

  it('should return click handler and chunk count', () => {

    // Render the hook
    const { result } = renderHook(useLoadMoreMessages);

    // Verify results
    expect(result.current).toEqual({
      memoizedClickHandler: expect.any(Function),
      chunk: 1
    });
  });

  it('should update chunk count on click handler call', () => {

    // Render the hook
    const { result } = renderHook(useLoadMoreMessages);

    // Call click handler
    act(() => {
      result.current.memoizedClickHandler();
    });

    // Verify chunk count update
    expect(result.current.chunk).toEqual(2);
  });
});
