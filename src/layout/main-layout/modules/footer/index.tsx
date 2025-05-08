import React from "react";
import { Link } from "react-router-dom";
import { Feather, Github, Mail, MessageCircle } from "lucide-react";
import styles from "./index.module.less";
import { webSitName } from "@/data/global";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <Feather size={24} />
              <span>{webSitName}</span>
            </Link>
            <p className={styles.description}>分享生活点滴，记录技术成长</p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="微信" title="微信">
                <MessageCircle size={20} />
              </a>
              <a href="#" aria-label="微博" title="微博">
                <MessageCircle size={20} />
              </a>
              <a href="#" aria-label="GitHub" title="GitHub">
                <Github size={20} />
              </a>
              <a href="#" aria-label="邮箱" title="邮箱">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3>分类</h3>
              <ul>
                <li>
                  <Link to="/categories/tech">技术分享</Link>
                </li>
                <li>
                  <Link to="/categories/life">生活随笔</Link>
                </li>
                <li>
                  <Link to="/categories/travel">旅行见闻</Link>
                </li>
                <li>
                  <Link to="/categories/food">美食记录</Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3>关于</h3>
              <ul>
                <li>
                  <Link to="/about">关于我们</Link>
                </li>
                <li>
                  <Link to="/contact">联系我们</Link>
                </li>
                <li>
                  <Link to="/privacy">隐私政策</Link>
                </li>
                <li>
                  <Link to="/terms">使用条款</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>© {currentYear} {webSitName}. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
