import js from '@eslint/js';
import tseslint from 'typescript-eslint';
// 1. Import de ta règle personnalisée (attention à bien mettre l'extension .js)
import noCommentsInFunctions from './no-comments-in-functions.js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // 2. Déclaration du plugin local qui va contenir ta règle
    plugins: {
      local: {
        rules: {
          'no-comments-in-functions': noCommentsInFunctions,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      
      // 3. Activation de ta règle personnalisée avec le préfixe du plugin ("local/")
      'local/no-comments-in-functions': 'warn',
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