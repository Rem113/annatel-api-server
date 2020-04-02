/**
 * Database logic related to UserToWatch
 * @param {Model<UserToWatch>} userToWatchModel
 * @returns {UserToWatchRepository}
 */
export default ({ userToWatchModel }) =>
  Object.freeze({
    /**
     * @param {ObjectId} userId
     * @param {ObjectId} watchId
     * @returns {UserToWatch}
     */
    linkWatchToUser: async (userId, watchId) => {
      const link = { user: userId, watch: watchId };
      const exists = await userToWatchModel.findOne(link);

      if (exists) throw "The watch is already linked";

      return userToWatchModel.create(link);
    }
  });
