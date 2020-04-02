/**
 * Database logic related to Actions
 */
class ActionRepository {
  /**
   * @param {Model<Action>} actionModel
   * @param {Model<Watch>} watchModel
   */
  constructor(actionModel, watchModel) {
    this.actionModel = actionModel;
    this.watchModel = watchModel;
  }

  /**
   * @param {Object} action
   * @returns {Action} The created Action
   */
  async createAction(action) {
    return await this.actionModel.create(action);
  }

  /**
   * @returns {Array<Action>}
   */
  async getActions() {
    return await this.actionModel.find();
  }

  /**
   * @param {Date} date
   * @returns {Array<Action>}
   */
  async getActionsAfterDate(date) {
    return await this.actionModel.find({ insertedAt: { $gte: date } });
  }

  /**
   * @param {String} actionType
   * @returns {Array<Action>}
   */
  async getActionsByType(actionType) {
    return await this.actionModel.find({ actionType });
  }

  /**
   * @param {String} watchId
   * @returns {Array<Action>}
   */
  async getActionsByWatchId(watchId) {
    const watch = await this.watchModel.findOne({ watchId });

    return this.actionModel.find({ watchId: watch._id });
  }
}

export default ActionRepository;
