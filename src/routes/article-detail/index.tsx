import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId } from '../../api';
import { Article, Comment } from '../../types';
import ArticleContent from './modules/article-content';
import CommentSection from './modules/comment-section';
import ArticleMeta from './modules/article-meta';
import TableOfContents from './modules/table-of-contents';
import styles from './index.module.less';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([]);
  
  useEffect(() => {
    const fetchArticleData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [articleData, commentsData] = await Promise.all([
          getArticleById(Number(id)),
          getCommentsByArticleId(Number(id))
        ]);
        
        if (articleData) {
          setArticle(articleData);
          // 解析文章内容，提取标题生成目录
          const headings = parseHeadings(articleData.content);
          setTableOfContents(headings);
        }
        
        setComments(commentsData);
      } catch (error) {
        console.error('获取文章数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticleData();
  }, [id]);
  
  // 解析 Markdown 内容中的标题
  const parseHeadings = (content: string) => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: { id: string; text: string; level: number }[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/\s+/g, '-');
      
      headings.push({ id, text, level });
    }
    
    return headings;
  };
  
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>正在加载文章...</p>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>文章不存在</h2>
        <p>您访问的文章不存在或已被删除。</p>
      </div>
    );
  }
  
  return (
    <div className={styles.articleDetail}>
      <div className={styles.banner} style={{ backgroundImage: `url(${article.cover})` }}>
        <div className={styles.overlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.intro}>{article.intro}</p>
          <ArticleMeta article={article} />
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <article className={styles.article}>
            <ArticleContent content={article.content} />
            
            <div className={styles.actions}>
              <div className={styles.tags}>
                {article.tags.map((tag) => (
                  <span 
                    key={tag.id} 
                    className={styles.tag}
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            
            <CommentSection 
              articleId={article.id} 
              comments={comments} 
              setComments={setComments} 
            />
          </article>
          
          <aside className={styles.sidebar}>
            <div className={styles.tocContainer}>
              <h3 className={styles.tocTitle}>目录</h3>
              <TableOfContents items={tableOfContents} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;