import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import getUsersUseCase from "./get-users-use.case";

describe("get-users.use-case", () => {
  let userRepo: any;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    userRepo = {
      find: jest.fn(),
    };
  });

  test("should be defined", () => {
    const useCase = getUsersUseCase(userRepo);
    expect(useCase).toBeDefined();
  });
});
