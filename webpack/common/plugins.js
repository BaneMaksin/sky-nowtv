/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

const { BUILD_TIMESTAMP } = require('./constants');

/**
 * Common configuration plugins wrapper.
 *
 * @param {object} env - Environment properties.
 * @returns {Promise<[]>} - Promise that will be resolved with list of common plugins.
 */
const prepareCommonPlugins = async (env = {}) => {

  // Initial Plugins
  const pluginsList = [];

  // Create global variables
  const IS_MOCK = env.NODE_ENV === 'mocks' || env.MOCKS === 'true';

  // Define globals
  pluginsList.push(new DefinePlugin({
    BUILD_TIMESTAMP: JSON.stringify(BUILD_TIMESTAMP),
    IS_MOCK: JSON.stringify(IS_MOCK)
  }));

  // Check should we initialize the mocked service worker
  if (IS_MOCK) {
    const { SERVICE_WORKER_BUILD_PATH } = require('msw/config/constants');
    pluginsList.push(new CopyPlugin({
      patterns: [SERVICE_WORKER_BUILD_PATH]
    }));
  }

  // Copy custom assets
  pluginsList.push(
    new CopyPlugin({
      patterns: [
        {
          from: join(PATHS.SRC, './assets/icons/favicon.ico'),
          to: join(PATHS.DIST, './favicon.ico')
        },
        {
          from: join(PATHS.SRC, './assets/manifest.json'),
          to: join(PATHS.DIST, './manifest.json')
        }
      ]
    })
  );

  // Return plugins list
  return pluginsList;
};

// Export
module.exports = {
  prepareCommonPlugins
};
