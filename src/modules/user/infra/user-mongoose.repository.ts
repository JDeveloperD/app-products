import UserModel from "./user.model";
import { type User, type UserId, type UserRepository } from "../domain";
import { type PaginateResult } from "../../../common";

export default function userMongooseRepository(): UserRepository {
  return {
    async countResources(filters = {}): Promise<number> {
      return await UserModel.countDocuments(filters).exec();
    },
    async save({
      email,
      password,
      role,
      acceptedTerm,
    }: Partial<User>): Promise<User> {
      return await UserModel.create({ email, password, role, acceptedTerm });
    },
    async delete(id: UserId): Promise<void> {
      await UserModel.deleteOne({ _id: id });
    },
    async getById(id: UserId): Promise<User | null> {
      return await UserModel.findOne({ _id: id }, { password: 0 });
    },
    async find({
      filters = {},
      paginationOptions,
    }): Promise<PaginateResult<User>> {
      return await UserModel.paginate(filters, {
        ...paginationOptions,
        select: "-password",
      });
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
