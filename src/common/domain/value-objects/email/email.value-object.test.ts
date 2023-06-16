/*
Code Analysis

Objective:
The objective of the createEmail function is to validate and transform an email address provided as input, returning an Either type with either an error message or the transformed email address.

Inputs:
- An object of type EmailProps, containing a string value representing an email address.

Flow:
1. The function calls the isValidEmail function to check if the email address is valid.
2. If the email address is not valid, the function returns an Either type with an error message.
3. If the email address is valid, the function transforms the email address to lowercase and returns an Either type with the transformed email address.

Outputs:
- An Either type with either an error message or the transformed email address.

Additional aspects:
- The function uses the isValidEmail function from an external module to validate the email address.
- The function defines a constant ERROR_INVALID_EMAIL_FORMAT to be used as the error message in case the email address is not valid.
- The function transforms the email address to lowercase before returning it.
*/

import { describe, expect, it } from "@jest/globals";
import emailValueObject, {
  type EmailProps,
  ERROR_INVALID_EMAIL_FORMAT,
} from "./email.value-object";
import { getLeft, getRight, some } from "fp-ts/Option";

describe("createEmail_function", () => {
  // Tests that a valid email is correctly processed
  it("test_valid_email", () => {
    const email: EmailProps = { value: "test@example.com" };
    const result = emailValueObject.createEmail(email);
    expect(result._tag).toBe("Right");
    expect(getRight(result)).toEqual(some(email));
  });

  // Tests that an invalid email is correctly processed
  it("test_invalid_email", () => {
    const email: EmailProps = { value: "invalid_email" };
    const result = emailValueObject.createEmail(email);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toStrictEqual(some(ERROR_INVALID_EMAIL_FORMAT));
  });

  // Tests that an empty email is correctly processed
  it("test_empty_email", () => {
    const email: EmailProps = { value: "" };
    const result = emailValueObject.createEmail(email);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toStrictEqual(some(ERROR_INVALID_EMAIL_FORMAT));
  });

  // Tests that a too long email is correctly processed
  it("test_long_email", () => {
    const email: EmailProps = { value: "a".repeat(320) + "@example.com" };
    const result = emailValueObject.createEmail(email);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toStrictEqual(some(ERROR_INVALID_EMAIL_FORMAT));
  });

  // Tests that email value is converted to lowercase
  it("test_email_lowercase", () => {
    const email: EmailProps = { value: "TeSt@ExAmPlE.CoM" };
    const result = emailValueObject.createEmail(email);
    expect(result._tag).toBe("Right");
    expect(getRight(result)).toEqual(some({ value: "test@example.com" }));
  });
});
