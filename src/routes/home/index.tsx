import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Article, listRes, Tag } from "../../types";
import Banner from "./modules/banner";
import ArticleList from "./modules/article-list";
import Sidebar from "./modules/sidebar";
import styles from "./index.module.less";
import { getTags } from "@/api/tag";

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
        .catch(console.log)
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
