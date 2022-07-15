/*
 * Date: 7/15/22, 8:33 AM
 * Copyright: Branislav Maksin (c) 2022
 */

module.exports = {
  root: true,

  env: {
    es6: true,
    browser: true,
    // node: true,
    'jest/globals': true
  },

  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    // project: './tsconfig.json',
    ecmaVersion: 11,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  plugins: [
    'jsdoc',
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'jest',
    'react-hooks'
  ],

  rules: {
    'no-console': 'error',
    'import/no-default-export': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'import/prefer-default-export': 'off',
    'react/no-direct-mutation-state': 'error',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ]
    }],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
      mjs: 'never'
    }],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-max-props-per-line': [1, {
      maximum: 1,
      when: 'always'
    }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    '@typescript-eslint/consistent-type-assertions': ['error', {
      assertionStyle: 'angle-bracket'
    }],
    'class-methods-use-this': 0,
    'jsx-a11y/label-has-for': 'off', // Deprecated in v6.1.0
    'jsx-a11y/label-has-associated-control': 'off', // Per HTML5 specs, it isn't required
    'padded-blocks': 'off',
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
      allow: ['_mfq', '__html']
    }],
    curly: ['error', 'all'],
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'one-var': ['error', {
      var: 'always',
      let: 'never',
      const: 'never'
    }],
    'no-return-assign': ['error', 'except-parens'],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true
    }],
    'no-confusing-arrow': ['error', {
      allowParens: true
    }],
    'no-trailing-spaces': ['error', {
      skipBlankLines: true,
      ignoreComments: true
    }],
    'arrow-parens': ['error', 'as-needed'],
    'lines-around-comment': 'off',
    'no-restricted-imports': ['error', {
      patterns: [
        '../**/auth/*',
        'services/auth/*',
        '../**/stream/*',
        'stream/*',
        '!stream/stream.service',
        '!stream/stream.container',
        '!stream/stream.component',
        '**/generated*',
        'generated*'
      ]
    }],
    'function-paren-newline': [
      'error',
      'multiline-arguments'
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false
      }
    ],
    'default-param-last': 'off',
    'react/function-component-definition': 'off',
    'no-param-reassign': ['error', {
      props: false
    }]
  },

  overrides: [
    {
      // Enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error'],
        'react/state-in-constructor': 'off',
        'tsdoc/syntax': 'error',
        'react/static-property-placement': ['error', 'static public field', {
          defaultProps: 'static public field'
        }]
      }
    },
    {
      // Enable the rule specifically for JS files
      files: ['*.js', '*.jsx', '*.mjs'],
      rules: {
        'tsdoc/syntax': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/state-in-constructor': ['error', 'always'],
        'jsdoc/check-alignment': 'error', // Recommended
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'error',
        'jsdoc/check-param-names': 'error', // Recommended
        'jsdoc/check-syntax': 'error',
        'jsdoc/check-tag-names': 'error', // Recommended
        'jsdoc/check-types': 'error', // Recommended
        'jsdoc/implements-on-classes': 'error', // Recommended
        'jsdoc/match-description': 'error',
        'jsdoc/newline-after-description': 'error', // Recommended
        // 'jsdoc/no-types': 'error',
        'jsdoc/no-undefined-types': ['error', {
          definedTypes: ['JSX']
        }], // Recommended
        'jsdoc/require-description': 'error',
        'jsdoc/require-description-complete-sentence': 'error',
        // 'jsdoc/require-example': 'error',
        'jsdoc/require-hyphen-before-param-description': 'error',
        'jsdoc/require-jsdoc': 'error', // Recommended
        'jsdoc/require-param': 'error', // Recommended
        'jsdoc/require-param-description': 'error', // Recommended
        'jsdoc/require-param-name': 'error', // Recommended
        'jsdoc/require-param-type': 'error', // Recommended
        'jsdoc/require-returns': 'error', // Recommended
        'jsdoc/require-returns-check': 'error', // Recommended
        'jsdoc/require-returns-description': 'error', // Recommended
        'jsdoc/require-returns-type': 'error', // Recommended
        'jsdoc/valid-types': 'error' // Recommended
      }
    },
    {
      files: [
        '*.test.js',
        '*.test.ts',
        '*.test.todo.js',
        '*.test.todo.ts'
      ],
      rules: {
        'react/jsx-filename-extension': 'off'
      }
    },
    {
      // Enable the rule specifically for testing files
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx'
      ],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // 'extends': ['plugin:jest/recommended']
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        semi: 'error'
      }
    },
    {
      // Enable default export for those files
      files: [
        '*.stories.js',
        '*.stories.jsx',
        '*.stories.ts',
        '*.stories.tsx',
        '*.d.ts',
        '*.mjs'
      ],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.ts',
        '**/*.spec.tsx'
      ],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true
      },
      plugins: [
        'chai-friendly',
        'cypress'
      ],
      rules: {
        'no-unused-expressions': 'off',
        'chai-friendly/no-unused-expressions': 'error'
      }
    },
    {
      files: ['**/stories/**/*'],
      rules: {
        'react/no-unstable-nested-components': 'off'
      }
    },
    {
      files: ['*.js', '*.ts', '*.mjs'],
      rules: {
        'react/jsx-indent': 'off'
      }
    }
  ],

  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      'babel-module': {},
      typescript: {
        project: './tsconfig.json'
      }
    },
    react: {
      version: 'detect'
    }
  }
};
