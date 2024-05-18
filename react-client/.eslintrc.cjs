module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-redux",
            importNames: ["useDispatch", "useSelector"],
            message:
              "Use 'useAppDispatch/useAppSelector' from 'hooks' instead.",
          },
        ],
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    eqeqeq: "warn",
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "no-var": "warn",
    "no-warning-comments": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
