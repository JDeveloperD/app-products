import swaggerUi from "swagger-ui-express";
import openApiDocs from "./openapi.json";

const setup = () => swaggerUi.setup(openApiDocs, { explorer: true });

export default {
  setup,
};
