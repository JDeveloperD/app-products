import { injectable } from "inversify";
import SignInUseCase from "./sign-in/sign-in.use-case";
import GetProfileUseCase from "./get-profile/get-profile.use-case";
import DeleteUserUseCase from "./delete-user/delete-user.use-case";
import UpdateProfileUseCase from "./update-profile/update-profile.use-case";
import GetUsersUseCase from "./get-users/get-users.use-case";
import SignUpUseCase from "./sign-up/sign-up.use-case";
import CreateUserUseCase from "./create-user/create-user.use-case";

@injectable()
export default class UserService {
  constructor(
    private signInUseCase: SignInUseCase,
    private getProfileUseCase: GetProfileUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private updateProfileUseCase: UpdateProfileUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private signUpUseCase: SignUpUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {}

  public signIn() {
    return this.signInUseCase.execute();
  }

  public getProfile() {
    return this.getProfileUseCase.execute();
  }

  public createUser() {
    return this.createUserUseCase.execute();
  }

  public deleteUser() {
    return this.deleteUserUseCase.execute();
  }

  public updateProfile() {
    return this.updateProfileUseCase.execute();
  }

  public getUsers() {
    return this.getUsersUseCase.execute();
  }

  public signUp() {
    return this.signUpUseCase.execute();
  }
}
