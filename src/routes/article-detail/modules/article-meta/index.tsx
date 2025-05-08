import React, { useState } from 'react';
import { Clock, Eye, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Article } from '../../../../types';
import { formatDate } from '../../../../utils/date';
import { likeArticle } from '../../../../api';
import styles from './index.module.less';

interface ArticleMetaProps {
  article: Article;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const [isLiked, setIsLiked] = useState(article.isLiked === 1);
  const [likeCount, setLikeCount] = useState(article.likes);
  
  const handleLike = async () => {
    try {
      await likeArticle(article.id);
      setIsLiked(!isLiked);
      setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.intro,
        url: window.location.href,
      }).catch(err => console.error('分享失败:', err));
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('链接已复制到剪贴板'))
        .catch(err => console.error('复制失败:', err));
    }
  };
  
  return (
    <div className={styles.meta}>
      <div className={styles.author}>
        <img src={article.author.avatar} alt={article.author.name} />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{article.author.name}</span>
          <span className={styles.authorTips}>{article.author.tips}</span>
        </div>
      </div>
      
      <div className={styles.stats}>
        <span className={styles.statItem}>
          <Clock size={16} />
          <span>{formatDate(article.createdTime)}</span>
        </span>
        
        <span className={styles.statItem}>
          <Eye size={16} />
          <span>{article.views}次阅读</span>
        </span>
        
        <span 
          className={`${styles.statItem} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{likeCount}</span>
        </span>
        
        <span className={styles.statItem}>
          <MessageSquare size={16} />
          <span>{article.commentCount}条评论</span>
        </span>
        
        <span className={styles.statItem} onClick={handleShare}>
          <Share2 size={16} />
          <span>分享</span>
        </span>
      </div>
    </div>
  );
};

export default ArticleMeta;