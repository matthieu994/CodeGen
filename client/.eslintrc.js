module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["@typescript-eslint", "prettier", "react"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
  },
};
