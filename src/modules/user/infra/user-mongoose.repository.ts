import UserModel from "./user.model";
import { type User, type UserId, type UserRepository } from "../domain";
import { type Query } from "../../../common";

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
    async delete(id: UserId): Promise<boolean> {
      throw new Error("not implemented");
    },
    async getById(id: UserId): Promise<User | null> {
      return await UserModel.findOne({ _id: id }, { password: 0 });
    },
    async getMatching(query: Query<User> | undefined): Promise<User[]> {
      return await UserModel.find({}, { password: 0 }).exec();
    },
    async update(payload: Partial<User>): Promise<User | null> {
      throw new Error("not implemented");
    },
    async existsByEmail(email: string): Promise<boolean> {
      const user = await UserModel.exists({ email });
      return user !== null;
    },
    async findByEmail(email: string): Promise<User | null> {
      return await UserModel.findOne({ email });
    },
  };
}
