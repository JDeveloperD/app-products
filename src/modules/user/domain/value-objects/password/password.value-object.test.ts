/*
Code Analysis

Objective:
The objective of the createPassword function is to validate a password string and return an Either type with either an error message or the validated password.

Inputs:
- A PasswordProps object containing a value property which is a string representing the password.

Flow:
- Check if the length of the password is less than the minimum allowed length.
- If it is, return an Either type with an error message.
- Check if the length of the password is greater than the maximum allowed length.
- If it is, return an Either type with an error message.
- If the password length is within the allowed range, return an Either type with the validated password.

Outputs:
- Either type with an error message if the password is invalid.
- Either type with the validated password if the password is valid.

Additional aspects:
- The function uses the Either type from the fp-ts library to handle errors and return values.
- The function uses constants for the minimum and maximum allowed password lengths.
- The function uses template literals to create error messages with the minimum and maximum allowed password lengths.
*/

import { describe, expect, test } from "@jest/globals";
import {
  createPassword,
  ERROR_INVALID_PASSWORD_MAX_LENGTH,
  ERROR_INVALID_PASSWORD_MIN_LENGTH,
} from "../password.value-object";

describe("createPassword_function", () => {
  // Tests that createPassword returns a Right type with a valid password.
  test("test_create_password_returns_right_with_valid_password", () => {
    const password = "validpassword";
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Right");
    expect(result.right.value).toBe(password);
  });

  // Tests that createPassword returns a Left type with an error message when the password length is below the minimum allowed.
  test("test_create_password_returns_left_with_password_below_minimum_length", () => {
    const password = "1234";
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Left");
    expect(result.left).toBe(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  });

  // Tests that createPassword returns a Left type with an error message when the password length is above the maximum allowed.
  test("test_create_password_returns_left_with_password_above_maximum_length", () => {
    const password = "123456789012345678901";
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Left");
    expect(result.left).toBe(ERROR_INVALID_PASSWORD_MAX_LENGTH);
  });

  // Tests that createPassword returns a Left type with an error message when the password is empty.
  test("test_create_password_returns_left_with_empty_password", () => {
    const password = "";
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Left");
    expect(result.left).toBe(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  });

  // Tests that createPassword returns a Left type with an error message when the password is null.
  test("test_create_password_returns_left_with_null_password", () => {
    const password = null;
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Left");
    expect(result.left).toBe(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  });

  // Tests that createPassword returns a Left type with an error message when the password is undefined.
  test("test_create_password_returns_left_with_undefined_password", () => {
    const password = undefined;
    const result = createPassword({ value: password });
    expect(result._tag).toBe("Left");
    expect(result.left).toBe(ERROR_INVALID_PASSWORD_MIN_LENGTH);
  });
});
