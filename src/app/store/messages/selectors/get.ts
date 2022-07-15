/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MessagesState } from '../state.interfaces';
import { messagesSlice } from '../slice';
import { BATCH } from '../config';

import { GetMessageData } from './get.interfaces';

/**
 * Select sorted message by date.
 *
 * @param chunk - Chunk number for rendering.
 * @returns Data for loading messages in batches.
 */
export const getMessages = (chunk: number) => (state: Record<string, MessagesState>): GetMessageData => {

  // Sorted and mapped message
  const { messagesDescDate } = state[messagesSlice.name];
  const slices = Math.ceil((messagesDescDate?.length || 0) / BATCH);

  // Return data for loading messages in batches
  return {
    messages: messagesDescDate?.slice(0, chunk * BATCH),
    isMore: slices !== chunk
  };
};
