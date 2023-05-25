import { type UserRepository } from "../domain/user.repository";
import { type User } from "../domain/user.entity";
import { type Query } from "../../../common/types";
import userModel from "./user.model";

export default function userMongooseRepository(): UserRepository {
  const users: User[] = [
    {
      id: "1",
      email: "mail1@gmail.com",
      role: "CLIENT",
      password: "123456",
      isTheEmailConfirmed: true,
      isActive: false,
      acceptedTerm: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "mail2@gmail.com",
      role: "CLIENT",
      password: "123456",
      isTheEmailConfirmed: true,
      isActive: false,
      acceptedTerm: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      email: "mail3@gmail.com",
      role: "CLIENT",
      password: "123456",
      isTheEmailConfirmed: true,
      isActive: false,
      acceptedTerm: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return {
    async save(payload: User): Promise<User> {
      return await userModel.create(payload);
    },
    async delete(id: any): Promise<boolean> {
      return await Promise.resolve(false);
    },
    async getById(id: any): Promise<User | null> {
      const user = users.find((user) => user.id === id);

      if (user === undefined) return null;

      return user;
    },
    async getMatching(query: Query<User> | undefined): Promise<User[]> {
      return users;
    },
    async update(payload: User): Promise<User | null> {
      const index = users.findIndex((user) => user.id === payload.id);
      const exists = index !== -1;

      if (!exists) return null;

      users.splice(index, 1);
      users.push(payload);

      return payload;
    },
    async existsByEmail(email: string): Promise<boolean> {
      const index = users.findIndex((user) => user.email === email);
      return index !== -1;
    },
  };
}
