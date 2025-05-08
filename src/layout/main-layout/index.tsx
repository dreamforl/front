import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./modules/header";
import Footer from "./modules/footer";
import styles from "./index.module.less";
import NavigationProvider from "@/store/navigation-context";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NavigationProvider navigate={navigate}>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  );
};

export default MainLayout;
