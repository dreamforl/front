import { NavigationContext, NavigationContextType } from '@/hooks/user-navigation';
import React, { startTransition } from 'react';
import { NavigateFunction } from 'react-router-dom';

/**
 * 导航上下文提供者
 * 提供一个全局导航方法，使用 startTransition 包裹路由导航
 * 注意：这个组件必须在 RouterProvider 内部使用
 */
export const NavigationProvider: React.FC<{
  children: React.ReactNode;
  navigate: NavigateFunction;
}> = ({ children, navigate }) => {
  const navigateTo = (to: string, options?: { replace?: boolean; state?: unknown }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };

  const contextValue: NavigationContextType = {
    navigateTo,
  };

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
};

export default NavigationProvider;
