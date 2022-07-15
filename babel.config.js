/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

// Dependencies
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getAliases } = require('./scripts/helpers/aliases');

// Constants
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PATHS } = require('./scripts/helpers/constants');

// Export Babel configuration
module.exports = api => {

  // Enable cache (same as api.cache.forever())
  api.cache(true);

  // Configuration object
  return {
    env: {
      production: {
        plugins: [
          ...(process.env.ENVIRONMENT && ['live', 'production', 'prod'].includes(process.env.ENVIRONMENT)
            ? ['babel-plugin-jsx-remove-data-test-id']
            : []
          ),
          ['transform-react-remove-prop-types', {
            mode: 'remove',
            removeImport: true
          }]
        ]
      }
    },
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          alias: getAliases(
            PATHS
          )
        }
      ]
    ]
  };
};
