// TODO: Document
export default ({ userModel }) =>
  Object.freeze({
    findUserByEmail: async email => {
      const user = await userModel.findOne({ email });
      if (!user) return null;
      return user;
    },
    createUser: user => userModel.create(user)
  });
