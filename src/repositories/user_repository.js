// TODO: Document
export default ({ userModel }) =>
  Object.freeze({
    findUserByEmail: email => userModel.findOne({ email }),
    createUser: user => userModel.create(user)
  });
