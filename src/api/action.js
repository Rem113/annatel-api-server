import { Router } from "express";
import passport from "passport";

import Action from "../models/action";
import ActionRepository from "../repositories/action_repository";
import ActionService from "../services/action_service";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const actionRepository = ActionRepository({ actionModel: Action });
    const actionService = ActionService({ repository: actionRepository });

    const actions = await actionService.getActions();

    return res.status(200).json(actions);
  }
);

export default router;
