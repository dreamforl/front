import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Article, listRes } from '../../types';
import { getArticles } from '../../api';
import ArticleList from '../home/modules/article-list';
import styles from './index.module.less';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<listRes<Article>>({ list: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticles();
        // 简单的客户端搜索实现
        const filtered = response.list.filter(
          article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.intro.toLowerCase().includes(query.toLowerCase()) ||
            article.author.name.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase())),
        );
        setArticles({ list: filtered, total: filtered.length });
      } finally {
        setLoading(false);
      }
    };

    searchArticles();
  }, [query]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>搜索结果</h1>
          <p>关键词: {query}</p>
        </div>
      </div>

      <div className={styles.container}>
        <ArticleList articlesData={articles} loading={loading} />
      </div>
    </div>
  );
};

export default SearchPage;
