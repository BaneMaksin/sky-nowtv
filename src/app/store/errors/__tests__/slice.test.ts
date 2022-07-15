/*
 * Date: 7/15/22, 9:34 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ThunkMiddlewareFor } from '@reduxjs/toolkit/src/getDefaultMiddleware';
import { expect } from '@jest/globals';
import {
  ActionCreatorWithoutPayload,
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
  let store: EnhancedStore<Partial<ErrorsState>, AnyAction, [ThunkMiddlewareFor<ErrorsState>]>;

  // Configure the store before each test
  beforeEach(() => {
    store = configureStore({ reducer: errorsSlice.reducer });
  });

  // Delete the store after each test
  afterEach(() => {
    store = null;
  });

  it('should find 1 dispatched error in the store state', () => {
    const { getInitialState, actions: { updateErrors } } = errorsSlice;
    const mockPayload = [{ message: 'Foo' }];

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(1);
    expect(store.getState()).toEqual({
      ...<ErrorsState>getInitialState(),
      errors: mockPayload
    });
  });

  it('should find 2 dispatched errors in the store state', () => {
    const { getInitialState, actions: { updateErrors } } = errorsSlice;
    const mockPayload = [{ message: 'Foo' }, { message: 'Bar' }];

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(2);
    expect(store.getState()).toEqual({
      ...<ErrorsState>getInitialState(),
      errors: mockPayload
    });
  });

  it('should update existing store state errors', () => {
    const { getInitialState, actions: { updateErrors } } = errorsSlice;
    const mockPayload = [{ message: 'Foo' }];

    // Verify initial state
    expect(store.getState().errors).toHaveLength(0);
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(1);

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(2);
  });

  it('should clear existing store state errors', () => {
    const { getInitialState, actions: { updateErrors, clearErrors } } = errorsSlice;
    const mockPayload = [{ message: 'Foo' }];

    // Verify initial state
    expect(store.getState().errors).toHaveLength(0);
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(updateErrors(mockPayload));

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(1);

    // Dispatch the update errors action
    store.dispatch((<ActionCreatorWithoutPayload>clearErrors)());

    // Verify that the store has been reduced by action payload
    expect(store.getState().errors).toHaveLength(0);
  });
});
