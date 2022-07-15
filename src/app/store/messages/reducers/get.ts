/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from '../state.interfaces';

/**
 * Get message reducer.
 *
 * @param state - Store state.
 */
export const getMessages = (state: MessagesState): void => {
  state.isLoading = true;
};
