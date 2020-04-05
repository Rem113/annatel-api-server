import { Model } from "mongoose";
import { IGeofence, ITimeFrame } from "../models/geofence.model";
import { IWatch } from "../models/watch.model";

export default class GeofenceRepository {
  geofenceModel: Model<IGeofence>;

  constructor(geofenceModel: Model<IGeofence>) {
    this.geofenceModel = geofenceModel;
  }

  async createGeofence(
    watchId: IWatch["_id"],
    frames: ITimeFrame[],
    longitude: number,
    latitude: number,
    radius: number,
    name: string,
    notifications: boolean
  ): Promise<IGeofence> {
    return this.geofenceModel.create({
      watchId,
      frames,
      longitude,
      latitude,
      radius,
      name,
      notifications: notifications ?? false,
    });
  }

  getGeofencesForWatch(watchId: IWatch["_id"]): Promise<IGeofence[]> {
    return this.geofenceModel.find({ watchId }).exec();
  }
}
