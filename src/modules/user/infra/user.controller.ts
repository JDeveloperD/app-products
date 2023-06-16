import { type Request, type Response, Router } from "express";
import * as either from "fp-ts/Either";
import { objectKeysToCamelCaseV2 } from "keys-converter";
import { type User } from "../domain";
import { middleware } from "../../../common";
import { handleErrorResponse } from "../../../utils/handle-response/handle-response";
import { userUseCases } from "./user.deps";
import userMiddleware from "./user.middleware";
import { getUsersDto } from "../app/get-users/get-users.dto";

const userRouter = Router();

const userController = {
  SignUp: userRouter.post(
    "/users/sign-up",
    async (req: Request, res: Response) => {
      const { email, password, acceptedTerm } = req.body;
      const result = await userUseCases.signUp.execute({
        email,
        password,
        acceptedTerm,
      });

      if (either.isLeft(result)) {
        return handleErrorResponse(res, result.left);
      }

      return res.json(result.right);
    }
  ),
  SignIn: userRouter.post(
    "/users/sign-in",
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const result = await userUseCases.signIn.execute({
        email,
        password,
      });

      if (either.isLeft(result)) {
        return handleErrorResponse(res, result.left);
      }

      return res.json(result.right);
    }
  ),

  GetUser: userRouter.get(
    "/users/:id",
    middleware.validateParamId,
    userMiddleware.requireAuth,
    userMiddleware.requireAdminRole,
    async (req: Request, res: Response) => {
      const id = req.params.id;

      const result = await userUseCases.getUser.execute({ id });

      if (either.isLeft(result)) {
        return handleErrorResponse(res, result.left);
      }

      return res.json(result.right);
    }
  ),
  GetUsers: userRouter.get(
    "/users",
    userMiddleware.requireAuth,
    userMiddleware.requireAdminRole,
    async (req: Request, res: Response) => {
      const query: any = objectKeysToCamelCaseV2(req.query);
      const dto = getUsersDto(query);
      const result = await userUseCases.getUsers.execute(dto);

      if (either.isLeft(result)) {
        return handleErrorResponse(res, result.left);
      }

      const users = result.right;

      return res.json(users);
    }
  ),
  DeleteUser: userRouter.delete(
    "/users/:id",
    middleware.validateParamId,
    userMiddleware.requireAuth,
    userMiddleware.requireAdminRole,
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const userAuthenticated = req.user as User;
      const result = await userUseCases.deleteUser.execute({
        id,
        role: userAuthenticated.role,
      });

      if (either.isLeft(result)) {
        return handleErrorResponse(res, result.left);
      }

      return res.json("User deleted");
    }
  ),
};

export default userController;
