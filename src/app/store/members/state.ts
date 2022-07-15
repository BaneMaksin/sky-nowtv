/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MembersState } from './state.interfaces';

// Members initial state
export const initialState: MembersState = Object.freeze({
  mappedDataById: null,
  isLoading: false,
  error: null
});
