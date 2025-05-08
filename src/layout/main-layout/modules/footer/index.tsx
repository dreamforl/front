import React from "react";
import { Link } from "react-router-dom";
import { Feather, Mail, MessageCircle } from "lucide-react";
import styles from "./index.module.less";
import { webSitName } from "@/data/global";
import useAppStore from "@/store";
import SafeSvgRenderer from "@/lib/xss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { categories } = useAppStore();
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
                <SafeSvgRenderer svg={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`}></SafeSvgRenderer>
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
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
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
          <p>
            © {currentYear} {webSitName}. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
