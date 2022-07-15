/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedMessage } from '@store/messages';
import { MappedMembers } from '@store/members';

// Hook data
export interface HookStoreData {
  messages: MappedMessage[];
  members: MappedMembers;
  isMore: boolean;
}
