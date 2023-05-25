import { type Request, type Response, Router } from "express";
import { userUseCases } from "./user.deps";

const userRouter = Router();

const userController = {
  SignUp: userRouter.post("/users", async (req: Request, res: Response) => {
    const { email, password, acceptedTerm } = req.body;
    const result = await userUseCases.signUp.execute({
      email,
      password,
      acceptedTerm,
    });
    res.json(result);
  }),
  DeleteUser: userRouter.delete(
    "/users/:id",
    (_req: Request, res: Response) => {
      return res.json("ok");
    }
  ),
  GetUser: userRouter.get("/users/:id", (_req: Request, res: Response) => {
    return res.json("ok");
  }),
  GetUsers: userRouter.get("/users", (_req: Request, res: Response) => {
    return res.json([]);
  }),
};

export default userController;
