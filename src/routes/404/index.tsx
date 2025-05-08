import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const NotFoundPage: React.FC = () => (
  <div className={styles.notFound}>
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>页面未找到</h2>
      <p className={styles.description}>抱歉，您访问的页面不存在或已被移除。</p>
      <Link to="/" className={styles.homeButton}>
        返回首页
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
