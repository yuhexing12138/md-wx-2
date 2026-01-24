# md-wx-renderer

专为微信公众号设计的 React Markdown 渲染器。支持 GFM 语法、代码高亮、多主题切换以及一键复制到微信公众号后台（自动内联样式）。

![License](https://img.shields.io/npm/l/md-wx-renderer)
![Version](https://img.shields.io/npm/v/md-wx-renderer)

## ✨ 特性

- 📝 **标准 Markdown 支持**：基于 `react-markdown` 和 `remark-gfm`，支持表格、删除线等 GitHub Flavored Markdown 语法。
- 🎨 **多主题切换**：内置 5 套精美主题（极致简约、科技蓝调、优雅宋风等），支持实时切换。
- 📱 **响应式预览**：提供手机和 PC 两种预览模式，所见即所得。
- 📋 **一键复制**：利用 `juice` 将 CSS 样式内联，完美兼容微信公众号编辑器，支持代码块高亮。
- 🛠 **高度可定制**：提供核心 Hook `useMdWx` 和独立组件，方便自定义开发。

## 📦 安装

```bash
npm install md-wx-renderer
# 或者
yarn add md-wx-renderer
```

## 🚀 快速开始

### 1. 引入样式

在你的项目入口文件（如 `main.jsx` 或 `App.jsx`）中引入必要的 CSS 文件：

```javascript
import 'md-wx-renderer/style.css';
```

### 2. 使用组件

```jsx
import React from 'react';
import { MdWxRenderer } from 'md-wx-renderer';

const markdownContent = `
# Hello WeChat

这是一段 **Markdown** 文本。

- 支持列表
- 支持代码块
`;

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <MdWxRenderer content={markdownContent} />
    </div>
  );
}

export default App;
```

## 📖 API 文档

关于组件的详细属性 (Props)、内置主题列表以及 `useMdWx` Hook 的高级用法，请参阅：

👉 **[API 文档 (docs/api.md)](docs/api.md)**

## 🛠 开发与贡献

如果你想参与本项目的开发，或者需要在本地调试修改后的代码，请参阅开发指南。我们提供了详细的 `npm link` 本地调试流程说明。

👉 **[开发指南 (docs/development.md)](docs/development.md)**

## 📄 License

MIT © 2026
