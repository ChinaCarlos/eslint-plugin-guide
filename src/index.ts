import noLiteral from "./rules/no-literal";
import noFunctionApply from "./rules/no-function-apply";
import noJsxButton from "./rules/no-jsx-button";

export = {
  rules: {
    "no-literal": noLiteral,
    "no-function-apply": noFunctionApply,
    "no-jsx-button": noJsxButton,
  },
};
