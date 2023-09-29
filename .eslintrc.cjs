module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // Ensure that both .ts and .d.ts files are considered
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 0,
    'react/prop-types': 0,
    'no-console': ['warn', { allow: ['clear', 'info', 'error', 'dir', 'trace'] }],
    'react/jsx-uses-react': 'off', // Turn off the original rule
    'react/react-in-jsx-scope': 'off', // Enable this rule to enforce React in scope
  },
};
