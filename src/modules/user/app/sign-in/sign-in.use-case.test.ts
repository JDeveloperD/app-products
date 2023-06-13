import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import signInUseCase from "./sign-in.use-case";
import { type User } from "../../domain";

describe("sign-in.use-case", () => {
  let userRepo: any;
  const user: User = {
    id: "647aa703e8fda4824fe57ce0",
    email: "client@gmail.com",
    password: "$2b$10$8fuw0MHAOd/fxSjaFI2uUebpqf7lZk9FBe5ocT.GjloLSTAz7/cum", // password213
    role: "CLIENT",
    isTheEmailConfirmed: false,
    isActive: false,
    acceptedTerm: true,
    createdAt: new Date("2023-06-03T02:35:47.104Z"),
    updatedAt: new Date("2023-06-03T02:35:47.104Z"),
  };

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    userRepo = {
      findByEmail: jest.fn(),
    };
  });

  test("should be defined", () => {
    const useCase = signInUseCase(userRepo);
    expect(useCase).toBeDefined();
  });

  test("should fail if user does not exist", async () => {
    //
    jest.spyOn(userRepo, "findByEmail").mockResolvedValueOnce(null);
    //
    const useCase = signInUseCase(userRepo);
    const result = await useCase.execute({
      email: "invalid_email@main.com",
      password: "invalid_pass",
    });
    //
    expect(result._tag).toBe("Left");
  });
  test("should fail if password does not match", async () => {
    //
    jest.spyOn(userRepo, "findByEmail").mockResolvedValueOnce(user);
    //
    const useCase = signInUseCase(userRepo);
    const result = await useCase.execute({
      email: "valid_email@domain.com",
      password: "invalid_pass",
    });
    //
    expect(result._tag).toBe("Left");
  });

  test("should return a token with success", async () => {
    //
    jest.spyOn(userRepo, "findByEmail").mockResolvedValueOnce(user);
    // jest.spyOn(jwtService, 'sign').mockReturnValue('valid_token');
    //
    const useCase = signInUseCase(userRepo);
    const result = await useCase.execute({
      email: "valid_email@domain.com",
      password: "password213",
    });
    //
    expect(result._tag).toBe("Right");
    // expect(result.getResult().token).toBe('valid_token');
  });
});
