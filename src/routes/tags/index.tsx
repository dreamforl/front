import React from 'react';
import { Link } from 'react-router-dom';
import { getHotTags } from '../../api';
import { Tag } from '../../types';
import styles from './index.module.less';

const TagsPage: React.FC = () => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getHotTags();
        setTags(data);
      } catch (error) {
        console.error('获取标签失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
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
          {tags.map((tag) => (
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