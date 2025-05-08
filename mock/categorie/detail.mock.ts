import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock({
  url: '/api/categorie/5',
  body: {
    id: 5,
    createdTime: '2025-05-08T03:35:34.000Z',
    updatedTime: '2025-05-08T03:35:34.000Z',
    name: '技术分享',
    color: 'oklch(0.554 0.241 27.162)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    sort: 0,
    desc: '分享前端、后端、移动端等技术文章',
  },
});
