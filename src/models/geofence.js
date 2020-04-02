import mongoose, { Schema } from "mongoose";

const TimeFrame = new Schema({
  dayOfWeek: {
    required: true,
    type: Schema.Types.Number
  },
  from: {
    required: true,
    type: Schema.Types.Number
  },
  to: {
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
    required: true,
    type: Schema.Types.Decimal128
  },
  longitude: {
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
  stoppedAt: {
    default: null,
    type: Schema.Types.Date
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
