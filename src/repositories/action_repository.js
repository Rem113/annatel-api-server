/**
 * Database logic related to Actions
 * @param {Model<Action>} actionModel
 * @param {Model<Watch>} watchModel
 * @returns {ActionRepository}
 */
export default ({ actionModel, watchModel }) =>
  Object.freeze({
    /**
     * @param {Object} action
     * @returns {Action} The created Action
     */
    createAction: action => actionModel.create(action),

    /**
     * @returns {Array<Action>}
     */
    getActions: () => actionModel.find(),

    /**
     * @param {Date} date
     * @returns {Array<Action>}
     */
    getActionsAfterDate: date =>
      actionModel.find({ insertedAt: { $gte: date } }),

    /**
     * @param {String} actionType
     * @returns {Array<Action>}
     */
    getActionsByType: actionType => actionModel.find({ actionType }),

    /**
     * Returns Actions based on the watch id, not to be confused with the watch ObjectId
     * @param {String} watchId
     * @returns {Array<Action>}
     */
    getActionsByWatchId: async watchId => {
      const watch = await watchModel.findOne({ watchId });

      return actionModel.find({ watchId: watch._id });
    }
  });
