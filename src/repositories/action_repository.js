/**
 * Database logic related to Actions
 * @param {Model<Action>} actionModel
 * @param {Model<Watch>} watchModel
 */
export default class ActionRepository {
  constructor({ actionModel, watchModel }) {
    this.actionModel = actionModel;
    this.watchModel = watchModel;
  }

  /**
   * @param {Object} action
   * @returns {Action} The created Action
   */
  async createAction(action) {
    return await actionModel.create(action);
  }

  /**
   * @returns {Array<Action>}
   */
  async getActions() {
    return await actionModel.find();
  }

  /**
   * @param {Date} date
   * @returns {Array<Action>}
   */
  async getActionsAfterDate(date) {
    return await actionModel.find({ insertedAt: { $gte: date } });
  }

  /**
   * @param {String} actionType
   * @returns {Array<Action>}
   */
  async getActionsByType(actionType) {
    return await actionModel.find({ actionType });
  }

  /**
   * @param {String} watchId
   * @returns {Array<Action>}
   */
  async getActionsByWatchId(watchId) {
    const watch = await watchModel.findOne({ watchId });

    return actionModel.find({ watchId: watch._id });
  }
}
