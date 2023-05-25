import userController from "./infra/user.controller";
import { type Module } from "../../common/types";

const userModule: Module = {
  controller: userController,
};

export default userModule;
