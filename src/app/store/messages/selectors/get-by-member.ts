/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from '../state.interfaces';
import { messagesSlice } from '../slice';
import { BATCH } from '../config';

import { GetMessageData } from './get.interfaces';

/**
 * Select sorted message by date wrapper.
 *
 * @param chunk - Chunk number for rendering.
 * @param memberId - Member ID.
 * @returns Selector function.
 */
export const getMemberMessages = (chunk: number, memberId: string) => (

  /**
   * Select sorted message by date.
   *
   * @param state - Store state.
   * @returns Data for loading messages in batches.
   */
  (state: Record<string, MessagesState>): GetMessageData => {

    // Sorted and mapped message
    const { messagesDescDate } = state[messagesSlice.name];
    const filteredMessages = messagesDescDate?.filter(({ userId }) => userId === memberId);
    const slices = Math.ceil((filteredMessages?.length || 0) / BATCH);

    // Return data for loading messages in batches
    return {
      messages: filteredMessages?.slice(0, chunk * BATCH),
      isMore: slices !== chunk
    };
  }
);
