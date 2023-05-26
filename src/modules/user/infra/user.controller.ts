import { type Request, type Response, Router } from "express";
import { userUseCases } from "./user.deps";
import { isLeft } from "fp-ts/Either";

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

      if (isLeft(result)) {
        return res.status(400).json({
          kind: "INVALID_DATA",
          error: result.left,
        });
      }

      return res.json(result.right);
    }
  ),
  SignIn: userRouter.get(
    "/users/sign-in",
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const result = await userUseCases.signIn.execute({
        email,
        password,
      });

      if (isLeft(result)) {
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
  GetUser: userRouter.get("/users/:id", (_req: Request, res: Response) => {
    return res.json("ok");
  }),
  GetUsers: userRouter.get("/users", async (_req: Request, res: Response) => {
    const result = await userUseCases.getUsers.execute(undefined);
    if (isLeft(result)) {
      return res.json({ kind: "INVALID", error: result.left });
    }

    return res.json({ users: result.right });
  }),
};

export default userController;
