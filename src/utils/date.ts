/**
 * 格式化日期显示
 * @param dateString - ISO格式的日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 一分钟内
  if (diffInSeconds < 60) {
    return '刚刚';
  }

  // 一小时内
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟前`;
  }

  // 一天内
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时前`;
  }

  // 一周内
  if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}天前`;
  }

  // 标准日期格式
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
