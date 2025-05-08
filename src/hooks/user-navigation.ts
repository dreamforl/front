import { createContext, useContext } from 'react';

export interface NavigationContextType {
  navigateTo: (to: string, options?: { replace?: boolean; state?: unknown }) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  navigateTo: () => {},
});

/**
 * 使用导航上下文的钩子
 * 返回一个可以安全导航的方法，避免 "A component suspended while responding to synchronous input" 错误
 * 适用于用户不期望立即响应的导航
 */
export const useNavigation = () => useContext(NavigationContext);
