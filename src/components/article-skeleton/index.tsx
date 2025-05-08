import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './index.module.less';

export const ArticleListSkeleton: React.FC = () => (
  <div className={styles.articleSkeleton}>
    {[1, 2, 3].map(key => (
      <div key={key} className={styles.articleCard}>
        <div className={styles.cover}>
          <Skeleton height={200} />
        </div>
        <div className={styles.content}>
          <div className={styles.tags}>
            <Skeleton width={60} height={24} />
            <Skeleton width={80} height={24} />
          </div>
          <Skeleton height={32} width="80%" />
          <Skeleton count={2} />
          <div className={styles.meta}>
            <Skeleton circle width={32} height={32} />
            <Skeleton width={100} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const ArticleDetailSkeleton: React.FC = () => (
  <div className={styles.detailSkeleton}>
    <div className={styles.banner}>
      <Skeleton height={400} />
    </div>
    <div className={styles.content}>
      <Skeleton height={48} width="80%" />
      <Skeleton height={24} count={2} />
      <div className={styles.meta}>
        <Skeleton circle width={40} height={40} />
        <Skeleton width={200} />
      </div>
      <div className={styles.body}>
        <Skeleton count={10} />
      </div>
    </div>
  </div>
);
