import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import useAppStore from '@/store';

const TagsPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  const { tags } = useAppStore();

  React.useEffect(() => {
    // 模拟加载延迟
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>正在加载标签...</p>
      </div>
    );
  }

  return (
    <div className={styles.tagsPage}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>标签云</h1>
          <p>发现感兴趣的话题</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.tagCloud}>
          {tags.map(tag => (
            <Link
              key={tag.id}
              to={`/tags/${tag.id}`}
              className={styles.tagCard}
              style={{ backgroundColor: tag.color }}
            >
              <span className={styles.name}>{tag.name}</span>
              <span className={styles.count}>42篇文章</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
