import { IAction, ActionType } from "../models/action.model";
import { IWatch } from "../models/watch.model";
import { Model } from "mongoose";

export default class ActionRepository {
  actionModel: Model<IAction>;
  watchModel: Model<IWatch>;

  constructor(actionModel: Model<IAction>, watchModel: Model<IWatch>) {
    this.actionModel = actionModel;
    this.watchModel = watchModel;
  }

  createAction(action: IAction): Promise<IAction> {
    return this.actionModel.create(action);
  }

  getActions(): Promise<IAction[]> {
    // TODO: Catch exceptions
    return this.actionModel.find().exec();
  }

  getActionsAfterDate(date: Date): Promise<IAction[]> {
    return this.actionModel.find({ insertedAt: { $gte: date } }).exec();
  }

  getActionsByType(actionType: ActionType): Promise<IAction[]> {
    return this.actionModel.find({ actionType }).exec();
  }

  async getActionsByWatch(watchId: IWatch["_id"]): Promise<IAction[]> {
    const watch = await this.watchModel.findOne({ _id: watchId });

    if (watch === null) throw "There is no watch associated to this id";

    return this.actionModel.find({ watchId });
  }
}
