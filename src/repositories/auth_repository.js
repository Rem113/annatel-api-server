export default ({ userModel }) =>
  Object.freeze({
    findUserByEmail: async email => {
      const user = await userModel.findOne({ email });
      if (!user) return null;
      return user;
    },
    createUser: async user => await userModel.create(user)
  });
