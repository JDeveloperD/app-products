import express, { type Express } from "express";
import cors from "cors";
import router from "./router/router";
import { userModule } from "./modules";

function init(): Express {
  const app = express();
  const routerV1 = router.init({ modules: [userModule] });

  return app
    .use(cors({}))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/api/v1", routerV1);
}

export default {
  init,
};
