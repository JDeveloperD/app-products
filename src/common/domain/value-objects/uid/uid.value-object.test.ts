/*
Code Analysis

Objective:
The objective of the isValidUID function is to determine whether a given input is a valid MongoDB ObjectID.

Inputs:
- id: any - the input to be validated

Flow:
1. Check if the input is not a string, return false if it is not.
2. Use the mongoose.Types.ObjectId.isValid method to check if the input is a valid MongoDB ObjectID.
3. Create a new ObjectId instance using the input and convert it to a string.
4. Compare the string representation of the input with the original input, return true if they match, false otherwise.

Outputs:
- boolean - true if the input is a valid MongoDB ObjectID and its string representation matches the original input, false otherwise.

Additional aspects:
- The function uses the mongoose library to validate the input as a MongoDB ObjectID.
- The function only checks the format of the input, it does not check if the ObjectID exists in the database.
*/

import { describe, expect, it } from "@jest/globals";
import uidValueObject from "./uid.value-object";
import mongoose from "mongoose";

describe("isValidUID_function", () => {
  // Tests that a valid ObjectId as string returns true
  it("test_valid_object_id_as_string", () => {
    const id = new mongoose.Types.ObjectId().toString();
    const result = uidValueObject.isValidUID(id);
    expect(result).toBe(true);
  });

  // Tests that an invalid ID (not a string) returns false
  it("test_invalid_id_not_string", () => {
    const id = 1234567890;
    const result = uidValueObject.isValidUID(id);
    expect(result).toBe(false);
  });

  // Tests that an invalid ObjectId as string returns false
  it("test_invalid_object_id_as_string", () => {
    const id = "invalidObjectId";
    const result = uidValueObject.isValidUID(id);
    expect(result).toBe(false);
  });

  // Tests that an empty string returns false
  it("test_empty_string", () => {
    const id = "";
    const result = uidValueObject.isValidUID(id);
    expect(result).toBe(false);
  });

  // Tests that a null value returns false
  it("test_null_value", () => {
    const id = null;
    const result = uidValueObject.isValidUID(id);
    expect(result).toBe(false);
  });
});
