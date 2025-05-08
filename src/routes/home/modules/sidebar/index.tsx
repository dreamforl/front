import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '../../../../types';
import styles from './index.module.less';

interface SidebarProps {
  hotTags: Tag[];
}

const Sidebar: React.FC<SidebarProps> = ({ hotTags }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>关于博主</h3>
        <div className={styles.authorInfo}>
          <img
            src="https://zw997.top/zwapp/default/boy.jpeg"
            alt="博主头像"
            className={styles.authorAvatar}
          />
          <h4 className={styles.authorName}>超级管理员</h4>
          <p className={styles.authorBio}>该用户很懒，什么都没留下...</p>
          <div className={styles.authorStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>42</span>
              <span className={styles.statLabel}>文章</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>1.2k</span>
              <span className={styles.statLabel}>粉丝</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>365</span>
              <span className={styles.statLabel}>关注</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>热门标签</h3>
        <div className={styles.tagCloud}>
          {hotTags.map((tag) => (
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
      
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>最新推荐</h3>
        <div className={styles.recommendedPosts}>
          <Link to="/article/1" className={styles.recommendedPost}>
            <div className={styles.postImage}>
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="推荐文章" 
              />
            </div>
            <div className={styles.postInfo}>
              <h4 className={styles.postTitle}>深入浅出ES6核心特性</h4>
              <p className={styles.postMeta}>3天前 · 261次浏览</p>
            </div>
          </Link>
          
          <Link to="/article/2" className={styles.recommendedPost}>
            <div className={styles.postImage}>
              <img 
                src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="推荐文章" 
              />
            </div>
            <div className={styles.postInfo}>
              <h4 className={styles.postTitle}>React 18 新特性解析</h4>
              <p className={styles.postMeta}>5天前 · 189次浏览</p>
            </div>
          </Link>
          
          <Link to="/article/3" className={styles.recommendedPost}>
            <div className={styles.postImage}>
              <img 
                src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="推荐文章" 
              />
            </div>
            <div className={styles.postInfo}>
              <h4 className={styles.postTitle}>TypeScript 高级类型技巧</h4>
              <p className={styles.postMeta}>1周前 · 235次浏览</p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;