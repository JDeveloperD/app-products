import swaggerUi from "swagger-ui-express";
import openApiDocs from "./openapi.json";

export const docsSetup = swaggerUi.setup(openApiDocs, { explorer: true });
