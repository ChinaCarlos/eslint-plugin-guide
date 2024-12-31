import { RuleTester } from "eslint";

import rule from "../../rules/no-jsx-button";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    jsx: true,
  },
});

tester.run("no-jsx-button", rule, {
  valid: [
    {
      filename: "valid.tsx",
      code: `(props: props) => <div />`,
    },
  ],
  invalid: [
    {
      filename: "invalid.tsx",
      code: `(props: props) => <button />`,
      errors: [{ message: "Don't use <button>" }],
    },
  ],
});
