import { ICommand } from "../models/command.model";
import { Model } from "mongoose";

export default class CommandRepository {
  commandModel: Model<ICommand>;

  constructor(commandModel: Model<ICommand>) {
    this.commandModel = commandModel;
  }

  createCommand(command: ICommand): Promise<ICommand> {
    return this.commandModel.create(command);
  }
}
