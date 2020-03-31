import mongoose, { Schema } from "mongoose";

const Command = new Schema({
  watchId: {
    ref: "Watch",
    required: true
  },
  command: {
    type: Schema.Types.String,
    required: true
  },
  processed: {
    type: Schema.Types.Boolean,
    default: false
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

export default mongoose.model("Command", Command, "Commands");
