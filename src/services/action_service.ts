import { IAction, ActionType } from "../models/action.model";
import { IUser } from "../models/user.model";
import ActionRepository from "../repositories/action_repository";
import WatchRepository from "../repositories/watch_repository";

export default class ActionService {
  actionRepository: ActionRepository;
  watchRepository: WatchRepository;

  constructor(
    actionRepository: ActionRepository,
    watchRepository: WatchRepository
  ) {
    this.actionRepository = actionRepository;
    this.watchRepository = watchRepository;
  }

  async getActionsByUserId(userId: IUser["_id"]): Promise<IAction[]> {
    const watches = await this.watchRepository.getUsersWatches(userId);

    const res: IAction[] = [];

    for await (const watch of watches) {
      const actions = await this.actionRepository.getActionsByWatchId(
        watch.watchId
      );

      actions.forEach((action) => res.push(action));
    }

    return res;
  }

  async getActionsAfterDate(
    date: Date,
    userId: IUser["_id"]
  ): Promise<IAction[]> {
    const actions = await this.getActionsByUserId(userId);

    return actions.filter((action) => action.insertedAt > date);
  }

  async getActionsByType(
    actionType: ActionType,
    userId: IUser["_id"]
  ): Promise<IAction[]> {
    const actions = await this.getActionsByUserId(userId);

    return actions.filter((action) => action.actionType === actionType);
  }
}
