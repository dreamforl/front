import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article, Tag } from '../../../types';
import { getArticles } from '../../../api';
import ArticleList from '../../home/modules/article-list';
import Sidebar from '../../home/modules/sidebar';
import styles from './index.module.less';
import { getTags } from '@/api/tag';

const TagDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesResponse, tagsResponse] = await Promise.all([getArticles(), getTags()]);

        // 获取当前标签信息
        const currentTag = tagsResponse.find(t => t.id === Number(id));
        setTag(currentTag || null);

        // 根据标签过滤文章
        const filteredArticles = articlesResponse.list.filter(article =>
          article.tags.some(t => t.id === Number(id)),
        );
        setArticles(filteredArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!tag) {
    return (
      <div className={styles.loading}>
        <p>标签不存在</p>
      </div>
    );
  }

  return (
    <div className={styles.tagDetail}>
      <div className={styles.banner} style={{ background: tag.color }}>
        <div className={styles.bannerContent}>
          <h1>{tag.name}</h1>
          <p>共 {articles.length} 篇文章</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <ArticleList
              articlesData={{ list: articles, total: articles.length }}
              loading={loading}
            />
          </div>
          <aside className={styles.sidebar}>
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TagDetailPage;
