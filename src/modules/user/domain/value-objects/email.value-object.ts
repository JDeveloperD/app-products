import { type Either, left, right } from "fp-ts/Either";
import { isValidEmail } from "../../../../utils/is-valid-email/is-valid-email";

export const ERROR_INVALID_EMAIL_FORMAT = "Invalid email format";

export interface EmailProps {
  value: string;
}

export const createEmail = ({
  value,
}: EmailProps): Either<string, EmailProps> => {
  const isValid = isValidEmail(value);

  if (!isValid) {
    return left(ERROR_INVALID_EMAIL_FORMAT);
  }

  const lowerCaseEmail = value.toLowerCase();

  return right({ value: lowerCaseEmail });
};
