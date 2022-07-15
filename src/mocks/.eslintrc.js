/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

module.exports = {
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': ['error', {
      allow: [
        'info',
        'error'
      ]
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: true
    }]
  }
};
