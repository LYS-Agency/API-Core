import { makeRoute } from '../createRoutes';

export const testRoutes = () => {
  return makeRoute([
    {
      name: 'Test Get',
      request: 'get',
      functionDB: 'find',
      path: '/test',
      schema: 'users',
      params: [
        { key: 'test2', getter: 'body' },
        { key: 'test2', getter: 'query' },
      ],
    },
  ]);
};
