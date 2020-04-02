import mongoose, { Schema } from "mongoose";

const UserToWatch = new Schema({
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  stoppedAt: {
    type: Schema.Types.Date,
    default: null
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  user: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId
  },
  watch: {
    ref: "Watch",
    required: true,
    type: Schema.Types.ObjectId
  }
});

export default mongoose.model(
  "UserToWatch",
  UserToWatch,
  "UserToWatchAssociation"
);
