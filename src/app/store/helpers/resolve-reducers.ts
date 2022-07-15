/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';

import { checkContext } from './check-context';

/**
 * Resolve the modules from the webpack require context.
 *
 * @param context - Instance of webpack require context function.
 * @returns Resolved modules object.
 */
export const resolveStoreReducers = (
  context: __WebpackModuleApi.RequireContext
): ValidateSliceCaseReducers<unknown, SliceCaseReducers<unknown>> => {

  // Verify webpack require context
  checkContext(context);

  // Resolve all modules files and defines store initialisation object
  return {
    ...context.keys().reduce((accumulator, filename: string) => ({
      ...accumulator,
      ...context(filename)
    }), {})
  };
};
