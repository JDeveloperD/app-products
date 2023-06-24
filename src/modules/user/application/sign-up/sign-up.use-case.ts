import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class SignUpUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("sign up use case execute");
  }
}
