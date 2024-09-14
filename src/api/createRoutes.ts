import { Router } from 'express';
import { APIError } from './errors/ErrorsList/AbstractError';
import { checkParameters } from './middlewares/checkParameters';
import { Builder } from './type/builderType';

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
      if (builderField.params) {
        await checkParameters(builderField.params, req, res);
      }
      console.log('test');

      await handleDatabaseRequest();

      return res.send("Salut j'ai bien été la");
    } catch (error) {
      if (error instanceof APIError) {
        return res
          .status(error.code)
          .send({ error: error.name, message: error.message });
      }
      return res.status(500).send(error);
    }
  });
}

function handleDatabaseRequest() {
  throw new Error('Function not implemented.');
}
