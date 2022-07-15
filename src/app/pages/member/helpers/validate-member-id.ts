/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

/**
 * Check member ID format.
 *
 * @param memberId - Member unique ID.
 * @returns Validity flag.
 */
export const validateMemberId = (memberId: string): boolean => (
  !(!memberId || typeof memberId !== 'string' || memberId.split('-').length !== 5)
);
