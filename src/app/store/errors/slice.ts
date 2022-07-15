/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { createSlice } from '@reduxjs/toolkit';

import { resolveStoreReducers } from '../helpers';
import { initialState } from './state';

// general errors Redux feature abstraction
export const errorsSlice = createSlice({

  // Name of the feature
  name: 'errors',

  // Initial feature state
  initialState,

  // Reducers function that will generate action creators
  reducers: resolveStoreReducers(
    require.context('./reducers', false, /\.ts$/)
  )
});
