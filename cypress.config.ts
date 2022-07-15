/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

import { defineConfig } from 'cypress';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    specPattern: 'src/app/**/*.cy.ts',
    baseUrl: 'http://localhost:3000',
    supportFile: false
  },
  defaultCommandTimeout: 10000,
  requestTimeout: 5000,
  responseTimeout: 5000,
  watchForFileChanges: true,
  chromeWebSecurity: false,
  viewportHeight: 800,
  viewportWidth: 1200,
  video: false
});
