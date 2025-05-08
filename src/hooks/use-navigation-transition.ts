import { startTransition } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

/**
 * 创建一个带有过渡效果的导航函数
 * 使用 React 18 的 startTransition 包裹路由导航，
 * 解决在路由切换时 "A component suspended while responding to synchronous input" 的问题
 * 
 * @param navigate React Router的导航函数
 * @returns 包装后的导航函数
 */
export const createNavigationWithTransition = (navigate: NavigateFunction) => {
  return (to: string, options?: { replace?: boolean; state?: any }) => {
    startTransition(() => {
      navigate(to, options);
    });
  };
};

/**
 * 路由导航过渡钩子
 * @deprecated 推荐直接使用 useNavigation 钩子
 */
export const useNavigationTransition = () => {
  const navigate = useNavigate();
  return createNavigationWithTransition(navigate);
};

export default useNavigationTransition; 