import mongoose from "mongoose";
import config from "../../utils/config";

export default {
  init,
};

function init(): void {
  const url = config.MONGODB_STRING_CONNECTION;

  mongoose
    .connect(url)
    .then(() => {
      console.log("✔️ [DB] =>" + url);
      console.log(mongoose.models);
    })
    .catch((e) => {
      console.error(e);
    });
}
