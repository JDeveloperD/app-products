import { type User } from "./user.entity";
import { type Repository } from "../../../common";

export interface UserRepository extends Repository<User> {
  existsByEmail: (email: string) => Promise<boolean>;
  findByEmail: (email: string) => Promise<User | null>;
}
