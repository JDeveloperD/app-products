import http from "http";
import app from "./app";
import config from "./utils/config";
import mongoDbService from "./services/database/mongo-db.service";

http.createServer(app.init()).listen(config.PORT, () => {
  console.log(`✔️ [server] => ${`${config.HOST}:${config.PORT}`} `);
  mongoDbService.init();
});
