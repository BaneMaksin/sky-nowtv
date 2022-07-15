/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { createSlice } from '@reduxjs/toolkit';

import { resolveStoreReducers } from '../helpers';
import { initialState } from './state';

// Members Redux feature abstraction
export const membersSlice = createSlice({

  // Name of the feature
  name: 'members',

  // Initial feature state
  initialState,

  // Reducers function that will generate action creators
  reducers: resolveStoreReducers(
    require.context('./reducers', false, /\.ts$/)
  )
});
