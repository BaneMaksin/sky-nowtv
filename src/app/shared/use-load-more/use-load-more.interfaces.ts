/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MouseEventHandler } from 'react';

// Use load more return data
export interface UseLoadMoreReturn {
  memoizedClickHandler: MouseEventHandler<HTMLButtonElement>;
  chunk: number;
}
