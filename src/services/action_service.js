/**
 * Action related functionalities
 * @param {ActionRepository} repository
 * @returns {ActionService}
 */
export default ({ repository }) =>
  Object.freeze({
    /**
     * @returns {Array<Action>}
     */
    getActions: () => repository.getActions(),

    /**
     * @param {Date} date
     * @returns {Array<Action>}
     */
    getActionsAfterDate: date => repository.getActionsAfterDate(date),

    /**
     * @param {String} actionType
     * @returns {Array<Action>}
     */
    getActionsByType: actionType => repository.getActionsByType(actionType),

    /**
     * @param {String} watchId
     * @returns {Array<Action>}
     */
    getActionsByWatchId: watchId => repository.getActionsByWatchId(watchId)
  });
