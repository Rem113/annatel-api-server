import { Router } from "express";
import passport from "passport";

import Action, { ActionType } from "../models/action.model";
import Link from "../models/link.model";
import Watch from "../models/watch.model";
import { IUser } from "../models/user.model";

import ActionRepository from "../repositories/action_repository";
import WatchRepository from "../repositories/watch_repository";

import ActionService from "../services/action_service";

const router = Router();

const actionRepository = new ActionRepository(Action, Watch);
const watchRepository = new WatchRepository(Watch, Link);
const actionService = new ActionService(actionRepository, watchRepository);

/**
 * ROUTE:       /
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        date? An optional max date parameter
 * DESCRIPTION: Returns all the actions pertaining to the users' watches
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { date } = req.params;
    const userId = (req.user as IUser)._id;

    let actions;

    if (date) {
      actions = await actionService.getActionsAfterDate(new Date(date), userId);
      return res.status(200).json(actions);
    }

    actions = await actionService.getActionsByUserId(userId);

    return res.status(200).json(actions);
  }
);

/**
 * ROUTE:       /type/:type
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        No
 * DESCRIPTION: Returns all the actions pertaining to the users' watches with the specified type
 */
router.get(
  "/type/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actionType = ActionType[req.params.type as keyof typeof ActionType];
    const userId = (req.user as IUser)._id;

    const actions = await actionService.getActionsByType(actionType, userId);

    return res.status(200).json(actions);
  }
);

export default router;
