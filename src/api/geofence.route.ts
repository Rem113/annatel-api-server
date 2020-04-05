import { Router } from "express";
import passport from "passport";
import { IUser } from "../models/user.model";

import Link from "../models/link.model";
import LinkRepository from "../repositories/link_repository";

import Geofence from "../models/geofence.model";
import GeofenceRepository from "../repositories/geofence_repository";

import Watch from "../models/watch.model";
import WatchRepository from "../repositories/watch_repository";

import { GeofenceValidator } from "../core/validators";

import GeofenceService from "../services/geofence_service";

const linkRepository = new LinkRepository(Link);
const geofenceRepository = new GeofenceRepository(Geofence);
const watchRepository = new WatchRepository(Watch, Link);
const geofenceService = new GeofenceService(
  geofenceRepository,
  linkRepository,
  watchRepository,
  new GeofenceValidator()
);

const router = Router();

/**
 * ROUTE:       /:id
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        None
 * DESCRIPTION: Get all geofences for the watch with the specified id
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = (req.user as IUser)._id;
    const watchId = req.params.id;

    const result = await geofenceService.getGeofencesForWatch(userId, watchId);

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (geofences) => res.status(200).json(geofences)
    );
  }
);

/**
 * ROUTE:       /:id
 * METHOD:      POST
 * PROTECTED:   YES
 * BODY:        frames: An array of [TimeFrame]
 * 							latitude
 * 							longitude
 * 							radius
 *							name
								notifications
 * DESCRIPTION: Creates a geofence for the watch with the specified id
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = (req.user as IUser)._id;
    const watchId = req.params.id;

    const result = await geofenceService.createGeofence(
      userId,
      watchId,
      req.body
    );

    return result.fold(
      (err) => res.status(400).json(err.unwrap()),
      (geofence) => res.status(201).json({ geofence })
    );
  }
);

export default router;
