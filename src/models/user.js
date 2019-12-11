import mongoose, { Schema, Document } from "mongoose";

const User = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: Date.now
  },
  associatedWatches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Watch",
      required: true
    }
  ]
});

export default mongoose.model("User", User, "Users");
