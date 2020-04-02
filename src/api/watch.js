import { Router } from "express";
import passport from "passport";

import UserToWatch from "../models/user_to_watch";
import UserToWatchRepository from "../repositories/user_to_watch_repository";

import Watch from "../models/watch";
import WatchRepository from "../repositories/watch_repository";
import WatchService from "../services/watch_service";
import { InvalidInputFailure, ConflictFailure } from "../core/failures";

const userToWatchRepository = new UserToWatchRepository({
  userToWatchModel: UserToWatch
});

const watchRepository = new WatchRepository({
  watchModel: Watch,
  userToWatchModel: UserToWatch
});
const watchService = new WatchService({
  watchRepository,
  userToWatchRepository
});

const router = Router();

/**
 * ROUTE:       /
 * METHOD:      POST
 * PROTECTED:   YES
 * BODY:        watchId: the ID at the back of the watch
 *              vendor: the watch's vendor
 * DESCRIPTION: Creates a new Watch
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await watchService.createWatch(req.body);

    return result.fold(
      err => {
        if (err instanceof InvalidInputFailure) {
          return res.status(400).json(err.unwrap());
        } else if (err instanceof ConflictFailure) {
          return res.status(409).json(err.unwrap());
        }
      },
      watch => res.status(201).json(watch)
    );
  }
);

/**
 * ROUTE:       /
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        None
 * DESCRIPTION: Get the current users' watches
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await watchService.getUsersWatches(req.user._id);

    return result.fold(
      err => res.status(400).json(err.unwrap()),
      usersWatch => res.status(200).json(usersWatch)
    );
  }
);

/**
 * ROUTE:       /link/:watchId
 * METHOD:      POST
 * PROTECTED:   YES
 * BODY:        None
 * DESCRIPTION: Link the current user with the specified watch id.
 */
router.post(
  "/link/:watchId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await watchService.linkWatchToUser(
      req.user._id,
      req.params.watchId
    );

    return result.fold(
      err => res.status(400).json(err.unwrap()),
      link => res.status(200).json(link)
    );
  }
);

export default router;
