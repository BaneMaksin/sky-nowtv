/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ErrorsState } from '../state.interfaces';
import { errorsSlice } from '../slice';

/**
 * Select general errors.
 *
 * @param state - Store state.
 */
export const getErrors = (state: Record<string, ErrorsState>): string[] => (
  state[errorsSlice.name].errors
);
