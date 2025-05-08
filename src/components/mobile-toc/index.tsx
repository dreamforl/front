import React, { useState } from 'react';
import { List, X } from 'lucide-react';
import styles from './index.module.less';

interface MobileTocProps {
  items: {
    id: string;
    text: string;
    level: number;
  }[];
}

const MobileToc: React.FC<MobileTocProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className={styles.tocButton}
        onClick={() => setIsOpen(true)}
        aria-label="查看目录"
      >
        <List size={24} />
      </button>

      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
        <div className={styles.content}>
          <div className={styles.header}>
            <h3>目录</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className={styles.tocList}>
            {items.length === 0 ? (
              <p className={styles.empty}>此文章没有目录</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={`${styles.tocItem} ${styles[`level${item.level}`]}`}
                  >
                    <button onClick={() => handleClick(item.id)}>
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileToc;