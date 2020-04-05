import { Router } from "express";
import passport from "passport";

import Command from "../models/command.model";
import CommandRepository from "../repositories/command_repository";
import CommandService from "../services/command_service";

import Link from "../models/link.model";
import LinkRepository from "../repositories/link_repository";

import Watch from "../models/watch.model";
import WatchRepository from "../repositories/watch_repository";

import { ActionType } from "../models/action.model";
import { IUser } from "../models/user.model";

const commandRepository = new CommandRepository(Command);
const linkRepository = new LinkRepository(Link);
const watchRepository = new WatchRepository(Watch, Link);

const commandService = new CommandService(
  commandRepository,
  linkRepository,
  watchRepository
);

const router = Router();

/**
 * ROUTE:       /:id/:type
 * METHOD:      POST
 * PROTECTED:   YES
 * BODY:        Must contain the data required to build the command
 *              For example, [interval] for an UPLOAD command
 * DESCRIPTION: Schedules a command to be sent to the watch
 */
router.post(
  "/:id/:type",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const watchId = req.params.id;
    const userId = (req.user as IUser)._id;
    const actionType = ActionType[req.params.type as keyof typeof ActionType];

    const result = await commandService.createCommand(
      userId,
      watchId,
      actionType,
      req.body
    );

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (command) => res.status(201).json(command)
    );
  }
);

export default router;
