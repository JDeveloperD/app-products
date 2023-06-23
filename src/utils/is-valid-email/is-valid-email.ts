import isEmail from "validator/lib/isEmail";

const isValidEmail = (email: string): boolean => isEmail(email);

export default isValidEmail;
