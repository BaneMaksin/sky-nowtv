/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { expect } from '@jest/globals';

import { deepCompare } from '../wrapper';

describe('Deep compare wrapper util', () => {

  // Mocked object
  const complexObject1 = {
    propA: 1,
    propB: {
      propA: [
        1,
        {
          propA: 'f',
          propB: 'o'
        },
        3
      ],
      propB: 1,
      propC: 2
    }
  };

  it('should return equal for "foo" vs "foo"', () => {

    // Compare two values
    const isEqual = deepCompare('foo', 'foo');

    // Verify results
    expect(isEqual).toBeTruthy();
  });

  it('should return not equal for"fooBar" vs "foo"', () => {

    // Compare two values
    const isEqual = deepCompare('fooBar', 'foo');

    // Verify results
    expect(isEqual).toBeFalsy();
  });

  it('should return not equal for "[\'f\']" vs "{0: \'f\'}"', () => {

    // Compare two values
    const isEqual = deepCompare(['f'], { 0: 'f' });

    // Verify results
    expect(isEqual).toBeFalsy();
  });

  it('should return not equal for "[\'f\', \'o\']" vs "[\'f\', \'o\', \'o\']"', () => {

    // Compare two values
    const isEqual = deepCompare(['f', 'o'], ['f', 'o', 'o']);

    // Verify results
    expect(isEqual).toBeFalsy();
  });

  it('should return equal for "[\'f\', \'o\', \'o\']" vs "[\'f\', \'o\', \'o\']"', () => {

    // Compare two values
    const isEqual = deepCompare(['f', 'o', 'o'], ['f', 'o', 'o']);

    // Verify results
    expect(isEqual).toBeTruthy();
  });

  it('should return equal for "complexObject1" vs "complexObject1Copy"', () => {
    const complexObject1Copy = {
      propA: 1,
      propB: {
        propA: [
          1,
          {
            propA: 'f',
            propB: 'o'
          },
          3
        ],
        propB: 1,
        propC: 2
      }
    };

    // Compare two values
    const isEqual = deepCompare(complexObject1, complexObject1Copy);

    // Verify results
    expect(isEqual).toBeTruthy();
  });

  it('should return not equal for "complexObject1" vs "complexObject2"', () => {
    const complexObject2 = {
      propA: 1,
      propB: {
        propB: 1,
        propA: [
          1,
          {
            propA: 'f',
            propB: 'b'
          },
          3
        ],
        propC: 2
      }
    };

    // Compare two values
    const isEqual = deepCompare(complexObject1, complexObject2);

    // Verify results
    expect(isEqual).toBeFalsy();
  });

  it('should return not equal for "complexObject1" vs "complexObject3"', () => {
    const complexObject3 = {
      propA: 1,
      propB: {
        propA: [
          1,
          {
            propA: 'f',
            propB: 'o'
          },
          3
        ],
        propB: 1
      }
    };

    // Compare two values
    const isEqual = deepCompare(complexObject1, complexObject3);

    // Verify results
    expect(isEqual).toBeFalsy();
  });

  it('should return not equal for "null" vs "{}"', () => {

    // Compare two values
    const isEqual = deepCompare(null, {});

    // Verify results
    expect(isEqual).toBeFalsy();
  });
});
