/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useSelector } from 'react-redux';

import { selectors } from '@store';

/**
 * Errors hook to combine all errors in the app.
 *
 * @param customErrors - List of custom errors instances.
 * @returns List of errors.
 */
export const useErrors = (customErrors: Error[] = []): Partial<Error>[] => {

  // Get member error
  const messagesError = useSelector(selectors.getMembersError);

  // Get messages error
  const membersError = useSelector(selectors.getMembersError);

  // Get general errors
  const generalErrors = useSelector(selectors.getErrors);

  // Return the data for render
  return [
    ...generalErrors,
    ...customErrors,
    ...(messagesError ? [messagesError] : []),
    ...(membersError ? [membersError] : [])
  ];
};
