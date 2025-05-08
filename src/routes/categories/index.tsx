import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";
import SafeSvgRenderer from "@/lib/xss";
import useAppStore from "@/store";

const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { categories } = useAppStore();
  return (
    <div className={styles.categoriesPage}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>文章分类</h1>
          <p>探索不同领域的精彩内容</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${styles.categoryCard} ${
                selectedCategory === category.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className={styles.icon}
                style={{ backgroundColor: category.color }}
              >
                <SafeSvgRenderer svg={category.icon}></SafeSvgRenderer>
              </div>
              <div className={styles.content}>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
                <div className={styles.meta}>
                  <span>{category.count} 篇文章</span>
                  <Link
                    to={`/categories/${category.id}`}
                    className={styles.viewMore}
                  >
                    查看更多
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
