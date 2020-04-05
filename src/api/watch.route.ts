import { Router } from "express";
import passport from "passport";

import { InvalidInputFailure, ConflictFailure } from "../core/failures";
import Link from "../models/link.model";
import Watch from "../models/watch.model";
import { IUser } from "../models/user.model";

import LinkRepository from "../repositories/link_repository";
import WatchRepository from "../repositories/watch_repository";

import WatchService from "../services/watch_service";

const linkRepository = new LinkRepository(Link);
const watchRepository = new WatchRepository(Watch, Link);

const watchService = new WatchService(watchRepository, linkRepository);

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
      (err) => {
        if (err instanceof InvalidInputFailure) {
          return res.status(400).json(err.unwrap());
        } else if (err instanceof ConflictFailure) {
          return res.status(409).json(err.unwrap());
        } else {
          return res.status(500).json(err.unwrap());
        }
      },
      (watch) => res.status(201).json(watch)
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
    const userId = (req.user as IUser)._id;

    const result = await watchService.getUsersWatches(userId);

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (usersWatch) => res.status(200).json(usersWatch)
    );
  }
);

/**
 * ROUTE:       /link/:watchId
 * METHOD:      POST
 * PROTECTED:   YES
 * BODY:        name:  The name of the link
 * DESCRIPTION: Link the current user with the specified watch id
 */
router.post(
  "/link/:watchId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const name = req.body.name;
    const userId = (req.user as IUser)._id;

    const result = await watchService.linkWatchToUser(
      userId,
      req.params.watchId,
      name
    );

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (link) => res.status(200).json(link)
    );
  }
);

/**
 * ROUTE:       /link/:watchId
 * METHOD:      PATCH
 * PROTECTED:   YES
 * BODY:        name: The name of the link
 *              stopped: True or false
 * DESCRIPTION: Updated a link. A null body won't affect the resource
 */
router.patch(
  "/link/:watchId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = (req.user as IUser)._id;
    const watchId = req.params.watchId;
    const name = req.body.name;
    const stopped = req.body.stopped;

    const result = await watchService.updateLink(
      userId,
      watchId,
      name,
      stopped
    );

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (link) => res.status(200).json(link)
    );
  }
);

export default router;
