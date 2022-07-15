/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { ResponseMessage, MappedMessage } from '../../state.interfaces';
import { formatDate } from './format-date';

/**
 * Map the response messages with formatted date and time since epoch number for date comparison.
 *
 * @param messages - List of messages from response.
 * @returns Mapped messages with new properties.
 */
export const mapResponseDataByDates = (messages: ResponseMessage[]): MappedMessage[] => (
  messages.map(({ timestamp, ...restOfMessage }) => {

    // Get date object
    const messageDate = new Date(timestamp);

    // Map the message with formatted date and milliseconds since the epoch for date comparison
    return {
      ...restOfMessage,
      formattedDate: formatDate(messageDate),
      unixEpoch: messageDate.getTime()
    };
  })
);
