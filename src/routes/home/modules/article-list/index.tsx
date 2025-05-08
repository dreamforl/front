import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, MessageSquare } from 'lucide-react';
import { Article } from '../../../../types';
import { formatDate } from '../../../../utils/date';
import styles from './index.module.less';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>正在加载文章...</p>
      </div>
    );
  }
  
  if (articles.length === 0) {
    return (
      <div className={styles.empty}>
        <p>暂无文章</p>
      </div>
    );
  }
  
  return (
    <div className={styles.articleList}>
      <h2 className={styles.sectionTitle}>最新文章</h2>
      
      <div className={styles.articles}>
        {articles.map((article) => (
          <article key={article.id} className={styles.articleCard}>
            <Link to={`/article/${article.id}`} className={styles.coverLink}>
              <div className={styles.cover}>
                <img src={article.cover} alt={article.title} />
              </div>
            </Link>
            
            <div className={styles.content}>
              <div className={styles.tags}>
                {article.tags.map((tag) => (
                  <Link key={tag.id} to={`/tags/${tag.id}`} className={styles.tag} style={{ backgroundColor: tag.color }}>
                    {tag.name}
                  </Link>
                ))}
              </div>
              
              <h3 className={styles.title}>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </h3>
              
              <p className={styles.intro}>{article.intro}</p>
              
              <div className={styles.meta}>
                <div className={styles.author}>
                  <img src={article.author.avatar} alt={article.author.name} />
                  <span>{article.author.name}</span>
                </div>
                
                <div className={styles.stats}>
                  <span className={styles.statItem}>
                    <Clock size={16} />
                    <span>{formatDate(article.createdTime)}</span>
                  </span>
                  <span className={styles.statItem}>
                    <Eye size={16} />
                    <span>{article.views}</span>
                  </span>
                  <span className={styles.statItem}>
                    <Heart size={16} fill={article.isLiked ? 'var(--primary-500)' : 'none'} />
                    <span>{article.likes}</span>
                  </span>
                  <span className={styles.statItem}>
                    <MessageSquare size={16} />
                    <span>{article.commentCount}</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className={styles.loadMore}>
        <button className={styles.loadMoreBtn}>加载更多</button>
      </div>
    </div>
  );
};

export default ArticleList;