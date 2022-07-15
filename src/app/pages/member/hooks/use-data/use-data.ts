/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { GetMessageData } from '@store/messages';
import { useDeepCompareEffect } from '@shared';
import { actions, selectors } from '@store';
import { Member } from '@store/members';
import { isPlainObject } from '@utils';

import { HookStoreData } from './use-data.interface';

/**
 * Get the store data and dispatch the actions if they are not present.
 *
 * @param chunk - Current messages chunk count.
 * @param memberId - Member ID.
 * @param isMemberIdValid - Member ID validity flag.
 * @returns Store data.
 */
export const useStoreData = (
  chunk: number,
  memberId: string,
  isMemberIdValid: boolean
): HookStoreData => {

  // Get dispatcher instance
  const dispatch = useDispatch();

  // Select the store state members and messages data
  const member: Member = useSelector(selectors.getMemberById(memberId));
  const isMemberLoading = useSelector(selectors.getMembersLoading, shallowEqual);
  const isMessagesLoading = useSelector(selectors.getMessagesLoading, shallowEqual);
  const { messages, isMore }: GetMessageData = useSelector(selectors.getMemberMessages(chunk, memberId));

  // Wrapper for use effect hook that will deep compare complex dependencies
  // for getting the members and messages store data
  useDeepCompareEffect(() => {

    // Dispatch the actions only when data are missing
    if (!member && !isMemberLoading && !messages?.length && !isMessagesLoading && isMemberIdValid) {
      dispatch(actions.getMessages());
      dispatch(actions.getMembers());
    }

    // Check for valid members data
    if (member && isPlainObject(member) && !Object.values(member).length) {
      dispatch(actions.updateErrors([
        'Member data are not valid!'
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
    isMemberLoading,
    isMemberIdValid,
    messages,
    dispatch,
    member
  ]);

  // Return the data for render
  return {
    messages,
    member,
    isMore
  };
};
