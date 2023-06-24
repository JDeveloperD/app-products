import { inject, injectable } from "inversify";
import { UserRepository } from "../../domain";

@injectable()
export default class GetProfileUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute() {
    console.log("get profile use case execute");
  }
}
