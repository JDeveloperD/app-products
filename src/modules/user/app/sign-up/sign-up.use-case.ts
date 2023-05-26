import { type UseCase } from "../../../../common/types";
import { type UserRepository } from "../../domain/user.repository";
import { type SignUpDto } from "./sign-up.dto";
import { type Either, isLeft, left, right } from "fp-ts/Either";
import {
  createPassword,
  encryptPassword,
} from "../../domain/value-objects/password.value-object";
import { type Role, type User } from "../../domain/user.entity";
import { createEmail } from "../../domain/value-objects/email.value-object";

export default function signUpUseCase(
  repository: UserRepository
): UseCase<SignUpDto, Either<string, User>> {
  return {
    execute: async function (dto: SignUpDto): Promise<Either<string, User>> {
      if (!dto.acceptedTerm) {
        return left("You must accept the terms");
      }

      const emailOrError = createEmail({ value: dto.email });

      if (isLeft(emailOrError)) {
        return left(emailOrError.left);
      }

      const passwordOrError = createPassword({ value: dto.password });

      if (isLeft(passwordOrError)) {
        return left(passwordOrError.left);
      }

      try {
        const isEmailAlreadyInUse = await repository.existsByEmail(dto.email);

        if (isEmailAlreadyInUse) {
          return left("Email Already in use");
        }

        const email = emailOrError.right.value;
        const password = await encryptPassword(passwordOrError.right.value);
        const role: Role = "CLIENT";
        const { acceptedTerm } = dto;

        const user: Partial<User> = {
          email,
          password,
          role,
          acceptedTerm,
        };

        const userCreated = await repository.save(user);

        return right(userCreated);
      } catch (e) {
        return left("Internal Server Error on SignUp UseCase");
      }
    },
  };
}
