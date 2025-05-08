import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "@/types";
import ArticleList from "../../home/modules/article-list";
import Sidebar from "../../home/modules/sidebar";
import styles from "./index.module.less";
import { Categorie, getCategorie } from "@/api/categorie";
import { getArticles } from "@/api";

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Categorie | null>(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticles();
        // 这里应该根据分类ID过滤文章，目前使用模拟数据
        setArticles(response.list);
      } catch (error) {
        console.error("获取文章失败:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategorie(Number(id)).then(setCategory);
    fetchArticles();
  }, [id]);

  if (!category) {
    return (
      <div className={styles.loading}>
        <p>分类不存在</p>
      </div>
    );
  }

  return (
    <div className={styles.categoryDetail}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>{category.name}</h1>
          <p>{category.desc}</p>
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

export default CategoryDetailPage;
