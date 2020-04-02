import mongoose, { Schema } from "mongoose";

const actionTypes = [
  "LK",
  "UD",
  "UD2",
  "AL",
  "WAD",
  "RAD",
  "WG",
  "RG",
  "UPLOAD",
  "CENTER",
  "SLAVE",
  "PW",
  "CALL",
  "SMS",
  "MONITOR",
  "SOS1",
  "SOS2",
  "SOS3",
  "SOS",
  "UPGRADE",
  "IP",
  "FACTORY",
  "LZ",
  "URL",
  "SOSSMS",
  "LOWBAT",
  "APN",
  "ANY",
  "TS",
  "VERNO",
  "RESET",
  "CR",
  "BT",
  "WORK",
  "WORKTIME",
  "POWEROFF",
  "REMOVE",
  "PULSE"
];

const Action = new Schema({
  actionType: {
    type: Schema.Types.String,
    required: true,
    enum: actionTypes
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  length: {
    type: Schema.Types.Number,
    required: true
  },
  payload: {
    type: Object,
    default: {}
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  watchId: {
    type: Schema.Types.ObjectId,
    ref: "Watch",
    required: true
  }
});

export default mongoose.model("Action", Action, "Actions");
