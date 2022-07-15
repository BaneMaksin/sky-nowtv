/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState, MappedMembers } from '../state.interfaces';
import { membersSlice } from '../slice';

/**
 * Select mapped members by ID.
 *
 * @param state - Store state.
 */
export const getMembers = (state: Record<string, MembersState>): MappedMembers => (
  state[membersSlice.name].mappedDataById
);
