import { type SignUpDto } from "./sign-up.dto";
import * as either from "fp-ts/Either";
import {
  passwordValueObject,
  type Role,
  type User,
  type UserRepository,
} from "../../domain";
import { type UseCase } from "../../../../common";
import emailValueObject from "../../../../common/domain/value-objects/email/email.value-object";

export default function signUpUseCase(
  repository: UserRepository
): UseCase<SignUpDto, either.Either<string, User>> {
  return {
    execute: async function (
      dto: SignUpDto
    ): Promise<either.Either<string, User>> {
      if (!dto.acceptedTerm) {
        return either.left("You must accept the terms");
      }

      const emailOrError = emailValueObject.createEmail({ value: dto.email });

      if (either.isLeft(emailOrError)) {
        return either.left(emailOrError.left);
      }

      const passwordOrError = passwordValueObject.createPassword({
        value: dto.password,
      });

      if (either.isLeft(passwordOrError)) {
        return either.left(passwordOrError.left);
      }

      try {
        const isEmailAlreadyInUse = await repository.existsByEmail(dto.email);

        if (isEmailAlreadyInUse) {
          return either.left("Email Already in use");
        }

        const email = emailOrError.right.value;
        const password = await passwordValueObject.encryptPassword(
          passwordOrError.right.value
        );
        const role: Role = "CLIENT";
        const { acceptedTerm } = dto;

        const user: Partial<User> = {
          email,
          password,
          role,
          acceptedTerm,
        };

        const userCreated = await repository.save(user);

        return either.right(userCreated);
      } catch (e) {
        return either.left("Internal Server Error on SignUp UseCase");
      }
    },
  };
}
