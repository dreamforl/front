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
type Author = Pick<User, "id" | "name" | "tips" | "email" | "avatar">;

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
  author: Author;
  isLiked?: number;
  tags: Tag[];
}

// 评论类型
export interface Comment {
  id: number;
  content: string;
  createdTime: string;
  author: Author;
  articleId: number;
  parentId?: number;
  replyTo?: Author;
  childComments?: Comment[];
  childrenCount?: number; // 子评论总数
  likes?: number; // 点赞数
}


// 分页响应类型
export interface listRes<T> {
  list: T[];
  total: number;
}
