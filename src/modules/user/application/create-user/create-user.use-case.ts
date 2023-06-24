import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("create user use case execute");
  }
}
