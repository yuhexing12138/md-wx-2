/**
 * Theme Definitions
 * 
 * 定义所有可用的主题配置。
 * 每个主题包含 ID、显示名称以及用于 UI 展示的颜色值。
 */
export const THEMES = [
  { 
    id: 'theme-minimalist', 
    name: '极致简约',
    previewColor: '#f3f4f6', // Gray 100
    primaryColor: '#37352f'
  },
  { 
    id: 'theme-tech', 
    name: '科技蓝调',
    previewColor: '#dbeafe', // Blue 100
    primaryColor: '#3b82f6'
  },
  { 
    id: 'theme-serif', 
    name: '优雅宋风',
    previewColor: '#ffedd5', // Orange 100
    primaryColor: '#8c4b26'
  },
  { 
    id: 'theme-forest', 
    name: '森系墨绿',
    previewColor: '#dcfce7', // Green 100
    primaryColor: '#2d8a5e'
  },
  { 
    id: 'theme-red', 
    name: '活力热红',
    previewColor: '#ffe4e6', // Rose 100
    primaryColor: '#e11d48'
  },
];

export const DEFAULT_THEME = THEMES[0].id;
