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
  AnyAction, ActionCreatorWithoutPayload
} from '@reduxjs/toolkit';

import mockedMessagesResponse from '@data/messages.json';

import { mapResponseDataByDates } from '../middleware/get/map-dates';
import { sortMappedDataByDate } from '../middleware/get/sort-dates';
import { MessagesState } from '../state.interfaces';
import { messagesSlice } from '../slice';

// Mock middleware
jest.mock('../middleware/get/effect');

// Mock reducer resolver
jest.mock('../../helpers/resolve-reducers', () => ({
  resolveStoreReducers: (): ValidateSliceCaseReducers<unknown, SliceCaseReducers<unknown>> => ({
    ...global.STORE_REDUCERS_PATHS.reducers.reduce((accumulator: Record<string, unknown>, reducerPath: string) => ({
      ...accumulator,
      // eslint-disable-next-line no-underscore-dangle
      ...(reducerPath.includes(`store${global.__OS_SEPARATOR__}messages${global.__OS_SEPARATOR__}reducers`) ? {
        ...require(reducerPath) // eslint-disable-line global-require, import/no-dynamic-require
      } : {})
    }), {})
  })
}));

describe('Store messages slice', () => {

  // Store instance
  let store: EnhancedStore<unknown, AnyAction, [ThunkMiddlewareFor<unknown>]>;

  // Configure the store before each test
  beforeEach(() => {
    store = configureStore({ reducer: messagesSlice.reducer });
  });

  // Delete the store after each test
  afterEach(() => {
    store = null;
  });

  it('should return loading state after get messages action has been dispatched', () => {
    const { getInitialState, actions: { getMessages } } = messagesSlice;

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch((<ActionCreatorWithoutPayload>getMessages)());

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MessagesState>getInitialState(),
      isLoading: true
    });
  });

  it('should return dispatched messages success action payload', () => {
    const { getInitialState, actions: { successMessages } } = messagesSlice;

    // Map message with formatted dates
    const mappedData = mapResponseDataByDates(mockedMessagesResponse);

    // Sort message by timestamp
    const sortedData = sortMappedDataByDate(mappedData);

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(successMessages(sortedData));

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MessagesState>getInitialState(),
      messagesDescDate: mappedData
    });
  });

  it('should return dispatched members fail action payload', () => {
    const { getInitialState, actions: { failMessages } } = messagesSlice;
    const mockedError = 'Foo Bar';

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the update errors action
    store.dispatch(failMessages(mockedError));

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MessagesState>getInitialState(),
      error: mockedError
    });
  });
});
