import { Either } from "monet";
import {
  InvalidInputFailure,
  ConflictFailure,
  InternalFailure
} from "../core/failures";

/**
 * Watch related functionalities
 */
class WatchService {
  /**
   * @param {WatchRepository} watchRepository
   * @param {UserToWatchRepository} userToWatchRepository
   */
  constructor(watchRepository, userToWatchRepository) {
    this.watchRepository = watchRepository;
    this.userToWatchRepository = userToWatchRepository;
  }
  /**
   * @param {Object} watch
   * @returns {Either<Failure, Watch>}
   */
  async createWatch(watch) {
    const hasWatchIdProperty = watch.hasOwnProperty("watchId");
    const hasVendorProperty = watch.hasOwnProperty("vendor");

    if (!hasWatchIdProperty || !hasVendorProperty)
      return Either.left(
        new InvalidInputFailure("Please fill all the fields", {
          watchId: hasWatchIdProperty,
          vendor: hasVendorProperty
        })
      );

    // Check for duplicate watch
    const exists = await this.watchRepository.getWatchByWatchId(watch.watchId);
    if (exists)
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

  /**
   * @param {ObjectId} userId
   * @returns {Either<Failure, Array<Watch>>}
   */
  async getUsersWatches(userId) {
    try {
      const usersWatches = await this.watchRepository.getUsersWatches(userId);
      return Either.right(usersWatches);
    } catch (e) {
      return Either.left(
        new InternalFailure("An error has occured", e.toString())
      );
    }
  }

  /**
   * @param {String} userId
   * @param {ObjectId} watchId
   */
  async linkWatchToUser(userId, watchId) {
    try {
      // TODO: Check if User and Watch exists
      const link = await this.userToWatchRepository.linkWatchToUser(
        userId,
        watchId
      );
      return Either.right(link);
    } catch (e) {
      return Either.left(
        new ConflictFailure("The watch is already linked", e.toString())
      );
    }
  }
}

export default WatchService;
