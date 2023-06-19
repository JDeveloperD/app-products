import signUpUseCase from "../app/sign-up/sign-up.use-case";
import userMongooseRepository from "./user-mongoose.repository";
import getUsersUseCase from "../app/get-users/get-users-use.case";
import signInUseCase from "../app/sign-in/sign-in.use-case";
import getProfileUseCase from "../app/get-profile/get-profile.use-case";
import deleteUserUseCase from "../app/delete-user/delete-user.use-case";

export const userRepository = userMongooseRepository();

const signUp = signUpUseCase(userRepository);
const signIn = signInUseCase(userRepository);
const getUsers = getUsersUseCase(userRepository);
const getProfile = getProfileUseCase(userRepository);
const deleteUser = deleteUserUseCase(userRepository);

export const userUseCases = {
  signUp,
  signIn,
  getUsers,
  getProfile,
  deleteUser,
};
