import { defineMock } from "vite-plugin-mock-dev-server";
export default defineMock({
  url: "/api/dict/code",
  body: (params) => {
    return [
      {
        id: 43,
        code: "header_nav",
        type: "json",
        value:
          '\'[{"label":"首页","path":"/"},{"label":"分类","path":"/categories"},{"label":"标签","path":"/tags"},{"label":"关于","path":"/about"}]\'',
        description: "首页顶部的配置",
        sort: 0,
        parentId: 0,
        status: 1,
        createdTime: "2025-05-08T04:15:11.000Z",
        updatedTime: "2025-05-08T06:10:23.000Z",
      },
      {
        id: 44,
        code: "websit",
        type: "json",
        value: '\'{"name":"岁岁平安"}\'',
        description: "网站信息-站点名字等",
        sort: 0,
        parentId: 0,
        status: 1,
        createdTime: "2025-05-08T05:59:49.000Z",
        updatedTime: "2025-05-08T06:30:05.000Z",
      },
    ];
  },
});
