/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useDispatch, useSelector } from 'react-redux';

import { GetMessageData } from '@store/messages';
import { useDeepCompareEffect } from '@shared';
import { actions, selectors } from '@store';
import { isPlainObject } from '@utils';

import { HookStoreData } from './use-data.interface';

/**
 * Hook for getting the store data.
 *
 * @param chunk - Messages chunk count.
 */
export const useStoreData = (chunk: number): HookStoreData => {

  // Get dispatcher instance
  const dispatch = useDispatch();

  // Select the store state members and messages data
  const members = useSelector(selectors.getMembers);
  const isMembersLoading = useSelector(selectors.getMembersLoading);
  const isMessagesLoading = useSelector(selectors.getMessagesLoading);
  const { messages, isMore }: GetMessageData = useSelector(selectors.getMessages(chunk));

  // Wrapper for use effect hook that will deep compare complex dependencies
  // for getting the members and messages store data
  useDeepCompareEffect(() => {

    // Dispatch the actions only when data are missing
    if (!members && !isMembersLoading && !messages?.length && !isMessagesLoading) {
      dispatch(actions.getMessages());
      dispatch(actions.getMembers());
    }

    // Check for valid members data
    if (members && isPlainObject(members) && !Object.values(members).length) {
      dispatch(actions.updateErrors([
        'Members data are not valid!'
      ]));
    }

    // Check for valid messages
    if (messages && Array.isArray(messages) && !messages.length) {
      dispatch(actions.updateErrors([
        'Missing messages data!'
      ]));
    }
  }, [
    isMessagesLoading,
    isMembersLoading,
    messages,
    dispatch,
    members
  ]);

  // Return the data for render
  return {
    messages,
    members,
    isMore
  };
};
