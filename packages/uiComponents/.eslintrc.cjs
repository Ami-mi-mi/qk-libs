/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 14:29:06
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 14:31:37
 */
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        // 'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/src/*/*'],
          },
        ],
        'import/no-unresolved': [2, {
          "ignore": ["^@/"] // @ 是设置的路径别名
        }],
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off',

        'import/order': [
          'warn',
          {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',

        'react/react-in-jsx-scope': 'off',

        'jsx-a11y/anchor-is-valid': 'off',

        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        '@typescript-eslint/no-unused-vars': ['warn'],

        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],

        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },
  ],
};