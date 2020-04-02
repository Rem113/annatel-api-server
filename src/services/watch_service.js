import { Either } from "monet";
import AuthFailure from "../core/failures/auth_failure";

export default ({ watchRepository, userToWatchRepository }) =>
  Object.freeze({
    createWatch: async watch => {
      const hasWatchIdProperty = watch.hasOwnProperty("watchId");
      const hasVendorProperty = watch.hasOwnProperty("vendor");

      if (!hasWatchIdProperty || !hasVendorProperty)
        return Either.left(
          new AuthFailure("Please fill all the fields", {
            hasWatchIdProperty,
            hasVendorProperty
          })
        );

      // TODO: Check for duplicate watch
      // TODO: Catch errors
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
      const link = await userToWatchRepository.linkWatchToUser(userId, watchId);
      return Either.right(link);
    }
  });
