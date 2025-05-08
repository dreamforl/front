import React, { createContext, useContext } from 'react';
import { startTransition } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface NavigationContextType {
  navigateTo: (to: string, options?: { replace?: boolean; state?: any }) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  navigateTo: () => {},
});

/**
 * 导航上下文提供者
 * 提供一个全局导航方法，使用 startTransition 包裹路由导航
 * 注意：这个组件必须在 RouterProvider 内部使用
 */
export const NavigationProvider: React.FC<{ 
  children: React.ReactNode,
  navigate: NavigateFunction
}> = ({ children, navigate }) => {
  
  const navigateTo = (to: string, options?: { replace?: boolean; state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };

  const contextValue: NavigationContextType = {
    navigateTo,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * 使用导航上下文的钩子
 * 返回一个可以安全导航的方法，避免 "A component suspended while responding to synchronous input" 错误
 */
export const useNavigation = () => useContext(NavigationContext);

export default NavigationProvider; 