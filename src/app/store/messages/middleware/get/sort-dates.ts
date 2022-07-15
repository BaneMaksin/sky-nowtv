/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { MappedMessage } from '../../state.interfaces';

/**
 * Sort message descending by milliseconds from Unix epoch.
 *
 * @param unixEpochA - Milliseconds from message A.
 * @param unixEpochB - Milliseconds from message B.
 * @returns Sorting number.
 */
const sortMessages = (
  { unixEpoch: unixEpochA }: MappedMessage,
  { unixEpoch: unixEpochB }: MappedMessage
): number => {

  // A greater than B
  if (unixEpochA > unixEpochB) {
    return -1;
  }

  // A less than B
  if (unixEpochA < unixEpochB) {
    return 1;
  }

  // Equal
  return 0;
};

/**
 * Sort mapped message by milliseconds from Unix epoch.
 *
 * @param mappedMessages - List of mapped message with milliseconds from Unix epoch property.
 * @returns List of sorted mapped message in descending order.
 */
export const sortMappedDataByDate = (mappedMessages: MappedMessage[]): MappedMessage[] => {

  // Sort mapped message by date descending
  mappedMessages.sort(sortMessages);

  // Return sorted message
  return mappedMessages;
};
