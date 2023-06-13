import * as either from "fp-ts/Either";
import { type UseCase } from "../../../../common";
import { type Role, type UserId, type UserRepository } from "../../domain";
import { FailResponse } from "../../../../common/infra/response.enum";
import { type ErrorResponse } from "../../../../utils/handle-response";

export interface DeleteUserDto {
  id: UserId;
  role: Role;
}

export default function deleteUserUseCase(
  userRepository: UserRepository
): UseCase<DeleteUserDto, either.Either<ErrorResponse, void>> {
  return {
    async execute(
      dto: DeleteUserDto
    ): Promise<either.Either<ErrorResponse, void>> {
      try {
        const userFound = await userRepository.getById(dto.id);

        if (userFound == null) {
          return either.left({
            kind: FailResponse.RESOURCE_NOT_FOUND,
            message: "User does not exists",
          });
        }

        if (dto.role !== "DEVELOPER") {
          if (dto.role === "ADMIN" && userFound.role === "DEVELOPER") {
            return either.left({
              kind: FailResponse.UNAUTHORIZED,
              message: "This user cannot be deleted.",
            });
          }
        }

        await userRepository.delete(dto.id);

        return either.right(undefined);
      } catch (e) {
        return either.left({
          kind: FailResponse.SERVER_ERROR,
          message: "Internal Server Error on Delete Collection User Use Case",
        });
      }
    },
  };
}
