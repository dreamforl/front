import React from "react";
import { Link } from "react-router-dom";
import { authorInfo } from "@/data/author";
import { useGsapFadeIn } from "@/hooks/use-gsap";
import styles from "./index.module.less";
import useAppStore from "@/store";

// 模拟推荐文章数据
const recommendedPosts = [
  {
    id: 1,
    title: "深入理解React Hooks原理",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    views: 1280,
    daysAgo: 2,
  },
  {
    id: 2,
    title: "TypeScript高级类型实战指南",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    views: 956,
    daysAgo: 3,
  },
  {
    id: 3,
    title: "现代前端构建工具解析",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    views: 784,
    daysAgo: 4,
  },
];

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { tags } = useAppStore();
  const authorRef = useGsapFadeIn();
  const tagsRef = useGsapFadeIn({ delay: 0.2 });
  const postsRef = useGsapFadeIn({ delay: 0.4 });

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card} ref={authorRef}>
        <h3 className={styles.cardTitle}>关于博主</h3>
        <div className={styles.authorInfo}>
          <img
            src={authorInfo.avatar}
            alt="博主头像"
            className={styles.authorAvatar}
          />
          <h4 className={styles.authorName}>{authorInfo.name}</h4>
          <p className={styles.authorBio}>{authorInfo.bio}</p>
          <div className={styles.authorStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {authorInfo.stats.articles}
              </span>
              <span className={styles.statLabel}>文章</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {authorInfo.stats.followers}
              </span>
              <span className={styles.statLabel}>粉丝</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{authorInfo.stats.likes}</span>
              <span className={styles.statLabel}>获赞</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card} ref={tagsRef}>
        <h3 className={styles.cardTitle}>热门标签</h3>
        <div className={styles.tagCloud}>
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.id}`}
              className={styles.tag}
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.card} ref={postsRef}>
        <h3 className={styles.cardTitle}>推荐阅读</h3>
        <div className={styles.recommendedPosts}>
          {recommendedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/article/${post.id}`}
              className={styles.recommendedPost}
            >
              <div className={styles.postImage}>
                <img src={post.image} alt={post.title} />
              </div>
              <div className={styles.postInfo}>
                <h4 className={styles.postTitle}>{post.title}</h4>
                <p className={styles.postMeta}>
                  {post.daysAgo}天前 · {post.views}次阅读
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
