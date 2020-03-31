import { Router } from "express";
import passport from "passport";

import Action from "../models/action";
import Watch from "../models/watch";
import ActionRepository from "../repositories/action_repository";
import ActionService from "../services/action_service";

const router = Router();

const actionRepository = ActionRepository({
  actionModel: Action,
  watchModel: Watch
});
const actionService = ActionService({ repository: actionRepository });

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { date } = req.params;

    let actions;

    if (date) {
      actions = await actionService.getActionsAfterDate(date);
      return res.status(200).json(actions);
    }

    actions = await actionService.getActions();

    return res.status(200).json(actions);
  }
);

router.get(
  "/type/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actionType = req.params.type;

    const actions = await actionService.getActionsByType(actionType);

    return res.status(200).json(actions);
  }
);

router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const watchId = req.params.id;

    const actions = await actionService.getActionsByWatchId(watchId);

    return res.status(200).json(actions);
  }
);

export default router;
