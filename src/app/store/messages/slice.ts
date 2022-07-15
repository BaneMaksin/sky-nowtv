/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { createSlice } from '@reduxjs/toolkit';

import { resolveStoreReducers } from '../helpers';
import { initialState } from './state';

// Members Redux feature abstraction
export const messagesSlice = createSlice({

  // Name of the feature
  name: 'messages',

  // Initial feature state
  initialState,

  // Reducers function that will generate action creators
  reducers: resolveStoreReducers(
    require.context('./reducers', false, /\.ts$/)
  )
});
