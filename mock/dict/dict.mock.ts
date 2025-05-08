import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock({
  url: '/api/dict/code',
  body: () => {
    return [
      {
        id: 48,
        code: 'header_nav',
        type: 'json',
        value:
          '[{"label":"首页","path":"/"},{"label":"分类","path":"/categories"},{"label":"标签","path":"/tags"},{"label":"关于","path":"/about"}]',
        description: '',
        sort: 0,
        parentId: 0,
        status: 1,
        createdTime: '2025-05-08T07:39:11.000Z',
        updatedTime: '2025-05-08T07:39:11.000Z',
      },
      {
        id: 46,
        code: 'websit',
        type: 'json',
        value: '{"name":"岁岁平安"}',
        description: '',
        sort: 0,
        parentId: 0,
        status: 1,
        createdTime: '2025-05-08T07:38:34.000Z',
        updatedTime: '2025-05-08T07:38:34.000Z',
      },
    ];
  },
});
