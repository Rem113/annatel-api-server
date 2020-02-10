import bodyParserLoader from "./body_parser";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import passportLoader from "./passport";

export default async app => {
  await Promise.all([
    bodyParserLoader(app),
    mongooseLoader(),
    passportLoader(app),
    expressLoader(app)
  ]);
};
