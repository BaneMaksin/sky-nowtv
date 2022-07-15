/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Make sure we're a module
export {};

// Extends global typings for Window & typeof globalThis type
declare global {
  interface Window {

    // Define Redux Dev Tools
    __REDUX_DEVTOOLS_EXTENSION__?: (t: unknown) => unknown;
  }
}
