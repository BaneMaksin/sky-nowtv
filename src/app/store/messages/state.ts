/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from './state.interfaces';

// Messages initial state
export const initialState: MessagesState = Object.freeze({
  messagesDescDate: null,
  isLoading: false,
  error: null
});
