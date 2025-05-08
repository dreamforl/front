import { Loader } from 'lucide-react';
import styles from './index.module.less';

interface LoadingProps {
  fullScreen?: boolean;
}

/**
 * 加载中组件
 * @param fullScreen 是否全屏显示
 */
const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  return (
    <div className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.loadingContent}>
        <Loader className={styles.loadingIcon} size={24} />
        <span className={styles.loadingText}>加载中...</span>
      </div>
    </div>
  );
};

export default Loading; 