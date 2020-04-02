import { Either } from "monet";
import {
  InvalidInputFailure,
  ConflictFailure,
  InternalFailure
} from "../core/failures";

/**
 * Watch related functionalities
 * @param {WatchRepository} watchRepository
 * @param {UserToWatchRepository} userToWatchRepository
 * @returns {WatchService}
 */
export default ({ watchRepository, userToWatchRepository }) =>
  Object.freeze({
    /**
     * @param {Object} watch
     * @returns {Either<Failure, Watch>}
     */
    createWatch: async watch => {
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
      const exists = await watchRepository.getWatchByWatchId(watch.watchId);
      if (exists)
        return Either.left(
          new ConflictFailure("There is already a watch with the specified id")
        );

      try {
        const watchDocument = await watchRepository.createWatch(watch);
        return Either.right(watchDocument);
      } catch (_) {
        return Either.left(new InternalFailure("An error has occured"));
      }
    },

    /**
     * @param {ObjectId} userId
     * @returns {Either<Failure, Array<Watch>>}
     */
    getUsersWatches: async userId => {
      try {
        const usersWatches = await watchRepository.getUsersWatches(userId);
        return Either.right(usersWatches);
      } catch (_) {
        return Either.left(new InternalFailure("An error has occured"));
      }
    },

    /**
     * @param {String} userId
     * @param {ObjectId} watchId
     */
    linkWatchToUser: async (userId, watchId) => {
      try {
        const link = await userToWatchRepository.linkWatchToUser(
          userId,
          watchId
        );
        return Either.right(link);
      } catch (e) {
        return Either.left(new ConflictFailure("The watch is already linked"));
      }
    }
  });
