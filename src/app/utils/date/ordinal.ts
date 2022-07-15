/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Ordinal suffix map
const SUFFIX_MAP = {
  other: 'th',
  zero: '',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: ''
};

/**
 * Get date ordinal.
 *
 * @param dayOfMonth - Date of month.
 * @returns Ordinal suffix.
 */
export const getOrdinal = (dayOfMonth: number): string => {

  // Get plural rule
  const pluralRule = new Intl.PluralRules('en-GB', {
    type: 'ordinal'
  });

  // Get ordinal
  const ordinal: Intl.LDMLPluralRule = pluralRule.select(dayOfMonth);

  // Match the suffix
  return SUFFIX_MAP[ordinal];
};
