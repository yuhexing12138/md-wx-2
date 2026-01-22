import React, { useState, useRef } from 'react';
import MarkdownRenderer from '@/components/Renderer/MarkdownRenderer';
import PreviewContainer from '@/components/Preview/PreviewContainer';
import Toolbar from '@/components/Toolbar/Toolbar';
import Toast from '@/components/Toast/Toast';
import { useTheme } from '@/hooks/useTheme';
import { processHtmlStyles } from '@/utils/style-processor';

const exampleMarkdown = `
# 微信公众号排版组件

你好！这是一个专为 **微信公众号** 设计的 Markdown 渲染组件预览。

> 所有的伟大，都源于一个勇敢的开始。
> All greatness comes from a brave beginning.

## 1. 代码高亮测试

这是一段 JavaScript 代码：

\`\`\`javascript
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

// 调用函数
greet('WeChat');
\`\`\`

这是一段 CSS 代码：

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
\`\`\`

## 2. 样式展示

### 2.1 有序列表
1. 第一步：撰写 Markdown
2. 第二步：选择心仪的主题
3. 第三步：点击复制按钮

### 2.2 链接风格
访问 [GitHub 仓库](https://github.com) 了解更多详情。

### 2.3 表格支持

| 功能 | 状态 | 优先级 |
| :--- | :---: | :---: |
| 基础渲染 | ✅ | 高 |
| 主题切换 | ✅ | 高 |
| 代码高亮 | 🚧 | 中 |

---

*Made with ❤️ by Trae AI*
`;

function App() {
  const { currentTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(true);
  const [toast, setToast] = useState(null);
  const previewRef = useRef(null);

  const handleCopy = async () => {
    if (!previewRef.current) return;

    try {
      // 1. 获取 Markdown 渲染后的 HTML 元素
      // 查找 .markdown-body 元素，它是 MarkdownRenderer 的根节点
      const markdownBody = previewRef.current.querySelector('.markdown-body');
      
      if (!markdownBody) {
        throw new Error('未找到渲染内容');
      }

      // 2. 获取原始 HTML
      const rawHtml = markdownBody.innerHTML;

      // 3. 处理内联样式
      const processedHtml = processHtmlStyles(rawHtml, currentTheme);

      // 4. 构建 ClipboardItem
      // 微信公众号支持 text/html 格式的剪贴板数据
      const blob = new Blob([processedHtml], { type: 'text/html' });
      const textBlob = new Blob([markdownBody.innerText], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': textBlob,
      });

      // 5. 写入剪贴板
      await navigator.clipboard.write([item]);

      setToast({ type: 'success', message: '已复制到剪贴板，可直接粘贴到微信后台' });
    } catch (error) {
      console.error('Copy failed:', error);
      setToast({ type: 'error', message: '复制失败，请重试' });
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8 bg-gray-50">
      {/* Toast */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Toolbar */}
      <Toolbar 
        isMobile={isMobile}
        onToggleMobile={() => setIsMobile(!isMobile)}
        onCopy={handleCopy}
      />

      {/* Preview Area */}
      <main className="mt-24 w-full flex justify-center px-4 pb-20">
        <PreviewContainer isMobile={isMobile} currentTheme={currentTheme}>
          {/* 将 ref 绑定到包含 MarkdownRenderer 的父级 div */}
          <div ref={previewRef}>
            <MarkdownRenderer content={exampleMarkdown} />
          </div>
        </PreviewContainer>
      </main>

      <footer className="fixed bottom-4 text-gray-400 text-xs">
        <p>Markdown-to-WeChat-Renderer &copy; 2026</p>
      </footer>
    </div>
  );
}

export default App;
