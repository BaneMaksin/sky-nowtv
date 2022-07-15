/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

/**
 * Development configuration plugins wrapper.
 *
 * @returns {Promise<[]>} - Promise that will be resolved with list of development plugins.
 */
const prepareDevPlugins = async () => {

  // Initial Plugins
  const pluginsList = [];

  // Prepare index HTML
  pluginsList.push(
    new HtmlWebpackPlugin({
      template: join(PATHS.TEMPLATES, './index.pug'),
      filename: 'index.html',
      inject: 'body',
      hash: true
    })
  );

  // Return plugins list
  return pluginsList;
};

// Export
module.exports = {
  prepareDevPlugins
};
