import { Router } from "express";
import passport from "passport";

import Command from "../models/command.model";
import CommandRepository from "../repositories/command_repository";
import CommandService from "../services/command_service";

import Watch from "../models/watch.model";
import WatchRepository from "../repositories/watch_repository";
import Link from "../models/link.model";

const commandRepository = new CommandRepository(Command);
const watchRepository = new WatchRepository(Watch, Link);
const commandService = new CommandService(commandRepository, watchRepository);

const router = Router();

// TODO: Implement
// TODO: Document
router.post(
  "/:id/:action",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, action } = req.params;

    // const command = await commandService.createCommand(id, action, req.params);
  }
);

export default router;
