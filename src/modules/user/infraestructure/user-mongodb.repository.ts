import { injectable } from "inversify";
import { UserRepository } from "../domain";

@injectable()
export default class UserMongodbRepository implements UserRepository {}
