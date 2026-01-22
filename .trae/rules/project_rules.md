---
alwaysApply: true
---
# md-wx 项目开发规则

## 1. 技术栈
- **核心**: React 18+, Vite (Lib Mode)
- **样式**: Tailwind + CSS Vars (主题), `juice` (内联)
- **Markdown**: `react-markdown`, `remark-gfm`, `highlight.js` (github-dark)

## 2. 目录结构
```text
src/
├── components/ (Renderer, Preview, Toolbar, CodeBlock)
├── styles/ (themes.css, markdown.css, index.css)
├── hooks/ & utils/ & constants/
└── index.js
```

## 3. 代码规范
- **风格**: Prettier, ESLint.
- **命名**: 组件 PascalCase, JS/Hook camelCase, CSS kebab-case.
- **注释**: 关键逻辑必加中文注释。

## 4. 核心原则
- **微信兼容**: 复制时用 `utils/style-processor.js` 解析 CSS 变量，`juice` 内联样式。背景色必内联。
- **主题**: `themes.css` 定义 5 套主题变量，禁止硬编码。通过根类名切换。
- **代码块**: 强制深色背景 (`#1e1e1e`) + macOS 装饰。

## 5. 发布与文档
- **产物**: ESM + CJS.
- **文档**: 架构变更同步更新 `docs/`。

## 6. AI 执行规范
- **严格按拆分执行**: 仅执行 `task_breakdown.md` 中指定的单一任务，禁止自行扩展。
- **单步确认**: 完成当前任务并通过验收后，必须等待用户确认才能继续。
- **边界控制**: 确保代码变更严格限制在任务范围内。
- **异常处理**: 依赖缺失或描述不清时，主动询问。
