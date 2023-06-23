import * as either from "fp-ts/Either";
import { type SignUpDto } from "./sign-up.dto";
import {
  passwordValueObject,
  type Role,
  type User,
  type UserRepository,
} from "../../domain";
import { type UseCase, emailValueObject } from "../../../../common";
import { type ErrorResponse } from "../../../../utils/handle-response/handle-response";
import { FailResponse } from "../../../../utils/handle-response/response.enum";

export default function signUpUseCase(
  repository: UserRepository
): UseCase<SignUpDto, either.Either<ErrorResponse, User>> {
  return {
    async execute(dto: SignUpDto): Promise<either.Either<ErrorResponse, User>> {
      if (!dto.acceptedTerm) {
        return either.left({
          kind: FailResponse.INVALID_DATA,
          message: "You must accept the terms",
        });
      }

      const emailOrError = emailValueObject.createEmail({ value: dto.email });

      if (either.isLeft(emailOrError)) {
        return either.left({
          kind: FailResponse.INVALID_DATA,
          message: emailOrError.left,
        });
      }

      const passwordOrError = passwordValueObject.createPassword({
        value: dto.password,
      });

      if (either.isLeft(passwordOrError)) {
        return either.left({
          kind: FailResponse.INVALID_DATA,
          message: passwordOrError.left,
        });
      }

      try {
        const isEmailAlreadyInUse = await repository.existsByEmail(dto.email);

        if (isEmailAlreadyInUse) {
          return either.left({
            kind: FailResponse.INVALID_DATA,
            message: "Email Already in use",
          });
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
        return either.left({
          kind: FailResponse.SERVER_ERROR,
          message: "Internal Server Error on SignUp UseCase",
        });
      }
    },
  };
}
