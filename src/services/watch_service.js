import { Either } from "monet";
import { InvalidInputFailure, ConflictFailure } from "../core/failures";

// TODO: Document
export default ({ watchRepository, userToWatchRepository }) =>
  Object.freeze({
    createWatch: async watch => {
      const hasWatchIdProperty = watch.hasOwnProperty("watchId");
      const hasVendorProperty = watch.hasOwnProperty("vendor");

      if (!hasWatchIdProperty || !hasVendorProperty)
        return Either.left(
          new InvalidInputFailure("Please fill all the fields", {
            hasWatchIdProperty,
            hasVendorProperty
          })
        );

      // Check for duplicate watch
      const exists = await watchRepository.getWatchByWatchId(watch.watchId);
      if (exists)
        return Either.left(
          new ConflictFailure("There is already a watch with the specified id")
        );

      const watchDocument = await watchRepository.createWatch(watch);
      return Either.right(watchDocument);
    },
    getUsersWatches: async userId => {
      // TODO: Catch errors
      const usersWatches = await watchRepository.getUsersWatches(userId);
      return Either.right(usersWatches);
    },
    linkWatchToUser: async (userId, watchId) => {
      // TODO: Catch errors
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
