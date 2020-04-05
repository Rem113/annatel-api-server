import mongoose, { Schema, Document } from "mongoose";

export interface IWatch extends Document {
  insertedAt: Date;
  updatedAt: Date;
  vendor: string;
  watchId: string;
}

const Watch = new Schema({
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  vendor: {
    type: Schema.Types.String,
    required: true,
  },
  watchId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IWatch>("Watch", Watch, "Watches");
