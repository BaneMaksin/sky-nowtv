/*
 * Date: 7/15/22, 9:34 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ThunkMiddlewareFor } from '@reduxjs/toolkit/src/getDefaultMiddleware';
import { expect } from '@jest/globals';
import {
  ValidateSliceCaseReducers,
  SliceCaseReducers,
  configureStore,
  EnhancedStore,
  AnyAction
} from '@reduxjs/toolkit';

import { ErrorsState } from '../state.interfaces';
import { errorsSlice } from '../slice';

// Mock reducer resolver
jest.mock('../../helpers/resolve-reducers', () => ({
  resolveStoreReducers: (): ValidateSliceCaseReducers<unknown, SliceCaseReducers<unknown>> => ({
    ...global.STORE_REDUCERS_PATHS.reducers.reduce((accumulator: Record<string, unknown>, reducerPath: string) => ({
      ...accumulator,
      // eslint-disable-next-line no-underscore-dangle
      ...(reducerPath.includes(`store${global.__OS_SEPARATOR__}errors${global.__OS_SEPARATOR__}reducers`) ? {
        ...require(reducerPath) // eslint-disable-line global-require, import/no-dynamic-require
      } : {})
    }), {})
  })
}));

describe('Store error slice', () => {

  // Store instance
  let store: EnhancedStore<unknown, AnyAction, [ThunkMiddlewareFor<unknown>]>;

  // Configure the store before each test
  beforeEach(() => {
    store = configureStore({ reducer: errorsSlice.reducer });
  });

  // Delete the store after each test
  afterEach(() => {
    store = null;
  });

  it('should return dispatched errors update action payload', () => {
    const { getInitialState, actions: { updateErrors } } = errorsSlice;
    const mockPayload = ['Error 1', 'Error2'];

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<ErrorsState>getInitialState(),
      errors: mockPayload
    });
  });
});
