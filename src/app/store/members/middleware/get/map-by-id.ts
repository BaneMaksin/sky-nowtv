/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedMembers } from '../../state.interfaces';
import { ResponseMember } from './data.interface';

/**
 * Map response members list by ID.
 *
 * @param membersList - Response member list.
 * @returns Mapped members by ID.
 */
export const mapResponseDataById = (membersList: ResponseMember[]): MappedMembers => ({
  ...membersList.reduce((accumulator, { id, ...restOfMemberData }) => ({
    ...accumulator,
    [id]: {
      ...restOfMemberData,
      ...(!restOfMemberData.avatar ? {
        avatar: 'https://dummyimage.com/100x100.jpg/dddddd/000000&text=no-image'
      } : {})
    }
  }), {})
});
