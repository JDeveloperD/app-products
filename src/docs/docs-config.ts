import swaggerUi from "swagger-ui-express";
import openApiDocs from "./openapi.json";
import { Router } from "express";

function init(): Router {
  const docsRouter = Router();

  docsRouter.use(
    "/v1",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocs, { explorer: true })
  );

  return docsRouter;
}

export default {
  init,
};
