import { Router } from 'express';
import { app } from '..';
import { ENV } from './envClass/envClass';
import { testRoutes } from './http/test';

function mergeRoutes(): Router[] {
  const routesArrays: Router[][] = [testRoutes()];

  const finalArray: Router[] = routesArrays.reduce(
    (acc, cur) => acc.concat(cur),
    [],
  );
  return finalArray;
}

export function apiLoader() {
  const allRouters: any[] = mergeRoutes();

  for (const router of allRouters) {
    app.use(`/api/v${ENV.getVar('VERSION')}`, router.router);
  }
}
