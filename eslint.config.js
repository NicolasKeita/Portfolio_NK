import config from 'eslint-config-nicolaskeita';

export default [
  ...config,
  {
    ignores: [
      '.next/',
      'node_modules/',
      'out/',
      'public/',
    ],
  },
];
