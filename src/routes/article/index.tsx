import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import { Article } from "../../types";
import { authorInfo } from '@/data/author';
import CommentSection from "./modules/comment-section";
import ArticleMeta from "./modules/article-meta";
import Catalogues from "./modules/catalogues";
import styles from "./index.module.less";
import { Share2, Bookmark, ThumbsUp, UserPlus } from "lucide-react";
import Preview from "@/components/md/preview";
import { CatalogueItem } from "@/types/article";

// 根据背景色计算最合适的文本颜色（黑色或白色）
const getBestTextColor = (bgColor: string) => {
  // 处理rgba的情况
  if (bgColor.startsWith("rgba")) {
    const values = bgColor.match(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/
    );
    if (values) {
      const [_, r, g, b] = values.map(Number);
      // 计算亮度 - 使用相对亮度算法 (luminance)
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 186 ? "#000000" : "#ffffff";
    }
  }

  // 处理rgb的情况
  if (bgColor.startsWith("rgb")) {
    const values = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (values) {
      const [_, r, g, b] = values.map(Number);
      // 计算亮度
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 186 ? "#000000" : "#ffffff";
    }
  }

  // 处理十六进制的情况
  if (bgColor.startsWith("#")) {
    let hex = bgColor.substring(1);
    // 处理简写形式 (#fff)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // 计算亮度
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#000000" : "#ffffff";
  }

  // 默认返回黑色
  return "#000000";
};

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [catalogues, setCatalogues] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!id) return;
      setLoading(true);
      getArticleById(Number(id))
        .then(setArticle)
        .catch((error) => console.error("获取文章数据失败:", error))
        .finally(() => {
          setLoading(false);
        });
    };

    fetchArticleData();
  }, [id]);

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
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${article.cover})` }}
      >
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
            <Preview
              value={article.content}
              setCatalogues={setCatalogues}
            ></Preview>
            <div className={styles.actions}>
              <div className={styles.tags}>
                {article.tags.map((tag) => {
                  // 为每个标签选择一个图标（示例）
                  let TagIcon;
                  switch (tag.name) {
                    case "React":
                      TagIcon = () => (
                        <span className={styles.tagIcon}>⚛️</span>
                      );
                      break;
                    case "JavaScript":
                      TagIcon = () => (
                        <span className={styles.tagIcon}>JS</span>
                      );
                      break;
                    case "TypeScript":
                      TagIcon = () => (
                        <span className={styles.tagIcon}>TS</span>
                      );
                      break;
                    case "前端":
                      TagIcon = () => (
                        <span className={styles.tagIcon}>🌐</span>
                      );
                      break;
                    case "后端":
                      TagIcon = () => (
                        <span className={styles.tagIcon}>🖥️</span>
                      );
                      break;
                    default:
                      TagIcon = () => <span className={styles.tagIcon}>#</span>;
                  }

                  return (
                    <span
                      key={tag.id}
                      className={styles.tag}
                      style={{
                        backgroundColor: tag.color,
                        color: getBestTextColor(tag.color),
                      }}
                    >
                      <TagIcon />
                      {tag.name}
                    </span>
                  );
                })}
              </div>

              <div className={styles.articleActions}>
                <button className={styles.actionButton} title="分享">
                  <Share2 size={20} />
                </button>
                <button className={styles.actionButton} title="收藏">
                  <Bookmark size={20} />
                </button>
                <button className={styles.actionButton} title="点赞">
                  <ThumbsUp size={20} />
                  <span>{article.likes}</span>
                </button>
              </div>
            </div>

            <CommentSection article={article} />
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.tocContainer}>
              <h3 className={styles.tocTitle}>目录</h3>
              <Catalogues items={catalogues} />
            </div>

            <div className={styles.authorCard}>
              <div className={styles.authorHeader}>
                <img
                  src={authorInfo.avatar}
                  alt={authorInfo.name}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{authorInfo.name}</h4>
                  <p className={styles.authorBio}>{authorInfo.bio}</p>
                </div>
              </div>
              <div className={styles.authorStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{authorInfo.stats.articles}</span>
                  <span className={styles.statLabel}>文章</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{authorInfo.stats.followers}</span>
                  <span className={styles.statLabel}>粉丝</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{authorInfo.stats.likes}</span>
                  <span className={styles.statLabel}>获赞</span>
                </div>
              </div>
              <button className={styles.followButton}>
                <UserPlus size={18} />
                关注作者
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
