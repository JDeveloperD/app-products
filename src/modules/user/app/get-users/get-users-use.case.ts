import * as either from "fp-ts/Either";
import { type User, type UserRepository } from "../../domain";
import {
  type UseCase,
  type PaginateResult,
  type PaginateOptions,
} from "../../../../common";
import { type ErrorResponse } from "../../../../utils/handle-response/handle-response";
import { type GetUsersDto } from "./get-users.dto";
import { FailResponse } from "../../../../utils/handle-response/response.enum";

export default function getUsersUseCase(
  repository: UserRepository
): UseCase<GetUsersDto, either.Either<ErrorResponse, PaginateResult<User>>> {
  return {
    async execute(
      dto: GetUsersDto
    ): Promise<either.Either<ErrorResponse, PaginateResult<User>>> {
      try {
        const { limit, page, sort, filters } = dto.query;

        const paginationOptions: PaginateOptions = {
          limit,
          page,
          sort,
        };

        const resultPaginate = await repository.find({
          filters,
          paginationOptions,
        });

        return either.right(resultPaginate);
      } catch (e) {
        return either.left({
          kind: FailResponse.SERVER_ERROR,
          message: "Internal Server Error on Get Users Use Case",
        });
      }
    },
  };
}
