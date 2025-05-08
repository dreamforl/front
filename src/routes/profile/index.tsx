import React from "react";
import useAppStore from "@/store";
import styles from "./index.module.less";
import {
  BookOpenText,
  Heart,
  Key,
  MessageCircleMore,
  Settings,
  User,
} from "lucide-react";

const ProfilePage: React.FC = () => {
  const { currentUser } = useAppStore();

  if (!currentUser) {
    return (
      <div className={styles.unauthorized}>
        <Key className={styles.lockIcon} />
        <h2>请先登录</h2>
        <p>登录后即可访问个人中心</p>
        <button className={styles.loginButton}>去登录</button>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <div className={styles.userInfo}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={styles.avatar}
            />
            <h1>{currentUser.name}</h1>
            <p>{currentUser.tips || "这个人很懒，什么都没留下..."}</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <nav className={styles.nav}>
              <a href="#profile" className={styles.active}>
                <User />
                个人资料
              </a>
              <a href="#articles">
                <BookOpenText />
                我的文章
              </a>
              <a href="#comments">
                <MessageCircleMore />
                我的评论
              </a>
              <a href="#likes">
                <Heart />
                我的点赞
              </a>
              <a href="#settings">
                <Settings />
                账号设置
              </a>
            </nav>
          </div>

          <div className={styles.main}>
            <section className={styles.section}>
              <h2>个人资料</h2>
              <div className={styles.profileForm}>
                <div className={styles.formGroup}>
                  <label>用户名</label>
                  <input type="text" value={currentUser.name} readOnly />
                </div>
                <div className={styles.formGroup}>
                  <label>邮箱</label>
                  <input type="email" value={currentUser.email} readOnly />
                </div>
                <div className={styles.formGroup}>
                  <label>个人简介</label>
                  <textarea
                    value={currentUser.tips}
                    placeholder="写点什么介绍自己..."
                    readOnly
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>注册时间</label>
                  <input
                    type="text"
                    value={new Date(
                      currentUser.createdTime
                    ).toLocaleDateString()}
                    readOnly
                  />
                </div>
                <button className={styles.editButton}>编辑资料</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
