import React from "react";
import styles from "./index.module.less";
import {
  Github,
  Heart,
  Lightbulb,
  Mail,
  MessageCircleX,
  Users,
} from "lucide-react";
import { webSitName } from "@/data/global";

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>关于我们</h1>
          <p>了解{webSitName}的故事</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <section className={styles.intro}>
            <h2>我们的故事</h2>
            <p>
              {webSitName}
              创建于2025年，是一个致力于分享技术知识和生活感悟的平台。
              我们希望通过文字的力量，传递温暖，分享知识，连接志同道合的人。
            </p>
          </section>

          <section className={styles.mission}>
            <h2>我们的使命</h2>
            <div className={styles.missionCards}>
              <div className={styles.missionCard}>
                <Lightbulb />
                <h3>知识分享</h3>
                <p>传播有价值的技术知识，帮助更多人成长</p>
              </div>
              <div className={styles.missionCard}>
                <Heart />
                <h3>传递温暖</h3>
                <p>记录生活中的美好瞬间，分享生活的感动</p>
              </div>
              <div className={styles.missionCard}>
                <Users />
                <h3>社区互动</h3>
                <p>构建友善的交流环境，促进思想的碰撞</p>
              </div>
            </div>
          </section>

          <section className={styles.contact}>
            <h2>联系我们</h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail />
                <h3>邮箱</h3>
                <p>contact@example.com</p>
              </div>
              <div className={styles.contactItem}>
                <MessageCircleX />
                <h3>微信公众号</h3>
                <p>{webSitName}</p>
              </div>
              <div className={styles.contactItem}>
                <Github />
                <h3>GitHub</h3>
                <p>@warmth-blog</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
