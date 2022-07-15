/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState } from '../state.interfaces';
import { membersSlice } from '../slice';

/**
 * Select members loading status.
 *
 * @param state - Store state.
 */
export const getMembersLoading = (state: Record<string, MembersState>): boolean => (
  state[membersSlice.name].isLoading
);
