import globals, { node } from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks"; // React Hooks 규칙을 위한 
import pluginImport from "eslint-plugin-import"; // import/export 구문을 관리


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  pluginReactHooks.configs.recommended,
  {
    root: true
  },
  {
    extends: [
      "eslint:recommended", // ESLint 권장 규칙
      "plugin:react-hooks/recommended", // React Hooks 권장 규칙
      "plugin:prettier/recommended", // Prettier 통합
      "airbnb-base",
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // JSX 사용
      },
      ecmaVersion: 2020, // ECMAScript 버전
      sourceType: "module", // ES 모듈 사용
    },
    env: { 
      browser: true, 
      es6: true,
      node: true,
    },
  },
  { 
    plugins: ["import", "react", "react-hooks", "prettier"], // import 관련 규칙 플러그인 추가
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "react/jsx-uses-react": "off", 
      "react/react-in-jsx-scope": "off",
    },
  },
];