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

import mockedMembersResponse from '@data/members.json';

import { mapResponseDataById } from '../middleware/get/map-by-id';
import { MembersState } from '../state.interfaces';
import { membersSlice } from '../slice';

// Mock middleware
jest.mock('../middleware/get/effect');

// Mock reducer resolver
jest.mock('../../helpers/resolve-reducers', () => ({
  resolveStoreReducers: (): ValidateSliceCaseReducers<unknown, SliceCaseReducers<unknown>> => ({
    ...global.STORE_REDUCERS_PATHS.reducers.reduce((accumulator: Record<string, unknown>, reducerPath: string) => ({
      ...accumulator,
      // eslint-disable-next-line no-underscore-dangle
      ...(reducerPath.includes(`store${global.__OS_SEPARATOR__}members${global.__OS_SEPARATOR__}reducers`) ? {
        ...require(reducerPath) // eslint-disable-line global-require, import/no-dynamic-require
      } : {})
    }), {})
  })
}));

describe('Store members slice', () => {

  // Store instance
  let store: EnhancedStore<Partial<MembersState>, AnyAction, [ThunkMiddlewareFor<MembersState>]>;

  // Configure the store before each test
  beforeEach(() => {
    store = configureStore({ reducer: membersSlice.reducer });
  });

  // Delete the store after each test
  afterEach(() => {
    store = null;
  });

  it('should return loading state after get members action has been dispatched', () => {
    const { getInitialState, actions: { getMembers } } = membersSlice;

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the get members action
    store.dispatch((<ActionCreatorWithoutPayload>getMembers)());

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MembersState>getInitialState(),
      isLoading: true
    });
  });

  it('should return dispatched members success action payload', () => {
    const { getInitialState, actions: { successMembers } } = membersSlice;

    // Map the members by ID
    const mappedData = mapResponseDataById(mockedMembersResponse);

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the members success action
    store.dispatch(successMembers(mappedData));

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MembersState>getInitialState(),
      mappedDataById: mappedData
    });
  });

  it('should return dispatched members fail action payload', () => {
    const { getInitialState, actions: { failMembers } } = membersSlice;
    const { message } = new Error('Foo Bar');
    const mockedError = { message };

    // Verify initial state
    expect(store.getState()).toEqual(getInitialState());

    // Dispatch the members fail action
    store.dispatch(failMembers(mockedError));

    // Verify that the store has been reduced by action payload
    expect(store.getState()).toEqual({
      ...<MembersState>getInitialState(),
      error: mockedError
    });
  });
});
