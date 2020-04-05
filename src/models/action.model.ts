import mongoose, { Schema, Document } from "mongoose";

export enum ActionType {
  AL = "AL",
  ANY = "ANY",
  APN = "APN",
  BT = "BT",
  CALL = "CALL",
  CENTER = "CENTER",
  CR = "CR",
  FACTORY = "FACTORY",
  IP = "IP",
  LK = "LK",
  LOWBAT = "LOWBAT",
  LZ = "LZ",
  MONITOR = "MONITOR",
  POWEROFF = "POWEROFF",
  PULSE = "PULSE",
  PW = "PW",
  RAD = "RAD",
  REMOVE = "REMOVE",
  RESET = "RESET",
  RG = "RG",
  SLAVE = "SLAVE",
  SMS = "SMS",
  SOS = "SOS",
  SOS1 = "SOS1",
  SOS2 = "SOS2",
  SOS3 = "SOS3",
  SOSSMS = "SOSSMS",
  TS = "TS",
  UD = "UD",
  UD2 = "UD2",
  UPGRADE = "UPGRADE",
  UPLOAD = "UPLOAD",
  URL = "URL",
  VERNO = "VERNO",
  WAD = "WAD",
  WG = "WG",
  WORK = "WORK",
  WORKTIME = "WORKTIME",
}

export interface IAction extends Document {
  actionType: string;
  insertedAt: Date;
  length: number;
  payload: object;
  updatedAt: Date;
  watchId: IAction["_id"];
}

const Action = new Schema({
  actionType: {
    enum: ActionType,
    required: true,
    type: ActionType,
  },
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  length: {
    required: true,
    type: Schema.Types.Number,
  },
  payload: {
    default: {},
    type: Object,
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

export default mongoose.model<IAction>("Action", Action, "Actions");
