/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

module.exports = {
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-bitwise': 'off',
    'no-console': ['error', {
      allow: [
        'info',
        'error'
      ]
    }]
  }
};
