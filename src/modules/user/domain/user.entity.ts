import * as either from "fp-ts/Either";
import { type Role } from "./user-roles.enum";
import { type UID } from "../../../common";

export type UserId = UID;

export interface User {
  id: UserId;
  email: string;
  password: string;
  role: Role;
  isTheEmailConfirmed: boolean;
  isActive: boolean;
  acceptedTerm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const createUser = (user: User): either.Either<never, User> => {
  return either.right(user);
};

const toggleActivate = (user: User): User => {
  return {
    ...user,
    isActive: !user.isActive,
    updatedAt: new Date(),
  };
};

const confirmEmail = (user: User): User => {
  return {
    ...user,
    isTheEmailConfirmed: true,
    updatedAt: new Date(),
  };
};

const changeRole = ({ user, role }: { user: User; role: Role }): User => {
  return {
    ...user,
    role,
    updatedAt: new Date(),
  };
};

export default {
  createUser,
  changeRole,
  confirmEmail,
  toggleActivate,
};
