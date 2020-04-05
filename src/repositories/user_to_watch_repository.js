/**
 * Database logic related to UserToWatch
 */
class UserToWatchRepository {
  /**
   * @param {Model<UserToWatch>} userToWatchModel
   */
  constructor(userToWatchModel) {
    this.userToWatchModel = userToWatchModel;
  }

  /**
   * @param {ObjectId} userId
   * @param {ObjectId} watchId
   * @returns {Promise<UserToWatch>}
   */
  async linkWatchToUser(userId, watchId) {
    const link = { user: userId, watch: watchId };
    const exists = await this.userToWatchModel.findOne(link);

    if (exists) throw "The watch is already linked";

    return this.userToWatchModel.create(link);
  }
}

export default UserToWatchRepository;
