/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedMessage } from '../state.interfaces';

export interface GetMessageData {
  messages: MappedMessage[];
  isMore: boolean;
}
