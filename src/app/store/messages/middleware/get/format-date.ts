/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { getOrdinal } from '@utils';

/**
 * Format date object to human readable format, e.g. 1st Jan 2020 17:00.
 *
 * @param date - Date object to be formatted.
 * @returns Formatted date format.
 */
export const formatDate = (date: Date): string => {

  // Get day of month
  const dayOfMonth = date.getDate();

  // Get date ordinal
  const ordinal = getOrdinal(dayOfMonth);

  // Format rest of the date
  const formattedDate = new Intl.DateTimeFormat(
    'en-GB',
    {
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }
  ).format(date)
    .replace(',', '');

  // Return fully formatted date
  return `${dayOfMonth}${ordinal} ${formattedDate}`;
};
