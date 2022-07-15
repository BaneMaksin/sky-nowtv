/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Part of response message
interface ResponseMessageTimestamp {
  timestamp: string;
}

// Part of response message
interface ResponseMessageCore {
  message: string;
  userId: string;
  id: string;
}

// Response Message
export interface ResponseMessage extends ResponseMessageCore, ResponseMessageTimestamp {}

// Sorted and mapped message
export interface MappedMessage extends ResponseMessageCore {
  formattedDate: string;
  unixEpoch: number;
}

// Messages store state
export interface MessagesState {
  messagesDescDate: MappedMessage[];
  isLoading: boolean;
  error: string;
}
