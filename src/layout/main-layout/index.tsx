import React, { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './modules/header';
import Footer from './modules/footer';
import styles from './index.module.less';
import NavigationProvider from '@/store/navigation-context';
import { useNotificationStore } from '@/store/notification';
import useAppStore from '@/store';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (currentUser) {
      // 模拟用户登录后的欢迎通知
      addNotification({
        type: 'system',
        title: '欢迎回来',
        message: `${currentUser.name}，很高兴再次见到您！今天又有什么新发现要分享吗？`,
      });

      // 模拟系统消息
      setTimeout(() => {
        addNotification({
          type: 'system',
          title: '系统提醒',
          message: '您有3篇文章获得了新的点赞，快去看看吧！',
        });
      }, 3000);
    }
  }, [currentUser, addNotification]);

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
