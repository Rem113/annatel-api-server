/**
 * Database logic related to Watches
 * @param {Model<Watch>} watchModel
 * @param {Model<UserToWatch>} userToWatchModel
 * @returns {WatchRepository}
 */
export default ({ watchModel, userToWatchModel }) =>
  Object.freeze({
    /**
     * @param {Object} watch
     * @returns {Watch} The created Watch
     */
    createWatch: watch => watchModel.create(watch),

    /**
     * @param {ObjectId} id
     * @returns {Watch}
     */
    getWatchById: id => watchModel.findById(id),

    /**
     * @param {String} watchId
     * @returns {Watch}
     */
    getWatchByWatchId: watchId => watchModel.findOne({ watchId }),

    /**
     * Returns the watches associated to a certain user
     * @param {ObjectId} userId
     * @returns {Array<Watch>}
     */
    getUsersWatches: async userId => {
      const usersWatches = await userToWatchModel.find({ user: userId });

      const res = [];

      for await (const userToWatch of usersWatches) {
        const temp = await watchModel.findById(userToWatch.watch);
        res.push(temp);
      }

      return res;
    }
  });
