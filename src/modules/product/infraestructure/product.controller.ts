import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";

@controller("/products")
export default class ProductController implements interfaces.Controller {
  @httpGet("/")
  public index(@request() req: Request, @response() res: Response) {
    return res.json("all products");
  }

  @httpGet("/:id")
  public findById(@request() req: Request, @response() res: Response) {
    return res.json("find product");
  }

  @httpPost("/")
  public signUp(@request() req: Request, @response() res: Response) {
    return res.json("register product");
  }

  @httpDelete("/:id")
  public deleteById(@request() req: Request, @response() res: Response) {
    return res.json("delete product");
  }
}
