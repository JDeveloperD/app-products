import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import { docsSetup } from "../docs/setup";

function init(): Router {
  const docsRouter = Router();

  docsRouter.use("/v1", swaggerUi.serve, docsSetup);

  return docsRouter;
}

export default {
  init,
};
