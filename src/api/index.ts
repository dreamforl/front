// 模拟 API 请求
import { zwFetch } from "@/lib/fetch";
import { Article, Comment, listRes, Tag, User } from "../types";

// 模拟数据
const mockArticles: Article[] = [
  {
    id: 1,
    title: "测试",
    intro:
      "深入探讨ES6带来的重大改进，包括箭头函数、模板字符串、解构赋值等实用特性",
    cover: "http://localhost:8080/article1.webp",
    views: 261,
    createdTime: "2025-04-25T07:16:42.000Z",
    updatedTime: "2025-05-06T10:22:43.000Z",
    content:
      '# 这是文章标题\n\n## 这是小标题\n\n这是文章正文，可以包含**加粗**、*斜体*等格式。\n\n### 代码示例\n\n```javascript\nconst hello = () => {\n  console.log("Hello, World!");\n};\n\nhello();\n```\n\n## 另一个小标题\n\n这里是更多的内容...\n\n### 最后一个小标题\n\n结束语...',
    likes: 1,
    commentCount: 8,
    author: {
      id: "33ef8b96-21d5-11f0-9294-0242ac110002",
      name: "超级管理员",
      email: "111",
      tips: "该用户很懒",
      avatar: "https://zw997.top/zwapp/default/boy.jpeg",
    },
    isLiked: 1,
    tags: [
      {
        id: 4,
        name: "生活趣事",
        color: "oklch(0.656 0.241 354.308)",
      },
    ],
  },
  {
    id: 2,
    title: "React 18 新特性解析",
    intro:
      "探索 React 18 中的并发渲染、自动批处理和 Suspense 服务器组件等革命性功能",

    cover: "http://localhost:8080/article2.webp",
    views: 189,
    createdTime: "2025-04-28T09:25:18.000Z",
    updatedTime: "2025-05-03T14:18:32.000Z",
    content: "文章内容...",
    likes: 12,
    commentCount: 5,
    author: {
      id: "33ef8b96-21d5-11f0-9294-0242ac110002",
      name: "超级管理员",
      email: "111",
      tips: "该用户很懒",
      avatar: "https://zw997.top/zwapp/default/boy.jpeg",
    },
    isLiked: 0,
    tags: [
      {
        id: 1,
        name: "前端开发",
        color: "oklch(0.554 0.241 27.162)",
      },
      {
        id: 2,
        name: "React",
        color: "oklch(0.651 0.241 194.808)",
      },
    ],
  },
  {
    id: 3,
    title: "TypeScript 高级类型技巧",
    intro:
      "掌握 TypeScript 中的映射类型、条件类型、类型守卫和工具类型，提升代码质量",

    cover: "http://localhost:8080/article3.webp",
    views: 235,
    createdTime: "2025-04-22T11:42:36.000Z",
    updatedTime: "2025-05-01T08:54:12.000Z",
    content: "文章内容...",
    likes: 18,
    commentCount: 7,
    author: {
      id: "33ef8b96-21d5-11f0-9294-0242ac110002",
      name: "超级管理员",
      email: "111",
      tips: "该用户很懒",
      avatar: "https://zw997.top/zwapp/default/boy.jpeg",
    },
    isLiked: 1,
    tags: [
      {
        id: 1,
        name: "前端开发",
        color: "oklch(0.554 0.241 27.162)",
      },
      {
        id: 3,
        name: "TypeScript",
        color: "oklch(0.451 0.241 252.522)",
      },
    ],
  },
];

const mockUser: User = {
  id: "33ef8b96-21d5-11f0-9294-0242ac110002",
  name: "超级管理员",
  tips: "该用户很懒",
  avatar: "https://zw997.top/zwapp/default/boy.jpeg",
  email: "1033460361@qq.com",
  createdTime: "2025-04-25T05:00:03.000Z",
  updatedTime: "2025-04-25T05:00:03.000Z",
  roles: [],
  permissions: [],
};

const mockComments: Comment[] = [
  {
    id: 1,
    content: "这篇文章非常实用，感谢分享！",
    createdTime: "2025-05-04T08:15:27.000Z",
    author: {
      id: "33ef8c14-21d5-11f0-9294-0242ac110002",
      name: "技术爱好者",
      email: "111",
      tips: "前端开发者",
      avatar: "https://zw997.top/zwapp/default/girl.jpeg",
    },
    articleId: 1,
    childComments: [
      {
        id: 2,
        content: "谢谢你的支持！后续会有更多内容分享。",
        createdTime: "2025-05-04T09:22:15.000Z",
        author: {
          id: "33ef8b96-21d5-11f0-9294-0242ac110002",
          name: "超级管理员",
          email: "111",
          tips: "该用户很懒",
          avatar: "https://zw997.top/zwapp/default/boy.jpeg",
        },
        articleId: 1,
        parentId: 1,
        replyTo: {
          id: "33ef8c14-21d5-11f0-9294-0242ac110002",
          name: "技术爱好者",
          email: "111",
          tips: "前端开发者",
          avatar: "https://zw997.top/zwapp/default/girl.jpeg",
        },
      },
    ],
  },
  {
    id: 3,
    content: "有一些概念我还不太理解，能否做更详细的解释？",
    createdTime: "2025-05-05T14:37:48.000Z",
    author: {
      id: "33ef8d36-21d5-11f0-9294-0242ac110002",
      name: "学习者",
      email: "111",
      tips: "持续学习中",
      avatar: "https://zw997.top/zwapp/default/boy.jpeg",
    },
    articleId: 1,
    childComments: [],
  },
];

export const getArticles = async (
  page = 1,
  pageSize = 10
): Promise<listRes<Article>> =>
  zwFetch("/api/article", { query: { page, pageSize } });

export const getArticleById = async (id: number) =>
  zwFetch<Article>(`/api/article/${id}`);

export const getCurrentUser = async (): Promise<User> => {
  return mockUser;
};

export const likeArticle = async (
  articleId: number
): Promise<{ success: boolean }> => {
  // 模拟点赞操作
  const article = mockArticles.find((a) => a.id === articleId);
  if (article) {
    article.isLiked = article.isLiked === 1 ? 0 : 1;
    article.likes =
      article.isLiked === 1 ? article.likes + 1 : article.likes - 1;
  }

  return { success: true };
};
