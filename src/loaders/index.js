import bodyParserLoader from "./body_parser";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import passportLoader from "./passport";

export default async app => {
  await bodyParserLoader(app);
  console.log("Body parser initialized");

  await mongooseLoader();
  console.log("Mongoose initialized");

  await passportLoader(app);
  console.log("Passport initialized");

  await expressLoader(app);
  console.log("Express initialized");
};
