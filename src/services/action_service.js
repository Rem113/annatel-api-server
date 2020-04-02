// TODO: Handle errors

/**
 * Action related functionalities
 * @param {ActionRepository} actionRepository
 * @param {WatchRepository} watchRepository
 */
export default class ActionService {
  constructor({ actionRepository, watchRepository }) {
    this.actionRepository = actionRepository;
    this.watchRepository = watchRepository;
  }

  /**
   * @param {ObjectId} userId
   * @returns {Array<Action>}
   */
  async getActionsByUserId(userId) {
    const watches = await this.watchRepository.getUsersWatches(userId);

    const res = [];

    for await (const watch of watches) {
      const actions = await this.actionRepository.getActionsByWatchId(
        watch.watchId
      );

      actions.forEach(action => res.push(action));
    }

    return res;
  }

  /**
   * @param {Date} date
   * @param {ObjectId} userId
   * @returns {Array<Action>}
   */
  async getActionsAfterDate(date, userId) {
    const actions = await this.getActionsByUserId(userId);

    return actions.filter(action => action.insertedAt > date);
  }

  /**
   * @param {String} actionType
   * @param {ObjectId} userId
   * @returns {Array<Action>}
   */
  async getActionsByType(actionType, userId) {
    const actions = await this.getActionsByUserId(userId);

    return actions.filter(action => action.actionType === actionType);
  }
}
