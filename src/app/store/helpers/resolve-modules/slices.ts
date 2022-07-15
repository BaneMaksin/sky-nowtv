/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedStoreModules, SliceModule } from './resolve.interface';

/**
 * Map slices context modules.
 *
 * @param filename - Context file (module) path.
 * @param accumulatorContext - Context keys iteration reducer accumulator.
 * @param module - Resolved context module.
 */
export const mapSlices = (
  filename: string,
  accumulatorContext: MappedStoreModules,
  module: SliceModule
): Partial<MappedStoreModules> => ({
  ...filename.includes('slice') ? {
    ...Object.values({ ...module }).reduce((accumulator, { name, reducer, actions }) => ({
      ...accumulator,
      reducers: {
        ...accumulatorContext.reducers,
        [name]: reducer
      },
      actions: {
        ...accumulatorContext.actions,
        ...actions
      }
    }), {})
  } : {}
});
