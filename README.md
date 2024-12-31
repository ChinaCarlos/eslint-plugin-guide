# ESLint 插件教程

## 这是什么？

这是一个示例仓库，用于解释如何创建你自己的 ESLint 规则。

## 为什么我们要学习如何创建自定义 ESLint 规则？

Lint 规则有助于保持我们代码质量的一致性。自动代码检查为更多富有成效的活动节省了时间，同时也消除了代码审查中的个人主观影响。

创建 ESLint 规则是学习 AST（抽象语法树）分析的好题材。如今，AST 分析是 JavaScript 构建生态系统的基础。有许多库在使用 AST，比如 Babel 插件、自定义 TypeScript 转换器、prettier、webpack 等等。如果你能自如地控制 AST，你团队的 JavaScript 开发将会得到显著提升！

## 教程

[查看指南](./guide/README.md)。

## 开始使用

这个仓库也被设计为自定义 ESLint 规则的项目模板。

如果你想快速开始，请按照以下步骤操作：

- 克隆这个仓库
- 删除 `.git` 和 `guide` 目录
- 通过编辑 `package.json` 更改包名
- 修改和测试 `src/rules` 目录下的规则代码

这个仓库包含：

- TypeScript 配置
- Jest
- GitHub Actions 配置

## 许可证

MIT
