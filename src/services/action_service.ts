import { Either } from "monet";

import { Failure, UnauthorizedFailure } from "../core/failures";
import { IAction, ActionType } from "../models/action.model";
import { IUser } from "../models/user.model";
import { IWatch } from "../models/watch.model";

import ActionRepository from "../repositories/action_repository";
import LinkRepository from "../repositories/link_repository";

export default class ActionService {
  actionRepository: ActionRepository;
  linkRepository: LinkRepository;

  constructor(
    actionRepository: ActionRepository,
    linkRepository: LinkRepository
  ) {
    this.actionRepository = actionRepository;
    this.linkRepository = linkRepository;
  }

  async getActionsForWatch(
    userId: IUser["_id"],
    watchId: IWatch["_id"]
  ): Promise<Either<Failure, IAction[]>> {
    const link = await this.linkRepository.findLink(userId, watchId);

    if (link === null)
      return Either.left(
        new UnauthorizedFailure("You are not linked to the specified watch")
      );

    return Either.right(await this.actionRepository.getActionsByWatch(watchId));
  }

  async getActionsAfterDate(
    date: Date,
    userId: IUser["_id"],
    watchId: IWatch["_id"]
  ): Promise<Either<Failure, IAction[]>> {
    const actions = await this.getActionsForWatch(userId, watchId);

    return actions.map((actions) =>
      actions.filter((action) => action.insertedAt > date)
    );
  }

  async getActionsByType(
    actionType: ActionType,
    userId: IUser["_id"],
    watchId: IWatch["_id"]
  ): Promise<Either<Failure, IAction[]>> {
    const actions = await this.getActionsForWatch(userId, watchId);

    return actions.map((actions) =>
      actions.filter((action) => action.actionType === actionType)
    );
  }
}
