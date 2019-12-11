export default ({ repository }) =>
  Object.freeze({
    getActions: async () => await repository.getActions()
  });
