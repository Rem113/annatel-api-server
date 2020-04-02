/**
 * Database logic related to the Users
 * @param {Model<User>} userModel
 * @returns {UserRepository}
 */
export default ({ userModel }) =>
  Object.freeze({
    /**
     * @param {String} email
     * @returns {User?}
     */
    findUserByEmail: email => userModel.findOne({ email }),

    /**
     * @param {Object} user
     * @returns {User} The created User
     */
    createUser: user => userModel.create(user)
  });
