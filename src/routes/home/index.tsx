import React, { useEffect, useState } from 'react';
import { getArticles, getHotTags } from '../../api';
import { Article, Tag } from '../../types';
import Banner from './modules/banner';
import ArticleList from './modules/article-list';
import Sidebar from './modules/sidebar';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [hotTags, setHotTags] = useState<Tag[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesResponse, tagsResponse] = await Promise.all([
          getArticles(),
          getHotTags()
        ]);
        
        setArticles(articlesResponse.data);
        setHotTags(tagsResponse);
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className={styles.homePage}>
      <Banner />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <ArticleList articles={articles} loading={loading} />
          <Sidebar hotTags={hotTags} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;