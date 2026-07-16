import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

import noCommentsInFunctions from './linter_custom_rules/no-comments-in-functions.js';
import maxFilesPerDirectory from './linter_custom_rules/max-files-per-directory.js';
import noEmptyDirectories from './linter_custom_rules/no-empty-directories.js';
import noEmptyFile from './linter_custom_rules/no-empty-file.js';
import noFrenchComments from './linter_custom_rules/no-french-comments.js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      local: {
        rules: {
          'no-comments-in-functions': noCommentsInFunctions,
          'max-files-per-directory': maxFilesPerDirectory,
          'no-empty-directories': noEmptyDirectories,
          'no-empty-file': noEmptyFile,
          'no-french-comments': noFrenchComments,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'local/no-comments-in-functions': 'warn',
      'local/max-files-per-directory': ['warn', { max: 10 }],
      'local/no-empty-directories': 'warn',
      'local/no-empty-file': 'warn',
      'local/no-french-comments': 'warn',

      'max-len': ['warn', { code: 140 }],

      '@stylistic/indent': ['warn', 2],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/space-infix-ops': 'warn',
      'linebreak-style': ['warn', 'unix'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/comma-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/space-before-blocks': ['warn', 'always'],
      '@stylistic/no-trailing-spaces': 'warn',
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'out/',
      'public/',
    ],
  },
);
