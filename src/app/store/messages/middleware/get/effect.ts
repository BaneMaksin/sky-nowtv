/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { AnyAction, ListenerEffectAPI } from '@reduxjs/toolkit';
import { Dispatch as ReduxDispatch } from 'redux';

import { ResponseMessage, MessagesState } from '../../state.interfaces';
import { messagesSlice } from '../../slice';
import { mapResponseDataByDates } from './map-dates';
import { sortMappedDataByDate } from './sort-dates';

/**
 * Get message side effects.
 *
 * @param action - Listener action format that contains payload and type properties.
 * @param listenerApi - Listener effect API.
 */
export async function getMessagesEffect(
  action: AnyAction,
  listenerApi: ListenerEffectAPI<MessagesState, ReduxDispatch<AnyAction>>
): Promise<void> {

  // Get actions
  const { actions: { successMessages, failMessages } } = messagesSlice;

  // Fetch the members
  try {

    // Make the request
    const response: Response = await window.fetch('/message');
    const responseData: ResponseMessage[] = await response.json();

    // Map message with formatted dates
    const mappedData = mapResponseDataByDates(responseData);

    // Sort message by timestamp
    const sortedData = sortMappedDataByDate(mappedData);

    // Dispatch success action with sorted response data
    listenerApi.dispatch(successMessages(sortedData));
  } catch ({ message, stack }) {

    // Dispatch fail action
    listenerApi.dispatch(failMessages({
      message,
      stack
    }));
  }
}
