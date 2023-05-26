import { type UseCase } from "../../../../common/types";
import { type Either, left, right } from "fp-ts/Either";
import { type UserRepository } from "../../domain/user.repository";
import { type SignInDto } from "./sign-in.dto";
import { comparePassword } from "../../domain/value-objects/password.value-object";

export default function signInUseCase(
  repository: UserRepository
): UseCase<SignInDto, Either<string, { token: string }>> {
  return {
    async execute(dto: SignInDto): Promise<Either<string, { token: string }>> {
      const user = await repository.findByEmail(dto.email);

      if (user === null) {
        return left("Invalid email or password");
      }

      const passwordMatch = await comparePassword(user.password, dto.password);

      if (!passwordMatch) {
        return left("Invalid email or password");
      }

      const token = "3432432toijken";

      return right({ token });
    },
  };
}
