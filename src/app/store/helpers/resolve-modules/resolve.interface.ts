/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { Reducer, ReducersMapObject } from 'redux';
import {
  ListenerMiddlewareInstance,
  SliceCaseReducers,
  AnyAction,
  Slice
} from '@reduxjs/toolkit';

// Context reducers
type ContextReducers = Reducer<Record<string, unknown>, AnyAction>
  | ReducersMapObject<Record<string, unknown>, AnyAction>;

// Middleware require context module
export interface MiddlewareModule {
  [key: string]: ListenerMiddlewareInstance
}

// Selectors require context module
export interface SelectorsModule {
  [key: string]: (...args: unknown[]) => never;
}

// Slice require context module
export interface SliceModule {
  [key: string]: Slice<Record<string, unknown>, SliceCaseReducers<Record<string, unknown>>, string>;
}

// Actions require context module
export interface ActionsModule {
  [key: string]: (...args: unknown[]) => AnyAction;
}

// Mapped modules
export interface MappedStoreModules {
  middlewareList: ListenerMiddlewareInstance[];
  selectors: SelectorsModule;
  reducers: ContextReducers;
  actions: ActionsModule;
}
