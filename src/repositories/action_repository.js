export default ({ actionModel }) =>
  Object.freeze({
    createAction: action => actionModel.create(action),
    getActions: () => actionModel.find(),
    getActionsAfterDate: date =>
      actionModel.find({ insertedAt: { $gte: new Date(date) } }),
    getActionsByType: actionType => actionModel.find({ actionType })
  });
