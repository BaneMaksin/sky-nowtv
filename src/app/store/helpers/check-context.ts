/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Check webpack require context and raise error if instance has been .
 *
 * @param context - Instance of webpack require context function.
 */
export const checkContext = (context: __WebpackModuleApi.RequireContext): void => {

  // Check if context is an instance of the webpack context
  if (typeof context !== 'function'
    || !Object.prototype.hasOwnProperty.call(context, 'keys')
    || !Object.prototype.hasOwnProperty.call(context, 'resolve')
    || typeof context.keys !== 'function'
    || typeof context.resolve !== 'function'
  ) {
    throw new Error('Context is not an instance of the webpack context');
  }
};
