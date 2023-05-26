import { type UserRepository } from "../domain/user.repository";
import { type User } from "../domain/user.entity";
import { type Query } from "../../../common/types";
import UserModel from "./user.model";

export default function userMongooseRepository(): UserRepository {
  return {
    async save({
      email,
      password,
      role,
      acceptedTerm,
    }: Partial<User>): Promise<User> {
      return await UserModel.create({ email, password, role, acceptedTerm });
    },
    async delete(id: any): Promise<boolean> {
      throw new Error("not implemented");
    },
    async getById(id: any): Promise<User | null> {
      throw new Error("not implemented");
    },
    async getMatching(query: Query<User> | undefined): Promise<User[]> {
      return await UserModel.find().exec();
    },
    async update(payload: Partial<User>): Promise<User | null> {
      throw new Error("not implemented");
    },
    async existsByEmail(email: string): Promise<boolean> {
      const user = await UserModel.exists({ email });
      return user !== null;
    },
    async findByEmail(email: string): Promise<User | null> {
      return await UserModel.findOne({ email }).exec();
    },
  };
}
