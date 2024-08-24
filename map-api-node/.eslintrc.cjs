module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },

  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "node/no-missing-import": "off",
        "import/no-unresolved": "off",
      },
    },
  ],
  rules: {
    eqeqeq: "warn",
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "no-var": "error",
    "no-warning-comments": "warn",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        ignores: ["modules"],
      },
    ],
  },
};
