import { type Repository } from "../../../common/types";
import { type User } from "./user.entity";

export interface UserRepository extends Repository<User> {
  existsByEmail: (email: string) => Promise<boolean>;
  findByEmail: (email: string) => Promise<User | null>;
}
