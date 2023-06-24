import { Container } from "inversify";
import { UserMongodbRepository } from "./user/infraestructure";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetProfileUseCase,
  GetUsersUseCase,
  SignInUseCase,
  SignUpUseCase,
  UpdateProfileUseCase,
  UserService,
} from "./user/application";

const container = new Container();

/**
 * User module
 */
container.bind("UserRepository").to(UserMongodbRepository);
container.bind(CreateUserUseCase).toSelf();
container.bind(GetUsersUseCase).toSelf();
container.bind(SignUpUseCase).toSelf();
container.bind(SignInUseCase).toSelf();
container.bind(GetProfileUseCase).toSelf();
container.bind(DeleteUserUseCase).toSelf();
container.bind(UpdateProfileUseCase).toSelf();
container.bind(UserService).toSelf();

export default { container };
