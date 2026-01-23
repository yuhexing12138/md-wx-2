import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from './Renderer/MarkdownRenderer';
import PreviewContainer from './Preview/PreviewContainer';
import Toolbar from './Toolbar/Toolbar';
import Toast from './Toast/Toast';
import { useMdWx } from '@/hooks/useMdWx';
import { DEFAULT_THEME } from '@/constants/themes';

/**
 * MdWxRenderer Component
 * 
 * 一个集成了 Markdown 渲染、微信风格预览、工具栏和复制功能的完整组件。
 * 
 * Props:
 * - content: Markdown 内容
 * - theme: (可选) 当前主题，受控模式
 * - onThemeChange: (可选) 主题切换回调
 * - enableToolbar: 是否显示工具栏，默认 true
 * - enablePreviewWrapper: 是否显示手机预览框，默认 true
 * - onCopy: 复制成功后的回调
 * - className: 自定义类名
 * - style: 自定义样式
 */
const MdWxRenderer = ({
  content,
  theme: controlledTheme,
  onThemeChange,
  enableToolbar = true,
  enablePreviewWrapper = true,
  onCopy,
  className = '',
  style = {}
}) => {
  // 内部状态管理（非受控模式使用）
  const [internalTheme, setInternalTheme] = useState(DEFAULT_THEME);
  const [isMobile, setIsMobile] = useState(true);
  const [toast, setToast] = useState(null);
  const contentRef = useRef(null);

  // 确定当前使用的主题
  const currentTheme = controlledTheme !== undefined ? controlledTheme : internalTheme;

  // 主题切换处理
  const handleThemeChange = (newTheme) => {
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    // 如果没有传入 theme prop，则更新内部状态
    if (controlledTheme === undefined) {
      setInternalTheme(newTheme);
    }
  };

  // 复制功能
  const { copyToWeChat } = useMdWx({ contentRef, theme: currentTheme });

  const handleCopyClick = async () => {
    try {
      await copyToWeChat();
      setToast({ message: '已复制到剪贴板', type: 'success' });
      if (onCopy) onCopy();
    } catch (error) {
      console.error('Copy failed:', error);
      setToast({ message: '复制失败: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className={`md-wx-renderer relative flex flex-col h-full ${className}`} style={style}>
      {enableToolbar && (
        <Toolbar
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onCopy={handleCopyClick}
          isMobile={isMobile}
          onToggleMobile={() => setIsMobile(!isMobile)}
        />
      )}
      
      <div className="flex-1 overflow-hidden relative bg-gray-50 flex items-center justify-center p-4">
        {enablePreviewWrapper ? (
          <PreviewContainer 
            isMobile={isMobile} 
            currentTheme={currentTheme}
            ref={contentRef}
          >
            <MarkdownRenderer content={content} />
          </PreviewContainer>
        ) : (
          <div 
            ref={contentRef} 
            className={`markdown-wrapper w-full h-full overflow-y-auto ${currentTheme}`}
            style={{ 
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-color)'
            }}
          >
             <MarkdownRenderer content={content} />
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

MdWxRenderer.propTypes = {
  content: PropTypes.string.isRequired,
  theme: PropTypes.string,
  onThemeChange: PropTypes.func,
  enableToolbar: PropTypes.bool,
  enablePreviewWrapper: PropTypes.bool,
  onCopy: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default MdWxRenderer;
