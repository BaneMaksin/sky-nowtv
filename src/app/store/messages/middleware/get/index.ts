/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { createListenerMiddleware } from '@reduxjs/toolkit';

import { messagesSlice } from '../../slice';
import { getMessagesEffect } from './effect';

// Create listening Redux middleware
export const getMessagesListenerMiddleware = createListenerMiddleware();

// Start listening on action dispatch
getMessagesListenerMiddleware.startListening({
  actionCreator: messagesSlice.actions.getMessages,
  effect: getMessagesEffect
});
