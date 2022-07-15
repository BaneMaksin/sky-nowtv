/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { PayloadAction } from '@reduxjs/toolkit';

import { MessagesState, MappedMessage } from '../state.interfaces';

/**
 * Success message reducer.
 *
 * @param state - Store state.
 * @param action - Reducer payload action.
 */
export const successMessages = (state: MessagesState, action: PayloadAction<MappedMessage[]>): void => {
  state.messagesDescDate = action.payload;
  state.isLoading = false;
};
