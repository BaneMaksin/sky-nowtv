/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useState, useCallback } from 'react';

import { UseLoadMoreReturn } from './use-load-more.interfaces';

/**
 * Load more messages chunk count handler.
 *
 * @returns Memoized handler to update chunk number and latest chunk number.
 */
export const useLoadMoreMessages = (): UseLoadMoreReturn => {

  // Define local state for messages chunks
  const [chunk, setChunk] = useState(1);

  // Memoize the button click handler to load more messages
  const memoizedClickHandler = useCallback(
    () => setChunk(chunk + 1),
    [chunk, setChunk]
  );

  // Return the object for loading more messages
  return {
    memoizedClickHandler,
    chunk
  };
};
