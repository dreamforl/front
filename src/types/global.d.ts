import { Component, RouteConfig } from './routes';

declare global {
  interface Window {
    __APP_NAME: string;
    __ROUTES_FILES: Record<string, () => Promise<unknown>>;
    __ROUTE_CONFIG: Record<string, RouteConfig>;
    __ROUTE_LAYOUT: Component;
    __ROUTE_404: () => Component;
  }
}
