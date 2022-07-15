/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
const { join } = require('path');

// Base constants
const { PATHS } = require('../../scripts/helpers/constants');

// Plugins
const { prepareCommonPlugins } = require('./plugins');

/**
 * Webpack common configuration.
 *
 * @param {object} env - Environment properties.
 * @returns {object} - Common configuration object.
 */
const commonConfig = async (env = {}) => ({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      assets: join(PATHS.SRC, './assets'),
      style: join(PATHS.SRC, './style')
    }
  },
  entry: {
    style: join(PATHS.STYLE, './main.scss'),
    main: PATHS.SRC,
    ...(env && (env.NODE_ENV === 'mocks' || env.MOCKS === 'true')
      ? { mocks: join(PATHS.SRC, './mocks') }
      : {})
  },
  output: {
    path: PATHS.DIST
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          cacheCompression: false,
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 16 * 1024 // 16kb
          }
        },
        generator: {
          filename: 'assets/svg/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
        options: {
          method: 'render'
        }
      }
    ]
  },
  plugins: await prepareCommonPlugins(env)
});

// Export
module.exports = {
  commonConfig
};
