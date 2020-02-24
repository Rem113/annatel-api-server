export default ({ commandModel }) =>
  Object.freeze({
    createCommand: command => commandModel.create(command)
  });
