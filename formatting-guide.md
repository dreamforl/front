# 代码格式化指南

## 安装的 VS Code 扩展

为了获得最佳体验，请安装以下 VS Code 扩展：

1. **ESLint**: 用于代码质量检查和自动修复

   - ID: `dbaeumer.vscode-eslint`
   - 链接: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

2. **Prettier - Code formatter**: 用于代码格式化
   - ID: `esbenp.prettier-vscode`
   - 链接: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## 自动格式化设置

本项目已配置以下自动化功能：

1. **保存时自动格式化**: 当你保存文件时，Prettier 会自动格式化代码
2. **保存时自动修复 ESLint 问题**: 当你保存文件时，ESLint 会自动修复可修复的问题

## 可用命令

在项目根目录下，你可以运行以下命令：

```bash
# 检查代码质量问题
pnpm lint

# 检查并自动修复ESLint可修复的问题
pnpm lint:fix

# 使用Prettier格式化所有文件
pnpm format
# 或者
pnpm fmt

# 检查文件是否符合Prettier格式要求，但不修改文件
pnpm format:check
```

## 配置文件

- `.prettierrc.cjs`: Prettier 配置文件
- `.prettierignore`: 指定 Prettier 忽略的文件
- `eslint.config.js`: ESLint 配置文件
- `.vscode/settings.json`: VS Code 工作区设置

## 解决 ESLint 和 Prettier 冲突

本项目使用以下方案解决 ESLint 和 Prettier 之间的规则冲突：

1. `eslint-config-prettier`: 禁用可能与 Prettier 冲突的 ESLint 规则
2. `eslint-plugin-prettier`: 将 Prettier 作为 ESLint 规则运行

如果你遇到任何格式化问题，请先检查是否已正确安装所有依赖：

```bash
pnpm install
```
