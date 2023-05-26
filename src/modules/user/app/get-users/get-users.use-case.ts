import { type UseCase } from "../../../../common/types";
import { type Either, right } from "fp-ts/Either";
import { type User } from "../../domain/user.entity";
import { type UserRepository } from "../../domain/user.repository";

export default function getUsersUSeCase(
  repository: UserRepository
): UseCase<undefined, Either<unknown, User[]>> {
  return {
    async execute(): Promise<Either<unknown, User[]>> {
      const users = await repository.getMatching();

      return right(users);
    },
  };
}
