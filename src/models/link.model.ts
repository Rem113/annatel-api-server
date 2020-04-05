import { IUser } from "./user.model";
import { IWatch } from "./watch.model";
import mongoose, { Document, Schema } from "mongoose";

export interface ILink extends Document {
  insertedAt: Date;
  stopped: boolean;
  updatedAt: Date;
  user: IUser["_id"];
  watch: IWatch["_id"];
}

const Link = new Schema({
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  stopped: {
    type: Schema.Types.Boolean,
    default: false,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
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
