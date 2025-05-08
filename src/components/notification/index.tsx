import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Bell, X } from 'lucide-react';
import styles from './index.module.less';
import { Notification } from '@/types/notification';
import { useNotificationStore } from '@/store/notification';
import { formatDate } from '@/utils/date';

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemove();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart size={20} />;
      case 'comment':
        return <MessageSquare size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className={`${styles.notification} ${styles[notification.type]} ${isExiting ? styles.exiting : ''}`}>
      <div className={`${styles.icon} ${styles[notification.type]}`}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{notification.title}</h4>
        <p className={styles.message}>{notification.message}</p>
        <div className={styles.time}>
          {formatDate(new Date(notification.timestamp))}
        </div>
      </div>
      <button className={styles.closeButton} onClick={() => handleRemove()}>
        <X size={16} />
      </button>
    </div>
  );
};

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className={styles.notificationWrapper}>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationList;