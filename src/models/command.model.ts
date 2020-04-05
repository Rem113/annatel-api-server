import mongoose, { Document, Schema } from "mongoose";

import { IWatch } from "./watch.model";

export interface ICommand extends Document {
  command: string;
  insertedAt: Date;
  processed: boolean;
  updatedAt: Date;
  watchId: IWatch["_id"];
}

const Command = new Schema({
  command: {
    required: true,
    type: Schema.Types.String,
  },
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  processed: {
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

export default mongoose.model<ICommand>("Command", Command, "Commands");
