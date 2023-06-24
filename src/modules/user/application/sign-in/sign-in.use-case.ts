import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class SignInUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("sign in use case execute");
  }
}
