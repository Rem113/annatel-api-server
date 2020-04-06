import { Either } from "monet";

import {
  ConflictFailure,
  Failure,
  InternalFailure,
  InvalidInputFailure,
} from "../core/failures";
import { ILink } from "../models/link.model";
import { IUser } from "../models/user.model";
import { IWatch } from "../models/watch.model";
import LinkRepository from "../repositories/link_repository";
import WatchRepository from "../repositories/watch_repository";

export default class WatchService {
  watchRepository: WatchRepository;
  linkRepository: LinkRepository;

  constructor(
    watchRepository: WatchRepository,
    linkRepository: LinkRepository
  ) {
    this.watchRepository = watchRepository;
    this.linkRepository = linkRepository;
  }

  async createWatch(watch: IWatch): Promise<Either<Failure, IWatch>> {
    // Check for duplicate watch
    const exists = await this.watchRepository.getWatchByWatchId(watch.watchId);

    if (exists !== null)
      return Either.left(
        new ConflictFailure("There is already a watch with the specified id")
      );

    try {
      const watchDocument = await this.watchRepository.createWatch(watch);
      return Either.right(watchDocument);
    } catch (e) {
      return Either.left(
        new InternalFailure("An error has occured", e.toString())
      );
    }
  }

  async getUsersWatches(
    userId: IUser["_id"]
  ): Promise<Either<Failure, IWatch[]>> {
    try {
      const usersWatches = await this.watchRepository.getUsersWatches(userId);
      return Either.right(usersWatches);
    } catch (e) {
      return Either.left(
        new InternalFailure("An error has occured", e.toString())
      );
    }
  }

  async linkWatchToUser(
    userId: IUser["_id"],
    watchId: IWatch["watchId"],
    name: string
  ): Promise<Either<Failure, ILink>> {
    if (name === undefined || name.trim().length === 0)
      return Either.left(new InvalidInputFailure("Please enter a name"));

    // Checks if watch exists
    const watch = await this.watchRepository.getWatchByWatchId(watchId);

    if (watch === null)
      return Either.left(
        new InvalidInputFailure(
          "The watch that you want to link does not exist"
        )
      );

    try {
      const link = await this.linkRepository.createLink(
        userId,
        watch._id,
        name
      );
      return Either.right(link);
    } catch (e) {
      return Either.left(
        new ConflictFailure("The watch is already linked", e.toString())
      );
    }
  }

  async updateLink(
    userId: IUser["_id"],
    watchId: IUser["_id"],
    name: string,
    stopped: boolean
  ): Promise<Either<Failure, ILink>> {
    let link: ILink | null;

    try {
      link = await this.linkRepository.findLink(userId, watchId);
    } catch (e) {
      return Either.left(
        new InternalFailure("An error has occured", e.toString())
      );
    }

    if (link === null)
      return Either.left(new InvalidInputFailure("The link does not exist"));

    link.name = name ?? link.name;
    link.stopped = stopped ?? link.stopped;

    const newLink = await this.linkRepository.updateLink(userId, watchId, link);

    return Either.right(newLink);
  }
}
