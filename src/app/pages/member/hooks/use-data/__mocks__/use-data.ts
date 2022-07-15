/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { mapResponseDataByDates } from '@store/messages/middleware/get/map-dates';
import { sortMappedDataByDate } from '@store/messages/middleware/get/sort-dates';
import { mapResponseDataById } from '@store/members/middleware/get/map-by-id';
import { getMemberMessages } from '@store/messages/selectors/get-by-member';
import mockedMessagesResponse from '@data/messages.json';
import mockedMembersResponse from '@data/members.json';
import { initialState } from '@store/messages/state';

import { HookStoreData } from '../use-data.interface';

/**
 * Mocked get the store data hook.
 *
 * @param chunk - Current messages chunk count.
 * @param memberId - Member ID.
 * @returns Store data.
 */
export const useStoreData = (
  chunk: number,
  memberId: string
): HookStoreData => {

  // Map message with formatted dates
  const mappedData = mapResponseDataByDates(mockedMessagesResponse);

  // Sort message by timestamp
  const sortedData = sortMappedDataByDate(mappedData);

  // Return the data for render
  return {
    member: mapResponseDataById(mockedMembersResponse)?.[memberId],
    ...getMemberMessages(chunk, memberId)({
      messages: {
        ...initialState,
        messagesDescDate: sortedData
      }
    })
  };
};
