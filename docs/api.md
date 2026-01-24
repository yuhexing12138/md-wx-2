# API 文档

本文档详细介绍了 `md-wx-renderer` 组件的 API 接口、属性说明及高级用法。

## `<MdWxRenderer />`

主渲染组件，集成了工具栏、预览框和渲染逻辑。它是使用本库最简单的方式。

### 组件属性 (Props)

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `content` | `string` | **Required** | 需要渲染的 Markdown 文本内容。 |
| `theme` | `string` | `'theme-minimalist'` | 当前主题 ID（受控模式）。如果不提供 `onThemeChange`，组件内部会维护状态。 |
| `onThemeChange` | `(theme: string) => void` | - | 主题切换时的回调函数。用于受控模式。 |
| `enableToolbar` | `boolean` | `true` | 是否显示顶部悬浮工具栏（包含主题切换、视图切换、复制按钮）。 |
| `enablePreviewWrapper` | `boolean` | `true` | 是否显示手机/PC 设备外壳预览容器。设为 `false` 时将只渲染内容区域。 |
| `onCopy` | `() => void` | - | 复制成功后的回调函数。 |
| `className` | `string` | - | 自定义最外层容器的类名。 |
| `style` | `object` | - | 自定义最外层容器的样式对象。 |

### 示例

```jsx
import { MdWxRenderer } from 'md-wx-renderer';

const MyComponent = () => (
  <MdWxRenderer 
    content="# Hello" 
    enableToolbar={false} 
    theme="theme-tech"
  />
);
```

## 内置主题列表

组件内置了 5 套精选主题，可以通过 `theme` 属性进行切换。

| 主题 ID | 名称 | 风格描述 |
| :--- | :--- | :--- |
| `theme-minimalist` | 极致简约 (默认) | Notion 风格，大量留白，克制。 |
| `theme-tech` | 科技蓝调 | 技术博客风格，冷静专业，蓝色主调。 |
| `theme-serif` | 优雅宋风 | 文学艺术风格，衬线字体，纸张质感。 |
| `theme-forest` | 森系墨绿 | 自然治愈风格，绿色主调。 |
| `theme-red` | 活力热红 | 潮流媒体风格，醒目大胆，红色主调。 |

## `useMdWx` Hook

如果你想构建完全自定义的 UI（例如不使用内置的设备外壳或工具栏），可以使用此 Hook 来复用核心的“微信兼容复制”功能。

### 参数

`useMdWx(options)`

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| `options.contentRef` | `React.RefObject` | 指向包含渲染内容的 DOM 节点的 Ref。该节点内部必须包含 `.markdown-body` 类名以便样式生效。 |
| `options.theme` | `string` | 当前选中的主题 ID，用于在复制时计算正确的内联样式。 |

### 返回值

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `copyToWeChat` | `() => Promise<void>` | 执行复制操作的函数。它会将 `contentRef` 中的 HTML 处理为内联样式并写入剪贴板。 |

### 高级用法示例

```javascript
import { useMdWx } from 'md-wx-renderer';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'md-wx-renderer/style.css'; // 别忘了引入样式

function CustomEditor() {
  const [markdown, setMarkdown] = useState('# 自定义编辑器');
  const contentRef = useRef(null);
  
  // 使用 Hook 获取复制功能
  const { copyToWeChat } = useMdWx({ 
    contentRef, 
    theme: 'theme-minimalist' 
  });

  return (
    <div className="my-custom-layout">
      <textarea 
        value={markdown} 
        onChange={e => setMarkdown(e.target.value)} 
      />
      
      <button onClick={copyToWeChat}>✨ 复制到公众号</button>

      {/* 预览区域 */}
      <div ref={contentRef}>
        {/* 注意：必须包含 markdown-body 类名 */}
        <div className="markdown-body theme-minimalist">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```
