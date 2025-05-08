import { ComponentType } from 'react';

export type Component = () => Promise<{ default: ComponentType<object> }>;

export type RouteConfig = {
  layout?: boolean | number;
  path: string;
  component: Component;
  name?: string;
  loader?: () => unknown;
  action?: () => unknown;
};
