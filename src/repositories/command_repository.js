// TODO: Document
class CommandRepository {
  constructor(commandModel) {
    this.commandModel = commandModel;
  }

  async createCommand(command) {
    return await this.commandModel.create(command);
  }
}

export default CommandRepository;
