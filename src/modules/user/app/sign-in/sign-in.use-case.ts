import * as either from "fp-ts/Either";
import { type SignInDto } from "./sign-in.dto";
import {
  passwordValueObject,
  tokenValueObject,
  type UserRepository,
} from "../../domain";
import { type UseCase } from "../../../../common";
import { type ErrorResponse } from "../../../../utils/handle-response/handle-response";
import { FailResponse } from "../../../../common/infra/response.enum";

export default function signInUseCase(
  repository: UserRepository
): UseCase<SignInDto, either.Either<ErrorResponse, { token: string }>> {
  return {
    async execute(
      dto: SignInDto
    ): Promise<either.Either<ErrorResponse, { token: string }>> {
      try {
        const user = await repository.findByEmail(dto.email);

        if (user === null) {
          return either.left({
            kind: FailResponse.INVALID_DATA,
            message: "Invalid email or password",
          });
        }

        const passwordMatch = await passwordValueObject.comparePassword(
          user.password,
          dto.password
        );

        if (!passwordMatch) {
          return either.left({
            kind: FailResponse.INVALID_DATA,
            message: "Invalid email or password",
          });
        }

        const token = tokenValueObject.createToken({
          id: user.id,
          role: user.role,
        });

        return either.right({ token });
      } catch (e) {
        return either.left({
          kind: FailResponse.SERVER_ERROR,
          message: "Internal Server Error on SignIn Use Case",
        });
      }
    },
  };
}
