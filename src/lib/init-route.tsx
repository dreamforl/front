import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import type { Component, RouteConfig } from '@/types/routes';
import Loading from '@/components/loading';

const setElement = (loader: Component, config: RouteConfig) => {
  const C = lazy(loader);
  return (
    <Suspense fallback={<Loading />}>
      <C {...config}></C>
    </Suspense>
  );
};

export function initRoutes() {
  const routesFiles = Object.values(window.__ROUTE_CONFIG);
  const layoutComponent = window.__ROUTE_LAYOUT;
  const Layout = lazy(layoutComponent);
  const layoutChildren: RouteObject[] = [];
  const root: RouteObject[] = [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading fullScreen />}>
          <Layout></Layout>
        </Suspense>
      ),
      children: layoutChildren,
    },
  ];

  routesFiles.forEach(item => {
    const { path, component, layout = true } = item;
    const routeItem = {
      path,
      element: setElement(component, item),
    };
    if (layout) {
      layoutChildren.push(routeItem);
    } else {
      root.push(routeItem);
    }
  });

  const PAGE_NOT_FOUND_ROUTE = {
    path: '*',
    element: <Navigate to="/404" replace />,
  };
  root.push(PAGE_NOT_FOUND_ROUTE);
  return root;
}
