/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { checkContext } from '../check-context';
import { MappedStoreModules } from './resolve.interface';
import { mapMiddleware } from './middleware';
import { mapSelectors } from './selectors';
import { mapSlices } from './slices';

/**
 * Resolve the modules from the webpack require context.
 *
 * @returns Resolved modules object.
 */
export const resolveStoreModules = (): MappedStoreModules => {

  // Get the store modules context
  const context: __WebpackModuleApi.RequireContext = (
    require.context('../../', true, /(slice|middleware\/(.*)index|selectors\/(.*))\.ts$/)
  );

  // Verify webpack require context
  checkContext(context);

  // Resolve all modules files and defines store initialisation object
  return {
    ...context.keys().reduce((accumulator: MappedStoreModules, filename: string) => {

      // Resolve module context
      const module = context(filename);

      // Update store initialisation object
      return {
        ...accumulator,

        // Selectors
        ...mapSelectors(filename, accumulator, module),

        // Slices
        ...mapSlices(filename, accumulator, module),

        // Middleware
        ...mapMiddleware(filename, accumulator, module)
      };
    }, {
      middlewareList: [],
      selectors: {},
      reducers: {},
      actions: {}
    })
  };
};
