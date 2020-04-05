import passport from "passport";
import passportConfig from "../config/passport.config";

export default async (app: any) => {
  app.use(passport.initialize());
  passportConfig(passport);

  console.log("Passport initialized");
};
