import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // 强制使用暗色主题

/**
 * CodeBlock Component
 * 
 * 自定义代码块组件，提供 macOS 窗口风格的头部装饰。
 * 使用 highlight.js 进行语法高亮。
 * 强制使用深色模式以适应微信环境。
 */
const CodeBlock = ({ children, className }) => {
  // 从 className 中提取语言 (e.g., "language-javascript")
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  
  // 提取代码内容
  const codeContent = String(children).replace(/\n$/, '');

  // 辅助函数：将文本中的空格替换为 &nbsp;，但在 HTML 标签内时不替换
  const replaceSpacesWithNbsp = (html) => {
    let inTag = false;
    let result = '';
    for (let i = 0; i < html.length; i++) {
      const char = html[i];
      if (char === '<') {
        inTag = true;
        result += char;
      } else if (char === '>') {
        inTag = false;
        result += char;
      } else {
        if (!inTag && char === ' ') {
          result += '&nbsp;';
        } else {
          result += char;
        }
      }
    }
    return result;
  };

  // 辅助函数：转义 HTML 特殊字符（用于非高亮模式）
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // 执行高亮或转义
  let processedHtml;
  if (match) {
    const highlighted = hljs.highlight(codeContent, { language }).value;
    processedHtml = replaceSpacesWithNbsp(highlighted);
  } else {
    // 非高亮模式：先转义，再替换空格
    processedHtml = replaceSpacesWithNbsp(escapeHtml(codeContent));
  }

  return (
    <div 
      className="my-6 rounded-lg overflow-hidden shadow-xl" 
      style={{ backgroundColor: '#1e1e1e', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', margin: '1.5rem 0' }}
    >
      {/* macOS 风格头部 */}
      <div 
        className="flex items-center px-4 py-2" 
        style={{ backgroundColor: '#2d2d2d', borderBottom: '1px solid rgba(0,0,0,0.3)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} /> {/* Close */}
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} /> {/* Minimize */}
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} /> {/* Maximize */}
        </div>
        <div style={{ marginLeft: '1rem', fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
          {language}
        </div>
      </div>

      {/* 代码内容区域 */}
      <div style={{ padding: '1rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: "'Fira Code', monospace", fontSize: '0.875rem', lineHeight: 1.6, color: '#c9d1d9', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          <code 
            className={match ? `hljs language-${language}` : ''}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            style={{ backgroundColor: 'transparent', padding: 0, fontFamily: 'inherit', color: '#c9d1d9' }}
          />
        </pre>
      </div>
    </div>
  );
};

CodeBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CodeBlock;
