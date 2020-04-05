import { ICommand } from "../models/command.model";
import { Model } from "mongoose";
import { IWatch } from "../models/watch.model";

export default class CommandRepository {
  commandModel: Model<ICommand>;

  constructor(commandModel: Model<ICommand>) {
    this.commandModel = commandModel;
  }

  createCommand(watchId: IWatch["_id"], command: any): Promise<ICommand> {
    return this.commandModel.create({ watchId, command });
  }
}
