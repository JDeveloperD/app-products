import userController from "./infra/user.controller";
import { type Module } from "../../common";
import { userRepository } from "./infra/user.deps";

const userModule: Module = {
  repository: userRepository,
  controller: userController,
};

export default userModule;
