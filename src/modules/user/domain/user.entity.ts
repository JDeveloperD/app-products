import { type Either, right } from "fp-ts/Either";
import { type UID } from "../../../common/types";

export type UserId = UID;

export enum Roles {
  "DEVELOPER",
  "ADMIN",
  "CLIENT",
}

export type Role = keyof typeof Roles;

export interface User {
  id: UserId;
  email: string;
  password: string;
  role: Role;
  isTheEmailConfirmed: boolean;
  isActive: boolean;
  acceptedTerm: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createUser = (user: User): Either<never, User> => {
  return right(user);
};

export const toggleActivate = (user: User): User => {
  return {
    ...user,
    isActive: !user.isActive,
    updatedAt: new Date(),
  };
};

export const confirmEmail = (user: User): User => {
  return {
    ...user,
    isTheEmailConfirmed: true,
    updatedAt: new Date(),
  };
};
export const changeRole = ({
  user,
  role,
}: {
  user: User;
  role: Role;
}): User => {
  return {
    ...user,
    role,
    updatedAt: new Date(),
  };
};
