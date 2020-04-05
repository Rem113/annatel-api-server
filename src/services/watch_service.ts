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
    watchId: IWatch["_id"]
  ): Promise<Either<Failure, ILink>> {
    try {
      // Checks if watch exists
      const watch = await this.watchRepository.getWatchById(watchId);

      if (watch === null)
        return Either.left(
          new InvalidInputFailure(
            "The watch that you want to link does not exist"
          )
        );

      const link = await this.linkRepository.linkWatchToUser(userId, watchId);
      return Either.right(link);
    } catch (e) {
      return Either.left(
        new ConflictFailure("The watch is already linked", e.toString())
      );
    }
  }
}
