/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MouseEventHandler } from 'react';

// More button component input properties
export interface MoreButtonInterfaces {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  isMore: boolean;
}
