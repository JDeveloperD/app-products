import { Router } from "express";
import { type Module } from "../common";
import { userModule } from "../modules";

function init({ modules }: { modules: Module[] }): Router {
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

const v1 = init({ modules: [userModule] });

export default {
  v1,
};
