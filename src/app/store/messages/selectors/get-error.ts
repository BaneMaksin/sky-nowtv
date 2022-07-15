/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from '../state.interfaces';
import { messagesSlice } from '../slice';

/**
 * Select messages error.
 *
 * @param state - Store state.
 * @returns Messages error.
 */
export const getMembersError = (state: Record<string, MessagesState>): string => (
  state[messagesSlice.name].error
);
