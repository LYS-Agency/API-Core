import { Builder } from '../type/builderType';
import { Router } from 'express';

export function makeRoute(builderField: Array<Builder>): Array<Router> {
  const routers: Array<Router> = [];

  for (const element of builderField) {
    routers.push(createRouter(element));
  }
  return routers;
}

function createRouter(builderField: Builder): any {
  const router = Router();
  routerLogic(builderField, router);
  return { router };
}

function routerLogic(builderField: Builder, router: Router) {
  // For middlewares
  // router.use(builderField.path)

  router[builderField.request](builderField.path, async (req, res, next) => {
    try {
      console.log('test');
      return res.send("Salut j'ai bien été la");
    } catch (error) {}
  });
}
