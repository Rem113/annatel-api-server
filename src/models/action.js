import mongoose, { Schema } from "mongoose";

const Action = new Schema({
  actionType: {
    type: Schema.Types.String,
    required: true
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
