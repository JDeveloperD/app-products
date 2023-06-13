/*
Code Analysis

Objective:
The objective of the passwordValueObject.createPassword function is to validate a password string based on predefined minimum and maximum length criteria and return an Either type with either an error message or the validated password.

Inputs:
- PasswordProps object containing a string value for the password.

Flow:
- Check if the length of the password is less than the minimum length.
- If it is, return an Either type with an error message.
- Check if the length of the password is greater than the maximum length.
- If it is, return an Either type with an error message.
- If the password length is within the valid range, return an Either type with the validated password.

Outputs:
- Either type with either an error message or the validated password.

Additional aspects:
- The function uses the fp-ts/Either library to handle the return type.
- The minimum and maximum password length criteria are defined as constants.
- The function uses bcrypt for password hashing, but this is not relevant to the current implementation.
*/

import { describe, expect, test } from "@jest/globals";
import passwordValueObject, {
  ERROR_INVALID_PASSWORD_MAX_LENGTH,
  ERROR_INVALID_PASSWORD_MIN_LENGTH,
  ERROR_REQUIRED_PASSWORD,
  type PasswordProps,
} from "./password.value-object";
import { getLeft, getRight, some } from "fp-ts/Option";

describe("passwordValueObject.createPassword_function", () => {
  // Tests that passwordValueObject.createPassword returns a right Either type with a valid password.
  test("test_create_password_returns_right_with_valid_password", () => {
    const password: PasswordProps = { value: "validpassword" };
    const result = passwordValueObject.createPassword(password);
    expect(result._tag).toBe("Right");
    expect(getRight(result)).toEqual(some(password));
  });

  // Tests that passwordValueObject.createPassword returns a left Either type with an error message when password length is below the minimum valid length.
  test("test_create_password_returns_left_with_password_below_min_length", () => {
    const password: PasswordProps = { value: "short" };
    const result = passwordValueObject.createPassword(password);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toEqual(some(ERROR_INVALID_PASSWORD_MIN_LENGTH));
  });
  //
  // Tests that passwordValueObject.createPassword returns a left Either type with an error message when password length is above the maximum valid length.
  test("test_create_password_returns_left_with_password_above_max_length", () => {
    const password: PasswordProps = { value: "thispasswordistoolong" };
    const result = passwordValueObject.createPassword(password);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toEqual(some(ERROR_INVALID_PASSWORD_MAX_LENGTH));
  });

  // Tests that passwordValueObject.createPassword returns a left Either type with an error message when password is empty.
  test("test_create_password_returns_left_with_empty_password", () => {
    const password: PasswordProps = { value: "" };
    const result = passwordValueObject.createPassword(password);
    expect(result._tag).toBe("Left");
    expect(getLeft(result)).toEqual(some(ERROR_REQUIRED_PASSWORD));
  });
});
