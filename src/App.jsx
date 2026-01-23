import React, { useState } from 'react';
import MdWxRenderer from './components/MdWxRenderer';
import { THEMES } from './constants/themes';

const DEFAULT_MARKDOWN = `# Hello WeChat

这是一段 **Markdown** 文本，专为微信公众号设计。

## ✨ 特性

- 📝 **标准 Markdown 支持**
- 🎨 **多主题切换**
- 📱 **响应式预览**
- 📋 **一键复制**

## 代码示例

\`\`\`javascript
function greet() {
  console.log("Hello, WeChat!");
}
\`\`\`

> 试试在左侧修改内容，右侧实时预览！
`;

function App() {
  const [content, setContent] = useState(DEFAULT_MARKDOWN);
  const [theme, setTheme] = useState('theme-minimalist');
  const [enableToolbar, setEnableToolbar] = useState(true);
  const [enablePreviewWrapper, setEnablePreviewWrapper] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Settings & Editor Panel */}
      <div className="w-full md:w-1/2 bg-white border-r border-gray-200 flex flex-col shadow-lg z-10">
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📝</span> md-wx Playground
          </h1>
          <p className="text-sm text-gray-500 mt-1">本地组件预览与调试</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Settings Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">设置面板</h2>
            
            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">选择主题</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                {THEMES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">启用工具栏 (Toolbar)</span>
                <input 
                  type="checkbox" 
                  checked={enableToolbar}
                  onChange={(e) => setEnableToolbar(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">启用设备外壳 (Preview Wrapper)</span>
                <input 
                  type="checkbox" 
                  checked={enablePreviewWrapper}
                  onChange={(e) => setEnablePreviewWrapper(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
              </label>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Editor Section */}
          <div className="space-y-2 flex-1 flex flex-col">
             <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Markdown 内容</h2>
             <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="w-full h-64 md:h-96 p-3 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-gray-50"
               placeholder="输入 Markdown..."
             />
          </div>

        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 text-center">
          md-wx-renderer &copy; 2026
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden">
        <MdWxRenderer 
          content={content} 
          theme={theme}
          onThemeChange={setTheme}
          enableToolbar={enableToolbar}
          enablePreviewWrapper={enablePreviewWrapper}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default App;
