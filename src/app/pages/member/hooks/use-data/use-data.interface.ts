/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedMessage } from '@store/messages/state.interfaces';
import { Member } from '@store/members/state.interfaces';

// Mapped hook store data
export interface HookStoreData {
  messages: MappedMessage[];
  isMore: boolean;
  member: Member;
}
