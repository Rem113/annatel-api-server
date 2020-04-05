import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  insertedAt: Date;
  password: string;
  updatedAt: Date;
}

const User = new Schema({
  email: {
    required: true,
    type: Schema.Types.String,
    unique: true,
  },
  insertedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
  password: {
    required: true,
    type: Schema.Types.String,
  },
  updatedAt: {
    default: Date.now,
    type: Schema.Types.Date,
  },
});

export default mongoose.model<IUser>("User", User, "Users");
