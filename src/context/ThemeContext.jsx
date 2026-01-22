import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_THEME } from '../constants/themes';

// 创建 ThemeContext
const ThemeContext = createContext({
  currentTheme: DEFAULT_THEME,
  setTheme: () => {},
});

/**
 * ThemeProvider Component
 * 
 * 全局主题状态管理组件。
 * 提供 currentTheme 和 setTheme 方法给子组件。
 */
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

  const setTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 导出自定义 Hook 以便组件消费
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
