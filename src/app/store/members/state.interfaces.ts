/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Member interface without ID
export interface Member {
  firstName: string;
  lastName: string,
  avatar: string;
  email: string;
  ip: string;
}

// Store mapped member
export interface MappedMembers {
  [id: string]: Member;
}

// Members state
export interface MembersState {
  mappedDataById: MappedMembers;
  error: Partial<Error>;
  isLoading: boolean;
}
