import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

interface CataloguesProps {
  items: {
    id: string;
    title: string;
    level: number;
  }[];
}

const Catalogues: React.FC<CataloguesProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    );

    // 观察所有标题元素
    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // 清理 observer
      items.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>此文章没有目录</p>
      </div>
    );
  }

  return (
    <nav className={styles.catalogues}>
      <ul className={styles.tocList}>
        {items.map(item => (
          <li
            key={item.id}
            className={`${styles.tocItem} ${styles[`level${item.level}`]} ${item.id === activeId ? styles.active : ''}`}
          >
            <a
              href={`#${item.id}`}
              onClick={e => {
                e.preventDefault();
                handleClick(item.id);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Catalogues;
