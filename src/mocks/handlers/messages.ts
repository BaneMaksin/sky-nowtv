/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { rest } from 'msw';

// Get the mocked data
import { getMessages } from '../../data';

/**
 * Get message data handler.
 */
export const messagesHandler = rest.get(
  '/message',
  async (request, response, context) => {

    // Resolve message mocked data
    try {
      const messagesMockedData = await getMessages();
      return response(
        context.status(200),
        context.json(messagesMockedData)
      );
    } catch (error) {
      return response(
        context.status(500),
        context.json(error)
      );
    }
  }
);
