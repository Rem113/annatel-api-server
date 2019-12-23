export default ({ actionModel }) =>
  Object.freeze({
    createAction: async action => await actionModel.create(action),
    getActions: async () => await actionModel.find(),
    getActionsByType: async actionType => await actionModel.find({ actionType })
  });
