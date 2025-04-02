import rules from '@shelf/eslint-config/frontend-typescript.js';

export default [
  ...rules,
  {
    ignores: [
      '**/.circleci',
      '**/lib/',
      '**/node_modules/',
      '**/coverage/',
      '**/jest.config.js',
      '**/tsconfig.json',
    ],
  },
  {files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']},
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'no-console': 'off',
      camelcase: 'off',
    },
  },
];
