/*
Code Analysis

Objective:
The objective of the isValidEmail function is to validate whether a given email address is valid or not using the isEmail function from the validator library.

Inputs:
- email: a string representing the email address to be validated.

Flow:
1. The function takes in an email address as input.
2. The isEmail function from the validator library is called with the email address as its argument.
3. The result of the isEmail function is returned as the output of the isValidEmail function.

Outputs:
- A boolean value indicating whether the input email address is valid or not.

Additional aspects:
- The function relies on the isEmail function from the validator library to perform the email validation.
- The function assumes that the input email address is a string.
*/

import { describe, test, expect } from "@jest/globals";
import { isValidEmail } from "./is-valid-email";

describe("isValidEmail_function", () => {
  // Tests that a valid email address returns true.
  test("test_valid_email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  // Tests that email addresses with different domains (e.g. .com, .org, .edu) return true.
  test("test_different_domains", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("test@example.org")).toBe(true);
    expect(isValidEmail("test@example.edu")).toBe(true);
  });

  // Tests that an empty string returns false.
  test("test_empty_string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  // Tests that email addresses with invalid characters (e.g. spaces, special characters) return false.
  test("test_invalid_characters", () => {
    expect(isValidEmail("test example.com")).toBe(false);
    expect(isValidEmail("test!example.com")).toBe(false);
  });

  // Tests that email addresses with multiple @ symbols return false.
  test("test_multiple_at_symbols", () => {
    expect(isValidEmail("test@@example.com")).toBe(false);
  });

  // Tests that email addresses with different subdomains (e.g. user@subdomain.domain.com) return true.
  test("test_subdomains", () => {
    expect(isValidEmail("user@subdomain.example.com")).toBe(true);
  });
});
