/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { configureStore } from '@reduxjs/toolkit';

import { resolveStoreModules } from './helpers';

// Resolve all store slices and middleware modules
const {
  middlewareList,
  selectors,
  reducers,
  actions
} = resolveStoreModules();

// Configure store instance for entry layer provider
export const store = configureStore({
  reducer: { ...reducers },
  middleware: getDefaultMiddleware => (
    middlewareList.reduce((accumulator, { middleware }) => (
      middleware ? accumulator.prepend(middleware) : accumulator
    ), getDefaultMiddleware())
  ),
  devTools: !!window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle
});

// Export root state
export type RootState = ReturnType<typeof store.getState>;

// Export actions
export {
  selectors,
  actions
};
