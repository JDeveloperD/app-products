import * as either from "fp-ts/Either";
import { type GetUserByIdDto } from "./get-user-by-id.dto";
import { type User, type UserRepository } from "../../domain";
import { type UseCase } from "../../../../common";

export default function getUserByIdUseCase(
  repository: UserRepository
): UseCase<GetUserByIdDto, either.Either<string, User>> {
  return {
    async execute(dto: GetUserByIdDto): Promise<either.Either<string, User>> {
      const user = await repository.getById(dto.id);

      if (user === null) {
        return either.left("User not found");
      }

      return either.right(user);
    },
  };
}
