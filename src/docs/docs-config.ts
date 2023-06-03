import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { Router } from "express";

function init(): Router {
  const docsRouter = Router();

  docsRouter.use(
    "/users",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, { explorer: true })
  );

  return docsRouter;
}

const v1 = init();

export default {
  v1,
};
