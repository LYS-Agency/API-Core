import { User } from '../../custom/database/Schemas/Users';
import { makeRoute } from '../createRoutes';

export const testRoutes = () => {
  return makeRoute([
    {
      schema: User,
      name: 'Test Get',
      request: 'post',
      path: '/test',
      params: [{ key: 'name', getter: 'body', mandatory: true }],
      functionPropeties: {
        functionDB: 'create',
        request: '{name: req.body.name}',
      },
    },
  ]);
};
