import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        RequestInit: "readonly",
        Response: "readonly",
        Request: "readonly",
        Headers: "readonly",
        FormData: "readonly",
        Blob: "readonly",
        File: "readonly",
        URLSearchParams: "readonly",
        BodyInit: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript 相关规则
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/no-unused-vars": [
        2,
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-expressions": [
        2,
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-use-before-define": 2,
      "@typescript-eslint/no-non-null-assertion": 2,
      "@typescript-eslint/no-shadow": 2,

      // React 相关规则
      "react/react-in-jsx-scope": 0,
      "react/prop-types": 0,
      "react/display-name": 0,
      "react-hooks/rules-of-hooks": 2,
      "react-hooks/exhaustive-deps": 0,
      "react/jsx-no-undef": 2,
      "react/jsx-uses-vars": 2,
      "react/no-array-index-key": 2,

      // 代码风格规则
      "no-console":
        process.env.NODE_ENV === "production"
          ? [2, { allow: ["warn", "error"] }]
          : 1,
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
      semi: [2, "always"],
      quotes: [2, "single"],
      indent: [2, 2, { SwitchCase: 1 }],
      "comma-dangle": [2, "always-multiline"],
      "object-curly-spacing": [2, "always"],
      "arrow-parens": [2, "as-needed"],
      "max-len": [
        1,
        {
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // 最佳实践规则
      "no-var": 2,
      "prefer-const": 2,
      "no-multiple-empty-lines": [2, { max: 1 }],
      eqeqeq: [2, "always"],
      "no-param-reassign": 0,
      "no-nested-ternary": 2,
      "no-unneeded-ternary": 2,
      "no-unused-expressions": 0,
      "no-undef": 2,
      "no-use-before-define": 0,
      "no-duplicate-imports": 2,
      "no-irregular-whitespace": 2,
      "no-trailing-spaces": 2,
      "no-multi-spaces": 2,
      "no-floating-decimal": 2,
      "no-empty-function": 2,
      "no-return-await": 2,
      "no-throw-literal": 2,

      // ES6+ 规则
      "arrow-body-style": [2, "as-needed"],
      "prefer-arrow-callback": 2,
      "prefer-template": 2,
      "no-useless-constructor": 2,

      // 其他规则
      "no-restricted-syntax": [
        2,
        {
          selector: "ForInStatement",
          message: "禁止使用 for-in 循环，请使用 for-of 或其他替代方案",
        },
      ],
    },
  }
);
