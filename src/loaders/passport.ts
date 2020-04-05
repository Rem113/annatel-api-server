import { Express } from "express";
import passport from "passport";
import passportConfig from "../config/passport.config";

export default async (app: Express) => {
  app.use(passport.initialize());
  passportConfig(passport);

  console.log("Passport initialized");
};
