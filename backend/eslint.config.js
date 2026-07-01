import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['node_modules/', 'dist/', 'generated/', 'prisma.config.ts'],
  },

  // Base JS rules
  js.configs.recommended,

  // Strict type-checked TS rules + stylistic (scoped to TS files)
  {
    files: ['src/**/*.ts'],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // --- Variables ---
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // --- Type safety ---
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],

      // --- Promises ---
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // --- Template Strings ---
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],

      // --- Imports ---
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // --- Style ---
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // --- Console ---
      'no-console': 'error',
    },
  },

  // Prettier must come after all ESLint configs to disable conflicting rules
  prettier,
);
