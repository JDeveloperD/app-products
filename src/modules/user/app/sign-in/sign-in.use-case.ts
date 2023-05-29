import * as either from "fp-ts/Either";
import { type SignInDto } from "./sign-in.dto";
import {
  passwordValueObject,
  tokenValueObject,
  type UserRepository,
} from "../../domain";
import { type UseCase } from "../../../../common";

export default function signInUseCase(
  repository: UserRepository
): UseCase<SignInDto, either.Either<string, { token: string }>> {
  return {
    async execute(
      dto: SignInDto
    ): Promise<either.Either<string, { token: string }>> {
      const user = await repository.findByEmail(dto.email);

      if (user === null) {
        return either.left("Invalid email or password");
      }

      const passwordMatch = await passwordValueObject.comparePassword(
        user.password,
        dto.password
      );

      if (!passwordMatch) {
        return either.left("Invalid email or password");
      }

      const token = tokenValueObject.createToken({
        id: user.id,
        role: user.role,
      });

      return either.right({ token });
    },
  };
}
