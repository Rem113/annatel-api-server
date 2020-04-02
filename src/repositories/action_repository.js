// TODO: Document
export default ({ actionModel, watchModel }) =>
  Object.freeze({
    createAction: action => actionModel.create(action),
    getActions: () => actionModel.find(),
    getActionsAfterDate: date =>
      actionModel.find({ insertedAt: { $gte: new Date(date) } }),
    getActionsByType: actionType => actionModel.find({ actionType }),
    getActionsByWatchId: async watchId => {
      const watch = await watchModel.findOne({ watchId });

      return actionModel.find({ watchId: watch._id });
    }
  });
