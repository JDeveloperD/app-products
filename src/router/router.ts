import { Router } from "express";
import { type Module } from "../common/types";

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

export default {
  init,
};
