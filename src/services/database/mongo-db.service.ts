import mongoose from "mongoose";
import config from "../../utils/config";
import { isDev, isTest } from "../../utils/env";

function init(): void {
  const url = config.MONGODB_STRING_CONNECTION;

  mongoose
    .connect(url)
    .then(() => {
      console.log(`✔️ [DB] =>${url}`);
      if (isDev || isTest) {
        mongoose.set("debug", true);
        console.log(mongoose.models);
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

export default {
  init,
};
