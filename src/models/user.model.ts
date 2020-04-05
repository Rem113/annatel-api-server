import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  insertedAt: Date;
  password: string;
  updatedAt: Date;
}

const User = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  insertedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>("User", User, "Users");
