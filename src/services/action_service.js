export default ({ repository }) =>
  Object.freeze({
    getActions: () => repository.getActions(),
    getActionsAfterDate: date => repository.getActionsAfterDate(date),
    getActionsByType: actionType => repository.getActionsByType(actionType),
    getActionsByWatchId: watchId => repository.getActionsByWatchId(watchId)
  });
