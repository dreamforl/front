import { useState, useEffect } from 'react';

/**
 * 自定义 Hook，用于响应式设计
 * @param query - CSS媒体查询字符串
 * @returns 布尔值，表示媒体查询是否匹配
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // 初始化匹配状态
    setMatches(mediaQuery.matches);
    
    // 监听窗口大小变化
    const handleResize = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // 添加监听器
    mediaQuery.addEventListener('change', handleResize);
    
    // 清理监听器
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;