/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from '../state.interfaces';
import { messagesSlice } from '../slice';

/**
 * Select messages loading status.
 *
 * @param state - Store state.
 * @returns Messages loading flag.
 */
export const getMessagesLoading = (state: Record<string, MessagesState>): boolean => (
  state[messagesSlice.name].isLoading
);
