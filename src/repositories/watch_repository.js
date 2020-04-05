/**
 * Database logic related to Watches
 */
class WatchRepository {
  /**
   * Constructor of WatchRepository
   * @param {Model<Watch>} watchModel
   * @param {Model<UserToWatch>} userToWatchModel
   */
  constructor(watchModel, userToWatchModel) {
    this.watchModel = watchModel;
    this.userToWatchModel = userToWatchModel;
  }

  /**
   * @param {Object} watch
   * @returns {Promise<Watch>} The created Watch
   */
  createWatch(watch) {
    return this.watchModel.create(watch);
  }

  /**
   * @param {ObjectId} id
   * @returns {Promise<Watch>}
   */
  getWatchById(id) {
    return this.watchModel.findById(id);
  }

  /**
   * @param {String} watchId
   * @returns {Promise<Watch>}
   */
  getWatchByWatchId(watchId) {
    return this.watchModel.findOne({ watchId });
  }

  /**
   * Returns the watches associated to a certain user
   * @param {ObjectId} userId
   * @return {Promise<Array<Watch>>}
   */
  async getUsersWatches(userId) {
    const usersWatches = await this.userToWatchModel.find({ user: userId });

    const res = [];

    for await (const userToWatch of usersWatches) {
      const temp = await this.watchModel.findById(userToWatch.watch);
      res.push(temp);
    }

    return res;
  }
}

export default WatchRepository;
