import * as either from "fp-ts/Either";
import { type GetProfileDto } from "./get-profile.dto";
import { type User, type UserRepository } from "../../domain";
import { type UseCase } from "../../../../common";
import { type ErrorResponse } from "../../../../utils/handle-response/handle-response";
import { FailResponse } from "../../../../utils/handle-response/response.enum";

export default function getProfileUseCase(
  repository: UserRepository
): UseCase<GetProfileDto, either.Either<ErrorResponse, User>> {
  return {
    async execute(
      dto: GetProfileDto
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
