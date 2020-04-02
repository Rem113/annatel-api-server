/**
 * Database logic related to the Users
 */
class UserRepository {
  /**
   * @param {Model<User>} userModel
   */
  constructor(userModel) {
    this.userModel = userModel;
  }

  /**
   * @param {String} email
   * @returns {User?}
   */
  async findUserByEmail(email) {
    return await this.userModel.findOne({ email });
  }

  /**
   * @param {Object} user
   * @returns {User} The created User
   */
  async createUser(user) {
    return await this.userModel.create(user);
  }
}

export default UserRepository;
