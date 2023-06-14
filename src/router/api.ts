import { Router } from "express";
import { type Module } from "../common";
import { userModule } from "../modules";

function prepareRoutes({ modules }: { modules: Module[] }): Router {
  const router = Router();

  modules.forEach((module) => {
    const { controller } = module;
    const methods = Object.keys(controller) as [];

    methods.forEach((method) => {
      router.use(controller[method]);
    });
  });

  return router;
}

function init(): Router {
  const apiRoutes = Router();
  const v1 = prepareRoutes({ modules: [userModule] });
  apiRoutes.use("/v1", v1);
  return apiRoutes;
}

export default {
  init,
};
