import express, { type Express } from "express";
import cors from "cors";
import routerApi from "./router/api";
import routerDocs from "./router/docs";
import passport from "passport";
import strategy from "./router/strategy";

function init(): Express {
  const app = express();
  passport.use(strategy.getStrategy());

  return app
    .use(cors({}))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/api", routerApi.init())
    .use("/docs", routerDocs.init());
}

export default {
  init,
};
