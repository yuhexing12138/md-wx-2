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

### `<MdWxRenderer />`

主渲染组件，集成了工具栏、预览框和渲染逻辑。

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `content` | `string` | **Required** | Markdown 文本内容 |
| `theme` | `string` | `'theme-minimalist'` | 当前主题 ID（受控模式），可选值参考下文 |
| `onThemeChange` | `(theme: string) => void` | - | 主题切换回调函数 |
| `enableToolbar` | `boolean` | `true` | 是否显示顶部悬浮工具栏 |
| `enablePreviewWrapper` | `boolean` | `true` | 是否显示手机/PC 设备外壳预览 |
| `onCopy` | `() => void` | - | 复制成功后的回调函数 |
| `className` | `string` | - | 自定义容器类名 |
| `style` | `object` | - | 自定义容器样式 |

### 内置主题列表

| 主题 ID | 名称 |
| :--- | :--- |
| `theme-minimalist` | 极致简约 (默认) |
| `theme-tech` | 科技蓝调 |
| `theme-serif` | 优雅宋风 |
| `theme-forest` | 森系墨绿 |
| `theme-red` | 活力热红 |

---

### `useMdWx` Hook

如果你想构建自定义的 UI，可以使用此 Hook 来实现核心的复制功能。

```javascript
import { useMdWx } from 'md-wx-renderer';
import { useRef } from 'react';

function CustomEditor({ content, theme }) {
  const contentRef = useRef(null);
  
  // 传入包含 .markdown-body 的容器 ref
  const { copyToWeChat } = useMdWx({ contentRef, theme });

  return (
    <div>
      <button onClick={copyToWeChat}>复制到公众号</button>
      <div ref={contentRef}>
        {/* 你的渲染逻辑，需包含 .markdown-body 类名以便样式生效 */}
        <div className="markdown-body">
           {/* ... */}
        </div>
      </div>
    </div>
  );
}
```

## 🛠 开发与贡献

1.  **克隆项目**
    ```bash
    git clone https://github.com/your-repo/md-wx-renderer.git
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```

4.  **构建库**
    ```bash
    npm run build
    ```

## 📄 License

MIT © 2026
