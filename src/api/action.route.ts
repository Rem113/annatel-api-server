import { Router } from "express";
import passport from "passport";

import Action, { ActionType, IAction } from "../models/action.model";
import Link from "../models/link.model";
import Watch from "../models/watch.model";
import { IUser } from "../models/user.model";

import ActionRepository from "../repositories/action_repository";
import LinkRepository from "../repositories/link_repository";

import ActionService from "../services/action_service";
import { Either } from "monet";
import { Failure } from "../core/failures";

const router = Router();

const actionRepository = new ActionRepository(Action, Watch);
const linkRepository = new LinkRepository(Link);
const actionService = new ActionService(actionRepository, linkRepository);

/**
 * ROUTE:       /id/:id
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        date? An optional max date parameter
 * DESCRIPTION: Returns all the actions of the specified watches
 */
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { date } = req.params;
    const watchId = req.params.id;
    const userId = (req.user as IUser)._id;

    let result: Either<Failure, IAction[]>;

    if (date !== undefined) {
      result = await actionService.getActionsAfterDate(
        new Date(date),
        userId,
        watchId
      );
    } else {
      result = await actionService.getActionsForWatch(userId, watchId);
    }

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (actions) => res.status(200).json(actions)
    );
  }
);

/**
 * ROUTE:       /id/:id/type/:type
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        No
 * DESCRIPTION: Returns all the actions of the specified watche with the specified type
 */
router.get(
  "/id/:id/type/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actionType = ActionType[req.params.type as keyof typeof ActionType];
    const watchId = req.params.id;
    const userId = (req.user as IUser)._id;

    const result = await actionService.getActionsByType(
      actionType,
      userId,
      watchId
    );

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (actions) => res.status(200).json(actions)
    );
  }
);

export default router;
