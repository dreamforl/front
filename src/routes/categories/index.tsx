import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './index.module.less';

const categories = [
  {
    id: 1,
    name: '技术分享',
    icon: 'mdi:code-tags',
    color: 'oklch(0.554 0.241 27.162)',
    description: '分享前端、后端、移动端等技术文章',
    count: 42
  },
  {
    id: 2,
    name: '生活随笔',
    icon: 'mdi:pencil',
    color: 'oklch(0.656 0.241 354.308)',
    description: '记录生活中的点点滴滴',
    count: 28
  },
  {
    id: 3,
    name: '旅行见闻',
    icon: 'mdi:airplane',
    color: 'oklch(0.557 0.241 129.606)',
    description: '分享旅行中的美好回忆',
    count: 15
  },
  {
    id: 4,
    name: '美食记录',
    icon: 'mdi:food',
    color: 'oklch(0.751 0.241 49.151)',
    description: '记录美食探店和烹饪心得',
    count: 23
  }
];

const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
                selectedCategory === category.id ? styles.selected : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={styles.icon} style={{ backgroundColor: category.color }}>
                <Icon icon={category.icon} />
              </div>
              <div className={styles.content}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className={styles.meta}>
                  <span>{category.count} 篇文章</span>
                  <Link to={`/categories/${category.id}`} className={styles.viewMore}>
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