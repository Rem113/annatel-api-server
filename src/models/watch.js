import mongoose, { Schema } from "mongoose";

const Watch = new Schema({});

export default mongoose.model("Watch", Watch, "Watches");
