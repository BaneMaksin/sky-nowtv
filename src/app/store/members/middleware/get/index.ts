/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { createListenerMiddleware } from '@reduxjs/toolkit';

import { membersSlice } from '../../slice';
import { getMembersEffect } from './effect';

// Create listening Redux middleware
export const getMembersListenerMiddleware = createListenerMiddleware();

// Start listening on action dispatch
getMembersListenerMiddleware.startListening({
  actionCreator: membersSlice.actions.getMembers,
  effect: getMembersEffect
});
