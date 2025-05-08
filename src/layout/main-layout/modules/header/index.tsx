import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User, Feather } from "lucide-react";
import useAppStore from "@/store";
import { getCurrentUser } from "../../../../api";
import styles from "./index.module.less";
import useDictionaryStore from "@/store/dict";
import {
  HEADER_NAV,
  Header_nav,
  WEBSIT_INFO,
  WebSitInfo,
} from "@/data/dictKey";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { currentUser, setCurrentUser } = useAppStore();
  const { getDict } = useDictionaryStore();
  const websit = getDict<WebSitInfo>(WEBSIT_INFO, { name: "" });
  const navItems = getDict<Header_nav>(HEADER_NAV, []);
  // 监听滚动事件，用于改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }
    };

    fetchCurrentUser();
  }, [setCurrentUser]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoIcon}>
              <Feather size={24} />
            </span>
            <span className={styles.logoText}>{websit.name}</span>
          </Link>
        </div>

        {/* 桌面端导航 */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={pathname === item.path ? styles.active : ""}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 移动端菜单按钮 */}
        <div className={styles.mobileActions}>
          <button className={styles.searchButton} aria-label="搜索">
            <Search size={20} />
          </button>
          {currentUser ? (
            <Link to="/profile" className={styles.userAvatar}>
              <img src={currentUser.avatar} alt={currentUser.name} />
            </Link>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              <User size={20} />
            </Link>
          )}
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="菜单"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 桌面端操作 */}
        <div className={styles.desktopActions}>
          <button className={styles.searchButton} aria-label="搜索">
            <Search size={20} />
            <span>搜索</span>
          </button>
          {currentUser ? (
            <Link to="/profile" className={styles.userAvatar}>
              <img src={currentUser.avatar} alt={currentUser.name} />
              <span>{currentUser.name}</span>
            </Link>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              <User size={20} />
              <span>登录</span>
            </Link>
          )}
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={pathname === item.path ? styles.active : ""}
              >
                <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
