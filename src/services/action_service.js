export default ({ repository }) =>
  Object.freeze({
    getActions: async () => await repository.getActions(),
    getActionsByType: async actionType =>
      await repository.getActionsByType(actionType)
  });
