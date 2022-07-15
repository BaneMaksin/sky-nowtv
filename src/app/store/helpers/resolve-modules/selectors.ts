/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedStoreModules, SelectorsModule } from './resolve.interface';

/**
 * Map selectors context modules.
 *
 * @param filename - Context file (module) path.
 * @param accumulator - Context keys iteration reducer accumulator.
 * @param module - Resolved context module.
 */
export const mapSelectors = (
  filename: string,
  accumulator: MappedStoreModules,
  module: SelectorsModule
): Partial<MappedStoreModules> => ({
  ...filename.includes('selectors') ? {
    selectors: {
      ...accumulator.selectors,
      ...module
    }
  } : {}
});
