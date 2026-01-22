import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import CodeBlock from '../CodeBlock/CodeBlock';

/**
 * MarkdownRenderer Component
 * 
 * 核心渲染组件，负责将 Markdown 文本转换为 HTML。
 * 集成了 GFM (GitHub Flavored Markdown) 支持。
 * 样式通过全局 CSS (.markdown-body) 和 CSS 变量控制。
 */
const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义列表项渲染：为了兼容微信公众号的序号颜色
          // 移除 style 属性，改用 CSS 类控制，以便 juice 正确内联
          li: ({ children, ...props }) => (
            <li {...props}>
              <span>{children}</span>
            </li>
          ),
          // 自定义代码块渲染
          code: ({ node, inline, className, children, ...props }) => {
            if (!inline && className) {
              return (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              );
            }
            return <code className={className} {...props}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
