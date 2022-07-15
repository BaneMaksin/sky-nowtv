/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

export interface Results {
  searched: unknown;
  found: unknown;
}

export interface Equal extends Results {
  isEqual: boolean;
}

export interface AssertOptions {
  isMissingCurrentProp: boolean;
  currentPropDepth: string;
  notSupported: string;
  notEqual: Results;
}

export interface PrimitivesStatus {
  updatedResults: AssertOptions;
  shouldStopIteration: boolean;
}

export interface PrimitivesOptions {
  item1Key: number | string;
  results: AssertOptions;
  item1Value: unknown;
  item2: unknown & Record<string, unknown>;
}
