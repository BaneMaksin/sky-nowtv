/*
 * Date: 7/15/22, 1:48 PM
 * Copyright: Branislav Maksin (c) 2022
 */

// Make sure we're a module
export {};

// Extends global typings for Window & typeof globalThis type
declare global {
  var __OS_SEPARATOR__: string;
  var STORE_REDUCERS_PATHS: {
    reducers: string[];
  };
}
