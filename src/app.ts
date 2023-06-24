import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as express from "express";
import * as http from "http";
import cors from "cors";
import logger from "./utils/logger";
import mongoDbService from "./services/database/mongo-db.service";
import config from "./utils/config";
import modules from "./modules";

interface ServerOptions {
  host: string;
  port: number;
}

export default class App {
  private static instance: App;

  private server: InversifyExpressServer;

  private constructor(private readonly serverOptions: ServerOptions) {
    this.server = new InversifyExpressServer(modules.container, null, {
      rootPath: "/api/v1",
    }).setConfig((app: express.Application) => {
      app
        .use(cors())
        .use(logger.init())
        .use(express.json({ limit: "1mb" }))
        .use(express.urlencoded({ extended: true }));
    });
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App({
        port: Number(config.PORT),
        host: config.HOST,
      });
    }

    return App.instance;
  }

  public buildApp(): express.Application {
    return this.server.build();
  }

  public serverStart(): void {
    mongoDbService.init();
    const app = this.buildApp();

    http.createServer(app).listen(this.serverOptions.port, () => {
      console.log(
        `✔️ [server] => ${`${this.serverOptions.host}:${this.serverOptions.port}`} `
      );
    });
  }
}
