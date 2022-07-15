/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { Member } from '../../state.interfaces';

// Response member with ID
export interface ResponseMember extends Member {
  id: string;
}
