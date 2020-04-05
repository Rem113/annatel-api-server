import CommandRepository from "../repositories/command_repository";
import LinkRepository from "../repositories/link_repository";
import WatchRepository from "../repositories/watch_repository";
import { ICommand } from "../models/command.model";
import { Either } from "monet";
import {
  Failure,
  InternalFailure,
  InvalidInputFailure,
} from "../core/failures";
import { ActionType } from "../models/action.model";
import { IWatch } from "../models/watch.model";
import { IUser } from "../models/user.model";

export default class CommandService {
  commandRepository: CommandRepository;
  linkRepository: LinkRepository;
  watchRepository: WatchRepository;

  constructor(
    commandRepository: CommandRepository,
    linkRepository: LinkRepository,
    watchRepository: WatchRepository
  ) {
    this.commandRepository = commandRepository;
    this.linkRepository = linkRepository;
    this.watchRepository = watchRepository;
  }

  private isInt(value: any): boolean {
    return !isNaN(parseInt(value));
  }

  private createUPLOAD(interval: number): any {
    return { actionType: ActionType.UPLOAD, payload: { interval } };
  }

  private createCENTER(centerNumber: string): any {
    return { actionType: ActionType.CENTER, payload: { centerNumber } };
  }

  // TODO: Check for duplicate commands
  async createCommand(
    userId: IUser["_id"],
    watchId: IWatch["_id"],
    actionType: ActionType,
    params: any
  ): Promise<Either<Failure, ICommand>> {
    // Get the watch details
    let watch: IWatch | null;

    try {
      watch = await this.watchRepository.getWatchById(watchId);
      if (watch === null)
        return Either.left(
          new InvalidInputFailure("There is no watch associated to this id")
        );
    } catch (e) {
      return Either.left(
        new InternalFailure("An error has occured", e.toString())
      );
    }

    // Check if the watch is linked to the user
    const link = await this.linkRepository.findLink(userId, watchId);

    if (link === null || link.stopped)
      return Either.left(
        new InvalidInputFailure(
          "You don't have the permission to send commands to this watch"
        )
      );

    // Build the command
    let header = {
      vendor: watch.vendor,
      watchId: watch.watchId,
    };

    let data: any = {};
    try {
      switch (actionType) {
        case ActionType.UPLOAD:
          if (params.interval === undefined) throw "Please specify an interval";
          if (!this.isInt(params.interval))
            throw "Please enter a valid interval";
          data = this.createUPLOAD(params.interval);
          break;
        case ActionType.CENTER:
          if (params.centerNumber === undefined)
            throw "Please specify a number";
          if (!this.isInt(params.centerNumber))
            throw "Please enter a valid center number";
          data = this.createCENTER(params.centerNumber);
          break;

        default:
          throw "Unsupported action";
      }
    } catch (e) {
      return Either.left(new InvalidInputFailure(e));
    }

    const command = await this.commandRepository.createCommand(watchId, {
      ...header,
      ...data,
    });

    return Either.right(command);
  }
}
