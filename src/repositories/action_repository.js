export default ({ actionModel }) =>
  Object.freeze({
    createAction: async action => await actionModel.create(action),
    getActions: async () => await actionModel.find(),
    getActionsAfterDate: async date =>
      await actionModel.find({ insertedAt: { $gte: new Date(date) } }),
    getActionsByType: async actionType => await actionModel.find({ actionType })
  });
