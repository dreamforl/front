import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './index.module.less';

const Banner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>探索·分享·成长</h1>
        <p className={styles.subtitle}>记录生活点滴，分享技术心得</p>
        
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <input
            type="text"
            placeholder="搜索文章、标签或作者"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={20} />
            <span>搜索</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;