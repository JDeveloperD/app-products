import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class DeleteUserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("sign-up");
  }
}
