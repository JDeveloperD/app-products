import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class GetUsersUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  execute() {
    console.log("get users use case execute");
  }
}
