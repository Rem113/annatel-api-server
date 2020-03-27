import { Router } from "express";
import passport from "passport";

import Command from "../models/command";
import CommandRepository from "../repositories/command_repository";
import CommandService from "../services/command_service";

const commandRepository = CommandRepository({ commandModel: Command });
const commandService = CommandService({ commandRepository });

const router = Router();

router.post(
  "/:id/:action",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, action } = req.params;

    switch (action) {
      case "LK":
        commandService.createLKCommand(id);
        return res.status(201);
      default:
        return res.status(400).json({ message: "Action type unsupported" });
    }
  }
);

export default router;
