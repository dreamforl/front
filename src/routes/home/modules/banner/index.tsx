import React from 'react';
import { Search } from 'lucide-react';
import { useGsapFadeIn } from '@/hooks/use-gsap';
import styles from './index.module.less';

const Banner: React.FC = () => {
  const titleRef = useGsapFadeIn({
    start: 'top center',
    once: true
  });
  const searchRef = useGsapFadeIn({ delay: 0.3 });

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div ref={titleRef}>
          <h1 className={styles.title}>探索·分享·成长</h1>
          <p className={styles.subtitle}>记录生活点滴，分享技术心得</p>
        </div>
        
        <div ref={searchRef} className={styles.searchContainer}>
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