import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Toast Component
 * 
 * 简单的消息提示组件，支持自动消失。
 * 显示位置：屏幕顶部居中。
 */
const Toast = ({ message, type = 'success', duration = 2000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 触发入场动画
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      // 等待离场动画结束后调用 onClose
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const classes = classNames(
    'fixed top-20 left-1/2 -translate-x-1/2 z-[200]',
    'px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2',
    'transition-all duration-300 ease-out',
    {
      'bg-green-50 text-green-700 border border-green-200': type === 'success',
      'bg-red-50 text-red-700 border border-red-200': type === 'error',
      'opacity-100 translate-y-0': isVisible,
      'opacity-0 -translate-y-4': !isVisible,
    }
  );

  return (
    <div className={classes}>
      {type === 'success' ? (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
