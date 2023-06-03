import express, { type Express } from "express";
import cors from "cors";
import router from "./router/router";
import passport from "passport";
import strategy from "./router/strategy";
import docsConfig from "./docs/docs-config";

function init(): Express {
  const app = express();
  passport.use(strategy.getStrategy());

  return app
    .use(cors({}))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/api/v1", router.v1)
    .use("/docs/v1", docsConfig.v1);
}

export default {
  init,
};
