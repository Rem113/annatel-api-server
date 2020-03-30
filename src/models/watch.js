import mongoose, { Schema } from "mongoose";

const Watch = new Schema({
  watchId: {
    type: String,
    required: true
  }
});

export default mongoose.model("Watch", Watch, "Watches");
