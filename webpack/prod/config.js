/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

// Common configuration
const { commonConfig } = require('../common');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

// Plugins
const plugins = require('./plugins');

/**
 * Webpack production configuration.
 *
 * @param {object} env - Environment properties.
 * @returns {object} - Production configuration object.
 */
const prodConfig = async (env = {}) => {

  // eslint-disable-next-line no-console
  console.info('Bundling project source code', '\n');

  // Common configuration
  return merge(await commonConfig(env), {
    mode: 'production',
    output: {
      filename: 'js/[name].[fullhash].bundle.min.js',
      chunkFilename: 'js/[name].[fullhash].bundle.min.js',
      publicPath: '/',
      clean: true
    },
    devtool: false,
    experiments: {
      cacheUnaffected: true
    },
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true,
      memoryCacheUnaffected: true,
      compression: false
    },
    optimization: {
      minimize: true,
      /* splitChunks: {
          chunks: 'all'
        },*/
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(sa|s[c])ss$/i,
          exclude: [
            /main\.(sa|s[c])ss$/i
          ],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
                modules: {
                  localIdentName: '[name]-[local]-[hash:base64:10]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: join(PATHS.ROOT, './postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }
          ]
        },
        {
          test: /main\.(sa|s[c])ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: join(PATHS.ROOT, './postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }
          ]
        }
      ]
    },
    performance: {
      hints: 'error',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: await plugins(env)
  });
};

// Export
module.exports = prodConfig;
