/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { MessagesState } from '../state.interfaces';

/**
 * Fail message reducer.
 *
 * @param state - Store state.
 * @param action - Reducer payload action.
 */
export const failMessages = (state: MessagesState, action: PayloadAction<Error>): void => {
  state.error = action.payload;
  state.isLoading = false;
};
