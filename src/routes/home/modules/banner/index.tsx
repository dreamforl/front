import React from 'react';
import { Search } from 'lucide-react';
import styles from './index.module.less';

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>探索·分享·成长</h1>
        <p className={styles.subtitle}>记录生活点滴，分享技术心得</p>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="搜索文章、标签或作者"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <Search size={20} />
            <span>搜索</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;