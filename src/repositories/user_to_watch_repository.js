export default ({ userToWatchModel }) =>
  Object.freeze({
    linkWatchToUser: async (userId, watchId) => {
      const link = { user: userId, watch: watchId };
      const exists = await userToWatchModel.findOne(link);

      if (exists) throw "The watch is already linked";

      return userToWatchModel.create(link);
    }
  });
