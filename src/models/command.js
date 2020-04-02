import mongoose, { Schema } from "mongoose";

const Command = new Schema({
  command: {
    type: Schema.Types.String,
    required: true
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  processed: {
    type: Schema.Types.Boolean,
    default: false
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

export default mongoose.model("Command", Command, "Commands");
