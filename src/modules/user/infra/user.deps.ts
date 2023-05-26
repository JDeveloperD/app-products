import signUpUseCase from "../app/sign-up/sign-up.use-case";
import userMongooseRepository from "./user-mongoose.repository";
import getUsersUSeCase from "../app/get-users/get-users.use-case";
import signInUseCase from "../app/sign-in/sign-in.use-case";

const userRepository = userMongooseRepository();
const signUp = signUpUseCase(userRepository);
const signIn = signInUseCase(userRepository);
const getUsers = getUsersUSeCase(userRepository);

export const userUseCases = {
  signUp,
  signIn,
  getUsers,
};
