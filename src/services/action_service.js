export default ({ repository }) =>
  Object.freeze({
    getActions: async () => await repository.getActions(),
    getActionsAfterDate: async date =>
      await repository.getActionsAfterDate(date),
    getActionsByType: async actionType =>
      await repository.getActionsByType(actionType)
  });
