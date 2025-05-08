import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './modules/header';
import Footer from './modules/footer';
import styles from './index.module.less';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;