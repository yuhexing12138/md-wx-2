import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * PreviewContainer Component
 * 
 * 预览容器组件，支持手机和桌面两种视图模式。
 * 包含设备外壳模拟（手机刘海、边框等）。
 */
const PreviewContainer = ({ children, isMobile, currentTheme }) => {
  const containerClasses = classNames(
    'relative transition-all duration-500 bg-white overflow-hidden',
    // Theme class
    currentTheme,
    // Mobile View Styles
    isMobile && [
      'w-[375px] min-h-[812px]',
      'rounded-[40px]',
      'border-[12px] border-[#1a1a1a]',
      'shadow-2xl',
      'mx-auto'
    ],
    // Desktop View Styles
    !isMobile && [
      'w-full max-w-[800px] min-h-[800px]',
      'rounded-lg',
      'border border-black/5',
      'shadow-xl',
      'mx-auto'
    ]
  );

  return (
    <div className={containerClasses}>
      {/* Notch (Only visible in mobile view) */}
      <div 
        className={classNames(
          'absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[25px] bg-[#1a1a1a] rounded-b-2xl z-20 pointer-events-none transition-opacity duration-300',
          isMobile ? 'opacity-100' : 'opacity-0'
        )}
      ></div>

      {/* Content Area */}
      <div 
        className={classNames(
          'h-full w-full overflow-y-auto no-scrollbar',
          'transition-all duration-300',
          isMobile ? 'p-5 pt-12 pb-10' : 'p-10'
        )}
        style={{ 
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

PreviewContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool,
  currentTheme: PropTypes.string,
};

PreviewContainer.defaultProps = {
  isMobile: true,
  currentTheme: 'theme-minimalist',
};

export default PreviewContainer;
