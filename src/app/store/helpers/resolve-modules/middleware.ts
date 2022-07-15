/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedStoreModules, MiddlewareModule } from './resolve.interface';

/**
 * Map middleware context modules.
 *
 * @param filename - Context file (module) path.
 * @param accumulator - Context keys iteration reducer accumulator.
 * @param module - Resolved context module.
 */
export const mapMiddleware = (
  filename: string,
  accumulator: MappedStoreModules,
  module: MiddlewareModule
): Partial<MappedStoreModules> => ({
  ...filename.includes('middleware') ? {
    middlewareList: [
      ...accumulator.middlewareList,
      ...Object.values({ ...module })
    ]
  } : {}
});
