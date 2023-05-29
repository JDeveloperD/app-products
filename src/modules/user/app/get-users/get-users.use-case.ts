import * as either from "fp-ts/Either";
import { type User, type UserRepository } from "../../domain";
import { type UseCase } from "../../../../common";

export default function getUsersUSeCase(
  repository: UserRepository
): UseCase<undefined, either.Either<unknown, User[]>> {
  return {
    async execute(): Promise<either.Either<unknown, User[]>> {
      const users = await repository.getMatching();
      return either.right(users);
    },
  };
}
