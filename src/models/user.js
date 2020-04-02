import mongoose, { Schema } from "mongoose";

const User = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

export default mongoose.model("User", User, "Users");
