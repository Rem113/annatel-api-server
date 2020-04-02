import { Router } from "express";
import passport from "passport";

import Command from "../models/command";
import CommandRepository from "../repositories/command_repository";
import CommandService from "../services/command_service";

import Watch from "../models/watch";
import WatchRepository from "../repositories/watch_repository";

const commandRepository = CommandRepository({ commandModel: Command });
const watchRepository = WatchRepository({ watchModel: Watch });
const commandService = new CommandService({
  commandRepository,
  watchRepository
});

const router = Router();

// TODO: Implement
// TODO: Document
router.post(
  "/:id/:action",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, action } = req.params;

    const command = await commandService.createCommand(id, action, req.params);
  }
);

export default router;
