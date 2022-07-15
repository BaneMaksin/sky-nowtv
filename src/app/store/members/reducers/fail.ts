/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { MembersState } from '../state.interfaces';

/**
 * Fail members reducer.
 *
 * @param state - Store state.
 * @param action - Reducer payload action.
 */
export const failMembers = (state: MembersState, action: PayloadAction<string>): void => {
  state.error = action.payload;
  state.isLoading = false;
};
