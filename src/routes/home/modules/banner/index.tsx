import React from 'react';
import { Search } from 'lucide-react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';

const Banner: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // 搜索框动画
      gsap.fromTo(
        searchRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

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