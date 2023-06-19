import express, { type Express } from "express";
import cors from "cors";
import routerApi from "./router/api";
import routerDocs from "./router/docs";
import passport from "passport";
import passportAuthService from "./services/auth/passport-auth.service";
import logger from "./utils/logger";
import {
  generalErrorHandler,
  handleNotFoundRoute,
} from "./utils/handle-response/handle-response";

function init(): Express {
  const app = express();
  passport.use(passportAuthService.getJwtStrategy());

  return app
    .use(cors({}))
    .use(logger.init())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/api", routerApi.init())
    .use("/docs", routerDocs.init())
    .use(handleNotFoundRoute)
    .use(generalErrorHandler);
}

export default {
  init,
};
