/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ErrorsState } from '../state.interfaces';

/**
 * Clear errors reducer.
 *
 * @param state - Store state.
 */
export const clearErrors = (state: ErrorsState): void => {
  if (state.errors.length) {
    state.errors = [];
  }
};
