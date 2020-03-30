import mongoose, { Schema } from "mongoose";

const Watch = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

export default mongoose.model("Watch", Watch, "Watches");
