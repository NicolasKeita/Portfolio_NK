import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import noCommentsInFunctions from './no-comments-in-functions.js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      local: {
        rules: {
          'no-comments-in-functions': noCommentsInFunctions,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'local/no-comments-in-functions': 'warn',
      'max-len': ['warn', { code: 180 }],
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'out/',
      'public/',
    ],
  }
);