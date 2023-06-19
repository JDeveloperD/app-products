/*
Code Analysis

Objective:
The objective of the isValidObjectId function is to determine whether a given string is a valid MongoDB ObjectId.

Inputs:
- id: a string representing a potential MongoDB ObjectId

Flow:
1. Check if the input id is a valid ObjectId using the isValid method from the mongoose.Types.ObjectId object.
2. If the input id is a valid ObjectId, convert it to a string and compare it to the original input id.
3. If the converted string matches the input id, return true. Otherwise, return false.

Outputs:
- boolean: true if the input id is a valid ObjectId and matches the converted string, false otherwise.

Additional aspects:
- The function uses the mongoose library to validate and convert the input id.
- The function assumes that the input id is a string.
*/

import { describe, expect, it } from "@jest/globals";
import mongoose from "mongoose";
import { isValidUID } from "./uid";

describe("isValidObjectId_function", () => {
  // Tests that a valid ObjectId string returns true
  it("test_valid_object_id", () => {
    const validId = new mongoose.Types.ObjectId().toHexString();
    expect(isValidUID(validId)).toBe(true);
  });

  // Tests that an invalid ObjectId string returns false
  it("test_invalid_object_id", () => {
    const invalidId = "invalidId";
    expect(isValidUID(invalidId)).toBe(false);
  });

  // Tests that an empty string returns false
  it("test_empty_string", () => {
    const emptyString = "";
    expect(isValidUID(emptyString)).toBe(false);
  });

  // Tests that a non-string input returns false
  it("test_non_string_input", () => {
    const nonStringInput = 123;
    expect(isValidUID(nonStringInput)).toBe(false);
  });

  // Tests that an input longer than 24 characters returns false
  it("test_input_longer_than_24_characters", () => {
    const longInput = "1234567890123456789012345";
    expect(isValidUID(longInput)).toBe(false);
  });

  // Tests that an input shorter than 24 characters returns false
  it("test_input_shorter_than_24_characters", () => {
    const shortInput = "12345678901234567890123";
    expect(isValidUID(shortInput)).toBe(false);
  });
});
