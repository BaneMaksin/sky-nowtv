/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '@store';

import { validateMemberId } from '../../helpers';

/**
 * Check member ID hook and raise error if it's invalid.
 *
 * @param memberId - Member ID.
 * @returns Memoized flag if member id is valid.
 */
export const useCheckMemberId = (memberId: string): boolean => {

  // Memoized
  const memoizedIsMemberIdValid = useMemo(() => validateMemberId(memberId), [memberId]);

  // Get dispatcher
  const dispatch = useDispatch();

  // Dispatch the error if member ID is not valid
  useEffect(() => {
    if (!memoizedIsMemberIdValid) {
      dispatch(actions.updateErrors([{
        message: 'Invalid member ID'
      }]));
    }
  }, [dispatch, memoizedIsMemberIdValid]);

  // Return the memoized member ID
  return memoizedIsMemberIdValid;
};
