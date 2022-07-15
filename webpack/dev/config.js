/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');
const { merge } = require('webpack-merge');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

// Common configuration and constants
const { commonConfig, constants: { PORT: port } } = require('../common');

// Plugins
const { prepareDevPlugins } = require('./plugins');

/**
 * Webpack development configuration.
 *
 * @param {object} env - Environment properties.
 * @returns {object} - Development configuration object.
 */
const devConfig = async (env = {}) => {

  // eslint-disable-next-line no-console
  console.info('Bundling project source code', '\n');

  // Common configuration
  return merge(await commonConfig(env), {
    mode: 'development',
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].bundle.js',
      assetModuleFilename: 'assets/[name][ext]',
      publicPath: '/',
      clean: true
    },
    /* optimization: {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all'
        }
      },*/
    devServer: {
      devMiddleware: {
        stats: 'errors-only',
        publicPath: '/'
      },
      static: [
        join(PATHS.SRC, './assets')
      ],
      historyApiFallback: true,
      allowedHosts: 'all',
      host: '0.0.0.0', // localhost loop + local IP
      hot: true,
      port
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(sa|s[c])ss$/i,
          exclude: [
            /main\.(sa|s[c])ss$/i
          ],
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: {
                  localIdentName: '[name]-[local]-[hash:base64:10]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: join(PATHS.ROOT, './postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require('sass')
              }
            }
          ]
        },
        {
          test: /main\.(sa|s[c])ss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  config: join(PATHS.ROOT, './postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require('sass')
              }
            }
          ]
        }
      ]
    },
    plugins: await prepareDevPlugins()
  });
};

// Export
module.exports = devConfig;
