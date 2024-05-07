module.exports = {
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-v-html': 'warn',
    'vue/multi-word-component-names': 'warn',
    eqeqeq: 'warn',
    'no-var': 'warn',
    'no-warning-comments': 'warn'
  }
};
