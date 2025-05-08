import { Component, RouteConfig } from '@/types/routes';

const configs = import.meta.glob(['./**/route.ts'], {
  eager: true, // 默认是懒加载的，为true表示直接使用
  import: 'default', // 默认是导入整个模块，设置为default就是导入模块的default
});
window.__ROUTE_CONFIG = configs as Record<string, RouteConfig>;
const Layout = () => import('@/layout/main-layout');
window.__ROUTE_LAYOUT = Layout as unknown as Component;
