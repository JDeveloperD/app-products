import { type Either, left, right } from "fp-ts/Either";

export const MIN_PASSWORD_LENGTH = 5;
export const MAX_PASSWORD_LENGTH = 21;
export const ERROR_INVALID_PASSWORD_MIN_LENGTH = `Password should has min ${MIN_PASSWORD_LENGTH}`;
export const ERROR_INVALID_PASSWORD_MAX_LENGTH = `Password should has max ${MAX_PASSWORD_LENGTH}`;

export interface PasswordProps {
  value: string;
}

export const createPassword = ({
  value,
}: PasswordProps): Either<string, PasswordProps> => {
  if (value.length < MIN_PASSWORD_LENGTH) {
    return left(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  }
  if (value.length > MAX_PASSWORD_LENGTH) {
    return left(ERROR_INVALID_PASSWORD_MAX_LENGTH);
  }

  return right({ value });
};

export const comparePassword = (
  encryptText: string,
  plainText: string
): boolean => {
  return true;
};

export const encryptPassword = (plainText: string): string => {
  return "12!#!#";
};
