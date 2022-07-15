/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState } from '../state.interfaces';

/**
 * Get members reducer.
 *
 * @param state - Store state.
 */
export const getMembers = (state: MembersState): void => {
  state.isLoading = true;
};
