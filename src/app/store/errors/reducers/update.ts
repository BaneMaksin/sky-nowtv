/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { ErrorsState } from '../state.interfaces';

/**
 * Update errors reducer.
 *
 * @param state - Store state.
 * @param action - Reducer payload action.
 */
export const updateErrors = (state: ErrorsState, action: PayloadAction<Partial<Error>[]>): void => {
  state.errors = [
    ...state.errors,
    ...action.payload
  ];
};
