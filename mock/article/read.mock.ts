import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock({
  url: '/api/article/read/1',
  method: 'PUT',
  body: {},
});
