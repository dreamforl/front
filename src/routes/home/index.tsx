import React, { useEffect, useState } from 'react';
import { getArticles } from '../../api';
import { Article, listRes } from '../../types';
import Banner from './modules/banner';
import ArticleList from './modules/article-list';
import Sidebar from './modules/sidebar';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [articlesData, setArticlesData] = useState<listRes<Article>>({
    list: [],
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      getArticles()
        .then(setArticlesData)
        .finally(() => setLoading(false));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.homePage}>
      <Banner />

      <div className={styles.container}>
        <div className={styles.content}>
          <ArticleList articlesData={articlesData} loading={loading} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
