/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState, Member } from '../state.interfaces';
import { membersSlice } from '../slice';

/**
 * Select mapped members by ID currying.
 *
 * @param memberId - Member ID.
 */
export const getMemberById = (memberId: string) => (

  /**
   * Select mapped members by ID.
   *
   * @param state - Store state.
   */
  (state: Record<string, MembersState>): Member => (
    state[membersSlice.name].mappedDataById?.[memberId]
  )
);
