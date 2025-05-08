import "./routes/init";
import { createHashRouter, RouterProvider } from "react-router-dom";
import BackToTop from "./components/back-to-top";
import NotificationList from "./components/notification";
import { initRoutes } from "./lib/init-route";
import { startTransition, useState, useEffect } from "react";
import Loading from "./components/loading";
import useAppStore from "@/store";
import { getTags } from "./api/tag";
import { getCategories } from "@/api/categorie";
import { patchGetDicts } from "./api/dict";
import useDictionaryStore from "./store/dict";
import { HEADER_NAV, WEBSIT_INFO } from "./data/dictKey";

const routes = [...initRoutes()];
const router = createHashRouter(routes);

function App() {
  const [isReady, setIsReady] = useState(false);
  const { setTags, setCategories } = useAppStore();
  const { setDict, dicts } = useDictionaryStore();
  console.log("dicts:", dicts);
  useEffect(() => {
    getTags().then(setTags);
    getCategories().then(setCategories);
    patchGetDicts({ codes: [HEADER_NAV, WEBSIT_INFO] }).then((dicts) => {
    	console.log('dicts:', dicts)
      dicts.forEach((dict) => {
        setDict(dict.code, dict);
      });
    });
  }, []);
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
      <NotificationList />
      <BackToTop />
    </>
  );
}

export default App;
