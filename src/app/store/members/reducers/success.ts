/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { MembersState, MappedMembers } from '../state.interfaces';

/**
 * Success members reducer.
 *
 * @param state - Store state.
 * @param action - Reducer payload action.
 */
export const successMembers = (state: MembersState, action: PayloadAction<MappedMembers>): void => {
  state.mappedDataById = action.payload;
  state.isLoading = false;
};
