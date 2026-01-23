import { useCallback } from 'react';
import { processHtmlStyles } from '@/utils/style-processor';

/**
 * useMdWx Hook
 * 
 * 提供将 Markdown 渲染结果复制到微信公众号格式的功能。
 * 
 * @param {Object} options 配置项
 * @param {React.RefObject} options.contentRef 指向包含 .markdown-body 的容器元素的 ref
 * @param {string} options.theme 当前主题名称
 * @returns {Object} 包含 copyToWeChat 方法
 */
export const useMdWx = ({ contentRef, theme }) => {
  const copyToWeChat = useCallback(async () => {
    if (!contentRef.current) {
      throw new Error('未找到内容容器');
    }

    // 1. 获取 Markdown 渲染后的 HTML 元素
    // 查找 .markdown-body 元素，它是 MarkdownRenderer 的根节点
    const markdownBody = contentRef.current.querySelector('.markdown-body');
    
    if (!markdownBody) {
      throw new Error('未找到渲染内容 (.markdown-body)');
    }

    // 2. 获取原始 HTML
    const rawHtml = markdownBody.innerHTML;

    // 3. 处理内联样式
    const processedHtml = processHtmlStyles(rawHtml, theme);

    // 4. 构建 ClipboardItem
    // 微信公众号支持 text/html 格式的剪贴板数据
    const blob = new Blob([processedHtml], { type: 'text/html' });
    const textBlob = new Blob([markdownBody.innerText], { type: 'text/plain' });
    
    // Safari/Webkit 需要在写入剪贴板时确保 Promise 能够 resolve
    const item = new ClipboardItem({
      'text/html': blob,
      'text/plain': textBlob,
    });

    // 5. 写入剪贴板
    await navigator.clipboard.write([item]);
    
    return true;
  }, [contentRef, theme]);

  return { copyToWeChat };
};
