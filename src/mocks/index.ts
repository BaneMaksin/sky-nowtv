/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { worker } from './browser';

// Default initialization by starting the browser service worker
worker.start({
  onUnhandledRequest: 'bypass', // Disable console warning of unmatched requests
  ...(process.env.NODE_ENV === 'production' ? {
    quiet: true
  } : {}) // Disable console logging on production
});
