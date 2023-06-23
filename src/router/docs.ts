import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import docs from "../docs/setup";

function init(): Router {
  const docsRouter = Router();

  docsRouter.use("/v1", swaggerUi.serve, docs.setup());

  return docsRouter;
}

export default {
  init,
};
