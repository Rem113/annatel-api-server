import mongoose, { Document, Schema } from "mongoose";

import { IWatch } from "./watch.model";

export enum DayOfWeek {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export interface ITimeFrame extends Document {
  dayOfWeek: DayOfWeek;
  from: number;
  to: number;
}

export interface IGeofence extends Document {
  frames: ITimeFrame[];
  insertedAt: Date;
  latitude: number;
  longitude: number;
  name: string;
  notification: boolean;
  radius: number;
  stopped: boolean;
  updatedAt: Date;
  watchId: IWatch["_id"];
}

const TimeFrame = new Schema({
  dayOfWeek: {
    enum: DayOfWeek,
    required: true,
    type: Schema.Types.Number,
  },
  from: {
    max: 86400,
    min: 0,
    required: true,
    type: Schema.Types.Number,
  },
  to: {
    max: 86400,
    min: 0,
    required: true,
    type: Schema.Types.Number,
  },
});

const Geofence = new Schema({
  frames: [TimeFrame],
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  latitude: {
    max: 90.0,
    min: -90.0,
    required: true,
    type: Schema.Types.Decimal128,
  },
  longitude: {
    max: 180.0,
    min: -180.0,
    required: true,
    type: Schema.Types.Decimal128,
  },
  name: {
    required: true,
    type: Schema.Types.String,
  },
  notification: {
    default: false,
    type: Schema.Types.Boolean,
  },
  radius: {
    required: true,
    type: Schema.Types.Decimal128,
  },
  stopped: {
    default: false,
    type: Schema.Types.Boolean,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  watchId: {
    ref: "Watch",
    required: true,
    type: Schema.Types.ObjectId,
  },
});

export default mongoose.model<IGeofence>("Geofence", Geofence, "Geofences");
