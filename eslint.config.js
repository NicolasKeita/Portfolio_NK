import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // === Rule de test ===
      'no-console': 'warn',
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