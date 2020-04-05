import { IUser } from "../models/user.model";
import { Model } from "mongoose";

export default class UserRepository {
  userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  findUserByEmail(email: IUser["email"]): Promise<IUser | null> {
    // TODO: Catch exceptions
    return this.userModel.findOne({ email }).exec();
  }

  createUser(user: IUser): Promise<IUser> {
    return this.userModel.create(user);
  }
}
