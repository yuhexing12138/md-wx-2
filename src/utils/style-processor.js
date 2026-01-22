import juice from 'juice';

/**
 * 静态 CSS 变量映射表
 * 由于微信不支持 CSS 变量，我们需要在复制前手动解析这些变量。
 * 这里的配置应与 src/styles/themes.css 保持一致。
 */
const THEME_STYLES = {
  'theme-minimalist': {
    '--bg-color': '#ffffff',
    '--text-color': '#37352f',
    '--heading-color': '#111111',
    '--accent-color': '#333333',
    '--link-color': '#37352f',
    '--quote-bg': 'transparent',
    '--quote-border': '#333333',
    '--font-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    '--font-heading': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    '--list-bullet-color': '#333333',
  },
  'theme-tech': {
    '--bg-color': '#f8fafc',
    '--text-color': '#334155',
    '--heading-color': '#1e3a8a',
    '--accent-color': '#3b82f6',
    '--link-color': '#2563eb',
    '--quote-bg': '#eff6ff',
    '--quote-border': '#3b82f6',
    '--font-body': "'Inter', system-ui, sans-serif",
    '--font-heading': "'Inter', system-ui, sans-serif",
    '--list-bullet-color': '#3b82f6',
  },
  'theme-serif': {
    '--bg-color': '#fdfbf7',
    '--text-color': '#433422',
    '--heading-color': '#2c2216',
    '--accent-color': '#8c4b26',
    '--link-color': '#8c4b26',
    '--quote-bg': '#f4f1ea',
    '--quote-border': '#8c4b26',
    '--font-body': '"Songti SC", "Noto Serif SC", serif',
    '--font-heading': '"Songti SC", "Noto Serif SC", serif',
    '--list-bullet-color': '#8c4b26',
  },
  'theme-forest': {
    '--bg-color': '#f2fcf5',
    '--text-color': '#2e4a3d',
    '--heading-color': '#134e38',
    '--accent-color': '#2d8a5e',
    '--link-color': '#2d8a5e',
    '--quote-bg': '#e1f5ea',
    '--quote-border': '#2d8a5e',
    '--font-body': "'Inter', sans-serif",
    '--font-heading': "'Inter', sans-serif",
    '--list-bullet-color': '#2d8a5e',
  },
  'theme-red': {
    '--bg-color': '#ffffff',
    '--text-color': '#2d1b21',
    '--heading-color': '#be123c',
    '--accent-color': '#e11d48',
    '--link-color': '#e11d48',
    '--quote-bg': '#fff1f2',
    '--quote-border': '#e11d48',
    '--font-body': "'Inter', sans-serif",
    '--font-heading': "'Inter', sans-serif",
    '--list-bullet-color': '#e11d48',
  }
};

/**
 * 基础 CSS 样式
 * 包含 markdown.css 中的所有通用样式，因为 juice 需要内联这些样式。
 * 注意：这里需要手动维护一份与 src/styles/markdown.css 等效的 CSS 字符串。
 */
const BASE_CSS = `
  .markdown-body {
    font-size: 16px;
    line-height: 1.75;
    text-align: justify;
    word-break: break-word;
    font-family: var(--font-body);
    color: var(--text-color);
  }

  .markdown-body h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-family: var(--font-heading);
    color: var(--heading-color);
  }

  .markdown-body h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    padding-left: 0.75rem;
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-heading);
    color: var(--heading-color);
  }

  .markdown-body h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-heading);
    color: var(--heading-color);
  }

  .markdown-body p {
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  .markdown-body a {
    text-decoration: none;
    border-bottom: 1px dashed var(--link-color);
    color: var(--link-color);
  }

  .markdown-body blockquote {
    padding: 1rem;
    margin: 1.5rem 0;
    border-radius: 0 0.25rem 0.25rem 0;
    background-color: var(--quote-bg);
    border-left: 4px solid var(--quote-border);
    color: var(--text-color);
  }

  .markdown-body ul, 
  .markdown-body ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .markdown-body ul {
    list-style-type: disc;
  }
  
  .markdown-body ol {
    list-style-type: decimal;
  }

  .markdown-body li {
    margin-bottom: 0.25rem;
    color: var(--list-bullet-color) !important;
  }

  .markdown-body li span {
    color: var(--text-color) !important;
  }

  /* 内联代码 */
  .markdown-body code:not([class*="language-"]) {
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    background-color: rgba(0, 0, 0, 0.06);
    color: #d63384;
    margin: 0 0.125rem;
  }

  /* 图片 */
  .markdown-body img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin: 1rem auto;
    display: block;
  }
  
  /* 表格 */
  .markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.875rem;
  }
  
  .markdown-body th,
  .markdown-body td {
    border: 1px solid #e5e7eb;
    padding: 0.5rem 1rem;
  }
  
  .markdown-body th {
    background-color: #f9fafb;
    font-weight: 600;
    text-align: left;
  }

  /* 分割线 */
  .markdown-body hr {
    margin: 2rem 0;
    border: 0;
    height: 1px;
    background-color: #e5e7eb;
  }

  /* Highlight.js GitHub Dark Theme */
  .hljs {
    color: #c9d1d9;
    background: #0d1117;
  }
  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type,
  .hljs-variable.language_ {
    color: #ff7b72;
  }
  .hljs-title,
  .hljs-title.class_,
  .hljs-title.class_.inherited__,
  .hljs-title.function_ {
    color: #d2a8ff;
  }
  .hljs-attr,
  .hljs-attribute,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-operator,
  .hljs-variable,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id {
    color: #79c0ff;
  }
  .hljs-regexp,
  .hljs-string,
  .hljs-meta .hljs-string {
    color: #a5d6ff;
  }
  .hljs-built_in,
  .hljs-symbol {
    color: #ffa657;
  }
  .hljs-comment,
  .hljs-code,
  .hljs-formula {
    color: #8b949e;
  }
  .hljs-name,
  .hljs-quote,
  .hljs-selector-tag,
  .hljs-selector-pseudo {
    color: #7ee787;
  }
  .hljs-subst {
    color: #c9d1d9;
  }
  .hljs-section {
    color: #1f6feb;
    font-weight: bold;
  }
  .hljs-bullet {
    color: #f2cc60;
  }
  .hljs-emphasis {
    color: #c9d1d9;
    font-style: italic;
  }
  .hljs-strong {
    color: #c9d1d9;
    font-weight: bold;
  }
  .hljs-addition {
    color: #aff5b4;
    background-color: #033a16;
  }
  .hljs-deletion {
    color: #ffdcd7;
    background-color: #67060c;
  }
`;

/**
 * 将 CSS 变量替换为具体色值
 */
const replaceCssVariables = (css, themeId) => {
  let processedCss = css;
  const variables = THEME_STYLES[themeId];
  
  if (!variables) return css;

  Object.entries(variables).forEach(([key, value]) => {
    // 使用正则全局替换 var(--key)
    const regex = new RegExp(`var\\(${key}\\)`, 'g');
    processedCss = processedCss.replace(regex, value);
  });

  return processedCss;
};

/**
 * 处理 HTML 字符串，将其中的 CSS 样式内联
 * @param {string} html - 原始 HTML
 * @param {string} themeId - 当前主题 ID
 * @returns {string} - 处理后的 HTML
 */
export const processHtmlStyles = (html, themeId = 'theme-minimalist') => {
  // 1. 获取针对当前主题处理过变量的 CSS
  const themeCss = replaceCssVariables(BASE_CSS, themeId);

  // 2. 包裹一层 .markdown-body 以确保 juice 能正确匹配选择器
  const wrappedHtml = `<div class="markdown-body">${html}</div>`;

  // 3. 使用 juice 进行内联
  const inlinedHtml = juice.inlineContent(wrappedHtml, themeCss, {
    inlinePseudoElements: true,
    preserveFontFaces: true,
    applyAttributesTableElements: true,
  });

  // 4. 返回处理后的 HTML
  // 注意：我们保留了外层的 div，因为它可以作为样式的根容器
  return inlinedHtml;
};
