import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import noCommentsInFunctions from './no-comments-in-functions.js';
import maxFilesPerDirectory from './max-files-per-directory.js';
import noEmptyDirectories from './no-empty-directories.js';
import noEmptyFile from './no-empty-file.js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      local: {
        rules: {
          'no-comments-in-functions': noCommentsInFunctions,
          'max-files-per-directory': maxFilesPerDirectory,
          'no-empty-directories': noEmptyDirectories,
          'no-empty-file': noEmptyFile,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'local/no-comments-in-functions': 'warn',
      'local/max-files-per-directory': ['warn', { max: 10 }],
      'local/no-empty-directories': 'warn',
      'local/no-empty-file': 'warn',
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