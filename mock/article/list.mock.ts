import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock({
  url: '/api/article',
  body: {
    list: [
      {
        id: 1,
        intro: '深入探讨ES6带来的重大改进，包括箭头函数、模板字符串、解构赋值等实用特性',
        title: '测试',
        createdTime: '2025-04-25T07:16:42.000Z',
        cover: 'http://localhost:8080/cover1.avif',
        views: 270,
        commentCount: 9,
        author: {
          id: '33ef8b96-21d5-11f0-9294-0242ac110002',
          name: '超级管理员',
          avatar: 'https://zw997.top/zwapp/default/boy.jpeg',
        },
        tags: [{ id: 4, name: ' 生活趣事', color: 'oklch(0.656 0.241 354.308)' }],
        likes: 1,
        isLiked: 0,
      },
    ],
    total: 1,
  },
});
