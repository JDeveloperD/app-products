import { type Request, type Response, Router } from "express";
import { userUseCases } from "./user.deps";
import * as either from "fp-ts/Either";
import userMiddleware from "./user.middleware";

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
        return res.status(400).json({
          kind: "INVALID_DATA",
          error: result.left,
        });
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
        return res.status(401).json({
          kind: "UNAUTHORIZED",
          error: result.left,
        });
      }

      return res.json(result.right);
    }
  ),
  DeleteUser: userRouter.delete(
    "/users/:id",
    (_req: Request, res: Response) => {
      return res.json("ok");
    }
  ),
  GetUser: userRouter.get(
    "/users/:id",
    userMiddleware.requireAuth,
    userMiddleware.requireAdminRole,
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const result = await userUseCases.getUser.execute({ id });

      if (either.isLeft(result)) {
        return res.status(404).json({ kind: "NOT_FOUND", error: result.left });
      }

      return res.json({ user: result.right });
    }
  ),
  GetUsers: userRouter.get(
    "/users",
    userMiddleware.requireAuth,
    userMiddleware.requireAdminRole,
    async (_req: Request, res: Response) => {
      const result = await userUseCases.getUsers.execute(undefined);
      if (either.isLeft(result)) {
        return res.json({ kind: "EMPTY" });
      }
      const users = result.right;

      return res.json({ users });
    }
  ),
};

export default userController;
