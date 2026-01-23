import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '@/hooks/useTheme';
import { THEMES } from '@/constants/themes';

/**
 * Toolbar Component
 * 
 * 顶部悬浮工具栏，提供主题切换、视图切换和复制功能。
 * 采用玻璃拟态设计 (Glassmorphism)。
 */
const Toolbar = ({ isMobile, onToggleMobile, onCopy }) => {
  const { currentTheme, setTheme } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef(null);

  const currentThemeObj = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="glass-toolbar fixed top-6 right-6 z-[100] px-2 py-2 rounded-full flex items-center gap-2 transition-all duration-300">
      
      {/* 1. 主题选择器 (Dropdown Style) */}
      <div className="relative" ref={themeDropdownRef}>
        <button 
          onClick={() => setIsThemeOpen(!isThemeOpen)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full hover:bg-black/5 transition-colors text-gray-700 text-sm font-medium"
        >
          <div 
            className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0"
            style={{ backgroundColor: currentThemeObj.primaryColor }}
          />
          <span className="hidden sm:inline">{currentThemeObj.name}</span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isThemeOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 py-1 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme.id);
                  setIsThemeOpen(false);
                }}
                className={classNames(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left',
                  currentTheme === theme.id ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                {theme.name}
                {currentTheme === theme.id && (
                  <svg className="w-4 h-4 text-blue-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* 2. 视图切换按钮 (Toggle) */}
      <button
        onClick={onToggleMobile}
        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-gray-600 group"
        title={isMobile ? "切换到桌面视图" : "切换到手机视图"}
      >
        {isMobile ? (
          // Mobile Icon
          <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ) : (
          // Desktop Icon
          <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      {/* 3. 复制按钮 (Action) */}
      <button
        onClick={onCopy}
        className="ml-2 flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95 font-medium text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        <span className="hidden sm:inline">复制</span>
      </button>

    </div>
  );
};

Toolbar.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onToggleMobile: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
};

export default Toolbar;
