import passport from "passport";
import passportConfig from "../config/passport_config";

export default async app => {
  app.use(passport.initialize());
  passportConfig(passport);

  console.log("Passport initialized");
};
