import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class UpdateProfileUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("update profile use case execute");
  }
}
