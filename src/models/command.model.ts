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
    type: Schema.Types.String,
    required: true,
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  processed: {
    type: Schema.Types.Boolean,
    default: false,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  watchId: {
    type: Schema.Types.ObjectId,
    ref: "Watch",
    required: true,
  },
});

export default mongoose.model<ICommand>("Command", Command, "Commands");
