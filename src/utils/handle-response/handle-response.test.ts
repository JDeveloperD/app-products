/*
Code Analysis

Objective:
The objective of the getResponseString function is to receive a numeric value and return the corresponding string representation of a FailResponse enum value.

Inputs:
- A numeric value representing a FailResponse enum value.

Flow:
- The function receives a numeric value as input.
- It uses the Object.keys method to get an array of keys from the FailResponse enum.
- It then uses the find method to search for the key that corresponds to the input value.
- If a matching key is found, the function returns the key as a string. Otherwise, it returns undefined.

Outputs:
- A string representing the FailResponse enum value that corresponds to the input numeric value.

Additional aspects:
- The function uses keyof typeof to ensure that the input value is a valid key of the FailResponse enum.
- If the input value is not a valid FailResponse enum value, the function will return undefined.
*/
import { describe, expect, it } from "@jest/globals";
import { FailResponse } from "../../common";
import { getResponseString } from "./handle-response";

describe("getResponseString_function", () => {
  // Tests that the function returns the corresponding string value for a given FailResponse enum value
  it("test_happy_path_matching_value", () => {
    const value = FailResponse.INVALID_DATA;
    const expected = "INVALID_DATA";
    const result = getResponseString(value);
    expect(result).toEqual(expected);
  });

  // Tests that the function returns undefined if input value is not a FailResponse enum value
  it("test_happy_path_non_matching_value", () => {
    const value = 404;
    const expected = "RESOURCE_NOT_FOUND";
    const result = getResponseString(value);
    expect(result).toEqual(expected);
  });
});
