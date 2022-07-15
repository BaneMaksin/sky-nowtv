/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimize: { AggressiveMergingPlugin } } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

// Check generated index HTML file
const { CheckHTMLMarkupPlugin } = require('./check-html');

/**
 * Production configuration plugins wrapper.
 *
 * @param {object} env - Environment properties.
 * @returns {Promise<[]>} - Promise that will be resolved with list of production plugins.
 */
const plugins = async (env = {}) => {

  // Initial Plugins
  const pluginsList = [];

  // Generate CSS files
  pluginsList.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].min.css',
    chunkFilename: 'css/[id].[contenthash].min.css',
    ignoreOrder: true
  }));

  // More aggressive chunk merging strategy
  pluginsList.push(new AggressiveMergingPlugin());

  // Prepare index HTML
  pluginsList.push(
    new HtmlWebpackPlugin({
      template: join(PATHS.TEMPLATES, './index.pug'),
      filename: 'index.html',
      inject: 'body'
    })
  );

  // Check for index HTML markup
  pluginsList.push(
    new CheckHTMLMarkupPlugin(env)
  );

  // Return plugins list
  return pluginsList;
};

// Export
module.exports = plugins;
