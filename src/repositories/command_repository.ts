import { Model } from "mongoose";
import { ICommand } from "../models/command.model";

export default class CommandRepository {
  commandModel: Model<ICommand>;

  constructor(commandModel: Model<ICommand>) {
    this.commandModel = commandModel;
  }

  createCommand(command: ICommand): Promise<ICommand> {
    return this.commandModel.create(command);
  }
}
