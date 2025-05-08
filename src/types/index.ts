// 用户信息类型
export interface User {
  id: string;
  name: string;
  tips?: string;
  avatar: string;
  email: string;
  createdTime: string;
  updatedTime?: string;
  roles?: string[];
  permissions?: string[];
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
  color: string;
}

// 文章类型
export interface Article {
  id: number;
  title: string;
  intro: string;
  cover: string;
  views: number;
  likes: number;
  commentCount: number;
  createdTime: string;
  updatedTime: string;
  content: string;
  author: User;
  isLiked?: number;
  tags: Tag[];
}

// 评论类型
export interface Comment {
  id: number;
  content: string;
  createdTime: string;
  author: User;
  articleId: number;
  parentId?: number;
  replyTo?: User;
  childComments?: Comment[];
  childrenCount?: number; // 子评论总数
  likes?: number; // 点赞数
}

// 分页数据类型
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

// 分页响应类型
export interface listRes<T> {
  list: T[];
  // pagination: Pagination;
  total: number;
}
