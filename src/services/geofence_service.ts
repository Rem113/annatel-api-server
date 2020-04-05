import GeofenceRepository from "../repositories/geofence_repository";
import WatchRepository from "../repositories/watch_repository";
import { IWatch } from "../models/watch.model";
import { IGeofence } from "../models/geofence.model";
import { Either } from "monet";
import {
  InvalidInputFailure,
  UnauthorizedFailure,
  Failure,
} from "../core/failures";
import { IValidator } from "../core/validators";
import { IUser } from "../models/user.model";
import LinkRepository from "../repositories/link_repository";

export default class GeofenceService {
  geofenceRepository: GeofenceRepository;
  linkRepository: LinkRepository;
  watchRepository: WatchRepository;
  geofenceValidator: IValidator;

  constructor(
    geofenceRepository: GeofenceRepository,
    linkRepository: LinkRepository,
    watchRepository: WatchRepository,
    geofenceValidator: IValidator
  ) {
    this.geofenceRepository = geofenceRepository;
    this.linkRepository = linkRepository;
    this.watchRepository = watchRepository;
    this.geofenceValidator = geofenceValidator;
  }

  async createGeofence(
    userId: IUser["_id"],
    watchId: IWatch["_id"],
    params: any
  ): Promise<Either<Failure, IGeofence>> {
    // Validate input
    const { frames, longitude, latitude, radius, name, notifications } = params;
    const error = this.geofenceValidator.validate(
      frames,
      longitude,
      latitude,
      radius,
      name,
      notifications
    );

    if (error) return Either.left(new InvalidInputFailure(error));

    // Check that the watch exist
    try {
      const watch = await this.watchRepository.getWatchById(watchId);
      if (watch === null)
        return Either.left(
          new InvalidInputFailure("There is no watch associated to this id")
        );
    } catch (e) {
      return Either.left(
        new InvalidInputFailure("An error has occured", e.toString())
      );
    }

    // Check that the user is linked to the watch
    const link = await this.linkRepository.findLink(userId, watchId);

    if (link === null)
      return Either.left(
        new UnauthorizedFailure("You are not linked to this watch")
      );

    // Create the geofence
    const geofence = await this.geofenceRepository.createGeofence(
      watchId,
      frames,
      longitude,
      latitude,
      radius,
      name,
      notifications ?? false
    );

    return Either.right(geofence);
  }

  async getGeofencesForWatch(
    userId: IUser["_id"],
    watchId: IWatch["_id"]
  ): Promise<Either<Failure, IGeofence[]>> {
    // Check that the watch exist
    try {
      const watch = await this.watchRepository.getWatchById(watchId);
      if (watch === null)
        return Either.left(
          new InvalidInputFailure("There is no watch associated to this id")
        );
    } catch (e) {
      return Either.left(
        new InvalidInputFailure("An error has occured", e.toString())
      );
    }

    // Check that the user is linked to the watch
    const link = await this.linkRepository.findLink(userId, watchId);

    if (link === null)
      return Either.left(
        new UnauthorizedFailure("You are not linked to this watch")
      );

    const geofences = await this.geofenceRepository.getGeofencesForWatch(
      watchId
    );

    return Either.right(geofences);
  }
}
