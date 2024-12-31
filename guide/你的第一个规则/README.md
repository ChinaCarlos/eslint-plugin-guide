# 你的第一个规则

在本章中，让我们学习如何创建 ESLint 插件。

## 创建规则模块

首先，创建一个新文件 `src/rules/no-literal.ts` 并编辑如下：

```ts
import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  create: context => {
    return {
      Literal: node => {
        context.report({
          message: "😿",
          node,
        });
      },
    };
  },
};

export = rule;
```

恭喜！这是你的第一个 ESLint 规则！

这是一个非常简单的规则，当它找到一些字面量（例如 `1`、`'hoge'` 等）时会显示一个哭泣的猫表情。
虽然很简单，但它告诉了我们很多东西：

- ESLint 规则应该实现 `RuleModule` 接口
  - 它应该有一个带有 `context` 参数的 `create` 函数
- `create` 方法应该返回一个对象
  - 这个对象的键代表我们感兴趣的 AST 节点类型（我们稍后会学习 AST 节点类型和这些键之间的关系 :smile:）
  - 它的值是一个函数，错误消息会在这个函数中抛出

## 测试规则

接下来，让我们测试这个规则是否有效。

创建另一个文件 `src/rules/no-literal.test.ts` 并编辑：

```ts
import { RuleTester } from "eslint";

import rule from "./no-literal";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run("no-literal", rule, {
  valid: [{ code: `let x` }],
  invalid: [
    {
      code: `const x = 1;`,
      errors: [{ message: "😿" }],
    },
  ],
});
```

然后通过以下命令运行测试：

```sh
$ npm test
```

你能看到以下控制台输出吗？

```text
PASS src/rules/no-literal.test.ts
  no-literal
    valid
      ✓ let x (29ms)
    invalid
      ✓ const x = 1; (5ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.506s, estimated 2s
```

这段代码测试了两个断言：

1. 如果给定有效的源代码，你的规则不会报错
2. 如果给定无效的源代码，你的规则会报告一个错误消息（:crying_cat_face:）

## 创建插件

现在，让我们准备将我们的规则发布为一个 ESLint 插件。

插件需要一个索引文件，用于告诉 ESLint 规则模块的名称。

创建 `src/index.ts` 并编辑如下：

```ts
import noLiteral from "./rules/no-literal";

export = {
  rules: {
    "no-literal": noLiteral,
  },
};
```

在执行 `npm publish` 之前，先确认我们的第一个插件在 NPM 项目中是否正常工作。

在 eslint-plugin-guide 目录下执行以下命令（如果你喜欢使用 `yarn`，也可以用 `yarn`）：

```sh
$ npm link
```

然后我们可以通过 npm 命令安装这个包。

接下来，创建一个示例项目来使用我们的插件：

```sh
$ cd ..
$ mkdir example-prj
$ cd example-prj
$ npm init -f
$ npm i eslint --dev
```

将我们的插件添加到示例项目中：

```sh
$ npm link @carlos/eslint-plugin-guide
```

最后，创建 .eslintrc 并配置使用我们的插件：

```json
{
  "plugins": ["@carlos/guide"],
  "parserOptions": {
    "ecmaVersion": 2015
  },
  "rules": {
    "@carlos/guide/no-literal": 2
  }
}
```

ESLint 插件包名必须带有 "eslint-plugin" 前缀。
现在，我们的插件包名为 "@carlos/eslint-plugin-guide"，所以 ESLint 使用这个命名约定将其识别为 "@carlos/guide"。

好了，让我们运行它！

```sh
$ echo "const x = 1;" | npx eslint --stdin
```

你能看到以下输出吗？

```text
<text>
  1:11  error  😿  @carlos/guide/no-literal

✖ 1 problem (1 error, 0 warnings)
```

## 总结

- 你需要实现 `Rule.RuleModule` 来创建 ESLint 规则
- ESLint 插件 NPM 包必须带有 "eslint-plugin" 前缀

[下一章](../深入AST/README.md)
