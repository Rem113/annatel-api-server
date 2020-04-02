import mongoose, { Schema } from "mongoose";

const TimeFrame = new Schema({
  dayOfWeek: {
    max: 7,
    min: 1,
    required: true,
    type: Schema.Types.Number
  },
  from: {
    max: 86400,
    min: 0,
    required: true,
    type: Schema.Types.Number
  },
  to: {
    max: 86400,
    min: 0,
    required: true,
    type: Schema.Types.Number
  }
});

const Geofence = new Schema({
  frames: [TimeFrame],
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date
  },
  latitude: {
    max: 90.0,
    min: -90.0,
    required: true,
    type: Schema.Types.Decimal128
  },
  longitude: {
    max: 180.0,
    min: -180.0,
    required: true,
    type: Schema.Types.Decimal128
  },
  name: {
    required: true,
    type: Schema.Types.String
  },
  notification: {
    default: false,
    type: Schema.Types.Boolean
  },
  radius: {
    required: true,
    type: Schema.Types.Decimal128
  },
  stopped: {
    default: false,
    type: Schema.Types.Boolean
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date
  },
  watchId: {
    ref: "Watch",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default mongoose.model("Geofence", Geofence, "Geofences");
