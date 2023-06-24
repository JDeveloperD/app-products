import * as either from "fp-ts/Either";
import bcrypt from "bcrypt";

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 21;
export const ERROR_REQUIRED_PASSWORD = "Password is required";
export const ERROR_INVALID_PASSWORD_MIN_LENGTH = `Password should has min ${MIN_PASSWORD_LENGTH}`;
export const ERROR_INVALID_PASSWORD_MAX_LENGTH = `Password should has max ${MAX_PASSWORD_LENGTH}`;

export interface PasswordProps {
  value: string;
}

const createPassword = (
  password: PasswordProps
): either.Either<string, PasswordProps> => {
  if (password.value === "" || password.value === null) {
    return either.left(ERROR_REQUIRED_PASSWORD);
  }
  if (password.value.length < MIN_PASSWORD_LENGTH) {
    return either.left(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  }
  if (password.value.length > MAX_PASSWORD_LENGTH) {
    return either.left(ERROR_INVALID_PASSWORD_MAX_LENGTH);
  }

  return either.right(password);
};

const comparePassword = async (
  hash: string,
  plainText: string
): Promise<boolean> => bcrypt.compare(plainText, hash);

const encryptPassword = async (plainText: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainText, salt);
};

export default {
  createPassword,
  comparePassword,
  encryptPassword,
};
