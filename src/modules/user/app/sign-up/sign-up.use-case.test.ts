import { describe, beforeEach, test, jest, expect } from "@jest/globals";
import signUpUseCase from "./sign-up.use-case";
describe("sign-in.use-case", () => {
  let userRepo: any;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    userRepo = {
      existsByEmail: jest.fn(),
      save: jest.fn(),
    };
  });

  test("should be defined", async () => {
    const useCase = signUpUseCase(userRepo);
    expect(useCase).toBeDefined();
  });

  test("should fail if provide an invalid email", async () => {
    const useCase = signUpUseCase(userRepo);

    const result = await useCase.execute({
      email: "invalid_email",
      password: "123456",
      acceptedTerm: true,
    });

    expect(result._tag).toBe("Left");
  });

  test("should fail if provide an invalid password", async () => {
    const useCase = signUpUseCase(userRepo);

    const result = await useCase.execute({
      email: "valid_email@domain.com",
      password: "",
      acceptedTerm: true,
    });

    expect(result._tag).toBe("Left");
  });

  test("should fail if provided email is already in use", async () => {
    jest.spyOn(userRepo, "existsByEmail").mockReturnValueOnce(true);

    const useCase = signUpUseCase(userRepo);

    const result = await useCase.execute({
      email: "already_in_use@domain.com",
      password: "passwordfalse",
      acceptedTerm: true,
    });

    expect(result._tag).toBe("Left");
  });

  test("should fail if not accept the terms", async () => {
    jest.spyOn(userRepo, "existsByEmail").mockReturnValueOnce(false);
    const spySave = jest.spyOn(userRepo, "save");

    const useCase = signUpUseCase(userRepo);

    const result = await useCase.execute({
      email: "valid_email@domain.com",
      password: "123456",
      acceptedTerm: false,
    });

    expect(result._tag).toBe("Left");
    expect(spySave).not.toHaveBeenCalled();
  });

  test("should be success", async () => {
    jest.spyOn(userRepo, "existsByEmail").mockReturnValueOnce(false);
    const spySave = jest.spyOn(userRepo, "save");

    const useCase = signUpUseCase(userRepo);

    const result = await useCase.execute({
      email: "valid_email@domain.com",
      password: "123456",
      acceptedTerm: true,
    });

    expect(result._tag).toBe("Right");
    expect(spySave).toHaveBeenCalled();
  });
});
