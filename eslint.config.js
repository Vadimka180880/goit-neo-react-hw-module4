import cssModulesPlugin from 'eslint-plugin-css-modules'; 
import jsonPlugin from 'eslint-plugin-json';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
      'css-modules': cssModulesPlugin,
      json: jsonPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'css-modules/no-unused-class': 'warn', 
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.css'],
    plugins: {
      'css-modules': cssModulesPlugin, 
    },
    rules: {
      ...cssModulesPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.json'],
    plugins: {
      json: jsonPlugin,
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,
    },
  },
];