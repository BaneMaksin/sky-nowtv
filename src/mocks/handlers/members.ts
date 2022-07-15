/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { rest } from 'msw';

// Get the mocked data
import { getMembers } from '../../data';

/**
 * Get members data handler.
 */
export const membersHandler = rest.get(
  '/members',
  async (request, response, context) => {

    // Resolve members mocked data
    try {
      const membersMockedData = await getMembers();
      return response(
        context.status(200),
        context.json(membersMockedData)
      );
    } catch ({ message, stack }) {
      return response(
        context.status(500),
        context.json({
          message,
          stack
        })
      );
    }
  }
);
