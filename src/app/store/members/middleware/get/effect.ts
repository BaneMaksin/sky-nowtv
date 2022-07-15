/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { AnyAction, ListenerEffectAPI } from '@reduxjs/toolkit';
import { Dispatch as ReduxDispatch } from 'redux';

import { MembersState } from '../../state.interfaces';
import { membersSlice } from '../../slice';
import { ResponseMember } from './data.interface';
import { mapResponseDataById } from './map-by-id';

/**
 * Get members side effects.
 *
 * @param action - Listener action as object with properties payload and type.
 * @param listenerApi - Listener effect API.
 */
export async function getMembersEffect(
  action: AnyAction,
  listenerApi: ListenerEffectAPI<MembersState, ReduxDispatch<AnyAction>>
): Promise<void> {

  // Get actions
  const { actions: { successMembers, failMembers } } = membersSlice;

  // Fetch the members
  try {

    // Make the request
    const response: Response = await window.fetch('/members');
    const responseData: ResponseMember[] = await response.json();

    // Map the members by ID
    const mappedData = mapResponseDataById(responseData);

    // Dispatch success action with mapped response data
    listenerApi.dispatch(successMembers(mappedData));
  } catch (error) {

    // Dispatch fail action
    listenerApi.dispatch(failMembers(error));
  }
}
