export default ({ watchModel }) =>
  Object.freeze({
    getWatchByWatchId: watchId => watchModel.findOne({ watchId })
  });
