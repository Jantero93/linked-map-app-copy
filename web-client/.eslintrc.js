module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    eqeqeq: 'error',
    'vue/no-v-html': 'warn',
    'no-var': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'error'
  }
};
