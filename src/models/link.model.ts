import mongoose, { Document, Schema } from "mongoose";

import { IUser } from "./user.model";
import { IWatch } from "./watch.model";

export interface ILink extends Document {
  insertedAt: Date;
  stopped: boolean;
  updatedAt: Date;
  user: IUser["_id"];
  watch: IWatch["_id"];
}

const Link = new Schema({
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  stopped: {
    default: false,
    type: Schema.Types.Boolean,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  user: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId,
  },
  watch: {
    ref: "Watch",
    required: true,
    type: Schema.Types.ObjectId,
  },
});

export default mongoose.model<ILink>("Link", Link, "Link");
