import { type Either, left, right } from "fp-ts/Either";
import { isValidEmail } from "../../../../utils/is-valid-email/is-valid-email";

export const ERROR_INVALID_EMAIL_FORMAT = "Invalid email format";

export interface EmailProps {
  value: string;
}

const createEmail = (email: EmailProps): Either<string, EmailProps> => {
  const isValid = isValidEmail(email.value);

  if (!isValid) {
    return left(ERROR_INVALID_EMAIL_FORMAT);
  }

  const lowerCaseEmail = email.value.toLowerCase();

  return right({ value: lowerCaseEmail });
};

export default {
  createEmail,
};
