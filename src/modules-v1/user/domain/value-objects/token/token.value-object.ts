import jwt from "jsonwebtoken";
import config from "../../../../../utils/config";
import { type Role } from "../../user-roles.enum";
import { type UserId } from "../../user.entity";

export type Token = string;

export interface TokenPayload {
  id: UserId;
  role: Role;
}

const createToken = (payload: TokenPayload): Token =>
  jwt.sign(payload, config.JWT_SECRET_ACCESS_KEY, {
    expiresIn: 60 * 60 * 12,
  });

export default {
  createToken,
};
