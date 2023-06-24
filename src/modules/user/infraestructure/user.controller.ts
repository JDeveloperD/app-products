import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";
import UserService from "../application/user.service";

@controller("/users")
export default class UserController implements interfaces.Controller {
  constructor(private userService: UserService) {}

  @httpGet("/")
  public index(@request() req: Request, @response() res: Response) {
    this.userService.getUsers();
    return res.json("all users");
  }

  @httpGet("/:id")
  public findById(@request() req: Request, @response() res: Response) {
    this.userService.getProfile();
    return res.json("find user");
  }

  @httpPost("/")
  public create(@request() req: Request, @response() res: Response) {
    this.userService.createUser();
    return res.json("create user");
  }

  @httpPut("/:id")
  public update(@request() req: Request, @response() res: Response) {
    this.userService.updateProfile();
    return res.json("update user");
  }

  @httpPost("/sign-up")
  public signUp(@request() req: Request, @response() res: Response) {
    this.userService.signUp();
    return res.json("sign up");
  }

  @httpPost("/sign-in")
  public signIn(@request() req: Request, @response() res: Response) {
    this.userService.signIn();
    return res.json("sign up");
  }

  @httpDelete("/:id")
  public deleteById(@request() req: Request, @response() res: Response) {
    this.userService.deleteUser();
    return res.json("delete user");
  }
}
