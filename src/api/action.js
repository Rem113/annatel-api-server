import { Router } from "express";
import passport from "passport";

import Action from "../models/action";
import Watch from "../models/watch";
import UserToWatch from "../models/user_to_watch";
import WatchRepository from "../repositories/watch_repository";
import ActionRepository from "../repositories/action_repository";
import ActionService from "../services/action_service";

const router = Router();

const actionRepository = new ActionRepository({
  actionModel: Action,
  watchModel: Watch
});
const watchRepository = WatchRepository({
  watchModel: Watch,
  userToWatchModel: UserToWatch
});
const actionService = new ActionService({ actionRepository, watchRepository });

// TODO: Document
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { date } = req.params;
    const userId = req.user._id;

    let actions;

    if (date) {
      actions = await actionService.getActionsAfterDate(date, userId);
      return res.status(200).json(actions);
    }

    actions = await actionService.getActionsByUserId(userId);

    return res.status(200).json(actions);
  }
);

router.get(
  "/type/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actionType = req.params.type;
    const userId = req.user._id;

    const actions = await actionService.getActionsByType(actionType, userId);

    return res.status(200).json(actions);
  }
);

export default router;
