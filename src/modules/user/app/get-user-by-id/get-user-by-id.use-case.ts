import * as either from "fp-ts/Either";
import { type GetUserByIdDto } from "./get-user-by-id.dto";
import { type User, type UserRepository } from "../../domain";
import { type UseCase } from "../../../../common";
import { FailResponse } from "../../../../common/infra/response.enum";
import { type ErrorResponse } from "../../../../utils/handle-response/handle-response";

export default function getUserByIdUseCase(
  repository: UserRepository
): UseCase<GetUserByIdDto, either.Either<ErrorResponse, User>> {
  return {
    async execute(
      dto: GetUserByIdDto
    ): Promise<either.Either<ErrorResponse, User>> {
      try {
        const user = await repository.getById(dto.id);

        if (user === null) {
          return either.left({
            kind: FailResponse.RESOURCE_NOT_FOUND,
            message: "User not found",
          });
        }

        return either.right(user);
      } catch (e) {
        return either.left({
          kind: FailResponse.SERVER_ERROR,
          message: "Internal Server Error on Get User Use Case",
        });
      }
    },
  };
}
