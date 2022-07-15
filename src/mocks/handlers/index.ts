/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import * as members from './members';
import * as messages from './messages';

/**
 * Mocked endpoints handlers.
 */
export const handlers = [...Object.values({
  ...members,
  ...messages
})];
