import "./routes/init";
import { createHashRouter, RouterProvider } from "react-router-dom";
import BackToTop from "./components/back-to-top";
import { initRoutes } from "./lib/init-route";
import { startTransition, useState, useEffect } from "react";
import Loading from "./components/loading";

const routes = [...initRoutes()];
const router = createHashRouter(routes);

function App() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // 使用startTransition来包裹路由初始化，避免同步输入问题
    startTransition(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <Loading fullScreen />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <BackToTop />
    </>
  );
}

export default App;
