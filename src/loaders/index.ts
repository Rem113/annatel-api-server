import { Express } from "express";

import bodyParserLoader from "./body_parser";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import passportLoader from "./passport";

export default async (app: Express): Promise<any> =>
  Promise.all([
    bodyParserLoader(app),
    mongooseLoader(),
    passportLoader(app),
    expressLoader(app),
  ]);
