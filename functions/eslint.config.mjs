import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.ts"],
  },
  {
    ignores: ["lib/**/*", "*.ts", "eslint.config.mjs"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      indent: ["error", 2],

      // Firebase Functions + Express/Hono deal in untyped request bodies and a
      // CommonJS require() loader, so `any` and the no-unsafe-* family fire on the
      // IO boundary with little value. Relaxed here; the app side stays strict.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^__",
          varsIgnorePattern: "^__",
          caughtErrorsIgnorePattern: "^__",
        },
      ],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-void": ["error", { allowAsStatement: true }],

      // Compact & DRY: hard ceilings on size, nesting, complexity, and arity
      "max-lines": ["error", { max: 200, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["error", { max: 20, skipBlankLines: true, skipComments: true }],
      "max-statements": ["error", 10],
      complexity: ["error", 10],
      "max-depth": ["error", 3],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 3],

      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
  eslintConfigPrettier,
];
