import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInput}>
            <Search size={20} />
            <input
              type="text"
              placeholder="搜索文章、标签或作者..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </form>

        <div className={styles.suggestions}>
          <h3>热门搜索</h3>
          <div className={styles.tags}>
            <button onClick={() => handleTagClick('React')}>React</button>
            <button onClick={() => handleTagClick('TypeScript')}>TypeScript</button>
            <button onClick={() => handleTagClick('前端开发')}>前端开发</button>
            <button onClick={() => handleTagClick('JavaScript')}>JavaScript</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;