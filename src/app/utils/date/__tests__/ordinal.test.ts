/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { expect } from '@jest/globals';

import { getOrdinal } from '../ordinal';

describe('Ordinal date util', () => {

  it('should return st date ordinal', () => {

    // Calculate ordinal
    const ordinal = getOrdinal(1);

    // Verify results
    expect(ordinal).toEqual('st');
  });

  it('should return nd date ordinal', () => {

    // Calculate ordinal
    const ordinal = getOrdinal(2);

    // Verify results
    expect(ordinal).toEqual('nd');
  });

  it('should return th date ordinal', () => {

    // Calculate ordinal
    const ordinal = getOrdinal(5);

    // Verify results
    expect(ordinal).toEqual('th');
  });
});
