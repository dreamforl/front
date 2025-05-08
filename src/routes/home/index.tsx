import React, { useEffect, useState } from "react";
import { getArticles, getHotTags } from "../../api";
import { Article, listRes, Tag } from "../../types";
import Banner from "./modules/banner";
import ArticleList from "./modules/article-list";
import Sidebar from "./modules/sidebar";
import styles from "./index.module.less";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hotTags, setHotTags] = useState<Tag[]>([]);
  const [articlesData, setArticlesData] = useState<listRes<Article>>({
    list: [],
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesResponse, tagsResponse] = await Promise.all([
          getArticles(),
          getHotTags(),
        ]);

        setArticlesData(articlesResponse);
        setHotTags(tagsResponse);
      } catch (error) {
        console.error("获取数据失败:", error);
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
          <ArticleList articlesData={articlesData} loading={loading} />
          <Sidebar hotTags={hotTags} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
