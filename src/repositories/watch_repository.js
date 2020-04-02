export default ({ watchModel, userToWatchModel }) =>
  Object.freeze({
    createWatch: watch => watchModel.create(watch),
    getWatchById: id => watchModel.findById(id),
    getWatchByWatchId: watchId => watchModel.findOne({ watchId }),
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
