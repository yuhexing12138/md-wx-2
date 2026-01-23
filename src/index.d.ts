import React from 'react';

// ==========================================
// Constants & Types
// ==========================================

export interface Theme {
  id: string;
  name: string;
  previewColor: string;
  primaryColor: string;
}

export const THEMES: Theme[];
export const DEFAULT_THEME: string;

// ==========================================
// Components
// ==========================================

export interface MdWxRendererProps {
  /** Markdown 文本内容 */
  content: string;
  /** 当前主题 ID（受控模式），可选值参考 THEMES */
  theme?: string;
  /** 主题切换回调函数 */
  onThemeChange?: (theme: string) => void;
  /** 是否显示顶部悬浮工具栏，默认 true */
  enableToolbar?: boolean;
  /** 是否显示手机/PC 设备外壳预览，默认 true */
  enablePreviewWrapper?: boolean;
  /** 复制成功后的回调函数 */
  onCopy?: () => void;
  /** 自定义容器类名 */
  className?: string;
  /** 自定义容器样式 */
  style?: React.CSSProperties;
}

/**
 * MdWxRenderer Component
 * 
 * 一个集成了 Markdown 渲染、微信风格预览、工具栏和复制功能的完整组件。
 */
export const MdWxRenderer: React.FC<MdWxRendererProps>;

export interface MarkdownRendererProps {
  content: string;
}

/**
 * 核心渲染组件，负责将 Markdown 文本转换为 HTML。
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps>;

export interface ToolbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isMobile: boolean;
  onToggleMobile: () => void;
  onCopy?: () => void;
}

export const Toolbar: React.FC<ToolbarProps>;

export interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps>;

export interface PreviewContainerProps {
  children: React.ReactNode;
  isMobile?: boolean;
  currentTheme?: string;
}

/**
 * 预览容器组件，支持手机和桌面两种视图模式。
 */
export const PreviewContainer: React.ForwardRefExoticComponent<PreviewContainerProps & React.RefAttributes<HTMLDivElement>>;

// ==========================================
// Hooks
// ==========================================

export interface UseMdWxOptions {
  /** 指向包含 .markdown-body 的容器元素的 ref */
  contentRef: React.RefObject<HTMLElement>;
  /** 当前主题名称 */
  theme?: string;
}

export interface UseMdWxResult {
  /** 复制到微信公众号格式 */
  copyToWeChat: () => Promise<boolean>;
}

/**
 * 提供将 Markdown 渲染结果复制到微信公众号格式的功能。
 */
export function useMdWx(options: UseMdWxOptions): UseMdWxResult;

export interface ThemeContextValue {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

/**
 * 获取当前主题上下文
 */
export function useTheme(): ThemeContextValue;

// ==========================================
// Utils
// ==========================================

/**
 * 处理 HTML 样式，将 CSS 变量替换为内联样式。
 * @param html 原始 HTML 字符串
 * @param themeId 主题 ID
 * @returns 处理后的 HTML 字符串
 */
export function processHtmlStyles(html: string, themeId?: string): string;
