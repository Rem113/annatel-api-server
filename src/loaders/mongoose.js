import mongoose from "mongoose";
import Keys from "../config/keys";

export default async () => {
  await mongoose.connect(Keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("Mongoose initialized");
};
