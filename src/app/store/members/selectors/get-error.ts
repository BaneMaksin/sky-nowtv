/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState } from '../state.interfaces';
import { membersSlice } from '../slice';

/**
 * Select members error.
 *
 * @param state - Store state.
 */
export const getMembersError = (state: Record<string, MembersState>): Error => (
  state[membersSlice.name].error
);
