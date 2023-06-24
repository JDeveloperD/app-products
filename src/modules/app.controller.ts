import * as express from "express";
import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

@controller("/")
export default class AppController extends BaseHttpController {
  @httpGet("/")
  public index(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    return res.json({
      name: "App products",
      author: "JDeveloper",
      version: "1",
    });
  }
}
