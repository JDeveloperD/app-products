import signUpUseCase from "../app/sign-up/sign-up.use-case";
import userMongooseRepository from "./user-mongoose.repository";

const userRepository = userMongooseRepository();
const signUp = signUpUseCase(userRepository);

export const userUseCases = {
  signUp,
};
