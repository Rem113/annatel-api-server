import mongoose, { Document, Schema } from "mongoose";

export interface IWatch extends Document {
  insertedAt: Date;
  updatedAt: Date;
  vendor: string;
  watchId: string;
}

const Watch = new Schema({
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  vendor: {
    required: true,
    type: Schema.Types.String,
  },
  watchId: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
});

export default mongoose.model<IWatch>("Watch", Watch, "Watches");
