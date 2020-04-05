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
   * @returns {Promise<User?>}
   */
  findUserByEmail(email) {
    return this.userModel.findOne({ email });
  }

  /**
   * @param {Object} user
   * @returns {Promise<User>} The created User
   */
  createUser(user) {
    return this.userModel.create(user);
  }
}

export default UserRepository;
