import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import noCommentsInFunctions from './no-comments-in-functions.js';
import maxFilesPerDirectory from './max-files-per-directory.js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      local: {
        rules: {
      'no-comments-in-functions': noCommentsInFunctions,
      'max-files-per-directory': maxFilesPerDirectory,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'local/no-comments-in-functions': 'warn',
      'local/max-files-per-directory': ['warn', { max: 10 }],
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